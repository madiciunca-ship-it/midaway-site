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
    // 1) Ascundem vechiul UI de cumpărare (fără a atinge codul)
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

    // 2) Mutăm panelul nou IMEDIAT după butonul „Citește un fragment”
    const fragmentBtn = Array.from(document.querySelectorAll("a, button")).find(
      (el) => (el.textContent || "").trim().startsWith("📖 Citește un fragment")
    );
    const panelEl = panelRef.current;
    if (fragmentBtn && panelEl && panelEl.parentElement) {
      fragmentBtn.parentElement.insertAdjacentElement("afterend", panelEl);
    }

    // 3) Fix imagine copertă în detaliu (fără a edita componenta mare)
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

        // dacă imaginea pare asociată cu cartea curentă sau e placeholder → pune coperta corectă
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
  }, [book]);

  return (
    <div>
      <BookDetail />
      {/* panelul e randat la final, apoi mutat în DOM sub „Citește un fragment” */}
      <div ref={panelRef}>
        <BookPurchasePanel bookId={id} />
      </div>
    </div>
  );
}
