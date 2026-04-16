// src/pages/BookDetail.jsx 
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BOOKS } from "../data/books";
import { useCart } from "../context/CartContext";

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

// 👇 stil „pill” + componentă mică de adăugat în coș
const pill = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
};

function AddToCart({ id, title, format, lang, price, payLink, children }) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add({ id, title, format, lang, price, payLink })}
      style={{ ...pill, marginTop: 6 }}
      type="button"
    >
      {children || "Adaugă în coș"}
    </button>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  const book = BOOKS.find((b) => String(b.id) === String(id));
  const isEN = String(book?.lang || "").toUpperCase() === "EN";

const t = isEN
  ? {
      backAll: "← Back to all books",
      bookMissing: "Book not found",
      sample: "Read a sample",
      technical: "Technical details",
      ebookPages: "eBook",
      pages: "pages",
      dimensions: "Dimensions",
      weight: "Weight",
      publisher: "Publisher",
      year: "Year",
      related: "You may also like",
    }
  : {
      backAll: "← Înapoi la toate cărțile",
      bookMissing: "Cartea nu există",
      sample: "Citește un fragment",
      technical: "Detalii tehnice",
      ebookPages: "eBook",
      pages: "pagini",
      dimensions: "Dimensiuni",
      weight: "Greutate",
      publisher: "Editura",
      year: "An",
      related: "Poate te mai interesează",
    };
  
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: "Mida Malena"
    },
    publisher: {
      "@type": "Organization",
      name: book.publisher || "Midaway"
    },
    datePublished: book.year,
    inLanguage: book.lang || "ro",
    url: "https://midaway.ro/carti/" + book.id,
    genre: book.genre || "Travel",
    description: book.subtitle
  };
  const [open, setOpen] = useState({ pdf: false, epub: false, audio: false });
  useEffect(() => {
    if (!book) return;
  
    document.title = book.seoTitle || `${book.title} | Mida Malena`;
  
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", book.seoDescription || "");
    }
  
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://midaway.ro/carti/${book.id}`);
  }, [book]);

  // Link-uri Revolut (45 lei & 65 lei)
  // const PAY_45 = "https://revolut.me/r/1bDPKVQoBh";
  // const PAY_65 = "https://revolut.me/r/dLpZN4yYgC";
  // 🔒 dezactivat: nu mai folosim linkuri Revolut (expiră); păstrăm UI-ul, fără navigare
  const PAY_45 = "";
  const PAY_65 = "";

  if (!book) {
    return (
      <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
  
        <div style={{ padding: 24 }}>
          <h2>Cartea nu există</h2>
          <p>
            <Link to="/carti">{t.backAll}</Link>
          </p>
        </div>
        </>
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
        <Link to="/carti">{t.backAll}</Link>
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
<div style={{ marginTop: 16, lineHeight: 1.75 }}>
  {Array.isArray(book.description) ? (
    book.description.map((para, idx) => (
      <p key={idx} style={{ margin: "0 0 16px 0", whiteSpace: "pre-line" }}>
  {para}
</p>

    ))
  ) : (
    <p style={{ margin: 0, whiteSpace: "pre-line" }}>
      {book.description}
    </p>
  )}
</div>


          {/* Detalii tehnice */}
          <div style={{ marginTop: 16 }}>
  <h3 style={{ margin: "0 0 8px 0" }}>{t.technical}</h3>
  <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
    {book.pages && <li>{t.ebookPages} • {book.pages} {t.pages}</li>}
    {book.isbn && <li>ISBN: {book.isbn}</li>}
    {book.dimensions && <li>{t.dimensions}: {book.dimensions}</li>}
    {book.weight && <li>{t.weight}: {book.weight}</li>}
    <li>{t.publisher}: {book.publisher}</li>
    <li>{t.year}: {book.year}</li>
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
                📖 {t.sample}
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
                type="button"
              >
                📄 Cumpără PDF (RO/EN) – 45 lei
              </button>

              {open.pdf && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, max-content))",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  {/* PDF RO */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {PAY_45 ? (
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
                          minWidth: 60,
                          textAlign: "center",
                        }}
                      >
                        RO
                      </a>
                    ) : (
                      <span
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          background: "#e8f3f1",
                          color: "#2a9d8f",
                          fontSize: 13,
                          fontWeight: 600,
                          minWidth: 60,
                          textAlign: "center",
                          border: "1px solid #cfe7e3",
                        }}
                        aria-disabled="true"
                      >
                        RO
                      </span>
                    )}
                    <AddToCart
                      id={book.id}
                      title={book.title}
                      format="PDF"
                      lang="RO"
                      price={45}
                      payLink={PAY_45 || undefined}
                    >
                      + coș
                    </AddToCart>
                  </div>

                  {/* PDF EN */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {PAY_45 ? (
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
                          minWidth: 60,
                          textAlign: "center",
                        }}
                      >
                        EN
                      </a>
                    ) : (
                      <span
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          background: "#e8f3f1",
                          color: "#2a9d8f",
                          fontSize: 13,
                          fontWeight: 600,
                          minWidth: 60,
                          textAlign: "center",
                          border: "1px solid #cfe7e3",
                        }}
                        aria-disabled="true"
                      >
                        EN
                      </span>
                    )}
                    <AddToCart
                      id={book.id}
                      title={book.title}
                      format="PDF"
                      lang="EN"
                      price={45}
                      payLink={PAY_45 || undefined}
                    >
                      + coș
                    </AddToCart>
                  </div>
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
                type="button"
              >
                📘 Cumpără EPUB (RO/EN) – 45 lei
              </button>

              {open.epub && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, max-content))",
                    justifyContent: "center",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  {/* EPUB RO */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {PAY_45 ? (
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
                          minWidth: 60,
                          textAlign: "center",
                        }}
                      >
                        RO
                      </a>
                    ) : (
                      <span
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          background: "#e8f3f1",
                          color: "#2a9d8f",
                          fontSize: 13,
                          fontWeight: 600,
                          minWidth: 60,
                          textAlign: "center",
                          border: "1px solid #cfe7e3",
                        }}
                        aria-disabled="true"
                      >
                        RO
                      </span>
                    )}
                    <AddToCart
                      id={book.id}
                      title={book.title}
                      format="EPUB"
                      lang="RO"
                      price={45}
                      payLink={PAY_45 || undefined}
                    >
                      + coș
                    </AddToCart>
                  </div>

                  {/* EPUB EN */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {PAY_45 ? (
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
                          minWidth: 60,
                          textAlign: "center",
                        }}
                      >
                        EN
                      </a>
                    ) : (
                      <span
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          background: "#e8f3f1",
                          color: "#2a9d8f",
                          fontSize: 13,
                          fontWeight: 600,
                          minWidth: 60,
                          textAlign: "center",
                          border: "1px solid #cfe7e3",
                        }}
                        aria-disabled="true"
                      >
                        EN
                      </span>
                    )}
                    <AddToCart
                      id={book.id}
                      title={book.title}
                      format="EPUB"
                      lang="EN"
                      price={45}
                      payLink={PAY_45 || undefined}
                    >
                      + coș
                    </AddToCart>
                  </div>
                </div>
              )}
            </>

            {/* Paperback – 65 lei */}
            {PAY_65 ? (
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
            ) : (
              <span
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 10,
                  background: "#e8f3f1",
                  color: "#2a9d8f",
                  fontSize: 14,
                  border: "1px solid #cfe7e3",
                }}
                aria-disabled="true"
              >
                🛒 Cumpără Paperback – 65 lei
              </span>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AddToCart
                id={book.id}
                title={book.title}
                format="Paperback"
                lang="RO"
                price={65}
                payLink={PAY_65 || undefined}
              >
                + coș Paperback
              </AddToCart>
            </div>

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
          <h3 style={{ marginBottom: 16 }}>{t.related}</h3>
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
