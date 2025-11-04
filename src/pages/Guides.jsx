import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import guides from "../data/guides";


/* ——— stil card ca la Autori/Călători ——— */
const CARD_BG = "linear-gradient(180deg,#fbf5ea 0%, #f7efe3 100%)";

// ——— Mobile tuning
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 640px)").matches;

/* ——— header text RO/EN ——— */
const INTRO_RO = (
  <>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      <b>Ghizi, localnici, prieteni ai locului</b> – sunt rari, calzi și plini de povești.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Eu sunt <b>Mida Malena</b>, și în ultimii ani am ajuns în locuri care mi-au tăiat respirația.
      Dar ceea ce mi-a rămas cu adevărat în inimă au fost oamenii. Cei care m-au primit ca pe una
      de-a lor, m-au ghidat cu răbdare printre peisaje, obiceiuri și cuvinte necunoscute. Cei care
      mi-au arătat lumea nu doar cu ochii, ci cu sufletul. Oamenii care mi-au fost lumină pe drum.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      În această rubrică adun vocile ghizilor locali – oameni care trăiesc cu adevărat locul pe care
      îl arată. Fie că i-am întâlnit în sate uitate de lume, pe plaje pustii sau în mijlocul
      orașelor agitate, fiecare dintre ei mi-a oferit o lecție de umanitate.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Aici nu e vorba despre turism. Ci despre oameni care fac lumea mai frumoasă – o zi, un zâmbet
      și un drum pe rând. Dacă ajungi în locurile lor, caută-i. Ascultă-i. Spune-le că vii din
      partea mea. Sau nu. Eu îi recomand nu pentru că trebuie. Ci pentru că merită.
    </p>
  </>
);

const INTRO_EN = (
  <>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      <b>Guides, locals, friends of the place</b> – rare, warm, and full of stories.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      I’m <b>Mida Malena</b>. I’ve reached places that took my breath away, but what stayed in my
      heart were the people who welcomed me as one of their own, who patiently guided me through
      landscapes, customs, and unknown words. People who showed me the world not only with their
      eyes, but with their soul.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      Here I gather the voices of local guides – people who truly live the places they show. Whether
      I met them in remote villages, empty beaches, or buzzing cities, each offered a lesson in
      humanity.
    </p>
    <p style={{ maxWidth: 1050, margin: "8px auto 0", lineHeight: 1.9 }}>
      This isn’t about tourism. It’s about people who make the world gentler – one day, one smile,
      one road at a time. If you reach their places, find them. Listen. Tell them I sent you – or
      don’t. I recommend them not because I must – but because they deserve it.
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

export default function Guides() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const lang = params.get("lang") === "en" ? "en" : "ro";

  // reține ultima limbă
  useEffect(() => {
    const saved = localStorage.getItem("guides.lang");
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
    localStorage.setItem("guides.lang", l);
  };

  // filtrare + titlu/subtitlu corect + ordonare „cel mai nou primul”
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    const base = (guides || []).map((g) => {
      const d = (lang === "en" ? g.en : g.ro) || g.ro || g.en || {};
      // titlu bilingv, cu fallback
    const title =
    (g.name && typeof g.name === "object" ? g.name[lang] : g.name) ||
    d.listTitle ||
    d.name ||
    (g.name && typeof g.name === "object" ? (g.name.ro || g.name.en) : "") ||
    "";
      // subtitlu bilingv, cu fallback
    const subtitle =
    (g.tagline && typeof g.tagline === "object" ? g.tagline[lang] : g.tagline) ||
    d.subtitle ||
    (g.tagline && typeof g.tagline === "object" ? (g.tagline.ro || g.tagline.en) : "") ||
    "";
      const cover =
        g.cover ||
        (Array.isArray(g.gallery) ? g.gallery[0] : "") ||
        "/assets/placeholder-cover.png";
      return { g, title, subtitle, cover };
    });

    const out = term
      ? base.filter(({ title, subtitle }) =>
          `${title} ${subtitle}`.toLowerCase().includes(term)
        )
      : base;

    return [...out].reverse();
  }, [q, lang]);

  return (
    <div className="container" style={{ padding: "24px 0 48px" }}>
      {/* ——— Header mare ——— */}
      <header className="font-cormorant" style={{ textAlign: "center", margin: "8px 0 12px" }}>
        <h1 style={{ margin: 0, fontSize: 48 }}>
          {lang === "en" ? "Guides & Locals" : "Ghizi & Localnici"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8, fontSize: 18 }}>
          {lang === "en"
            ? "People who live the place they show – recommended from the heart."
            : "Oameni care trăiesc locul pe care îl arată – recomandați din inimă."}
        </p>

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
          onChange={(e) => {
            setQ(e.target.value);
            setParams((p) => {
              const c = new URLSearchParams(p);
              if (e.target.value) c.set("q", e.target.value);
              else c.delete("q");
              return c;
            });
          }}
          placeholder={lang === "en" ? "Search guides…" : "Caută ghizi…"}
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

      {/* ——— GRID ——— */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map(({ g, title, subtitle, cover }) => (
          <Link
            key={g.id}
            to={`/ghizi/${g.id}?lang=${lang}`}
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
            {/* imagine mare cu ramă interioară */}
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
                    display: "block",
                    aspectRatio: "4 / 5",
                    objectFit: "contain",
                    objectPosition: isMobile ? "center 18%" : "center",
                  }}
                />
              </div>
            </div>

            {/* text */}
            <div style={{ padding: "0 14px 16px", textAlign: "center" }}>
              {g.emoji && (
                <div style={{ fontSize: 26, lineHeight: 1, marginTop: 2 }}>
                  {g.emoji}
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
