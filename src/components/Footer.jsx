import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bar">
        {/* Logo – mobil only (se ascunde pe desktop din CSS) */}
        <img
          className="footer-logo"
          src="/logo-midaway.png"
          alt="Midaway"
          height={28}
        />

        {/* Links */}
        <div className="footer-links">
          {/* RSS (unic) */}
          <a href="/feed.xml" rel="alternate">RSS</a>

          <span>·</span>
          <Link to="/privacy">Politica de confidențialitate</Link>
          <span>·</span>
          <Link to="/termeni">Termeni & condiții</Link>
          <span>·</span>
          <Link to="/cookies">Politica cookies</Link>
        </div>

        {/* Sub-linie (donatii/contact) */}
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
