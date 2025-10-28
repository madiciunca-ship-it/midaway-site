// src/pages/TravelerDetail.jsx
import { Link, useParams, useSearchParams } from "react-router-dom";
import travelers from "../data/travelers";

export default function TravelerDetail() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const lang = params.get("lang") === "en" ? "en" : "ro";

  const t = travelers.find((x) => x.id === id);
  if (!t) {
    return (
      <div className="container" style={{ padding: "40px 16px" }}>
        <h1 className="font-cormorant">Povestea nu există</h1>
        <p>
          <Link to="/calatori" style={{ color: "var(--accent)", textDecoration: "none" }}>
            ← Înapoi la Călători
          </Link>
        </p>
      </div>
    );
  }

  const lc = (t[lang] || t.ro || t.en);
  const gallery = Array.isArray(t.gallery) ? t.gallery.slice(0, 3) : [];
  const cover = t.cover || gallery[0] || "/assets/placeholder-cover.png";

  const setLang = (newLang) => {
    setParams((p) => {
      const copy = new URLSearchParams(p);
      copy.set("lang", newLang);
      return copy;
    });
    localStorage.setItem("travelers.lang", newLang);
  };

  return (
    <div className="container" style={{ padding: "24px 0 48px", maxWidth: 1000 }}>
      {/* back link */}
      <p style={{ marginTop: 0 }}>
        <Link to={`/calatori?lang=${lang}`} style={{ textDecoration: "none" }}>
          ← Înapoi la Călători
        </Link>
      </p>

      {/* HERO strip (până la 3 imagini) + switch limbă centrat */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {(gallery.length ? gallery : [cover]).map((src, i) => (
          <div
            key={i}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              background: "linear-gradient(180deg,#f7eee0,#fff)",
              border: "1px solid #eee",
              minHeight: 220,
            }}
          >
            <img
              src={src}
              alt={`${t.name} ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* lang switch */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
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
          <button onClick={() => setLang("ro")} style={segBtnHero(lang === "ro")}>RO</button>
          <button onClick={() => setLang("en")} style={segBtnHero(lang === "en")}>EN</button>
        </div>
      </div>

      {/* TITLU + TAGLINE */}
      <header className="font-cormorant" style={{ marginTop: 18 }}>
        <h1 style={{ margin: 0 }}>{t.emoji} {t.name}</h1>
        {t.tagline && (
          <p style={{ color: "var(--secondary)", marginTop: 6 }}>{t.tagline}</p>
        )}
      </header>

      {/* social buttons (toate 6, inactive dacă lipsesc) */}
      <SocialRow socials={t.socials} />

      {/* intro */}
      {lc?.intro && (
        <section style={{ marginTop: 16 }}>
          <p style={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{lc.intro}</p>
        </section>
      )}

      {/* Q&A */}
      {Array.isArray(lc?.qna) && lc.qna.length > 0 && (
        <section style={{ marginTop: 16 }}>
          {lc.qna.map((item, idx) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <h3 className="font-cormorant" style={{ margin: "8px 0 4px 0", fontSize: 20 }}>
                {item.q}
              </h3>
              <p style={{ margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "#333" }}>
                {item.a || "—"}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* video (opțional) */}
      {t.video && (
        <section style={{ marginTop: 16 }}>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,.08)",
            }}
          >
            <iframe
              src={t.video}
              title={`${t.name} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </section>
      )}

      {/* poveste comună / gând final */}
      {Array.isArray(lc?.story) && lc.story.length > 0 && (
        <section style={{ marginTop: 16 }}>
          {lc.story.map((p, i) => (
            <p key={i} style={{ lineHeight: 1.8 }}>{p}</p>
          ))}
        </section>
      )}

      {/* back link bottom */}
      <div style={{ marginTop: 20 }}>
        <Link
          to={`/calatori?lang=${lang}`}
          style={{ color: "var(--secondary)", textDecoration: "none" }}
        >
          ← Înapoi la Călători
        </Link>
      </div>
    </div>
  );
}

function SocialRow({ socials = {} }) {
  const items = [
    { key: "website", label: "Website", icon: "🌐" },
    { key: "instagram", label: "Instagram", icon: "📸" },
    { key: "facebook", label: "Facebook", icon: "👍" },
    { key: "youtube", label: "YouTube", icon: "▶️" },
    { key: "tiktok", label: "TikTok", icon: "🎵" },
    { key: "blog", label: "Blog", icon: "✍️" },
  ];

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
      {items.map((it) => {
        const href = socials[it.key];
        const commonStyle = {
          padding: "10px 12px",
          borderRadius: 10,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          border: "1px solid #ddd",
        };

        if (!href) {
          return (
            <span
              key={it.key}
              style={{
                ...commonStyle,
                background: "#f7f7f7",
                color: "#999",
                cursor: "not-allowed",
              }}
              title="necompletat încă"
            >
              {it.icon} {it.label}
            </span>
          );
        }

        return (
          <a
            key={it.key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...commonStyle, background: "#fff", color: "#111" }}
          >
            {it.icon} {it.label}
          </a>
        );
      })}
    </div>
  );
}

function segBtnHero(active) {
  return {
    padding: "8px 14px",
    border: "none",
    background: active ? "var(--accent)" : "transparent",
    color: "#333",
    cursor: "pointer",
    fontWeight: 700,
  };
}
