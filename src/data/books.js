// src/data/books.js – model per carte, RO/EN separate
// -----------------------------------------------------
// - currency: RON (RO), EUR (EN)
// - prices per format (chei UPPERCASE).
// - availability per format (boolean, chei UPPERCASE).
// - files doar pentru formatele digitale (PDF/EPUB).
// - "hidden" poate ascunde o carte din listă până e gata.

export const BOOKS = [
  // ————————————————————————————————————————————————
  // O zi de care să-ți amintești (RO)
  // ————————————————————————————————————————————————
  {
    id: "o-zi-ro",
    addedAt: "2025-10-27T10:00:00Z",
    lang: "RO",
    currency: "RON",

    title: "O zi de care să-ți amintești",
    subtitle: "Jurnal de călătorie în Filipine",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Filipine",
    year: 2023,
    publisher: "Dreams Publishing House",

    formatDetails: {
      ebook:     { pages: 272, isbn: "978-606-94962-8-2" },
      paperback: { pages: 272, isbn: "978-606-95545-7-9", dimensions: "13 x 20 cm", weight: "380 gr." },
      // audiobook: { minutes: 420, narrator: "..." }
    },

    coverUrl: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-cover.JPEG",
    extraImage: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-back.JPEG",

    sampleUrl:
      "https://docs.google.com/document/d/1YRC7JYKQp1Yprju11EEhGtfkBCgqzbpxbkwcz1AEppM/preview",

    tags: ["eBook", "PDF", "EPUB", "călătorii"],
    format: "eBook",

    // chei UPPERCASE
    prices: { PDF: 5, EPUB: 45, PAPERBACK: 65, AUDIOBOOK: 0 },

    availability: {
      PDF: true,
      EPUB: true,
      PAPERBACK: true,
      AUDIOBOOK: false,
    },

    files: {
      PDF: "/files/o-zi-de-care-sa-ti-amintesti-ro.pdf",
      EPUB: "/files/o-zi-de-care-sa-ti-amintesti-ro.epub",
    },

    description: `Yda pornește singură în călătoria vieții ei, împinsă de o forță pe care nu și-o putea explica. Nu știe cu adevărat ce caută, dar speră să găsească răspunsuri la multitudinea de frământări și necunoscute din mintea ei. Pașii o poartă pe una dintre cele mai minunate insule ale lumii, nu numai pentru a o admira în splendoarea și desăvârșirea ei, dar și pentru că doar aici, în acest cadru și în tot acest context, reușește să își exploreze interiorul, să își depășească multe dintre barierele mentale auto-impuse, tipare adânc înrădăcinate. Oamenii, locurile, întâmplările, toate au însoțit-o pe traseu, Yda fiind prezentă acolo cu toată ființa ei. Palawan este copleșitor pentru ea, o transformă și o desăvârșește la un nivel pe care nici măcar ea nu și l-ar fi imaginat. Plină de inspirație, cartea a fost o reală provocare. Cu fiecare pagină parcursă, vei descoperi o lume nouă, vei simți ce a trăit Yda.`,
    hidden: false,
  },

  // ————————————————————————————————————————————————
  // O zi de care să-ți amintești (EN) – SOON
  // ————————————————————————————————————————————————
  {
    id: "o-zi-en",
    addedAt: "2025-10-28T10:00:00Z",
    lang: "EN",
    currency: "EUR",

    title: "A Day to Remember",
    subtitle: "Travel Journal in the Philippines",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Philippines",
    year: 2023,
    publisher: "Dreams Publishing House",

    formatDetails: {
      // când nu ai valori, lasă proprietatea lipsă sau pune null/"" – componenta știe să ignore
      ebook:     { pages: null, isbn: "" },
      paperback: { pages: null, isbn: "", dimensions: "", weight: "" },
      // audiobook: { minutes: 420, narrator: "..." }
    },

    coverUrl: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-cover.JPEG",
    extraImage: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-back.JPEG",

    sampleUrl: "#",

    tags: ["eBook", "PDF", "EPUB", "travel"],
    format: "eBook",

    prices: { PDF: 0, EPUB: 0, PAPERBACK: 0, AUDIOBOOK: 0 },

    availability: {
      PDF: false,
      EPUB: false,
      PAPERBACK: false,
      AUDIOBOOK: false,
    },

    files: {},

    description: `English edition coming soon.`,
    hidden: true,
  },

  // ————————————————————————————————————————————————
  // Zile și nopți de Vietnam (RO)
  // ————————————————————————————————————————————————
  {
    id: "vietnam-ro",
    addedAt: "2025-10-29T10:00:00Z",
    lang: "RO",
    currency: "RON",

    title: "Zile și nopți de Vietnam",
    subtitle: "Bucăți dintr-un suflet nomad",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    formatDetails: {
      ebook:     { pages: 301, isbn: "978-973-0-41387-8" },
      paperback: { pages: 314, isbn: "978-9-7304-1386-1", dimensions: "13 x 20 cm", weight: "380 gr." },
      // audiobook: { minutes: 420, narrator: "..." }
    },

    coverUrl: "/assets/books/zile-si-nopti-de-vietnam-cover.png",
    extraImage: "/assets/books/zile-si-nopti-de-vietnam-spate.png",

    sampleUrl: "#",

    tags: ["memorii", "călătorii", "cultură", "travel", "autentic"],
    format: "eBook",

    prices: { PDF: 45, EPUB: 45, PAPERBACK: 65, AUDIOBOOK: 0 },

    availability: {
      PDF: true,
      EPUB: true,
      PAPERBACK: true,
      AUDIOBOOK: false,
    },

    files: {
      PDF:  "/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.pdf",
      EPUB: "/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.epub",
    },

    description: `Această călătorie nu este doar despre mine – este despre tine și despre oamenii care ne intersectează drumul, modelând ceea ce suntem și ceea ce urmează să devenim. Pășește spre extraordinar și lasă în urmă previzibilul. Această carte te invită să ieși din zona de confort, chiar și pentru câteva momente, și să redescoperi fragmentele autentice din tine, ascunse în imprevizibil. Cum ar fi dacă fiecare pas spre necunoscut te-ar aduce mai aproape de cine ești cu adevărat? „Zile și Nopți de Vietnam: Bucăți dintr-un suflet nomad” nu este doar un jurnal de călătorie – este o explorare a sinelui. Prin agitația vibrantă și frumusețea calmă a Vietnamului, Yda descoperă magia din banalul fiecărei zile, țesând povești despre curaj, vulnerabilitate și bucuria de a trăi cu autenticitate. De la forfota orașelor aglomerate până la liniștea satelor ascunse în munți, fiecare moment se transformă într-o piesă dintr-un puzzle mai mare, dezvăluind adevăruri neașteptate ce ies la iveală atunci când te aventurezi dincolo de predictibil. Pentru cei care tânjesc după aventură, introspecție și curajul de a îmbrățișa viața în toate nuanțele sale, această carte este o invitație de a te rătăci și, totodată, de a te regăsi.`,
    hidden: false,
  },

  // ————————————————————————————————————————————————
  // Days and Nights Of Vietnam (EN)
  // ————————————————————————————————————————————————
  {
    id: "vietnam-en",
    addedAt: "2025-10-30T10:00:00Z",
    lang: "EN",
    currency: "EUR",

    title: "Days and Nights of Vietnam",
    subtitle: "The Puzzle of My Soul",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    formatDetails: {
      ebook:     { pages: 349, isbn: "B0DSBS9J8T" },
      paperback: { pages: 300, isbn: "979-8303117099", dimensions: "6 x 0.68 x 9 inches", weight: "1.14 pounds" },
      // audiobook: { minutes: 420, narrator: "..." }
    },

    coverUrl: "/assets/books/days-and-nights-of-vietnam-cover.png",
    extraImage: "/assets/books/days-and-nights-of-vietnam-back.png",

    sampleUrl: "#",

    tags: ["memoir", "travel", "culture", "authentic"],
    format: "ebook",

    prices: { PDF: 12, EPUB: 12, PAPERBACK: 20, AUDIOBOOK: 0 },

    availability: {
      PDF: true,
      EPUB: true,
      PAPERBACK: false, // vânzare externă pe Amazon
      AUDIOBOOK: false,
    },

    files: {
      PDF:  "/files/days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.pdf",
      EPUB: "/files/days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.epub",
    },

    vendors: {
      amazon: {
        url: "https://www.amazon.com/Days-Nights-Vietnam-Puzzle-Soul/dp/B0DSJQNKL5/ref=tmm_pap_swatch_0#detailBullets_feature_div",
        label: "Amazon",
        visible: true,
        priceLabel: "Price on Amazon",
      },
      partnerX: {
        url: "https://exemplu.shop/produs",
        label: "Distribuitor X",
        visible: false,
      },
    },

    description: `This journey isn’t just about me – it’s about you, and about the people who cross our paths, shaping who we are and who we’re becoming. Discover. Feel. Evolve. Step into the extraordinary. Leave behind the predictable. Days and Nights of Vietnam is a deeply personal travel memoir that invites you to step out of your comfort zone, even if just for a few moments, and rediscover the authentic pieces of yourself that lie waiting in the unfamiliar. Through the breathtaking landscapes of Vietnam – from bustling cities to serene mountain villages – and deeply introspective moments, this heartfelt journey weaves vivid descriptions of exotic locales with raw, honest reflections. Each experience – whether extraordinary or seemingly mundane – becomes a piece of a larger puzzle, revealing profound truths about self-discovery, courage, and the joy of living fully. This is not just a story about Vietnam; it’s a journey into the heart of what makes us human. It challenges you to embrace life in all its complexities, to welcome serendipitous encounters and fleeting moments of connection that can reshape your perspective. Let yourself be inspired to pause, reflect, and reconnect with who you truly are. Lose yourself in the vibrant chaos and serene beauty of Vietnam and find the strength to live boldly, authentically, and unapologetically. If you’ve ever dreamed of stepping into the unknown, of seeing life through a different lens, and of reclaiming the parts of yourself that were always meant to shine, Days and Nights of Vietnam is your invitation to embark on a journey of adventure, reflection, and transformation.`,
    hidden: false,
  },

  // ————————————————————————————————————————————————
  // Pași prin Indonezia (RO)
  // ————————————————————————————————————————————————
  {
    id: "indonezia-1-ro",
    addedAt: "2025-10-31T10:00:00Z",
    lang: "RO",
    currency: "RON",
    hidden: false,

    title: "Pași prin Indonezia – Vol. I",
    subtitle: "Când Bali îți atinge sufletul",
    author: "Mida-Malena",

    genre: "Travel",
    location: "Indonezia",
    tags: ["memoir", "travel", "authentic"],
    year: 2025,
    publisher: "Midaway Publishing House",

    formatDetails: {
      ebook:     { pages: 364, isbn: "" },
      paperback: { pages: 364, isbn: "", dimensions: "13 x 20 cm", weight: "400 gr." },
      // audiobook: { minutes: 420, narrator: "..." }
    },

    description: `Bali nu e doar o destinație. E o oglindă. Un test. O ardere lentă. O carte despre feminitate, libertate și povești care ard intens, chiar dacă nu durează.
„Pași prin Indonezia: Când Bali îți atinge sufletul” nu e o simplă poveste de călătorie. Yda ajunge pe insula zeilor cu speranța unui nou început. Dar ceea ce o așteaptă nu e o vacanță – ci o imersiune profundă în sine.
Acest prim volum al seriei „Pași prin Indonezia” e o confesiune poetică, o căutare sinceră printre plaje, cascade și conversații care schimbă destine.
De la Seminyak la Lovina, printre temple sacre și ape amețitoare, Yda scrie cu o sinceritate crudă și luminoasă despre frici care se cer confruntate sub apă, despre femeia care învață să spună „nu”, despre prietenii care apar și dispar cu sens, și despre bărbați care vin și se destramă în cuvinte.
Bali o învață despre frumusețe, despre rătăcire, despre curajul de a rămâne în adevăr și de a-și scrie propria poveste. Ea descoperă că nu locurile ne schimbă, ci felul în care alegem să le trăim.
Într-o lume în care toți aleargă să bifeze destinații, Yda călătorește înăuntru. În Bali, totul pare o poveste – dar adevărata magie e cea care se întâmplă în tine.
Dacă ai simțit vreodată că trebuie să pleci… ca să te poți întoarce la tine, cartea asta e pentru tine.`,

    coverUrl: "/assets/books/pasi-prin-pasi-prin-indonezia-cand-bali-iti-atinge-sufletul-cover.jpg",
    extraImage: "/assets/books/pasi-prin-pasi-prin-indonezia-cand-bali-iti-atinge-sufletul-back.jpg",

    files: {
      PDF:  "/files/pasi-prin-indonezia-cand-bali-iti-atinge-sufletul.pdf",
      EPUB: "/files/pasi-prin-indonezia-cand-bali-iti-atinge-sufletul.epub",
    },

    sampleUrl: "https://docs.google.com/document/d/1sYqLqp1oUIxJWG8iALg-Dgc-AMcfodDyafTFclkhc6M/edit?usp=sharing",

    prices: { PDF: 45, EPUB: 45, PAPERBACK: 65, AUDIOBOOK: 0 },
    availability: { PDF: true, EPUB: true, PAPERBACK: true, AUDIOBOOK: false },

    payLink: null,
  },

  // ————————————————————————————————————————————————
// Steps Through Indonezia — EN (cu Amazon)
// ————————————————————————————————————————————————
{
  id: "indonezia-1-en",                 // ← schimbă-l (litere/cifre/cratime)
  addedAt: "2025-11-01T00:00:00Z",
  lang: "EN",
  currency: "EUR",

  title: "Steps Through Indonezia",
  subtitle: "When Bali Touches Your Soul",
  author: "Mida-Malena",
  genre: "Travel",
  location: "Indonesia",
  year: 2025,
  publisher: "Midaway Publishing House",

  formatDetails: {
    ebook:     { pages: 270, isbn: "" },
    paperback: { pages: 270, isbn: "", dimensions: "", weight: "" },
    // audiobook: { minutes: null, narrator: "" }
  },

  coverUrl: "/assets/books/bali-eng-cover.png",
  extraImage: "/assets/books/bali-eng-back.png",

  sampleUrl: "#",

  tags: ["memoir", "travel", "authentic"],
  format: "eBook",

  prices: { PDF: 12, EPUB: 12, PAPERBACK: 0, AUDIOBOOK: 0 },
  availability: { PDF: true, EPUB: true, PAPERBACK: false, AUDIOBOOK: false },

  files: {
    PDF:  "",
    EPUB: ""
  },

  // vânzare externă – apare butonul „Buy on Amazon”
  vendors: {
    amazon: {
      url: "",                    // ← pune linkul Amazon când e gata
      label: "Amazon",
      visible: true,
      priceLabel: "Price on Amazon" // (opțional) textul care apare la preț
    },
    // partener opțional (ascuns până îl pornești)
    partnerX: {
      url: "",
      label: "Distributor",
      visible: false
    }
  },

  description: `EN description…`,
  hidden: true
},

  // ————————————————————————————————————————————————
// TEMPLATE (invizibil) — RO
// ————————————————————————————————————————————————
{
  id: "model-ro-slug",                 // ← schimbă-l (folosește doar litere/cifre/cratime)
  addedAt: "2025-11-01T00:00:00Z",     // ISO string (opțional)
  lang: "RO",
  currency: "RON",

  title: "Titlu carte (RO)",
  subtitle: "Subtitlu",
  author: "Mida-Malena",
  genre: "Travel",                     // un singur gen; pune extra în `tags`
  location: "Locație",
  year: 2025,
  publisher: "Midaway Publishing House",

  formatDetails: {
    ebook:     { pages: null, isbn: "" },
    paperback: { pages: null, isbn: "", dimensions: "", weight: "" },
    // audiobook: { minutes: null, narrator: "" }
  },

  coverUrl: "/assets/books/cover-nou.png",
  extraImage: "/assets/books/back-nou.png",

  sampleUrl: "#",

  tags: ["memoir", "travel", "authentic"],
  format: "eBook",

  // chei UPPERCASE (UI + server)
  prices: { PDF: 0, EPUB: 0, PAPERBACK: 0, AUDIOBOOK: 0 },
  availability: { PDF: false, EPUB: false, PAPERBACK: false, AUDIOBOOK: false },

  // doar pentru digitale
  files: {
    PDF:  "",
    EPUB: ""
  },

  description: `Descriere RO…`,
  hidden: true
},
// ————————————————————————————————————————————————
// TEMPLATE (invizibil) — EN (cu Amazon)
// ————————————————————————————————————————————————
{
  id: "model-en-slug",                 // ← schimbă-l (litere/cifre/cratime)
  addedAt: "2025-11-01T00:00:00Z",
  lang: "EN",
  currency: "EUR",

  title: "Book Title (EN)",
  subtitle: "Subtitle",
  author: "Mida-Malena",
  genre: "Travel",
  location: "Location",
  year: 2025,
  publisher: "Independent Publisher Mida Malena",

  formatDetails: {
    ebook:     { pages: null, isbn: "" },
    paperback: { pages: null, isbn: "", dimensions: "", weight: "" },
    // audiobook: { minutes: null, narrator: "" }
  },

  coverUrl: "/assets/books/new-cover.png",
  extraImage: "/assets/books/new-back.png",

  sampleUrl: "#",

  tags: ["memoir", "travel", "authentic"],
  format: "eBook",

  prices: { PDF: 0, EPUB: 0, PAPERBACK: 0, AUDIOBOOK: 0 },
  availability: { PDF: false, EPUB: false, PAPERBACK: false, AUDIOBOOK: false },

  files: {
    PDF:  "",
    EPUB: ""
  },

  // vânzare externă – apare butonul „Buy on Amazon”
  vendors: {
    amazon: {
      url: "",                    // ← pune linkul Amazon când e gata
      label: "Amazon",
      visible: true,
      priceLabel: "Price on Amazon" // (opțional) textul care apare la preț
    },
    // partener opțional (ascuns până îl pornești)
    partnerX: {
      url: "",
      label: "Distributor",
      visible: false
    }
  },

  description: `EN description…`,
  hidden: true
},
];

// Export opțional: listă standard pentru UI
export const FORMATS = ["PDF", "EPUB", "PAPERBACK", "AUDIOBOOK"];
