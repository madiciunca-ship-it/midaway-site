import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* === Carousel local (în același fișier pentru simplitate) === */
function Carousel({ slides }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="container">
      <div className="carousel">
        {slides.map((s, idx) => (
          <img
            key={idx}
            src={s.src}
            alt={s.alt}
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
        <div className="caption-overlay" />
        <div className="caption font-cormorant" style={{ fontSize: 18 }}>
          {slides[i].caption}
        </div>
        <div className="dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          className="arrow left"
          onClick={() => setI((i - 1 + slides.length) % slides.length)}
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          className="arrow right"
          onClick={() => setI((i + 1) % slides.length)}
          aria-label="Următor"
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* === Pagina HOME === */
export default function Home() {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
      alt: "Dune și urme de pași",
      caption: "Pași pe nisipul timpului",
    },
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
      alt: "Munți și cețuri",
      caption: "Drumuri ce duc înlăuntru",
    },
    {
      src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1400&auto=format&fit=crop",
      alt: "Oameni în mișcare",
      caption: "Oamenii sunt povești vii",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero hero--compact">
        <div className="font-cormorant">
          <h1 style={{ fontSize: 64, letterSpacing: ".02em", margin: 0 }}>
            MIDAWAY
          </h1>
          <p
            style={{
              color: "var(--secondary)",
              fontStyle: "italic",
              marginTop: 8,
            }}
          >
            „Povești de la capătul lumii”
          </p>
          <p
            style={{
              maxWidth: 720,
              margin: "24px auto 0",
              fontSize: 20,
              lineHeight: 1.6,
            }}
          >
            Mă numesc Mida Malena. Scriu și călătoresc, adun povești și le las
            să circule mai departe.
            <br />
            Midaway este spațiul unde cărțile, oamenii și drumurile se împletesc.
          </p>

          <div style={{ marginTop: 24 }}>
            <Link className="btn" to="/proiecte">
              Explorează proiectul
            </Link>
          </div>
        </div>
      </section>

            {/* SECȚIUNI RAPIDE */}
            <div id="sectiuni" className="container">
        <div className="cards">
          {/* CĂRȚI */}
          <Link to="/carti" className="card" style={{ background: "var(--card1)", color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>Cărți</h3>
            <p style={{ margin: 0 }}>Cărți care inspiră și provoacă gândirea.</p>
          </Link>

          {/* BLOG */}
          <Link to="/blog" className="card" style={{ background: "var(--card2)", color: "#fff", textDecoration: "none", cursor: "pointer" }}>
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>Blog</h3>
            <p style={{ margin: 0 }}>Gânduri, povești și reflecții din drum.</p>
          </Link>

          {/* VOLUNTARIAT */}
          <Link to="/voluntari" className="card" style={{ background: "var(--card3)", color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>Voluntariat</h3>
            <p style={{ margin: 0 }}>Fii parte din comunitatea noastră creativă.</p>
          </Link>
        </div>
      </div>


      {/* BANNER ROTATIV */}
      <Carousel slides={slides} />
    </>
  );
}

