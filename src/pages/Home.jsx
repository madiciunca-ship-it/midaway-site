import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* === Carousel local (în același fișier pentru simplitate) === */
function Carousel({ slides }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!slides?.length) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides?.length) return null;

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
  // Carousel – pozele tale din /public/hero/
  const slides = [
    {
      src: "/hero/side1.webp",
      alt: "Apus de soare peste ocean",
      caption: "Liniștea de la capătul lumii — începutul unei noi povești.",
    },
    {
      src: "/hero/side2.webp",
      alt: "Insulă tropicală în mijlocul oceanului",
      caption: "Uneori, lumea întreagă încape într-o insulă de liniște.",
    },
    {
      src: "/hero/side3.webp",
      alt: "Barcă pe plajă, printre frunze de coastă",
      caption: "Drumul continuă — cu fiecare pagină, cu fiecare val.",
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
            „Cărți care pornesc la drum”
          </p>
          <p style={{ color: "var(--secondary)", marginTop: 6, fontSize: 16 }}>
  print & digital  • ro / en •  editare & design
</p>

          <p
            style={{
              maxWidth: 720,
              margin: "24px auto 0",
              fontSize: 22,
              lineHeight: 1.6,
            }}
          >
            Midaway este o editură independentă. Publicăm literatură de
            călătorie, jurnale și eseuri care inspiră, dau curaj, pun întrebări și creează legături.
          </p>

          <div style={{ marginTop: 24 }}>
            <Link className="btn" to="/proiecte">
              VIZIUNEA MIDAWAY
            </Link>
          </div>
        </div>
      </section>

      {/* SECȚIUNI RAPIDE */}
      <div id="sectiuni" className="container">
        <div className="cards">
          {/* CĂRȚI */}
          <Link
            to="/carti"
            className="card"
            style={{
              background: "var(--card1)",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
              Cărți
            </h3>
            <p style={{ margin: 0 }}>
            Inspirație, provocare, visuri îndrăznețe.
            </p>
          </Link>

          {/* AUTORI (din Viziune) */}
<Link
  to="/proiecte/autori"
  className="card"
  style={{
    background: "var(--card2)",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  }}
>
  <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
    Autori
  </h3>
  <p style={{ margin: 0 }}>
    Vocile independente care scriu lumea.
  </p>
</Link>

{/* CĂLĂTORI */}
<Link
  to="/calatori"
  className="card"
  style={{
    background: "var(--card3)",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
  }}
>
  <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
    Călători
  </h3>
  <p style={{ margin: 0 }}>
    Povești reale, interviuri, galerie de drum.
  </p>
</Link>

{/* GHIZI (nou) */}
<Link
  to="/ghizi"
  className="card"
  
    style={{
      background: "#CDB7E3",   // direct hex, test rapid
      color: "#2C2430",
      textDecoration: "none",
      cursor: "pointer",
    }}
>
  <h3 className="font-cormorant" style={{ marginTop: 0, fontSize: 22 }}>
    Ghizi
  </h3>
  <p style={{ margin: 0 }}>
    Oameni care trăiesc locul pe care îl arată – recomandări din inimă.
  </p>
</Link>

</div>
      </div>


      {/* BANNER ROTATIV */}
      <Carousel slides={slides} />
    </>
  );
}
