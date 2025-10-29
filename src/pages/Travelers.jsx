// src/pages/Travelers.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import travelers from "../data/travelers";

/* stil ca la Autori */
const CARD_BG = "linear-gradient(180deg,#fbf5ea 0%, #f7efe3 100%)";

// responsive helpers (identic cu Autori)
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 640px)").matches;

const IMG_H = isMobile ? 360 : 420;                 // înălțime imagine card
const FOCUS = isMobile ? "center 12%" : "center top";

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

  // filtrare după nume/subtitlu (în limba curentă)
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    const list = travelers.map((t) => {
      const d = (lang === "en" ? t.en : t.ro) || t.ro || t.en || {};
      const title = d.listTitle || t.name || "";
      const subtitle = d.subtitle || t.tagline || "";
      const cover = t.cover || (Array.isArray(t.gallery) ? t.gallery[0] : "") || "/assets/placeholder-cover.png";
      return { t, d, title, subtitle, cover };
    });

    if (!term) return list;
    return list.filter(({ title, subtitle }) =>
      `${title} ${subtitle}`.toLowerCase().includes(term)
    );
  }, [q, lang]);

  return (
    <div className="container" style={{ padding: "24px 0 48px" }}>
      {/* header existent rămâne neschimbat – dacă ai deja intro de sus, îl păstrăm */}

      {/* căutare + limba */}
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

      {/* GRID – carduri ca la Autori */}
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
            {/* imagine mare cu ramă fină interioară */}
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

            {/* text centrat direct pe card, fără banda albă separată */}
            <div style={{ padding: "0 14px 16px", textAlign: "center" }}>
              {t.emoji && <div style={{ fontSize: 26, lineHeight: 1, marginTop: 2 }}>{t.emoji}</div>}
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
