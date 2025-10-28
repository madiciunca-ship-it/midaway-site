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
      {/* HERO – colaj panoramic */}
      <div
        className="proj-hero"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #faf6ef, #f7f3ea)",
          padding: "32px 0",
          minHeight: "clamp(340px, 45vw, 540px)",
          overflow: "hidden",
        }}
      >
        {/* Imagine stânga */}
        <img
          src="/assets/books/authors/mida-malena-2.webp"
          alt=""
          style={{
            height: "100%",
            width: "auto",
            borderRadius: "12px",
            objectFit: "cover",
            opacity: 0.9,
            transform: "translateX(-10%)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
          className="hide-mobile"
        />

        {/* Imagine centrală */}
        <img
          src={a.photo || "/assets/placeholder-cover.png"}
          alt={d.name}
          style={{
            maxHeight: "480px",
            width: "auto",
            borderRadius: "16px",
            objectFit: "contain",
            margin: "0 24px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
          }}
        />

        {/* Imagine dreapta */}
        <img
          src="/assets/books/authors/mida-malena-3.webp"
          alt=""
          style={{
            height: "100%",
            width: "auto",
            borderRadius: "12px",
            objectFit: "cover",
            opacity: 0.9,
            transform: "translateX(10%)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
          className="hide-mobile"
        />
      </div>

      {/* switch RO/EN – centrat sub colaj */}
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: -10,
          marginBottom: 20,
        }}
      >
        <div
          role="group"
          aria-label="Language switch"
          style={{
            display: "inline-flex",
            border: "1px solid #d9d4c8",
            borderRadius: 999,
            overflow: "hidden",
            background: "#fff",
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

      {/* BODY */}
      <div className="container" style={{ padding: "0 0 60px", maxWidth: 900 }}>
        {/* Socials – pills pastelate */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          {a.socials?.website && (
            <a href={a.socials.website} target="_blank" rel="noopener noreferrer" style={pill("#f1e6cf")}>
              🌐 Website
            </a>
          )}
          {a.socials?.instagram && (
            <a href={a.socials.instagram} target="_blank" rel="noopener noreferrer" style={pill("var(--card2)")}>
              📸 Instagram
            </a>
          )}
          {a.socials?.facebook && (
            <a href={a.socials.facebook} target="_blank" rel="noopener noreferrer" style={pill("#eadac7")}>
              👍 Facebook
            </a>
          )}
          {a.socials?.youtube && (
            <a href={a.socials.youtube} target="_blank" rel="noopener noreferrer" style={pill("#f8dabb")}>
              ▶️ YouTube
            </a>
          )}
          {a.socials?.tiktok && (
            <a href={a.socials.tiktok} target="_blank" rel="noopener noreferrer" style={pill("#e9e3d9")}>
              🎵 TikTok
            </a>
          )}
        </div>

        {/* Featured book */}
        {a.featuredBook?.href && (
          <div style={{ margin: "8px 0 14px" }}>
            <a
              href={a.featuredBook.href}
              className="btn"
              style={{
                textDecoration: "none",
                borderRadius: 999,
                padding: "10px 18px",
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              {lang === "en" ? "See book:" : "Vezi cartea:"} {a.featuredBook.title}
            </a>
          </div>
        )}

        {/* Nume + rol/tagline */}
        <div style={{ margin: "6px 0 10px" }}>
          <h1 className="font-cormorant" style={{ margin: "0 0 4px 0", fontSize: 34 }}>
            ✒️ {d.name}
          </h1>
          {(d.role || d.tagline) && (
            <p style={{ margin: 0, color: "#3e4a47", fontWeight: 500 }}>
              {d.role ? d.role.charAt(0).toUpperCase() + d.role.slice(1) : ""}
              {d.tagline ? ` — ${d.tagline}` : ""}
            </p>
          )}
        </div>

        {/* Bio */}
        {(d.bio || []).map((para, i) => (
          <p key={i} style={{ lineHeight: 1.7, color: "#3a3a3a" }}>
            {para}
          </p>
        ))}

        {/* Cărți publicate */}
        {Array.isArray(a.books) && a.books.length > 0 && (
          <>
            <h2 className="font-cormorant" style={{ marginTop: 26 }}>
              {lang === "en" ? "Published books" : "Cărți publicate"}
            </h2>
            <ul style={{ lineHeight: 1.8 }}>
              {a.books.map((slug) => (
                <li key={slug}>
                  <Link to={`/carti`} style={{ textDecoration: "none", color: "var(--accent)" }}>
                    {slug}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
          <Link to={`/autori?lang=${lang}`} className="btn-outline" style={{ textDecoration: "none" }}>
            {lang === "en" ? "← Back to authors" : "← Înapoi la autori"}
          </Link>
          <Link
            to={`/contact?subject=${encodeURIComponent(
              lang === "en" ? "New author collaboration" : "Colaborare autor nou"
            )}`}
            className="btn"
            style={{ background: "var(--card2)", color: "#fff", textDecoration: "none" }}
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

function pill(bg) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 999,
    background: bg,
    textDecoration: "none",
    color: "#2b2a28",
    fontWeight: 600,
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
  };
}
