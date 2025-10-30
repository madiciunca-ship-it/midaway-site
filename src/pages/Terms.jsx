// src/pages/Terms.jsx
import { Link } from "react-router-dom";

export default function Terms() {
  const today = new Date().toLocaleDateString("ro-RO");

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      <h1 className="font-cormorant" style={{ margin: 0 }}>Termeni & condiții</h1>
      <p style={{ opacity: 0.85 }}>Ultima actualizare: {today}</p>

      <h2 className="font-cormorant">1. Identitatea comerciantului</h2>
      <p style={{ lineHeight: 1.7 }}>
        Site-ul <strong>midaway.ro</strong> este operat de:
        <br />
        <strong>Midaway Publishing House S.R.L.</strong><br />
        CUI: <strong>42435400</strong> • Nr. Reg. Com.: <strong>ROONRC J2020000424244</strong><br />
        Sediu social: <strong>Cocorăștii-Colț, Calea București, Nr. 31, Județ Prahova</strong><br />
        E-mail:{" "}
        <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
          contact@midaway.ro
        </a>
        <br />
        Banca Transilvania – IBAN: <strong>RO34BTRLEURCRT0DB2481901</strong>,{" "}
        <strong>RO87BTRLRONCRT0DB2481901</strong>
      </p>

      <h2 className="font-cormorant">2. Produse și servicii oferite</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          <strong>Formate digitale</strong>: e-book și audiobook, livrate electronic
          (descărcare sau streaming).
        </li>
        <li>
          <strong>Servicii editoriale</strong>: editare, redactare, consultanță, design de carte și
          proiecte culturale.
        </li>
        <li>
          <strong>Cărți tipărite</strong> (paperback, în limba engleză) – livrare realizată de terți
          (ex. Amazon / revânzători autorizați).
        </li>
        <li>
  <strong>Cărți tipărite în limba română</strong> (paperback) – livrare prin curier pe teritoriul României.
</li>

      </ul>

      <h2 className="font-cormorant">3. Prețuri, monedă și taxe</h2>
      <p>
        Prețurile sunt afișate în <strong>RON</strong> pentru oferta locală și în{" "}
        <strong>EUR</strong> pentru produsele destinate pieței internaționale. Prețurile includ
        taxele aplicabile acolo unde este cazul. Costurile de livrare (dacă există) sunt afișate
        separat la checkout. Facturarea se face în <strong>RON</strong> sau <strong>EUR</strong>,
        în funcție de produs și monedă selectată la comandă.
      </p>

      <h2 className="font-cormorant">4. Comenzi și livrare</h2>
      <p>
        <strong>4.1. Conținut digital (e-book / audiobook)</strong>
        <br />
        Accesul la fișiere este disponibil imediat după confirmarea plății, prin link de descărcare
        sau cont de utilizator. Linkurile pot avea o durată limitată sau un număr de descărcări
        pentru a preveni abuzul.
      </p>
      <p>
        <strong>4.2. Servicii editoriale</strong>
        <br />
        Începerea lucrului are loc după confirmarea comenzii și, dacă este cazul, după achitarea
        unui avans. Termenele și detaliile de execuție se stabilesc individual, prin comunicare
        directă.
      </p>
      <p>
        <strong>4.3. Cărți tipărite (paperback) livrate de terți</strong>
        <br />
        Pentru titlurile în limba engleză, comanda și expedierea sunt gestionate de parteneri
        externi (ex. Amazon). Politicile de livrare, retur și taxe vamale ale acestor platforme se
        aplică integral. Midaway nu controlează stocurile sau termenele partenerilor.
      </p>
      <p>
  <strong>4.4. Cărți tipărite în limba română (livrare prin curier)</strong>
  <br />
  Comenzile se expediază prin curier pe teritoriul României. Costul și termenul estimat de livrare
  sunt afișate la checkout. În cazul imposibilității livrării din motive independente de noi
  (ex. adresă incorectă, lipsă la adresă), coletul se poate retrimite după reconfirmare;
  taxa suplimentară de transport poate fi percepută.
</p>


      <h2 className="font-cormorant">5. Dreptul de retragere</h2>
      <p>
        <strong>5.1. Produse digitale</strong>
        <br />
        Pentru conținutul digital livrat electronic, dreptul de retragere nu se aplică după
        începerea executării (descărcare/streaming), dacă ai fost informat și ți-ai exprimat
        acordul expres înainte de finalizarea comenzii.
      </p>
      <p>
        <strong>5.2. Servicii editoriale</strong>
        <br />
        Poți solicita retragerea înainte de începerea prestării serviciilor – rambursarea se face
        integral. Dacă serviciul a început deja, rambursarea se face proporțional cu munca
        efectuată până la data notificării.
      </p>
      <p>
        <strong>5.3. Cărți tipărite prin terți</strong>
        <br />
        Returul pentru produsele livrate de platforme externe se face conform termenilor și
        politicilor acestora.
      </p>
      <p>
  <strong>5.4. Cărți tipărite în limba română (curier)</strong>
  <br />
  Beneficiezi de dreptul de retragere în 14 zile de la recepție, cu returnarea produsului în
  stare nouă, nedeteriorată, preferabil în ambalajul original. Costul transportului de retur
  este, de regulă, suportat de client. Rambursarea sumei se face în cel mult 14 zile de la
  recepția și verificarea returului.
</p>


      <h2 className="font-cormorant">6. Anulări și reprogramări (servicii editoriale)</h2>
      <p>
        Poți solicita modificarea sau anularea unui proiect editorial cu notificare scrisă. În cazul
        reprogramării, termenele se pot ajusta de comun acord. Sumele achitate se regularizează în
        funcție de progresul lucrării.
      </p>

      <h2 className="font-cormorant">7. Asistență și erori de livrare digitală</h2>
      <p>
        Dacă întâmpini dificultăți la descărcare, linkuri expirate sau fișiere corupte, te rugăm să
        ne scrii la{" "}
        <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
          contact@midaway.ro
        </a>{" "}
        în termen de 48h de la achiziție. Vom reactiva accesul sau vom retransmite materialul.
      </p>

      <h2 className="font-cormorant">8. Drepturi de autor și licență de utilizare</h2>
      <p>
        Toate materialele publicate pe Site și în platformele asociate sunt protejate de legislația
        privind drepturile de autor. Pentru conținutul digital, utilizatorul primește o{" "}
        <strong>licență personală, neexclusivă și netransferabilă</strong> de utilizare. Este
        interzisă redistribuirea, publicarea, copierea sau comercializarea fișierelor.
      </p>

      <h2 className="font-cormorant">9. Plăți și facturare</h2>
      <p>
        Plățile se procesează prin furnizori autorizați (ex. Stripe / Netopia) sau prin transfer
        bancar. Datele cardului nu sunt stocate pe Site. Factura se emite electronic, în{" "}
        <strong>RON</strong> sau <strong>EUR</strong>, în funcție de monedă. Pentru comenzile
        efectuate prin platforme terțe (ex. Amazon), factura este emisă de respectivul comerciant.
      </p>

      <h2 className="font-cormorant">10. Răspundere și linkuri externe</h2>
      <p>
        Depunem eforturi constante pentru acuratețea informațiilor și funcționarea continuă a
        Site-ului, însă nu garantăm lipsa absolută de erori. Pentru produsele și serviciile
        gestionate de terți (ex. Amazon, Stripe, platforme de distribuție), răspunderea privind
        livrarea și returul aparține acestora.
      </p>

      <h2 className="font-cormorant">11. Protecția datelor</h2>
      <p>
        Prelucrăm datele tale conform legislației GDPR, exclusiv pentru operarea comenzilor și
        comunicare. Pentru detalii, consultă{" "}
        <Link to="/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Politica de confidențialitate
        </Link>{" "}
        și{" "}
        <Link to="/cookies" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Politica cookies
        </Link>
        .
      </p>

      <h2 className="font-cormorant">12. Forță majoră</h2>
      <p>
        Nicio parte nu răspunde pentru neexecutarea obligațiilor dacă aceasta se datorează unui
        eveniment de forță majoră, conform legii.
      </p>

      <h2 className="font-cormorant">13. Modificări</h2>
      <p>
        Ne rezervăm dreptul de a actualiza acești termeni. Continuarea utilizării Site-ului după
        publicarea modificărilor constituie acceptarea acestora.
      </p>

      <h2 className="font-cormorant">14. Legea aplicabilă & soluționarea litigiilor</h2>
      <p>
        Termenii sunt guvernați de legea română. Litigiile se soluționează pe cale amiabilă, iar în
        lipsa unui acord, de instanțele competente din România.
      </p>

      <h2 className="font-cormorant">15. Contact</h2>
      <p>
        Întrebări despre acești termeni?{" "}
        <Link to="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Contactează-ne
        </Link>
        .
      </p>
    </div>
  );
}
