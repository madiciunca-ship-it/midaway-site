// src/pages/PoliticaDescarcare.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PoliticaDescarcare() {
  return (
    <div style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
      <h1>Politica de descărcare eBook</h1>

      <p>
        Produsele digitale (PDF/EPUB/Audiobook) sunt livrate prin link de
        descărcare trimis pe email după confirmarea plății. Linkul este
        valabil 48h și poate fi utilizat pentru un număr limitat de
        descărcări.
      </p>

      <h3>Dreptul de retragere</h3>
      <p>
        Pentru conținut digital livrat printr-un mijloc electronic, îți
        poți pierde dreptul de retragere odată ce livrarea a început
        (descărcarea a fost inițiată), conform legislației în vigoare.
        Înainte de plată îți cerem consimțământul expres pentru începerea
        livrării digitale imediat.
      </p>

      <h3>Asistență</h3>
      <p>
        Dacă întâmpini probleme cu descărcarea sau accesarea fișierelor,
        scrie-ne la{" "}
        <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>.
      </p>

      <p style={{ marginTop: 24 }}>
        Vezi și:{" "}
        <Link to="/termeni">Termeni & condiții</Link> •{" "}
        <Link to="/politica-confidentialitate">Politica de confidențialitate</Link> •{" "}
        <Link to="/politica-cookies">Politica cookies</Link>
      </p>
    </div>
  );
}
