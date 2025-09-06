// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bar">
        {/* stânga (copyright) */}
        <div className="footer-copy">© {new Date().getFullYear()} MIDAWAY</div>

        {/* mijloc (links legale) */}
        <div className="footer-links">
        // în interiorul unuia dintre <div className="footer-links"> ... </div>
<a href="/rss.xml" rel="alternate">RSS</a>
          <Link to="/privacy">Politica de confidențialitate</Link>
          <span>·</span>
          <Link to="/termeni">Termeni & condiții</Link>
          <span>·</span>
          <Link to="/cookies">Politica cookies</Link>
        </div>

        {/* dreapta (acțiuni utile) */}
        <div className="footer-links">
          <Link to="/donatii">Donații</Link>
          <span>·</span>
          <Link to="/sponsorizari">Sponsorizări</Link>
          <span>·</span>
          <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        </div>
      </div>
    </footer>
  );
}
