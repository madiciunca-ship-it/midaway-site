import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const sectionNavStyle = {
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
};

const segBtnStyle = (active) => ({
  padding: "8px 14px",
  border: "none",
  background: active ? "var(--accent)" : "transparent",
  color: active ? "#fff" : "#444",
  cursor: "pointer",
  fontWeight: 700,
});

const getCategories = (p) => {
  if (Array.isArray(p.categories)) return p.categories;
  if (typeof p.category === "string") return [p.category];
  return [];
};

const matchCategory = (p, key) => {
  if (key === "all") return true;

  const cats = getCategories(p).map((c) => String(c || "").toLowerCase());
  const badge = String(p.badge || "").toLowerCase();

  switch (key) {
    case "nou":
      return badge.includes("nou") || badge.includes("new") || cats.includes("nou");
    case "media":
      return cats.includes("media");
    case "evenimente":
      return cats.includes("evenimente");
    case "colaborare":
      return cats.includes("comunitate") || cats.includes("colaborare");
    default:
      return true;
  }
};

function translateBadge(badge, lang) {
  if (!badge) return badge;
  if (lang === "ro") return badge;

  const b = String(badge).trim().toLowerCase();

  if (b === "nou") return "New";
  if (b === "în curând" || b === "in curand") return "Coming soon";
  if (b === "educație" || b === "educatie") return "Education";
  if (b === "colaborare") return "Collaboration";
  if (b === "media") return "Media";

  return badge;
}

function getProjectCopy(p, lang) {
  if (lang === "ro") {
    return {
      title: p.title,
      tagline: p.tagline,
      badge: p.badge,
      details: "Detalii →",
    };
  }

  const byId = {
    "editura-midaway": {
      title: "Midaway Publishing House",
      tagline: "Independent books — from lived reality into fiction.",
      badge: "New",
    },
    "autori-midaway": {
      title: "Midaway Authors",
      tagline: "Independent voices writing the world.",
      badge: "New",
    },
    "biblioteca-midaway": {
      title: "Midaway Library",
      tagline: "A place where books return to the community.",
      badge: "Education",
    },
    "evenimente-retreaturi": {
      title: "Events & Retreats",
      tagline: "Spaces for writing, breathing, and living encounters.",
      badge: "Coming soon",
    },
    "continut-media": {
      title: "Media Projects",
      tagline: "Podcasts, interviews, and mini-documentaries.",
      badge: "Media",
    },
    "implica-te": {
      title: "Join the community",
      tagline: "A community for those who believe in words and in beauty.",
      badge: "Collaboration",
    },
  };

  const byTitle = {
    "Editura Midaway": {
      title: "Midaway Publishing House",
      tagline: "Independent books — from lived reality into fiction.",
      badge: "New",
    },
    "Autori Midaway": {
      title: "Midaway Authors",
      tagline: "Independent voices writing the world.",
      badge: "New",
    },
    "Biblioteca Midaway": {
      title: "Midaway Library",
      tagline: "A place where books return to the community.",
      badge: "Education",
    },
    "Evenimente & Retreaturi": {
      title: "Events & Retreats",
      tagline: "Spaces for writing, breathing, and living encounters.",
      badge: "Coming soon",
    },
    "Conținut media": {
      title: "Media Projects",
      tagline: "Podcasts, interviews, and mini-documentaries.",
      badge: "Media",
    },
    "Continut media": {
      title: "Media Projects",
      tagline: "Podcasts, interviews, and mini-documentaries.",
      badge: "Media",
    },
    "Implică-te": {
      title: "Join the community",
      tagline: "A community for those who believe in words and in beauty.",
      badge: "Collaboration",
    },
    "Implică te": {
      title: "Join the community",
      tagline: "A community for those who believe in words and in beauty.",
      badge: "Collaboration",
    },
  };

  const copy = byId[p.id] || byTitle[p.title];

  return {
    title: copy?.title || p.titleEn || p.title,
    tagline: copy?.tagline || p.taglineEn || p.tagline,
    badge: copy?.badge || p.badgeEn || translateBadge(p.badge, "en"),
    details: "Details →",
  };
}

export default function Projects() {
  const [active, setActive] = useState("all");

  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ro";
    const stored = localStorage.getItem("projects.lang");
    return stored === "en" ? "en" : "ro";
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 900;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("projects.lang", lang);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [lang]);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 900);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const ui =
    lang === "en"
      ? {
          backHome: "← Back to Home",
          backTop: "↑ Back to top",
          title: "The Midaway Vision",
          subtitle:
            "The paths through which Midaway publishes, grows, and brings people together.",
          guideRo:
            "Pentru versiunea în limba română, poți schimba limba din selectorul RO / EN de mai sus.",
          guideEn:
            "For the Romanian version, you can switch the language using the RO / EN selector above.",
          filters: [
            { key: "all", label: "All" },
            { key: "nou", label: "New" },
            { key: "media", label: "Media" },
            { key: "evenimente", label: "Events" },
            { key: "colaborare", label: "Collaboration" },
          ],
        }
      : {
          backHome: "← Înapoi la Acasă",
          backTop: "↑ Înapoi sus",
          title: "Viziunea Midaway",
          subtitle:
            "Direcțiile prin care Midaway publică, crește și aduce oamenii împreună.",
          guideRo:
            "Pentru versiunea în limba engleză, poți schimba limba din selectorul RO / EN de mai sus.",
          guideEn:
            "For the English version, you can switch the language using the RO / EN selector above.",
          filters: [
            { key: "all", label: "Toate" },
            { key: "nou", label: "Nou" },
            { key: "media", label: "Media" },
            { key: "evenimente", label: "Evenimente" },
            { key: "colaborare", label: "Colaborare" },
          ],
        };

  const filtered = useMemo(
    () => projects.filter((p) => matchCategory(p, active)),
    [active]
  );

  return (
    <div
      className="container"
      style={{
        padding: isMobile ? "20px 0 40px" : "32px 0 48px",
        maxWidth: 1100,
      }}
    >
      <div style={{ marginTop: 0, marginBottom: 18 }}>
        <Link to="/" style={sectionNavStyle}>
          {ui.backHome}
        </Link>
      </div>

      <header
        className="font-cormorant"
        style={{ marginBottom: 24, textAlign: "center" }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: isMobile ? 36 : 44,
            lineHeight: 1.1,
          }}
        >
          {ui.title}
        </h1>

        <p
          style={{
            color: "var(--secondary)",
            marginTop: 10,
            fontSize: isMobile ? 17 : 18,
            lineHeight: 1.6,
          }}
        >
          {ui.subtitle}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 14,
            marginBottom: 14,
          }}
        >
          <div
            role="group"
            aria-label="Projects language switch"
            style={{
              display: "inline-flex",
              border: "1px solid #ddd",
              borderRadius: 999,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <button onClick={() => setLang("ro")} style={segBtnStyle(lang === "ro")}>
              RO
            </button>
            <button onClick={() => setLang("en")} style={segBtnStyle(lang === "en")}>
              EN
            </button>
          </div>
        </div>

        <p
          className="font-cormorant"
          style={{
            marginTop: 0,
            marginBottom: 22,
            textAlign: "center",
            color: "#2b2b2b",
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.7,
            padding: isMobile ? "0 6px" : 0,
          }}
        >
          {ui.guideRo}
          <br />
          {ui.guideEn}
        </p>

        <div
          style={{
            height: 2,
            background: "#d5b56f",
            opacity: 0.6,
            marginTop: 16,
          }}
        />
      </header>

      <div
        className="proj-tabs"
        style={{
          marginTop: 18,
          marginBottom: 18,
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {ui.filters.map((f) => (
          <button
            key={f.key}
            className={`proj-tab ${active === f.key ? "active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="proj-grid">
        {filtered.map((p) => {
          const textColor = p.darkOnCard ? "#fff" : "inherit";
          const copy = getProjectCopy(p, lang);

          return (
            <Link
              key={p.id}
              to={`/proiecte/${p.id}`}
              className="proj-card"
              style={{
                textDecoration: "none",
                color: textColor,
                background: `var(${p.colorVar})`,
              }}
            >
              <div className="proj-cover" style={{ backgroundImage: `url(${p.cover})` }}>
                {copy.badge && (
                  <span
                    className="proj-badge"
                    style={{ background: p.badgeColor || "var(--accent)" }}
                  >
                    {copy.badge}
                  </span>
                )}
              </div>

              <div className="proj-body">
                <div style={{ fontSize: 32, lineHeight: 1 }}>{p.emoji}</div>

                <h3 className="font-cormorant" style={{ margin: "6px 0 6px" }}>
                  {copy.title}
                </h3>

                <p style={{ margin: 0, opacity: p.darkOnCard ? 0.9 : 0.8 }}>
                  {copy.tagline}
                </p>

                <p className="proj-details">{copy.details}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          style={sectionNavStyle}
        >
          {ui.backTop}
        </a>
      </div>
    </div>
  );
}