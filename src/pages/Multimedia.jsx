import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MEDIA, SOCIALS, FALLBACK_THUMB } from "../data/multimedia";

/** BACK LINK
 *  Setează una din variantele de mai jos în funcție de ruta reală:
 *  "/viziunea" | "/viziune" | "/proiecte" | "/projects"
 */
const VISION_PATH = "/viziunea";

/** Helpers YouTube */
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
    case "instagram":
      return "Instagram";
    default:
      return "";
  }
}

const FILTERS = [
  { key: "all", label: "Toate" },
  { key: "photo", label: "Foto" },
  { key: "video", label: "Video" },
  { key: "audio", label: "Audio" },
  { key: "interview", label: "Interviuri" },
  { key: "instagram", label: "Instagram" },
];

export default function Multimedia() {
  const [active, setActive] = useState("all");
  const [openIds, setOpenIds] = useState(() => new Set());
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let arr = active === "all" ? MEDIA : MEDIA.filter((m) => m.type === active);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      arr = arr.filter((m) => {
        const hay = `${m.title || ""} ${(m.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(s);
      });
    }
    return arr;
  }, [active, q]);

  const toggleOpen = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div style={{ padding: "24px 0 48px" }}>
      <div className="container" style={{ maxWidth: 1100, padding: "0 16px" }}>
        {/* Header + back */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <h1 className="font-cormorant" style={{ margin: 0 }}>🎧 Multimedia</h1>
          <div style={{ flex: 1 }} />
          <Link to={VISION_PATH} className="btn-outline" style={{ textDecoration: "none" }}>
            ← Înapoi la Viziune
          </Link>
        </div>

        {/* Socials */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "4px 0 10px" }}>
          {SOCIALS.instagram && (
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>
              Instagram
            </a>
          )}
          {SOCIALS.facebook && (
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>
              Facebook
            </a>
          )}
          {SOCIALS.tiktok && (
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>
              TikTok
            </a>
          )}
          {SOCIALS.youtube && (
            <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>
              YouTube
            </a>
          )}
        </div>

        {/* Search + filtre (butonașe cu snap) */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{ position: "relative", flex: "1 1 280px", minWidth: 220 }}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Caută în multimedia…"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid #d9d4c8",
                outline: "none",
              }}
            />
            {q && (
              <button
                onClick={() => setQ("")}
                aria-label="Șterge căutarea"
                style={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  border: 0,
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "#777",
                }}
              >
                ×
              </button>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              padding: "6px 2px 6px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              flex: "1 1 auto",
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
        </div>

        {/* Grid */}
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
              getThumb={() =>
                item.thumb || (["video", "interview"].includes(item.type) ? youTubeThumb(item.url) : null) || FALLBACK_THUMB
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ item, open, onToggle, getThumb }) {
  const isVideo = item.type === "video" || item.type === "interview";
  const isAudio = item.type === "audio";
  const isPhoto = item.type === "photo";
  const isInstagram = item.type === "instagram";

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
        {/* VIDEO / INTERVIU */}
        {isVideo && (
          <>
            {open ? (
              <iframe
                title={item.title}
                src={youTubeEmbed(item.url)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
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
                  backgroundImage: `url(${getThumb()})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-label={`Play ${item.title}`}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,.35), rgba(0,0,0,.05))",
                  }}
                />
                <PlayIcon />
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
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        )}

        {/* INSTAGRAM – deschide în tab nou */}
        {isInstagram && (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${getThumb()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "block",
            }}
            aria-label={`Deschide pe Instagram: ${item.title}`}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,.35), rgba(0,0,0,.05))",
              }}
            />
            <PlayIcon />
          </a>
        )}

        {/* FOTO */}
        {isPhoto && (
          <img
            src={item.url}
            alt={item.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>

      {/* Caption */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontWeight: 700, color: "#2b2a28" }}>{item.title}</div>
        <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: "#2f6d6a" }}>
          {labelForType(item.type)}
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <span
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "rgba(255,255,255,.92)",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,.2)",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M8 5v14l11-7-11-7z" fill="#d04b49" />
      </svg>
    </span>
  );
}
