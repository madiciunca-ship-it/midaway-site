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
  const { add } = useCart(); // ✅ folosește API-ul existent

  if (!resolvedBook) return null;
  const { prices = {}, availability = {}, currency, title, id } = resolvedBook;

  const onAdd = (format) => {
    const price = prices?.[format] ?? 0;
    add({
      id,
      title,
      format,       // "PDF" | "EPUB" | "Paperback" | "Audiobook"
      price,
      // lang nu mai e necesar (book.id include limba)
      qty: 1,
    });
  };

  const card = (fmt, icon) => {
    const avail = Boolean(availability?.[fmt]);
    const price = prices?.[fmt];
    const label =
      avail && Number.isFinite(Number(price)) ? money(price, currency) : "În curând";

    return (
      <div
        key={fmt}
        style={{
          border: "1px solid #e7e7e7",
          borderRadius: 16,
          padding: 16,
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,.06)",
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
          <strong style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>{icon}</span> {fmt}
          </strong>
          {!avail && (
            <span
              style={{
                background: "#e5e7eb",
                color: "#555",
                borderRadius: 999,
                padding: "2px 10px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              SOON
            </span>
          )}
        </div>

        <div style={{ fontSize: 14, color: "#333", marginBottom: 12 }}>{label}</div>

        <button
          disabled={!avail}
          onClick={() => onAdd(fmt)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 12,
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
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
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
