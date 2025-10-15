// src/pages/Books.jsx
import React, { useMemo, useState } from "react";
import { BOOKS } from "../data/books";
import { Link } from "react-router-dom";

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

const GENRES = Array.from(new Set(BOOKS.map((b) => b.genre))).sort();
const LOCATIONS = Array.from(new Set(BOOKS.map((b) => b.location))).sort();

export default function Books() {
  const [genre, setGenre] = useState("Toate");
  const [location, setLocation] = useState("Toate");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();

    // ✅ pornește de la cărțile vizibile (hidden=false)
    let list = BOOKS.filter((b) => !b.hidden);

    if (s) {
      list = list.filter((b) =>
        [b.title, b.subtitle, b.location, b.genre, ...(b.tags || [])].some((x) =>
          (x || "").toString().toLowerCase().includes(s)
        )
      );
    }
    if (genre !== "Toate") list = list.filter((b) => b.genre === genre);
    if (location !== "Toate") list = list.filter((b) => b.location === location);

    return list;
  }, [q, genre, location]);

  return (
    <div>
      <h1 style={{ marginTop: 0, textAlign: "center" }}>📚 Biblioteca Midaway</h1>

      {/* Filtre */}
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#666", minWidth: 50 }}>Gen</span>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 10px",
                border: "1px solid #ddd",
                borderRadius: 10,
              }}
            >
              <option>Toate</option>
              {GENRES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#666", minWidth: 50 }}>Locație</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 10px",
                border: "1px solid #ddd",
                borderRadius: 10,
              }}
            >
              <option>Toate</option>
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setQ("");
              setGenre("Toate");
              setLocation("Toate");
            }}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Reset filtre
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Caută: titlu, subtitlu, gen, locație sau tag"
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          />
          <button
            onClick={() => setQ("")}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Șterge
          </button>
        </div>

        <div style={{ fontSize: 12, color: "#666" }}>
          {filtered.length} rezultate
        </div>
      </div>

      {/* Grid cărți */}
      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        {filtered.map((book, i) => (
          <div
            key={book.id}
            style={{
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 16,
              background: "#fffef9",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transition: "transform 0.2s",
            }}
          >
            {/* Imagine */}
            <Link to={`/carti/${book.id}`} style={{ display: "block" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  borderRadius: 12,
                  background: "#f3f3f3",
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
            </Link>

            {/* Gen + locație */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {book.genre && <Tag>{book.genre}</Tag>}
              {book.location && <Tag>📍 {book.location}</Tag>}
            </div>

            {/* Titlu + Autor */}
            <div>
              <h2 style={{ margin: "4px 0 0 0", fontSize: 18 }}>
                <Link to={`/carti/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {book.title}
                </Link>
              </h2>
              {book.author && (
                <p style={{ margin: 0, fontSize: 14, color: "#444" }}>{book.author}</p>
              )}
              {book.year && (
                <p style={{ margin: "4px 0", fontSize: 13, color: "#888" }}>
                  {book.year} • {book.publisher}
                </p>
              )}
            </div>

            {/* Subtitlu */}
            {book.subtitle && (
              <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{book.subtitle}</p>
            )}

            {/* Butoane */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
              {book.sampleUrl && (
                <a
                  href={book.sampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textAlign: "center",
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: "#d4a017",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  📖 Citește un fragment
                </a>
              )}

              <Link
                to={`/carti/${book.id}`}
                style={{
                  textAlign: "center",
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#2a9d8f",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                🛒 Cumpără
              </Link>

              <span
                style={{
                  textAlign: "center",
                  padding: "10px 12px",
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
        ))}
      </div>
    </div>
  );
}
