// src/components/BookPurchasePanel.jsx
import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { BOOKS } from "../data/books";

// util – afișare bani
function money(amount, currency) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "";
  const cur = String(currency || "").toUpperCase();
  if (cur === "EUR") return `€${n}`;
  if (cur === "RON") return `${n} RON`;
  return `${n} ${cur}`.trim();
}

// ——— SPECIFICAȚII PE FORMAT (component reutilizabil, randează sub „Detalii tehnice”) ———
export function FormatSpecs({ book }) {
  const fdet = book?.formatDetails || null;
  if (!fdet) return null;

  const items = [];

  if (fdet.ebook) {
    const e = fdet.ebook, p = [];
    if (e.pages) p.push(`${e.pages} pagini`);
    if (e.isbn && e.isbn !== "—") p.push(`ISBN: ${e.isbn}`);
    if (e.dimensions && e.dimensions !== "—") p.push(e.dimensions);
    if (e.weight && e.weight !== "—") p.push(e.weight);
    if (e.language && e.language !== "—") p.push(`Limba: ${e.language}`);
    items.push(
      <li key="ebook">
        <strong>eBook:</strong> {p.length ? p.join(" • ") : "—"}
      </li>
    );
  }

  if (fdet.paperback) {
    const pb = fdet.paperback, p = [];
    if (pb.pages) p.push(`${pb.pages} pagini`);
    if (pb.isbn && pb.isbn !== "—") p.push(`ISBN: ${pb.isbn}`);
    if (pb.dimensions && pb.dimensions !== "—") p.push(pb.dimensions);
    if (pb.weight && pb.weight !== "—") p.push(pb.weight);
    if (pb.language && pb.language !== "—") p.push(`Limba: ${pb.language}`);
    items.push(
      <li key="paperback">
        <strong>Paperback:</strong> {p.length ? p.join(" • ") : "—"}
      </li>
    );
  }

  if (fdet.audiobook) {
    const a = fdet.audiobook, p = [];
    if (a.minutes) p.push(`${a.minutes} minute`);
    if (a.narrator) p.push(`Narator: ${a.narrator}`);
    items.push(
      <li key="audiobook">
        <strong>Audiobook:</strong> {p.length ? p.join(" • ") : "—"}
      </li>
    );
  }

  if (!items.length) return null;

  return (
    <div
      className="format-details"
      style={{
        marginTop: 12,
        padding: 12,
        border: "1px dashed #e5e5e5",
        borderRadius: 12,
        background: "#fffef9",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>Specificații pe format</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>{items}</ul>
    </div>
  );
}

// căutare carte după id/alias
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

  // coperta sigură pt. coș
  const cover =
    resolvedBook?.cover ||
    resolvedBook?.coverUrl ||
    resolvedBook?.image ||
    resolvedBook?.extraImage ||
    (Array.isArray(resolvedBook?.images) ? resolvedBook.images[0] : null) ||
    null;

  // ---------------- NORMALIZARE CHEI LA UPPERCASE ----------------
  const rawPrices = resolvedBook?.prices || {};
  const rawAvailability = resolvedBook?.availability || {};

  const prices = Object.fromEntries(
    Object.entries(rawPrices).map(([k, v]) => [String(k).toUpperCase(), Number(v)])
  );
  const availability = Object.fromEntries(
    Object.entries(rawAvailability).map(([k, v]) => [String(k).toUpperCase(), Boolean(v)])
  );

  // restul câmpurilor
  const currencyLabel = (resolvedBook?.currency || "RON").toUpperCase();
  const title = resolvedBook?.title;
  const id = resolvedBook?.id;
  const langLabel = (resolvedBook?.lang || "RO").toUpperCase();

  // ---- vendori externi (Amazon, alți parteneri) ----
  const vendors = resolvedBook?.vendors || {};
  const hasAmazon = vendors?.amazon?.url && vendors.amazon.visible !== false;
  const otherVendors = Object.entries(vendors || {}).filter(
    ([k, v]) => k !== "amazon" && v?.url && v?.visible !== false
  );

  // vendorul principal (Amazon sau primul din lista de alți parteneri - ex. Novela)
const mainVendor = hasAmazon
? { key: "amazon", label: "Amazon" }
: otherVendors[0]
? {
    key: otherVendors[0][0],
    label: otherVendors[0][1].label || otherVendors[0][0],
  }
: null;


  // adaugă în coș
  const onAdd = (format) => {
    const fmt = String(format || "").toUpperCase();
    const price = prices[fmt] ?? 0;

    add({
      id,
      title,
      format: fmt,
      lang: langLabel,
      price,
      currency: currencyLabel,
      image: cover,
      payLink: resolvedBook?.payLink || null,
      // tipul de îndeplinire – pentru consimțământul digital
      fulfillment:
        fmt === "PDF" || fmt === "EPUB" || fmt === "AUDIOBOOK"
          ? "digital"
          : fmt === "PAPERBACK"
          ? "paperback"
          : "other",
    });

    console.log("[BUY] add ->", {
      id,
      title,
      fmt,
      price,
      currencyLabel,
      cover,
    });
  };

  // cardul de format (PDF/EPUB/PAPERBACK/etc.)
  const card = (fmt, icon) => {
    const KEY = String(fmt).toUpperCase();
    const avail = Boolean(availability?.[KEY]);
    const price = Number(prices?.[KEY]) || 0;
    const labelSoon = langLabel === "EN" ? "soon" : "în curând";

    // vânzare externă pt. paperback
    const isExternal =
      KEY === "PAPERBACK" && (hasAmazon || otherVendors.length > 0);

    // „în curând” doar dacă NU e vânzare externă
    const showSoon = !avail && !isExternal;

    /// text preț
const priceText = isExternal && mainVendor
? vendors?.[mainVendor.key]?.priceLabel ||
  (langLabel === "EN"
    ? `price at ${mainVendor.label}`
    : `preț la ${mainVendor.label}`)
: avail
? money(price, currencyLabel)
: money(0, currencyLabel);

const vendorTermsText = mainVendor
  ? langLabel === "EN"
    ? `delivery & returns as per ${mainVendor.label} terms`
    : `livrare & retur conform termenilor ${mainVendor.label}`
  : langLabel === "EN"
  ? "delivery & returns as per store terms"
  : "livrare & retur conform termenilor magazinului";



    return (
      <div
        key={KEY}
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
            <span>{icon}</span> {KEY}
          </strong>
          {showSoon && (
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
          {priceText}
        </div>

        {/* acțiuni */}
        {KEY === "PAPERBACK" && (hasAmazon || otherVendors.length) ? (
          <>
            {hasAmazon && (
              <a
                href={vendors.amazon.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: "#111827",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Buy on Amazon
              </a>
            )}

            {otherVendors.map(([key, v]) => (
              <a
                key={key}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: v.visible === false ? "none" : "block",
                  width: "100%",
                  textAlign: "center",
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: "#374151",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  marginTop: 8,
                }}
              >
                Cumpără de la {v.label || key}
              </a>
            ))}

<div
  style={{
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginTop: 6,
  }}
>
  {vendorTermsText}
</div>


            {/* Opțional: păstrezi și varianta internă */}
            {avail && price > 0 && (
              <button
                onClick={() => onAdd(KEY)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#2a9d8f",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                Adaugă în coș
              </button>
            )}
          </>
        ) : (
          <button
            disabled={!avail}
            onClick={() => onAdd(KEY)}
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
        )}
      </div>
    );
  }; // <-- închiderea funcției card()

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
        {card("PAPERBACK", "🛒")}
        {card("AUDIOBOOK", "🎧")}
      </div>

      <p
        style={{
          marginTop: 12,
          color: "#666",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        După plată vei primi pe email linkurile de descărcare (valabile 48h).
        — After payment, you will recieve the download links by email (valid for 48h).
      </p>
      {/* 🔔 Intenționat NU mai randez aici „Specificații pe format”.
          Ele se randează sub „Detalii tehnice”, prin <FormatSpecs book={book} /> */}
    </section>
  );
}
