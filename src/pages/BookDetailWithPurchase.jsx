// src/pages/BookDetailWithPurchase.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import BookPurchasePanel from "../components/BookPurchasePanel";
import { BOOKS } from "../data/books";

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
  const book = useMemo(() => findBookByIdOrAlias(id), [id]);

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

    // 4) Aranjează secțiunea „Poate te mai interesează”
    try {
      const h3 = Array.from(document.querySelectorAll("h3")).find((el) =>
        (el.textContent || "")
          .trim()
          .toLowerCase()
          .includes("poate te mai interesează")
      );
      if (h3) {
        const grid = h3.nextElementSibling;
        if (grid && grid.tagName === "DIV") {
          grid.classList.add("related-grid");

          Array.from(grid.querySelectorAll("a")).forEach((card) => {
            card.classList.add("related-card");

            // primul <div> din card e cel cu backgroundImage
            const coverDiv = card.querySelector("div");
            if (coverDiv && coverDiv.style && coverDiv.style.backgroundImage) {
              coverDiv.classList.add("related-coverWrap");
              coverDiv.style.height = "160px";
              coverDiv.style.padding = "12px";
              coverDiv.style.backgroundSize = "contain";
              coverDiv.style.backgroundPosition = "center";
              coverDiv.style.backgroundRepeat = "no-repeat";
              coverDiv.style.backgroundColor = "#f8f3ea";
            }
          });
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

      {/* 3️⃣ Panoul nostru (mutat sub „Citește un fragment”) */}
      <div ref={panelRef}>
        <BookPurchasePanel bookId={id} />
      </div>

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
