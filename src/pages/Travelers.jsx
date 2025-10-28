// src/pages/Travelers.jsx
import { Link } from "react-router-dom";
import travelers from "../data/travelers";

export default function Travelers() {
  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header */}
      <section className="font-cormorant" style={{ marginBottom: 12 }}>
        <h1 style={{ marginTop: 0, fontSize: 40 }}>🧳 Călători & Călătorii</h1>
        <p style={{ color: "var(--secondary)", lineHeight: 1.7, margin: "6px 0 0 0" }}>
          Sunt oameni care își poartă casele în rucsac și poveștile în priviri.
          Ne întâlnim aici — într-o hartă de pași, vânt și pagini.
        </p>
      </section>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 8,
        }}
      >
        {travelers.map((t) => (
          <Link
            key={t.id}
            to={`/calatori/${t.id}`}
            className="proj-card"
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 18,
              boxShadow: "0 6px 16px rgba(0,0,0,.06)",
              overflow: "hidden",
              transition: "transform .12s ease",
            }}
          >
            {/* Cover mic, „contain” ca să nu taie fețe */}
            <div
              style={{
                height: 160,
                backgroundImage: `url(${t.cover})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundColor: "var(--card1)",
              }}
            />
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 26, lineHeight: 1 }}>{t.emoji}</div>
              <h3 className="font-cormorant" style={{ margin: "6px 0 4px 0", fontSize: 22 }}>
                {t.name}
              </h3>
              <p style={{ margin: 0, color: "var(--secondary)" }}>{t.tagline}</p>
              <p className="proj-details" style={{ marginTop: 8 }}>Detalii →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
