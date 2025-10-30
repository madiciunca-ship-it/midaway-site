// src/pages/Cookies.jsx
import { Link } from "react-router-dom";

export default function Cookies() {
  const today = new Date().toLocaleDateString("ro-RO");

  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      <h1 className="font-cormorant" style={{ margin: 0 }}>
        Politica privind fișierele cookie
      </h1>
      <p style={{ opacity: 0.85 }}>Ultima actualizare: {today}</p>

      <p style={{ lineHeight: 1.7 }}>
        Prezenta Politică explică modul în care{" "}
        <strong>Midaway Publishing House S.R.L.</strong> („noi”) utilizează
        fișierele cookie și tehnologii similare pe site-ul{" "}
        <strong>midaway.ro</strong> /
        <strong> midaway.vercel.app</strong> („Site-ul”). Această politică face
        parte din{" "}
        <Link
          to="/privacy"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          Politica de confidențialitate
        </Link>.
      </p>

      <h2 className="font-cormorant">1. Ce sunt cookie-urile?</h2>
      <p style={{ lineHeight: 1.7 }}>
        Cookie-urile sunt fișiere text mici, stocate pe dispozitivul tău atunci
        când vizitezi un site web. Ele conțin informații care ajută la
        funcționarea corectă a site-ului, la îmbunătățirea experienței
        utilizatorului și la analiza traficului.
      </p>

      <h2 className="font-cormorant">2. Tipurile de cookie-uri pe care le folosim</h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>
          <strong>Cookie-uri esențiale</strong> – necesare pentru funcționarea
          corectă a Site-ului (ex. sesiune, preferințe tehnice, coș de cumpărături).
          Acestea nu pot fi dezactivate.
        </li>
        <li>
          <strong>Cookie-uri funcționale</strong> – rețin preferințele tale
          (ex. limba site-ului, consimțământul privind cookie-urile).
        </li>
        <li>
          <strong>Cookie-uri analitice</strong> – ne ajută să înțelegem cum este
          utilizat Site-ul (ex. pagini vizitate, durata sesiunii) pentru a
          îmbunătăți conținutul și structura. Pot fi furnizate de servicii terțe
          precum <strong>Google Analytics</strong> sau <strong>Vercel Analytics</strong>.
        </li>
        <li>
          <strong>Cookie-uri de marketing / media</strong> – pot proveni de la
          platforme externe integrate (ex. <strong>YouTube</strong>,
          <strong> Spotify</strong>, <strong>Instagram</strong>), care setează
          propriile cookie-uri când conținutul lor este afișat sau redat.
        </li>
      </ul>

      <h2 className="font-cormorant">3. Cookie-uri plasate de terți</h2>
      <p style={{ lineHeight: 1.7 }}>
        Site-ul Midaway poate conține conținut integrat („embed”) de la terți:
        videoclipuri, podcasturi, formulare sau linkuri către platforme externe.
        Aceste servicii (ex. YouTube, Spotify, Formspree, Google Fonts, Facebook,
        TikTok) pot colecta informații despre activitatea ta chiar dacă nu ai un
        cont pe acele platforme. Te încurajăm să consulți politicile lor de
        confidențialitate pentru detalii privind cookie-urile utilizate.
      </p>

      <h2 className="font-cormorant">4. Cum poți gestiona cookie-urile</h2>
      <p style={{ lineHeight: 1.7 }}>
        La prima accesare a Site-ului, poți alege ce tipuri de cookie-uri
        accepți (prin bannerul de consimțământ, dacă este activ). Poți modifica
        oricând aceste opțiuni sau poți șterge cookie-urile existente din
        setările browserului tău.
      </p>
      <p style={{ lineHeight: 1.7 }}>
        Majoritatea browserelor permit: blocarea totală/parțială a cookie-urilor,
        ștergerea automată la închiderea sesiunii și notificări atunci când un
        cookie nou este setat. Reține că blocarea cookie-urilor esențiale poate
        afecta funcționarea anumitor părți ale site-ului (ex. coșul de cumpărături
        sau formularele).
      </p>

      <h2 className="font-cormorant">5. Durata de viață a cookie-urilor</h2>
      <p style={{ lineHeight: 1.7 }}>
        Cookie-urile pot fi:
      </p>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          <strong>de sesiune</strong> – șterse automat când închizi browserul;
        </li>
        <li>
          <strong>persistente</strong> – rămân pe dispozitiv o perioadă
          determinată (de obicei între 1 zi și 12 luni), până la expirare sau
          ștergere manuală.
        </li>
      </ul>

      <h2 className="font-cormorant">6. Consimțământul tău</h2>
      <p style={{ lineHeight: 1.7 }}>
        Utilizând Site-ul și acceptând bannerul de consimțământ, ești de acord
        cu utilizarea cookie-urilor conform acestei Politici. Poți oricând
        retrage consimțământul prin ștergerea cookie-urilor sau ajustarea
        setărilor browserului.
      </p>

      <h2 className="font-cormorant">7. Actualizări ale politicii</h2>
      <p style={{ lineHeight: 1.7 }}>
        Putem actualiza această Politică periodic pentru a reflecta schimbări
        tehnice, legale sau operaționale. Data ultimei actualizări este indicată
        mai sus. Versiunea actualizată va fi disponibilă permanent pe această
        pagină.
      </p>

      <h2 className="font-cormorant">8. Contact</h2>
      <p style={{ lineHeight: 1.7 }}>
        Dacă ai întrebări despre această politică sau despre modul în care
        folosim cookie-urile, ne poți contacta la{" "}
        <a
          href="mailto:contact@midaway.ro"
          style={{ color: "var(--accent)" }}
        >
          contact@midaway.ro
        </a>{" "}
        sau prin{" "}
        <Link
          to="/contact"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          pagina de contact
        </Link>
        .
      </p>
    </div>
  );
}
