// src/pages/Travelers.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import travelers from "../data/travelers";

/* ——— stil card ca la Autori ——— */
const CARD_BG = "linear-gradient(180deg,#fbf5ea 0%, #f7efe3 100%)";

// ——— Mobile tuning pentru pozele din card (doar pe telefoane)
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 640px)").matches;

const CARD_IMG_H = isMobile ? 360 : 420; // (lăsat aici dacă vrei să revii pe height fix)
const CARD_FOCUS = isMobile ? "center 18%" : "center top";

const IMG_H = isMobile ? 360 : 420;
const FOCUS = isMobile ? "center 12%" : "center top";

/* ——— header text RO/EN ——— */
const INTRO_RO = (
  <>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Eu sunt <b>Mida Malena</b> și, în ultimii trei ani, am călătorit prin lumi și prin mine însămi. 
      Am adunat amintiri, oameni, povești și trăiri care mi-au schimbat felul de a privi viața.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
    În rubrica „Călători”, adun vocile celor care și-au făcut din drum o casă și din necunoscut un prieten. 
    Fiecare interviu e o fereastră deschisă către o altă lume, spusă cu vocea celui care a trăit-o. 
    Unii mi-au fost ghizi, alții prieteni – iar alții doar trecători frumoși în propriile mele povești.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
    Am adunat mult mai multe istorii decât pot încă așterne aici – dar vor veni toate, pe rând. 
    Pentru că fiecare om pe care l-am întâlnit a lăsat o amprentă în mine și, într-un fel, în fiecare dintre cărțile mele există câte puțin din fiecare dintre ei.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Citește aceste povești cu inima deschisă. 
      S-ar putea să-ți dea curajul să-ți faci și tu bagajele – sau, măcar, să începi propria ta călătorie, oriunde te-ai afla.
    </p>
  </>
);

const INTRO_EN = (
  <>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
    I’m <b>Mida Malena</b>, and for the past three years I’ve been traveling – through the world and through myself. 
    I’ve gathered memories, faces, stories, and moments that have changed the way I see life forever.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
    In Travelers, I bring together the voices of those who have made the road their home and the unknown their companion. 
    Each interview is a window into a different world – told in the voice of the one who lived it. 
    Some became my guides, others became friends, and some remained beautiful passersby in my own stories.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
    I’ve collected far more stories than I can share here – but they’ll come, one by one. 
    Every person I’ve met has left a trace in me, and in a way, each of my books carries a small piece of them.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
    Read these stories with an open heart. 
    They might give you the courage to pack your bags – or simply to begin your own journey, wherever you are.
    </p>
  </>
);

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

export default function Travelers() {
  const [params] = useSearchParams();

  // păstrăm doar ?q în URL (căutarea)
  const [q, setQ] = useState(params.get("q") || "");

  // limba: 1) citim o dată din query dacă vine, 2) altfel din localStorage, 3) altfel ro
  const initialLang =
    params.get("lang") === "en"
      ? "en"
      : (localStorage.getItem("travelers.lang") || "ro");
  const [lang, setLang] = useState(initialLang);
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

  // persistăm limba și curățăm ?lang din bară (păstrăm ?q dacă există)
  useEffect(() => {
    localStorage.setItem("travelers.lang", lang);
    if (typeof window !== "undefined" && window.location.search.includes("lang=")) {
      const qs = q ? `?q=${encodeURIComponent(q)}` : "";
      window.history.replaceState({}, "", window.location.pathname + qs);
    }
  }, [lang, q]);
  

  // când tastezi în căutare, actualizăm doar ?q (nu și lang)
  const onSearchChange = (v) => {
    setQ(v);
    const qs = v ? `?q=${encodeURIComponent(v)}` : "";
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname + qs);
    }
  };

  // filtrare + titlu/subtitlu corect + ordonare „cel mai nou primul”
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    const base = travelers.map((t) => {
      const d = (lang === "en" ? t.en : t.ro) || t.ro || t.en || {};

      // 🔹 titlu bilingv, cu fallback la vechea structură
      const title =
        (t.name && typeof t.name === "object" ? t.name[lang] : t.name) ||
        d.listTitle ||
        d.name ||
        (t.name && typeof t.name === "object" ? (t.name.ro || t.name.en) : "") ||
        "";

      // 🔹 subtitlu (tagline) bilingv, cu fallback
      const subtitle =
        (t.tagline && typeof t.tagline === "object" ? t.tagline[lang] : t.tagline) ||
        d.subtitle ||
        (t.tagline && typeof t.tagline === "object" ? (t.tagline.ro || t.tagline.en) : "") ||
        "";

      const cover =
        t.cover ||
        (Array.isArray(t.gallery) ? t.gallery[0] : "") ||
        "/assets/placeholder-cover.png";

      return { t, title, subtitle, cover };
    });

    const out = term
      ? base.filter(({ title, subtitle }) =>
          `${title} ${subtitle}`.toLowerCase().includes(term)
        )
      : base;

    // 🔄 ultimul adăugat apare primul
    return [...out].reverse();
  }, [q, lang]);

  return (
    <div className="container" style={{ padding: "24px 0 48px" }}>

     <div style={{ marginBottom: 18 }}>
  <Link to="/" style={sectionNavStyle}>
    {ui.backHome}
  </Link>
</div> 
      
      
      {/* ——— Header mare, ca înainte ——— */}
      <header className="font-cormorant" style={{ textAlign: "center", margin: "8px 0 12px" }}>
        <h1 style={{ margin: 0, fontSize: 48 }}>
          <span role="img" aria-label="bag"></span>{" "}
          {lang === "en" ? "Travelers & Journeys" : "Călători & Călătorii"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8, fontSize: 18 }}>
          {lang === "en"
            ? "Independent voices we publish – people first, then books."
            : "Vocile independente pe care le publicăm – întâi oamenii, apoi cărțile."}
        </p>

        {/* textul lung */}
        <div style={{ color: "#222", lineHeight: 1.8, fontSize: 18 }}>
          {lang === "en" ? INTRO_EN : INTRO_RO}
        </div>

        <div
          style={{
            height: 2,
            background: "#d5b56f",
            opacity: 0.6,
            marginTop: 18,
          }}
        />
      </header>

      {/* ——— Search + Lang ——— */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={lang === "en" ? "Search travelers…" : "Caută călători…"}
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
          <button onClick={() => setLang("ro")} style={segBtn(lang === "ro")}>RO</button>
          <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>EN</button>
        </div>
      </div>

      {/* ——— GRID – carduri ca la Autori ——— */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map(({ t, title, subtitle, cover }) => (
          <Link
            key={t.id}
            to={`/calatori/${t.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: CARD_BG,
              borderRadius: 22,
              boxShadow: "0 8px 18px rgba(0,0,0,.06)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* imagine mare cu ramă interioară fină */}
            <div style={{ padding: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "inset 0 0 0 6px rgba(255,255,255,.5)",
                }}
              >
                {/* ✅ Poza din card – NU mai taie pe mobil/desktop */}
                <img
                  src={cover}
                  alt={title}
                  style={{
                    width: "100%",
                    display: "block",
                    aspectRatio: "4 / 5",
                    objectFit: "contain",
                    objectPosition: isMobile ? "center 18%" : "center",
                  }}
                />
              </div>
            </div>

            {/* text centrat direct pe card */}
            <div style={{ padding: "0 14px 16px", textAlign: "center" }}>
              {t.emoji && (
                <div style={{ fontSize: 26, lineHeight: 1, marginTop: 2 }}>
                  {t.emoji}
                </div>
              )}
              <h3 className="font-cormorant" style={{ margin: "8px 0 6px", fontSize: 24 }}>
                {title}
              </h3>
              {subtitle && (
                <p style={{ margin: 0, color: "var(--secondary)", fontSize: 16 }}>
                  {subtitle}
                </p>
              )}
            </div>
          </Link>
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
