// src/pages/Authors.jsx
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authors from "../data/authors";

// ⬇️ POZE placeholder (din public/assets/authors/*.webp)
const PLACEHOLDER_PHOTOS = [
  "/assets/books/authors/autor-no-name-unu.webp",
  "/assets/books/authors/autor-no-name-doi.webp",
  "/assets/books/authors/autor-no-name-trei.webp",
];

// fond cald ca la cardurile de cărți
const CARD_BG = "linear-gradient(180deg,#fbf5ea 0%, #f7efe3 100%)";

// buton bej mic (soft)
const softBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "10px 14px",
  borderRadius: 999,
  background: "#e8d6bd",
  color: "#4a3b32",
  border: "1px solid rgba(0,0,0,.06)",
  boxShadow: "0 2px 6px rgba(0,0,0,.06)",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
};

// ⬇️ responsive helpers
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 640px)").matches;

// le păstrăm, chiar dacă nu mai folosim înălțime fixă
const IMG_H = isMobile ? 360 : 420; // (dacă vrei, îl poți folosi)
const FOCUS = isMobile ? "center 12%" : "center top";

// segment button (RO/EN)
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

const sectionNavStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid var(--accent)",
  color: "var(--accent)",
  textDecoration: "none",
  fontWeight: 600,
  background: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,.04)",
};

export default function Authors() {
  // 🔤 LIMBA – doar localStorage, fără ?lang în URL
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ro";
    const stored = localStorage.getItem("authors.lang");
    return stored === "en" ? "en" : "ro";
  });

  const ui =
  lang === "en"
    ? {
        backHome: "← Back to Home",
        backTop: "↑ Back to top",
      }
    : {
        backHome: "← Înapoi la Acasă",
        backTop: "↑ Înapoi sus",
      };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authors.lang", lang);
    }
  }, [lang]);

  // 🔍 căutare (doar în state, nu în URL)
  const [q, setQ] = useState("");

  // listă filtrată după nume/rol/tagline în limba curentă
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

  // 🔒 păstrăm Mida mereu prima, restul coboară (ultimul adăugat primul)
  const PIN_ID = "mida-malena";
  const pinned = filtered.find((x) => x.a.id === PIN_ID);
  const others = filtered.filter((x) => x.a.id !== PIN_ID);

  // dacă vrei ca ultimul adăugat în data să fie primul în grilă:
  const gridData = pinned ? [pinned, ...others.reverse()] : others.reverse();

  // completează până la 3 carduri cu placeholder (și poze reale)
  const placeholders = Math.max(0, 3 - filtered.length);

  return (
    <div className="container" style={{ padding: "32px 0 48px", overflowX: "hidden" }}>
    
    <div style={{ marginBottom: 18 }}>
        <Link to="/" style={sectionNavStyle}>
          {ui.backHome}
        </Link>
      </div>
     
     
      {/* Header centrat — albastru mic sus + descriere negru, ca la Călători */}
      <header
        className="font-cormorant"
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        <h1 style={{ margin: 0, fontSize: 44 }}>
          {lang === "en" ? "Midaway Authors" : "Autorii Midaway"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8, fontSize: 18 }}>
          {lang === "en"
            ? "Independent voices we publish – people first, then books."
            : "Vocile independente pe care le publicăm – întâi oamenii, apoi cărțile."}
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
          {lang === "en"
            ? "We believe in authenticity and in voices shaped by real experience. Whether you’re just beginning your journey or already have books in print, Midaway offers a space for careful editing, guidance, and thoughtful promotion – a place where your voice truly matters."
            : "Credem în autenticitate și în voci care cresc din experiențe reale. Fie că ești la început de drum sau ai deja cărți publicate, Midaway oferă spațiu pentru editare, validare și promovare atentă – un loc în care vocea ta chiar contează."}
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

      {/* Search + Lang */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={lang === "en" ? "Search authors…" : "Caută autori…"}
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #ddd",
            background: "#fff",
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
            background: "#fff",
          }}
        >
          <button onClick={() => setLang("ro")} style={segBtn(lang === "ro")}>
            RO
          </button>
          <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>
            EN
          </button>
        </div>
      </div>

      {/* Grid carduri */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 18,
          alignItems: "start",
          maxWidth: "100%",
        }}
      >
        {gridData.map(({ a, d }) => (
          <AuthorCard key={a.id} a={a} d={d} lang={lang} />
        ))}

        {Array.from({ length: placeholders }).map((_, i) => (
          <PlaceholderCard key={`ph-${i}`} lang={lang} index={i} />
        ))}
      </div>
      <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          style={sectionNavStyle}
        >
          {ui.backTop}
        </a>
      </div>
    </div>
  );
}

/* ----------------- Card autor existent ----------------- */
function AuthorCard({ a, d, lang }) {
  return (
    <Link
      to={`/autori/${a.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        background: CARD_BG,
        borderRadius: 22,
        boxShadow: "0 8px 18px rgba(0,0,0,.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* imagine mare — ca la cardurile de cărți */}
      <div style={{ padding: 14 }}>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "inset 0 0 0 6px rgba(255,255,255,.5)",
          }}
        >
          {/* ✅ Fără crop: aspectRatio + contain */}
          <img
            src={a.photo}
            alt={d.name}
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "4 / 5", // raport fix, grilă frumoasă
              objectFit: "contain", // fără crop
              objectPosition: "center",
              background: "#fff", // benzi albe elegante, ca la Călători
              borderRadius: 16,
            }}
          />
        </div>
      </div>

      {/* text centrat direct pe card, fără fundal alb */}
      <div style={{ padding: "0 14px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 26, lineHeight: 1, marginTop: 2 }}>✒️</div>
        <h3
          className="font-cormorant"
          style={{ margin: "8px 0 6px", fontSize: 24 }}
        >
          {d.name}
        </h3>
        <p style={{ margin: 0, color: "var(--secondary)", fontSize: 16 }}>
          {d.role}
          {d.tagline ? ` — ${d.tagline}` : ""}
        </p>
      </div>
    </Link>
  );
}

/* ----------------- Card placeholder (fără autor încă) ----------------- */
function PlaceholderCard({ lang, index }) {
  const title = lang === "en" ? "Your name here 😊" : "Aici va fi numele tău 😊";
  const subtitle =
    lang === "en" ? "Midaway author — soon" : "Autor Midaway — în curând";

  const photo =
    PLACEHOLDER_PHOTOS[index % PLACEHOLDER_PHOTOS.length] ||
    "/assets/placeholder-cover.png";

  return (
    <div
      style={{
        background: CARD_BG,
        borderRadius: 22,
        boxShadow: "0 8px 18px rgba(0,0,0,.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 14 }}>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "inset 0 0 0 6px rgba(255,255,255,.5)",
          }}
        >
          {/* imagine placeholder — fără crop, pe toate viewport-urile */}
          <img
            src={photo}
            alt={title}
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "4 / 5",
              objectFit: "contain",
              objectPosition: "center",
              background: "#fff",
              borderRadius: 16,
            }}
          />
        </div>
      </div>

      <div style={{ padding: "0 14px 14px", textAlign: "center" }}>
        <h3
          className="font-cormorant"
          style={{ margin: "8px 0 6px", fontSize: 22 }}
        >
          {title}
        </h3>
        <p style={{ margin: "0 0 10px 0", color: "var(--secondary)" }}>
          {subtitle}
        </p>

        <Link
          to={`/contact?subject=${encodeURIComponent(
            lang === "en" ? "New author collaboration" : "Colaborare autor nou"
          )}`}
          style={{ ...softBtn }}
        >
          {lang === "en" ? "Propose a collaboration" : "Propune o colaborare"}
        </Link>
      </div>
    </div>
  );
}
