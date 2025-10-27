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
      {/* HERO cu foto */}
      <div
        className="proj-hero"
        style={{
          backgroundImage: `url(${a.photo || "/assets/placeholder-cover.png"})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain", // 🔹 acum poza se vede întreagă, fără crop
          minHeight: 380,             // 🔹 suficient spațiu să încapă
          backgroundColor: "#ddd",    // fallback discret dacă poza are transparență
        }}
      >
        <div className="proj-hero-overlay" />
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
                color: "#fff",
                margin: 0,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 34 }}>✒️</span> {d.name}
            </h1>
            <p style={{ color: "#fff", opacity: 0.9, marginTop: 8 }}>
              {d.role
                ? d.role.charAt(0).toUpperCase() + d.role.slice(1)
                : ""}{" "}
              {d.tagline ? `— ${d.tagline}` : ""}
            </p>
          </div>

          {/* Lang toggle */}
          <div
            role="group"
            aria-label="Language switch"
            style={{
              display: "inline-flex",
              border: "1px solid rgba(255,255,255,.6)",
              borderRadius: 999,
              overflow: "hidden",
              background: "rgba(0,0,0,.25)",
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
        {/* Socials */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
          {a.socials?.website && (
            <a
              href={a.socials.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ textDecoration: "none" }}
            >
              🌐 Website
            </a>
          )}
          {a.socials?.instagram && (
            <a
              href={a.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ textDecoration: "none" }}
            >
              📸 Instagram
            </a>
          )}
          {a.socials?.facebook && (
            <a
              href={a.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ textDecoration: "none" }}
            >
              👍 Facebook
            </a>
          )}
          {a.socials?.youtube && (
            <a
              href={a.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ textDecoration: "none" }}
            >
              ▶️ YouTube
            </a>
          )}
          {a.socials?.tiktok && (
            <a
              href={a.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ textDecoration: "none" }}
            >
              🎵 TikTok
            </a>
          )}
        </div>

        {/* Featured book */}
        {a.featuredBook?.href && (
          <div style={{ margin: "8px 0 16px" }}>
            <a
              href={a.featuredBook.href}
              className="btn"
              style={{ textDecoration: "none" }}
            >
              {lang === "en" ? "See book:" : "Vezi cartea:"}{" "}
              {a.featuredBook.title}
            </a>
          </div>
        )}

        {/* Bio */}
        {(d.bio || []).map((para, i) => (
          <p key={i} style={{ lineHeight: 1.7 }}>
            {para}
          </p>
        ))}

        {/* Cărți publicate (fallback simplu) */}
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

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 24,
          }}
        >
          <Link
            to={`/autori?lang=${lang}`}
            className="btn"
            style={{ textDecoration: "none" }}
          >
            {lang === "en" ? "← Back to authors" : "← Înapoi la autori"}
          </Link>
          <Link
            to={`/contact?subject=${encodeURIComponent(
              lang === "en"
                ? "New author collaboration"
                : "Colaborare autor nou"
            )}`}
            className="btn-outline"
            style={{ textDecoration: "none" }}
          >
            {lang === "en"
              ? "Propose a collaboration"
              : "Propune o colaborare"}
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
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  };
}
