// src/components/BookPurchasePanel.jsx
import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { FORMATS, BOOKS } from "../data/books";

// Mic util: simbol monedă
function money(amount, currency) {
  if (!Number.isFinite(Number(amount))) return "";
  if (currency === "EUR") return `€${amount}`;
  if (currency === "RON") return `${amount} RON`;
  return `${amount} ${currency || ""}`.trim();
}

// dacă avem doar id din URL, putem găsi cartea aici (fallback)
function findBookByIdOrAlias(bookId) {
  if (!bookId) return null;
  const direct = BOOKS.find((b) => b.id === bookId);
  if (direct) return direct;

  // fallback-uri prietenoase pentru id-uri vechi
  const s = String(bookId).toLowerCase();
  if (s.startsWith("o-zi-de-care-sa-ti-amintesti")) {
    return BOOKS.find((b) => b.id === "o-zi-ro") || null;
  }
  if (s === "vietnam" || s === "2") {
    return BOOKS.find((b) => b.id === "vietnam-ro") || null;
  }
  return null;
}

/**
 * Panelul cu formate + prețuri + SOON.
 * Poate primi `book` direct sau `bookId` (își caută singur cartea).
 */
export default function BookPurchasePanel({ book, bookId }) {
  const resolvedBook = useMemo(
    () => book || findBookByIdOrAlias(bookId),
    [book, bookId]
  );

  const { addToCart } = useCart();

  if (!resolvedBook) return null;

  const { prices = {}, availability = {}, currency, title } = resolvedBook;

  const onAdd = (format) => {
    const price = prices?.[format] ?? 0;
    addToCart({
      id: resolvedBook.id,
      title,
      format,
      price,
      currency,
      qty: 1,
    });
  };

  return (
    <section
      aria-label="Cumpără cartea"
      style={{
        marginTop: 24,
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>Formate disponibile</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {FORMATS.map((fmt) => {
          const avail = Boolean(availability?.[fmt]);
          const price = prices?.[fmt];
          const isDigital = fmt === "PDF" || fmt === "EPUB";

          return (
            <div
              key={fmt}
              style={{
                border: "1px solid #e7e7e7",
                borderRadius: 12,
                padding: 12,
                background: avail ? "#ffffff" : "#fafafa",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <strong>{fmt}</strong>
                {!avail && (
                  <span
                    style={{
                      background: "#ddd",
                      color: "#555",
                      borderRadius: 999,
                      padding: "2px 8px",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    SOON
                  </span>
                )}
              </div>

              <div style={{ fontSize: 14, color: "#333", marginBottom: 10 }}>
                {avail && Number.isFinite(Number(price))
                  ? money(price, currency)
                  : isDigital
                  ? "Indisponibil momentan"
                  : "În curând"}
              </div>

              <button
                disabled={!avail}
                onClick={() => onAdd(fmt)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: avail ? "#2a9d8f" : "#e5e5e5",
                  color: avail ? "#fff" : "#666",
                  cursor: avail ? "pointer" : "not-allowed",
                  fontWeight: 700,
                }}
                aria-label={
                  avail
                    ? `Adaugă în coș ${title} — ${fmt}`
                    : `${fmt} indisponibil`
                }
              >
                {avail ? "Adaugă în coș" : "Indisponibil"}
              </button>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 10, color: "#666", fontSize: 12 }}>
        Plata pentru eBook-uri se face online. După confirmarea plății vei primi
        un email cu linkurile de descărcare (valabile 48h).
      </p>
    </section>
  );
}
