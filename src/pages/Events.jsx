import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSiteLanguage, setSiteLanguage } from "../utils/siteLanguage";

const backPillStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid var(--accent)",
  color: "var(--secondary)",
  textDecoration: "none",
  fontWeight: 500,
  background: "transparent",
};

const segBtnStyle = (active) => ({
  padding: "8px 14px",
  border: "none",
  background: active ? "var(--accent)" : "transparent",
  color: active ? "#fff" : "#444",
  cursor: "pointer",
  fontWeight: 700,
});

export default function Events() {
  const [lang, setLang] = useState(() => getSiteLanguage(["events.lang"]));

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 900;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSiteLanguage(lang, ["events.lang"]);
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

  // poți completa array-ul ăsta oricând
  const upcoming = [
    // Exemplu:
    // {
    //   id: "retreat-primavara",
    //   date: "10–12 mai 2026",
    //   dateEn: "10–12 May 2026",
    //   title: "Retreat de scris – Bali",
    //   titleEn: "Writing Retreat – Bali",
    //   status: "Înscrieri deschise",
    //   statusEn: "Open for registration",
    // },
  ];
  
  const ui =
    lang === "en"
      ? {
          backProject: "← Back to Events & Retreats",
          backTop: "↑ Back to top",
          title: "Events Calendar",
          subtitle: "Spaces for writing, breathing, and living encounters.",
          guideRo:
            "Pentru versiunea în limba română, poți schimba limba din selectorul RO / EN de mai sus.",
          guideEn:
            "For the Romanian version, you can switch the language using the RO / EN selector above.",
          empty1:
            "There are no publicly announced dates at the moment. We are preparing the next edition.",
          empty2a:
            "If you would like to be notified when registrations open again, write to us through the",
          contactPage: "contact page",
          empty2b: "or follow us on social media.",
        }
      : {
          backProject: "← Înapoi la Evenimente & Retreaturi",
          backTop: "↑ Înapoi sus",
          title: "Calendar evenimente",
          subtitle: "Spații pentru scris, respirație și întâlniri vii.",
          guideRo:
            "Pentru versiunea în limba engleză, poți schimba limba din selectorul RO / EN de mai sus.",
          guideEn:
            "For the English version, you can switch the language using the RO / EN selector above.",
          empty1:
            "Momentan nu avem date anunțate public. Lucrăm la următoarea ediție.",
          empty2a:
            "Dacă vrei să fii anunțat/ă la următoarea deschidere de înscrieri, scrie-ne prin",
          contactPage: "pagina de contact",
          empty2b: "sau urmărește-ne pe social media.",
        };

  return (
    <div
      className="container"
      style={{
        padding: isMobile ? "20px 0 40px" : "32px 0 48px",
        maxWidth: 900,
      }}
    >
      <div style={{ marginTop: 0, marginBottom: 18 }}>
        <Link to="/proiecte/evenimente" style={backPillStyle}>
          {ui.backProject}
        </Link>
      </div>

      <header
        className="font-cormorant"
        style={{ marginBottom: 24, textAlign: "center" }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: isMobile ? 34 : 40,
            lineHeight: 1.1,
          }}
        >
          {ui.title}
        </h1>

        <p
          style={{
            color: "var(--secondary)",
            marginTop: 8,
            fontSize: isMobile ? 17 : 18,
            lineHeight: 1.6,
          }}
        >
          {ui.subtitle}
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
            aria-label="Events language switch"
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

        <div
          style={{
            height: 2,
            background: "#d5b56f",
            opacity: 0.6,
            marginTop: 16,
          }}
        />
      </header>

      {upcoming.length === 0 ? (
        <div
          style={{
            marginTop: 18,
            lineHeight: 1.8,
            background: "#fffef9",
            border: "1px solid #ece7df",
            borderRadius: 18,
            padding: isMobile ? 18 : 22,
            boxShadow: "0 8px 22px rgba(0,0,0,.05)",
          }}
        >
          <p style={{ marginTop: 0 }}>{ui.empty1}</p>
          <p style={{ marginBottom: 0 }}>
            {ui.empty2a}{" "}
            <Link
              to="/contact"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              {ui.contactPage}
            </Link>{" "}
            {ui.empty2b}
          </p>
        </div>
      ) : (
        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          {upcoming.map((ev) => {
            const title = lang === "en" ? ev.titleEn || ev.title : ev.title;
            const date = lang === "en" ? ev.dateEn || ev.date : ev.date;
            const status = lang === "en" ? ev.statusEn || ev.status : ev.status;

            return (
              <div
                key={ev.id}
                style={{
                  padding: "16px 18px",
                  borderRadius: 16,
                  background: "#fffef9",
                  border: "1px solid #ece7df",
                  boxShadow: "0 8px 18px rgba(0,0,0,.06)",
                }}
              >
                <div
                  className="font-cormorant"
                  style={{ fontSize: 24, marginBottom: 4 }}
                >
                  {title}
                </div>

                <div
                  style={{
                    color: "var(--secondary)",
                    marginBottom: status ? 8 : 0,
                  }}
                >
                  {date}
                </div>

                {status && (
                  <div>
                    <span
                      style={{
                        background: "#f2e5e0",
                        color: "#5a4540",
                        borderRadius: 999,
                        padding: "4px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {status}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Link to="/proiecte/evenimente" style={backPillStyle}>
          {ui.backProject}
        </Link>

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          style={backPillStyle}
        >
          {ui.backTop}
        </a>
      </div>
    </div>
  );
}