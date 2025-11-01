// src/pages/PoliticaAnulare.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PoliticaAnulare() {
  const today = new Date().toLocaleDateString("ro-RO");
  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      <h1 className="font-cormorant" style={{ margin: 0 }}>Politica de anulare servicii</h1>
      <p style={{ opacity: .85 }}>Ultima actualizare: {today}</p>

      <h2 className="font-cormorant">1. Anulare & reprogramare</h2>
      <p>
        Pentru servicii programate (ex. consultanță), poți solicita reprogramarea sau anularea
        cu cel puțin <strong>24h</strong> înainte (sau conform ferestrei indicate pe pagina serviciului).
        Solicitările ulterioare pot să nu fie acceptate.
      </p>

      <h2 className="font-cormorant">2. Ne-prezentare</h2>
      <p>
        În lipsa notificării în fereastra de anulare, sesiunea se consideră efectuată și nu se 
        rambursează. Putem, la discreție, să oferim o reprogramare unică.
      </p>

      <h2 className="font-cormorant">3. Servicii proiect (design/publicare)</h2>
      <p>
        Pentru servicii livrate în etape (ex. design copertă, publicare KDP), anularea este posibilă
        până la începerea lucrului efectiv. După demarare, rambursarea este proporțională cu munca 
        deja efectuată.
      </p>

      <h2 className="font-cormorant">4. Cum soliciți</h2>
      <p>
        Scrie-ne la <a href="mailto:contact@midaway.ro">contact@midaway.ro</a> cu numărul comenzii.
        Termenii generali rămân cei din <Link to="/termeni">Termeni & condiții</Link>.
      </p>
    </div>
  );
}
