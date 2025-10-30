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
        "În ultimii trei ani, am călătorit prin trei continente: Asia, Europa, Africa – provocându-mă să mă eliberez de limitele și temerile care credeam că mă definesc. Scrisul a fost întotdeauna modul meu de a înțelege lumea, iar prin călătoriile mele, am descoperit că singurele limite reale cu care ne confruntăm sunt cele pe care le creăm în mintea noastră.",
        "Prima mea carte, „O zi de care să-ți amintești”, a explorat frumusețea momentelor aparent mici, într-o imersiune prin Filipine. Cu „Zile și nopți de Vietnam: Bucăți dintr-un suflet nomad”, vă invit să vă alăturați mie într-o aventură profund personală prin peisaje vibrante și momente de introspecție. E o poveste despre curaj, descoperire de sine și libertatea care vine când îmbrățișezi necunoscutul. Dar cărțile mele nu se opresc aici – călătoria continuă.",
        "Următoarele mele povești, primele două volume din seria „Pași prin Indonezia”, sunt despre transformare, curaj și magia de a te lăsa purtat(ă) de viață atunci când renunți la hartă: Bali – o insulă – oglindă ce arde lent și vindecă profund – și Java, un teritoriu haotic și viu, unde rătăcirea devine formă de regăsire.",
        "Am învățat că frica este doar o iluzie, una pe care o depășim când facem primul pas curajos. Asta sper să inspire cărțile mele: să pășiți în propria aventură, să vă înfruntați temerile și să redescoperiți potențialul nelimitat din voi.",
        "Când nu scriu sau nu explorez, vorbesc cu cititori, planific noi povești și caut mici gesturi de bunătate oriunde merg. Mulțumesc că faceți parte din călătorie – sper ca paginile mele să aducă o scânteie de curaj și bucurie.",
      ],
    },
    en: {
      name: "Mida Malena",
      role: "Writer",
      tagline: "Storyteller, traveler, forever seeker.",
      bio: [
        "Hi, I'm Mida Malena – storyteller, adventurer, and eternal seeker.",
        "Over the past three years, I've traveled across three continents: Asia, Europe, and Africa – challenging myself to break free from the limitations and fears I thought defined me. Writing has always been my way of understanding the world, and through my travels, I have discovered that the only real limits we face are those we create in our minds.",
        "My next stories, the first two volumes in the series Steps Through Indonesia are about transformation, courage, and the magic of letting yourself be carried away by life when you give up the map: Bali – an island – a mirror that burns slowly and heals deeply – and Java, a chaotic and lively territory, where wandering becomes a form of rediscovery.",
        "My first book, A Day to Remember, explored the beauty of seemingly small, everyday moments in an immersion through the Philippines. With my second book, Days and Nights in Vietnam: The Puzzle Of My Soul, I invite you to join me on a deeply personal adventure through the vibrant landscapes and quiet moments of introspection that shaped my journey. It is a story about courage, self-discovery, and the freedom that comes when you embrace the unknown. But my books don't stop there, the journey continues... I have many stories waiting to see the light of print.",
        "Through my travels, I have learned that fear is just an illusion, one that we can overcome when we take that first courageous step. And that is what I hope my books will inspire you to do – to step into your own adventure, face your fears, and rediscover the unlimited potential within yourself.",
        "When I'm not writing or exploring, I interact with readers like you, plan new stories, and find ways to leave small gestures of kindness wherever I go. Thank you for being part of my journey – I hope my stories bring a spark of courage and joy to your life.",
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
