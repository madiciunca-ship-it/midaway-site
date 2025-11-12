// src/pages/Terms.jsx
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

export default function Terms() {
  const [lang, setLang] = useState(detectLang());

  // schimbare live + informăm componentele comune (ex. footer)
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
          {lang === "en" ? "Terms & Conditions" : "Termeni & condiții"}
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

      {/* ====== RO ====== */}
      {lang === "ro" && (
        <>
          <h2 className="font-cormorant">1. Identitatea comerciantului</h2>
          <p style={{ lineHeight: 1.7 }}>
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
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            <br />
            Banca Transilvania – IBAN:{" "}
            <strong>RO34BTRLEURCRT0DB2481901</strong>,{" "}
            <strong>RO87BTRLRONCRT0DB2481901</strong>
          </p>

          <h2 className="font-cormorant">2. Produse și servicii oferite</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>
              <strong>Formate digitale</strong>: e-book și audiobook, livrate electronic
              (descărcare sau streaming).
            </li>
            <li>
              <strong>Servicii editoriale</strong>: editare, redactare, consultanță, design de carte
              și proiecte culturale.
            </li>
            <li>
              <strong>Cărți tipărite</strong> (paperback, în limba engleză) – livrare realizată de
              terți (ex. Amazon / revânzători autorizați).
            </li>
            <li>
              <strong>Cărți tipărite în limba română</strong> (paperback) – livrare prin curier pe
              teritoriul României.
            </li>
          </ul>

          <h2 className="font-cormorant">3. Prețuri, monedă și taxe</h2>
          <p>
            Prețurile sunt afișate în <strong>RON</strong> pentru oferta locală și în{" "}
            <strong>EUR</strong> pentru produsele destinate pieței internaționale. Prețurile includ
            taxele aplicabile acolo unde este cazul. Costurile de livrare (dacă există) sunt
            afișate separat la checkout. Facturarea se face în <strong>RON</strong> sau{" "}
            <strong>EUR</strong>, în funcție de produs și monedă selectată la comandă.
          </p>

          <h2 className="font-cormorant">4. Comenzi și livrare</h2>
          <p>
            <strong>4.1. Conținut digital (e-book / audiobook)</strong>
            <br />
            Accesul la fișiere este disponibil imediat după confirmarea plății, prin link de
            descărcare sau cont de utilizator. Linkurile pot avea o durată limitată sau un număr de
            descărcări pentru a preveni abuzul.
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
            externi (ex. Amazon). Politicile de livrare, retur și taxe vamale ale acestor platforme
            se aplică integral. <strong>Midaway Publishing House S.R.L.</strong> nu controlează
            stocurile sau termenele partenerilor.
          </p>
          <p>
            <strong>4.4. Cărți tipărite în limba română (livrare prin curier)</strong>
            <br />
            Comenzile se expediază prin curier pe teritoriul României. Costul și termenul estimat
            de livrare sunt afișate la checkout. În cazul imposibilității livrării din motive
            independente de noi (ex. adresă incorectă, lipsă la adresă), coletul se poate retrimite
            după reconfirmare; taxa suplimentară de transport poate fi percepută.
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
            Poți solicita retragerea înainte de începerea prestării serviciilor – rambursarea se
            face integral. Dacă serviciul a început deja, rambursarea se face proporțional cu munca
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
            Beneficiezi de dreptul de retragere în 14 zile de la recepție, cu returnarea produsului
            în stare nouă, nedeteriorată, preferabil în ambalajul original. Costul transportului de
            retur este, de regulă, suportat de client. Rambursarea sumei se face în cel mult 14 zile
            de la recepția și verificarea returului.
          </p>

          <h2 className="font-cormorant">6. Anulări și reprogramări (servicii editoriale)</h2>
          <p>
            Poți solicita modificarea sau anularea unui proiect editorial cu notificare scrisă. În
            cazul reprogramării, termenele se pot ajusta de comun acord. Sumele achitate se
            regularizează în funcție de progresul lucrării.
          </p>

          <h2 className="font-cormorant">7. Asistență și erori de livrare digitală</h2>
          <p>
            Dacă întâmpini dificultăți la descărcare, linkuri expirate sau fișiere corupte, te rugăm
            să ne scrii la{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            în termen de 48h de la achiziție. Vom reactiva accesul sau vom retransmite materialul.
          </p>

          <h2 className="font-cormorant">8. Drepturi de autor și licență de utilizare</h2>
          <p>
            Toate materialele publicate pe Site și în platformele asociate sunt protejate de
            legislația privind drepturile de autor. Pentru conținutul digital, utilizatorul primește
            o <strong>licență personală, neexclusivă și netransferabilă</strong> de utilizare. Este
            interzisă redistribuirea, publicarea, copierea sau comercializarea fișierelor.
          </p>

          <h2 className="font-cormorant">9. Plăți și facturare</h2>
          <p>
            Plățile se procesează prin furnizori autorizați (ex. Stripe / Netopia) sau prin
            transfer bancar. Datele cardului nu sunt stocate pe Site. Factura se emite electronic,
            în <strong>RON</strong> sau <strong>EUR</strong>, în funcție de monedă. Pentru comenzile
            efectuate prin platforme terțe (ex. Amazon), factura este emisă de respectivul
            comerciant.
          </p>

          <h2 className="font-cormorant">10. Răspundere și linkuri externe</h2>
          <p>
            Depunem eforturi constante pentru acuratețea informațiilor și funcționarea continuă a
            Site-ului, însă nu garantăm lipsa absolută de erori. Pentru produsele și serviciile
            gestionate de terți (ex. Amazon, Stripe, platforme de distribuție), răspunderea privind
            livrarea și returul aparține acestora.
          </p>
          <p>
            Conținutul publicat pe paginile de social media (Instagram, Facebook, YouTube, TikTok
            etc.) ale editurii sau ale colaboratorilor (autori, călători, parteneri) este administrat
            de aceștia. <strong>Midaway Publishing House S.R.L.</strong> nu își asumă răspunderea
            pentru opiniile, comentariile sau materialele publicate în mediile externe și nici pentru
            eventualele modificări, ștergeri sau distribuiri realizate de terți.
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
            Termenii sunt guvernați de legea română. Litigiile se soluționează pe cale amiabilă, iar
            în lipsa unui acord, de instanțele competente din România.
          </p>

          <h2 className="font-cormorant">15. Contact</h2>
          <p>
            Întrebări despre acești termeni?{" "}
            <Link to="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
              Contactează-ne
            </Link>
          </p>
          <p style={{ marginTop: 8 }}>
            Pentru sesizări privind conținutul terților, postări de pe rețele sociale sau materiale
            distribuite de colaboratori, ne poți contacta la{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            . Vom analiza situația și, dacă este cazul, vom lua măsurile necesare în cel mai scurt
            timp.
          </p>
        </>
      )}

      {/* ====== EN ====== */}
      {lang === "en" && (
        <>
          <h2 className="font-cormorant">1. Merchant identity</h2>
          <p style={{ lineHeight: 1.7 }}>
            The website <strong>midaway.ro</strong> is operated by:
            <br />
            <strong>Midaway Publishing House S.R.L.</strong>
            <br />
            Tax ID (CUI): <strong>42435400</strong> • Trade Registry no.:{" "}
            <strong>ROONRC J2020000424244</strong>
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
            Transilvania Bank – IBAN: <strong>RO34BTRLEURCRT0DB2481901</strong>,{" "}
            <strong>RO87BTRLRONCRT0DB2481901</strong>
          </p>

          <h2 className="font-cormorant">2. Products and services</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>
              <strong>Digital formats</strong>: e-books and audiobooks, delivered electronically
              (download or streaming).
            </li>
            <li>
              <strong>Editorial services</strong>: editing, copy-editing, consulting, book design and
              cultural projects.
            </li>
            <li>
              <strong>Printed books</strong> (paperback, English) – fulfillment by third parties
              (e.g. Amazon / authorised resellers).
            </li>
            <li>
              <strong>Printed books in Romanian</strong> (paperback) – courier delivery within
              Romania.
            </li>
          </ul>

          <h2 className="font-cormorant">3. Prices, currency and taxes</h2>
          <p>
            Prices are displayed in <strong>RON</strong> for local offering and in{" "}
            <strong>EUR</strong> for items aimed at international customers. Prices include
            applicable taxes where required. Delivery fees (if any) are shown separately at checkout.
            Invoicing is issued in <strong>RON</strong> or <strong>EUR</strong>, depending on the
            product and currency selected at checkout.
          </p>

          <h2 className="font-cormorant">4. Orders and delivery</h2>
          <p>
            <strong>4.1. Digital content (e-book / audiobook)</strong>
            <br />
            Access is available immediately after payment confirmation, via download link or user
            account. Links may be time-limited or limited to a certain number of downloads to prevent
            abuse.
          </p>
          <p>
            <strong>4.2. Editorial services</strong>
            <br />
            Work starts after order confirmation and, where applicable, after an advance payment.
            Deadlines and deliverables are agreed individually in writing.
          </p>
          <p>
            <strong>4.3. Printed books (paperback) fulfilled by third parties</strong>
            <br />
            For English editions, ordering and shipping are handled by external partners (e.g.
            Amazon). Their delivery/returns/customs policies apply in full.{" "}
            <strong>Midaway Publishing House S.R.L.</strong> does not control their stock or
            timelines.
          </p>
          <p>
            <strong>4.4. Printed books in Romanian (courier delivery)</strong>
            <br />
            Orders are shipped by courier within Romania. Delivery cost and ETA are shown at
            checkout. If delivery fails for reasons beyond our control (e.g. wrong address, recipient
            unavailable), the parcel may be re-sent after reconfirmation; an additional shipping fee
            may apply.
          </p>

          <h2 className="font-cormorant">5. Right of withdrawal</h2>
          <p>
            <strong>5.1. Digital products</strong>
            <br />
            For electronically delivered digital content, the right of withdrawal does not apply
            after performance has begun (download/streaming), provided you were informed and gave
            your explicit consent before completing the order.
          </p>
          <p>
            <strong>5.2. Editorial services</strong>
            <br />
            You may withdraw before services start — a full refund applies. If work has already
            started, refunds are proportional to the work performed up to the notification date.
          </p>
          <p>
            <strong>5.3. Printed books via third parties</strong>
            <br />
            Returns for items fulfilled by external platforms are handled according to their terms
            and policies.
          </p>
          <p>
            <strong>5.4. Printed books in Romanian (courier)</strong>
            <br />
            You may withdraw within 14 days from receipt, returning the item in new, undamaged
            condition, preferably in the original packaging. Return shipping is generally paid by the
            customer. Refunds are issued within 14 days from receiving and inspecting the return.
          </p>

          <h2 className="font-cormorant">6. Cancellations and rescheduling (editorial services)</h2>
          <p>
            You may request changes or cancellation of an editorial project in writing. In case of
            rescheduling, deadlines can be mutually adjusted. Amounts already paid are reconciled
            according to the progress of the work.
          </p>

          <h2 className="font-cormorant">7. Support & digital delivery issues</h2>
          <p>
            If you encounter download difficulties, expired links or corrupted files, please email us
            at{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            within 48h from purchase. We will reactivate access or re-deliver the material.
          </p>

          <h2 className="font-cormorant">8. Copyright & license</h2>
          <p>
            All materials published on the Website and associated platforms are protected by
            copyright. For digital content, the user receives a{" "}
            <strong>personal, non-exclusive, non-transferable</strong> license for use. Redistribution,
            publication, copying or commercial use of the files is prohibited.
          </p>

          <h2 className="font-cormorant">9. Payments & invoicing</h2>
          <p>
            Payments are processed via authorised providers (e.g. Stripe / Netopia) or bank transfer.
            Card data is not stored on the Website. Invoices are issued electronically in{" "}
            <strong>RON</strong> or <strong>EUR</strong>, depending on the chosen currency. For orders
            placed through third-party platforms (e.g. Amazon), invoices are issued by that merchant.
          </p>

          <h2 className="font-cormorant">10. Liability & external links</h2>
          <p>
            We strive for accuracy and continuous operation of the Website, but we cannot guarantee
            the complete absence of errors. For products and services handled by third parties (e.g.
            Amazon, Stripe, distribution platforms), delivery/returns liability rests with them.
          </p>
          <p>
            Content published on social media pages (Instagram, Facebook, YouTube, TikTok etc.) of the
            publisher or collaborators (authors, travelers, partners) is managed by those parties.{" "}
            <strong>Midaway Publishing House S.R.L.</strong> is not responsible for opinions,
            comments or materials posted on external media, nor for changes, deletions or sharing made
            by third parties.
          </p>

          <h2 className="font-cormorant">11. Data protection</h2>
          <p>
            We process your data in compliance with GDPR, solely for order processing and
            communication. For details, see our{" "}
            <Link to="/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/cookies" style={{ color: "var(--accent)", textDecoration: "none" }}>
              Cookies Policy
            </Link>
            .
          </p>

          <h2 className="font-cormorant">12. Force majeure</h2>
          <p>
            No party is liable for failure to perform if caused by a force majeure event according to
            applicable law.
          </p>

          <h2 className="font-cormorant">13. Changes</h2>
          <p>
            We reserve the right to update these terms. Continued use of the Website after
            publication of changes constitutes acceptance thereof.
          </p>

          <h2 className="font-cormorant">14. Governing law & disputes</h2>
          <p>
            These terms are governed by Romanian law. Disputes shall be resolved amicably; failing
            that, by the competent courts of Romania.
          </p>

          <h2 className="font-cormorant">15. Contact</h2>
          <p>
            Questions about these terms?{" "}
            <Link to="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
              Contact us
            </Link>
          </p>
          <p style={{ marginTop: 8 }}>
            For notices regarding third-party content, social media posts or materials shared by
            collaborators, please contact{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            . We will review and, if necessary, take appropriate measures as soon as possible.
          </p>
        </>
      )}
    </div>
  );
}
