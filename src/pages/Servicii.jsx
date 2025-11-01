// src/pages/Servicii.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

/**
 * Tipuri de tarifare:
 *  - fixed     → preț fix (ex. consultanță 60 min)
 *  - perPage   → preț per pagină (editare, corectură, traducere)
 *
 * Pentru perPage folosim unitPrice + selector de pagini.
 * În coș trimitem price = unitPrice, qty = pages (total = price * qty).
 */

const SERVICES = [
  // -- SERVICII EXISTENTE -------------------------------------------------
  {
    id: "consultanta-editoriala-60",
    title: "Consultanță editorială (60 min)",
    subtitle: "Sesiune 1:1 – structură, flow, public-țintă, strategie publicare.",
    bullets: [
      "call pe Zoom/Google Meet",
      "feedback pe sinopsis / structură",
      "recomandări concrete următorii pași",
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
    bullets: ["2 concepte inițiale", "2 runde revizii", "fișiere finale pentru eBook & print"],
    pricing: "fixed",
    price: 900,
    currency: "RON",
    delivery: "livrare 5–10 zile",
    cancelWindow: "48h",
    available: true,
    image: "/assets/services/design.png",
  },
  {
    id: "publicare-distributie-kdp",
    title: "Publicare & distribuție (KDP)",
    subtitle: "Setare cont, formatare, încărcare, optimizare pagină Amazon.",
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
    available: false, // în curând
    image: "/assets/services/kdp.png",
  },

  // -- NOI: PER PAGINĂ ----------------------------------------------------
  {
    id: "editare-completa-ro",
    title: "Editare completă (RO) – per pagină",
    subtitle: "De la structură la stil: dezvoltare + copyedit + claritate narativă.",
    bullets: [
      "analiză structurală & coerență",
      "armonizare voce & public-țintă",
      "corecturi de stil și claritate",
      "revizie finală înainte de publicare",
    ],
    pricing: "perPage",
    unitPrice: 8, // RON / pagină
    currency: "RON",
    minPages: 40,
    delivery: "livrare 14–21 zile (în funcție de volum)",
    cancelWindow: "72h",
    available: true,
    image: "/assets/services/editare.png",
  },
  {
    id: "corectura-ortografie-punctuatie-ro",
    title: "Corectură (RO) – per pagină",
    subtitle: "Ortografie, punctuație, micro-stilizare, consistență diacritice.",
    bullets: ["corectură ortografică", "punctuație", "consistență & diacritice"],
    pricing: "perPage",
    unitPrice: 10, // RON / pagină
    currency: "RON",
    minPages: 40,
    delivery: "livrare 7–14 zile",
    cancelWindow: "72h",
    available: true,
    image: "/assets/services/corectura.png",
  },
  {
    id: "traducere-literara-ro-en",
    title: "Traducere literară (RO → EN) – per pagină",
    subtitle: "Transpunere expresivă în engleză + revizie stilistică bilingvă.",
    bullets: [
      "traducere + adaptare culturală",
      "revizie stilistică (RO & EN)",
      "consultare autor pentru ton & nuanță",
      "pregătire pentru publicare internațională",
    ],
    pricing: "perPage",
    unitPrice: 35, // RON / pagină (poți ajusta ulterior)
    currency: "RON",
    minPages: 40,
    delivery: "livrare 21–30 zile",
    cancelWindow: "72h",
    available: true,
    image: "/assets/services/traducere.png",
  },

  // -- NOU: AUTORI pe MIDAWAY.RO -----------------------------------------
  {
    id: "listare-vanzare-midaway",
    title: "Listare & vânzare pe midaway.ro",
    subtitle:
      "Îți găzduim eBook-urile/cărțile, vânzare directă, pagină Autor, promo & suport.",
    bullets: [
      "pagină Autor pe site + carduri produse",
      "configurare link de plată / descărcare eBook",
      "asistență obținere ISBN / metadate*",
      "promovare în secțiunea Blog/Proiecte (după caz)",
    ],
    note: "*ISBN se obține legal prin Biblioteca Națională; îți oferim suportul procedural.",
    pricing: "fixed",
    price: 500, // taxă set-up (exemplu)
    currency: "RON",
    delivery: "activare 3–5 zile",
    cancelWindow: "48h",
    available: true,
    image: "/assets/services/listare.png",
  },

  // -- PACHETE „ÎN CURÂND” -----------------------------------------------
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
    subtitle: "Ghidare 1:1 – 4 sesiuni (strategie, structură, scriere, publicare).",
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

  // ── MODEL INVIZIBIL (copie → editează → setează available:true)
  // {
  //   id: "model-nou-serviciu",
  //   title: "Titlu serviciu",
  //   subtitle: "Scurtă descriere / ce primește clientul",
  //   bullets: ["beneficiu #1", "beneficiu #2"],
  //   pricing: "fixed" | "perPage",
  //   price: 0,
  //   unitPrice: 0,
  //   currency: "RON",
  //   minPages: 40,
  //   delivery: "livrare X–Y zile",
  //   cancelWindow: "24h",
  //   available: false,
  //   image: "/assets/services/default.png",
  // },
];

export default function Servicii() {
  const { add } = useCart();
  // pagini per serviciu (pt. pricing=perPage)
  const [pages, setPages] = useState({}); // { [id]: number }

  const setPagesFor = (id, val) =>
    setPages((p) => ({ ...p, [id]: Math.max(0, Number(val) || 0) }));

  const addService = (svc) => {
    // calculează parametri de preț
    let price = svc.price || 0;
    let qty = 1;
    let meta = {};

    if (svc.pricing === "perPage") {
      const pg = Math.max(svc.minPages || 0, Number(pages[svc.id]) || 0);
      if (!pg) {
        alert(`Te rog introdu numărul de pagini (minim ${svc.minPages || 1}).`);
        return;
      }
      price = svc.unitPrice;
      qty = pg; // total = price * qty
      meta = { pages: pg, unitPrice: svc.unitPrice };
    }

    add({
      id: `svc-${svc.id}`,
      title: svc.title,
      format: "SERVICE",
      lang: "RO",
      price,
      currency: svc.currency || "RON",
      qty,
      image: svc.image || "/assets/services/service-card.png",
      fulfillment: "service",
      meta,
    });
  };

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 1100 }}>
      {/* HERO ca la „Autori” */}
      <header
        className="font-cormorant"
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        <h1 style={{ margin: 0, fontSize: 44 }}>Servicii</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8, fontSize: 18 }}>
          Alege serviciul potrivit etapei tale: consultanță, design, publicare.
          Programarea și prestarea se fac conform{" "}
          <Link to="/politica-anulare" style={{ color: "var(--secondary)" }}>
            Politicii de anulare
          </Link>.
        </p>
        <p
          style={{
            maxWidth: 1100,
            margin: "8px auto 0",
            color: "#222",
            lineHeight: 1.8,
            fontSize: 18,
          }}
        >
          Lucrăm fiecare proiect individual, cu ritm și claritate. Te ajutăm să-ți definești direcția,
          să-ți rafinezi mesajul și să ajungi la o versiune finală demnă de
          publicare (eBook și/sau paperback). Dacă nu ești sigur(ă) de unde să
          începi, alege <strong>consultanța editorială</strong> — e cel mai bun
          prim pas.
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

      {/* GRID servicii */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 16,
        }}
      >
        {SERVICES.map((svc) => {
          const isPerPage = svc.pricing === "perPage";
          const pg = Math.max(Number(pages[svc.id]) || 0, 0);
          const effectivePages = isPerPage
            ? Math.max(pg, svc.minPages || 0)
            : 1;
          const estTotal = isPerPage
            ? (svc.unitPrice || 0) * (pg > 0 ? effectivePages : 0)
            : svc.price || 0;

          return (
            <div
              key={svc.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 16,
                padding: 18,
                background: "#fff",
                boxShadow: "0 6px 16px rgba(0,0,0,.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <h3
                  className="font-cormorant"
                  style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}
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
                      padding: "2px 8px",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    în curând
                  </span>
                )}
              </div>

              <p style={{ margin: "6px 0 10px 0", color: "#444" }}>{svc.subtitle}</p>

              <div style={{ color: "#0f5132", fontWeight: 700, marginBottom: 8 }}>
                {isPerPage ? (
                  <>
                    {svc.unitPrice} {svc.currency || "RON"}/pag.{" "}
                    {svc.minPages ? `• min. ${svc.minPages} pag.` : null}
                    {pg > 0 && (
                      <div style={{ color: "#0b5e3b", fontWeight: 600, marginTop: 4 }}>
                        Total estimat: {estTotal} {svc.currency || "RON"}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {svc.price} {svc.currency || "RON"} • {svc.delivery}
                  </>
                )}
              </div>

              <ul style={{ margin: "8px 0 12px 18px", lineHeight: 1.6 }}>
                {svc.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              {svc.note && (
                <div style={{ fontSize: 12, color: "#666", margin: "6px 0 10px" }}>
                  {svc.note}
                </div>
              )}

              {isPerPage && (
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <label htmlFor={`pages-${svc.id}`} style={{ fontSize: 13, color: "#333" }}>
                    Pagini:
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
                    }}
                  />
                </div>
              )}

              {svc.available ? (
                <button
                  onClick={() => addService(svc)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 10,
                    border: "1px solid #0f766e",
                    background: "#2a9d8f",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Adaugă în coș
                </button>
              ) : (
                <button
                  disabled
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "#eee",
                    color: "#777",
                    fontWeight: 600,
                  }}
                >
                  în curând
                </button>
              )}

              <div
                style={{
                  marginTop: 10,
                  color: "#5c4b00",
                  fontSize: 12,
                  borderTop: "1px dashed #e6c200",
                  paddingTop: 8,
                }}
              >
                Fereastră anulare: {svc.cancelWindow} •{" "}
                <Link to="/politica-anulare" style={{ color: "var(--accent)" }}>
                  politica
                </Link>{" "}
                • {svc.delivery}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
