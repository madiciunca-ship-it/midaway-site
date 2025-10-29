// src/data/travelers.js
//
// IMAGINI:
// public/assets/travelers/<id>/cover.webp
// public/assets/travelers/<id>/1.webp
// public/assets/travelers/<id>/2.webp
// public/assets/travelers/<id>/3.webp

const travelers = [
    // ────────────────────────────────────────────────────────────
    // 1) Adi — Nomadul din Bali
    // ────────────────────────────────────────────────────────────
    {
      id: "nomad-bali",
      emoji: "🏝️",
      name: "Adrian Ștefan Ileș – Nomadul din Bali",
      tagline: "Laptop, motocicletă și filme",
      cover: "/assets/travelers/nomad-bali/cover.webp",
      gallery: [
        "/assets/travelers/nomad-bali/1.webp",
        "/assets/travelers/nomad-bali/2.webp",
        "/assets/travelers/nomad-bali/3.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/adrianstefanilles/",
        facebook: "https://www.facebook.com/adrianstefanilles/",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Pe Adi l-am cunoscut pe vremea când făceam dansuri. Atunci nu aveam nicio idee ce rol urma să joace în povestea mea. Câteva luni mai târziu, cochetam cu gândul unei plecări în Bali, iar într-o seară am văzut o postare de-a lui – era fix acolo, în locul la care visam. Nu vorbisem niciodată cu el, dar i-am scris simplu: „Cum e în Bali?”
  
De acolo a început totul. Am început să vorbim, să-i pun o mie de întrebări despre cum e să călătorești singur, despre siguranță, curaj, începuturi. Mi-a spus atunci ceva ce nu am uitat: „Nu-ți face griji. O să-ți fiu alături cu tot ce pot.” Și așa a fost.
  
Am plecat două luni mai târziu – nu spre Bali, ci spre Palawan, în Filipine. Iar după câteva luni, drumul m-a dus, inevitabil, și în Bali. Adi mi-a trimis fișiere, trasee, contacte, mici secrete de călătorie. Oriunde mergeam, el era la celălalt capăt al telefonului, gata să mă ajute, de la mii de kilometri distanță.
  
Ani mai târziu, când nu mai aveam nevoie de un ghid prin lume, Adi a rămas sprijinul meu „tehnic” – omul care repara, de la distanță, orice problemă aveam cu laptopul. Ne-am revăzut abia după doi ani și jumătate, la lansarea cărților mele.
  
Totul a pornit de la un mesaj simplu:
„Hey, crezi că e safe să plec singură în Asia?”
Și da, a fost mai safe decât mi-aș fi imaginat vreodată – pentru că, uneori, oamenii potriviți apar exact când ai nevoie de ei.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "" },
          { q: "2. Ce te-a împins să pleci la drum?", a: "" },
          { q: "3. Când ai știut că merită?", a: "" },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "" },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "" },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "" },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "" },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "" },
        ],
        story: [
          "La final, lasăm loc pentru povestea comună — sau un gând către cititori.",
        ],
      },
      en: {
        intro: `I first met Adi years ago, back when we were both taking dance classes. Back then, I had no idea what role he would one day play in my story.
        
A few months later, I was toying with the idea of going to Bali, when I stumbled upon one of his posts – he was actually there. We had never really talked before, but I wrote to him on Facebook: “Hey, how’s Bali?”
        
That’s how it all began. We started chatting, I asked him countless questions about traveling solo – safety, courage, what it really feels like. He told me something I’ll never forget:
“Don’t worry. I’ll be there to help you with anything I can.”
And he was.

Two months later, I left – not to Bali, but to Palawan, in the Philippines. A few months after that, I finally made it to Bali. Adi sent me everything he knew: files, routes, secret spots, and local tips. Wherever I was, he was there too – from afar – helping, guiding, encouraging.

Years later, when I no longer needed a travel guide, he still helped me – this time with my laptop, which constantly broke down. From a distance, he fixed every issue. We finally saw each other again after two and a half years, at the launch of my books.

And to think it all started with one message:
“Hey, do you think it’s safe for me to travel alone in Asia?”
Turns out, it was safer – and more beautiful – than I ever imagined. Because sometimes, the right people show up exactly when you need them most.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "" },
          { q: "2. What made you start traveling?", a: "" },
          { q: "3. When did you know it was worth it?", a: "" },
          { q: "4. A place that changed the way you see the world?", a: "" },
          { q: "5. How did traveling change you as a person?", a: "" },
          { q: "6. A hard moment on the road and how you overcame it.", a: "" },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "" },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: How did we meet?", a: "" },
        ],
        story: ["Shared story / final thought."],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 2) Scriitoarea din Saigon
    // ────────────────────────────────────────────────────────────
    {
      id: "scriitoare-saigon",
      emoji: "✍️",
      name: "Scriitoarea din Saigon",
      tagline: "Cafele, pagini, ploaie",
      cover: "/assets/travelers/scriitoare-saigon/cover.webp",
      gallery: [
        "/assets/travelers/scriitoare-saigon/1.webp",
        "/assets/travelers/scriitoare-saigon/2.webp",
        "/assets/travelers/scriitoare-saigon/3.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Cafele negre, ploi calde, pagini scrise printre zgomote de oraș. 
  Despre cum găsești liniștea într-o metropolă mereu trează.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "" },
          { q: "2. Ce te-a împins să pleci la drum?", a: "" },
          { q: "3. Când ai știut că merită?", a: "" },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "" },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "" },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "" },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "" },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "" },
        ],
        story: [],
      },
      en: {
        intro: `Black coffee, warm rains, pages written amid city noise...`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "" },
          { q: "2. What made you start traveling?", a: "" },
          { q: "3. When did you know it was worth it?", a: "" },
          { q: "4. A place that changed the way you see the world?", a: "" },
          { q: "5. How did traveling change you as a person?", a: "" },
          { q: "6. A hard moment on the road and how you overcame it.", a: "" },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "" },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: How did we meet?", a: "" },
        ],
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 3) Călătoarea cu barca
    // ────────────────────────────────────────────────────────────
    {
      id: "calatoare-barca",
      emoji: "🚤",
      name: "Călătoarea cu barca",
      tagline: "Insule, vânt, povești",
      cover: "/assets/travelers/calatoare-barca/cover.webp",
      gallery: [
        "/assets/travelers/calatoare-barca/1.webp",
        "/assets/travelers/calatoare-barca/2.webp",
        "/assets/travelers/calatoare-barca/3.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Insule mici, vânt prieten bun, nopți pe ponton.
  O hartă lichidă a curajului de a porni la drum fără acoperiș.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "" },
          { q: "2. Ce te-a împins să pleci la drum?", a: "" },
          { q: "3. Când ai știut că merită?", a: "" },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "" },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "" },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "" },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "" },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "" },
        ],
        story: [],
      },
      en: {
        intro: `Small islands, friendly winds, nights on a pontoon.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "" },
          { q: "2. What made you start traveling?", a: "" },
          { q: "3. When did you know it was worth it?", a: "" },
          { q: "4. A place that changed the way you see the world?", a: "" },
          { q: "5. How did traveling change you as a person?", a: "" },
          { q: "6. A hard moment on the road and how you overcame it.", a: "" },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "" },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: How did we meet?", a: "" },
        ],
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 4) Nomadul din Tokyo
    // ────────────────────────────────────────────────────────────
    {
      id: "nomad-tokyo",
      emoji: "🗼",
      name: "Nomadul din Tokyo",
      tagline: "Luminile orașului, liniștea trenurilor",
      cover: "/assets/travelers/nomad-tokyo/cover.webp",
      gallery: [
        "/assets/travelers/nomad-tokyo/1.webp",
        "/assets/travelers/nomad-tokyo/2.webp",
        "/assets/travelers/nomad-tokyo/3.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Tokyo nu e doar o metropolă — e un haos ordonat unde te poți pierde fără frică. Între lumini de neon și grădini zen, am descoperit că ritmul vieții poate fi simultan frenetic și meditativ.
  
  Trenurile sosesc la secundă, dar poveștile oamenilor se scriu în tăceri lungi. Tokyo e despre contrast — și exact acolo se naște frumusețea.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "" },
          { q: "2. Ce te-a împins să pleci la drum?", a: "" },
          { q: "3. Când ai știut că merită?", a: "" },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "" },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "" },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "" },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "" },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "" },
        ],
        story: [],
      },
      en: {
        intro: `Tokyo is not just a metropolis — a tidy chaos where you can lose yourself without fear.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "" },
          { q: "2. What made you start traveling?", a: "" },
          { q: "3. When did you know it was worth it?", a: "" },
          { q: "4. A place that changed the way you see the world?", a: "" },
          { q: "5. How did traveling change you as a person?", a: "" },
          { q: "6. A hard moment on the road and how you overcame it.", a: "" },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "" },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
          { q: "9. Bonus: How did we meet?", a: "" },
        ],
        story: [],
      },
      video: null,
    },
  ];

  // ✅ TEMPLATE pentru adăugare rapidă de călător nou
/*

{
  id: "exemplu-id",                   // folosit în URL: /calatori/exemplu-id
  emoji: "🌍",                        // mică iconiță personalizată
  name: "Numele Călătorului",
  tagline: "O propoziție scurtă care îl descrie",
  cover: "/assets/travelers/exemplu-id/cover.webp",  // imagine principală
  gallery: [
    "/assets/travelers/exemplu-id/1.webp",
    "/assets/travelers/exemplu-id/2.webp",
    "/assets/travelers/exemplu-id/3.webp",
  ],
  socials: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    website: "",
    blog: "",
  },
  ro: {
    intro: `Scrie aici povestea introductivă — în limba română.
Poate fi oricât de lungă, suportă paragrafe și newline (\n).`,
    qna: [
      { q: "1. Cine ești în câteva fraze?", a: "" },
      { q: "2. Ce te-a împins să pleci la drum?", a: "" },
      { q: "3. Când ai știut că merită?", a: "" },
      { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "" },
      { q: "5. Cum te-a schimbat călătoria ca om?", a: "" },
      { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "" },
      { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "" },
      { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
      { q: "9. Bonus: Cum ne-am cunoscut?", a: "" },
    ],
    story: [
      "Aici poți adăuga gândul final sau povestea comună.",
    ],
  },
  en: {
    intro: `Write here the English version of the intro story.`,
    qna: [
      { q: "1. Who are you in a few sentences?", a: "" },
      { q: "2. What made you start traveling?", a: "" },
      { q: "3. When did you know it was worth it?", a: "" },
      { q: "4. A place that changed the way you see the world?", a: "" },
      { q: "5. How did traveling change you as a person?", a: "" },
      { q: "6. A hard moment on the road and how you overcame it.", a: "" },
      { q: "7. A tip for someone who wants to leave but still hesitates.", a: "" },
      { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "" },
      { q: "9. Bonus: How did we meet?", a: "" },
    ],
    story: [
      "Add here the final thought / shared story (English).",
    ],
  },
  video: null, // dacă vrei, poți pune link YouTube: "https://www.youtube.com/embed/..."
},

*/
  export default travelers;
  