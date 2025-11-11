import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

/* ——— Butoane segmentate RO/EN (ca la Ghizi) ——— */
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

/* ——— Texte homepage bilingve ——— */
const i18nHome = {
  ro: {
    hero_title: "MIDAWAY",
    hero_tagline: "Cărți care pornesc la drum",
    hero_meta: "print & digital  • ro / en •  editare & design",
    hero_sub:
      "Midaway este o editură independentă. Publicăm literatură de călătorie, jurnale și eseuri care inspiră, dau curaj, pun întrebări și creează legături.",
    viziune_btn: "VIZIUNEA MIDAWAY",
    card_carti_t: "Cărți",
    card_carti_s: "Inspirație, provocare, visuri îndrăznețe.",
    card_autori_t: "Autori",
    card_autori_s: "Vocile independente care scriu lumea.",
    card_calatori_t: "Călători",
    card_calatori_s: "Povești reale, interviuri, galerie de drum.",
    card_ghizi_t: "Ghizi",
    card_ghizi_s: "Oameni care trăiesc locul pe care îl arată.",
  },
  en: {
    hero_title: "MIDAWAY",
    hero_tagline: "Books that set out on a journey",
    hero_meta: "print & digital  • ro / en •  editing & design",
    hero_sub:
      "Midaway is an independent publishing house. We publish travel literature, journals and essays that inspire, embolden, ask questions, and create connections.",
    viziune_btn: "MIDAWAY VISION",
    card_carti_t: "Books",
    card_carti_s: "Inspiration, challenge, bold dreams.",
    card_autori_t: "Authors",
    card_autori_s: "Independent voices writing the world.",
    card_calatori_t: "Travelers",
    card_calatori_s: "True stories, interviews, road gallery.",
    card_ghizi_t: "Guides",
    card_ghizi_s: "People who truly live the place they show.",
  },
};

/* === Carousel local === */
function Carousel({ slides }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!slides?.length) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);
  if (!slides?.length) return null;

  return (
    <div className="container">
      <div className="carousel">
        {slides.map((s, idx) => (
          <img
            key={idx}
            src={s.src}
            alt={s.alt}
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
        <div className="caption-overlay" />
        <div className="caption font-cormorant" style={{ fontSize: 18 }}>
          {slides[i].caption}
        </div>
        <div className="dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          className="arrow left"
          onClick={() => setI((i - 1 + slides.length) % slides.length)}
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          className="arrow right"
          onClick={() => setI((i + 1) % slides.length)}
          aria-label="Următor"
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* === Pagina HOME === */
export default function Home() {
  // RO/EN din query + memorie locală (ca la Ghizi)
  const [params, setParams] = useSearchParams();
  const lang = params.get("lang") === "en" ? "en" : "ro";

  useEffect(() => {
    const saved = localStorage.getItem("home.lang");
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
      return c;
    });
    localStorage.setItem("home.lang", l);
  };

  const t = i18nHome[lang];

  // Carousel – pozele tale din /public/hero/
  const slidesRO = [
    {
      src: "/hero/side1.webp",
      alt: "Apus de soare peste ocean",
      caption: "Liniștea de la capătul lumii — începutul unei noi povești.",
    },
    {
      src: "/hero/side2.webp",
      alt: "Insulă tropicală în mijlocul oceanului",
      caption: "Uneori, lumea întreagă încape într-o insulă de liniște.",
    },
    {
      src: "/hero/side3.webp",
      alt: "Barcă pe plajă, printre frunze de coastă",
      caption: "Drumul continuă — cu fiecare pagină, cu fiecare val.",
    },
  ];
  
  const slidesEN = [
    {
      src: "/hero/side1.webp",
      alt: "Sunset over the ocean",
      caption: "The stillness at the end of the world — the beginning of a new story.",
    },
    {
      src: "/hero/side2.webp",
      alt: "Tropical island in the ocean",
      caption: "Sometimes, the whole world fits on a quiet island.",
    },
    {
      src: "/hero/side3.webp",
      alt: "Boat on a beach under coastal leaves",
      caption: "The road goes on — with every page, with every wave.",
    },
  ];
  

  return (
    <>
      {/* HERO */}
      <section className="hero hero--compact">
        <div className="font-cormorant" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 64, letterSpacing: ".02em", margin: 0 }}>
            {t.hero_title}
          </h1>

          <p
            style={{
              color: "var(--secondary)",
              fontStyle: "italic",
              marginTop: 8,
            }}
          >
            {`„${t.hero_tagline}”`}
          </p>

          <p
            style={{ color: "var(--secondary)", marginTop: 6, fontSize: 16 }}
          >
            {t.hero_meta}
          </p>

          <p
            style={{
              maxWidth: 720,
              margin: "24px auto 0",
              fontSize: 22,
              lineHeight: 1.6,
            }}
          >
            {t.hero_sub}
          </p>

          <div style={{ marginTop: 24 }}>
            <Link className="btn" to={`/proiecte?lang=${lang}`}>
              {t.viziune_btn}
            </Link>
          </div>

          {/* Switch RO/EN */}
          <div
            role="group"
            aria-label="Language switch"
            style={{
              marginTop: 16,
              display: "inline-flex",
              border: "1px solid #ddd",
              borderRadius: 999,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <button
              onClick={() => setLang("ro")}
              style={segBtn(lang === "ro")}
            >
              RO
            </button>
            <button
              onClick={() => setLang("en")}
              style={segBtn(lang === "en")}
            >
              EN
            </button>
          </div>
        </div>
      </section>

      {/* SECȚIUNI RAPIDE */}
      <div id="sectiuni" className="container">
        <div className="cards">
          {/* CĂRȚI */}
          <Link
            to={`/carti?lang=${lang}`}
            className="card"
            style={{
              background: "var(--card1)",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              {t.card_carti_t}
            </h3>
            <p style={{ margin: 0 }}>{t.card_carti_s}</p>
          </Link>

          {/* AUTORI */}
          <Link
            to={`/proiecte/autori?lang=${lang}`}
            className="card"
            style={{
              background: "var(--card2)",
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              {t.card_autori_t}
            </h3>
            <p style={{ margin: 0 }}>{t.card_autori_s}</p>
          </Link>

          {/* CĂLĂTORI */}
          <Link
            to={`/calatori?lang=${lang}`}
            className="card"
            style={{
              background: "var(--card3)",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              {t.card_calatori_t}
            </h3>
            <p style={{ margin: 0 }}>{t.card_calatori_s}</p>
          </Link>

          {/* GHIZI */}
          <Link
            to={`/ghizi?lang=${lang}`}
            className="card"
            style={{
              background: "var(--card5)",
              color: "#2C2430",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              {t.card_ghizi_t}
            </h3>
            <p style={{ margin: 0 }}>{t.card_ghizi_s}</p>
          </Link>
        </div>
      </div>

      {/* BANNER ROTATIV */}
      <Carousel slides={lang === "en" ? slidesEN : slidesRO} />
    </>
  );
}
