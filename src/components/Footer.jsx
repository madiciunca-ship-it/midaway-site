import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SITE_FLAGS } from "../config";
import { getSiteLanguage } from "../utils/siteLanguage";

/* i18n Footer */
const i18nFooter = {
  ro: {
    rss: "RSS",
    terms: "Termeni & condiții",
    privacy: "Politica de confidențialitate",
    cookies: "Politica cookies",
    download: "Politica de descărcare eBook",
    cancel: "Politica de anulare",
    donations: "Donații",
    sponsors: "Sponsorizări",
    contact: "Contact",
    rights: "Toate drepturile rezervate.",
  },
  en: {
    rss: "RSS",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    cookies: "Cookies Policy",
    download: "eBook Download Policy",
    cancel: "Cancellation Policy",
    donations: "Donations",
    sponsors: "Sponsorships",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};



export default function Footer() {
  const showDon = SITE_FLAGS.showDonations;
  const showSpon = SITE_FLAGS.showSponsorships;

  const [lang, setLang] = useState(() => getSiteLanguage());
  const t = i18nFooter[lang] || i18nFooter.ro;

  /* dacă se schimbă limba în altă parte, încercăm să ne sincronizăm:
     - dacă vei seta localStorage.setItem("lang", "..."), funcționează imediat la reload/navigare
     - dacă emiți `window.dispatchEvent(new Event('midaway:lang'))`, se actualizează instant */
     useEffect(() => {
      const refresh = () => setLang(getSiteLanguage());
      refresh();
      window.addEventListener("storage", refresh);
      window.addEventListener("midaway:lang", refresh);
      return () => {
        window.removeEventListener("storage", refresh);
        window.removeEventListener("midaway:lang", refresh);
      };
    }, []);
    

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-bar">
        <div className="footer-links">
          <a href="/feed.xml" rel="alternate">{t.rss}</a>
          <span>•</span>
          <Link to="/termeni">{t.terms}</Link>
          <span>•</span>
          <Link to="/politica-confidentialitate">{t.privacy}</Link>
          <span>•</span>
          <Link to="/politica-cookies">{t.cookies}</Link>
          <span>•</span>
          <Link to="/politica-descarcare">{t.download}</Link>
          <span>•</span>
          <Link to="/politica-anulare">{t.cancel}</Link>
        </div>

        <div className="footer-links">
          {showDon && (
            <>
              <Link to="/donatii">{t.donations}</Link>
              <span>•</span>
            </>
          )}
          {showSpon && (
            <>
              <Link to="/sponsorizari">{t.sponsors}</Link>
              <span>•</span>
            </>
          )}
          <Link to="/contact">{t.contact}</Link>
          <span>•</span>
          <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        </div>

        <div className="footer-copy">
          © {year} MIDAWAY — {t.rights}
        </div>
      </div>
    </footer>
  );
}
