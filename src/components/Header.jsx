import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Acasă", to: "/" },
  { label: "Cărți", to: "/carti" },
  { label: "Blog", to: "/blog" },
  { label: "Proiecte", to: "/proiecte" },
  { label: "Voluntari", to: "/voluntari" },
  { label: "Călători", to: "/calatori" },
  { label: "Multimedia", to: "/multimedia" },
  { label: "Donații", to: "/donatii" },            // ← AICI lipsea!
  { label: "Sponsorizări", to: "/sponsorizari" },
  { label: "Despre", to: "/despre" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header-inner" style={{ gap: 16 }}>
        {/* Logo */}
        <img
          src="/logo-midaway.png"
          alt="Midaway logo"
          style={{ height: 44, width: "auto", display: "block", borderRadius: 8 }}
        />

        {/* Desktop nav */}
        {!isMobile && (
          <nav
            className="nav"
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              fontSize: 15,
            }}
          >
            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                style={{ padding: "6px 10px", borderRadius: 10 }}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Mobile toggle */}
        {isMobile && (
          <button
            className="mobile-toggle"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div className={`mobile-menu${open ? " open" : ""}`}>
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={close}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
