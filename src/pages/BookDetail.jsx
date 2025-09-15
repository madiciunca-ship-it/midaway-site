// src/pages/BookDetail.jsx
import React, { useState } from "react";
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
  const [open, setOpen] = useState({ pdf: false, epub: false, audio: false });

  // Link-uri Revolut (45 lei & 65 lei)
  const PAY_45 = "https://revolut.me/r/1bDPKVQoBh";
  const PAY_65 = "https://revolut.me/r/dLpZN4yYgC";

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
    .filter((b) => {
      const shareGenre = b.genre && book.genre && b.genre === book.genre;
      const shareTags =
        Array.isArray(b.tags) &&
        Array.isArray(book.tags) &&
        b.tags.some((t) => book.tags.includes(t));
      return shareGenre || shareTags;
    })
    .slice(0, 3);

  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 14, margin: 0 }}>
        <Link to="/carti">← Înapoi la toate cărțile</Link>
      </p>

      <h1 style={{ margin: "8px 0 0 0" }}>{book.title}</h1>
      <p style={{ margin: "4px 0 0 0", color: "#666", fontStyle: "italic" }}>
        {book.subtitle}
      </p>

      {/* Layout 2 coloane */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 300px) 1fr",
          gap: 32,
          marginTop: 16,
          alignItems: "start",
        }}
      >
        {/* Copertă */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "2/3",
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
          {/* Taguri */}
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

          {/* Descriere */}
          <p style={{ marginTop: 16, lineHeight: 1.6 }}>{book.description}</p>

          {/* Detalii tehnice */}
          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px 0" }}>Detalii tehnice</h3>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
              {book.pages && <li>eBook • {book.pages} pagini</li>}
              {book.isbn && <li>ISBN: {book.isbn}</li>}
              {book.dimensions && <li>Dimensiuni: {book.dimensions}</li>}
              {book.weight && <li>Greutate: {book.weight}</li>}
              <li>Editura: {book.publisher}</li>
              <li>An: {book.year}</li>
            </ul>
          </div>

          {/* Butoane acțiune */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 20,
            }}
          >
            {/* Citește un fragment – AURIU */}
            {book.sampleUrl && (
              <a
                href={book.sampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  background: "#d4a017", // auriu
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                📖 Citește un fragment
              </a>
            )}

            {/* PDF (RO/EN) – buton verde + sub-opțiuni */}
            <>
              <button
                onClick={() => setOpen((o) => ({ ...o, pdf: !o.pdf }))}
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  background: "#2a9d8f",
                  color: "#fff",
                  border: "none",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                📄 Cumpără PDF (RO/EN) – 45 lei
              </button>

              {open.pdf && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: 8,
                  }}
                >
                  <a
                    href={PAY_45}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      background: "#2a9d8f",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    RO
                  </a>

                  <a
                    href={PAY_45}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      background: "#2a9d8f",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    EN
                  </a>
                </div>
              )}
            </>

            {/* EPUB (RO/EN) – buton verde + sub-opțiuni */}
            <>
              <button
                onClick={() => setOpen((o) => ({ ...o, epub: !o.epub }))}
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  background: "#2a9d8f",
                  color: "#fff",
                  border: "none",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                📘 Cumpără EPUB (RO/EN) – 45 lei
              </button>

              {open.epub && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: 8,
                  }}
                >
                  <a
                    href={PAY_45}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      background: "#2a9d8f",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    RO
                  </a>

                  <a
                    href={PAY_45}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      background: "#2a9d8f",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    EN
                  </a>
                </div>
              )}
            </>

            {/* Paperback – 65 lei */}
            <a
              href={PAY_65}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textAlign: "center",
                padding: "12px",
                borderRadius: 10,
                background: "#2a9d8f",
                color: "#fff",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              🛒 Cumpără Paperback – 65 lei
            </a>

            {/* Audiobook – bară dezactivată + sub-opțiuni „în curând” */}
            <button
              disabled
              style={{
                textAlign: "center",
                padding: "12px",
                borderRadius: 10,
                background: "#7fc8c8",
                color: "#fff",
                border: "none",
                fontSize: 14,
                opacity: 0.7,
              }}
            >
              🎧 Audiobook (RO/EN) – în curând
            </button>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <span
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "1px dashed #ccc",
                  background: "#f9f9f9",
                  color: "#aaa",
                  fontSize: 13,
                }}
              >
                RO – în curând
              </span>

              <span
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "1px dashed #ccc",
                  background: "#f9f9f9",
                  color: "#aaa",
                  fontSize: 13,
                }}
              >
                EN – în curând
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recomandări */}
      {related.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3 style={{ marginBottom: 16 }}>Poate te mai interesează</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
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
                  boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                  transition: "transform 0.2s",
                }}
              >
                <div
                  style={{
                    height: 200,
                    backgroundImage: `url(${b.coverUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700 }}>{b.title}</div>
                  {b.subtitle && (
                    <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
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
