// src/pages/ProjectDetail.jsx
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

  const isSupport = p.id === "sustinere";

  return (
    <>
      {/* HERO cu cover */}
      <div className="proj-hero" style={{ backgroundImage: `url(${p.cover})` }}>
        <div className="proj-hero-overlay" />
        <div className="container">
          <h1
            className="font-cormorant"
            style={{ color: "#fff", margin: 0, display: "flex", gap: 12, alignItems: "center" }}
          >
            <span style={{ fontSize: 34 }}>{p.emoji}</span> {p.title}
          </h1>
          <p style={{ color: "#fff", opacity: 0.9, marginTop: 8 }}>{p.tagline}</p>
        </div>
      </div>

      {/* BODY */}
      <div className="container" style={{ padding: "24px 0 48px", maxWidth: 900 }}>
        {p.body.map((para, i) => (
          <p key={i} style={{ lineHeight: 1.7 }}>{para}</p>
        ))}

        {/* Dacă e Susținere – afișăm planuri (tiers) */}
        {isSupport && (
          <>
            <h2 id="planuri" className="font-cormorant" style={{ marginTop: 24 }}>Planuri de abonament</h2>
            <div className="plan-grid">
              <div className="plan-card">
                <h3 className="plan-title">Explorator</h3>
                <div className="plan-price">5 € / lună</div>
                <ul className="plan-ul">
                  <li>Newsletter lunar extins</li>
                  <li>Fragmente în premieră</li>
                  <li>Badge „Susținător Midaway”</li>
                </ul>
                <div className="plan-actions">
                  <a className="btn" href="/contact?subject=Explorator%20-%20Abonament">Înscrie-te</a>
                  <a className="btn-outline" href="/contact?subject=Explorator%20-%20Întrebări">Întrebări</a>
                  {/* Buton nou */}
                  <Link to="/donatii" className="btn-outline">Donează acum</Link>
                </div>
              </div>

              <div className="plan-card" style={{ position: "relative", border: "1px solid #f1d6d6" }}>
                <span
                  style={{
                    position: "absolute", top: 12, right: 12,
                    background: "var(--accent)", color: "#fff",
                    padding: "4px 10px", borderRadius: 999, fontSize: 12
                  }}
                >
                  Popular
                </span>
                <h3 className="plan-title">Călător</h3>
                <div className="plan-price">10 € / lună</div>
                <ul className="plan-ul">
                  <li>Tot din Explorator</li>
                  <li>Ebook-uri cadou (selecție trimestrială)</li>
                  <li>Acces la întâlniri online</li>
                </ul>
                <div className="plan-actions">
                  <a className="btn" href="/contact?subject=Călător%20-%20Abonament">Înscrie-te</a>
                  <a className="btn-outline" href="/contact?subject=Călător%20-%20Întrebări">Întrebări</a>
                  {/* Buton nou */}
                  <Link to="/donatii" className="btn-outline">Donează acum</Link>
                </div>
              </div>

              <div className="plan-card">
                <h3 className="plan-title">Povestitor</h3>
                <div className="plan-price">20 € / lună</div>
                <ul className="plan-ul">
                  <li>Tot din Călător</li>
                  <li>Licență instituțională (1 bibliotecă/centru)</li>
                  <li>Acces VIP la lansări & sesiuni Q&A</li>
                </ul>
                <div className="plan-actions">
                  <a className="btn" href="/contact?subject=Povestitor%20-%20Abonament">Înscrie-te</a>
                  <a className="btn-outline" href="/contact?subject=Povestitor%20-%20Întrebări">Întrebări</a>
                  {/* Buton nou */}
                  <Link to="/donatii" className="btn-outline">Donează acum</Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Butoane standard din data.links */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
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
