// src/components/BookGallery.jsx
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { BOOKS } from "../data/books";

export default function BookGallery({ images }) {
  // 1) Mod "galerie de imagini" (dacă primește images)
  if (Array.isArray(images) && images.length > 0) {
    const items = images.map((src) => ({
      original: src,
      thumbnail: src,
    }));
    return (
      <div style={{ marginTop: 24 }}>
        <ImageGallery
          items={items}
          showPlayButton={false}
          showFullscreenButton={true}
          showNav={true}
          slideDuration={350}
          thumbnailPosition="bottom"
        />
      </div>
    );
  }

  // 2) Mod "grilă de cărți" (fallback când NU primim images)
  const ordered = [...BOOKS].reverse(); // cele mai noi primele

  return (
    <>
      {/* Stiluri locale minime */}
      <style>{`
        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .book-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 4px 14px rgba(0,0,0,.05);
        }
        .coverWrap { position: relative; }
        .coverWrap img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 10px;
          display: block;
        }
        .chip {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #d97706;
          color: #fff;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,.15);
        }
        .book-title {
          margin: 10px 0 0 0;
          font-weight: 700;
          font-size: 16px;
          line-height: 1.25;
        }
      `}</style>

      <div className="book-grid">
        {ordered.map((book, idx) => {
          const isNew = idx < 2; // primele două din listă
          const coverCandidate =
            book?.cover ||
            book?.coverUrl ||
            book?.image ||
            book?.extraImage ||
            (Array.isArray(book?.images) ? book.images[0] : null);
          const cover = coverCandidate || "/placeholder-cover.png";

          return (
            <div key={book.id} className="book-card">
              <div className="coverWrap">
                <img
                  src={cover}
                  alt={book.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e?.currentTarget?.src !== "/placeholder-cover.png") {
                      e.currentTarget.src = "/placeholder-cover.png";
                    }
                  }}
                />
                {isNew && <span className="chip">NEW</span>}
              </div>

              <h3 className="book-title">{book.title}</h3>
              {/* aici poți adăuga autor, limbă, preț etc. */}
            </div>
          );
        })}
      </div>
    </>
  );
}
