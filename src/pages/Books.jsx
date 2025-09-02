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
    let list = [...BOOKS];

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
      <h1 style={{ marginTop: 0 }}>📚 Biblioteca Midaway</h1>
      <div style={{ display: "grid", gap: 10, marginBottom: 10 }}>
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
              style={{ flex: 1, padding: "8px 10px", border: "1px solid #ddd", borderRadius: 10 }}
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
              style={{ flex: 1, padding: "8px 10px", border: "1px solid #ddd", borderRadius: 10 }}
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

      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          alignItems: "start",
        }}
      >
        {filtered.map((book) => (
          <div
            key={book.id}
            style={{
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 12,
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Link to={`/carti/${book.id}`} style={{ display: "block" }}>
  <div
    style={{
      width: "100%",
      height: 260,
      overflow: "hidden",
      borderRadius: 8,
      background: "#f3f3f3",
    }}
  >
    <img
      src={book.coverUrl}
      alt={book.title}
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </div>
</Link>


            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <Tag>{book.genre}</Tag>
              <Tag>📍 {book.location}</Tag>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>{book.year}</span>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
              {(book.tags || []).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <h2 style={{ margin: "4px 0 0 0", fontSize: 18 }}>
  <Link to={`/carti/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>
    {book.title}
  </Link>
</h2>

            <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{book.subtitle}</p>

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
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
        ))}
      </div>
    </div>
  );
}
