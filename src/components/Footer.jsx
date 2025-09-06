export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bar">
        <div className="footer-links">
          {/* RSS la început ca să fie vizibil */}
          <a href="/feed.xml" rel="alternate">RSS</a>
          <span>•</span>
          <a href="/privacy">Politica de confidențialitate</a>
          <span>•</span>
          <a href="/termeni">Termeni & condiții</a>
          <span>•</span>
          <a href="/cookies">Politica cookies</a>
        </div>

        <div className="footer-links">
          <a href="/donate">Donații</a>
          <span>•</span>
          <a href="/sponsorizari">Sponsorizări</a>
          <span>•</span>
          <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        </div>
      </div>
    </footer>
  );
}
