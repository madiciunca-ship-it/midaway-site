// src/pages/Servicii.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getSiteLanguage, setSiteLanguage } from "../utils/siteLanguage";

const DEFAULT_IMAGE = "/assets/services/default-service.jpg";

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

export default function Servicii() {
  const { add } = useCart();
  const [pages, setPages] = useState({});
  const [lang, setLang] = useState(() => getSiteLanguage(["services.lang"]));

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 900;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSiteLanguage(lang, ["services.lang"]);
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
        title: "Services",
        subtitle:
          "Choose the kind of support that fits your stage: editorial guidance, design, or publishing. Scheduling and delivery follow our Cancellation Policy.",
        body:
          "Every project is approached individually, with clarity, rhythm, and care. We help you shape your direction, refine your message, and move toward a final version that feels ready for publication — whether as an eBook, a paperback, or both. If you are unsure where to begin, editorial consulting is the best first step.",
        guideRo:
          "Pentru versiunea în limba română, poți schimba limba din selectorul RO / EN de mai jos.",
        guideEn:
          "For the Romanian version, you can switch the language using the RO / EN selector below.",
          cancellationPolicy: "Cancellation Policy",
          addToCart: "Add to cart",
          comingSoon: "Coming soon",
          cancelWindow: "Cancellation window",
          policy: "policy",
          estimatedTotal: "Estimated total",
          pages: "Pages",
          minPages: "min.",
          pageShort: "pp.",
          alertPages: "Please enter the number of pages (minimum",
          consultationOnly:
          "For the moment, editorial consulting is the only service open for booking. The other offers will be added soon.",
          consultationOnlyTitle: "Available now",
        }
      : {
          backHome: "← Înapoi la Acasă",
          backTop: "↑ Înapoi sus",
          title: "Servicii",
          subtitle:
            "Alege serviciul potrivit etapei tale: consultanță, design, publicare. Programarea și prestarea se fac conform Politicii de anulare.",
          body:
            "Lucrăm fiecare proiect individual, cu ritm și claritate. Te ajutăm să-ți definești direcția, să-ți rafinezi mesajul și să ajungi la o versiune finală demnă de publicare (eBook și/sau paperback). Dacă nu ești sigur(ă) de unde să începi, alege consultanța editorială — e cel mai bun prim pas.",
          guideRo:
            "Pentru versiunea în limba engleză, poți schimba limba din selectorul RO / EN de mai sus.",
          guideEn:
            "For the English version, you can switch the language using the RO / EN selector above.",
          cancellationPolicy: "Politicii de anulare",
          addToCart: "Adaugă în coș",
          comingSoon: "în curând",
          cancelWindow: "Fereastră anulare",
          policy: "politica",
          estimatedTotal: "Total estimat",
          pages: "Pagini",
          minPages: "min.",
          pageShort: "pag.",
          alertPages: "Te rog introdu numărul de pagini (minim",
          consultationOnly:
            "Deocamdată, singurul serviciu disponibil pentru programare este consultanța editorială. Restul serviciilor vor fi anunțate în curând.",
          consultationOnlyTitle: "Disponibil acum",
        };

  const services = useMemo(() => {
    if (lang === "en") {
      return [
        {
          id: "consultanta-editoriala-60",
          title: "Editorial consulting (60 min)",
          subtitle:
          "1:1 session focused on structure, narrative flow, readership, and publishing direction.",
          bullets: [
            "a one-to-one session via Zoom or Google Meet",
            "feedback on your synopsis, structure, or current direction",
            "clear recommendations for your next editorial steps",
          ],
          pricing: "fixed",
          price: 50,
          currency: "EUR",
          delivery: "60 min",
          cancelWindow: "24h",
          available: true,
          image: "/assets/services/consultanta.png",
        },
        {
          id: "design-coperta",
          title: "Cover design",
          subtitle: "Concept + final layout for eBook & Paperback.",
          bullets:
            [
              "four initial cover concepts",
              "two rounds of revisions",
              "final files prepared for eBook and print",
            ],
          pricing: "fixed",
          price: 180,
          currency: "EUR",
          delivery: "delivery 5–10 days",
          cancelWindow: "48h",
          available: false,
          image: "/assets/services/design.png",
        },
        {
          id: "publicare-distributie-kdp",
          title: "Publishing & distribution (KDP)",
          subtitle:
          "Account setup, formatting, upload, and optimisation for your Amazon listing.",
          bullets: [
            "formatting for eBook and paperback",
            "optimisation of description and categories",
            "KDP upload and final checks",
          ],
          pricing: "fixed",
          price: 360,
          currency: "EUR",
          delivery: "delivery 7–14 days",
          cancelWindow: "48h",
          available: false,
          image: "/assets/services/kdp.png",
        },
        {
          id: "editare-completa-en",
          title: "Full editing (EN) – per page",
          subtitle:
          "From structure to style: developmental editing, line refinement, and narrative clarity.",
          bullets: [
            "structural analysis and overall coherence",
            "alignment of voice and intended readership",
            "style, clarity, and flow improvements",
            "final revision before publication",
          ],
          pricing: "perPage",
          unitPrice: 2,
          currency: "EUR",
          minPages: 40,
          delivery: "delivery 14–21 days (depending on volume)",
          cancelWindow: "72h",
          available: false,
          image: "/assets/services/editare.png",
        },
        {
          id: "corectura-ortografie-punctuatie-en",
          title: "Proofreading (EN) – per page",
          subtitle:
          "Proofreading for spelling, punctuation, consistency, and final textual polish.",
          bullets: [
            "spelling and language correction",
            "punctuation review",
            "consistency, formatting, and diacritics",
          ],
          pricing: "perPage",
          unitPrice: 2,
          currency: "EUR",
          minPages: 40,
          delivery: "delivery 7–14 days",
          cancelWindow: "72h",
          available: false,
          image: "/assets/services/corectura.png",
        },
        {
          id: "traducere-literara-en-ro",
          title: "Literary translation (EN → RO) – per page",
          subtitle:
          "A literary rendering into Romanian, shaped with care for voice, cadence, and meaning.",
          bullets:[
            "translation with cultural and stylistic adaptation",
            "revision across both English and Romanian",
            "consultation on tone, voice, and nuance",
            "preparation for publication in Romanian",
          ],
          pricing: "perPage",
          unitPrice: 0,
          currency: "EUR",
          minPages: 40,
          delivery: "delivery 21–30 days",
          cancelWindow: "72h",
          available: false,
          image: "/assets/services/traducere.png",
        },
        {
          id: "listare-vanzare-midaway",
          title: "Listing & selling on midaway.ro",
          subtitle:
          "We host your books or eBooks on midaway.ro, with direct sales, author presence, promotion, and ongoing support.",
          bullets: [
            "author page on the site and product listings",
            "PDF and EPUB setup, including delivery files",
            "support with ISBN and metadata procedure*",
            "promotion through Blog, Social Media, or Projects when relevant",
            "monthly maintenance and operational support, according to contract",
          ],
          note:
          "*ISBNs are legally obtained through the National Library; we provide guidance throughout the process.",
          pricing: "fixed",
          price: 0,
          currency: "EUR",
          delivery: "activation 3–5 days",
          cancelWindow: "48h",
          available: false,
          image: "/assets/services/listare.png",
        },
        {
          id: "pachet-manuscris-amazon",
          title: "Package: From manuscript to Amazon",
          subtitle:
          "An integrated publishing path that brings your manuscript from working draft to a finished Amazon-ready edition.",
          bullets: [    
          "editing tailored to the needs of your manuscript",
          "cover design for eBook and paperback",
          "KDP setup, upload, and publication support",
          "a concise English description for your Amazon listing",
          ],
          pricing: "fixed",
          price: 0,
          currency: "EUR",
          delivery: "integrated timelines",
          cancelWindow: "72h",
          available: false,
          image: "/assets/services/pachet.png",
        },
        {
          id: "mentorat-debutant-1luna",
          title: "Debut author mentorship (30 days)",
          subtitle:
          "A one-to-one mentorship programme for emerging authors who need structure, encouragement, and a clear publishing path.",
          bullets: [
            "four video sessions of 60–90 minutes each",
            "feedback and practical guidance between sessions",
            "a realistic plan for writing and publication",
            "priority email support throughout the programme",
          ],
          pricing: "fixed",
          price: 0,
          currency: "EUR",
          delivery: "4 weeks",
          cancelWindow: "72h",
          available: false,
          image: "/assets/services/mentorat.png",
        },
      ];
    }

    return [
      {
        id: "consultanta-editoriala-60",
        title: "Consultanță editorială (60 min)",
        subtitle:
          "Sesiune 1:1 – structură, flow, public-țintă, strategie publicare.",
        bullets: [
          "call pe Zoom/Google Meet",
          "feedback pe sinopsis / structură",
          "recomandări concrete pentru următorii pași",
        ],
        pricing: "fixed",
        price: 250,
        currency: "RON",
        delivery: "60 min",
        cancelWindow: "24h",
        available: true,
        image: "/assets/services/consultanta.png",
      },
      {
        id: "design-coperta",
        title: "Design copertă",
        subtitle: "Concept + machetă finală pentru eBook & Paperback.",
        bullets: [
          "4 concepte inițiale",
          "2 runde de revizii",
          "fișiere finale pentru eBook & print",
        ],
        pricing: "fixed",
        price: 900,
        currency: "RON",
        delivery: "livrare 5–10 zile",
        cancelWindow: "48h",
        available: false,
        image: "/assets/services/design.png",
      },
      {
        id: "publicare-distributie-kdp",
        title: "Publicare & distribuție (KDP)",
        subtitle:
          "Setare cont, formatare, încărcare, optimizare pagină Amazon.",
        bullets: [
          "formatare eBook/paperback",
          "optimizare descriere & categorii",
          "încărcare în KDP + verificări",
        ],
        pricing: "fixed",
        price: 1800,
        currency: "RON",
        delivery: "livrare 7–14 zile",
        cancelWindow: "48h",
        available: false,
        image: "/assets/services/kdp.png",
      },
      {
        id: "editare-completa-ro",
        title: "Editare completă (RO) – per pagină",
        subtitle:
          "De la structură la stil: dezvoltare + copyedit + claritate narativă.",
        bullets: [
          "analiză structurală & coerență",
          "armonizare voce & public-țintă",
          "corecturi de stil și claritate",
          "revizie finală înainte de publicare",
        ],
        pricing: "perPage",
        unitPrice: 10,
        currency: "RON",
        minPages: 40,
        delivery: "livrare 14–21 zile (în funcție de volum)",
        cancelWindow: "72h",
        available: false,
        image: "/assets/services/editare.png",
      },
      {
        id: "corectura-ortografie-punctuatie-ro",
        title: "Corectură (RO) – per pagină",
        subtitle:
          "Ortografie, punctuație, micro-stilizare, consistență diacritice.",
        bullets: [
          "corectură ortografică",
          "punctuație",
          "consistență & diacritice",
        ],
        pricing: "perPage",
        unitPrice: 10,
        currency: "RON",
        minPages: 40,
        delivery: "livrare 7–14 zile",
        cancelWindow: "72h",
        available: false,
        image: "/assets/services/corectura.png",
      },
      {
        id: "traducere-literara-ro-en",
        title: "Traducere literară (RO → EN) – per pagină",
        subtitle:
          "Transpunere expresivă în engleză + revizie stilistică bilingvă.",
        bullets: [
          "traducere + adaptare culturală",
          "revizie stilistică (RO & EN)",
          "consultare autor pentru ton & nuanță",
          "pregătire pentru publicare internațională",
        ],
        pricing: "perPage",
        unitPrice: 0,
        currency: "RON",
        minPages: 40,
        delivery: "livrare 21–30 zile",
        cancelWindow: "72h",
        available: false,
        image: "/assets/services/traducere.png",
      },
      {
        id: "listare-vanzare-midaway",
        title: "Listare & vânzare pe midaway.ro",
        subtitle:
          "Îți găzduim eBook-urile/cărțile, vânzare directă, pagină Autor, promo & suport.",
        bullets: [
          "pagină Autor pe site + carduri produse",
          "configurare PDF, EPUB / descărcare PDF, EPUB",
          "asistență obținere ISBN / metadate*",
          "promovare în secțiunea Blog / Social media / Proiecte (după caz)",
          "abonament lunar mentenanță / operațional — conform contract",
        ],
        note:
          "*ISBN se obține legal prin Biblioteca Națională; îți oferim suportul procedural.",
        pricing: "fixed",
        price: 0,
        currency: "RON",
        delivery: "activare 3–5 zile",
        cancelWindow: "48h",
        available: false,
        image: "/assets/services/listare.png",
      },
      {
        id: "pachet-manuscris-amazon",
        title: "Pachet: De la manuscris la Amazon",
        subtitle:
          "Editare + design copertă + publicare KDP + descriere EN pentru pagina Amazon.",
        bullets: [
          "editare carte (nivel negociat)",
          "design copertă (eBook & paperback)",
          "încărcare & setare KDP",
          "descriere scurtă în engleză",
        ],
        pricing: "fixed",
        price: 0,
        currency: "RON",
        delivery: "termene integrate",
        cancelWindow: "72h",
        available: false,
        image: "/assets/services/pachet.png",
      },
      {
        id: "mentorat-debutant-1luna",
        title: "Mentorat autor debutant (30 zile)",
        subtitle:
          "Ghidare 1:1 – 4 sesiuni (strategie, structură, scriere, publicare).",
        bullets: [
          "4 întâlniri video (60–90 min)",
          "teme & feedback între sesiuni",
          "plan de publicare realist",
          "acces prioritar pe email în perioada programului",
        ],
        pricing: "fixed",
        price: 0,
        currency: "RON",
        delivery: "4 săptămâni",
        cancelWindow: "72h",
        available: false,
        image: "/assets/services/mentorat.png",
      },
    ];
  }, [lang]);

  const setPagesFor = (id, val) =>
    setPages((prev) => ({ ...prev, [id]: Math.max(0, Number(val) || 0) }));

  const addService = (svc) => {
    let price = svc.price || 0;
    let qty = 1;
    let meta = {};

    if (svc.pricing === "perPage") {
      const pg = Math.max(svc.minPages || 0, Number(pages[svc.id]) || 0);

      if (!pg) {
        alert(`${ui.alertPages} ${svc.minPages || 1}).`);
        return;
      }

      price = svc.unitPrice;
      qty = pg;
      meta = { pages: pg, unitPrice: svc.unitPrice };
    }

    add({
      id: `svc-${svc.id}-${lang}`,
      title: svc.title,
      format: "SERVICE",
      lang: lang.toUpperCase(),
      price,
      currency: svc.currency || "RON",
      qty,
      image: svc.image || DEFAULT_IMAGE,
      fulfillment: "service",
      meta,
    });
  };

  return (
    <div
      className="container"
      style={{
        padding: isMobile ? "20px 0 40px" : "32px 0 48px",
        maxWidth: 1200,
      }}
    >
      <div style={{ marginTop: -8, marginBottom: 18 }}>
        <Link to="/" style={sectionNavStyle}>
          {ui.backHome}
        </Link>
      </div>

      <header
        className="font-cormorant"
        style={{
          marginBottom: 24,
          textAlign: "center",
        }}
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
  {lang === "ro" ? (
    <>
      Alege serviciul potrivit etapei tale: consultanță, design, publicare.
      Programarea și prestarea se fac conform{" "}
      <Link to="/politica-anulare" style={{ color: "var(--secondary)" }}>
        {ui.cancellationPolicy}
      </Link>.
    </>
  ) : (
    <>
      Choose the kind of support that fits your stage: editorial guidance, design, or publishing.
      Scheduling and delivery follow our{" "}
      <Link to="/politica-anulare" style={{ color: "var(--secondary)" }}>
        {ui.cancellationPolicy}
      </Link>.
    </>
  )}
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
            aria-label="Services language switch"
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

        <p
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            color: "#222",
            lineHeight: 1.8,
            fontSize: isMobile ? 17 : 18,
          }}
        >
          {ui.body}
        </p>

        <div
          style={{
            height: 2,
            background: "#d5b56f",
            opacity: 0.6,
            marginTop: 18,
          }}
        />
      </header>

      <div
        style={{
          marginTop: 18,
          marginBottom: 20,
          background: "#fffef9",
          border: "1px solid #ece7df",
          borderRadius: 18,
          padding: isMobile ? 16 : 18,
          boxShadow: "0 8px 22px rgba(0,0,0,.05)",
        }}
      >
        <div
          className="font-cormorant"
          style={{
            fontSize: isMobile ? 24 : 28,
            marginBottom: 8,
            color: "#2b2b2b",
          }}
        >
          {ui.consultationOnlyTitle}
        </div>
        <p style={{ margin: 0, color: "#555", lineHeight: 1.7 }}>
          {ui.consultationOnly}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 16,
        }}
      >
        {services.map((svc) => {
          const isPerPage = svc.pricing === "perPage";
          const pg = Math.max(Number(pages[svc.id]) || 0, 0);
          const effectivePages = isPerPage ? Math.max(pg, svc.minPages || 0) : 1;
          const estTotal = isPerPage
            ? (svc.unitPrice || 0) * (pg > 0 ? effectivePages : 0)
            : svc.price || 0;

          return (
            <div
              key={svc.id}
              style={{
                border: "1px solid #ece7df",
                borderRadius: 18,
                padding: isMobile ? 18 : 24,
                background: "#fffef9",
                boxShadow: "0 8px 22px rgba(0,0,0,.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <h3
                  className="font-cormorant"
                  style={{
                    margin: 0,
                    fontSize: isMobile ? 24 : 26,
                    lineHeight: 1.2,
                    flex: 1,
                  }}
                >
                  {svc.title}
                </h3>

                {!svc.available && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "#eee",
                      color: "#555",
                      borderRadius: 999,
                      padding: "4px 10px",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ui.comingSoon}
                  </span>
                )}
              </div>

              <p style={{ margin: "6px 0 10px 0", color: "#444", lineHeight: 1.6 }}>
                {svc.subtitle}
              </p>

              <div style={{ color: "#0f5132", fontWeight: 700, marginBottom: 8 }}>
                {isPerPage ? (
                  <>
                    {svc.unitPrice} {svc.currency || "RON"}/{ui.pageShort}{" "}
                    {svc.minPages ? `• ${ui.minPages} ${svc.minPages} ${ui.pageShort}` : null}
                    {pg > 0 && (
                      <div
                        style={{
                          color: "#0b5e3b",
                          fontWeight: 600,
                          marginTop: 4,
                        }}
                      >
                        {ui.estimatedTotal}: {estTotal} {svc.currency || "RON"}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {svc.price} {svc.currency || "RON"} • {svc.delivery}
                  </>
                )}
              </div>

              <ul style={{ margin: "8px 0 12px 18px", lineHeight: 1.7 }}>
                {svc.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {svc.id === "consultanta-editoriala-60" && (
  <p
    style={{
      margin: "4px 0 14px",
      color: "#5b5b5b",
      lineHeight: 1.7,
      fontSize: 14,
      fontStyle: "italic",
    }}
  >
    {lang === "en"
      ? "After this session, it becomes much easier to decide whether you need editing, cover design, or publishing support next."
      : "După această sesiune, îți va fi mult mai ușor să decizi dacă ai nevoie mai departe de editare, design de copertă sau sprijin pentru publicare."}
  </p>
)}

              {svc.note && (
                <div style={{ fontSize: 12, color: "#666", margin: "6px 0 10px" }}>
                  {svc.note}
                </div>
              )}

              {isPerPage && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <label
                    htmlFor={`pages-${svc.id}`}
                    style={{ fontSize: 13, color: "#333" }}
                  >
                    {ui.pages}:
                  </label>
                  <input
                    id={`pages-${svc.id}`}
                    type="number"
                    min={0}
                    placeholder={String(svc.minPages || 0)}
                    value={pages[svc.id] || ""}
                    onChange={(e) => setPagesFor(svc.id, e.target.value)}
                    style={{
                      width: 110,
                      padding: "8px 10px",
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  />
                </div>
              )}

              {svc.available ? (
                <button
                  onClick={() => addService(svc)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    border: "1px solid #0f766e",
                    background: "#2a9d8f",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  {ui.addToCart}
                </button>
              ) : (
                <button
                  disabled
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    border: "1px solid #ddd",
                    background: "#eee",
                    color: "#777",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {ui.comingSoon}
                </button>
              )}

              <div
                style={{
                  marginTop: 10,
                  color: "#5c4b00",
                  fontSize: 12,
                  borderTop: "1px dashed #e6c200",
                  paddingTop: 8,
                  lineHeight: 1.6,
                }}
              >
                {ui.cancelWindow}: {svc.cancelWindow} •{" "}
                <Link to="/politica-anulare" style={{ color: "var(--accent)" }}>
                  {ui.policy}
                </Link>{" "}
                • {svc.delivery}
              </div>
            </div>
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