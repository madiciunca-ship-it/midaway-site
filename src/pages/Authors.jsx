// src/pages/Authors.jsx
import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
const IMG_H = isMobile ? 360 : 420;
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

export default function Authors() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const lang = params.get("lang") === "en" ? "en" : "ro";

  // reține ultima limbă aleasă
  useEffect(() => {
    const saved = localStorage.getItem("authors.lang");
    if (!params.get("lang") && saved) {
      setParams((p) => {
        const c = new URLSearchParams(p);
        c.set("lang", saved);
        return c;
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
      {/* Header centrat — albastru mic sus + descriere negru, ca la Călători */}
      <header
        className="font-cormorant"
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        <h1 style={{ margin: 0, fontSize: 44 }}>Autorii Midaway</h1>
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
            ? "We believe in authenticity and in voices that grow from real experience. Whether you're just starting or already published, Midaway offers space for editing, validation, and mindful promotion – a place where your voice matters."
            : "Credem în autenticitate și în voci care cresc din experiențe reale. Fie că ești la început sau ai cărți publicate, Midaway oferă spațiu pentru editare, validare și promovare atentă – un loc în care vocea ta contează."}
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
    </div>
  );
}

/* ----------------- Card autor existent ----------------- */
function AuthorCard({ a, d, lang }) {
  return (
    <Link
      to={`/autori/${a.id}?lang=${lang}`}
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
            style={
              isMobile
                ? {
                    width: "100%",
                    display: "block",
                    aspectRatio: "4 / 5", // pe mobil nu mai tăiem
                    objectFit: "contain",
                    objectPosition: "center",
                    background: "#fff", // benzi albe discrete
                    borderRadius: 16,
                  }
                : {
                    width: "100%",
                    height: IMG_H,
                    objectFit: "cover",
                    objectPosition: FOCUS,
                    display: "block",
                    borderRadius: 16,
                  }
            }
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
          {/* ✅ și placeholderul fără crop */}
          {isMobile ? (
            <img
              src={photo}
              alt=""
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
          ) : (
            <div
              style={{
                width: "100%",
                height: IMG_H,
                backgroundImage: `url(${photo})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: FOCUS,
                backgroundSize: "cover",
              }}
            />
          )}
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
