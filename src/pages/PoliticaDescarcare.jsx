// src/pages/PoliticaDescarcare.jsx
import { Link } from "react-router-dom";

export default function PoliticaDescarcare() {
  const today = new Date().toLocaleDateString("ro-RO");

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      <h1 className="font-cormorant" style={{ margin: 0 }}>
        Politica de descărcare eBook
      </h1>
      <p style={{ opacity: 0.85 }}>Ultima actualizare: {today}</p>

      <p style={{ lineHeight: 1.7 }}>
        Prezenta Politică descrie modul în care{" "}
        <strong>Midaway Publishing House S.R.L.</strong> („noi”) gestionează
        livrarea produselor digitale (eBook-uri, audiobook-uri și alte materiale
        electronice) prin intermediul site-ului{" "}
        <strong>midaway.ro</strong> / <strong>midaway.vercel.app</strong>{" "}
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
        <Link
          to="/politica-confidentialitate"
          style={{ color: "var(--accent)" }}
        >
          Politica de confidențialitate
        </Link>{" "}
        •{" "}
        <Link to="/politica-cookies" style={{ color: "var(--accent)" }}>
          Politica cookies
        </Link>
      </p>
    </div>
  );
}
