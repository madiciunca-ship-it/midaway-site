// src/pages/Donate.jsx
import { Link } from "react-router-dom";

export default function Donate() {
  return (
    <div className="container" style={{ padding: "24px 0 48px", maxWidth: 900 }}>
      <header className="font-cormorant" style={{ textAlign: "center", marginBottom: 12 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>Susține Midaway</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          Abonamente, donații unice și parteneriate. Împreună ducem poveștile mai departe.
        </p>
        {/* Buton mic spre sponsorizări */}
        <div style={{ marginTop: 10 }}>
          <Link className="btn-outline" to="/sponsorizari">
            Sponsorizări (PF & PJ)
          </Link>
        </div>
      </header>

      <section style={{
        background: "#fff",
        borderRadius: 14,
        padding: 16,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        marginTop: 16
      }}>
        <h2 className="font-cormorant" style={{ marginTop: 0, fontSize: 26 }}>Donație prin transfer bancar</h2>
        <p>Poți susține Midaway și prin transfer direct:</p>
        <div style={{ display: "grid", gap: 8 }}>
          <div><strong>Asociația MIDAWAY</strong></div>
          <div>IBAN RON: <code>RO00 BANK 0000 0000 0000 0000</code></div>
          <div>IBAN EUR: <code>RO00 BANK 0000 0000 0000 0000</code> (SWIFT: <code>BANKROBU</code>)</div>
          <div>Detalii plată: <em>Donație Midaway – Nume Prenume</em></div>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a className="btn" href="/contact?subject=Confirmare%20donație%20prin%20transfer">Confirm donația</a>
          <a className="btn-outline" href="/contact?subject=Întrebări%20donații">Întrebări</a>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="font-cormorant" style={{ fontSize: 26 }}>Abonamente</h2>
        <p>
          Vrei abonament lunar? Alege unul dintre planurile din pagina{" "}
          <Link to="/proiecte/sustinere#planuri" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Susține Midaway
          </Link>
          . Ulterior putem activa plata directă cu cardul (Stripe).
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <a className="btn-outline" href="/contact?subject=Abonament%20Explorator">Explorator</a>
          <a className="btn-outline" href="/contact?subject=Abonament%20Călător">Călător</a>
          <a className="btn-outline" href="/contact?subject=Abonament%20Povestitor">Povestitor</a>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="font-cormorant" style={{ fontSize: 26 }}>Parteneriate & Sponsorizări</h2>
        <p>
          Ești companie sau instituție? Hai să configurăm o sponsorizare sau un parteneriat.
          Îți trimitem model de contract și detalii fiscale.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="btn" to="/sponsorizari">Detalii sponsorizări</Link>
          <a className="btn-outline" href="/contact?subject=Parteneriat%20instituțional">Propune parteneriat</a>
        </div>
      </section>
    </div>
  );
}
