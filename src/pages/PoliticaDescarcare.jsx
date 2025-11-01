// src/pages/PoliticaDescarcare.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PoliticaDescarcare() {
  return (
    <div style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
      <h1>Politica de descărcare eBook</h1>

      <p style={{ fontSize: 14, color: "#555" }}>
        Ultima actualizare: 01.11.2025
      </p>

      <p>
        Prezenta Politică descrie modul în care{" "}
        <strong>Midaway Publishing House S.R.L.</strong> („noi”) gestionează
        livrarea produselor digitale (eBook-uri, audiobook-uri și alte
        materiale electronice) prin intermediul site-ului{" "}
        <strong>midaway.ro</strong> /{" "}
        <strong>midaway.vercel.app</strong> („Site-ul”).
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
        E-mail:{" "}
        <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
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
