// src/components/Header.jsx
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// 👇 cart context + drawer
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer.jsx";

// 👇 flags
import { SITE_FLAGS } from "../config";

const navItems = [
  { label: "Acasă", to: "/" },
  { label: "Cărți", to: "/carti" },
  { label: "Blog", to: "/blog" },
  { label: "Proiecte", to: "/proiecte" },
  { label: "Voluntari", to: "/voluntari" },
  { label: "Călători", to: "/calatori" },
  { label: "Multimedia", to: "/multimedia" },
  { label: "Donații", to: "/donatii" },
  { label: "Sponsorizări", to: "/sponsorizari" },
  { label: "Despre", to: "/despre" },
  { label: "Contact", to: "/contact" },
];

// filtrează rutele controlate de flags
function applyFlags(items) {
  return items.filter(({ to }) => {
    if (to === "/donatii" && !SITE_FLAGS.showDonations) return false;
    if (to === "/sponsorizari" && !SITE_FLAGS.showSponsorships) return false;
    if (to === "/voluntari" && !SITE_FLAGS.showVolunteers) return false;
    return true;
  });
}

export default function Header() {
  const [open, setOpen] = useState(false);          // mobile menu
  const [isMobile, setIsMobile] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);  // drawer coș
  const { count } = useCart();                      // badge

  // debug – vezi în consolă când toggle-zi coșul
  useEffect(() => {
    console.log("[HEADER] cartOpen =", cartOpen);
  }, [cartOpen]);

  // detectează viewport pentru nav desktop/mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const close = () => setOpen(false);

  // stil buton coș
  const cartBtnStyle = {
    position: "relative",
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };

  const badgeStyle = {
    position: "absolute",
    top: -6,
    right: -6,
    background: "#d4a017",
    color: "#fff",
    borderRadius: 999,
    padding: "2px 6px",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1,
  };

  const visibleNavItems = applyFlags(navItems);

  return (
    <header className="header">
      <div
        className="container header-inner"
        style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0" }}
      >
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
            {visibleNavItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                style={{ padding: "6px 10px", borderRadius: 10 }}
              >
                {label}
              </NavLink>
            ))}

            {/* buton coș (desktop) */}
            <button
              onClick={() => {
                console.log("🧺 [HEADER] click — setCartOpen(true)");
                setCartOpen(true);
              }}
              aria-label="Deschide coșul"
              style={cartBtnStyle}
            >
              🧺 Coș
              {count > 0 && <span style={badgeStyle}>{count}</span>}
            </button>
          </nav>
        )}

        {/* Mobile actions (coș + toggle) */}
        {isMobile && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {/* buton coș (mobile) */}
            <button
              onClick={() => {
                console.log("🧺 [HEADER] click — setCartOpen(true)");
                setCartOpen(true);
              }}
              aria-label="Deschide coșul"
              style={cartBtnStyle}
            >
              🧺 Coș
              {count > 0 && <span style={badgeStyle}>{count}</span>}
            </button>

            {/* Mobile toggle */}
            <button
              className="mobile-toggle"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              style={{
                padding: 8,
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#fff",
                display: "inline-flex",
              }}
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
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div className={`mobile-menu${open ? " open" : ""}`}>
          {visibleNavItems.map(({ label, to }) => (
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

      {/* drawer coș (comun desktop & mobile) */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
