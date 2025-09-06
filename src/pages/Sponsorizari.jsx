// src/pages/Sponsorizari.jsx
import { Link } from "react-router-dom";

export default function Sponsorizari() {
  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header */}
      <header className="font-cormorant" style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>Sponsorizări</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          Susține Midaway: donații unice sau lunare, redirecționare impozit, parteneriate.
        </p>
      </header>

      {/* 3 căi rapide */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <Card
          title="Donație unică"
          text="Susține un proiect punctual sau pur și simplu Midaway, o singură dată."
          actions={
            <Link to="/donatii" className="btn" style={{ textDecoration: "none" }}>
              Donează acum
            </Link>
          }
        />

        <Card
          title="Abonamente lunare"
          text="Explorator, Călător sau Povestitor — planuri cu beneficii pentru membri."
          actions={
            <Link to="/proiecte/sustinere" className="btn" style={{ textDecoration: "none" }}>
              Detalii abonamente
            </Link>
          }
        />

        <Card
          title="Sponsorizare (PF & PJ)"
          text="Redirecționare impozit pentru persoane fizice și juridice sau parteneriat."
          actions={
            <Link
              to="/contact?s=Intrebari%20sponsorizare"
              className="btn"
              style={{ textDecoration: "none" }}
            >
              Întrebări
            </Link>
          }
        />
      </div>

      {/* Persoane fizice */}
      <section style={{ marginTop: 24 }}>
        <h2 className="font-cormorant" style={{ margin: "0 0 8px 0", fontSize: 28 }}>
          Persoane fizice
        </h2>
        <p style={{ marginTop: 4, lineHeight: 1.6 }}>
          Poți redirecționa <b>3.5%</b> din impozitul pe venit către Asociație, completând
          <i> Formularul 230</i>. Îl poți depune online în Spațiul Privat Virtual sau la ANAF.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          <a
            href="/docs/formular-230.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ textDecoration: "none" }}
          >
            Descarcă Formular 230
          </a>
          <Link
            to="/contact?s=Ajutor%20Formular%20230"
            className="btn"
            style={{ textDecoration: "none" }}
          >
            Ajutor completare
          </Link>
        </div>
      </section>

      {/* Persoane juridice */}
      <section style={{ marginTop: 28 }}>
        <h2 className="font-cormorant" style={{ margin: "0 0 8px 0", fontSize: 28 }}>
          Persoane juridice
        </h2>
        <p style={{ marginTop: 4, lineHeight: 1.6 }}>
          Companiile pot sponsoriza în limita a <b>20%</b> din impozitul pe profit (sau 0.75% din
          cifra de afaceri, dacă e mai mică). Sponsorizarea se deduce conform legii în vigoare.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          <a
            href="/docs/contract-sponsorizare.docx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ textDecoration: "none" }}
          >
            Contract sponsorizare
          </a>
          <Link
            to="/contact?s=Parteneriat%20institu%C8%9Bional"
            className="btn"
            style={{ textDecoration: "none" }}
          >
            Parteneriat instituțional
          </Link>
        </div>
      </section>

      {/* Detalii bancare */}
      <section style={{ marginTop: 28 }}>
        <h2 className="font-cormorant" style={{ margin: "0 0 8px 0", fontSize: 28 }}>
          Detalii bancare
        </h2>

        <div
          style={{
            padding: 16,
            borderRadius: 12,
            border: "1px solid var(--line)",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,.06)",
          }}
        >
          <Line label="Denumire asociație" value="Asociația MIDAWAY" />
          <Line label="CUI" value="RO-XXXXXXX" />
          <Line label="IBAN" value="RO00 BANK 0000 0000 0000 0000" />
          <Line label="Banca" value="Banca Exemplu SA, Sucursala …" />
          <Line label="Adresa" value="Str. Exemplu nr. 00, București" />
          <small style={{ color: "var(--secondary)" }}>
            *Înlocuim cu datele finale imediat ce sunt emise.
          </small>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <p style={{ color: "var(--secondary)" }}>
          Pentru orice întrebare:{" "}
          <Link to="/contact?s=Intrebari%20sponsorizare">contactează-ne</Link>.
          Îți mulțumim că ajuți proiectele Midaway să crească. 🤍
        </p>
      </section>
    </div>
  );
}

/* ——— mici componente interne ——— */

function Card({ title, text, actions }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        border: "1px solid var(--line)",
        background: "#fff",
        minHeight: 160,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
      }}
    >
      <h3 className="font-cormorant" style={{ margin: 0, fontSize: 22 }}>
        {title}
      </h3>
      <p style={{ margin: 0, color: "var(--secondary)" }}>{text}</p>
      <div style={{ marginTop: "auto" }}>{actions}</div>
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, marginBottom: 8 }}>
      <span style={{ color: "var(--secondary)" }}>{label}</span>
      <b>{value}</b>
    </div>
  );
}
