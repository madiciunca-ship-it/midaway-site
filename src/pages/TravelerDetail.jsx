// src/pages/TravelerDetail.jsx
import { Link, useParams } from "react-router-dom";
import travelers from "../data/travelers";

// mici hărți pentru social pills
const SOCIAL_META = {
  instagram: { label: "Instagram", emoji: "📸" },
  facebook:  { label: "Facebook",  emoji: "👍" },
  tiktok:    { label: "TikTok",    emoji: "🎵" },
  youtube:   { label: "YouTube",   emoji: "▶️" },
  website:   { label: "Website",   emoji: "🌐" },
  blog:      { label: "Blog",      emoji: "✍️" },
};

export default function TravelerDetail() {
  const { id } = useParams();
  const t = travelers.find((x) => x.id === id);

  if (!t) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <h2 className="font-cormorant">Povestea nu există</h2>
        <p>
          <Link to="/calatori" style={{ textDecoration: "none", color: "var(--accent)" }}>
            ← Înapoi la Călători
          </Link>
        </p>
      </div>
    );
  }

  const pills = Object.entries(t.socials || {})
    .filter(([, href]) => href && href.trim().length > 0)
    .map(([key, href]) => ({ key, href, ...SOCIAL_META[key] || { label: key, emoji: "🔗" } }));

  return (
    <div className="container" style={{ padding: "24px 0 48px", maxWidth: 1100 }}>
      {/* back */}
      <p style={{ margin: 0 }}>
        <Link to="/calatori" style={{ textDecoration: "none", color: "var(--accent)" }}>
          ← Înapoi la Călători
        </Link>
      </p>

      {/* HERO compus din 1-3 imagini (max 3) */}
      <div
        style={{
          marginTop: 12,
          padding: 12,
          background: "linear-gradient(180deg,#f8f3ea 0%, #fdfbf7 100%)",
          border: "1px solid var(--line)",
          borderRadius: 18,
          boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              (t.gallery && t.gallery.length >= 2) ? "1fr 1fr 1fr" : "1fr",
            gap: 12,
            alignItems: "center",
          }}
        >
          {(t.gallery && t.gallery.length > 0 ? t.gallery.slice(0, 3) : [t.cover]).map((src, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                height: 320,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: 16,
                overflow: "hidden",
              }}
            />
          ))}
        </div>

        {/* titlu + tagline */}
        <div style={{ marginTop: 16, textAlign: "left" }}>
          <h1 className="font-cormorant" style={{ margin: "0 0 4px 0", fontSize: 40 }}>
            {t.emoji} {t.name}
          </h1>
          <p style={{ marginTop: 4, color: "var(--secondary)", fontSize: 18 }}>
            {t.tagline}
          </p>
        </div>
      </div>

      {/* social pills */}
      {pills.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 16,
            justifyContent: "center",
          }}
        >
          {pills.map((p) => (
            <a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid #ead9c2",
                background: "#fff7ef",
                textDecoration: "none",
                color: "#333",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
              }}
            >
              {p.emoji} {p.label}
            </a>
          ))}
        </div>
      )}

      {/* intro */}
      {t.intro && (
        <p style={{ marginTop: 18, lineHeight: 1.8 }}>
          {t.intro}
        </p>
      )}

      {/* video (opțional, ex. YouTube id) */}
      {t.video && t.video.type === "youtube" && t.video.id && (
        <div style={{ marginTop: 18 }}>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: 16,
              boxShadow: "0 6px 16px rgba(0,0,0,.06)",
            }}
          >
            <iframe
              title="video"
              src={`https://www.youtube.com/embed/${t.video.id}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Q&A (când apar răspunsuri) */}
      {Array.isArray(t.qna) && t.qna.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2 className="font-cormorant" style={{ margin: "0 0 8px 0" }}>
            Întrebări & răspunsuri
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {t.qna.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  background: "#fff",
                  border: "1px solid var(--line)",
                }}
              >
                <p style={{ margin: "0 0 6px 0", fontWeight: 700 }}>{item.q}</p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story (poveste liberă) */}
      {Array.isArray(t.story) && t.story.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2 className="font-cormorant" style={{ margin: "0 0 8px 0" }}>
            Poveste
          </h2>
          {t.story.map((para, i) => (
            <p key={i} style={{ lineHeight: 1.8 }}>{para}</p>
          ))}
        </section>
      )}
    </div>
  );
}
