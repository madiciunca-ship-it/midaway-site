// src/pages/PoliticaAnulare.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* ——— detect limba globală din localStorage (fără ?lang=) ——— */
function detectLang() {
  if (typeof window === "undefined") return "ro";
  const v =
    localStorage.getItem("lang") ||
    localStorage.getItem("home.lang") ||
    localStorage.getItem("travelers.lang") ||
    localStorage.getItem("guides.lang") ||
    "ro";
  return v === "en" ? "en" : "ro";
}

export default function PoliticaAnulare() {
  const [lang, setLang] = useState(detectLang());

  const changeLang = (l) => {
    setLang(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      window.dispatchEvent(new Event("midaway:lang"));
    }
  };

  useEffect(() => {
    const sync = () => setLang(detectLang());
    window.addEventListener("midaway:lang", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("midaway:lang", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const today =
    lang === "en"
      ? new Date().toLocaleDateString("en-GB")
      : new Date().toLocaleDateString("ro-RO");

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      {/* Titlu + switch RO/EN */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 className="font-cormorant" style={{ margin: 0, flex: 1 }}>
          {lang === "en"
            ? "Service Cancellation Policy"
            : "Politica de anulare servicii"}
        </h1>
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
          <button
            onClick={() => changeLang("ro")}
            style={{
              padding: "8px 14px",
              border: "none",
              background: lang === "ro" ? "var(--accent)" : "transparent",
              color: lang === "ro" ? "#fff" : "#444",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            RO
          </button>
          <button
            onClick={() => changeLang("en")}
            style={{
              padding: "8px 14px",
              border: "none",
              background: lang === "en" ? "var(--accent)" : "transparent",
              color: lang === "en" ? "#fff" : "#444",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            EN
          </button>
        </div>
      </div>

      <p style={{ opacity: 0.85 }}>
        {lang === "en" ? "Last updated:" : "Ultima actualizare:"} {today}
      </p>

      {/* ===== RO ===== */}
      {lang === "ro" && (
        <>
          <h2 className="font-cormorant">1. Anulare & reprogramare</h2>
          <p>
            Pentru servicii programate (ex. consultanță), poți solicita reprogramarea
            sau anularea cu cel puțin <strong>24h</strong> înainte (sau conform
            ferestrei indicate pe pagina serviciului). Solicitările ulterioare pot să
            nu fie acceptate.
          </p>

          <h2 className="font-cormorant">2. Ne-prezentare</h2>
          <p>
            În lipsa notificării în fereastra de anulare, sesiunea se consideră
            efectuată și nu se rambursează. Putem, la discreție, să oferim o
            reprogramare unică.
          </p>

          <h2 className="font-cormorant">3. Servicii proiect (design/publicare)</h2>
          <p>
            Pentru servicii livrate în etape (ex. design copertă, publicare KDP),
            anularea este posibilă până la începerea lucrului efectiv. După demarare,
            rambursarea este proporțională cu munca deja efectuată.
          </p>

          <h2 className="font-cormorant">4. Cum soliciți</h2>
          <p>
            Scrie-ne la{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            cu numărul comenzii. Termenii generali rămân cei din{" "}
            <Link to="/termeni" style={{ color: "var(--accent)" }}>
              Termeni & condiții
            </Link>
            .
          </p>
        </>
      )}

      {/* ===== EN ===== */}
      {lang === "en" && (
        <>
          <h2 className="font-cormorant">1. Cancellation & rescheduling</h2>
          <p>
            For scheduled services (e.g., consultations), you may request a
            reschedule or cancellation at least <strong>24h</strong> in advance (or
            according to the timeframe indicated on the service page). Requests made
            after this window may not be accepted.
          </p>

          <h2 className="font-cormorant">2. No-show</h2>
          <p>
            If no notice is given within the cancellation window, the session is
            considered completed and is non-refundable. We may, at our discretion,
            offer a one-time reschedule.
          </p>

          <h2 className="font-cormorant">3. Project-based services (design/publishing)</h2>
          <p>
            For staged services (e.g., cover design, KDP publishing), cancellation is
            possible until actual work begins. After commencement, refunds are
            proportional to the work already performed.
          </p>

          <h2 className="font-cormorant">4. How to request</h2>
          <p>
            Write to us at{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            including your order number. General terms remain those outlined in{" "}
            <Link to="/termeni" style={{ color: "var(--accent)" }}>
              Terms & Conditions
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
