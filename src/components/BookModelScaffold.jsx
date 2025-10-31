// src/components/BookModelScaffold.jsx
import React from "react";

export default function BookModelScaffold({ visible = false }) {
  return (
    <div style={{ display: visible ? "block" : "none", padding: 24, border: "1px dashed #ddd", borderRadius: 12, margin: "16px 0" }}>
      <style>{`
        .book-covers-top{
          display:flex; justify-content:center; align-items:flex-start;
          gap:20px; margin:20px auto 28px; flex-wrap:wrap;
        }
        .book-covers-top .coverBox{
          flex:0 1 340px; max-width:46%;
          border:1px solid #eee; border-radius:12px; overflow:hidden;
          background:#fafafa; box-shadow:0 6px 18px rgba(0,0,0,.08);
        }
        .book-covers-top img{ width:100%; height:auto; display:block; }
        @media (max-width:768px){
          .book-covers-top{ gap:12px; margin:12px auto 20px; }
          .book-covers-top .coverBox{ max-width:92%; }
        }
        .pill{ display:inline-block; padding:6px 10px; border:1px solid #ddd; border-radius:999px; background:#fff; font-size:12px; }
      `}</style>

      {/* Coperți față + spate */}
      <div className="book-covers-top" data-field="covers">
        <div className="coverBox">
          <img src="/placeholder-cover.png" alt="Model Coperta față" data-field="coverUrl" />
        </div>
        <div className="coverBox">
          <img src="/placeholder-cover.png" alt="Model Coperta spate" data-field="extraImage" />
        </div>
      </div>

      {/* Titlu + subtitlu */}
      <h1 data-field="title">Model Title</h1>
      <p data-field="subtitle" style={{ fontStyle: "italic", color: "#666", marginTop: -8 }}>
        Model subtitle
      </p>

      {/* Taguri / meta */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} data-field="meta">
        <span className="pill" data-field="genre">Gen</span>
        <span className="pill" data-field="location">📍 Locație</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>
          <span data-field="year">2025</span> • <span data-field="publisher">Editură</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }} data-field="tags">
        <span className="pill">tag-1</span>
        <span className="pill">tag-2</span>
        <span className="pill">tag-3</span>
      </div>

      {/* Descriere */}
      <p style={{ marginTop: 16, lineHeight: 1.6 }} data-field="description">
        Model description — un scurt text de exemplu pentru a prefigura conținutul.
      </p>

      {/* Detalii tehnice */}
      <div style={{ marginTop: 16 }} data-field="details">
        <h3 style={{ margin: "0 0 8px 0" }}>Detalii tehnice</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
          <li>eBook • <span data-field="pages">000</span> pagini</li>
          <li>ISBN: <span data-field="isbn">---</span></li>
          <li>Dimensiuni: <span data-field="dimensions">13 x 20 cm</span></li>
          <li>Greutate: <span data-field="weight">—</span></li>
          <li>Editura: <span data-field="publisher">Editură</span></li>
          <li>An: <span data-field="year">2025</span></li>
        </ul>
      </div>

      {/* Citește un fragment */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        data-field="sampleUrl"
        style={{
          display: "inline-block",
          marginTop: 12,
          padding: "10px 12px",
          borderRadius: 10,
          background: "#d4a017",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        📖 Citește un fragment
      </a>

      {/* Machetă panou de cumpărare (vizual) */}
      <section
        aria-label="Alege formatul (machetă)"
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
          {["PDF", "EPUB", "PAPERBACK", "AUDIOBOOK"].map((fmt) => (
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
                textAlign: "center",
              }}
            >
              <strong style={{ fontSize: 14 }}>{fmt}</strong>
              <div style={{ fontSize: 13, color: "#333", margin: "10px 0" }}>
                <span data-field={`price-${fmt.toLowerCase()}`}>0</span>{" "}
                <span data-field="currency">RON</span>
              </div>
              <button
                disabled
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#e5e5e5",
                  color: "#666",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "not-allowed",
                }}
              >
                (machetă)
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
