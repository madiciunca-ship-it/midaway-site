// src/data/travelers.js
//
// Pozele pot sta în public/assets/travelers/<id>/...
// Exemplu cover: "/assets/travelers/nomad-bali/cover.webp"

const travelers = [
    {
      id: "nomad-bali",
      emoji: "🏝️",
      name: "Nomadul din Bali",
      tagline: "Ocean, cod și mango",
      cover:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
      // până ai pozele proprii, rămân cele Unsplash; le înlocuiești când vrei.
      gallery: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop",
      ],
      socials: {
        instagram: "https://www.instagram.com/midaway.official",
        facebook: "",
        tiktok: "",
        youtube: "https://youtube.com/@midaway",
        website: "",
        blog: "",
      },
      intro:
        "Povestea unui nomad între oceane și linii de cod. Dimineți cu surfing, seri cu scris. Cum arată o zi în care munca și libertatea sunt același drum.",
      // (opțional) secțiuni pe care le vom popula când ai materialul:
      qna: [],
      story: [],
      video: null, // ex: { type: "youtube", id: "dQw4w9WgXcQ" }
    },
  
    {
      id: "scriitoare-saigon",
      emoji: "✍️",
      name: "Scriitoarea din Saigon",
      tagline: "Cafele, pagini, ploaie",
      cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "", // dacă are un blog personal
      },
      intro:
        "Cafele negre, ploi calde, pagini scrise printre zgomote de oraș. Despre cum găsești liniștea într-o metropolă mereu trează.",
      qna: [],
      story: [],
      video: null,
    },
  
    {
      id: "calatoare-barca",
      emoji: "🚤",
      name: "Călătoarea cu barca",
      tagline: "Insule, vânt, povești",
      cover:
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1200&auto=format&fit=crop",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "#",
        website: "",
        blog: "",
      },
      intro:
        "Insule mici, vânt prieten bun, nopți pe ponton. O hartă lichidă a curajului de a porni la drum fără acoperiș.",
      qna: [],
      story: [],
      video: null,
    },
  
    {
      id: "nomad-tokyo",
      emoji: "🗼",
      name: "Nomadul din Tokyo",
      tagline: "Luminile orașului, liniștea trenurilor",
      cover:
        "https://images.unsplash.com/photo-1526481280698-8fcc13fd2375?q=80&w=1600&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1526481280698-8fcc13fd2375?q=80&w=1200&auto=format&fit=crop",
      ],
      socials: {
        instagram: "https://instagram.com/exemplu",
        facebook: "",
        tiktok: "",
        youtube: "https://youtube.com/exemplu",
        website: "",
        blog: "",
      },
      intro:
        "Tokyo nu e doar o metropolă — e un haos ordonat unde te poți pierde fără frică. Între lumini de neon și grădini zen, ritmul vieții poate fi și frenetic, și meditativ.",
      qna: [],
      story: [],
      video: null,
    },
  ];
  
  export default travelers;
  