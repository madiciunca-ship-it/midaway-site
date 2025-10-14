// src/pages/BookDetailWithPurchase.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import BookPurchasePanel from "../components/BookPurchasePanel";

/**
 * Nu modificăm BookDetail.jsx. Aici doar îl afișăm
 * și ascundem din DOM butoanele vechi de cumpărare (RO/EN).
 */
export default function BookDetailWithPurchase() {
  const { id } = useParams();

  useEffect(() => {
    // Ascundem butoanele/titlurile legate de cumpărare veche
    const hideByButtonText = (textStart) => {
      document
        .querySelectorAll("button")
        .forEach((btn) => {
          const t = (btn.textContent || "").trim();
          if (t.startsWith(textStart)) {
            // ascunde butonul + containerul imediat următor (sub-opțiuni)
            btn.style.display = "none";
            if (btn.nextElementSibling && btn.nextElementSibling.tagName === "DIV") {
              btn.nextElementSibling.style.display = "none";
            }
          }
        });
      // paperback vechi (poate fi button sau link/span)
      Array.from(document.querySelectorAll("a, span, button")).forEach((el) => {
        const t = (el.textContent || "").trim();
        if (t.startsWith("🛒 Cumpără Paperback")) {
          el.style.display = "none";
        }
        if (t.startsWith("🎧 Audiobook")) {
          // ascunde butonul + containerul cu "RO – în curând / EN – în curând"
          el.style.display = "none";
          if (el.parentElement && el.parentElement.nextElementSibling) {
            const sib = el.parentElement.nextElementSibling;
            // verificăm dacă e lista cu pilule
            if (sib && sib.querySelector && sib.querySelector("span")) {
              sib.style.display = "none";
            }
          }
        }
      });
    };

    hideByButtonText("📄 Cumpără PDF");
    hideByButtonText("📘 Cumpără EPUB");
  }, []);

  return (
    <div>
      <BookDetail />
      <BookPurchasePanel bookId={id} />
    </div>
  );
}
