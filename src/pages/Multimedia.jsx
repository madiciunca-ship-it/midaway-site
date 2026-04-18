import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MEDIA, SOCIALS, FALLBACK_THUMB } from "../data/multimedia";

// Back către „Viziunea” – în header este ruta /proiecte
const VISION_PATH = "/proiecte";

/* Helpers YouTube */
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
function labelForType(t, lang = "ro") {
  const ro = {
    photo: "Foto",
    video: "Video",
    audio: "Audio / Podcast",
    interview: "Interviu",
    instagram: "Instagram",
    album: "Album foto",
  };

  const en = {
    photo: "Photo",
    video: "Video",
    audio: "Audio / Podcast",
    interview: "Interview",
    instagram: "Instagram",
    album: "Photo album",
  };

  const dict = lang === "en" ? en : ro;
  return dict[t] || "";
}



export default function Multimedia() {
  const [active, setActive] = useState("all");
  const [openIds, setOpenIds] = useState(() => new Set());
  const [q, setQ] = useState("");
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ro";
    const stored = localStorage.getItem("multimedia.lang");
    return stored === "en" ? "en" : "ro";
  });
  
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("multimedia.lang", lang);
    }
  }, [lang]);
  
  const ui =
    lang === "en"
      ? {
          title: "🎧 Multimedia",
          backVision: "← Back to Vision",
          backTop: "↑ Back to top",
          search: "Search in multimedia…",
          clearSearch: "Clear search",
          all: "All",
          photo: "Photo",
          video: "Video",
          audio: "Audio",
          interviews: "Interviews",
          instagram: "Instagram",
        }
      : {
          title: "🎧 Multimedia",
          backVision: "← Înapoi la Viziune",
          backTop: "↑ Înapoi sus",
          search: "Caută în multimedia…",
          clearSearch: "Șterge căutarea",
          all: "Toate",
          photo: "Foto",
          video: "Video",
          audio: "Audio",
          interviews: "Interviuri",
          instagram: "Instagram",
        };


        const FILTERS = [
          { key: "all", label: ui.all },
          { key: "photo", label: ui.photo },
          { key: "video", label: ui.video },
          { key: "audio", label: ui.audio },
          { key: "interview", label: ui.interviews },
          { key: "instagram", label: ui.instagram },
        ];
  const list = useMemo(() => {
    let arr = MEDIA;
    if (active !== "all") {
      arr = MEDIA.filter((m) =>
        active === "photo" ? (m.type === "photo" || m.type === "album") : m.type === active
      );
    }
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
    <div style={{ padding: "10px 0 48px" }}>
<div className="container" style={{ maxWidth: 1200, padding: "0 16px" }}>
      <div style={{ marginTop: 14, marginBottom: 16 }}>
  <Link
    to={VISION_PATH}
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 14px",
      borderRadius: 999,
      border: "1px solid var(--accent)",
      color: "var(--accent)",
      textDecoration: "none",
      fontWeight: 600,
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,.04)",
    }}
  >
    {ui.backVision}
  </Link>
</div>
       
       
        {/* Header + back (sus) */}
        <div style={{ marginBottom: 10 }}>
  <h1 className="font-cormorant" style={{ margin: 0 }}>
    {ui.title}
  </h1>
</div>

        {/* Socials */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "4px 0 10px" }}>
          {SOCIALS.instagram && <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>Instagram</a>}
          {SOCIALS.facebook && <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>Facebook</a>}
          {SOCIALS.tiktok && <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>TikTok</a>}
          {SOCIALS.youtube && <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>YouTube</a>}
        </div>

        {/* Search + filtre (butonașe cu snap) */}
        <div style={{ display: "grid", gap: 12, marginBottom: 12 }}>
  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
    <div style={{ position: "relative", flex: "1 1 280px", minWidth: 220 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={ui.search}
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
          aria-label={ui.clearSearch}
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
      <button
        onClick={() => setLang("ro")}
        style={{
          padding: "8px 14px",
          border: "none",
          background: lang === "ro" ? "var(--accent)" : "transparent",
          color: lang === "ro" ? "#fff" : "#444",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        RO
      </button>
      <button
        onClick={() => setLang("en")}
        style={{
          padding: "8px 14px",
          border: "none",
          background: lang === "en" ? "var(--accent)" : "transparent",
          color: lang === "en" ? "#fff" : "#444",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        EN
      </button>
    </div>
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
            lang={lang}
            open={openIds.has(item.id)}
            onToggle={() => toggleOpen(item.id)}
            getThumb={() =>
              item.thumb ||
              (["video", "interview"].includes(item.type) ? youTubeThumb(item.url) : null) ||
              FALLBACK_THUMB
            }
          />
          ))}
        </div>

        {/* Back jos */}
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 24,
    flexWrap: "wrap",
  }}
>
  <Link
    to={VISION_PATH}
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 14px",
      borderRadius: 999,
      border: "1px solid var(--accent)",
      color: "var(--accent)",
      textDecoration: "none",
      fontWeight: 600,
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,.04)",
    }}
  >
    {ui.backVision}
  </Link>

  <a
    href="#top"
    onClick={(e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }}
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 14px",
      borderRadius: 999,
      border: "1px solid var(--accent)",
      color: "var(--accent)",
      textDecoration: "none",
      fontWeight: 600,
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,.04)",
    }}
  >
    {ui.backTop}
  </a>
</div>
  
      </div>
    </div>
  );
}

function Card({ item, lang, open, onToggle, getThumb }) {
  const isVideo = item.type === "video" || item.type === "interview";
  const isAudio = item.type === "audio";
  const isPhoto = item.type === "photo";
  const isInstagram = item.type === "instagram";
  const isAlbum = item.type === "album";

  const cardStyle = {
    borderRadius: 16,
    overflow: "hidden",
    background: "#fff",
    border: "1px solid #eee",
    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
  };

  // Toate cardurile au același raport (16:9) – aspect unitar
  const mediaBox = {
    position: "relative",
    paddingTop: "56.25%", // 16:9 pentru toate, inclusiv audio
    background: "linear-gradient(180deg,#f7eee0,#fff)",
  };

  const captionStyle = { padding: "10px 12px" };

  return (
    <div style={cardStyle}>
      <div style={mediaBox}>
        {/* VIDEO / INTERVIU (YouTube) */}
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

        {/* INSTAGRAM – revenim la varianta LINK + THUMB (nu embed) */}
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

        {/* AUDIO – 16:9 ca restul (unitar vizual) */}
        {isAudio && (
          <iframe
            title={item.title}
            src={item.embed}
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        )}

        {/* ALBUM – mozaic 3 imagini + badge; click = expand */}
        {isAlbum && (
          <button
            onClick={onToggle}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, cursor: "pointer" }}
            aria-label={`Deschide albumul: ${item.title}`}
          >
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2 }}>
              <div style={{ position: "relative" }}>
                <img src={item.images[0]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 2 }}>
                <div style={{ position: "relative" }}>
                  <img src={item.images[1] || item.images[0]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ position: "relative" }}>
                  <img src={item.images[2] || item.images[0]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
            <span
              style={{
                position: "absolute", right: 10, bottom: 10,
                background: "rgba(0,0,0,.55)", color: "#fff",
                padding: "4px 8px", borderRadius: 999, fontWeight: 700, fontSize: 12
              }}
            >
              {item.images.length} foto
            </span>
          </button>
        )}

        {/* FOTO simplă */}
        {isPhoto && (
          <img
            src={item.url}
            alt={item.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>

      {/* Caption – identic pentru toate cardurile */}
      <div style={captionStyle}>
        <div style={{ fontWeight: 700, color: "#2b2a28" }}>{item.title}</div>
        <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: "#2f6d6a" }}>
        {labelForType(item.type, lang)}
        </div>
      </div>

      {/* Expand albume – grid cu toate pozele */}
      {isAlbum && open && (
        <div style={{ padding: "0 12px 12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
            {item.images.map((src, i) => (
              <a key={i} href={src} target="_blank" rel="noreferrer" style={{ display: "block", position: "relative", paddingTop: "66%" }}>
                <img
                  src={src}
                  alt={`${item.title} — ${i + 1}`}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                />
              </a>
            ))}
          </div>
        </div>
      )}
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
