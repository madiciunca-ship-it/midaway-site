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
    reviews_heading: "Ce spun cititorii",
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
    reviews_heading: "What readers say",
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

/* === Reviews Section (bilingv, avatar + carte opționale) === */
function ReviewsSection({ lang = "ro", title = "" , items = [] }) {
  // ascundem draft-urile și ordonăm "ultimul primul"
  const list = [...(items || [])]
    .filter((r) => r && r.published !== false)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // inițiale (fără optional chaining)
  const getInitials = (name = "") => {
    const parts = String(name).trim().split(/\s+/);
    const first = parts[0] ? parts[0][0] : "";
    const last = parts.length > 1 && parts[parts.length - 1]
      ? parts[parts.length - 1][0]
      : "";
    return (first + last).toUpperCase();
  };

  return (
    <section className="container" style={{ marginTop: 24, marginBottom: 32 }}>
      <h2
        className="font-cormorant"
        style={{ textAlign: "center", fontSize: 28, margin: "0 0 16px" }}
      >
        {title}
      </h2>

      <div className="reviews-stack" style={{ maxWidth: 780, margin: "0 auto" }}>
        {list.map((r, idx) => {
          const text =
            lang === "en" && r.text_en ? r.text_en : r.text_ro || r.text_en || "";
          const stars =
            "★".repeat(r.rating || 0) + "☆".repeat(5 - (r.rating || 0));

          const hasBook = r.book && r.book.title;

          const BookPill = hasBook ? (
            r.book.id ? (
              <Link
                to={`/carti/${r.book.id}?lang=${lang}`}
                style={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  padding: "6px 10px",
                  background: "#F4E8E4", // tentă soft
                  color: "#3b2f2f",
                  fontSize: 12,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  maxWidth: 260,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={r.book.title}
              >
                {r.book.cover && (
                  <img
                    src={r.book.cover}
                    alt=""
                    width={20}
                    height={28}
                    style={{
                      width: 20,
                      height: 28,
                      objectFit: "cover",
                      borderRadius: 3,
                      boxShadow: "0 1px 4px rgba(0,0,0,.08)",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.book.title}
                </span>
              </Link>
            ) : (
              <div
                style={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  padding: "6px 10px",
                  background: "#F4E8E4",
                  color: "#3b2f2f",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  maxWidth: 260,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={r.book.title}
              >
                {r.book.cover && (
                  <img
                    src={r.book.cover}
                    alt=""
                    width={20}
                    height={28}
                    style={{
                      width: 20,
                      height: 28,
                      objectFit: "cover",
                      borderRadius: 3,
                      boxShadow: "0 1px 4px rgba(0,0,0,.08)",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.book.title}
                </span>
              </div>
            )
          ) : null;

          return (
            <div key={r.id}>
              <figure
                className="review-card"
                style={{
                  borderRadius: 18,
                  background: "rgba(255,255,255,.7)",
                  backdropFilter: "blur(4px)",
                  boxShadow: "0 8px 18px rgba(0,0,0,.06)",
                  padding: "16px 18px",
                  margin: 0,
                }}
              >
                {/* header: stânga (avatar+nume+stele) / dreapta (pastilă carte) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {/* stânga */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    {/* avatar: poză sau inițiale */}
                    {r.avatar ? (
                      <img
                        src={r.avatar}
                        alt={r.name}
                        width={44}
                        height={44}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          objectFit: "cover",
                          flexShrink: 0,
                          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
                        }}
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    ) : null}

                    {!r.avatar && (
                      <div
                        aria-hidden="true"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "linear-gradient(180deg,#f3f3f3,#e9e9e9)",
                          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          color: "#2b2b2b",
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(r.name)}
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <strong
                        style={{
                          color: "#2b2b2b",
                          fontSize: 14,
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {r.name}
                      </strong>
                      <span style={{ color: "var(--secondary)", fontSize: 13 }} aria-hidden="true">
                        {stars}
                      </span>
                    </div>
                  </div>

                  {/* dreapta */}
                  {BookPill}
                </div>

                {/* citatul */}
                <blockquote
                  style={{
                    margin: 0,
                    color: "#2b2b2b",
                    fontSize: 18,
                    lineHeight: 1.7,
                    paddingLeft: 14,
                    borderLeft: "3px solid rgba(136, 98, 70, 0.24)", // o tușă din accent
                  }}
                >
                  “{text}”
                </blockquote>
              </figure>

              {/* separator „cool” între review-uri */}
              {idx < list.length - 1 && (
                <div style={{ padding: "10px 8px 16px" }}>
                  <div
                    style={{
                      height: 2,
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
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

  // Reviews demo (poți înlocui ulterior cu ale tale; ordinea e sortată desc după createdAt)
  const REVIEWS = [
    // LIVE
    {
      id: "r3",
      name: "Ana M.",
      rating: 5,
      text_ro: "O inițiativă care m-a făcut să cred din nou în cărțile de drum.",
      text_en: "An initiative that made me believe in travel books again.",
      createdAt: "2025-02-03T12:00:00Z",
      avatar: "/avatars/ana.jpg",
      book: {
        id: "insula-viata",
        title: "Insula care îți schimbă viața",
        cover: "/covers/insula-viata-thumb.webp",
      },
      published: true,
    },
    {
      id: "r2",
      name: "Dan C.",
      rating: 5,
      text_ro: "Ton cald, curajos, autentic. M-am regăsit în fiecare pagină.",
      text_en: "Warm, brave, authentic tone. I found myself in every page.",
      createdAt: "2025-01-28T10:00:00Z",
      // dacă vrei pastilă, adaugă:
      // book: { id: "coasta-noptii", title: "Coasta Nopții" },
      published: true,
    },
    {
      id: "r1",
      name: "Iulia P.",
      rating: 4,
      text_ro: "Mi-a plăcut să călătoresc prin ochii autorilor Midaway.",
      text_en: "I loved traveling through Midaway authors’ eyes.",
      createdAt: "2025-01-20T09:00:00Z",
      avatar: "/avatars/iulia.webp",
      book: {
        id: "coasta-noptii",
        title: "Coasta Nopții",
        // cover: "/covers/coasta-noptii-thumb.webp",
      },
      published: true,
    },
  
    // DRAFTS (nu apar până nu pui published: true)
    {
      id: "draft-1",
      name: "Andrei V.",
      rating: 5,
      text_ro: "O carte care te prinde de la prima pagină.",
      text_en: "A book that grabs you from the very first page.",
      createdAt: "2025-02-12T12:00:00Z",
      // avatar: "/avatars/andrei.webp",
      // book: { id: "titlu-slug", title: "Titlul cărții", cover: "/covers/titlu-thumb.webp" },
      published: false,
    },
    {
      id: "draft-2",
      name: "Mara T.",
      rating: 4,
      text_ro: "Scriitură curată, sinceră. Mi-a rămas în minte.",
      text_en: "Clean, honest writing. It stayed with me.",
      createdAt: "2025-02-11T12:00:00Z",
      // avatar: "/avatars/mara.webp",
      // book: { title: "Carte fără link" }, // fără id → fără link, doar text
      published: false,
    },
    {
      id: "draft-3",
      name: "Radu P.",
      rating: 5,
      text_ro: "Mi-a dat curaj să-mi planific propria călătorie.",
      text_en: "It gave me courage to plan my own journey.",
      createdAt: "2025-02-10T12:00:00Z",
      // avatar: "/avatars/radu.webp",
      // book: { id: "insula-viata", title: "Insula care îți schimbă viața" },
      published: false,
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
            <button onClick={() => setLang("ro")} style={segBtn(lang === "ro")}>
              RO
            </button>
            <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>
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
              {i18nHome[lang].card_carti_t}
            </h3>
            <p style={{ margin: 0 }}>{i18nHome[lang].card_carti_s}</p>
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
              {i18nHome[lang].card_autori_t}
            </h3>
            <p style={{ margin: 0 }}>{i18nHome[lang].card_autori_s}</p>
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
              {i18nHome[lang].card_calatori_t}
            </h3>
            <p style={{ margin: 0 }}>{i18nHome[lang].card_calatori_s}</p>
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
              {i18nHome[lang].card_ghizi_t}
            </h3>
            <p style={{ margin: 0 }}>{i18nHome[lang].card_ghizi_s}</p>
          </Link>
        </div>
      </div>

      {/* BANNER ROTATIV */}
      <Carousel slides={lang === "en" ? slidesEN : slidesRO} />

      {/* REVIEWS */}
      <ReviewsSection
        lang={lang}
        title={i18nHome[lang].reviews_heading}
        items={REVIEWS}
      />
    </>
  );
}
