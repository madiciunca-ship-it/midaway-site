// src/pages/Travelers.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import travelers from "../data/travelers";

export default function Travelers() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const lang = params.get("lang") === "en" ? "en" : "ro";

  useEffect(() => {
    const saved = localStorage.getItem("travelers.lang");
    if (!params.get("lang") && saved) {
      setParams((p) => {
        const c = new URLSearchParams(p);
        c.set("lang", saved);
        return c;
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
    localStorage.setItem("travelers.lang", l);
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = travelers
      .slice()
      .reverse()
      .map((t) => ({
        id: t.id,
        emoji: t.emoji,
        name: t.name,
        tagline: t.tagline,
        cover: t.cover || (t.gallery?.[0] ?? "/assets/placeholder-cover.png"),
      }));

    if (!term) return list;
    return list.filter((x) =>
      `${x.name} ${x.tagline}`.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      <header className="font-cormorant" style={{ marginBottom: 8 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>🧳 Călători & Călătorii</h1>
        <p style={{ color: "var(--secondary)", marginTop: 6 }}>
          {lang === "en"
            ? "People who made the road their home and the unknown their friend."
            : "Vocile independente pe care le publicăm – întâi oamenii, apoi cărțile."}
        </p>
      </header>

      <section style={{ marginBottom: 16 }}>
  {lang === "en" ? (
    <>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        I’m Mida Malena, and for the past three years I’ve been traveling — through the world and through myself.
        I’ve gathered memories, faces, stories, and moments that have forever changed the way I see life.
      </p>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        In “Travelers”, I bring together the voices of those who have made the road their home and the unknown their friend.
        Each interview is a window into another world — told in the voice of the one who lived it.
        Some became my guides, others my friends, some just beautiful passersby in my own stories.
      </p>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        I’ve collected far more stories than I can share here — but they’ll come, one by one.
        Because every person I’ve met has left a trace in me,
        and somehow, in each of my books, there’s a little piece of them.
      </p>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        Read these stories with an open heart.
        They might just give you the courage to pack your bags —
        or simply to begin your own journey, wherever you are.
      </p>
    </>
  ) : (
    <>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        Eu sunt Mida Malena și, în ultimii trei ani, am călătorit prin lumi și prin mine.
        Am adunat amintiri, oameni, povești și trăiri care mi-au schimbat felul de a privi viața.
      </p>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        În rubrica „Călători”, adun vocile celor care și-au făcut din drum o casă și din necunoscut – prieten.
        Fiecare interviu e o fereastră deschisă spre o altă lume, spusă cu vocea celui care a trăit-o.
        Unii mi-au fost ghizi, alții prieteni, alții doar trecători frumoși în poveștile mele.
      </p>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        Am adunat infinit mai multe istorii decât pot încă așterne aici – dar vor veni toate, pe rând.
        Pentru că fiecare om pe care l-am întâlnit și-a lăsat o amprentă în mine,
        și, cumva, în fiecare carte a mea există câte puțin din fiecare dintre ei.
      </p>
      <p style={{ lineHeight: 1.7, margin: "8px 0" }}>
        Citește aceste povești cu inima deschisă.
        S-ar putea să-ți dea curajul să-ți faci și tu bagajele –
        sau, măcar, să începi călătoria ta, oriunde te-ai afla.
      </p>
    </>
  )}
</section>

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
          placeholder="Caută călător…"
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
          <button onClick={() => setLang("ro")} style={segBtn(lang === "ro")}>
            RO
          </button>
          <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>
            EN
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((t) => (
          <Link
            key={t.id}
            to={`/calatori/${t.id}?lang=${lang}`}
            className="proj-card"
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 18,
              boxShadow: "0 6px 16px rgba(0,0,0,.06)",
              overflow: "hidden",
              transition: "transform .12s ease",
            }}
          >
            <div
              style={{
                height: 200,
                backgroundImage: `url(${t.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 26, lineHeight: 1 }}>{t.emoji}</div>
              <h3 className="font-cormorant" style={{ margin: "6px 0 6px", fontSize: 22 }}>
                {t.name}
              </h3>
              <p style={{ margin: 0, color: "var(--secondary)" }}>{t.tagline}</p>
              <p className="proj-details" style={{ marginTop: 8 }}>Detalii →</p>
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
