import { Link } from "react-router-dom";
import projects from "../data/projects";

export default function Projects() {
  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      <header
  className="font-cormorant"
  style={{ marginBottom: 24, textAlign: "center" }}
>
  <h1 style={{ margin: 0, fontSize: 40 }}>Proiecte Midaway</h1>
  <p style={{ color: "var(--secondary)", marginTop: 8 }}>
    Direcțiile prin care Midaway crește și aduce oamenii împreună.
  </p>
</header>


      <div className="proj-grid">
        {projects.map((p) => {
          const textColor = p.darkOnCard ? "#fff" : "inherit";
          return (
            <Link
              key={p.id}
              to={`/proiecte/${p.id}`}
              className="proj-card"
              style={{
                textDecoration: "none",
                color: textColor,
                background: `var(${p.colorVar})`
              }}
            >
              <div
                className="proj-cover"
                style={{ backgroundImage: `url(${p.cover})` }}
              />
              <div className="proj-body">
                <div style={{ fontSize: 32, lineHeight: 1 }}>{p.emoji}</div>
                <h3 className="font-cormorant" style={{ margin: "6px 0 6px" }}>
                  {p.title}
                </h3>
                <p style={{ margin: 0, opacity: p.darkOnCard ? 0.9 : 0.8 }}>
                  {p.tagline}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

