const authors = [
  {
    id: "mida-malena",                           // URL: /autori/mida-malena
    photo: "/assets/books/authors/autor-name-mida-malena.webp", // ← poza nouă
    gallery: [
      "/assets/books/authors/mida-malena-2.webp",
      "/assets/books/authors/mida-malena.webp",
      "/assets/books/authors/mida-malena-3.webp",
      // dacă mai adaugi una, o ia automat doar pe primele 3
    ],
    socials: {
      instagram: "https://www.instagram.com/mida_malena/",
      facebook: "https://www.facebook.com/madi.ciunca",
      youtube: "https://www.youtube.com/@midamalena",
      tiktok: "https://www.tiktok.com/tag/midamalena",
      website: "https://midaway.ro",
    },

    // o carte „în față” (buton mare)
    featuredBook: {
      title: "Zile și nopți de Vietnam",
      href: "/carti", // dacă ai detaliu: /carti/zile-si-nopti-de-vietnam
    },

    // dacă vrei și listă, rămâne compatibil:
    books: [
      // "zile-si-nopti-de-vietnam"
    ],

    ro: {
      name: "Mida Malena",
      role: "Scriitoare",
      tagline: "Povestitoare, aventurieră și căutătoare eternă.",
      bio: [
        "Bună, sunt Mida Malena – povestitoare, aventurieră și căutătoare eternă.",
        "În ultimii trei ani, am călătorit prin trei continente – Asia, Europa și Africa – provocându-mă să mă eliberez de limitele și temerile despre care credeam că mă definesc. Scrisul a fost întotdeauna felul meu de a înțelege lumea, iar călătoriile mi-au arătat că singurele limite reale sunt cele pe care le purtăm în mintea noastră.",
        "Prima mea carte, „O zi de care să-ți amintești”, surprinde frumusețea momentelor aparent mărunte într-o călătorie profundă prin Filipine. Cu „Zile și nopți de Vietnam: Bucăți dintr-un suflet nomad”, vă invit într-o aventură personală, plină de peisaje vibrante și clipe de introspecție. E o poveste despre curaj, descoperire de sine și libertatea care apare atunci când îmbrățișezi necunoscutul. Iar cărțile mele nu se opresc aici – călătoria continuă.",
        "Următoarele două volume, din seria „Pași prin Indonezia”, vorbesc despre transformare, curaj și magia de a te lăsa purtat(ă) de viață atunci când renunți la hartă: Bali, o insulă-oglindă ce arde lent și vindecă profund, și Java, un teritoriu viu și haotic, unde rătăcirea devine formă de regăsire.",
        "Am învățat că frica este doar o iluzie – una pe care o depășim în clipa în care facem primul pas curajos. Asta sper să inspire cărțile mele: să pășiți în propria aventură, să vă întâmpinați temerile și să redescoperiți potențialul nelimitat din voi.",
        "Când nu scriu sau explorez, vorbesc cu cititori, pregătesc noi povești și caut să las mici gesturi de bunătate oriunde mă poartă drumul. Mulțumesc că faceți parte din călătorie – sper ca paginile mele să aducă o scânteie de curaj și bucurie.",
        "Mida Malena este numele de autor sub care publică Maria Magdalena Ciunca, fondatoarea Editurii Midaway.",
      ],
    },
    en: {
      name: "Mida Malena",
      role: "Writer",
      tagline: "Storyteller, traveler, forever seeker.",
      bio: [
        "Hi, I’m Mida Malena – storyteller, traveler, and eternal seeker.",
        "Over the past three years, I’ve journeyed across three continents – Asia, Europe, and Africa – pushing myself beyond the limits and fears I once believed defined me. Writing has always been my way of understanding the world, and travel has taught me that the only real boundaries we face are the ones we carry within.",
        "My upcoming books, the first two volumes of the series Steps Through Indonesia, explore transformation, courage, and the quiet magic that unfolds when you let life guide you without a map: Bali, an island-mirror that burns slowly and heals deeply, and Java, a chaotic, vibrant world where getting lost becomes a path to rediscovery.",
        "My first book, A Day to Remember, captured the beauty of small, everyday moments during an immersive journey through the Philippines. With my second book, Days and Nights in Vietnam: The Puzzle of My Soul, I invite you into a deeply personal adventure through vibrant landscapes and quiet moments of reflection that shaped my path. It is a story about courage, self-discovery, and the freedom that appears when you embrace the unknown.",
        "And the journey doesn’t end there – many more stories are waiting to find their way into print.",
        "Travel has taught me that fear is an illusion – one we can overcome the moment we take a single brave step. This is what I hope my books inspire in you: to step into your own adventure, face your fears, and rediscover the vast potential you carry within.",
        "When I’m not writing or exploring, I connect with readers, shape new ideas, and look for small ways to leave kindness along the road.",
        "Thank you for being part of this journey – may these stories bring a spark of courage and joy into your life.",
      ],
    },
  },


{
  id: "john-doe", // URL: /autori/john-doe
  photo: "/assets/books/authors/autor-no-name-unu.webp",

  // opțional — max 2–3 imagini; dacă le pui, pagina de autor le poate arăta în colaj
  gallery: [
    "/assets/books/authors/john-doe-2.webp",
    "/assets/books/authors/john-doe-3.webp",
  ],

  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    website: "",
  },

  featuredBook: {
    title: "",        // ex.: "Zile și nopți de Vietnam"
    href: "/carti",
  },

  books: [
    // "zile-si-nopti-de-vietnam"
  ],

  ro: {
    name: "Aici va fi numele tău 😊",
    role: "Autor Midaway",
    tagline: "în curând",
    bio: [
      "Aici va fi povestea ta. 😊",
      "În curând. 😊",
      "",
    ],
  },

  en: {
    name: "Your name here 😊",
    role: "Midaway author",
    tagline: "soon",
    bio: [
      "Your story here. 😊",
      "Soon. 😊",
      "",
    ],
  },
},

{
  id: "john-doe", // URL: /autori/john-doe
  photo: "/assets/books/authors/autor-no-name-doi.webp",

  // opțional — max 2–3 imagini; dacă le pui, pagina de autor le poate arăta în colaj
  gallery: [
    "/assets/books/authors/john-doe-2.webp",
    "/assets/books/authors/john-doe-3.webp",
  ],

  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    website: "",
  },

  featuredBook: {
    title: "",        // ex.: "Zile și nopți de Vietnam"
    href: "/carti",
  },

  books: [
    // "zile-si-nopti-de-vietnam"
  ],

  ro: {
    name: "Aici va fi numele tău 😊",
    role: "Autor Midaway",
    tagline: "în curând",
    bio: [
      "Aici va fi povestea ta. 😊",
      "În curând. 😊",
      "",
    ],
  },

  en: {
    name: "Your name here 😊",
    role: "Midaway author",
    tagline: "soon",
    bio: [
      "Your story here. 😊",
      "Soon. 😊",
      "",
    ],
  },
},

{
  id: "john-doe", // URL: /autori/john-doe
  photo: "/assets/books/authors/autor-no-name-trei.webp",

  // opțional — max 2–3 imagini; dacă le pui, pagina de autor le poate arăta în colaj
  gallery: [
    "/assets/books/authors/john-doe-2.webp",
    "/assets/books/authors/john-doe-3.webp",
  ],

  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    website: "",
  },

  featuredBook: {
    title: "",        // ex.: "Zile și nopți de Vietnam"
    href: "/carti",
  },

  books: [
    // "zile-si-nopti-de-vietnam"
  ],

  ro: {
    name: "Aici va fi numele tău 😊",
    role: "Autor Midaway",
    tagline: "în curând",
    bio: [
      "Aici va fi povestea ta. 😊",
      "În curând. 😊",
      "",
    ],
  },

  en: {
    name: "Your name here 😊",
    role: "Midaway author",
    tagline: "soon",
    bio: [
      "Your story here 😊",
      "Soon",
      "",
    ],
  },
},
];

/* ──────────────────────────────────────────────────────────────
   TEMPLATE — Adaugă rapid un autor nou (copie + editează, apoi
   scoate comentariul). Păstrează-l aici ca “șablon invizibil”.
   Pași:
   1) Pune fotografiile la: /public/assets/books/authors/<slug>-*.webp
      Ex.:
        /public/assets/books/authors/john-doe.webp        (cover)
        /public/assets/books/authors/john-doe-2.webp      (gallery)
        /public/assets/books/authors/john-doe-3.webp      (gallery)
   2) Copiază blocul, înlocuiește câmpurile, ȘI DECOMENTEAZĂ.
   3) Pentru a apărea primul în listă, pune autorul NOU la
      începutul array-ului `authors`.
   ──────────────────────────────────────────────────────────────

{
  id: "john-doe", // URL: /autori/john-doe
  photo: "/assets/books/authors/john-doe.webp",

  // opțional — max 2–3 imagini; dacă le pui, pagina de autor le poate arăta în colaj
  gallery: [
    "/assets/books/authors/john-doe-2.webp",
    "/assets/books/authors/john-doe-3.webp",
  ],

  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    website: "",
  },

  featuredBook: {
    title: "",        // ex.: "Zile și nopți de Vietnam"
    href: "/carti",
  },

  books: [
    // "zile-si-nopti-de-vietnam"
  ],

  ro: {
    name: "Nume Prenume",
    role: "Scriitor/Scriitoare",
    tagline: "Povestitor, călător, etc.",
    bio: [
      "Paragraf 1 (RO)",
      "Paragraf 2 (RO)",
      "Paragraf 3 (RO)",
    ],
  },

  en: {
    name: "Name Surname",
    role: "Writer",
    tagline: "Storyteller, traveler, etc.",
    bio: [
      "Paragraph 1 (EN)",
      "Paragraph 2 (EN)",
      "Paragraph 3 (EN)",
    ],
  },
},
*/

export default authors;
