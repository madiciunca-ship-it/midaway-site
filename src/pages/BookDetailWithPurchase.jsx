// src/pages/BookDetailWithPurchase.jsx
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import BookPurchasePanel from "../components/BookPurchasePanel";

export default function BookDetailWithPurchase() {
  const { id } = useParams();
  const panelRef = useRef(null);

  useEffect(() => {
    // 1) Ascundem vechiul UI de cumpărare (fără a atinge codul)
    const hideBlocks = (startsWith) => {
      Array.from(document.querySelectorAll("button, a, span")).forEach((el) => {
        const t = (el.textContent || "").trim();
        if (t.startsWith(startsWith)) {
          el.style.display = "none";
          // ascunde și containerul următor cu opțiuni (grid-ul de RO/EN sau pilule)
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
      // dacă nu e deja inserat lângă, îl mutăm după „Citește un fragment”
      fragmentBtn.parentElement.insertAdjacentElement("afterend", panelEl);
    }
  }, []);

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
