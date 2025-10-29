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

const CARD_IMG_H = isMobile ? 360 : 420;       // puțin mai scund pe mobil
const CARD_FOCUS = isMobile ? "center 18%" : "center top"; // mutăm focusul mai jos pe mobil


const IMG_H = isMobile ? 360 : 420;                 // înălțime imagine card
const FOCUS = isMobile ? "center 12%" : "center top";

/* ——— header text RO/EN ——— */
const INTRO_RO = (
  <>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Eu sunt <b>Mida Malena</b> și, în ultimii trei ani, am călătorit prin lumi și prin mine.
      Am adunat amintiri, oameni, povești și trăiri care mi-au schimbat felul
      de a privi viața.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      În rubrica „Călători”, adun vocile celor care și-au făcut din drum o casă și din necunoscut – prieten.
      Fiecare interviu e o fereastră deschisă spre o altă lume, spusă cu vocea celui care a trăit-o.
      Unii mi-au fost ghizi, alții prieteni, alții doar trecători frumoși în poveștile mele.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Am adunat infinit mai multe istorii decât pot încă așterne aici – dar vor veni toate, pe rând.
      Pentru că fiecare om pe care l-am întâlnit și-a lăsat o amprentă în mine,
      și, cumva, în fiecare carte a mea există câte puțin din fiecare dintre ei.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Citește aceste povești cu inima deschisă. S-ar putea să-ți dea curajul să-ți faci și tu bagajele –
      sau, măcar, să începi călătoria ta, oriunde te-ai afla.
    </p>
  </>
);

const INTRO_EN = (
  <>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      I’m <b>Mida Malena</b>, and for the past three years I’ve been traveling – through the world and through myself.
      I’ve gathered memories, faces, stories, and moments that have forever changed the way I see life.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      In “Travelers”, I bring together the voices of those who have made the road their home and the unknown their friend.
      Each interview is a window into another world – told in the voice of the one who lived it.
      Some became my guides, others my friends, some just beautiful passersby in my own stories.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      I’ve collected far more stories than I can share here – but they’ll come, one by one.
      Because every person I’ve met has left a trace in me,
      and somehow, in each of my books, there’s a little piece of them.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Read these stories with an open heart. They might just give you the courage to pack your bags –
      or simply to begin your own journey, wherever you are.
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

export default function Travelers() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const lang = params.get("lang") === "en" ? "en" : "ro";

  // reține ultima limbă
  useEffect(() => {
    const saved = localStorage.getItem("travelers.lang");
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
    localStorage.setItem("travelers.lang", l);
  };

  // filtrare + titlu/subtitlu corect + ordonare „cel mai nou primul”
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    const base = travelers.map((t) => {
      const d = (lang === "en" ? t.en : t.ro) || t.ro || t.en || {};
      const title = d.listTitle || d.name || t.name || "";
      const subtitle = d.subtitle || t.tagline || "";
      const cover =
        t.cover || (Array.isArray(t.gallery) ? t.gallery[0] : "") || "/assets/placeholder-cover.png";
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
      {/* ——— Header mare, ca înainte ——— */}
      <header className="font-cormorant" style={{ textAlign: "center", margin: "8px 0 12px" }}>
        <h1 style={{ margin: 0, fontSize: 48 }}>
          <span role="img" aria-label="bag"></span>{" "}
          {lang === "en" ? "Travelers & Journeys" : "Călători & Călătorii"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          {lang === "en"
            ? "Independent voices we publish – people first, then books."
            : "Vocile independente pe care le publicăm – întâi oamenii, apoi cărțile."}
        </p>

        {/* textul lung */}
        <div style={{ color: "#222", fontSize: 18 }}>
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
          onChange={(e) => {
            setQ(e.target.value);
            setParams((p) => {
              const c = new URLSearchParams(p);
              if (e.target.value) c.set("q", e.target.value);
              else c.delete("q");
              return c;
            });
          }}
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
            to={`/calatori/${t.id}?lang=${lang}`}
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
                <img
                  src={cover}
                  alt={title}
                  style={{
                    width: "100%",
                    height: IMG_H,
                    objectFit: "cover",
                    objectPosition: FOCUS,
                    display: "block",
                    borderRadius: 16,
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
    </div>
  );
}
