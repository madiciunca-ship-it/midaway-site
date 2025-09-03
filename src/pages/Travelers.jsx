import React from "react";
import { Link } from "react-router-dom";

export default function Travelers() {
  const items = [
    { id: "nomad-bali",        icon: "🏝️", title: "Nomadul din Bali",        subtitle: "Ocean, cod și mango" },
    { id: "scriitoare-saigon", icon: "✍️", title: "Scriitoarea din Saigon",  subtitle: "Cafele, pagini, ploaie" },
    { id: "calatoare-barca",   icon: "🚤", title: "Călătoarea cu barca",      subtitle: "Insule, vânt, povești" },
    { id: "nomad-tokyo",       icon: "🗼", title: "Nomadul din Tokyo",       subtitle: "Luminile orașului, liniștea trenurilor" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <section style={{ marginBottom: 16 }}>
        <h1 style={{ marginTop: 0 }}>🧳 Călători & Călătorii</h1>
        <p style={{ color: "#555", lineHeight: 1.7, margin: "6px 0 0 0" }}>
          Sunt oameni care își poartă casele în rucsac și poveștile în priviri.
          Ne întâlnim aici — într-o hartă de pași, vânt și pagini.
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 8,
        }}
      >
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/calatori/${p.id}`}
            style={{
              display: "block",
              padding: 16,
              border: "1px solid #eee",
              borderRadius: 12,
              background: "#fff",
              color: "#111",
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              transition: "transform .12s ease",
            }}
          >
            <div style={{ fontSize: 32 }}>{p.icon}</div>
            <h3 style={{ margin: "8px 0 4px 0" }}>{p.title}</h3>
            <p style={{ margin: 0, color: "#666" }}>{p.subtitle}</p>
            <div style={{ marginTop: 10, fontSize: 13, color: "#888" }}>Detalii →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
