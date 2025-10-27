// src/pages/AuthorDetail.jsx
import { Link, useParams, useSearchParams } from "react-router-dom";
import authors from "../data/authors";

function getLocaleData(author, lang) {
  return (
    (lang === "en" ? author.en : author.ro) ||
    author.ro ||
    author.en ||
    { name: author.id, role: "", tagline: "", bio: [] }
  );
}

export default function AuthorDetail() {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const lang = params.get("lang") === "en" ? "en" : "ro";

  const a = authors.find((x) => x.id === slug);
  if (!a) {
    return (
      <div className="container" style={{ padding: "40px 16px" }}>
        <h1 className="font-cormorant">
          {lang === "en" ? "Author not found" : "Autorul nu există"}
        </h1>
        <p>
          {lang === "en" ? "Back to " : "Înapoi la "}
          <Link
            to={`/autori?lang=${lang}`}
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            {lang === "en" ? "Authors" : "Autori"}
          </Link>
          .
        </p>
      </div>
    );
  }

  const d = getLocaleData(a, lang);

  const setLang = (newLang) => {
    setParams((p) => {
      const copy = new URLSearchParams(p);
      copy.set("lang", newLang);
      return copy;
    });
    localStorage.setItem("authors.lang", newLang);
  };

  return (
    <>
      {/* HERO cu gradient cald + imagine întreagă */}
      <div
        className="proj-hero"
        style={{
          // 2 straturi: 1) gradient cald care acoperă tot, 2) fotografia autorului
          backgroundImage: `
            linear-gradient(180deg, rgba(229,201,153,0.55) 0%, rgba(243,232,220,0.55) 45%, rgba(255,255,255,0.65) 100%),
            url(${a.photo || "/assets/placeholder-cover.png"})
          `,
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "cover, contain", // foto este „contain” ca să se vadă întreagă
          minHeight: 420,
        }}
      >
        {/* overlay păstrat pentru consistență, dar transparent */}
        <div className="proj-hero-overlay" style={{ background: "transparent" }} />
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <div>
            <h1
              className="font-cormorant"
              style={{
                color: "#2c2a28",
                margin: 0,
                display: "flex",
                gap: 12,
                alignItems: "center",
                textShadow: "0 1px 0 rgba(255,255,255,.5)",
              }}
            >
              <span style={{ fontSize: 34 }}>✒️</span> {d.name}
            </h1>
            <p style={{ color: "var(--secondary)", marginTop: 8 }}>
              {d.role ? d.role.charAt(0).toUpperCase() + d.role.slice(1) : ""}
              {d.tagline ? ` — ${d.tagline}` : ""}
            </p>
          </div>

          {/* Comutator RO/EN */}
          <div
            role="group"
            aria-label="Language switch"
            style={{
              display: "inline-flex",
              border: "1px solid rgba(0,0,0,.12)",
              borderRadius: 999,
              overflow: "hidden",
              background: "rgba(255,255,255,.7)",
              boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            }}
          >
            <button onClick={() => setLang("ro")} style={segBtnHero(lang === "ro")}>
              RO
            </button>
            <button onClick={() => setLang("en")} style={segBtnHero(lang === "en")}>
              EN
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="container" style={{ padding: "24px 0 48px", maxWidth: 900 }}>
        {/* Social pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {a.socials?.website && (
            <a
              href={a.socials.website}
              target="_blank"
              rel="noopener noreferrer"
              style={pillStyle("website")}
            >
              🌐 Website
            </a>
          )}
          {a.socials?.instagram && (
            <a
              href={a.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={pillStyle("instagram")}
            >
              📸 Instagram
            </a>
          )}
          {a.socials?.facebook && (
            <a
              href={a.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={pillStyle("facebook")}
            >
              👍 Facebook
            </a>
          )}
          {a.socials?.youtube && (
            <a
              href={a.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={pillStyle("youtube")}
            >
              ▶️ YouTube
            </a>
          )}
          {a.socials?.tiktok && (
            <a
              href={a.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              style={pillStyle("tiktok")}
            >
              🎵 TikTok
            </a>
          )}
        </div>

        {/* Cartea recomandată */}
        {a.featuredBook?.href && (
          <div style={{ margin: "8px 0 16px" }}>
            <a
              href={a.featuredBook.href}
              className="btn"
              style={{ textDecoration: "none" }}
            >
              {lang === "en" ? "See book:" : "Vezi cartea:"} {a.featuredBook.title}
            </a>
          </div>
        )}

        {/* Bio */}
        {(d.bio || []).map((para, i) => (
          <p key={i} style={{ lineHeight: 1.7 }}>{para}</p>
        ))}

        {/* Cărți publicate – fallback simplu (lista către /carti) */}
        {Array.isArray(a.books) && a.books.length > 0 && (
          <>
            <h2 className="font-cormorant" style={{ marginTop: 24 }}>
              {lang === "en" ? "Published books" : "Cărți publicate"}
            </h2>
            <ul style={{ lineHeight: 1.8 }}>
              {a.books.map((slug) => (
                <li key={slug}>
                  <Link
                    to={`/carti`}
                    style={{ textDecoration: "none", color: "var(--accent)" }}
                  >
                    {slug}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* CTA-uri */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link to={`/autori?lang=${lang}`} className="btn" style={{ textDecoration: "none" }}>
            {lang === "en" ? "← Back to authors" : "← Înapoi la autori"}
          </Link>
          <Link
            to={`/contact?subject=${encodeURIComponent(
              lang === "en" ? "New author collaboration" : "Colaborare autor nou"
            )}`}
            className="btn-outline"
            style={{ textDecoration: "none" }}
          >
            {lang === "en" ? "Propose a collaboration" : "Propune o colaborare"}
          </Link>
        </div>
      </div>
    </>
  );
}

function segBtnHero(active) {
  return {
    padding: "8px 14px",
    border: "none",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#fff" : "#444",
    cursor: "pointer",
    fontWeight: 700,
  };
}

/* ——— stil „pill” pe paleta site-ului ——— */
function pillStyle(kind) {
  // culori inspirate din carduri: auriu, teal, bej-roz + nuanțe prietenoase
  const palette = {
    website:  { bg: "rgba(237, 213, 170, .35)", bd: "rgba(206, 167, 102, .55)", fg: "#3a2f1a" }, // auriu soft
    instagram:{ bg: "rgba(67, 126, 126, .18)",  bd: "rgba(56, 104, 104, .35)",  fg: "#1f3a3a" }, // teal soft
    facebook: { bg: "rgba(67, 126, 126, .18)",  bd: "rgba(56, 104, 104, .35)",  fg: "#1f3a3a" },
    youtube:  { bg: "rgba(237, 213, 170, .28)", bd: "rgba(206, 167, 102, .45)",  fg: "#4a2d1a" },
    tiktok:   { bg: "rgba(243, 232, 220, .75)", bd: "rgba(205, 185, 168, .55)", fg: "#3b2f2b" }, // bej-roz
  };

  const c = palette[kind] || palette.website;

  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 999,
    border: `1px solid ${c.bd}`,
    background: c.bg,
    color: c.fg,
    textDecoration: "none",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(0,0,0,.05)",
    transition: "transform .12s ease",
    willChange: "transform",
    cursor: "pointer",
  };
}
