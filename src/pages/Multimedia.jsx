import React from "react";

export default function Multimedia() {
  const videos = [
    {
      title: "Midaway – trailer",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ", // schimbă cu clipul tău
    },
  ];

  const podcasts = [
    // Spotify (episod sau playlist)
    {
      title: "Podcast – Episod 1",
      src: "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator",
    },
    // SoundCloud (pune track/playlist embed URL)
    // { title: "SoundCloud", src: "https://w.soundcloud.com/player/?url=..." },
  ];

  const frame = {
    width: "100%",
    border: 0,
    borderRadius: 12,
    overflow: "hidden",
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>🎧 Multimedia</h1>

      <h2 style={{ margin: "16px 0 8px" }}>🎥 Video</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {videos.map((v) => (
          <div key={v.title}>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                title={v.title}
                src={v.src}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  ...frame,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                }}
              />
            </div>
            <div style={{ marginTop: 8, color: "#555" }}>{v.title}</div>
          </div>
        ))}
      </div>

      <h2 style={{ margin: "20px 0 8px" }}>🎙️ Podcast</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {podcasts.map((p) => (
          <div key={p.title}>
            <iframe
              title={p.title}
              src={p.src}
              style={{ ...frame, height: 152 }}
              loading="lazy"
            />
            <div style={{ marginTop: 8, color: "#555" }}>{p.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
