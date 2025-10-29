import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// 🔸 același set de carduri ca înainte (le poți edita/ordona aici)
//  pune mereu noul traveler la FINAL – lista se inversează la randare (newest first)
const ITEMS = [
  { id: "nomad-bali",        icon: "🏝️", title: "Nomadul din Bali",        subtitle: "Laptop, motocicletă și filme" },
  { id: "scriitoare-saigon", icon: "✍️", title: "Scriitoarea din Saigon",  subtitle: "Cafele, pagini, ploaie" },
  { id: "calatoare-barca",   icon: "🚤", title: "Călătoarea cu barca",      subtitle: "Insule, vânt, povești" },
  { id: "nomad-tokyo",       icon: "🗼", title: "Nomadul din Tokyo",        subtitle: "Luminile orașului, liniștea trenurilor" },
];

// nuanța ramei calde ca la „Cărți”
const FRAME_BG = "#f6efe4";

export default function Travelers() {
  const [params, setParams] = useSearchParams();
  const lang = params.get("lang") === "en" ? "en" : "ro";
  const [q, setQ] = useState(params.get("q") || "");

  const setLang = (l) => {
    setParams((p) => {
      const c = new URLSearchParams(p);
      c.set("lang", l);
      if (q) c.set("q", q);
      return c;
    });
    localStorage.setItem("travelers.lang", l);
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    // newest first (ultimul din listă va fi primul afișat)
    const list = [...ITEMS].reverse();
    if (!term) return list;
    return list.filter(
      (it) =>
        `${it.title} ${it.subtitle}`.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      {/* Header centrat */}
      <header className="font-cormorant" style={{ marginBottom: 10, textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: 42 }}>
          🧳 {lang === "en" ? "Travelers & Journeys" : "Călători & Călătorii"}
        </h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          {lang === "en"
            ? "Independent voices we publish – people first, then books."
            : "Vocile independente pe care le publicăm – întâi oamenii, apoi cărțile."}
        </p>
      </header>

      {/* Intro centrat (RO/EN) */}
      <section style={{ maxWidth: 980, margin: "0 auto" }}>
        {lang === "en" ? (
          <div style={{ textAlign: "center", lineHeight: 1.75, color: "#222" }}>
            <p style={{ marginTop: 0 }}>
              I’m <b>Mida Malena</b>, and for the past three years I’ve been traveling – through the world and through myself.
              I’ve gathered memories, faces, stories, and moments that have forever changed the way I see life.
            </p>
            <p>
              In “Travelers”, I bring together the voices of those who have made the road their home and the unknown their friend.
              Each interview is a window into another world – told in the voice of the one who lived it.
              Some became my guides, others my friends – some just beautiful passersby in my own stories.
            </p>
            <p>
              I’ve collected far more stories than I can share here – but they’ll come, one by one.
              Because every person I’ve met has left a trace in me,
              and somehow, in each of my books, there’s a little piece of them.
            </p>
            <p style={{ marginBottom: 0 }}>
              Read these stories with an open heart.
              They might just give you the courage to pack your bags – or simply to begin your own journey, wherever you are.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", lineHeight: 1.75, color: "#222" }}>
            <p style={{ marginTop: 0 }}>
              Eu sunt <b>Mida Malena</b> și, în ultimii trei ani, am călătorit prin lumi și prin mine.
              Am adunat amintiri, oameni, povești și trăiri care mi-au schimbat felul de a privi viața.
            </p>
            <p>
              În rubrica „Călători”, adun vocile celor care și-au făcut din drum o casă și din necunoscut – prieten.
              Fiecare interviu e o fereastră deschisă spre o altă lume, spusă cu vocea celui care a trăit-o.
              Unii mi-au fost ghizi, alții prieteni – sau doar trecători frumoși în poveștile mele.
            </p>
            <p>
              Am adunat infinit mai multe istorii decât pot încă așterne aici – dar vor veni toate, pe rând.
              Pentru că fiecare om pe care l-am întâlnit și-a lăsat o amprentă în mine,
              și, cumva, în fiecare carte a mea există câte puțin din fiecare dintre ei.
            </p>
            <p style={{ marginBottom: 0 }}>
              Citește aceste povești cu inima deschisă. S-ar putea să-ți dea curajul să-ți faci și tu bagajele –
              sau, măcar, să începi călătoria ta, oriunde te-ai afla.
            </p>
          </div>
        )}
      </section>

      {/* Separator animat */}
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

      {/* Căutare + switch limbă */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          margin: "0 auto 16px",
          maxWidth: 980,
        }}
      >
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
          placeholder={lang === "en" ? "Search travelers…" : "Caută călători…"}
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

      {/* Grid carduri – stil ca la Cărți */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={`/calatori/${p.id}?lang=${lang}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 18,
              boxShadow: "0 6px 16px rgba(0,0,0,.06)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* cadru bej + imagine mare centrată */}
            <div
              style={{
                background: FRAME_BG,
                padding: 12,
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#eee",
                }}
              >
                {/* thumb generic – în detaliu apar galeriile; aici ținem layout-ul curat */}
                <img
                  src={`/assets/travelers/${p.id}/cover.webp`}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            {/* text centrat ca la Cărți */}
            <div style={{ padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 28, lineHeight: 1 }}>{p.icon}</div>
              <h3 className="font-cormorant" style={{ margin: "6px 0 6px", fontSize: 22 }}>
                {p.title}
              </h3>
              <p style={{ margin: 0, color: "var(--secondary)" }}>{p.subtitle}</p>
              <div style={{ marginTop: 10, fontSize: 13, color: "var(--accent)" }}>
                {lang === "en" ? "Details →" : "Detalii →"}
              </div>
            </div>
          </Link>
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
