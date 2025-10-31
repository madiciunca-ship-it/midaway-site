// src/pages/BookDetailWithPurchase.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import BookPurchasePanel from "../components/BookPurchasePanel";
import { BOOKS } from "../data/books";

// ——— aliasuri existente
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
    // 1) ascunde vechiul UI de cumpărare (păstrăm exact cum aveam)
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

    // 2) mută panelul nou sub „Citește un fragment”
    try {
      const fragmentBtn = Array.from(document.querySelectorAll("a, button")).find((el) =>
        (el.textContent || "").trim().startsWith("📖 Citește un fragment")
      );
      const panelEl = panelRef.current;
      if (fragmentBtn && panelEl && panelEl.parentElement) {
        fragmentBtn.parentElement.insertAdjacentElement("afterend", panelEl);
      }
    } catch (_) {}

    // 3) fallback copertă (nu atinge layout-ul)
    const bestCover =
      book?.cover ||
      book?.coverUrl ||
      book?.image ||
      book?.extraImage ||
      (Array.isArray(book?.images) ? book.images[0] : null) ||
      null;

    if (bestCover && book?.title) {
      try {
        const titleLc = String(book.title).toLowerCase();
        const imgs = Array.from(document.querySelectorAll("img"));
        imgs.forEach((img) => {
          const altLc = String(img.getAttribute("alt") || "").toLowerCase();
          const isPlaceholder =
            img.src.endsWith("/placeholder-cover.png") || /placeholder/i.test(img.src);
          if (isPlaceholder || altLc.includes(titleLc)) {
            img.src = bestCover;
            img.decoding = "async";
            img.referrerPolicy = "no-referrer";
            img.onerror = () => {
              if (img.src !== "/placeholder-cover.png") {
                img.src = "/placeholder-cover.png";
              }
            };
          }
        });
      } catch (_) {}
    }

    // 4) marchează corect coloana ORIGINALĂ de coperți + grila mare
    //    ca să o putem ascunde DOAR pe mobil din CSS
    try {
      const titleLc = String(book?.title || "").toLowerCase();
      const imgs = Array.from(document.querySelectorAll("img"));
      const coverImg =
        imgs.find((i) => (i.alt || "").trim().toLowerCase() === titleLc) ||
        imgs.find((i) => (i.src || "").includes(book?.coverUrl || ""));

      if (coverImg) {
        // coloana (div-ul părinte) care conține coperta din BookDetail.jsx
        let column = coverImg.closest("div");
        if (column) {
          // urcă până la coloana reală (cea care conține și spatele)
          while (column.parentElement && column.parentElement.children.length === 1) {
            column = column.parentElement;
          }
          column.classList.add("original-covers");
          // marchează containerul grilei (2 coloane pe desktop)
          const grid = column.parentElement;
          if (grid) grid.classList.add("book-grid-2");
        }
      }

      // related → reformatăm cardurile (fără margini groase, text centrat)
      const h3 = Array.from(document.querySelectorAll("h3")).find((el) =>
        (el.textContent || "").trim().toLowerCase().includes("poate te mai interesează")
      );
      if (h3) {
        const grid = h3.nextElementSibling;
        if (grid && grid.tagName === "DIV") {
          grid.classList.add("related-grid");
          Array.from(grid.querySelectorAll("a")).forEach((card) => {
            card.classList.add("related-card");
            const coverDiv = card.querySelector("div");
            if (coverDiv && coverDiv.style) {
              coverDiv.style.height = "140px";
              coverDiv.style.padding = "10px";
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
    <div>
      {/* ——— CSS local: desktop păstrează coloana originală; pe mobil o ascundem și afișăm doar blocul nostru de sus ——— */}
      <style>{`
        /* grila mare (din BookDetail.jsx) devine coloană pe mobil */
        @media (max-width: 640px) {
          .book-grid-2 { display: block !important; }
        }

        /* ascunde pe mobil coloana ORIGINALĂ cu coperți din BookDetail.jsx */
        @media (max-width: 640px) {
          .original-covers { display: none !important; }
        }

        /* blocul nostru pentru mobil - vizibil doar pe mobil */
        .mobile-covers { display: none; }
        @media (max-width: 640px) {
          .mobile-covers {
            display: flex;
            gap: 8px;
            margin: 12px 0 8px 0;
            justify-content: center;
            padding: 0 12px;
          }
          .mobile-covers .coverBox {
            flex: 1 1 0;
            max-width: 50%;
            border: 1px solid #eee;
            border-radius: 10px;
            overflow: hidden;
            background: #f9f9f9;
          }
          .mobile-covers img {
            width: 100%;
            height: auto;
            display: block;
          }
        }

        /* related – mai compacte și centrate */
        .related-grid{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 200px));
          gap:16px;
          justify-content:center;
        }
        .related-card{
          text-decoration:none;
          color:inherit;
          border:0;
          border-radius:12px;
          overflow:hidden;
          background:#fff;
          box-shadow:0 4px 12px rgba(0,0,0,.08);
          max-width:220px;
          margin:0 auto;
        }
        .related-card > div:last-child{ padding:12px; text-align:center; }
      `}</style>

      {/* ——— pe mobil vrem coperțile SUS, apoi titlul din BookDetail.jsx ——— */}
      {book && (
        <div className="mobile-covers" aria-hidden={typeof window !== "undefined" && window.innerWidth > 640 ? "true" : "false"}>
          <div className="coverBox">
            <img src={book.coverUrl || book.cover || ""} alt={book.title || "Copertă"} loading="lazy" />
          </div>
          {book.extraImage && (
            <div className="coverBox">
              <img src={book.extraImage} alt="Coperta spate" loading="lazy" />
            </div>
          )}
        </div>
      )}

      {/* componenta originală – NEATINSĂ (desktop va vedea coloana originală) */}
      <BookDetail />

      {/* panelul de cumpărare – mutat din useEffect imediat sub „Citește un fragment” */}
      <div ref={panelRef}>
        <BookPurchasePanel bookId={id} />
      </div>

      {/* model invizibil pentru viitoare cărți (placeholder în DOM) */}
      <div className="book-model" style={{ display: "none" }} data-model="true" aria-hidden="true">
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
