import { Link } from "react-router-dom";

function Card({ to, title, text }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: 16,
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        background: "#fff",
        color: "#111",
        textDecoration: "none",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "#555" }}>{text}</div>
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      {/* HERO / INTRO */}
      <section style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 6px 0" }}>👋 Salut, eu sunt Mida Malena</h1>
        <p style={{ margin: 0, color: "#555" }}>
          Scriu, călătoresc și adun povești. Midaway este locul unde se întâlnesc cărțile,
          oamenii și drumurile.
        </p>
        <p style={{ margin: "12px 0 0 0", fontStyle: "italic", color: "#333" }}>
          „Singurul lucru pe care îl putem pierde este Timpul.”
        </p>
      </section>

      {/* 3 CARDURI RAPIDE */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <Card
          to="/carti"
          title="📚 Cărți"
          text="Toate titlurile publicate, cu filtre după gen și locație."
        />
        <Card
          to="/blog"
          title="✍️ Blog"
          text="Eseuri, note de drum, fragmente – texte noi în curs."
        />
        <Card
          to="/voluntari"
          title="🤝 Voluntariat"
          text="Vrei să ajuți Midaway? Alătură-te comunității."
        />
      </section>
    </div>
  );
}
