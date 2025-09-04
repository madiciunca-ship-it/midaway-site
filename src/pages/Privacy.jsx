export default function Privacy() {
    return (
      <div className="container" style={{ padding: "40px 16px", maxWidth: 900 }}>
        <h1 className="font-cormorant" style={{ margin: 0 }}>Politica de confidențialitate</h1>
        <p style={{ opacity: 0.85 }}>
          Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
        </p>
  
        <p>
          Această Politică explică modul în care Asociația Midaway („noi”) colectează, utilizează și
          protejează datele tale personale atunci când folosești site-ul midaway.ro / midaway.vercel.app
          („Site-ul”). Respectăm cadrul legal aplicabil (GDPR).
        </p>
  
        <h2 className="font-cormorant">1. Ce date colectăm</h2>
        <ul>
          <li><strong>Date furnizate direct</strong>: nume, adresă email, mesaj (de ex. prin formularul de contact/voluntari).</li>
          <li><strong>Date tehnice</strong>: adresă IP, tip browser, pagini vizitate, cookies – pentru funcționare și analiză.</li>
          <li><strong>Date tranzacții (dacă este cazul)</strong>: adresă de livrare/facturare, produse comandate (procesate prin terți precum Stripe/PayPal).</li>
        </ul>
  
        <h2 className="font-cormorant">2. De ce folosim datele</h2>
        <ul>
          <li>răspuns la mesaje și solicitări;</li>
          <li>gestionarea înscrierilor la voluntariat/evenimente;</li>
          <li>comenzi, facturare și suport clienți (dacă e magazin activ);</li>
          <li>îmbunătățirea Site-ului și prevenirea abuzurilor.</li>
        </ul>
  
        <h2 className="font-cormorant">3. Temeiul legal</h2>
        <ul>
          <li>consimțământ (ex. newsletter, cookies ne-esențiale);</li>
          <li>executarea unui contract (ex. comenzi);</li>
          <li>interes legitim (securitate, statistici de bază);</li>
          <li>obligații legale (contabilitate, fisc).</li>
        </ul>
  
        <h2 className="font-cormorant">4. Stocare și transfer</h2>
        <p>
          Datele sunt stocate în mod securizat. Putem utiliza furnizori (ex. email, plăți,
          analytics) cu servere în UE sau în afara UE, cu garanții adecvate (SCC).
        </p>
  
        <h2 className="font-cormorant">5. Cât timp păstrăm datele</h2>
        <p>
          Cât e necesar scopului: mesaje — 12 luni; date contabile — conform legii; conturi/voluntari — pe durata proiectului sau până la ștergere la cerere.
        </p>
  
        <h2 className="font-cormorant">6. Drepturile tale</h2>
        <ul>
          <li>acces, rectificare, ștergere;</li>
          <li>restricționare sau opoziție la prelucrare;</li>
          <li>portabilitatea datelor;</li>
          <li>retragerea consimțământului (nu afectează prelucrările anterioare);</li>
          <li>plângere la ANSPDCP.</li>
        </ul>
  
        <h2 className="font-cormorant">7. Cookies & analytics</h2>
        <p>
          Folosim cookies pentru funcționare, preferințe și (opțional) analiză. Vezi
          <a href="/cookies" style={{ color: "var(--accent)", textDecoration: "none" }}> Politica cookies</a>.
        </p>
  
        <h2 className="font-cormorant">8. Securitate</h2>
        <p>Implementăm măsuri tehnice și organizatorice rezonabile pentru protecția datelor.</p>
  
        <h2 className="font-cormorant">9. Contact</h2>
        <p>
          Pentru orice solicitare legată de date: <a href="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>Contact</a> sau email (dacă dorești, adăugăm adresa oficială).
        </p>
      </div>
    );
  }
  