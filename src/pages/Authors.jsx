// src/pages/Authors.jsx
import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import authors from "../data/authors";

export default function Authors() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const lang = params.get("lang") === "en" ? "en" : "ro";

  useEffect(() => {
    const saved = localStorage.getItem("authors.lang");
    if (!params.get("lang") && saved) {
      setParams((p) => {
        const copy = new URLSearchParams(p);
        copy.set("lang", saved);
        return copy;
      });
    }
  }, []); // eslint-disable-line

  const setLang = (l) => {
    setParams((p) => {
      const c = new URLSearchParams(p);
      c.set("lang", l);
      if (q) c.set("q", q);
      return c;
    });
    localStorage.setItem("authors.lang", l);
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = authors.map((a) => ({
      a,
      d: (lang === "en" ? a.en : a.ro) || a.ro || a.en || { name: a.id, role: "", tagline: "" },
    }));
    if (!term) return list;
    return list.filter(({ d }) =>
      `${d.name} ${d.role} ${d.tagline}`.toLowerCase().includes(term)
    );
  }, [q, lang]);

  // completează până la 3 carduri cu „placeholder” elegante
  const placeholders = Math.max(0, 3 - filtered.length);

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header */}
      <header className="font-cormorant" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>
          {lang === "en" ? "Midaway Authors" : "Autorii Midaway"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          {lang === "en"
            ? "Independent voices we publish — people first, then books."
            : "Vocile independente pe care le publicăm — întâi oamenii, apoi cărțile."}
        </p>
      </header>

      {/* Search + Lang */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setParams((p) => {
              const c = new URLSearchParams(p);
              if (e.target.value) c.set("q", e.target.value);
              else c.delete("q");
              return c;
            });
          }}
          placeholder={lang === "en" ? "Search authors…" : "Caută autori…"}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #ddd",
          }}
        />

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
          <button onClick={() => setLang("ro")} style={segBtn(lang === "ro")}>RO</button>
          <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>EN</button>
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
        {filtered.map(({ a, d }) => (
          <AuthorCard key={a.id} a={a} d={d} lang={lang} />
        ))}

        {Array.from({ length: placeholders }).map((_, i) => (
          <PlaceholderCard key={`ph-${i}`} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function AuthorCard({ a, d, lang }) {
  return (
    <Link
      to={`/autori/${a.id}?lang=${lang}`}
      className="proj-card"
      style={{
        textDecoration: "none",
        color: "inherit",
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 18,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        overflow: "hidden",
      }}
    >
      {/* cover mic, 16:9 */}
      <div
        style={{
          height: 170,
          backgroundImage: `url(${a.photo || "/assets/placeholder-cover.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 26, lineHeight: 1 }}>✒️</div>
        <h3 className="font-cormorant" style={{ margin: "6px 0 6px", fontSize: 22 }}>
          {d.name}
        </h3>
        <p style={{ margin: 0, color: "var(--secondary)" }}>
          {d.role}{d.tagline ? ` — ${d.tagline}` : ""}
        </p>
        <p className="proj-details" style={{ marginTop: 8 }}>
          {lang === "en" ? "Details →" : "Detalii →"}
        </p>
      </div>
    </Link>
  );
}

function PlaceholderCard({ lang }) {
  return (
    <div
      className="proj-card"
      style={{
        background: "#fff",
        border: "2px dashed #ddd",
        borderRadius: 18,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 260,
      }}
    >
      <div
        style={{
          height: 170,
          borderRadius: 12,
          background:
            "repeating-linear-gradient(45deg,#f7f7f7,#f7f7f7 10px,#fafafa 10px,#fafafa 20px)",
        }}
      />
      <div>
        <h3 className="font-cormorant" style={{ margin: "10px 0 6px", fontSize: 22 }}>
          {lang === "en" ? "Your name here" : "Numele tău aici"}
        </h3>
        <p style={{ margin: 0, color: "var(--secondary)" }}>
          {lang === "en" ? "Future Midaway author" : "Autor Midaway în curând"}
        </p>
        <Link
          to={`/contact?subject=${encodeURIComponent(
            lang === "en" ? "New author collaboration" : "Colaborare autor nou"
          )}`}
          className="btn"
          style={{ textDecoration: "none", marginTop: 8, display: "inline-block" }}
        >
          {lang === "en" ? "Propose a collaboration" : "Propune o colaborare"}
        </Link>
      </div>
    </div>
  );
}

function segBtn(active) {
  return {
    padding: "8px 14px",
    border: "none",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#fff" : "#444",
    cursor: "pointer",
    fontWeight: 700,
  };
}
