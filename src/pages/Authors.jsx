// src/pages/Authors.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import authors from "../data/authors";

function getLocaleData(author, lang) {
  // fallback EN → RO → primele câmpuri disponibile
  const data =
    (lang === "en" ? author.en : author.ro) ||
    author.ro ||
    author.en ||
    { name: author.id, role: "", tagline: "" };
  return data;
}

export default function Authors() {
  const [params, setParams] = useSearchParams();
  const initialLang = params.get("lang") === "en" ? "en" : "ro";
  const [lang, setLang] = useState(initialLang);
  const [q, setQ] = useState("");

  useEffect(() => {
    setParams((p) => {
      const copy = new URLSearchParams(p);
      copy.set("lang", lang);
      return copy;
    });
    localStorage.setItem("authors.lang", lang);
  }, [lang, setParams]);

  useEffect(() => {
    const remembered = localStorage.getItem("authors.lang");
    if (remembered === "en" || remembered === "ro") {
      setLang(remembered);
    }
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return authors;
    return authors.filter((a) => {
      const d = getLocaleData(a, lang);
      return (
        (d.name || "").toLowerCase().includes(needle) ||
        (d.role || "").toLowerCase().includes(needle) ||
        (d.tagline || "").toLowerCase().includes(needle)
      );
    });
  }, [q, lang]);

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header */}
      <header
        className="font-cormorant"
        style={{ display: "flex", alignItems: "end", gap: 16, marginBottom: 16, flexWrap: "wrap" }}
      >
        <div style={{ flex: "1 1 auto" }}>
          <h1 style={{ margin: 0, fontSize: 40 }}>
            {lang === "en" ? "Midaway Authors" : "Autorii Midaway"}
          </h1>
          <p style={{ color: "var(--secondary)", marginTop: 8 }}>
            {lang === "en"
              ? "Independent voices we publish — people first, then books."
              : "Vocile independente pe care le publicăm — întâi oamenii, apoi cărțile."}
          </p>
        </div>

        {/* Lang toggle */}
        <div
          role="group"
          aria-label="Language switch"
          style={{
            display: "inline-flex",
            border: "1px solid var(--line)",
            borderRadius: 999,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <button
            onClick={() => setLang("ro")}
            className={`btn-outline ${lang === "ro" ? "active" : ""}`}
            style={segBtnStyle(lang === "ro")}
          >
            RO
          </button>
          <button
            onClick={() => setLang("en")}
            className={`btn-outline ${lang === "en" ? "active" : ""}`}
            style={segBtnStyle(lang === "en")}
          >
            EN
          </button>
        </div>
      </header>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={lang === "en" ? "Search authors…" : "Caută autori…"}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            minWidth: 240,
            flex: "1 1 240px",
          }}
        />
      </div>

      {/* Grid */}
      <div className="proj-grid">
        {filtered.map((a) => {
          const d = getLocaleData(a, lang);
          return (
            <Link
              key={a.id}
              to={`/autori/${a.id}?lang=${lang}`}
              className="proj-card"
              style={{
                textDecoration: "none",
                color: "inherit",
                background: "var(--card2)", // teal (merge cu text alb)
                color: "#fff",
              }}
            >
              <div
                className="proj-cover"
                style={{
                  backgroundImage: `url(${a.photo || "/assets/placeholder-cover.png"})`,
                  backgroundPosition: "center",
                }}
              />
              <div className="proj-body">
                <div style={{ fontSize: 32, lineHeight: 1 }}>✒️</div>
                <h3 className="font-cormorant" style={{ margin: "6px 0 6px" }}>
                  {d.name}
                </h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  {d.role ? d.role.charAt(0).toUpperCase() + d.role.slice(1) : ""}
                  {d.tagline ? ` — ${d.tagline}` : ""}
                </p>
                <p className="proj-details">{lang === "en" ? "Details →" : "Detalii →"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function segBtnStyle(active) {
  return {
    padding: "8px 14px",
    border: "none",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#fff" : "inherit",
    cursor: "pointer",
    fontWeight: 600,
  };
}
