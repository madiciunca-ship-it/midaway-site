import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function BookGallery({ images }) {
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
