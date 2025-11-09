// src/pages/BookDetailWithPurchase.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import BookDetail from "./BookDetail";
import { recommendBooks } from "../utils/recommendations";


import { BOOKS } from "../data/books";
import BookPurchasePanel, { FormatSpecs } from "../components/BookPurchasePanel";

function findBookByIdOrAlias(bookId) {
  if (!bookId) return null;
  const direct = BOOKS.find((b) => b.id === bookId);
  if (direct) return direct;

  const s = String(bookId).toLowerCase();
  if (s.startsWith("o-zi-de-care-sa-ti-amintesti")) {
    return BOOKS.find((b) => b.id === "o-zi-ro") || null;
  }
  if (s === "vietnam" || s === "2") {
    return BOOKS.find((b) => b.id === "vietnam-ro") || null;
  }
  return null;
}

export default function BookDetailWithPurchase() {
  const { id } = useParams();
  const panelRef = useRef(null);
  const specsRef = useRef(null); // 👈 NOU – containerul pentru specificațiile pe format
  const book = useMemo(() => findBookByIdOrAlias(id), [id]);
  const related = recommendBooks(book, 3);
  const location = useLocation();
  const base = location.pathname.startsWith("/carti") ? "/carti" : "/books";


  useEffect(() => {
    if (!book) return;

    // 1) Ascunde UI-ul vechi de cumpărare
    const hideBlocks = (startsWith) => {
      Array.from(document.querySelectorAll("button, a, span")).forEach((el) => {
        const t = (el.textContent || "").trim();
        if (t.startsWith(startsWith)) {
          el.style.display = "none";
          if (el.nextElementSibling && el.nextElementSibling.tagName === "DIV") {
            el.nextElementSibling.style.display = "none";
          }
        }
      });
    };
    hideBlocks("📄 Cumpără PDF");
    hideBlocks("📘 Cumpără EPUB");
    hideBlocks("🛒 Cumpără Paperback");
    hideBlocks("🎧 Audiobook");

    // 2) Marcare grilă principală + coloana cu coperți (o ascundem)
    try {
      const grid =
        Array.from(document.querySelectorAll("div")).find((el) => {
          const s = el.getAttribute("style") || "";
          return (
            s.includes('display: "grid"') ||
            (getComputedStyle(el).display === "grid" &&
              s.includes("minmax(220px"))
          );
        }) ||
        Array.from(document.querySelectorAll("div")).find((el) => {
          const cs = getComputedStyle(el);
          return (
            cs.display === "grid" &&
            (cs.gridTemplateColumns || "").includes("minmax(220px")
          );
        });

      if (grid) {
        grid.classList.add("bd-grid");
        const coversCol = grid.firstElementChild;
        if (coversCol) coversCol.classList.add("bd-covers-col");
      }
    } catch (_) {}

    // 3) Mutăm panelul nostru sub „📖 Citește un fragment”
    try {
      const fragmentBtn = Array.from(
        document.querySelectorAll("a, button")
      ).find((el) =>
        (el.textContent || "").trim().startsWith("📖 Citește un fragment")
      );
      const panelEl = panelRef.current;
      if (fragmentBtn && panelEl && panelEl.parentElement) {
        fragmentBtn.parentElement.insertAdjacentElement("afterend", panelEl);
      }
    } catch (_) {}

    // 3.5) Inserăm „Specificații pe format” imediat sub „Detalii tehnice”
    try {
      // găsește heading-ul „Detalii tehnice”
      const h2 = Array.from(document.querySelectorAll("h2, h3")).find((el) =>
        (el.textContent || "").trim().toLowerCase().includes("detalii tehnice")
      );
      if (h2) {
        // cel mai des, lista <ul> e imediat după heading
        const ul =
          h2.nextElementSibling && h2.nextElementSibling.tagName === "UL"
            ? h2.nextElementSibling
            : null;

        const host = specsRef.current;
        if (ul && host) {
          ul.insertAdjacentElement("afterend", host);
        } else if (host) {
          // fallback: dacă nu e UL imediat, punem după heading
          h2.insertAdjacentElement("afterend", host);
        }
      }
    } catch (_) {}
  }, [book]);

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* CSS necesar */}
      <style>{`
        /* coperțile SUS (față+spate) – centrate, responsive */
        .book-covers-top{
          display:flex; justify-content:center; align-items:flex-start;
          gap:20px; margin:20px auto 28px; flex-wrap:wrap;
        }
        .book-covers-top .coverBox{
          flex:0 1 340px; max-width:46%;
          border:1px solid #eee; border-radius:12px; overflow:hidden;
          background:#fafafa; box-shadow:0 6px 18px rgba(0,0,0,.08);
        }
        .book-covers-top img{ width:100%; height:auto; display:block; }
        @media (max-width:768px){
          .book-covers-top{ gap:12px; margin:12px auto 20px; }
          .book-covers-top .coverBox{ max-width:92%; }
        }

        /* Fix grila din BookDetail.jsx: o facem 1 coloană și ascundem coloana de coperți */
        .bd-grid{ display:block !important; }
        .bd-grid > .bd-covers-col{ display:none !important; }

        /* related: carduri compacte, pe centru */
        .related-grid{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 220px));
          gap:16px;
          justify-content:center;
        }
        .related-card{
          text-decoration:none;
          color:inherit;
          border:0 !important;
          border-radius:12px;
          overflow:hidden;
          background:#fff;
          box-shadow:0 4px 12px rgba(0,0,0,.08);
          max-width:220px;
          margin:0 auto;
        }
        .related-card > div:last-child{ padding:12px; text-align:center; }
        .related-coverWrap{
          background:#f8f3ea;
          display:grid;
          place-items:center;
          height:160px;
          padding:12px;
        }
      `}</style>

      {/* 1️⃣ Coperțile sus, centrate (față + spate) */}
      {book && (
        <div className="book-covers-top">
          <div className="coverBox">
            <img
              src={book.coverUrl || book.cover || ""}
              alt={book.title || "Coperta față"}
              loading="lazy"
            />
          </div>
          {book.extraImage && (
            <div className="coverBox">
              <img src={book.extraImage} alt="Coperta spate" loading="lazy" />
            </div>
          )}
        </div>
      )}

      {/* 2️⃣ Conținutul original (titlu, descriere, detalii, etc.) */}
      <BookDetail />

      {/* 2.5️⃣ Container invizibil – îl inserăm sub „Detalii tehnice” via useEffect */}
      <div ref={specsRef} style={{ display: "block" }}>
        {book && <FormatSpecs book={book} />}
      </div>

      {/* 3️⃣ Panoul nostru (mutat sub „Citește un fragment”) */}
      <div ref={panelRef}>
        <BookPurchasePanel bookId={id} />
      </div>

      {/* 4️⃣ Recomandări dinamice */}
      {related.length > 0 && (
  <section className="mt-12">
    <h3 className="text-xl font-semibold mb-4">Poate te mai interesează</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {related.map((b) => (
        <Link
          key={b.id}
          to={`${base}/${b.id}`}   // 👈 aici e cheia
          className="block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="w-full aspect-[3/4] bg-[#f8f3ea] flex items-center justify-center">
            <img
              src={b.coverUrl}
              alt={b.title}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="p-4 text-center">
            <div className="font-semibold">{b.title}</div>
            {b.subtitle && (
              <div className="text-slate-600 text-sm mt-1">{b.subtitle}</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  </section>
)}



      {/* 4️⃣ Model invizibil pentru viitoare cărți (util în editor/teste) */}
      <div className="book-model" style={{ display: "none" }} data-model="true">
        <div className="coverBox">
          <img src="/placeholder-cover.png" alt="Model Cover" />
        </div>
        <div className="meta">
          <h3>Model Title</h3>
          <p>Model subtitle</p>
        </div>
      </div>
    </div>
  );
}
