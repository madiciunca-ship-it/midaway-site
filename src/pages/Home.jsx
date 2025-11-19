import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ——— Butoane segmentate RO/EN ——— */
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
      "Midaway este o editură independentă născută din drumuri, întâlniri și povești reale. Publicăm literatură de călătorie, jurnale și eseuri – și explorăm, în același timp, portrete de autori, călători, ghizi și localnici care ne inspiră să vedem lumea cu alți ochi. Un spațiu unde poveștile devin conexiuni și inspirație.",
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
      "Midaway is an independent publishing house born from journeys, encounters, and real stories. We publish travel literature, journals, and essays – and we also exploring portraits of authors, travelers, guides, and locals who inspire us to see the world differently. A space where stories become connection and inspiration.",
    viziune_btn: "MIDAWAY VISION",
    card_carti_t: "Books",
    card_carti_s: "Inspiration, challenge, bold dreams.",
    card_autori_t: "Authors",
    card_autori_s: "Independent voices writing the world.",
    card_calatori_t: "Travelers",
    card_calatori_s: "Stories from the road, interviews, and visual journeys.",
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
  }, [slides?.length]);
  if (!slides?.length) return null;

  return (
    <div className="container">
      <div className="carousel">
        {slides.map((s, idx) => (
          <img key={idx} src={s.src} alt={s.alt} style={{ opacity: i === idx ? 1 : 0 }} />
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
  const list = [...(items || [])]
    .filter((r) => r && r.published !== false)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getInitials = (name = "") => {
    const parts = String(name).trim().split(/\s+/);
    const first = parts[0] ? parts[0][0] : "";
    const last =
      parts.length > 1 && parts[parts.length - 1] ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  return (
    <section className="container" style={{ marginTop: 24, marginBottom: 32 }}>
      <h2 className="font-cormorant" style={{ textAlign: "center", fontSize: 28, margin: "0 0 16px" }}>
        {title}
      </h2>

      <div className="reviews-stack" style={{ maxWidth: 780, margin: "0 auto" }}>
        {list.map((r, idx) => {
          const text = lang === "en" && r.text_en ? r.text_en : r.text_ro || r.text_en || "";
          const stars = "★".repeat(r.rating || 0) + "☆".repeat(5 - (r.rating || 0));
          const hasBook = r.book && r.book.title;

          const BookPill = hasBook ? (
            r.book.id ? (
              <Link
                to={`/carti/${r.book.id}`}
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
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{r.book.title}</span>
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
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{r.book.title}</span>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
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
                    ) : (
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

                  {BookPill}
                </div>

                <blockquote
                  style={{
                    margin: 0,
                    color: "#2b2b2b",
                    fontSize: 18,
                    lineHeight: 1.7,
                    paddingLeft: 14,
                    borderLeft: "3px solid rgba(136, 98, 70, 0.24)",
                  }}
                >
                  “{text}”
                </blockquote>
              </figure>

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
  // 1) citim o singură dată ?lang din URL (dacă există), altfel din localStorage, altfel "ro"
  const initialFromQuery =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("lang")
      : null;
  const initialLang =
    initialFromQuery === "en"
      ? "en"
      : (typeof window !== "undefined" && localStorage.getItem("home.lang")) || "ro";

  const [lang, setLang] = useState(initialLang);

  // 2) persistă alegerea + curăță URL-ul de ?lang pe homepage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("home.lang", lang);
      if (window.location.search.includes("lang=")) {
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, [lang]);

  const t = i18nHome[lang];

  // Carousel – pozele tale din /public/hero/
  const slidesRO = [
    { src: "/hero/side1.webp", alt: "Apus de soare peste ocean",
      caption: "Liniștea de la capătul lumii — începutul unei noi povești." },
    { src: "/hero/side2.webp", alt: "Insulă tropicală în mijlocul oceanului",
      caption: "Uneori, lumea întreagă încape într-o insulă de liniște." },
    { src: "/hero/side3.webp", alt: "Barcă pe plajă, printre frunze de coastă",
      caption: "Drumul continuă — cu fiecare pagină, cu fiecare val." },
  ];
  const slidesEN = [
    { src: "/hero/side1.webp", alt: "Sunset over the ocean",
      caption: "The stillness at the end of the world — the beginning of a new story." },
    { src: "/hero/side2.webp", alt: "Tropical island in the ocean",
      caption: "Sometimes, the whole world fits on a quiet island." },
    { src: "/hero/side3.webp", alt: "Boat on a beach under coastal leaves",
      caption: "The road goes on — with every page, with every wave." },
  ];

  // Reviews demo
  const REVIEWS = [
      { id: "carmen-maghiari", name: "Carmen Maghiari", rating: 5,
      text_ro: "Curajul tău are o doză de nebunie în el... dar cred că deja știi asta. 😄 Sper să-ți citească toate fetele cartea. Merită din plin! Mai am vreo 40 de pagini și trebuie să-ți spun ceva: motociclistul acela... eu eram convinsă că ți-a pus gând rău! Numai tu puteai să te gândești că te păzește. Ești incredibil de pozitivă – și trebuie să fur asta de la tine! Se spune că, dacă gândești pozitiv, atragi pozitiv. De ceva vreme încerc și eu... și chiar începe să funcționeze. Dar tu ești deja la extrem! 🌞",
      text_en: "Your kind of courage definitely has a dose of madness in it... but I think you already know that. 😄 I hope every girl gets to read your book – it’s totally worth it! I still have about 40 pages left, but I have to say this: that biker... I was sure he had bad intentions! Only you could think he was actually protecting you. You’re unbelievably positive – and I need to steal that from you! They say that if you think positively, you attract positive things. I’ve been trying it myself lately... and it’s actually working. But you, you’ve taken it to the next level! 🌞",
      createdAt: "2025-11-12T12:00:00Z",
      avatar: "/avatars/carmen.webp",
      book: { id: "o-zi-ro", title: "O zi de care să-ți amintești", cover: "" },
      published: true },
    { id: "ioana-margineanu", name: "Ioana Mărgineanu", rating: 5,
      text_ro: "Poți să spui la prezentare că, cel puțin pe mine, m-ai convins că merită să călătorești. Dacă nu începeam să-ți citesc cartea, probabil nu plecam nicăieri. Mi-ai dat curaj. Și cred că, dacă reușești în viață să schimbi în bine viața unui singur om, înseamnă că nu ai fost degeaba pe pământ. Nimic nu e întâmplător. Port cartea ta cu mine în rucsac – la propriu și la figurat. Când o să fiu mare, vreau să fiu și eu ca tine. ❤️",
      text_en: "You can say at your book launch that you’ve convinced at least one person that it’s worth traveling. If I hadn’t started reading your book, I probably wouldn’t have gone anywhere. You gave me courage. I truly believe that if you manage to change even one person’s life for the better, it means you haven’t lived in vain. Nothing happens by chance. I carry your book with me in my backpack – both literally and in my heart. When I grow up, I want to be like you. ❤️",
      createdAt: "2025-11-12T10:00:00Z",
      avatar: "/avatars/ioana.webp",
      book: { id: "vietnam-ro", title: "Zile și nopți de Vietnam" },
      published: true },
    { id: "mihaela-virlici", name: "Mihaela Virlici", rating: 5,
      text_ro: "Am terminat de citit cartea și sunt absolut încântată! 🎉 A fost o experiență minunată – am trăit fiecare moment alături de tine, cu emoție și curiozitate. Mi-a plăcut atât de mult încât uneori evitam să mai citesc, doar ca să nu se termine prea repede. Povestea ta a rămas cu mine și o port în suflet. Abia aștept să-ți citesc următoarele cărți. Mulțumesc pentru această călătorie literară de neuitat! ♥️🙏",
      text_en: "I’ve just finished reading your book – and it was absolutely wonderful! I felt like I was right there with you through every moment. I loved it so much that I sometimes avoided reading, just to make it last a little longer. 🫣 Your story will stay with me for a long time, and I can’t wait to read your next books. Thank you for this beautiful experience! ♥️🙏",
      createdAt: "2025-11-12T09:00:00Z",
      avatar: "/avatars/mihaela.webp",
      book: { id: "vietnam-ro", title: "Zile și nopți de Vietnam" },
      published: true },
    // drafts (nu apar până nu pui published: true)
    { id: "draft-1", name: "Andrei V.", rating: 5,
      text_ro: "O carte care te prinde de la prima pagină.",
      text_en: "A book that grabs you from the very first page.",
      createdAt: "2025-02-12T12:00:00Z",
      published: false },
    { id: "draft-2", name: "Mara T.", rating: 4,
      text_ro: "Scriitură curată, sinceră. Mi-a rămas în minte.",
      text_en: "Clean, honest writing. It stayed with me.",
      createdAt: "2025-02-11T12:00:00Z",
      published: false },
    { id: "draft-3", name: "Radu P.", rating: 5,
      text_ro: "Mi-a dat curaj să-mi planific propria călătorie.",
      text_en: "It gave me courage to plan my own journey.",
      createdAt: "2025-02-10T12:00:00Z",
      published: false },
  ];

  return (
    <>
           {/* HERO */} 
{/* HERO */} 
<section className="hero hero--compact">
  <div className="font-cormorant" style={{ textAlign: "center" }}>
    <h1 style={{ fontSize: 64, letterSpacing: ".02em", margin: 0 }}>{t.hero_title}</h1>
    <p style={{ color: "var(--secondary)", fontStyle: "italic", marginTop: 8 }}>
      {`„${t.hero_tagline}”`}
    </p>
    <p style={{ color: "var(--secondary)", marginTop: 6, fontSize: 16 }}>
      {t.hero_meta}
    </p>
    <p style={{ maxWidth: 720, margin: "24px auto 0", fontSize: 22, lineHeight: 1.6 }}>
      {t.hero_sub}
    </p>

    <div style={{ marginTop: 24 }}>
      <Link className="btn" to="/proiecte">
        {t.viziune_btn}
      </Link>
    </div>
     {/* SWITCH RO/EN SUB VIZIUNE – EXACT CA ÎNAINTE */}
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
          <Link to="/carti" className="card"
            style={{ background: "var(--card1)", color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              {i18nHome[lang].card_carti_t}
            </h3>
            <p style={{ margin: 0 }}>{i18nHome[lang].card_carti_s}</p>
          </Link>

          <Link to="/proiecte/autori" className="card"
            style={{ background: "var(--card2)", color: "#fff", textDecoration: "none", cursor: "pointer" }}>
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              {i18nHome[lang].card_autori_t}
            </h3>
            <p style={{ margin: 0 }}>{i18nHome[lang].card_autori_s}</p>
          </Link>

          <Link to="/calatori" className="card"
            style={{ background: "var(--card3)", color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              {i18nHome[lang].card_calatori_t}
            </h3>
            <p style={{ margin: 0 }}>{i18nHome[lang].card_calatori_s}</p>
          </Link>

          <Link to="/ghizi" className="card"
            style={{ background: "var(--card5)", color: "#2C2430", textDecoration: "none", cursor: "pointer" }}>
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
