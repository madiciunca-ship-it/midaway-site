import React from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const items = [
    { id: "biblioteca", icon: "📚", title: "Biblioteca Midaway" },
    { id: "erasmus", icon: "🌍", title: "Erasmus+" },
    { id: "media", icon: "🎥", title: "Conținut media" },
    { id: "editura", icon: "✍️", title: "Editura Midaway" },
    { id: "evenimente", icon: "🧭", title: "Evenimente & Retreaturi" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>🌟 Proiecte Midaway</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Direcțiile mari prin care Midaway crește și aduce oamenii împreună.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/proiecte/${p.id}`}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              textDecoration: "none",
              color: "#111",
            }}
          >
            <div style={{ fontSize: 32 }}>{p.icon}</div>
            <h3 style={{ margin: "8px 0 6px 0" }}>{p.title}</h3>
            <p style={{ color: "#666", margin: 0 }}>Detalii →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
