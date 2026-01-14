// src/data/books.js
// -----------------------------------------------------
// Chei UPPERCASE pentru prices/availability (PDF/EPUB/PAPERBACK/AUDIOBOOK)

export const BOOKS = [
  // ————————————————————————————————————————————————
  // O zi de care să-ți amintești (RO)
  // ————————————————————————————————————————————————
  {
    id: "o-zi-ro",
    addedAt: "2025-10-27T10:00:00Z",
    lang: "RO",
    currency: "RON",

    title: "O zi de care să-ți amintești / Filipine",
    subtitle: "O carte despre curajul de a începe o călătorie – chiar când nu ai planul complet.",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Filipine",
    year: 2023,
    publisher: "Dreams Publishing House",

    formatDetails: {
      ebook:     { pages: 272, isbn: "978-606-94962-8-2" },
      paperback: { pages: 272, isbn: "978-606-95545-7-9", dimensions: "13 x 20 cm", weight: "380 gr." },
    },

    coverUrl: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-cover.JPEG",
    extraImage: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-back.JPEG",

    sampleUrl: "/files/sample-o-zi-de-care-sa-ti-amintesti-ro.pdf",

    tags: ["eBook", "PDF", "EPUB", "călătorii"],
    format: "eBook",

    prices: { PDF: 45, EPUB: 45, PAPERBACK: 65, AUDIOBOOK: 0 },
    availability: { PDF: true, EPUB: true, PAPERBACK: true, AUDIOBOOK: false },

    files: {
      PDF:  "/files/o-zi-de-care-sa-ti-amintesti-ro.pdf",
      EPUB: "/files/o-zi-de-care-sa-ti-amintesti-ro.epub",
    },

    description: [
      "Nu trebuie să fi fost în Filipine. Trebuie doar să fi simțit că trebuie să pleci – ca să te auzi din nou.",
      "Filipine este doar fundalul. Povestea reală e alta: ce se întâmplă în tine când pleci singur(ă), când nu mai ai unde să te ascunzi și începi să te întâlnești cu propriile frământări.",
      "Yda pornește împinsă de o forță pe care nu și-o poate explica. Nu știe exact ce caută, dar speră să găsească răspunsuri. Iar drumul o duce în Palawan – nu doar ca să admire insula, ci ca să-și exploreze interiorul și să-și depășească barierele mentale auto-impuse.",
      "„O zi de care să-ți amintești” e un jurnal viu – cu lumină, haos, oameni, locuri și întâmplări care apar o singură dată și totuși rămân. Cu fiecare pagină parcursă, simți ce a trăit Yda.",
      "Nu locurile ne schimbă, ci felul în care alegem să le trăim.",
      "Aceasta nu este:",
      "– un ghid de călătorie",
      "– o listă cu „ce să mănânci” și „unde să mergi”",
      "– o carte despre Filipine ca destinație",
      "Este o carte despre curajul de a pleca fără toate răspunsurile – și despre schimbarea care începe discret.",
      "Cartea asta e pentru tine dacă:",
      "– simți că ai tot amânat o versiune mai adevărată a ta",
      "– vrei o escapadă care nu e „turism”, ci reset",
      "– ți-e dor de un semn că e ok să pornești chiar și când nu ai planul complet",
    ],    
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
    publisher: "Independent Publisher Mida MAlena",

    formatDetails: {
      ebook:     { pages: null, isbn: "" },
      paperback: { pages: null, isbn: "", dimensions: "", weight: "" },
    },

    coverUrl: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-cover.JPEG",
    extraImage: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-back.JPEG",

    sampleUrl: "/files/sample-o-zi-de-care-sa-ti-amintesti-ro.pdf",

    tags: ["eBook", "PDF", "EPUB", "travel"],
    format: "eBook",

    prices: { PDF: 0, EPUB: 0, PAPERBACK: 0, AUDIOBOOK: 0 },
    availability: { PDF: false, EPUB: false, PAPERBACK: false, AUDIOBOOK: false },

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

    title: "Zile și nopți de Vietnam – Bucăți dintr-un suflet nomad",
    subtitle: "Un drum fără dată de întoarcere. Nu pentru că nu te mai întorci, ci pentru că nu te mai întorci la fel.",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    formatDetails: {
      ebook:     { pages: 302, isbn: "978-973-0-41387-8" },
      paperback: { pages: 314, isbn: "978-9-7304-1386-1", dimensions: "13 x 20 cm", weight: "380 gr." },
    },

    coverUrl: "/assets/books/zile-si-nopti-de-vietnam-cover.png",
    extraImage: "/assets/books/zile-si-nopti-de-vietnam-spate.png",

    sampleUrl: "/files/sample-zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.pdf",

    tags: ["memorii", "călătorii", "cultură", "travel", "autentic"],
    format: "eBook",

    vendors: {
      novela: {
        url: "https://novela.ro/zile-si-nopti-de-vietnam-mida-malena-978-973-0-41386-1",
        label: "Novela",
        visible: false,
      },
    },

    prices: { PDF: 45, EPUB: 45, PAPERBACK: 65, AUDIOBOOK: 0 },
    availability: { PDF: true, EPUB: true, PAPERBACK: true, AUDIOBOOK: false },

    files: {
      PDF:  "/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro1.pdf",
      EPUB: "/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro1.epub",
    },

    description: [
      "Nu trebuie să fi fost în Vietnam. Trebuie doar să fi simțit că previzibilul nu te mai încape.",
      "„Zile și nopți de Vietnam – Bucăți dintr-un suflet nomad” nu e doar un jurnal de călătorie. E o explorare a sinelui – în care locurile devin oglinzi, iar oamenii care îți intersectează drumul modelează ce ești și ce urmează să devii.",
      "Prin agitația vibrantă și frumusețea calmă a Vietnamului, Yda descoperă magia din banalul fiecărei zile și țese povești despre curaj, vulnerabilitate și bucuria de a trăi cu autenticitate.",
      "De la forfota orașelor aglomerate până la liniștea satelor ascunse în munți, fiecare moment se așază ca o piesă dintr-un puzzle mai mare – și îți arată adevăruri care ies la iveală doar când îndrăznești să mergi dincolo de predictibil.",
      "Aceasta nu este:",
      "– o carte despre Vietnam ca destinație",
      "– un ghid de călătorie",
      "– o lectură cu rețete rapide pentru „reinventare”",
      "Este o invitație să te rătăcești puțin – și, tocmai de aceea, să te regăsești.",
      "Cartea asta e pentru tine dacă:",
      "– vrei o călătorie care te scoate din zona de confort, chiar și pentru câteva pagini",
      "– simți că fragmentele autentice din tine stau ascunse în imprevizibil",
      "– îți plac poveștile care rămân cu tine după ce închizi cartea",
    ],
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

    title: "Days and Nights of Vietnam – The Puzzle of My Soul",
    subtitle: "A journey with no return date. Not because you can’t go back – but because you can’t go back unchanged.",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    formatDetails: {
      ebook:     { pages: 349, isbn: "B0DSBS9J8T" },
      paperback: { pages: 300, isbn: "979-8303117099", dimensions: "6 x 0.68 x 9 inches", weight: "1.14 pounds" },
    },

    coverUrl: "/assets/books/days-and-nights-of-vietnam-cover.png",
    extraImage: "/assets/books/days-and-nights-of-vietnam-back.png",

    sampleUrl: "/files/sample-days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.pdf",

    tags: ["memoir", "travel", "culture", "authentic"],
    format: "ebook",

    prices: { PDF: 12, EPUB: 12, PAPERBACK: 20, AUDIOBOOK: 0 },
    availability: { PDF: true, EPUB: true, PAPERBACK: false, AUDIOBOOK: false },

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
    },

    description: [
      "You don’t have to have been to Vietnam. You only have to feel like the predictable life no longer fits.",
      "“Days and Nights of Vietnam – The Puzzle of My Soul” isn’t just a travel journal. It’s an exploration of the self – where places become mirrors, and the people who cross your path shape who you are and who you’re becoming.",
      "Through Vietnam’s vibrant rush and quiet beauty, Yda discovers the magic in the ordinary and weaves stories about courage, vulnerability, and the joy of living with authenticity.",
      "From the chaos of crowded cities to the stillness of mountain villages, each moment settles like a piece of a larger puzzle – revealing truths that only surface when you dare to step beyond what’s predictable.",
      "This is not:",
      "– a book about Vietnam as a destination",
      "– a travel guide",
      "– a quick “reinvention” manual",
      "It’s an invitation to get a little lost – and, because of that, to find yourself again.",
      "This book is for you if:",
      "– you want a journey that nudges you out of your comfort zone, even for a few pages",
      "– you feel your truest fragments are hidden inside the unknown",
      "– you love stories that stay with you after you close the book",
    ],
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

    title: "Pași prin Indonezia – Când Bali îți atinge sufletul",
    subtitle: "Nu e despre Bali ca destinație. E despre ce se schimbă în tine când ajungi acolo.",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Indonezia",
    tags: ["memoir", "travel", "authentic"],
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    formatDetails: {
      ebook:     { pages: 346, isbn: "978-973-0-41387-8" },
      paperback: { pages: 366, isbn: "978-97304-1386-1", dimensions: "13 x 20 cm", weight: "400 gr." },
    },

    description: [
      "Cartea asta nu este despre Bali. Este despre ce se rupe în tine atunci când ajungi unde ai visat – și liniștea tot nu vine.",
      "Nu e un ghid. Nu e o carte de vacanță. Nu e o poveste motivațională. Bali e doar decorul.",
      "Cartea asta este pentru tine dacă:",
      "– simți că „ar trebui” să fii bine, dar nu ești\n– ai schimbat locuri, oameni, contexte – și totuși ceva lipsește\n– te gândești să pleci, dar știi că nu asta e problema\n– vrei liniște, dar nu știi unde s-a ascuns",
      "Nu trebuie să fi fost în Bali. Trebuie doar să te fi pierdut puțin pe drum.",
      "Yda ajunge pe insula zeilor cu speranța unui nou început. Dar ceea ce o așteaptă nu este o vacanță, ci o imersiune profundă în sine.",
      "„Pași prin Indonezia – Când Bali îți atinge sufletul” este o confesiune poetică despre frici, despre limite puse sub apă, despre femeia care învață să spună „nu”, despre oameni care apar și dispar cu sens.",
      "Nu locurile ne schimbă, ci felul în care alegem să le trăim.",
      "Aceasta nu este:\n– o carte despre Bali ca destinație\n– un ghid de călătorie\n– o lectură motivațională",
      "Este o carte despre tine, chiar dacă numele tău nu apare nicăieri.",
      "Dacă ai simțit vreodată că trebuie să pleci… ca să te poți întoarce la tine, cartea asta e pentru tine."
    ],
    

    coverUrl: "/assets/books/pasi-prin-indonezia-cand-bali-iti-atinge-sufletul-cover.jpg",
    extraImage: "/assets/books/pasi-prin-pasi-prin-indonezia-cand-bali-iti-atinge-sufletul-back.jpg",

    files: {
      PDF:  "/files/pasi-prin-indonezia-cand-bali-iti-atinge-sufletul-ro.pdf",
      EPUB: "/files/pasi-prin-indonezia-cand-bali-iti-atinge-sufletul-ro.epub",
    },

    sampleUrl: "/files/sample-pasi-prin-indonezia-cand-bali-iti-atinge-sufletul-ro.pdf",

    prices: { PDF: 45, EPUB: 45, PAPERBACK: 70, AUDIOBOOK: 0 },
    availability: { PDF: true, EPUB: true, PAPERBACK: true, AUDIOBOOK: false },

    payLink: null,
  },

  // ————————————————————————————————————————————————
  // Steps Through Indonezia (EN)
  // ————————————————————————————————————————————————
  {
    id: "indonezia-1-en",
    addedAt: "2025-11-08T00:00:00Z",
    lang: "EN",
    currency: "EUR",
    hidden: false,

    title: "Steps Through Indonezia",
    subtitle: "When Bali Touches Your Soul",
    author: "Mida-Malena",
    genre: "Travel",
    location: "Indonesia",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",

    formatDetails: {
      ebook:     { pages: 343, isbn: "978-973-0-41387-8" },
      paperback: { pages: 356, isbn: "979-8273659506", dimensions: "", weight: "" },
    },

    coverUrl: "/assets/books/steps-through-indonesia-when-bali-touches-your-soul-cover.png",
    extraImage: "/assets/books/steps-through-steps-through-indonesia-when-bali-touches-your-soul-back.png",

    sampleUrl: "/files/sample-steps-through-indonezia-when-bali-touches-your-soul-en.pdf",

    tags: ["memoir", "travel", "authentic"],
    format: "eBook",

    prices: { PDF: 12, EPUB: 12, PAPERBACK: 0, AUDIOBOOK: 0 },
    availability: { PDF: true, EPUB: true, PAPERBACK: false, AUDIOBOOK: false },

    files: {
      PDF:  "/files/steps-through-indonesia-when-bali-touches-your-soul-en.pdf",
      EPUB: "/files/steps-through-indonesia-when-bali-touches-your-soul-en.epub"
    },

    vendors: {
      amazon: {
        url: "https://www.amazon.com/dp/B0G1JS6ZVZ",
        label: "Amazon",
        visible: true,
        priceLabel: "Price on Amazon",
      },
    },

    description: `Bali is not just a destination. It is a mirror. A test. A slow burn. A book about femininity, freedom, and stories that burn brightly, even if they don't last. “Steps Through Indonesia: When Bali Touches Your Soul” is not just a travel story. Yda arrives on the island of the gods with the hope of a new beginning. But what awaits her is not a vacation – it is a deep immersion into herself. This first volume of the series “Steps Through Indonesia” is a poetic confession, a sincere search among beaches, waterfalls, and conversations that change destinies. From Seminyak to Lovina, among sacred temples and dizzying waters, Yda writes with raw and luminous sincerity about fears that must be confronted underwater, about the woman who learns to say “no,” about friends who appear and disappear with meaning, and about men who come and fall apart in words. Bali teaches her about beauty, about wandering, about the courage to stay true and write her own story. She discovers that it is not places that change us, but the way we choose to experience them. In a world where everyone is rushing to check off destinations, Yda travels inward. In Bali, everything seems like a story – but the real magic is what happens inside you. If you've ever felt like you had to leave... so you could return to yourself, this book is for you.`,
  },
];

// Export opțional: listă standard pentru UI
export const FORMATS = ["PDF", "EPUB", "PAPERBACK", "AUDIOBOOK"];

/*
────────────────────────────────────────────────────────
TEMPLATE-URI (INVIZIBILE) — păstrate doar ca REFERINȚĂ.
NU sunt executate pentru că sunt în comentariu.
────────────────────────────────────────────────────────

{  // TEMPLATE EN + Amazon
  id: "model-en-slug",
  addedAt: "2025-11-08T00:00:00Z",
  lang: "EN",
  currency: "EUR",
  title: "Book Title (EN)",
  subtitle: "Subtitle",
  author: "Mida-Malena",
  genre: "Travel",
  location: "Location",
  year: 2025,
  publisher: "Independent Publisher Mida Malena",
  formatDetails: { ebook:{pages:null,isbn:""}, paperback:{pages:null,isbn:"",dimensions:"",weight:""} },
  coverUrl: "/assets/books/new-cover.png",
  extraImage: "/assets/books/new-back.png",
  sampleUrl: "#",
  tags: ["memoir","travel","authentic"],
  format: "eBook",
  prices: { PDF:0, EPUB:0, PAPERBACK:0, AUDIOBOOK:0 },
  availability: { PDF:false, EPUB:false, PAPERBACK:false, AUDIOBOOK:false },
  files: { PDF:"", EPUB:"" },
  vendors: { amazon:{ url:"", label:"Amazon", visible:true, priceLabel:"Price on Amazon" } },
  description: "EN description…",
  hidden: true
}

{  // TEMPLATE RO
  id: "model-ro-slug",
  addedAt: "2025-11-01T00:00:00Z",
  lang: "RO",
  currency: "RON",
  title: "Titlu carte (RO)",
  subtitle: "Subtitlu",
  author: "Mida-Malena",
  genre: "Travel",
  location: "Locație",
  year: 2025,
  publisher: "Midaway Publishing House",
  formatDetails: { ebook:{pages:null,isbn:""}, paperback:{pages:null,isbn:"",dimensions:"",weight:""} },
  coverUrl: "/assets/books/cover-nou.png",
  extraImage: "/assets/books/back-nou.png",
  sampleUrl: "#",
  tags: ["memoir","travel","authentic"],
  format: "eBook",
  prices: { PDF:0, EPUB:0, PAPERBACK:0, AUDIOBOOK:0 },
  availability: { PDF:false, EPUB:false, PAPERBACK:false, AUDIOBOOK:false },
  files: { PDF:"", EPUB:"" },
  description: "Descriere RO…",
  hidden: true
}
*/
