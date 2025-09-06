// src/pages/Sponsorizari.jsx
import { Link } from "react-router-dom";

export default function Sponsorizari() {
  return (
    <div className="container" style={{ padding: "32px 0 48px", maxWidth: 900 }}>
      <header className="font-cormorant" style={{ textAlign: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>Sponsorizări & Redirecționare impozit</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          Susține Midaway prin sponsorizare sau redirecționarea unei părți din impozit.
        </p>
      </header>

      {/* Persoane fizice */}
      <section style={card}>
        <h2 className="font-cormorant" style={h2}>Persoane fizice</h2>
        <p style={p}>
          Poți redirecționa o cotă din impozitul pe venit (ex.: 3,5%) către Asociația MIDAWAY.
          Se completează <strong>Formularul 230</strong> (pentru venituri din salarii/pensii) sau prin
          declarația unică (PFA). Detaliile exacte pot varia în funcție de anul fiscal – te ajutăm să le completezi corect.
        </p>
        <div style={btnRow}>
          <a className="btn" href="/docs/formular-230.pdf" target="_blank" rel="noopener noreferrer">
            Descarcă Formular 230 (PDF)
          </a>
          <a className="btn-outline" href="/contact?subject=Întrebări%20Formular%20230">
            Am nevoie de ajutor
          </a>
        </div>
      </section>

      {/* Persoane juridice */}
      <section style={card}>
        <h2 className="font-cormorant" style={h2}>Persoane juridice</h2>
        <p style={p}>
          Companiile pot face sponsorizări deductibile în anumite limite (micro/profit). Îți punem la dispoziție
          un <strong>model de contract</strong> și te ghidăm pentru încadrarea fiscală corectă.
        </p>
        <ul style={{ marginTop: 6, lineHeight: 1.6 }}>
          <li>Sponsorizare pentru microîntreprinderi / plătitori de impozit pe profit</li>
          <li>Promovare pe canalele Midaway (dacă dorești vizibilitate)</li>
          <li>Raport de impact și transparență privind utilizarea fondurilor</li>
        </ul>
        <div style={btnRow}>
          <a className="btn" href="/docs/contract-sponsorizare.docx">
            Descarcă Contract sponsorizare (DOCX)
          </a>
          <a className="btn-outline" href="/contact?subject=Sponsorizare%20companie">
            Vreau să discutăm
          </a>
        </div>
      </section>

      {/* Date organizație (pentru transfer direct) */}
      <section style={card}>
        <h2 className="font-cormorant" style={h2}>Date organizație</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <div><strong>Asociația MIDAWAY</strong></div>
          <div>CIF: <code>—</code></div>
          <div>IBAN RON: <code>RO00 BANK 0000 0000 0000 0000</code></div>
          <div>IBAN EUR: <code>RO00 BANK 0000 0000 0000 0000</code> · SWIFT: <code>BANKROBU</code></div>
          <div>Email: <a href="mailto:contact@midaway.ro">contact@midaway.ro</a></div>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a className="btn-outline" href="/donatii">Donații & abonamente</a>
          <Link className="btn-outline" to="/contact?subject=Întrebări%20sponsorizări">Întrebări</Link>
        </div>
      </section>

      {/* FAQ scurt */}
      <section style={card}>
        <h2 className="font-cormorant" style={h2}>Întrebări frecvente</h2>
        <details style={details}>
          <summary>Care este procentul pe care îl pot redirecționa?</summary>
          <div style={ans}>
            Cota pentru persoane fizice a fost în trecut 2% / 3,5%, în funcție de tipul entității. Verificăm împreună
            varianta actualizată și îți trimitem pașii concreți.
          </div>
        </details>
        <details style={details}>
          <summary>La firme este deductibilă sponsorizarea?</summary>
          <div style={ans}>
            Da, în limitele prevăzute de lege (micro/profit). Îți oferim model de contract și discutăm cu contabilul tău
            detaliile pentru încadrarea corectă.
          </div>
        </details>
        <details style={details}>
          <summary>Pot primi un raport despre cum folosim fondurile?</summary>
          <div style={ans}>
            Desigur. Publicăm periodic un raport de impact și utilizare a resurselor, iar partenerii primesc update-uri dedicate.
          </div>
        </details>
      </section>
    </div>
  );
}

const card = {
  background: "#fff",
  borderRadius: 14,
  padding: 16,
  boxShadow: "0 6px 16px rgba(0,0,0,.06)",
  marginTop: 18,
};
const h2 = { margin: "0 0 8px 0", fontSize: 26 };
const p = { marginTop: 4, lineHeight: 1.6 };
const btnRow = { marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" };
const details = {
  padding: "10px 0",
  borderTop: "1px solid #eee",
};
const ans = { marginTop: 8, color: "#444", lineHeight: 1.6 };
