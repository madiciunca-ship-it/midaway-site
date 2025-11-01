import { Link } from "react-router-dom";
import { SITE_FLAGS } from "../config";

export default function Footer() {
  const showDon = SITE_FLAGS.showDonations;
  const showSpon = SITE_FLAGS.showSponsorships;

  return (
    <footer className="footer">
      <div className="container footer-bar">
        <div className="footer-links">
          <a href="/feed.xml" rel="alternate">RSS</a>
          <span>•</span>
          <Link to="/termeni">Termeni & condiții</Link>
          <span>•</span>
          <Link to="/politica-confidentialitate">Politica de confidențialitate</Link>
          <span>•</span>
          <Link to="/politica-cookies">Politica cookies</Link>
          <span>•</span>
          <Link to="/politica-descarcare">Politica de descărcare eBook</Link>
        </div>

        <div className="footer-links">
          {showDon && (
            <>
              <Link to="/donatii">Donații</Link>
              <span>•</span>
            </>
          )}
          {showSpon && (
            <>
              <Link to="/sponsorizari">Sponsorizări</Link>
              <span>•</span>
            </>
          )}
          <Link to="/contact">Contact</Link>
          <span>•</span>
          <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        </div>

        <div className="footer-copy">© 2025 MIDAWAY</div>
      </div>
    </footer>
  );
}
