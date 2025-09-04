export default function Terms() {
    return (
      <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
        <h1 className="font-cormorant" style={{ margin: 0 }}>Termeni & condiții</h1>
        <p style={{ opacity: 0.85 }}>
          Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
        </p>
  
        <h2 className="font-cormorant">1. Acceptarea termenilor</h2>
        <p>
          Accesând și utilizând Site-ul, ești de acord cu acești termeni. Dacă nu ești de acord,
          te rugăm să nu utilizezi Site-ul.
        </p>
  
        <h2 className="font-cormorant">2. Conținut & proprietate intelectuală</h2>
        <p>
          Conținutul (texte, imagini, logo, materiale) aparține Asociației Midaway sau partenerilor
          și este protejat de drepturi de autor. Nu este permisă reproducerea fără acord.
        </p>
  
        <h2 className="font-cormorant">3. Conturi și interacțiune</h2>
        <p>
          Dacă îți creezi cont sau trimiți conținut (ex. comentarii), ești responsabil de
          acuratețea informațiilor și de comportament civilizat. Ne rezervăm dreptul de a modera.
        </p>
  
        <h2 className="font-cormorant">4. Comenzi & plăți (dacă este cazul)</h2>
        <p>
          Pentru produse/servicii oferite, plata poate fi procesată prin terți (Stripe/PayPal).
          Prețurile pot fi actualizate. Vei primi confirmare pe email. Politicile de livrare și
          retur vor fi afișate la plasarea comenzii.
        </p>
  
        <h2 className="font-cormorant">5. Limitarea răspunderii</h2>
        <p>
          Site-ul este oferit „ca atare”. Nu garantăm lipsa absolută de erori sau disponibilitate
          continuă. Nu răspundem pentru pierderi indirecte rezultate din utilizarea Site-ului.
        </p>
  
        <h2 className="font-cormorant">6. Linkuri externe</h2>
        <p>Site-ul poate conține linkuri către terți; nu suntem responsabili pentru conținutul lor.</p>
  
        <h2 className="font-cormorant">7. Modificări</h2>
        <p>
          Putem actualiza oricând acești termeni. Continuarea utilizării după publicare
          înseamnă acceptarea noilor termeni.
        </p>
  
        <h2 className="font-cormorant">8. Legea aplicabilă</h2>
        <p>Termenii sunt guvernați de legea română. Litigiile se soluționează de instanțele competente din România.</p>
  
        <h2 className="font-cormorant">9. Contact</h2>
        <p>
          Pentru întrebări privind acești termeni: <a href="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>Contact</a>.
        </p>
      </div>
    );
  }
  