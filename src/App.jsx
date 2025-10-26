// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminOrders from "./pages/AdminOrders";

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail"; // păstrat pt. alte importuri interne
import BookDetailWithPurchase from "./pages/BookDetailWithPurchase";
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
import Donate from "./pages/Donate";
import Sponsorizari from "./pages/Sponsorizari";
import ThanksNewsletter from "./pages/ThanksNewsletter";

import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

// ✅ doar ClearCartOnThanks, FĂRĂ CartProvider aici
import { ClearCartOnThanks } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import ThanksOrder from "./pages/ThanksOrder.jsx";

// flags + wrapper route
import { SITE_FLAGS } from "./config";
import ProtectedFlagRoute from "./components/ProtectedFlagRoute";

export default function App() {
  return (
    <>
      {/* golește coșul automat când ajungem pe /thanks */}
      <ClearCartOnThanks />

      <Header />

      <main className="container">
        <Routes>
          {/* Acasă */}
          <Route path="/" element={<Home />} />

          {/* Cărți */}
          <Route path="/carti" element={<Books />} />
          <Route path="/carti/:id" element={<BookDetailWithPurchase />} />
          <Route path="/carti/o-zi-de-care-sa-ti-amintesti-ebook" element={<BookDetailWithPurchase />} />

          {/* ✅ Admin – prinde /admin, /admin/, /admin/* și /admin/orders */}
          <Route path="/admin" element={<AdminOrders />} />
          <Route path="/admin/*" element={<AdminOrders />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* Proiecte */}
          <Route path="/proiecte" element={<Projects />} />
          <Route path="/proiecte/:id" element={<ProjectDetail />} />

          {/* Pagini controlate prin flags */}
          <Route
            path="/donatii"
            element={
              <ProtectedFlagRoute
                flag={SITE_FLAGS.showDonations}
                element={<Donate />}
              />
            }
          />
          <Route
            path="/sponsorizari"
            element={
              <ProtectedFlagRoute
                flag={SITE_FLAGS.showSponsorships}
                element={<Sponsorizari />}
              />
            }
          />
          <Route
            path="/voluntari"
            element={
              <ProtectedFlagRoute
                flag={SITE_FLAGS.showVolunteers}
                element={<Volunteers />}
              />
            }
          />

          {/* Alte secțiuni */}
          <Route path="/calatori" element={<Travelers />} />
          <Route path="/calatori/:id" element={<TravelerDetail />} />
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="/multumim-newsletter" element={<ThanksNewsletter />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks" element={<ThanksOrder />} />

          {/* Legale */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/termeni" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/multumesc-newsletter" element={<ThanksNewsletter />} />

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
