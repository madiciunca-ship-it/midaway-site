import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { BOOKS } from "../data/books";

export default function BookGallery({ images }) {
  const items = images.map((src) => ({
    original: src,
    thumbnail: src,
  }));
  const ordered = [...BOOKS].reverse(); // cele mai noi primele (după ordinea din array)
  return (
    <div className="grid">
      {ordered.map((book, idx) => {
        const isNew = idx < 2; // primele două din listă
        return (
          <div key={book.id} className="card">
            <div className="coverWrap">
              <img src={book.cover || book.image} alt={book.title} />
              {isNew && (
                <span className="chip">NEW</span>
              )}
            </div>
            <h3>{book.title}</h3>
            {/* restul cardului */}
          </div>
        );
      })}
    </div>
  );
  
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
.coverWrap { position: relative; }
.chip {
  position: absolute; top: 8px; left: 8px;
  background: #d97706; color: #fff; font-weight: 700;
  padding: 2px 8px; border-radius: 999px; font-size: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
}
