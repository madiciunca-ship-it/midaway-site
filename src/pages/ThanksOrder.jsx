import React from "react";
import { Link } from "react-router-dom";

export default function ThanksOrder() {
  return (
    <div
      style={{
        padding: "48px 24px",
        maxWidth: 700,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#2a9d8f" }}>Mulțumim pentru comandă!</h1>
      <p style={{ marginTop: 16, fontSize: 18 }}>
        Am primit detaliile și îți vom trimite în curând un email de confirmare
        cu instrucțiunile de plată sau link-urile directe către produse.
      </p>

      <div style={{ marginTop: 40 }}>
        <Link
          to="/carti"
          style={{
            background: "#2a9d8f",
            color: "white",
            padding: "12px 24px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ⟵ Înapoi la Cărți
        </Link>
      </div>
    </div>
  );
}
