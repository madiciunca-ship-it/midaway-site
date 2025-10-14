// src/components/BookPurchasePanel.jsx
import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { FORMATS, BOOKS } from "../data/books";

function money(amount, currency) {
  if (!Number.isFinite(Number(amount))) return "";
  if (currency === "EUR") return `€${amount}`;
  if (currency === "RON") return `${amount} lei`;
  return `${amount} ${currency || ""}`.trim();
}

function findBookByIdOrAlias(bookId) {
  if (!bookId) return null;
  const direct = BOOKS.find((b) => b.id === bookId);
  if (direct) return direct;

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
 * Panel cumpărare: 4 formate (PDF, EPUB, Paperback, Audiobook)
 * - arată prețul + monedă corectă
 * - dacă availability[fmt] === false → buton disabled + badge SOON
 * - fără butoane RO/EN (cartea e deja pe limbă unică)
 */
export default function BookPurchasePanel({ book, bookId }) {
  const resolvedBook = useMemo(
    () => book || findBookByIdOrAlias(bookId),
    [book, bookId]
  );
  const { addToCart } = useCart ? useCart() : { addToCart: () => {} };

  if (!resolvedBook) return null;
  const { prices = {}, availability = {}, currency, title, id } = resolvedBook;

  const onAdd = (format) => {
    const price = prices?.[format] ?? 0;
    addToCart({
      id,
      title,
      format,
      price,
      currency,
      qty: 1,
    });
  };

  const card = (fmt) => {
    const avail = Boolean(availability?.[fmt]);
    const price = prices?.[fmt];
    const label =
      avail && Number.isFinite(Number(price))
        ? money(price, currency)
        : "În curând";

    return (
      <div
        key={fmt}
        style={{
          border: "1px solid #e7e7e7",
          borderRadius: 12,
          padding: 12,
          background: avail ? "#ffffff" : "#f4f7f7",
          opacity: avail ? 1 : 0.8,
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
          <strong style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {fmt === "PDF" && "📄"}
            {fmt === "EPUB" && "📘"}
            {fmt === "Paperback" && "🛒"}
            {fmt === "Audiobook" && "🎧"}
            {fmt}
          </strong>
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
          {label}
        </div>

        <button
          disabled={!avail}
          onClick={() => onAdd(fmt)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: avail ? "#2a9d8f" : "#e5e5e5",
            color: avail ? "#fff" : "#666",
            cursor: avail ? "pointer" : "not-allowed",
            fontWeight: 700,
          }}
          aria-label={
            avail ? `Adaugă în coș ${title} — ${fmt}` : `${fmt} indisponibil`
          }
        >
          {avail ? "Adaugă în coș" : "Indisponibil"}
        </button>
      </div>
    );
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
      <h2
        style={{
          marginTop: 0,
          marginBottom: 12,
          textAlign: "center",
          background: "#2a9d8f",
          color: "#fff",
          padding: "10px 12px",
          borderRadius: 10,
          fontSize: 16,
        }}
      >
        Alege formatul
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {FORMATS.map(card)}
      </div>

      <p style={{ marginTop: 10, color: "#666", fontSize: 12, textAlign: "center" }}>
        După plată vei primi pe email linkurile de descărcare (48h valabile).
      </p>
    </section>
  );
}
