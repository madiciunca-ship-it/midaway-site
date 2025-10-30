// src/pages/Privacy.jsx
import { Link } from "react-router-dom";

export default function Privacy() {
  const today = new Date().toLocaleDateString("ro-RO");

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      <h1 className="font-cormorant" style={{ margin: 0 }}>
        Politica de confidențialitate
      </h1>
      <p style={{ opacity: 0.85 }}>Ultima actualizare: {today}</p>

      <p style={{ lineHeight: 1.7 }}>
        Această Politică explică modul în care{" "}
        <strong>Midaway Publishing House S.R.L.</strong> („Midaway”, „noi”)
        colectează, utilizează și protejează datele tale personale atunci când
        folosești site-ul <strong>midaway.ro</strong> („Site-ul”).
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
        <a
          href="mailto:contact@midaway.ro"
          style={{ color: "var(--accent)" }}
        >
          contact@midaway.ro
        </a>
      </p>

      <h2 className="font-cormorant">2. Ce date colectăm</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          <strong>Date furnizate direct</strong>: nume, adresă email, mesaj,
          informații din formulare (ex. contact, voluntariat, colaborări).
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
        <li>cookies: conform duratei definite în <Link to="/cookies" style={{ color: "var(--accent)" }}>Politica cookies</Link>.</li>
      </ul>

      <h2 className="font-cormorant">7. Drepturile persoanelor vizate</h2>
      <p>
        În conformitate cu GDPR, ai următoarele drepturi:
      </p>
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
        <a
          href="mailto:contact@midaway.ro"
          style={{ color: "var(--accent)" }}
        >
          contact@midaway.ro
        </a>
        <br />
        <strong>Adresă:</strong> Midaway Publishing House S.R.L., Calea București,
        Nr. 31, Cocorăștii-Colț, Prahova, România.
      </p>
    </div>
  );
}
