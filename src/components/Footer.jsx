import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bar">
        <div className="footer-links">
          <a href="/feed.xml" rel="alternate">RSS</a>
          <span>•</span>
          <Link to="/privacy">Politica de confidențialitate</Link>
          <span>•</span>
          <Link to="/termeni">Termeni & condiții</Link>
          <span>•</span>
          <Link to="/cookies">Politica cookies</Link>
        </div>

        <div className="footer-links">
          <Link to="/donatii">Donații</Link>
          <span>•</span>
          <Link to="/sponsorizari">Sponsorizări</Link>
          <span>•</span>
          <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        </div>

        <div className="footer-copy">© 2025 MIDAWAY</div>
      </div>
    </footer>
  );
}
