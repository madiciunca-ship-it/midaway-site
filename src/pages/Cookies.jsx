// src/pages/Cookies.jsx
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

export default function Cookies() {
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
            ? "Cookies Policy"
            : "Politica privind fișierele cookie"}
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
            Prezenta Politică explică modul în care{" "}
            <strong>Midaway Publishing House S.R.L.</strong> („noi”) utilizează
            fișierele cookie și tehnologii similare pe site-ul{" "}
            <strong>midaway.ro</strong> {" "}
            („Site-ul”). Această politică face parte din{" "}
            <Link
              to="/privacy"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              Politica de confidențialitate
            </Link>
            .
          </p>

          <h2 className="font-cormorant">1. Ce sunt cookie-urile?</h2>
          <p style={{ lineHeight: 1.7 }}>
            Cookie-urile sunt fișiere text mici, stocate pe dispozitivul tău
            atunci când vizitezi un site web. Ele conțin informații care ajută la
            funcționarea corectă a site-ului, la îmbunătățirea experienței
            utilizatorului și la analiza traficului.
          </p>

          <h2 className="font-cormorant">
            2. Tipurile de cookie-uri pe care le folosim
          </h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Cookie-uri esențiale</strong> – necesare pentru
              funcționarea corectă a Site-ului (ex. sesiune, preferințe
              tehnice, coș de cumpărături). Acestea nu pot fi dezactivate.
            </li>
            <li>
              <strong>Cookie-uri funcționale</strong> – rețin preferințele tale
              (ex. limba site-ului, consimțământul privind cookie-urile).
            </li>
            <li>
              <strong>Cookie-uri analitice</strong> – ne ajută să înțelegem cum
              este utilizat Site-ul (ex. pagini vizitate, durata sesiunii)
              pentru a îmbunătăți conținutul și structura. Pot fi furnizate de
              servicii terțe precum <strong>Google Analytics</strong> sau{" "}
              <strong>Vercel Analytics</strong>.
            </li>
            <li>
              <strong>Cookie-uri de marketing / media</strong> – pot proveni de
              la platforme externe integrate (ex. <strong>YouTube</strong>,
              <strong> Spotify</strong>, <strong>Instagram</strong>), care
              setează propriile cookie-uri când conținutul lor este afișat sau
              redat.
            </li>
          </ul>

          <h2 className="font-cormorant">3. Cookie-uri plasate de terți</h2>
          <p style={{ lineHeight: 1.7 }}>
            Site-ul Midaway poate conține conținut integrat („embed”) de la
            terți: videoclipuri, podcasturi, formulare sau linkuri către
            platforme externe. Aceste servicii (ex. YouTube, Spotify, Formspree,
            Google Fonts, Facebook, TikTok) pot colecta informații despre
            activitatea ta chiar dacă nu ai un cont pe acele platforme. Te
            încurajăm să consulți politicile lor de confidențialitate pentru
            detalii privind cookie-urile utilizate.
          </p>

          <h2 className="font-cormorant">4. Cum poți gestiona cookie-urile</h2>
          <p style={{ lineHeight: 1.7 }}>
            La prima accesare a Site-ului, poți alege ce tipuri de cookie-uri
            accepți (prin bannerul de consimțământ, dacă este activ). Poți
            modifica oricând aceste opțiuni sau poți șterge cookie-urile
            existente din setările browserului tău.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Majoritatea browserelor permit: blocarea totală/parțială a
            cookie-urilor, ștergerea automată la închiderea sesiunii și
            notificări atunci când un cookie nou este setat. Reține că blocarea
            cookie-urilor esențiale poate afecta funcționarea anumitor părți ale
            site-ului (ex. coșul de cumpărături sau formularele).
          </p>

          <h2 className="font-cormorant">5. Durata de viață a cookie-urilor</h2>
          <p style={{ lineHeight: 1.7 }}>Cookie-urile pot fi:</p>
          <ul style={{ lineHeight: 1.7 }}>
            <li>
              <strong>de sesiune</strong> – șterse automat când închizi
              browserul;
            </li>
            <li>
              <strong>persistente</strong> – rămân pe dispozitiv o perioadă
              determinată (de obicei între 1 zi și 12 luni), până la expirare
              sau ștergere manuală.
            </li>
          </ul>

          <h2 className="font-cormorant">6. Consimțământul tău</h2>
          <p style={{ lineHeight: 1.7 }}>
            Utilizând Site-ul și acceptând bannerul de consimțământ, ești de
            acord cu utilizarea cookie-urilor conform acestei Politici. Poți
            oricând retrage consimțământul prin ștergerea cookie-urilor sau
            ajustarea setărilor browserului.
          </p>

          <h2 className="font-cormorant">7. Actualizări ale politicii</h2>
          <p style={{ lineHeight: 1.7 }}>
            Putem actualiza această Politică periodic pentru a reflecta schimbări
            tehnice, legale sau operaționale. Data ultimei actualizări este
            indicată mai sus. Versiunea actualizată va fi disponibilă permanent
            pe această pagină.
          </p>

          <h2 className="font-cormorant">8. Contact</h2>
          <p style={{ lineHeight: 1.7 }}>
            Dacă ai întrebări despre această politică sau despre modul în care
            folosim cookie-urile, ne poți contacta la{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            sau prin{" "}
            <Link to="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
              pagina de contact
            </Link>
            .
          </p>
        </>
      )}

      {/* ===== EN ===== */}
      {lang === "en" && (
        <>
          <p style={{ lineHeight: 1.7 }}>
            This Policy explains how{" "}
            <strong>Midaway Publishing House S.R.L.</strong> (“we”) use cookies
            and similar technologies on <strong>midaway.ro</strong>{" "}
            (the “Website”). This Policy is
            part of our{" "}
            <Link
              to="/privacy"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="font-cormorant">1. What are cookies?</h2>
          <p style={{ lineHeight: 1.7 }}>
            Cookies are small text files stored on your device when you visit a
            website. They contain information that helps the site function
            properly, enhance user experience and analyse traffic.
          </p>

          <h2 className="font-cormorant">2. Types of cookies we use</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Essential cookies</strong> – required for the proper
              functioning of the Website (e.g., session, technical preferences,
              shopping cart). These cannot be disabled.
            </li>
            <li>
              <strong>Functional cookies</strong> – remember your preferences
              (e.g., site language, cookie consent).
            </li>
            <li>
              <strong>Analytics cookies</strong> – help us understand how the
              Website is used (e.g., pages visited, session duration) to improve
              content and structure. May be provided by third parties such as{" "}
              <strong>Google Analytics</strong> or{" "}
              <strong>Vercel Analytics</strong>.
            </li>
            <li>
              <strong>Marketing / media cookies</strong> – may come from
              embedded external platforms (e.g., <strong>YouTube</strong>,{" "}
              <strong>Spotify</strong>, <strong>Instagram</strong>) which set
              their own cookies when their content is displayed or played.
            </li>
          </ul>

          <h2 className="font-cormorant">3. Third-party cookies</h2>
          <p style={{ lineHeight: 1.7 }}>
            The Midaway Website may include embedded content from third parties:
            videos, podcasts, forms or links to external platforms. These
            services (e.g., YouTube, Spotify, Formspree, Google Fonts, Facebook,
            TikTok) may collect information about your activity even if you do
            not have an account on those platforms. Please review their privacy
            policies for details on their cookies.
          </p>

          <h2 className="font-cormorant">4. How to manage cookies</h2>
          <p style={{ lineHeight: 1.7 }}>
            On your first visit, you may choose which cookies you accept (via a
            consent banner, if enabled). You can change these choices at any time
            or delete existing cookies in your browser settings.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Most browsers allow: full/partial blocking of cookies, automatic
            deletion on session end and alerts when a new cookie is set. Note
            that blocking essential cookies may affect the functioning of certain
            parts of the site (e.g., shopping cart or forms).
          </p>

          <h2 className="font-cormorant">5. Cookie lifespan</h2>
          <p style={{ lineHeight: 1.7 }}>Cookies may be:</p>
          <ul style={{ lineHeight: 1.7 }}>
            <li>
              <strong>session cookies</strong> – automatically deleted when you
              close the browser;
            </li>
            <li>
              <strong>persistent cookies</strong> – remain on your device for a
              set period (usually between 1 day and 12 months), until expiry or
              manual deletion.
            </li>
          </ul>

          <h2 className="font-cormorant">6. Your consent</h2>
          <p style={{ lineHeight: 1.7 }}>
            By using the Website and accepting the consent banner, you agree to
            the use of cookies as described in this Policy. You may withdraw your
            consent at any time by deleting cookies or adjusting your browser
            settings.
          </p>

          <h2 className="font-cormorant">7. Policy updates</h2>
          <p style={{ lineHeight: 1.7 }}>
            We may update this Policy periodically to reflect technical, legal or
            operational changes. The date above shows the latest update. The
            current version is always available on this page.
          </p>

          <h2 className="font-cormorant">8. Contact</h2>
          <p style={{ lineHeight: 1.7 }}>
            If you have questions about this Policy or how we use cookies, please
            contact us at{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            or via{" "}
            <Link to="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
              the contact page
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
