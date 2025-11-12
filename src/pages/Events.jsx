// src/pages/Events.jsx
import { Link } from "react-router-dom";

export default function Events() {
  // poți completa array-ul ăsta oricând
  const upcoming = [
    // Exemplu:
    // { id: "retreat-primavara", date: "10–12 mai 2026", title: "Retreat de scris – Bali", status: "Inscrieri deschise" },
  ];

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      <h1 className="font-cormorant" style={{ margin: 0 }}>Calendar evenimente</h1>
      <p style={{ opacity: .99, marginTop: 6 }}>
        Spații pentru scris, respirație și întâlniri vii.
      </p>

      {upcoming.length === 0 ? (
        <div style={{ marginTop: 18, lineHeight: 1.8 }}>
          <p>Momentan nu avem date anunțate public. Lucrăm la următoarea ediție.</p>
          <p>
  Dacă vrei să fii anunțat/ă la următoarea deschidere de înscrieri, scrie-ne prin{" "}
  <Link to="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
    pagina de contact
  </Link>{" "}
  sau urmărește-ne pe social media.
</p>
        </div>
      ) : (
        <div style={{ marginTop: 18 }}>
          {upcoming.map(ev => (
            <div key={ev.id} style={{
              padding: "14px 16px",
              borderRadius: 14,
              background: "#fff",
              boxShadow: "0 8px 18px rgba(0,0,0,.06)",
              marginBottom: 12
            }}>
              <div className="font-cormorant" style={{ fontSize: 20, marginBottom: 4 }}>
                {ev.title}
              </div>
              <div style={{ color: "var(--secondary)", marginBottom: 6 }}>{ev.date}</div>
              {ev.status && <div><span style={{
                background: "#f2e5e0",
                color: "#5a4540",
                borderRadius: 999, padding: "4px 10px", fontSize: 12
              }}>{ev.status}</span></div>}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <Link to="/proiecte/evenimente" className="btn">← Înapoi la Evenimente & Retreaturi</Link>
      </div>
    </div>
  );
}
