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

      {/* ✅ adăugat: mesaj clar pentru Stripe + linkuri de descărcare */}
      <p style={{ marginTop: 12, fontSize: 16, color: "#333" }}>
        Dacă plata a fost finalizată prin Stripe, vei primi automat pe email
        <strong> linkurile securizate de descărcare</strong> pentru eBook-urile tale
        (valabile 48 de ore). Verifică și folderele „Spam” / „Promotions” dacă nu le vezi imediat.
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
