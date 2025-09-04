import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

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

export default function App() {
  return (
    <>
      <Header />

      <main className="container" style={{ padding: 24 }}>
        <Routes>
          {/* Acasă */}
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
          <Route path="/privacy" element={<Privacy />} />
<Route path="/termeni" element={<Terms />} />
<Route path="/cookies" element={<Cookies />} />

          {/* Static */}
          <Route path="/despre" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 */}
          <Route path="*" element={<div style={{ padding: 24 }}>Pagina nu există.</div>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
