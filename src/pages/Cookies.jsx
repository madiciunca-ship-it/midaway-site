import { Link } from "react-router-dom";

export default function Cookies() {
  return (
    <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
      <h1 className="font-cormorant" style={{ margin: 0 }}>Politica cookies</h1>
      <p style={{ opacity: 0.85 }}>
        Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
      </p>

      <h2 className="font-cormorant">1. Ce sunt cookie-urile?</h2>
      <p>
        Cookie-urile sunt fișiere mici stocate pe dispozitivul tău când vizitezi Site-ul.
        Ele ajută la funcționarea corectă, la analiză și la personalizarea experienței.
      </p>

      <h2 className="font-cormorant">2. Tipuri de cookie-uri pe care le folosim</h2>
      <ul>
        <li><strong>Esențiale</strong> – necesare pentru funcționarea Site-ului.</li>
        <li><strong>Funcționale</strong> – rețin preferințe (ex. limbă).</li>
        <li><strong>Analitice</strong> – statistici de utilizare (ex. pagini vizitate).</li>
        <li><strong>Marketing</strong> (dacă este cazul) – pentru conținut și oferte relevante.</li>
      </ul>

      <h2 className="font-cormorant">3. Cum poți controla cookie-urile</h2>
      <p>
        Poți seta browserul să blocheze/șteargă cookie-urile sau să te avertizeze când un cookie este
        setat. Reține că blocarea cookie-urilor esențiale poate afecta funcționarea Site-ului.
      </p>

      <h2 className="font-cormorant">4. Instrumente terțe</h2>
      <p>
        Putem folosi servicii terțe (ex. analytics). Acestea pot seta propriile cookie-uri, conform politicilor lor.
      </p>

      <h2 className="font-cormorant">5. Consimțământ</h2>
      <p>
        La prima vizită poți alege ce categorii de cookie-uri accepți (dacă implementăm un banner de consimțământ). Îți poți schimba opțiunile ulterior.
      </p>

      <h2 className="font-cormorant">6. Contact</h2>
      <p>
        Întrebări despre cookie-uri?{" "}
        <Link to="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Contactează-ne
        </Link>.
      </p>
    </div>
  );
}
