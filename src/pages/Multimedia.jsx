import React from "react";

export default function Multimedia() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>🎧 Multimedia</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Podcasturi, videoclipuri și imagini care completează poveștile Midaway.
      </p>

      {/* Podcasturi */}
      <section style={{ marginBottom: 32 }}>
        <h2>🎙️ Podcasturi & Audiobook-uri</h2>
        <p style={{ color: "#666" }}>
          Exemple demo — poți înlocui linkurile cu playlisturile tale reale.
        </p>
        <div style={{ marginTop: 12 }}>
          <iframe
            style={{ borderRadius: 12 }}
            src="https://www.youtube.com/watch?v=5ylLtf8H2Lk&list=PLukhhWmVdIUDMx4LMt6xz0VVO8XcZiyat"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify demo"
          ></iframe>
        </div>
      </section>

      {/* Video */}
      <section style={{ marginBottom: 32 }}>
        <h2>🎥 Video & Documentare</h2>
        <p style={{ color: "#666" }}>
          Clipuri demo YouTube — se pot înlocui cu vloguri/documentare proprii.
        </p>
        <div style={{ marginTop: 12, display: "grid", gap: 16 }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Scxs7L0vhZ4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Galerie foto */}
      <section>
        <h2>📷 Galerie foto</h2>
        <p style={{ color: "#666" }}>Imagini demo Unsplash (se pot înlocui cu fotografiile tale).</p>
        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop"
            alt="Plajă"
            style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
          />
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"
            alt="Oraș"
            style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
          />
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=600&auto=format&fit=crop"
            alt="Barcă"
            style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
          />
        </div>
      </section>
    </div>
  );
}
