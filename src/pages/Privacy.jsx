// src/pages/Privacy.jsx
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

export default function Privacy() {
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
          {lang === "en" ? "Privacy Policy" : "Politica de confidențialitate"}
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
            Această Politică explică modul în care{" "}
            <strong>Midaway Publishing House S.R.L.</strong> („Midaway”, „noi”)
            colectează, utilizează și protejează datele tale personale atunci când
            folosești site-ul <strong>midaway.ro</strong> /
            <strong> midaway.vercel.app</strong> („Site-ul”).
            <br />
            Respectăm legislația aplicabilă privind protecția datelor cu caracter
            personal (Regulamentul UE 2016/679 – GDPR).
          </p>

          <h2 className="font-cormorant">1. Cine suntem</h2>
          <p>
            Operatorul de date este <strong>Midaway Publishing House S.R.L.</strong>,
            cu sediul social în Cocorăștii-Colț, Calea București, Nr. 31, Județ
            Prahova, România.
            <br />
            CUI: 42435400 • Nr. Reg. Com.: J2020000424244
            <br />
            Email:{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
          </p>

          <h2 className="font-cormorant">2. Ce date colectăm</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>
              <strong>Date furnizate direct</strong>: nume, adresă email, mesaj,
              informații din formulare (ex. contact, comenzi, colaborări).
            </li>
            <li>
              <strong>Date tranzacționale</strong>: adresă de livrare/facturare,
              date comandă, produse achiziționate, metode de plată (procesate prin
              terți autorizați – Stripe, Netopia, Amazon etc.).
            </li>
            <li>
              <strong>Date tehnice</strong>: adresă IP, tip browser, dispozitiv,
              pagini vizitate, cookies și analytics (Google / Vercel logs).
            </li>
            <li>
              <strong>Date pentru comunicare & marketing</strong>: adrese email
              colectate prin formulare de abonare (Formspree).
            </li>
          </ul>
          <p style={{ marginTop: 12, lineHeight: 1.7 }}>
            <strong>Protecția minorilor:</strong> Site-ul Midaway se adresează persoanelor
            cu vârsta de minimum 16 ani. Nu colectăm intenționat date personale de la
            minori. Dacă ești părinte sau tutore și consideri că un minor ne-a transmis
            date personale, te rugăm să ne contactezi la{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            pentru a solicita ștergerea acestora.
          </p>

          <h2 className="font-cormorant">3. Scopurile prelucrării</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>răspuns la solicitări, mesaje sau cereri transmise prin site;</li>
            <li>procesarea comenzilor de cărți fizice și digitale;</li>
            <li>emiterea facturilor și conformarea obligațiilor contabile;</li>
            <li>gestionarea colaborărilor editoriale și contractuale;</li>
            <li>îmbunătățirea funcționării site-ului și a experienței utilizatorului;</li>
            <li>trimiterea de actualizări (dacă te abonezi la newsletter);</li>
            <li>asigurarea securității și prevenirea abuzurilor.</li>
          </ul>

          <h2 className="font-cormorant">4. Temeiul legal</h2>
          <ul>
            <li>consimțământul explicit (ex. abonare newsletter, cookies opționale);</li>
            <li>executarea unui contract (ex. comandă, colaborare editorială);</li>
            <li>interes legitim (securitate, îmbunătățirea serviciilor);</li>
            <li>obligație legală (contabilitate, arhivare fiscală).</li>
          </ul>

          <h2 className="font-cormorant">5. Stocarea și transferul datelor</h2>
          <p style={{ lineHeight: 1.7 }}>
            Datele sunt stocate în mod securizat, în medii protejate și accesibile
            doar personalului autorizat. Putem utiliza furnizori de servicii (email,
            plăți, hosting, analytics) cu servere în UE sau în afara UE. În aceste
            cazuri, transferurile se fac în baza Clauzelor Contractuale Standard
            (SCC) aprobate de Comisia Europeană.
          </p>

          <h2 className="font-cormorant">6. Durata păstrării</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>mesaje/contact: 12 luni de la primire;</li>
            <li>date contabile: 10 ani (conform legislației române);</li>
            <li>date pentru colaborări: pe durata contractului și arhivare legală;</li>
            <li>abonamente newsletter: până la dezabonare;</li>
            <li>
              cookies: conform duratei definite în{" "}
              <Link to="/cookies" style={{ color: "var(--accent)" }}>
                Politica cookies
              </Link>.
            </li>
          </ul>

          <h2 className="font-cormorant">7. Drepturile persoanelor vizate</h2>
          <p>În conformitate cu GDPR, ai următoarele drepturi:</p>
          <ul>
            <li>dreptul de acces la datele personale;</li>
            <li>dreptul la rectificare sau ștergere („dreptul de a fi uitat”);</li>
            <li>dreptul la restricționarea prelucrării;</li>
            <li>dreptul la opoziție și portabilitatea datelor;</li>
            <li>dreptul de a retrage consimțământul oricând;</li>
            <li>
              dreptul de a depune plângere la{" "}
              <a
                href="https://www.dataprotection.ro/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--accent)" }}
              >
                ANSPDCP
              </a>.
            </li>
          </ul>

          <h2 className="font-cormorant">8. Cookies & analytics</h2>
          <p style={{ lineHeight: 1.7 }}>
            Site-ul folosește fișiere cookies pentru funcționare, analiză de trafic
            și memorarea preferințelor. Unele pot proveni de la servicii terțe
            (Google Analytics, YouTube, Spotify, Formspree). Poți gestiona consimțământul
            tău în pagina{" "}
            <Link to="/cookies" style={{ color: "var(--accent)", textDecoration: "none" }}>
              Politica cookies
            </Link>.
          </p>

          <h2 className="font-cormorant">9. Parteneri și terți</h2>
          <p style={{ lineHeight: 1.7 }}>
            În funcție de activitățile desfășurate, colaborăm cu furnizori autorizați
            (ex. Stripe, Netopia, Amazon, Formspree, Google). Aceștia acționează ca
            operatori sau persoane împuternicite și au propriile politici de
            confidențialitate. Midaway nu este responsabilă pentru practicile acestor
            terți în afara controlului său.
          </p>

          <h2 className="font-cormorant">10. Securitate</h2>
          <p style={{ lineHeight: 1.7 }}>
            Implementăm măsuri tehnice și organizatorice rezonabile pentru protejarea
            datelor (HTTPS, acces controlat, copii de siguranță). Cu toate acestea,
            transmiterea online nu poate fi garantată 100% împotriva riscurilor.
          </p>

          <h2 className="font-cormorant">11. Linkuri externe & social media</h2>
          <p style={{ lineHeight: 1.7 }}>
            Site-ul poate conține linkuri către platforme externe (Instagram,
            Facebook, YouTube, TikTok) și pagini ale colaboratorilor (autori,
            călători etc.). <strong> Midaway Publishing House S.R.L.</strong> nu este responsabilă pentru conținutul,
            politica de confidențialitate sau activitățile acestor terți.
          </p>

          <h2 className="font-cormorant">12. Modificări ale politicii</h2>
          <p style={{ lineHeight: 1.7 }}>
            Această politică poate fi actualizată periodic. Orice modificare semnificativă
            va fi publicată pe această pagină, cu actualizarea datei de mai sus.
          </p>

          <h2 className="font-cormorant">13. Contact</h2>
          <p style={{ lineHeight: 1.7 }}>
            Pentru întrebări, solicitări sau exercitarea drepturilor tale, ne poți
            contacta:
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            <br />
            <strong>Adresă:</strong> Midaway Publishing House S.R.L., Calea București,
            Nr. 31, Cocorăștii-Colț, Prahova, România.
          </p>
        </>
      )}

      {/* ===== EN ===== */}
      {lang === "en" && (
        <>
          <p style={{ lineHeight: 1.7 }}>
            This Policy explains how{" "}
            <strong>Midaway Publishing House S.R.L.</strong> (“Midaway”, “we”)
            collects, uses and protects your personal data when you use{" "}
            <strong>midaway.ro</strong> / <strong>midaway.vercel.app</strong> (the “Website”).
            <br />
            We comply with the EU General Data Protection Regulation (GDPR – EU 2016/679).
          </p>

          <h2 className="font-cormorant">1. Who we are</h2>
          <p>
            The data controller is <strong>Midaway Publishing House S.R.L.</strong>,
            registered in Cocorăștii-Colț, Calea București, No. 31, Prahova, Romania.
            <br />
            Tax ID: 42435400 • Trade Registry no.: J2020000424244
            <br />
            Email:{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
          </p>

          <h2 className="font-cormorant">2. Data we collect</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>
              <strong>Data you provide directly</strong>: name, email address, message,
              information entered in forms (e.g., contact, orders, collaborations).
            </li>
            <li>
              <strong>Transactional data</strong>: billing/shipping address, order details,
              purchased items, payment methods (processed by authorised third parties –
              Stripe, Netopia, Amazon, etc.).
            </li>
            <li>
              <strong>Technical data</strong>: IP address, browser type, device,
              pages visited, cookies and analytics (Google / Vercel logs).
            </li>
            <li>
              <strong>Communication & marketing data</strong>: email addresses collected via
              signup forms (Formspree).
            </li>
          </ul>
          <p style={{ marginTop: 12, lineHeight: 1.7 }}>
            <strong>Children’s data:</strong> The Midaway Website is intended for users aged
            16 and over. We do not knowingly collect personal data from children. If you are a
            parent/guardian and believe a child has provided us with personal data, please
            contact us at{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>{" "}
            to request deletion.
          </p>

          <h2 className="font-cormorant">3. Purposes of processing</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>responding to requests and messages sent via the Website;</li>
            <li>processing orders for physical and digital books;</li>
            <li>issuing invoices and meeting accounting obligations;</li>
            <li>managing editorial collaborations and contracts;</li>
            <li>improving Website performance and user experience;</li>
            <li>sending updates (if you subscribe to the newsletter);</li>
            <li>ensuring security and preventing abuse.</li>
          </ul>

          <h2 className="font-cormorant">4. Legal basis</h2>
          <ul>
            <li>explicit consent (e.g., newsletter subscription, optional cookies);</li>
            <li>performance of a contract (e.g., order, editorial collaboration);</li>
            <li>legitimate interest (security, service improvement);</li>
            <li>legal obligation (accounting, fiscal archiving).</li>
          </ul>

          <h2 className="font-cormorant">5. Storage and transfers</h2>
          <p style={{ lineHeight: 1.7 }}>
            Data is stored securely in protected environments accessible only to authorised
            personnel. We may use service providers (email, payments, hosting, analytics)
            with servers in the EU or outside the EU. In such cases, transfers rely on the
            European Commission’s Standard Contractual Clauses (SCC).
          </p>

          <h2 className="font-cormorant">6. Retention period</h2>
          <ul style={{ lineHeight: 1.7 }}>
            <li>messages/contact: 12 months from receipt;</li>
            <li>accounting data: 10 years (per Romanian law);</li>
            <li>collaboration records: for the term of the contract + legal archiving;</li>
            <li>newsletter subscriptions: until you unsubscribe;</li>
            <li>
              cookies: according to the durations defined in the{" "}
              <Link to="/cookies" style={{ color: "var(--accent)" }}>
                Cookies Policy
              </Link>.
            </li>
          </ul>

          <h2 className="font-cormorant">7. Your rights (GDPR)</h2>
          <p>Under GDPR, you have the following rights:</p>
          <ul>
            <li>right of access to your personal data;</li>
            <li>right to rectification or erasure (“right to be forgotten”);</li>
            <li>right to restriction of processing;</li>
            <li>right to object and to data portability;</li>
            <li>right to withdraw consent at any time;</li>
            <li>
              right to lodge a complaint with the{" "}
              <a
                href="https://www.dataprotection.ro/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--accent)" }}
              >
                Romanian DPA (ANSPDCP)
              </a>.
            </li>
          </ul>

          <h2 className="font-cormorant">8. Cookies & analytics</h2>
          <p style={{ lineHeight: 1.7 }}>
            The Website uses cookies for functionality, traffic analytics and preference
            storage. Some cookies are set by third-party services (Google Analytics,
            YouTube, Spotify, Formspree). You can manage your consent in the{" "}
            <Link to="/cookies" style={{ color: "var(--accent)", textDecoration: "none" }}>
              Cookies Policy
            </Link>{" "}
            page.
          </p>

          <h2 className="font-cormorant">9. Partners and third parties</h2>
          <p style={{ lineHeight: 1.7 }}>
            Depending on our activities, we work with authorised providers (e.g., Stripe,
            Netopia, Amazon, Formspree, Google). They act as controllers or processors and
            have their own privacy policies. Midaway is not responsible for third-party
            practices outside our control.
          </p>

          <h2 className="font-cormorant">10. Security</h2>
          <p style={{ lineHeight: 1.7 }}>
            We implement reasonable technical and organisational measures to protect data
            (HTTPS, controlled access, backups). However, online transmission cannot be
            guaranteed 100% risk-free.
          </p>

          <h2 className="font-cormorant">11. External links & social media</h2>
          <p style={{ lineHeight: 1.7 }}>
            The Website may include links to external platforms (Instagram, Facebook,
            YouTube, TikTok) and collaborators’ pages (authors, travelers, etc.).{" "}
            <strong>Midaway Publishing House S.R.L.</strong> is not responsible for the
            content, privacy practices or activities of these third parties.
          </p>

          <h2 className="font-cormorant">12. Changes to this Policy</h2>
          <p style={{ lineHeight: 1.7 }}>
            This Policy may be updated periodically. Any material changes will be published
            on this page, with the date above updated accordingly.
          </p>

          <h2 className="font-cormorant">13. Contact</h2>
          <p style={{ lineHeight: 1.7 }}>
            For questions, requests or to exercise your rights, contact us:
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@midaway.ro" style={{ color: "var(--accent)" }}>
              contact@midaway.ro
            </a>
            <br />
            <strong>Address:</strong> Midaway Publishing House S.R.L., Calea București,
            No. 31, Cocorăștii-Colț, Prahova, Romania.
          </p>
        </>
      )}
    </div>
  );
}
