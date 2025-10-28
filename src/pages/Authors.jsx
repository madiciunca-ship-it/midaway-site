// src/pages/Authors.jsx
import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import authors from "../data/authors";

export default function Authors() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const lang = params.get("lang") === "en" ? "en" : "ro";

  useEffect(() => {
    const saved = localStorage.getItem("authors.lang");
    if (!params.get("lang") && saved) {
      setParams((p) => {
        const copy = new URLSearchParams(p);
        copy.set("lang", saved);
        return copy;
      });
    }
  }, []); // eslint-disable-line

  const setLang = (l) => {
    setParams((p) => {
      const c = new URLSearchParams(p);
      c.set("lang", l);
      if (q) c.set("q", q);
      return c;
    });
    localStorage.setItem("authors.lang", l);
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = authors.map((a) => ({
      a,
      d:
        (lang === "en" ? a.en : a.ro) ||
        a.ro ||
        a.en || { name: a.id, role: "", tagline: "" },
    }));
    if (!term) return list;
    return list.filter(({ d }) =>
      `${d.name} ${d.role} ${d.tagline}`.toLowerCase().includes(term)
    );
  }, [q, lang]);

  const placeholders = Math.max(0, 3 - filtered.length);

  // pozele tale deja puse în /public
  const phImages = [
    "/assets/books/authors/autor-no-name-unu.webp",
    "/assets/books/authors/autor-no-name-doi.webp",
    "/assets/books/authors/autor-no-name-trei.webp",
  ];

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header */}
      <header id="devino" className="font-cormorant" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>
          {lang === "en" ? "Midaway Authors" : "Autorii Midaway"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          {lang === "en"
            ? "Independent voices we publish — people first, then books."
            : "Vocile independente pe care le publicăm — întâi oamenii, apoi cărțile."}
        </p>
        <p style={{ color: "var(--secondary)", marginTop: 6, maxWidth: 900 }}>
          {lang === "en"
            ? "We believe in authenticity and in voices shaped by real journeys. Whether you’re a debut writer or already published, Midaway offers a caring space for editing, validation and thoughtful promotion — a place where your voice matters."
            : "Credem în autenticitate și în voci care cresc din experiențe reale. Fie că ești la început sau ai cărți publicate, Midaway oferă spațiu pentru editare, validare și promovare atentă — un loc în care vocea ta contează."}
        </p>
      </header>

      {/* Search + Lang */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setParams((p) => {
              const c = new URLSearchParams(p);
              if (e.target.value) c.set("q", e.target.value);
              else c.delete("q");
              return c;
            });
          }}
          placeholder={lang === "en" ? "Search authors…" : "Caută autori…"}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #ddd",
          }}
        />

        <div
          role="group"
          aria-label="Language switch"
          style={{
            display: "inline-flex",
            border: "1px solid #ddd",
            borderRadius: 999,
            overflow: "hidden",
            background: "#fcfaee",
          }}
        >
          <button onClick={() => setLang("ro")} style={segBtn(lang === "ro")}>RO</button>
          <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>EN</button>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map(({ a, d }) => (
          <AuthorCard key={a.id} a={a} d={d} lang={lang} />
        ))}

        {Array.from({ length: placeholders }).map((_, i) => (
          <PlaceholderCard
            key={`ph-${i}`}
            lang={lang}
            index={i}
            image={phImages[i]}
          />
        ))}
      </div>
    </div>
  );
}

function AuthorCard({ a, d, lang }) {
  return (
    <Link
      to={`/autori/${a.id}?lang=${lang}`}
      className="proj-card"
      style={{
        textDecoration: "none",
        color: "inherit",
        background: "#fcfaee",
        border: "1px solid var(--line)",
        borderRadius: 18,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 220,
          backgroundImage: `url(${a.photo || "/assets/placeholder-cover.png"})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundColor: "#fcfaee",
        }}
      />
      <div style={{ padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 22, lineHeight: 1, opacity: .85 }}>✒️</div>
        <h3 className="font-cormorant" style={{ margin: "6px 0 6px", fontSize: 22 }}>
          {d.name}
        </h3>
        <p style={{ margin: 0, color: "var(--secondary)" }}>
          {d.role}
          {d.tagline ? ` — ${d.tagline}` : ""}
        </p>
        <p className="proj-details" style={{ marginTop: 8 }}>
          {lang === "en" ? "Details →" : "Detalii →"}
        </p>
      </div>
    </Link>
  );
}

function PlaceholderCard({ lang, image }) {
  return (
    <div
      className="proj-card"
      style={{
        background: "#fcfaee",
        border: "1px solid var(--line)",
        borderRadius: 18,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 220,
          backgroundImage: image ? `url(${image})` : "none",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundColor: "#fcfaee", // bej cald ca la Mida
        }}
      />
      <div style={{ padding: 14, textAlign: "center" }}>
        <h3
          className="font-cormorant"
          style={{ margin: "6px 0 6px", fontSize: 22, color: "#1a1a1a" }}
        >
          {lang === "en" ? "Your name here 😊" : "Aici va fi numele TĂU 😊"}
        </h3>
        <p style={{ margin: 0, color: "var(--secondary)" }}>
          {lang === "en" ? "Midaway author — soon" : "Autor Midaway – în curând"}
        </p>

        <Link
          to={`/contact?subject=${encodeURIComponent(
            lang === "en" ? "New author collaboration" : "Colaborare autor nou"
          )}`}
          className="btn"
          style={{
            textDecoration: "none",
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 999,
            background: "var(--card3)",       // cald, luminos, nu strident
            color: "#2b2b2b",
            border: "1px solid rgba(0,0,0,.08)",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
            display: "inline-block",
          }}
        >
          {lang === "en" ? "Propose a collaboration" : "Propune o colaborare"}
        </Link>
      </div>
    </div>
  );
}

function segBtn(active) {
  return {
    padding: "8px 14px",
    border: "none",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#fff" : "#444",
    cursor: "pointer",
    fontWeight: 700,
  };
}
