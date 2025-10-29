// src/pages/AuthorDetail.jsx
import { Link, useParams, useSearchParams } from "react-router-dom";
import authors from "../data/authors";

// Responsive tuning pt. poza mare din detaliu autor
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 640px)").matches;

const HERO_H = isMobile ? 520 : 620;            // înălțime mai mică pe mobil
const HERO_FOCUS = isMobile ? "center 8%" : "center 12%"; // focus puțin mai sus pe mobil

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

  // ----- BIO: patch pentru RO (intro + paragraf nou) -----
  let bio = Array.isArray(d.bio) ? [...d.bio] : [];
  if (lang === "ro") {
    const intro =
      "Bună, sunt Mida Malena – scriitoare, povestitoare, aventurieră și căutătoare eternă.";
    if (bio.length) bio[0] = intro;
    else bio.unshift(intro);

    const extra =
      "Următoarele mele povești, primele două volume din seria „Pași prin Indonezia”, sunt despre transformare, curaj și magia de a te lăsa purtat(ă) de viață atunci când renunți la hartă: Bali – o insulă – oglindă ce arde lent și vindecă profund – și Java, un teritoriu haotic și viu, unde rătăcirea devine formă de regăsire.";
    bio.splice(3, 0, extra);
  }

  // Poze laterale (din gallery, dacă există) – fallback la imaginile tale
  const leftImg =
    (Array.isArray(a.gallery) && a.gallery[0]) ||
    "/assets/books/authors/mida-malena-2.webp";
  const rightImg =
    (Array.isArray(a.gallery) && a.gallery[1]) ||
    "/assets/books/authors/mida-malena-3.webp";

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
          gap: 24,
        }}
      >
        {/* Imagine stânga – ascunsă pe mobil */}
        {!isMobile && (
          <img
            src={leftImg}
            alt=""
            style={{
              height: "100%",
              width: "auto",
              borderRadius: 12,
              objectFit: "cover",
              opacity: 0.9,
              transform: "translateX(-10%)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          />
        )}

/* Imagine centrală (autor) – fără crop, ca înainte */
<img
  src={a.photo || "/assets/placeholder-cover.png"}
  alt={d.name}
  style={{
    maxHeight: isMobile ? 520 : 480, // mobil puțin mai înalt, desktop ca înainte
    width: "auto",
    height: "auto",
    objectFit: "contain",            // << NU mai tăiem poza
    objectPosition: "center",        // poziție neutră
    borderRadius: 16,
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  }}
/>


        {/* Imagine dreapta – ascunsă pe mobil */}
        {!isMobile && (
          <img
            src={rightImg}
            alt=""
            style={{
              height: "100%",
              width: "auto",
              borderRadius: 12,
              objectFit: "cover",
              opacity: 0.9,
              transform: "translateX(10%)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          />
        )}
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
        {/* Socials – centrate + icoane brand */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 14,
            justifyContent: "center",
          }}
        >
          {a.socials?.website && (
            <a
              href={a.socials.website}
              target="_blank"
              rel="noopener noreferrer"
              style={pill("#f1e6cf")}
              aria-label="Website"
            >
              <IconGlobe /> Website
            </a>
          )}
          {a.socials?.instagram && (
            <a
              href={a.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={pill("var(--card2)")}
              aria-label="Instagram"
            >
              <IconInstagram /> Instagram
            </a>
          )}
          {a.socials?.facebook && (
            <a
              href={a.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={pill("#eadac7")}
              aria-label="Facebook"
            >
              <IconFacebook /> Facebook
            </a>
          )}
          {a.socials?.youtube && (
            <a
              href={a.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={pill("#f8dabb")}
              aria-label="YouTube"
            >
              <IconYouTube /> YouTube
            </a>
          )}
          {a.socials?.tiktok && (
            <a
              href={a.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              style={pill("#e9e3d9")}
              aria-label="TikTok"
            >
              <IconTikTok /> TikTok
            </a>
          )}
        </div>

        {/* CTA către toate cărțile */}
        <div
          style={{ margin: "8px 0 16px", display: "flex", justifyContent: "center" }}
        >
          <Link to="/carti" className="btn" style={{ textDecoration: "none" }}>
            {lang === "en" ? "See books" : "Vezi cărțile"}
          </Link>
        </div>

        {/* Bio */}
        {bio.map((para, i) => (
          <p key={i} style={{ lineHeight: 1.7, color: "#3a3a3a" }}>
            {para}
          </p>
        ))}

        {/* Cărți publicate (fallback listă) */}
        {Array.isArray(a.books) && a.books.length > 0 && (
          <>
            <h2 className="font-cormorant" style={{ marginTop: 26 }}>
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

        {/* CTA secundar */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
          <Link
            to={`/autori?lang=${lang}`}
            className="btn-outline"
            style={{ textDecoration: "none" }}
          >
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

/* ------- SVG brand icons (inline) ------- */
function IconGlobe({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#2b2a28" strokeWidth="1.6" />
      <path d="M2 12h20M12 2c3 3.5 3 16.5 0 20M12 2c-3 3.5-3 16.5 0 20" stroke="#2b2a28" strokeWidth="1.6" />
    </svg>
  );
}

function IconInstagram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeOpacity=".9" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="#fff" strokeOpacity=".9" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
    </svg>
  );
}

function IconFacebook({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13.5 21v-7h2.3l.4-2.9h-2.7V8.6c0-.8.2-1.3 1.3-1.3H16V4.6c-.2 0-1-.1-1.9-.1-1.9 0-3.1 1.1-3.1 3.2v2h-2v2.9H11V21h2.5z" fill="#385898" />
    </svg>
  );
}

function IconYouTube({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="12" rx="4" fill="#ff0000" opacity=".9" />
      <path d="M10 9l5 3-5 3V9z" fill="#fff" />
    </svg>
  );
}

function IconTikTok({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M16 7.5c1.2 1.1 2.5 1.7 4 1.8v3.1c-1.6-.1-3-.7-4-1.6v5.5c0 3-2.5 5.4-5.6 5-2.4-.3-4.3-2.3-4.4-4.7-.1-2.9 2.2-5.3 5.1-5.3.3 0 .7 0 1 .1v3c-1.8-.6-3.7.5-3.8 2.3 0 1.2 1 2.3 2.2 2.3 1.2 0 2.1-1 2.1-2.2V3h3.4V7.5z"
        fill="#111"
      />
    </svg>
  );
}
