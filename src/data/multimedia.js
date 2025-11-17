// src/data/multimedia.js

export const FALLBACK_THUMB = "/assets/media/fallback-thumb.jpg";

export const SOCIALS = {
  instagram: "https://www.instagram.com/midaway.official/",
  facebook: "https://www.facebook.com/profile.php?id=61579784437417#",
  tiktok: "https://www.tiktok.com/tag/midaway",
  youtube: "https://www.youtube.com/channel/UCKos5McBc44j6dViovnKiZw/videos",
};

// helper pentru LOT de fotografii din /public/assets/media
export function photos(fileNames, baseTitle = "Asia într-o fotografie") {
  return fileNames.map((f, i) => ({
    id: `photo-${i + 1}-${f.replace(/\W+/g, "")}`,
    type: "photo",
    title: `${baseTitle} — ${i + 1}`,
    url: `/assets/media/${f}`,
    tags: ["foto"],
  }));
}

// Tipuri: "photo" | "video" | "audio" | "interview" | "instagram" | "album"
export const MEDIA = [
  // VIDEO demo
  {
    id: "trailer",
    type: "video",
    title: "Midaway — lansare website",
    url: "https://youtu.be/YfaRLnoFP44",
    // thumb: "/assets/media/trailer.jpg",
    tags: ["video", "lansare", "teaser"],
  },

  // INTERVIURI (YouTube)
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
    title: "Mida Malena — oaspetele Bibliotecii Petre Dulfu Baia Mare",
    url: "https://www.youtube.com/watch?v=jDMBnyYm3EI&t=800s",
    tags: ["interviu", "mida", "biblioteca"],
  },
  {
    id: "int-provocari",
    type: "interview",
    title: "Întrebări și provocări — Bucăți dintr-un suflet nomad (cu Vio Pârja)",
    url: "https://www.youtube.com/watch?v=3lRh_G3gfTM",
    tags: ["interviu", "mida"],
  },

  // INSTAGRAM – acum îl afișăm EMBED în card
  {
    id: "ig-trailer",
    type: "instagram",
    title: "Midaway — mini trailer (Instagram)",
    url: "https://www.instagram.com/p/DN5nm6_jKNo/",
    thumb: "/assets/media/mida-ig-trailer-1.jpg", // opțional, avem și fallback
    tags: ["instagram", "teaser"],
  },

  // PODCAST (Spotify embed)
  {
    id: "pod-1",
    type: "audio",
    title: "Podcast — Episod 1 (în curând)",
    embed: "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator",
    tags: ["podcast", "audio"],
  },

  // ALBUM FOTO – înlocuiește lista lungă de poze
  {
    id: "album-apus",
    type: "album",
    title: "Asia — prin lentila mea (mini album)",
    images: [
      "/assets/media/photo-sample-1.jpg",
      "/assets/media/photo-sample-2.jpg",
      "/assets/media/photo-sample-3.jpg",
      "/assets/media/photo-sample-4.jpg",
      "/assets/media/photo-sample-5.jpg",
      "/assets/media/photo-sample-6.jpg",
      "/assets/media/photo-sample-7.jpg",
      "/assets/media/photo-sample-8.JPEG",
      "/assets/media/photo-sample-9.JPEG",
      "/assets/media/photo-sample-10.JPEG",
      "/assets/media/photo-sample-11.JPEG",
      "/assets/media/photo-sample-12.JPEG",
      "/assets/media/photo-sample-13.JPEG",
      "/assets/media/photo-sample-14.JPEG",
      "/assets/media/photo-sample-15.JPEG",
      "/assets/media/photo-sample-16.JPEG",
      "/assets/media/photo-sample-17.JPEG",
      "/assets/media/photo-sample-18.JPEG",
      "/assets/media/photo-sample-19.JPEG",
      "/assets/media/photo-sample-20.JPEG",
      "/assets/media/photo-sample-21.JPEG",
      "/assets/media/photo-sample-22.JPEG",
      "/assets/media/photo-sample-23.JPEG",
      "/assets/media/photo-sample-24.JPEG",
      "/assets/media/photo-sample-25.JPEG",
      "/assets/media/photo-sample-26.JPEG",
      "/assets/media/photo-sample-27.JPEG",
      "/assets/media/photo-sample-28.JPEG",
      "/assets/media/photo-sample-29.JPEG",
      "/assets/media/photo-sample-30.JPEG",
      "/assets/media/photo-sample-31.JPEG",
      "/assets/media/photo-sample-32.JPEG",
      "/assets/media/photo-sample-33.JPEG",
      "/assets/media/photo-sample-34.JPEG",
    ],
    tags: ["foto", "album"],
  },
   // Dacă vrei și poze simple, poți păstra:
  // ...photos(["photo-sample-1.jpg","photo-sample-2.jpg"], "Călătorie — apus"),
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
