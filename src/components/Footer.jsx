export default function Footer() {
    return (
      <footer className="footer">
        <div className="container footer-bar">
          <div className="footer-links">
            <a href="/privacy">Politica de confidențialitate</a>
            <span>•</span>
            <a href="/termeni">Termeni & condiții</a>
            <span>•</span>
            <a href="/cookies">Politica cookies</a>
          </div>
          <div style={{ textTransform: "uppercase", letterSpacing: ".2em", color: "rgba(28,42,46,.8)" }}>
            © {new Date().getFullYear()} • MIDAWAY • Toate drepturile rezervate • Asociația Midaway
          </div>
        </div>
      </footer>
    );
  }
  