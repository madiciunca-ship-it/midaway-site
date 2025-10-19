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

export default function BookPurchasePanel({ book, bookId }) {
  const resolvedBook = useMemo(
    () => book || findBookByIdOrAlias(bookId),
    [book, bookId]
  );
  const { add } = useCart();

  if (!resolvedBook) return null;
  const {
    prices = {},
    availability = {},
    currency,
    title,
    id,
    lang: bookLang, // 👈 avem limba din model (RO|EN)
  } = resolvedBook;

  // normalizăm limba/moneda pentru coș
  const langLabel = (bookLang || "RO").toUpperCase();        // "RO" | "EN"
  const currencyLabel = (currency || "RON").toUpperCase();   // "RON" | "EUR"

  const onAdd = (format) => {
    const price = prices?.[format] ?? 0;
    add({
      id,
      title,
      format,
      lang: langLabel,            // ✅ PASĂM LIMBA ÎN COȘ
      price,
      currency: currencyLabel,    // ✅ monedă per carte
      qty: 1,
      image, // 👈 NOU
    });
  };

  const card = (fmt, icon) => {
    const avail = Boolean(availability?.[fmt]);
    const price = Number(prices?.[fmt]) || 0;

    // ✅ badge bazat pe limba cărții, nu pe monedă
    const labelSoon = langLabel === "EN" ? "soon" : "în curând";

    return (
      <div
        key={fmt}
        style={{
          border: "1px solid #e7e7e7",
          borderRadius: 14,
          padding: 12,
          background: "#fff",
          boxShadow: "0 6px 16px rgba(0,0,0,.05)",
          width: "100%",
          minWidth: 180,
        }}
      >
        {/* titlu + badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <strong
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
            }}
          >
            <span>{icon}</span> {fmt}
          </strong>
          {!avail && (
            <span
              style={{
                background: "#e7e7e7",
                color: "#555",
                borderRadius: 999,
                padding: "1px 6px",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {labelSoon}
            </span>
          )}
        </div>

        {/* preț + monedă */}
        <div
          style={{
            fontSize: 13,
            color: "#333",
            marginBottom: 10,
            textAlign: "center",
            minHeight: 18,
          }}
        >
          {avail ? `${price} ${currencyLabel}` : `0 ${currencyLabel}`}
        </div>

        {/* buton */}
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
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {avail ? "Adaugă în coș" : labelSoon}
        </button>
      </div>
    );
  };

  return (
    <section
      id="purchase-panel"
      aria-label="Cumpără cartea"
      style={{
        marginTop: 16,
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 12,
          textAlign: "center",
          background: "#2a9d8f",
          color: "#fff",
          padding: "10px 12px",
          borderRadius: 12,
          fontSize: 16,
        }}
      >
        Alege formatul
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginTop: 12,
        }}
      >
        {card("PDF", "📄")}
        {card("EPUB", "📘")}
        {card("Paperback", "🛒")}
        {card("Audiobook", "🎧")}
      </div>

      <p style={{ marginTop: 12, color: "#666", fontSize: 12, textAlign: "center" }}>
        După plată vei primi pe email linkurile de descărcare (48h valabile).
      </p>
    </section>
  );
}
