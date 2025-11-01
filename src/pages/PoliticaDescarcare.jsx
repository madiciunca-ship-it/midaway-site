// src/pages/PoliticaDescarcare.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PoliticaDescarcare() {
  return (
    <div className="legal doc">
      {/* stiluri identice cu celelalte pagini legale */}
      <style>{`
        .doc{
          padding:24px;
          max-width:860px;
          margin:0 auto;
          line-height:1.75;
          color:#222;
          font-family: Georgia, "Times New Roman", serif;
          font-size:18px;
        }
        .doc h1{
          font-size:42px;
          line-height:1.2;
          margin:0 0 8px 0;
        }
        .doc h2, .doc h3{
          font-size:28px;
          margin:28px 0 8px 0;
        }
        .doc p{ margin:12px 0; }
        .doc a{ color:#7a1b1b; text-decoration:none; }
        .doc a:hover{ text-decoration:underline; }
        .doc .muted{ font-size:14px; color:#555; margin:0 0 12px 0; }
        .doc strong{ font-weight:700; }
        .doc ul{ padding-left:20px; }
      `}</style>

      <h1>Politica de descărcare eBook</h1>
      <p className="muted">Ultima actualizare: 01.11.2025</p>

      <p>
        Prezenta Politică descrie modul în care{" "}
        <strong>Midaway Publishing House S.R.L.</strong> („noi”) gestionează
        livrarea produselor digitale (eBook-uri, audiobook-uri și alte
        materiale electronice) prin intermediul site-ului{" "}
        <strong>midaway.ro</strong> / <strong>midaway.vercel.app</strong> („Site-ul”).
      </p>

      <h3>1. Livrarea produselor digitale</h3>
      <p>
        Produsele digitale (PDF, EPUB, Audiobook) sunt livrate prin link de
        descărcare transmis automat pe adresa de e-mail indicată la finalizarea
        comenzii, imediat după confirmarea plății. Linkul este valabil 48h și
        poate fi utilizat pentru un număr limitat de descărcări.
      </p>

      <h3>2. Dreptul de retragere</h3>
      <p>
        Pentru conținut digital livrat printr-un mijloc electronic, conform
        legislației în vigoare, îți poți pierde dreptul de retragere odată ce
        livrarea a început (adică descărcarea a fost inițiată). Înainte de
        plată, îți cerem consimțământul expres pentru începerea livrării digitale
        imediat și confirmarea faptului că înțelegi pierderea dreptului de
        retragere după descărcare.
      </p>

      <h3>3. Asistență și suport tehnic</h3>
      <p>
        Dacă întâmpini probleme cu descărcarea sau accesarea fișierelor, te
        rugăm să ne contactezi la{" "}
        <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>. Echipa noastră
        oferă asistență pentru remedierea erorilor tehnice în cel mai scurt timp
        posibil.
      </p>

      <h3>4. Identitatea operatorului</h3>
      <p>
        Site-ul <strong>midaway.ro</strong> este operat de:
        <br />
        <strong>Midaway Publishing House S.R.L.</strong>
        <br />
        CUI: <strong>42435400</strong> • Nr. Reg. Com.:{" "}
        <strong>ROONRC J2020000424244</strong>
        <br />
        Sediu social:{" "}
        <strong>
          Cocorăștii-Colț, Calea București, Nr. 31, Județ Prahova
        </strong>
        <br />
        E-mail: <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        <br />
        Banca Transilvania – IBAN:{" "}
        <strong>
          RO34BTRLEURCRT0DB2481901, RO87BTRLRONCRT0DB2481901
        </strong>
      </p>

      <p style={{ marginTop: 24 }}>
        Vezi și:{" "}
        <Link to="/termeni">Termeni & condiții</Link> •{" "}
        <Link to="/politica-confidentialitate">
          Politica de confidențialitate
        </Link>{" "}
        • <Link to="/politica-cookies">Politica cookies</Link>
      </p>
    </div>
  );
}
