export const BOOKS = [
  {
    id: "o-zi-de-care-sa-ti-amintesti",
    title: "O zi de care să-ți amintești",
    subtitle: "Jurnal de călătorie în Filipine",
    author: "Autor: Mida-Malena",
    genre: "Travel",
    location: "Filipine",
    year: 2023,
    publisher: "Dreams Publishing House",
    tags: ["eBook", "PDF", "EPUB", "călătorii"],
    format: "eBook",

    // ✅ imaginile reale din repo (atenție la litere mari/mici)
    coverUrl: "/assets/books/o-zi-de-care-sa-ti-amintesti-cover.JPEG",
    extraImage: "/assets/books/o-zi-de-care-sa-ti-amintesti-spate.jpeg",

    sampleUrl:
      "https://docs.google.com/document/d/1YRC7JYKQp1Yprju11EEhGtfkBCgqzbpxbkwcz1AEppM/preview",
    buyUrl: "https://cumpara-pb.com", // link carte fizică (dacă dorești)
    ebookUrlPDF: "#", // nefolosit la checkout, lăsăm placeholder
    ebookUrlEPUB: "#",

    prices: {
      Paperback: 65,
      PDF: 45,
      EPUB: 45,
    },
    // ✅ adaugă asta:
    availability: {
      PDF:  { RO: true,  EN: false },  // EN = „SOON”
      EPUB: { RO: true,  EN: false },
      // dacă ai și Paperback pe viitor: Paperback: { RO: true, EN: false }
    },

    // 🔹 info tehnice
    pages: 272,
    isbn: "978-606-95545-7-9",
    dimensions: "13 x 20 cm",
    

    description: `Yda pornește singură în călătoria vieții ei, împinsă de o forță pe care nu și-o putea explica. Nu știe cu adevărat ce caută, dar speră să găsească răspunsuri la multitudinea de frământări și necunoscute din mintea ei. Pașii o poartă pe una dintre cele mai minunate insule ale lumii, nu numai pentru a o admira în splendoarea și desăvârșirea ei, dar și pentru că doar aici, în acest cadru și în tot acest context, reușește să își exploreze interiorul, să își depășească multe dintre barierele mentale auto-impuse, tipare adânc înrădăcinate. Oamenii, locurile, întâmplările, toate au însoțit-o pe traseu, Yda fiind prezentă acolo cu toată ființa ei. Palawan este copleșitor pentru ea, o transformă și o desăvârșește la un nivel pe care nici măcar ea nu și l-ar fi imaginat. Plină de inspirație, cartea a fost o reală provocare. Cu fiecare pagină parcursă, vei descoperi o lume nouă, vei simți ce a trăit Yda.`,
  },

  {
    id: "vietnam", // ✅ important pt. livrarea fișierelor
    title: "Zile și nopți de Vietnam",
    subtitle: "Bucăți dintr-un suflet nomad",
    author: "Autor: Mida-Malena",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",
    tags: ["memorii", "călătorii", "cultură", "autentic"],
    format: "eBook",

    // ✅ imaginile reale din repo
    coverUrl: "/assets/books/zile-si-nopti-de-vietnam-cover.png",
    extraImage: "/assets/books/zile-si-nopti-de-vietnam-spate.png",

    sampleUrl: "#", // dacă vrei un preview ulterior
    ebookUrlPDF: "#",
    ebookUrlEPUB: "#",
    buyUrl: "#",

    prices: {
      Paperback: 65,
      PDF: 45,
      EPUB: 45,
    },
    // ✅ adaugă asta:
    availability: {
      PDF:  { RO: true, EN: true },
      EPUB: { RO: true, EN: true },
    },

    // info opționale
    pages: 314,
    isbn: "978-9-7304-1386-1",
    dimensions: "13 x 20 cm",
   

    description: `Această călătorie nu este doar despre mine – este despre tine și despre oamenii care ne intersectează drumul, modelând ceea ce suntem și ceea ce urmează să devenim.

Pășește spre extraordinar și lasă în urmă previzibilul. Această carte te invită să ieși din zona de confort, chiar și pentru câteva momente, și să redescoperi fragmentele autentice din tine, ascunse în imprevizibil.
Cum ar fi dacă fiecare pas spre necunoscut te-ar aduce mai aproape de cine ești cu adevărat?

„Zile și Nopți de Vietnam: Bucăți dintr-un suflet nomad” nu este doar un jurnal de călătorie – este o explorare a sinelui. Prin agitația vibrantă și frumusețea calmă a Vietnamului, Yda descoperă magia din banalul fiecărei zile, țesând povești despre curaj, vulnerabilitate și bucuria de a trăi cu autenticitate.

De la forfota orașelor aglomerate până la liniștea satelor ascunse în munți, fiecare moment se transformă într-o piesă dintr-un puzzle mai mare, dezvăluind adevăruri neașteptate ce ies la iveală atunci când te aventurezi dincolo de predictibil.

Pentru cei care tânjesc după aventură, introspecție și curajul de a îmbrățișa viața în toate nuanțele sale, această carte este o invitație de a te rătăci și, totodată, de a te regăsi.`,
  },
];
