// src/pages/Projects.jsx
import { useState } from "react"; 
import { Link } from "react-router-dom";
import projects from "../data/projects";

const filters = [
  { key: "all", label: "Toate" },
  { key: "educatie", label: "Educație" },
  { key: "media", label: "Media" },
  { key: "evenimente", label: "Evenimente" },
];

export default function Projects() {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header centrat */}
      <header
        className="font-cormorant"
        style={{ marginBottom: 24, textAlign: "center" }}
      >
        <h1 style={{ margin: 0, fontSize: 40 }}>Proiecte Midaway</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          Direcțiile prin care Midaway crește și aduce oamenii împreună.
        </p>
      </header>

      {/* Tabs de filtrare */}
      <div className="proj-tabs">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`proj-tab ${active === f.key ? "active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid de proiecte */}
      <div className="proj-grid">
        {filtered.map((p) => {
          const textColor = p.darkOnCard ? "#fff" : "inherit";
          return (
            <Link
              key={p.id}
              to={`/proiecte/${p.id}`}
              className="proj-card"
              style={{
                textDecoration: "none",
                color: textColor,
                background: `var(${p.colorVar})`,
              }}
            >
              <div
                className="proj-cover"
                style={{ backgroundImage: `url(${p.cover})` }}
              >
                {p.badge && (
                  <span
                    className="proj-badge"
                    style={{ background: p.badgeColor || "var(--accent)" }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="proj-body">
                <div style={{ fontSize: 32, lineHeight: 1 }}>{p.emoji}</div>
                <h3 className="font-cormorant" style={{ margin: "6px 0 6px" }}>
                  {p.title}
                </h3>
                <p style={{ margin: 0, opacity: p.darkOnCard ? 0.9 : 0.8 }}>
                  {p.tagline}
                </p>
                <p className="proj-details">Detalii →</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
