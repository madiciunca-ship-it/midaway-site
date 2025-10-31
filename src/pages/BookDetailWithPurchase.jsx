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
    // 1️⃣ Ascundem vechiul UI de cumpărare
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

    // 4) injectăm clase pe structura existentă ca să putem stiliza pe mobil,
// fără să atingem BookDetail.jsx
try {
  // găsim o imagine de copertă din pagină
  const coverImg = Array.from(document.images).find(
    (im) => (im.getAttribute("alt") || "").toLowerCase() === String(book?.title || "").toLowerCase()
  );
  if (coverImg) {
    // urcăm până la containerul flex care ține coperta față + spate
    let covers = coverImg.parentElement;
    while (covers && getComputedStyle(covers).display !== "flex") {
      covers = covers.parentElement;
    }
    if (covers) {
      covers.classList.add("covers");
      // punem .coverBox pe div-urile copil (față/spate)
      Array.from(covers.children).forEach((c) => {
        if (c.tagName === "DIV") c.classList.add("coverBox");
      });
    }

    // găsim containerul mare care e grid (2 coloane) și îi punem .book-grid-2
    let grid = covers ? covers.parentElement : coverImg.parentElement;
    while (grid && getComputedStyle(grid).display !== "grid") {
      grid = grid.parentElement;
    }
    if (grid) grid.classList.add("book-grid-2");
  }
} catch {}


    // 2️⃣ Mutăm panelul nou sub „Citește un fragment”
    const fragmentBtn = Array.from(document.querySelectorAll("a, button")).find(
      (el) => (el.textContent || "").trim().startsWith("📖 Citește un fragment")
    );
    const panelEl = panelRef.current;
    if (fragmentBtn && panelEl && panelEl.parentElement) {
      fragmentBtn.parentElement.insertAdjacentElement("afterend", panelEl);
    }

    // 3️⃣ Fix imagine copertă (fallback)
    const bestCover =
      book?.cover ||
      book?.coverUrl ||
      book?.image ||
      book?.extraImage ||
      (Array.isArray(book?.images) ? book.images[0] : null) ||
      null;

    if (bestCover && book?.title) {
      const titleLc = String(book.title).toLowerCase();
      const imgs = Array.from(document.querySelectorAll("img"));

      imgs.forEach((img) => {
        const altLc = String(img.getAttribute("alt") || "").toLowerCase();
        const isPlaceholder =
          img.src.endsWith("/placeholder-cover.png") ||
          /placeholder/i.test(img.src);

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
    }

    // 4️⃣ Adaugă clasele lipsă pentru layout responsive și related
    try {
      const coverImg = Array.from(document.querySelectorAll("img")).find(
        (i) => (i.alt || "").trim().toLowerCase() === (book?.title || "").toLowerCase()
      );
      if (coverImg) {
        const coversColumn = coverImg.closest("div");
        const gridContainer = coversColumn?.parentElement?.parentElement;
        if (gridContainer) gridContainer.classList.add("book-grid-2");

        const column = coversColumn?.parentElement;
        if (column) column.classList.add("covers");
        coversColumn?.classList.add("coverBox");

        const backImg = Array.from(column?.querySelectorAll("img") || []).find(
          (i) => (i.alt || "").toLowerCase().includes("coperta spate")
        );
        if (backImg) backImg.closest("div")?.classList.add("coverBox");
      }

      // related
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
            if (coverDiv && coverDiv.style && coverDiv.style.backgroundImage) {
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
      {/* CSS injectat — responsive + related */}
      <style>{`
        /* marcăm containerul de grid al paginii de carte (îi punem clasa prin JS mai jos) */
        @media (max-width: 640px) {
          .book-grid-2 { display: block !important; }
        }
        
        /* marchează coloana cu coperți (clasă injectată din JS) */
        .covers {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .covers { flex-direction: row; gap: 8px; justify-content: center; }
          .covers .coverBox { flex: 1 1 0; max-width: 50%; }
        }
        
        /* ambele boxuri: raport 2:3 și overflow ascuns */
        .covers .coverBox {
          aspect-ratio: 2 / 3;
          min-width: 0;
          border-radius: 12px;
          overflow: hidden;
        }
        
        /* ambele imagini din boxuri: fill corect */
        .covers .coverBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        /* related: carduri mai înguste, fără chenar, text centrat */
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
          max-width:220px;            /* ← mai înguste pe rând */
          margin:0 auto;              /* centrate */
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

      <BookDetail />

      {/* panelul e randat la final, apoi mutat sub „Citește un fragment” */}
      <div ref={panelRef}>
        <BookPurchasePanel bookId={id} />
      </div>
    </div>
  );
}
