// src/data/multimedia.js

// ——— CONFIG date ———
export const FALLBACK_THUMB = "/assets/media/fallback-thumb.jpg"; 
// pune un fișier generic aici (300×200+) în /public/assets/media

export const SOCIALS = {
  instagram: "https://www.instagram.com/midaway.official/",
  facebook: "https://www.facebook.com/profile.php?id=61579784437417#",
  tiktok: "https://www.tiktok.com/tag/midaway",
  youtube: "https://www.youtube.com/channel/UCKos5McBc44j6dViovnKiZw/videos",
};

// ——— helper pentru LOT de fotografii din /public/assets/media ———
export function photos(fileNames, baseTitle = "Călătorie") {
  return fileNames.map((f, i) => ({
    id: `photo-${i + 1}-${f.replace(/\W+/g, "")}`,
    type: "photo",
    title: `${baseTitle} — ${i + 1}`,
    url: `/assets/media/${f}`,
    tags: ["foto"],
  }));
}

// ——— DATE ———
// Tipuri acceptate: "photo" | "video" | "audio" | "interview" | "instagram"
export const MEDIA = [
  // video demo (YouTube)
  {
    id: "trailer",
    type: "video",
    title: "Midaway — trailer",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    // thumb: "/assets/media/trailer.jpg",
    tags: ["video", "teaser"],
  },

  // interviuri (YouTube)
  {
    id: "int-lansare",
    type: "interview",
    title: "Interviu lansare cărți — Mida Malena",
    url: "https://www.youtube.com/watch?v=5ylLtf8H2Lk&t=2258s",
    tags: ["interviu", "mida"],
  },
  {
    id: "int-biblioteca",
    type: "interview",
    title: "Mida Malena — oaspetele Bibliotecii Petre Dulfu",
    url: "https://www.youtube.com/watch?v=jDMBnyYm3EI&t=800s",
    tags: ["interviu", "mida", "biblioteca"],
  },
  {
    id: "int-provocari",
    type: "interview",
    title: "Întrebări și provocări — Bucăți dintr-un suflet nomad",
    url: "https://www.youtube.com/watch?v=3lRh_G3gfTM",
    tags: ["interviu", "mida"],
  },

  // instagram – deschide postarea în tab nou
  {
    id: "ig-trailer",
    type: "instagram",
    title: "Midaway — trailer (Instagram)",
    url: "https://www.instagram.com/p/DN5nm6_jKNo/",
    thumb: "/assets/media/mida-ig-trailer-1.jpg",
    tags: ["instagram", "teaser"],
  },

  // audio (Spotify embed)
  {
    id: "pod-1",
    type: "audio",
    title: "Podcast — Episod 1",
    embed:
      "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator",
    tags: ["podcast", "audio"],
  },

  // FOTO – LOT (adaugă/șterge oricând fișierele)
  ...photos(
    [
      "photo-sample-1.jpg",
      "photo-sample-2.jpg",
      "photo-sample-3.jpg",
      "photo-sample-4.jpg",
      "photo-sample-5.jpg",
      "photo-sample-6.jpg",
      "photo-sample-7.jpg",
    ],
    "Călătorie — apus"
  ),
];

/* ——— MODELE (lasă-le aici, invizibile; doar copy/paste când ai nevoie) ———

 // YOUTUBE / INTERVIU
 {
   id: "uniq",
   type: "video", // sau "interview"
   title: "Titlu",
   url: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
   thumb: "/assets/media/thumb.jpg",
   tags: ["mida","interviu"]
 }

 // INSTAGRAM (deschide în tab nou)
 {
   id: "ig-1",
   type: "instagram",
   title: "Titlu",
   url: "https://www.instagram.com/p/SHORTCODE/",
   thumb: "/assets/media/ig-thumb.jpg",
   tags: ["instagram"]
 }

 // PODCAST (Spotify/SoundCloud EMBED)
 {
   id: "pod-2",
   type: "audio",
   title: "Podcast 2",
   embed: "URL-EMBED",
   tags: ["podcast"]
 }

 // FOTO (una)
 {
   id: "ph-1",
   type: "photo",
   title: "Titlu foto",
   url: "/assets/media/foto.jpg",
   tags: ["foto"]
 }

 // FOTO (batch)
 ...photos(["img1.jpg","img2.jpg"], "Titlu bază")

*/
