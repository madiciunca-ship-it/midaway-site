import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="container" style={{ padding: "40px 16px" }}>
        <h1 className="font-cormorant">Proiectul nu există</h1>
        <p>
          Înapoi la{" "}
          <Link to="/proiecte" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Proiecte
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="proj-hero" style={{ backgroundImage: `url(${p.cover})` }}>
        <div className="proj-hero-overlay" />
        <div className="container">
          <h1 className="font-cormorant" style={{ color: "#fff", margin: 0, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 34 }}>{p.emoji}</span> {p.title}
          </h1>
          <p style={{ color: "#fff", opacity: 0.9, marginTop: 8 }}>{p.tagline}</p>
        </div>
      </div>

      <div className="container" style={{ padding: "24px 0 48px", maxWidth: 900 }}>
        {p.body.map((para, i) => (
          <p key={i} style={{ lineHeight: 1.7 }}>{para}</p>
        ))}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          {p.links.map((l, i) => (
            <Link key={i} to={l.href} className="btn" style={{ textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/proiecte" style={{ alignSelf: "center", color: "var(--secondary)", textDecoration: "none" }}>
            ← Înapoi la proiecte
          </Link>
        </div>
      </div>
    </>
  );
}
