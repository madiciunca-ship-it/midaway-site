import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail"; 
import Volunteers from "./pages/Volunteers";
import Travelers from "./pages/Travelers";
import TravelerDetail from "./pages/TravelerDetail";
import Multimedia from "./pages/Multimedia";


const LinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      padding: "8px 12px",
      borderRadius: 10,
      textDecoration: "none",
      color: isActive ? "#000" : "#555",
      background: isActive ? "#f1f1f1" : "transparent",
    })}
    end
  >
    {children}
  </NavLink>
);

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(6px)",
          background: "rgba(255,255,255,0.7)",
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "12px 16px",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 18 }}>📚 Midaway</div>
          <nav
            style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            <LinkItem to="/">Acasă</LinkItem>
            <LinkItem to="/carti">Cărți</LinkItem>
            <LinkItem to="/blog">Blog</LinkItem>
            <LinkItem to="/proiecte">Proiecte</LinkItem>
            <LinkItem to="/voluntari">Voluntari</LinkItem>
            <LinkItem to="/calatori">Călători</LinkItem>
            <LinkItem to="/multimedia">Multimedia</LinkItem>
            <LinkItem to="/despre">Despre</LinkItem>
            <LinkItem to="/contact">Contact</LinkItem>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Cărți */}
          <Route path="/carti" element={<Books />} />
          <Route path="/carti/:id" element={<BookDetail />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* Alte secțiuni */}
          <Route path="/proiecte" element={<Projects />} />
          <Route path="/proiecte/:id" element={<ProjectDetail />} />
          <Route path="/voluntari" element={<Volunteers />} />
          <Route path="/calatori" element={<Travelers />} />
<Route path="/calatori/:id" element={<TravelerDetail />} />

          <Route path="/multimedia" element={<Multimedia />} />

          {/* Static */}
          <Route path="/despre" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Catch-all */}
          <Route
            path="*"
            element={<div style={{ padding: 24 }}>Pagina nu există.</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
