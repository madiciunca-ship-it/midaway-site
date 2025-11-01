// src/pages/Servicii.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// 👇 definim aici serviciile (poți modifica liber)
const SERVICES = [
  {
    id: "consultanta-editoriala-60",
    title: "Consultanță editorială (60 min)",
    subtitle:
      "Sesiune 1:1 – structură, flow, public-țintă, strategie publicare.",
    bullets: [
      "call pe Zoom/Google Meet",
      "feedback pe sinopsis / structură",
      "recomandări concrete următorii pași",
    ],
    price: 250,
    currency: "RON",
    delivery: "60 min",
    cancelWindow: "24h",
    available: true,
  },
  {
    id: "design-coperta",
    title: "Design copertă",
    subtitle:
      "Concept + machetă finală pentru eBook & Paperback.",
    bullets: [
      "2 concepte inițiale",
      "2 runde revizii",
      "fișiere finale pentru eBook & print",
    ],
    price: 900,
    currency: "RON",
    delivery: "livrare 5–10 zile",
    cancelWindow: "48h",
    available: true,
  },
  {
    id: "publicare-distributie-kdp",
    title: "Publicare & distribuție (KDP)",
    subtitle:
      "Setare cont, formatare, încărcare, optimizare pagină Amazon.",
    bullets: [
      "formatare eBook/paperback",
      "optimizare descriere & categorii",
      "încărcare în KDP + verificări",
    ],
    price: 1200,
    currency: "RON",
    delivery: "livrare 7–14 zile",
    cancelWindow: "48h",
    available: false, // în curând
  },

  // ── MODEL INVIZIBIL (copie → editează → setează available:true) ─────────
  // {
  //   id: "model-nou-serviciu",
  //   title: "Titlu serviciu",
  //   subtitle: "Scurtă descriere / ce primește clientul",
  //   bullets: ["beneficiu #1", "beneficiu #2"],
  //   price: 0,
  //   currency: "RON",
  //   delivery: "livrare X–Y zile",
  //   cancelWindow: "24h",
  //   available: false,
  // },
];

export default function Servicii() {
  const { add } = useCart();

  const addService = (svc) => {
    add({
      id: `svc-${svc.id}`,
      title: svc.title,
      format: "SERVICE",
      lang: "RO",
      price: svc.price,
      currency: svc.currency || "RON",
      qty: 1,
      fulfillment: "service", // 👈 important pt. mesajul legal din Checkout
    });
  };

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 1100 }}>
      {/* ── HERO IDENTIC CU PAGINA „AUTORII” ─────────────────────────── */}
      <header
        className="font-cormorant"
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        <h1 style={{ margin: 0, fontSize: 44 }}>Servicii</h1>

        <p style={{ color: "var(--secondary)", marginTop: 8, fontSize: 18 }}>
          Alege serviciul potrivit etapei tale: consultanță, design, publicare.
          Programarea și prestarea se fac conform{" "}
          <Link to="/politica-anulare" style={{ color: "var(--secondary)" }}>
            Politicii de anulare
          </Link>.
        </p>

        <p
          style={{
            maxWidth: 1100,
            margin: "8px auto 0",
            color: "#222",
            lineHeight: 1.8,
            fontSize: 18,
          }}
        >
          Lucrăm 1:1, cu ritm și claritate. Te ajutăm să-ți definești direcția,
          să-ți rafinezi mesajul și să ajungi la o versiune finală demnă de
          publicare (eBook și/sau paperback). Dacă nu ești sigur(ă) de unde
          să începi, alege <strong>consultanța editorială</strong> — e cel
          mai bun prim pas.
        </p>

        <div
          style={{
            height: 2,
            background: "#d5b56f",
            opacity: 0.6,
            marginTop: 18,
          }}
        />
      </header>

      {/* ── GRID servicii ────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 16,
        }}
      >
        {SERVICES.map((svc) => (
          <div
            key={svc.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 16,
              padding: 18,
              background: "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <h3
                className="font-cormorant"
                style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}
              >
                {svc.title}
              </h3>
              {!svc.available && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#eee",
                    color: "#555",
                    borderRadius: 999,
                    padding: "2px 8px",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  în curând
                </span>
              )}
            </div>

            <p style={{ margin: "6px 0 10px 0", color: "#444" }}>
              {svc.subtitle}
            </p>

            <div style={{ color: "#0f5132", fontWeight: 700, marginBottom: 8 }}>
              {svc.price} {svc.currency || "RON"} • {svc.delivery}
            </div>

            <ul style={{ margin: "8px 0 12px 18px", lineHeight: 1.6 }}>
              {svc.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {svc.available ? (
              <button
                onClick={() => addService(svc)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #0f766e",
                  background: "#2a9d8f",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Adaugă în coș
              </button>
            ) : (
              <button
                disabled
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#eee",
                  color: "#777",
                  fontWeight: 600,
                }}
              >
                în curând
              </button>
            )}

            <div
              style={{
                marginTop: 10,
                color: "#5c4b00",
                fontSize: 12,
                borderTop: "1px dashed #e6c200",
                paddingTop: 8,
              }}
            >
              Fereastră anulare: {svc.cancelWindow} •{" "}
              <Link to="/politica-anulare" style={{ color: "var(--accent)" }}>
                politica
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
