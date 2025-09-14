// src/pages/BookDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { BOOKS } from "../data/books";

const Tag = ({ children }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 8px",
      fontSize: 12,
      color: "#333",
      background: "#f2f2f2",
      border: "1px solid #e5e5e5",
      borderRadius: 999,
    }}
  >
    {children}
  </span>
);

export default function BookDetail() {
  const { id } = useParams();
  const book = BOOKS.find((b) => String(b.id) === String(id));

  if (!book) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Cartea nu există</h2>
        <p>
          <Link to="/carti">← Înapoi la toate cărțile</Link>
        </p>
      </div>
    );
  }

  const related = BOOKS
    .filter((b) => String(b.id) !== String(id))
    .slice(0, 3);

  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 14, margin: 0 }}>
        <Link to="/carti">← Înapoi la toate cărțile</Link>
      </p>

      <h1 style={{ margin: "8px 0 0 0" }}>{book.title}</h1>
      <p style={{ margin: 0, color: "#666" }}>{book.subtitle}</p>

      {/* Layout 2 coloane */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px, 360px) 1fr",
          gap: 24,
          marginTop: 16,
          alignItems: "start",
        }}
      >
        {/* Coperta față + spate */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "3/4",
              overflow: "hidden",
              borderRadius: 12,
              background: "#f3f3f3",
              border: "1px solid #eee",
              boxShadow: "0 8px 18px rgba(0,0,0,.06)",
            }}
          >
            <img
              src={book.coverUrl}
              alt={book.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {book.extraImage && (
            <div
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid #eee",
                overflow: "hidden",
                background: "#f9f9f9",
              }}
            >
              <img
                src={book.extraImage}
                alt="Coperta spate"
                loading="lazy"
                style={{
                  width: "100%",
                  display: "block",
                }}
              />
            </div>
          )}
        </div>

        {/* Detalii carte */}
        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {book.genre && <Tag>{book.genre}</Tag>}
            {book.location && <Tag>📍 {book.location}</Tag>}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>
              {book.year} • {book.publisher}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginTop: 6,
            }}
          >
            {(book.tags || []).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <p style={{ marginTop: 16, lineHeight: 1.6 }}>{book.description}</p>

          <p style={{ marginTop: 12, lineHeight: 1.6 }}>
            <strong>Editura:</strong> Midaway
            <br />
            <strong>Disponibilitate:</strong> Carte paperback prin curier
            (livrare separată). Ebook în format PDF și EPUB.
            <br />
            Versiune audio – în curând.
          </p>

          {book.prices && (
            <div style={{ marginTop: 12 }}>
              <h3 style={{ margin: "0 0 8px 0" }}>Formate & prețuri</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {Object.entries(book.prices).map(([format, price]) => (
                  <li key={format} style={{ lineHeight: 1.6 }}>
                    {format}: {price} lei
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Butoane acțiune */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 16,
            }}
          >
            {book.sampleUrl && (
              <a
                href={book.sampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  background: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                📖 Citește un fragment
              </a>
            )}

            {/* PDF */}
            {book.ebookUrlPDF && (
              <a
                href={book.ebookUrlPDF}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#111",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                📄 Cumpără PDF – {book.prices?.PDF} lei
              </a>
            )}

            {/* EPUB */}
            {book.ebookUrlEPUB && (
              <a
                href={book.ebookUrlEPUB}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#111",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                📘 Cumpără EPUB – {book.prices?.EPUB} lei
              </a>
            )}

            {/* Paperback */}
            {book.buyUrl && book.prices?.Paperback && (
              <a
                href={book.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#111",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                🛒 Cumpără Paperback – {book.prices.Paperback} lei
              </a>
            )}

            {/* Audiobook */}
            <span
              style={{
                textAlign: "center",
                padding: "12px",
                borderRadius: 10,
                border: "1px dashed #ccc",
                background: "#f9f9f9",
                color: "#aaa",
                fontSize: 14,
              }}
            >
              🎧 Audiobook – în curând
            </span>
          </div>
        </div>
      </div>

      {/* Recomandări */}
      {related.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 className="font-cormorant" style={{ marginBottom: 12 }}>
            Poate te mai interesează
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {related.map((b) => (
              <Link
                key={b.id}
                to={`/carti/${b.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid #eee",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 8px 18px rgba(0,0,0,.06)",
                }}
              >
                <div
                  style={{
                    height: 160,
                    backgroundImage: `url(${b.coverUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700 }}>{b.title}</div>
                  {b.subtitle && (
                    <div
                      style={{ fontSize: 13, color: "#666", marginTop: 4 }}
                    >
                      {b.subtitle}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
