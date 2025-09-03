import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Acasă", to: "/" },
  { label: "Cărți", to: "/carti" },
  { label: "Blog", to: "/blog" },
  { label: "Proiecte", to: "/proiecte" },
  { label: "Voluntari", to: "/voluntari" },
  { label: "Călători", to: "/calatori" },
  { label: "Multimedia", to: "/multimedia" },
  { label: "Despre", to: "/despre" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        {/* Logo */}
        <img 
          src="/logo-midaway.png" 
          alt="Midaway logo" 
          style={{ height: 48 }} 
        />

        {/* Navigation */}
        <nav className="nav" style={{ marginLeft: "auto" }}>
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
