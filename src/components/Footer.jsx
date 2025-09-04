export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bar">
        <div>
          <img src="/logo-midaway.png" alt="Midaway logo" className="footer-logo" />
        </div>
        <div className="footer-links">
          <a href="/privacy">Politica de confidențialitate</a>
          <span>•</span>
          <a href="/termeni">Termeni & condiții</a>
          <span>•</span>
          <a href="/cookies">Politica cookies</a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} • MIDAWAY • Toate drepturile rezervate • Asociația Midaway
        </div>
      </div>
    </footer>
  );
}

  