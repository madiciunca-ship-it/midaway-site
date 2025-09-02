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

  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 14, margin: 0 }}>
        <Link to="/carti">← Înapoi la toate cărțile</Link>
      </p>

      <h1 style={{ margin: "8px 0 0 0" }}>{book.title}</h1>
      <p style={{ margin: 0, color: "#666" }}>{book.subtitle}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px, 360px) 1fr",
          gap: 24,
          marginTop: 16,
          alignItems: "start",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "3/4",
            overflow: "hidden",
            borderRadius: 10,
            background: "#f3f3f3",
            border: "1px solid #eee",
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

        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag>{book.genre}</Tag>
            <Tag>📍 {book.location}</Tag>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>
              {book.year}
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

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <a
              href={book.sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px 12px",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              📖 Citește un fragment
            </a>
            <a
              href={book.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#fff",
                color: "#111",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              🛒 Cumpără
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
