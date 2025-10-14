// src/data/books.js – model per carte, RO/EN separate
// -----------------------------------------------------
// - currency: RON (RO), EUR (EN)
// - prices per format; Audiobook default 0 până la lansare
// - availability per format (boolean). Dacă e false → UI „SOON” + server blochează.
// - files doar pentru formatele digitale (PDF/EPUB). Paperback/Audiobook nu au fișiere.
// - "hidden" poate ascunde o carte din listă până e gata.

export const BOOKS = [
  // ————————————————————————————————————————————————
  // O zi de care să-ți amintești (RO)
  // ————————————————————————————————————————————————
  {
    id: "o-zi-ro",
    lang: "RO",
    currency: "RON",

    title: "O zi de care să-ți amintești",
    subtitle: "Jurnal de călătorie în Filipine",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Filipine",
    year: 2023,
    publisher: "Dreams Publishing House",

    coverUrl: "/assets/books/o-zi-de-care-sa-ti-amintesti-cover.JPEG",
    extraImage: "/assets/books/o-zi-de-care-sa-ti-amintesti-spate.jpeg",

    sampleUrl:
      "https://docs.google.com/document/d/1YRC7JYKQp1Yprju11EEhGtfkBCgqzbpxbkwcz1AEppM/preview",

    tags: ["eBook", "PDF", "EPUB", "călătorii"],
    format: "eBook",

    prices: { PDF: 45, EPUB: 45, Paperback: 65, Audiobook: 0 },

    availability: {
      PDF: true,
      EPUB: true,
      Paperback: false,
      Audiobook: false,
    },

    files: {
      PDF: "/files/o-zi-de-care-sa-ti-amintesti-ro.pdf",
      EPUB: "/files/o-zi-de-care-sa-ti-amintesti-ro.epub",
    },

    pages: 272,
    isbn: "978-606-95545-7-9",
    dimensions: "13 x 20 cm",
    weight: "—",

    description: `Yda pornește singură în călătoria vieții ei, împinsă de o forță pe care nu și-o putea explica. Nu știe cu adevărat ce caută, dar speră să găsească răspunsuri la multitudinea de frământări și necunoscute din mintea ei. Pașii o poartă pe una dintre cele mai minunate insule ale lumii, nu numai pentru a o admira în splendoarea și desăvârșirea ei, dar și pentru că doar aici, în acest cadru și în tot acest context, reușește să își exploreze interiorul, să își depășească multe dintre barierele mentale auto-impuse, tipare adânc înrădăcinate. Oamenii, locurile, întâmplările, toate au însoțit-o pe traseu, Yda fiind prezentă acolo cu toată ființa ei. Palawan este copleșitor pentru ea, o transformă și o desăvârșește la un nivel pe care nici măcar ea nu și l-ar fi imaginat. Plină de inspirație, cartea a fost o reală provocare. Cu fiecare pagină parcursă, vei descoperi o lume nouă, vei simți ce a trăit Yda.`,
    hidden: false,
  },

  // ————————————————————————————————————————————————
  // O zi de care să-ți amintești (EN) – SOON
  // ————————————————————————————————————————————————
  {
    id: "o-zi-en",
    lang: "EN",
    currency: "EUR",

    title: "A Day to Remember",
    subtitle: "Travel Journal in the Philippines",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Philippines",
    year: 2023,
    publisher: "Dreams Publishing House",

    coverUrl: "/assets/books/o-zi-de-care-sa-ti-amintesti-cover.JPEG",
    extraImage: "/assets/books/o-zi-de-care-sa-ti-amintesti-spate.jpeg",

    sampleUrl: "#",

    tags: ["eBook", "PDF", "EPUB", "travel"],
    format: "eBook",

    prices: { PDF: 0, EPUB: 0, Paperback: 0, Audiobook: 0 },

    availability: {
      PDF: false,
      EPUB: false,
      Paperback: false,
      Audiobook: false,
    },

    files: {},

    pages: 272,
    isbn: "—",
    dimensions: "13 x 20 cm",
    weight: "—",

    description: `English edition coming soon.`,
    hidden: true,
  },

  // ————————————————————————————————————————————————
  // Zile și nopți de Vietnam (RO)
  // ————————————————————————————————————————————————
  {
    id: "vietnam-ro",
    lang: "RO",
    currency: "RON",

    title: "Zile și nopți de Vietnam",
    subtitle: "Bucăți dintr-un suflet nomad",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    coverUrl: "/assets/books/zile-si-nopti-de-vietnam-cover.png",
    extraImage: "/assets/books/zile-si-nopti-de-vietnam-spate.png",

    sampleUrl: "#",

    tags: ["memorii", "călătorii", "cultură", "autentic"],
    format: "eBook",

    prices: { PDF: 45, EPUB: 45, Paperback: 65, Audiobook: 0 },

    availability: {
      PDF: true,
      EPUB: true,
      Paperback: false,
      Audiobook: false,
    },

    files: {
      PDF: "/files/zile-si-nopti-de-vietnam-ro.pdf",
      EPUB: "/files/zile-si-nopti-de-vietnam-ro.epub",
    },

    pages: 314,
    isbn: "978-9-7304-1386-1",
    dimensions: "13 x 20 cm",
    weight: "—",

    description: `Această călătorie nu este doar despre mine – este despre tine și despre oamenii care ne intersectează drumul, modelând ceea ce suntem și ceea ce urmează să devenim. Pășește spre extraordinar și lasă în urmă previzibilul...`,
    hidden: false,
  },

  // ————————————————————————————————————————————————
  // Zile și nopți de Vietnam (EN)
  // ————————————————————————————————————————————————
  {
    id: "vietnam-en",
    lang: "EN",
    currency: "EUR",

    title: "Days and Nights of Vietnam",
    subtitle: "Pieces from a Nomad Soul",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    coverUrl: "/assets/books/zile-si-nopti-de-vietnam-cover.png",
    extraImage: "/assets/books/zile-si-nopti-de-vietnam-spate.png",

    sampleUrl: "#",

    tags: ["memoir", "travel", "culture", "authentic"],
    format: "eBook",

    prices: { PDF: 45, EPUB: 45, Paperback: 65, Audiobook: 0 },

    availability: {
      PDF: true,
      EPUB: true,
      Paperback: false,
      Audiobook: false,
    },

    files: {
      PDF: "/files/zile-si-nopti-de-vietnam-en.pdf",
      EPUB: "/files/zile-si-nopti-de-vietnam-en.epub",
    },

    pages: 314,
    isbn: "978-9-7304-1386-1",
    dimensions: "13 x 20 cm",
    weight: "—",

    description: `This journey is not only about me — it's about you and the people whose paths cross ours, shaping who we are and who we become...`,
    hidden: false,
  },
];

// Export opțional: listă standard pentru UI
export const FORMATS = ["PDF", "EPUB", "Paperback", "Audiobook"];
