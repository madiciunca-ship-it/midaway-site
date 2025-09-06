export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bar">
        {/* rândul 1 de linkuri */}
        <div className="footer-links">
        <a
  href="/feed.xml"
  rel="alternate"
  type="application/rss+xml"
  target="_blank"
  title="Abonează-te la RSS (se deschide în tab nou)"
>
  RSS
</a>

          <span> · </span>
          <a href="/privacy">Politica de confidențialitate</a>
          <span> · </span>
          <a href="/termeni">Termeni & condiții</a>
          <span> · </span>
          <a href="/cookies">Politica cookies</a>
        </div>

        {/* rândul 2 de linkuri */}
        <div className="footer-links">
          <a href="/donate">Donații</a>
          <span> · </span>
          <a href="/sponsorizari">Sponsorizări</a>
          <span> · </span>
          <a href="mailto:contact@midaway.ro">contact@midaway.ro</a>
        </div>
      </div>
    </footer>
  );
}
