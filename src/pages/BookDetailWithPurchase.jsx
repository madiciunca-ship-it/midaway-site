// src/pages/BookDetailWithPurchase.jsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import { BOOKS } from "../data/books";
import BookPurchasePanel, { FormatSpecs } from "../components/BookPurchasePanel";
import { recommendBooks } from "../utils/recommendations";
import { BOOK_REVIEWS } from "../data/bookReviews";

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

const BASE_PATH =
  (typeof window !== "undefined" && window.location.pathname.startsWith("/carti"))
    ? "/carti"
    : "/books";

    function BookReviewsSection({ book, reviews, averageRating, averageStars }) {
      const [status, setStatus] = useState("idle");
      const [message, setMessage] = useState("");

      const isEN = String(book?.lang || "").toUpperCase() === "EN";

      const t = isEN
        ? {
            heading: "What readers say",
            empty: "There are no published reviews for this book yet.",
            leave: "Leave a review",
            intro: "You can leave a review here, and I will publish it on the site after verification. 🥰",
            success: "Thank you! Your review has been sent.",
            submit: "Submit review",
            submitting: "Sending...",
            name: "Your name",
            email: "Your email",
            rating: "Choose rating",
            review: "Write your review here",
            stars: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
            reviewWord: "review",
            reviewsWord: "reviews",
            outOf: "out of 5",
            subject: `New book review: ${book?.title || ""}`,
            genericError: "There was a problem sending your review. Please try again.",
            networkError: "I couldn't send your review. Please check your internet connection and try again.",
          }
        : {
            heading: "Ce spun cititorii",
            empty: "Încă nu există review-uri publicate pentru această carte.",
            leave: "Lasă un review",
            intro: "Îmi poți lăsa un review aici, iar eu îl voi publica pe site după verificare. 🥰",
            success: "Mulțumesc! Review-ul a fost trimis.",
            submit: "Trimite review-ul",
            submitting: "Se trimite...",
            name: "Numele tău",
            email: "Emailul tău",
            rating: "Alege ratingul",
            review: "Scrie review-ul tău aici",
            stars: ["1 stea", "2 stele", "3 stele", "4 stele", "5 stele"],
            reviewWord: "review",
            reviewsWord: "review-uri",
            outOf: "din 5",
            subject: `Review nou carte: ${book?.title || ""}`,
            genericError: "A apărut o problemă la trimitere. Te rog încearcă din nou.",
            networkError: "Nu am reușit să trimit review-ul. Verifică internetul și încearcă din nou.",
          };
    
      async function handleReviewSubmit(e) {
        e.preventDefault();
    
        const form = e.currentTarget;
        const formData = new FormData(form);
    
        setStatus("submitting");
        setMessage("");
    
        try {
          const res = await fetch("https://formspree.io/f/xwvavdnb", {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          });
    
          const data = await res.json();
    
          if (res.ok) {
            form.reset();
            setStatus("success");
            setMessage(t.success);
          } else {
            setStatus("error");
            setMessage(data?.errors?.[0]?.message || t.genericError);
          }
        } catch {
          setStatus("error");
          setMessage(t.networkError);
        }
      }
    
      if (!book) return null;
    
      return (
        <section
          style={{
            marginTop: 24,
            padding: 18,
            border: "1px solid #eee",
            borderRadius: 16,
            background: "#fffef9",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 24 }} className="font-cormorant">
          {t.heading}
</h2>
    
            {reviews.length > 0 ? (
              <div style={{ color: "#3b2f2f", fontSize: 16 }}>
<strong>{averageRating.toFixed(1)}</strong> {t.outOf} ·{" "}
<span style={{ color: "#d4a017", letterSpacing: 2, fontSize: 18, verticalAlign: "middle" }}>
  {averageStars}
</span>{" "}
<span style={{ color: "#666" }}>
  ({reviews.length} {reviews.length === 1 ? t.reviewWord : t.reviewsWord})
</span>
              </div>
            ) : (
              <div style={{ color: "#666", fontSize: 15 }}>
                {t.empty}
              </div>
            )}
          </div>
    
          {reviews.length > 0 && (
            <div style={{ display: "grid", gap: 14, marginBottom: 20 }}>
              {reviews.map((r) => (
                <article
                  key={r.id}
                  style={{
                    border: "1px solid #ece7df",
                    borderRadius: 16,
                    background: "#fff",
                    padding: 16,
                    boxShadow: "0 6px 18px rgba(0,0,0,.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 8,
                    }}
                  >
                    <strong
  style={{
    color: "#2b2b2b",
    fontSize: 15,
  }}
>
  {r.name}
</strong>
                    <span
  style={{
    color: "#d4a017",
    letterSpacing: 1.5,
    fontSize: 16,
    lineHeight: 1,
  }}
>
                      {"★".repeat(Number(r.rating) || 0)}
                      {"☆".repeat(5 - (Number(r.rating) || 0))}
                    </span>
                  </div>
    
                  <p
  style={{
    margin: 0,
    lineHeight: 1.8,
    color: "#2b2b2b",
    paddingLeft: 12,
    borderLeft: "3px solid rgba(212,160,23,.22)",
  }}
>
  {r.text}
</p>
                </article>
              ))}
            </div>
          )}
    
          <div
            style={{
              borderTop: "1px dashed #e6ddd3",
              paddingTop: 18,
              marginTop: 10,
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>{t.leave}</h3>
            <p style={{ marginTop: 0, color: "#666", fontSize: 14 }}>
            {t.intro}
            </p>
    
            {message && (
              <div
                style={{
                  marginBottom: 14,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: status === "success" ? "1px solid #7dc9bf" : "1px solid #e3b0b0",
                  background: status === "success" ? "#e8f8f5" : "#fff3f3",
                  color: status === "success" ? "#1f6f67" : "#9f2f2f",
                  fontWeight: 600,
                }}
              >
                {message}
              </div>
            )}
    
            <form onSubmit={handleReviewSubmit} style={{ display: "grid", gap: 10 }}>
              <input type="hidden" name="bookId" value={book.id} />
              <input type="hidden" name="bookTitle" value={book.title} />
              <input type="hidden" name="_subject" value={t.subject} />
    
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <input
                  type="text"
                  name="name"
                  placeholder={t.name}
                  required
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "#fff",
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.email}
                  required
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "#fff",
                  }}
                />
              </div>
    
              <select
                name="rating"
                required
                defaultValue=""
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  maxWidth: 220,
                }}
              >
                <option value="" disabled>{t.rating}</option>
                <option value="5">{t.stars[4]}</option>
<option value="4">{t.stars[3]}</option>
<option value="3">{t.stars[2]}</option>
<option value="2">{t.stars[1]}</option>
<option value="1">{t.stars[0]}</option>
              </select>
    
              <textarea
                name="review"
                placeholder={t.review}
                required
                rows={5}
                style={{
                  padding: "12px",
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  background: "#fff",
                  resize: "vertical",
                }}
              />
    
              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  width: "fit-content",
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: "#2a9d8f",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: status === "submitting" ? "wait" : "pointer",
                  opacity: status === "submitting" ? 0.75 : 1,
                }}
              >
                {status === "submitting" ? t.submitting : t.submit}
              </button>
            </form>
          </div>
        </section>
      );
    }


export default function BookDetailWithPurchase() {
  const { id } = useParams();
  const panelRef = useRef(null);
  const specsRef = useRef(null);
  const reviewsRef = useRef(null);
  const book = useMemo(() => findBookByIdOrAlias(id), [id]);
  const approvedReviews = useMemo(() => {
    if (!book?.id) return [];
    return (BOOK_REVIEWS[book.id] || [])
      .filter((r) => r && r.published !== false)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [book]);

  const averageRating = useMemo(() => {
    if (!approvedReviews.length) return 0;
    const total = approvedReviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
    return total / approvedReviews.length;
  }, [approvedReviews]);

  const averageStars = useMemo(() => {
    const rounded = Math.round(averageRating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }, [averageRating]);

  // doar ca să păstrăm comportamentul vechi de a calcula related (nu îl randăm noi)
  useMemo(() => recommendBooks(book, 3), [book]);

  useEffect(() => {
    if (!book) return;

    // 0) Dacă există o secțiune NOUĂ de related (cea cu data-related="new"), o ascundem
    try {
      const newH3 = document.querySelector('h3[data-related="new"]');
      if (newH3) {
        newH3.style.display = "none";
        if (newH3.nextElementSibling) newH3.nextElementSibling.style.display = "none";
      }
    } catch {}

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

    // 2) Marcare grilă principală + ascundem coloana cu coperți din layout-ul vechi
    try {
      const grid =
        Array.from(document.querySelectorAll("div")).find((el) => {
          const s = el.getAttribute("style") || "";
          return (
            s.includes('display: "grid"') ||
            (getComputedStyle(el).display === "grid" && s.includes("minmax(220px"))
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
    } catch {}

    // 3) Mutăm panelul nostru sub „📖 Citește un fragment”
    try {
      const fragmentBtn = document.querySelector("[data-book-sample='true']");
      const panelEl = panelRef.current;
    
      if (fragmentBtn && panelEl) {
        fragmentBtn.insertAdjacentElement("afterend", panelEl);
      }
    } catch {}
    try {
      const relatedHeading = document.querySelector("[data-book-related='true']");
    
      const reviewsEl = reviewsRef.current;
    
      if (relatedHeading && reviewsEl && reviewsEl.parentElement) {
        relatedHeading.insertAdjacentElement("beforebegin", reviewsEl);
      }
    } catch {}

    // 3.5) Inserăm „Specificații pe format” imediat sub „Detalii tehnice”
    try {
      const h2 = document.querySelector("[data-book-technical='true']");
      if (h2) {
        const ul =
          h2.nextElementSibling && h2.nextElementSibling.tagName === "UL"
            ? h2.nextElementSibling
            : null;

        const host = specsRef.current;
        if (ul && host) {
          ul.insertAdjacentElement("afterend", host);
        } else if (host) {
          h2.insertAdjacentElement("afterend", host);
        }
      }
    } catch {}
// 4) Populează + stilizează secțiunea „Poate te mai interesează”
try {
  const h3 = document.querySelector("[data-book-related='true']");
  if (h3) {
    const grid = h3.nextElementSibling;
    if (grid && grid.tagName === "DIV") {
      // baza de rută /carti sau /books
      const basePath =
        (typeof window !== "undefined" && window.location.pathname.startsWith("/carti"))
          ? "/carti"
          : "/books";

      // recomandările (din BOOKS)

      const rel = (recommendBooks(book, 20) || [])
  .filter((b) => String(b?.lang || "").toUpperCase() === String(book?.lang || "").toUpperCase())
  .filter((b) => b.id !== book.id)
  .slice(0, 3);

      // 4.a) Construieste link ABSOLUT (cu domeniul curent); NO ESCAPES RELATIVE
      const origin = (typeof window !== "undefined" ? window.location.origin : "");
      const esc = (s) => String(s || "")
        .replace(/&/g,"&amp;").replace(/</g,"&lt;")
        .replace(/>/g,"&gt;").replace(/"/g,"&quot;");

      if (rel.length) {
        grid.innerHTML = rel.map((b) => {
          const id     = esc(b.id || "");
          const title  = esc(b.title || "");
          const sub    = esc(b.subtitle || "");
          const cover  = esc(b.coverUrl || "");
          // URL ABSOLUT – ex: https://midaway.ro/carti/vietnam-ro
          const hrefAbs = `${origin}${basePath}/${id}`;

          return `
            <a href="${hrefAbs}" class="related-card">
              <div class="related-coverWrap"
                   style="background-image:url('${cover}');
                          background-size:contain;
                          background-position:center;
                          background-repeat:no-repeat;">
              </div>
              <div>
                <div class="font-semibold">${title}</div>
                ${sub ? `<div class="text-slate-600 text-sm mt-1">${sub}</div>` : ""}
              </div>
            </a>
          `;
        }).join("");
      }

      // 4.b) Aplică clasele/stilurile compacte (cele care îți plac acum)
      grid.classList.add("related-grid");

      Array.from(grid.querySelectorAll("a")).forEach((card) => {
        card.classList.add("related-card");
      });

      Array.from(grid.querySelectorAll(".related-coverWrap")).forEach((cvr) => {
        cvr.style.height = "160px";
        cvr.style.padding = "12px";
        cvr.style.backgroundColor = "#f8f3ea";
      });
    }
  }
} catch {}

  }, [book]);

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* CSS-ul VECHI – exact cel care făcea cardurile mici și centrate */}
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

        /* related: carduri compacte, pe centru (VARIANTA VECHE) */
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

      <div ref={reviewsRef}>
  <BookReviewsSection
    book={book}
    reviews={approvedReviews}
    averageRating={averageRating}
    averageStars={averageStars}
  />
</div>

      {/* 4️⃣ (model invizibil) */}
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
