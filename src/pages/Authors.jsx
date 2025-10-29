import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import authors from "../data/authors";

// nuanța ramei calde ca la „Cărți”
const FRAME_BG = "#f6efe4";

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
      d:
        (lang === "en" ? a.en : a.ro) ||
        a.ro ||
        a.en || { name: a.id, role: "", tagline: "" },
    }));
    if (!term) return list;
    return list.filter(({ d }) =>
      `${d.name} ${d.role} ${d.tagline}`.toLowerCase().includes(term)
    );
  }, [q, lang]);

  // completează până la 3 carduri cu placeholder (rămâne compatibil)
  const placeholders = Math.max(0, 3 - filtered.length);

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header centrat */}
      <header className="font-cormorant" style={{ marginBottom: 10, textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: 42 }}>
          {lang === "en" ? "Midaway Authors" : "Autorii Midaway"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          {lang === "en"
            ? "Independent voices we publish – people first, then books."
            : "Vocile independente pe care le publicăm – întâi oamenii, apoi cărțile."}
        </p>

        {/* descriere centrală cu negru (ca la Călători) */}
        <p style={{ color: "#222", lineHeight: 1.75, margin: "8px auto 0", maxWidth: 980 }}>
          {lang === "en"
            ? "We believe in authenticity and voices that grow from real experiences. Whether you’re just starting out or already published, Midaway offers a space for attentive editing, fair validation and integrated promotion – a place where your voice truly matters."
            : "Credem în autenticitate și în voci care cresc din experiențe reale. Fie că ești la început sau ai cărți publicate, Midaway oferă spațiu pentru editare, validare și promovare atentă – un loc în care vocea ta contează."}
        </p>
      </header>

      {/* Separator */}
      <div
        style={{
          height: 2,
          width: "100%",
          background:
            "linear-gradient(90deg, rgba(212,160,23,0.1), rgba(212,160,23,0.8), rgba(212,160,23,0.1))",
          backgroundSize: "200% 100%",
          borderRadius: 999,
          margin: "28px 0 20px 0",
          animation: "shimmer 3.5s linear infinite",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Căutare + limbi */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "0 auto 16px", maxWidth: 980 }}>
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

      {/* Grid carduri – identic cu Books/Travelers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map(({ a, d }) => (
          <Link
            key={a.id}
            to={`/autori/${a.id}?lang=${lang}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: FRAME_BG,
              border: "1px solid var(--line)",
              borderRadius: 18,
              boxShadow: "0 6px 16px rgba(0,0,0,.06)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* cadru bej + imagine */}
            <div style={{ background: FRAME_BG, padding: 12 }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#eee",
                }}
              >
                <img
                  src={a.photo || "/assets/placeholder-cover.png"}
                  alt={d.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            {/* text centrat sub poză */}
            <div style={{ padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 26, lineHeight: 1 }}>✒️</div>
              <h3 className="font-cormorant" style={{ margin: "6px 0 6px", fontSize: 22 }}>
                {d.name}
              </h3>
              <p style={{ margin: 0, color: "var(--secondary)" }}>
                {d.role}{d.tagline ? ` — ${d.tagline}` : ""}
              </p>
              <div style={{ marginTop: 10, fontSize: 13, color: "var(--accent)" }}>
                {lang === "en" ? "Details →" : "Detalii →"}
              </div>
            </div>
          </Link>
        ))}

        {/* Placeholdere compatibile, dar cu același cadru bej */}
        {Array.from({ length: placeholders }).map((_, i) => (
          <div
            key={`ph-${i}`}
            style={{
              background: FRAME_BG,
              border: "1px solid var(--line)",
              borderRadius: 18,
              boxShadow: "0 6px 16px rgba(0,0,0,.04)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ background: FRAME_BG, padding: 12 }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  borderRadius: 14,
                  overflow: "hidden",
                  background:
                    "repeating-linear-gradient(45deg, rgba(255,255,255,.5), rgba(255,255,255,.5) 10px, rgba(255,255,255,.35) 10px, rgba(255,255,255,.35) 20px)",
                }}
              />
            </div>
            <div style={{ padding: 14, textAlign: "center" }}>
              <h3 className="font-cormorant" style={{ margin: "6px 0 6px", fontSize: 22 }}>
                {lang === "en" ? "Your name here" : "Aici va fi numele tău 😊"}
              </h3>
              <p style={{ margin: 0, opacity: 0.9 }}>
                {lang === "en" ? "Midaway author — soon" : "Autor Midaway — în curând"}
              </p>
              <Link
                to={`/contact?subject=${encodeURIComponent(
                  lang === "en" ? "New author collaboration" : "Colaborare autor nou"
                )}`}
                style={{
                textDecoration: "none",
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 999,
                background: "#e9d6bf",      // nuanță caldă
                color: "#3b2a1e",
                border: "1px solid rgba(0,0,0,.08)",
                display: "inline-block",
                fontSize: 15,
                boxShadow: "0 2px 8px rgba(0,0,0,.06)",
              }}
              >
                {lang === "en" ? "Propose a collaboration" : "Propune o colaborare"}
              </Link>
            </div>
          </div>
        ))}
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
