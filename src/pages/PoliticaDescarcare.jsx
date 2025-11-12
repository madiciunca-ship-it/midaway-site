// src/pages/PoliticaDescarcare.jsx
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

export default function PoliticaDescarcare() {
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

  // rute „prietenoase” la final, în funcție de limbă (ca să nu rupem nimic)
  const privacyPath = lang === "en" ? "/privacy" : "/politica-confidentialitate";
  const cookiesPath = lang === "en" ? "/cookies" : "/politica-cookies";

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      {/* Titlu + switch RO/EN */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 className="font-cormorant" style={{ margin: 0, flex: 1 }}>
          {lang === "en" ? "eBook Download Policy" : "Politica de descărcare eBook"}
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
          <p style={{ lineHeight: 1.7 }}>
            Prezenta Politică descrie modul în care{" "}
            <strong>Midaway Publishing House S.R.L.</strong> („noi”) gestionează
            livrarea produselor digitale (eBook-uri, audiobook-uri și alte materiale
            electronice) prin intermediul site-ului{" "}
            <strong>midaway.ro</strong> {" "}
            („Site-ul”).
          </p>

          <h2 className="font-cormorant">1. Livrarea produselor digitale</h2>
          <p style={{ lineHeight: 1.7 }}>
            Produsele digitale (PDF, EPUB, Audiobook) sunt livrate prin link de
            descărcare transmis automat pe adresa de e-mail indicată la finalizarea
            comenzii, imediat după confirmarea plății. Linkul este valabil 48h și
            poate fi utilizat pentru un număr limitat de descărcări.
          </p>

          <h2 className="font-cormorant">2. Dreptul de retragere</h2>
          <p style={{ lineHeight: 1.7 }}>
            Pentru conținut digital livrat printr-un mijloc electronic, conform
            legislației în vigoare, îți poți pierde dreptul de retragere odată ce
            livrarea a început (adică descărcarea a fost inițiată). Înainte de plată
            îți cerem consimțământul expres pentru începerea livrării digitale
            imediat și confirmarea faptului că înțelegi pierderea dreptului de
            retragere după descărcare.
          </p>

          <h2 className="font-cormorant">3. Asistență și suport tehnic</h2>
          <p style={{ lineHeight: 1.7 }}>
            Dacă întâmpini probleme cu descărcarea sau accesarea fișierelor, te
            rugăm să ne contactezi la{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            . Oferim asistență pentru remedierea erorilor tehnice în cel mai scurt
            timp posibil.
          </p>

          <h2 className="font-cormorant">4. Identitatea operatorului</h2>
          <p style={{ lineHeight: 1.7 }}>
            Site-ul <strong>midaway.ro</strong> este operat de:
            <br />
            <strong>Midaway Publishing House S.R.L.</strong>
            <br />
            CUI: <strong>42435400</strong> • Nr. Reg. Com.:{" "}
            <strong>J2020000424244</strong>
            <br />
            Sediu social:{" "}
            <strong>
              Cocorăștii-Colț, Calea București, Nr. 31, Județ Prahova
            </strong>
            <br />
            E-mail:{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            <br />
            Banca Transilvania – IBAN:{" "}
            <strong>
              RO34BTRLEURCRT0DB2481901, RO87BTRLRONCRT0DB2481901
            </strong>
          </p>

          <p style={{ marginTop: 24, lineHeight: 1.7 }}>
            Vezi și:{" "}
            <Link to="/termeni" style={{ color: "var(--accent)" }}>
              Termeni & condiții
            </Link>{" "}
            •{" "}
            <Link to={privacyPath} style={{ color: "var(--accent)" }}>
              Politica de confidențialitate
            </Link>{" "}
            •{" "}
            <Link to={cookiesPath} style={{ color: "var(--accent)" }}>
              Politica cookies
            </Link>
          </p>
        </>
      )}

      {/* ===== EN ===== */}
      {lang === "en" && (
        <>
          <p style={{ lineHeight: 1.7 }}>
            This Policy describes how{" "}
            <strong>Midaway Publishing House S.R.L.</strong> (“we”) handle the
            delivery of digital products (eBooks, audiobooks and other electronic
            materials) via the{" "}
            <strong>midaway.ro</strong> {" "}
            website (the “Website”).
          </p>

          <h2 className="font-cormorant">1. Delivery of digital products</h2>
          <p style={{ lineHeight: 1.7 }}>
            Digital products (PDF, EPUB, Audiobook) are delivered via a download
            link sent automatically to the email address provided at checkout,
            immediately after payment confirmation. The link is valid for 48 hours
            and may be limited to a certain number of downloads.
          </p>

          <h2 className="font-cormorant">2. Right of withdrawal</h2>
          <p style={{ lineHeight: 1.7 }}>
            For digital content delivered electronically, under applicable law you
            may lose your right of withdrawal once delivery has begun (i.e.,
            download has been initiated). Before payment we ask for your explicit
            consent to start digital delivery immediately and your acknowledgement
            that you understand the loss of the right of withdrawal after
            downloading.
          </p>

          <h2 className="font-cormorant">3. Support</h2>
          <p style={{ lineHeight: 1.7 }}>
            If you encounter issues downloading or accessing files, please contact
            us at{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            . We provide support to resolve technical errors as quickly as
            possible.
          </p>

          <h2 className="font-cormorant">4. Operator identity</h2>
          <p style={{ lineHeight: 1.7 }}>
            The <strong>midaway.ro</strong> website is operated by:
            <br />
            <strong>Midaway Publishing House S.R.L.</strong>
            <br />
            Tax ID (CUI): <strong>42435400</strong> • Trade Registry no.:{" "}
            <strong>J2020000424244</strong>
            <br />
            Registered address:{" "}
            <strong>
              Cocorăștii-Colț, Calea București, No. 31, Prahova County, Romania
            </strong>
            <br />
            E-mail:{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            <br />
            Transilvania Bank – IBAN:{" "}
            <strong>
              RO34BTRLEURCRT0DB2481901, RO87BTRLRONCRT0DB2481901
            </strong>
          </p>

          <p style={{ marginTop: 24, lineHeight: 1.7 }}>
            See also:{" "}
            <Link to="/termeni" style={{ color: "var(--accent)" }}>
              Terms & Conditions
            </Link>{" "}
            •{" "}
            <Link to={privacyPath} style={{ color: "var(--accent)" }}>
              Privacy Policy
            </Link>{" "}
            •{" "}
            <Link to={cookiesPath} style={{ color: "var(--accent)" }}>
              Cookies Policy
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
