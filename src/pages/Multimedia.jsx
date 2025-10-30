import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Multimedia – galerie unitară cu filtre (butonașe cu snap pe mobil).
 * Tipuri: "photo" | "video" | "audio" | "interview"
 *
 * NOTE:
 * - Imaginile/thumbnail-urile pune-le în /public/assets/media/... și referă-le ca "/assets/media/.."
 * - Pentru YouTube poți da link normal (watch?v=...) sau direct 11-char id; extragem noi embed + thumbnail.
 */

const MEDIA = [
  // ——— exemple de conținut ———
  {
    id: "trailer",
    type: "video",
    title: "Midaway — trailer",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumb: "/assets/media/trailer.jpg", // opțional
  },

  // ——— link-urile tale (le-am încadrat ca „interview”) ———
  {
    id: "int-lansare",
    type: "interview",
    title: "Interviu lansare cărți — Mida Malena",
    url: "https://www.youtube.com/watch?v=5ylLtf8H2Lk&t=2258s",
  },
  {
    id: "int-biblioteca",
    type: "interview",
    title: "Mida Malena — oaspetele Bibliotecii Petre Dulfu",
    url: "https://www.youtube.com/watch?v=jDMBnyYm3EI&t=800s",
  },
  {
    id: "int-provocari",
    type: "interview",
    title: "Întrebări și provocări — Bucăți dintr-un suflet nomad",
    url: "https://www.youtube.com/watch?v=3lRh_G3gfTM",
  },

  // ——— exemplu audio (Spotify embed) ———
  {
    id: "pod-1",
    type: "audio",
    title: "Podcast — Episod 1",
    embed:
      "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator",
  },

  // ——— exemplu foto ———
  {
    id: "photo-1",
    type: "photo",
    title: "Călătorie — apus",
    url: "/assets/media/photo-sample-1.jpg",
  },
];

const FILTERS = [
  { key: "all", label: "Toate" },
  { key: "photo", label: "Foto" },
  { key: "video", label: "Video" },
  { key: "audio", label: "Audio" },
  { key: "interview", label: "Interviuri" },
];

// ——— helpers YouTube ———
function youTubeId(url) {
  if (!url) return null;
  const m =
    url.match(/(?:v=|\/embed\/|\.be\/)([\w-]{11})/) ||
    url.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}
function youTubeEmbed(url) {
  const id = youTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
}
function youTubeThumb(url) {
  const id = youTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
function labelForType(t) {
  switch (t) {
    case "photo":
      return "Foto";
    case "video":
      return "Video";
    case "audio":
      return "Audio / Podcast";
    case "interview":
      return "Interviu";
    default:
      return "";
  }
}

export default function Multimedia() {
  const [active, setActive] = useState("all");
  const [openIds, setOpenIds] = useState(() => new Set()); // carduri care afișează iframe

  const list = useMemo(() => {
    return active === "all" ? MEDIA : MEDIA.filter((m) => m.type === active);
  }, [active]);

  const toggleOpen = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div style={{ padding: "24px 0 48px" }}>
      <div className="container" style={{ maxWidth: 1100, padding: "0 16px" }}>
        {/* header + back */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <h1 className="font-cormorant" style={{ margin: 0 }}>🎧 Multimedia</h1>
          <div style={{ flex: 1 }} />
          <Link to="/viziunea" className="btn-outline" style={{ textDecoration: "none" }}>
            ← Înapoi la Viziune
          </Link>
        </div>

        {/* filtre – butonașe cu snap pe mobil */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "6px 2px 12px",
            marginBottom: 12,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                scrollSnapAlign: "start",
                whiteSpace: "nowrap",
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid #d9d4c8",
                background: active === f.key ? "var(--accent)" : "#fff",
                color: active === f.key ? "#fff" : "#333",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {list.map((item) => (
            <Card
              key={item.id}
              item={item}
              open={openIds.has(item.id)}
              onToggle={() => toggleOpen(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ item, open, onToggle }) {
  const isVideo = item.type === "video" || item.type === "interview";
  const isAudio = item.type === "audio";
  const isPhoto = item.type === "photo";

  const cardStyle = {
    borderRadius: 16,
    overflow: "hidden",
    background: "#fff",
    border: "1px solid #eee",
    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
  };

  const mediaBox = {
    position: "relative",
    paddingTop: "56.25%", // 16:9
    background: "linear-gradient(180deg,#f7eee0,#fff)",
  };

  return (
    <div style={cardStyle}>
      <div style={mediaBox}>
        {/* VIDEO / INTERVIEW */}
        {isVideo && (
          <>
            {open ? (
              <iframe
                title={item.title}
                src={youTubeEmbed(item.url)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            ) : (
              <button
                onClick={onToggle}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  cursor: "pointer",
                  backgroundImage: `url(${item.thumb || youTubeThumb(item.url) || "/assets/placeholder-cover.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-label={`Play ${item.title}`}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,.35), rgba(0,0,0,.05))",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.9)",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 6px 20px rgba(0,0,0,.2)",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7-11-7z" fill="#d04b49" />
                  </svg>
                </span>
              </button>
            )}
          </>
        )}

        {/* AUDIO */}
        {isAudio && (
          <iframe
            title={item.title}
            src={item.embed}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        )}

        {/* FOTO */}
        {isPhoto && (
          <img
            src={item.url}
            alt={item.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </div>

      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontWeight: 700, color: "#2b2a28" }}>{item.title}</div>
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "#6b6b6b",
            textTransform: "capitalize",
          }}
        >
          {labelForType(item.type)}
        </div>
      </div>
    </div>
  );
}
