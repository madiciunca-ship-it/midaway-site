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
    coverUrl: "/assets/books/o-zi-de-care-sa-ti-amintesti-ebook.JPEG",
    extraImage: "/assets/books/gallery/o-zi-de-care-sa-ti-amintesti-back.JPEG", // ✅ coperta spate
    sampleUrl: "https://docs.google.com/document/d/1YRC7JYKQp1Yprju11EEhGtfkBCgqzbpxbkwcz1AEppM/preview",
    buyUrl: "https://cumpara-pb.com", // link carte fizică
    ebookUrlPDF: "https://gumroad.com/l/pdf-o-zi",
    ebookUrlEPUB: "https://gumroad.com/l/epub-o-zi",
    prices: {
      Paperback: 65,
      PDF: 45,
      EPUB: 45,
    },

    // 🔹 NOILE câmpuri tehnice
  pages: 272,
  isbn: "978-606-95545-7-9",
  dimensions: "13 x 20 cm",
  weight: "în curs de actualizare",
  
    description: `Yda pornește singură în călătoria vieții ei, împinsă de o forță pe care nu și-o putea explica. Nu știe cu adevărat ce caută, dar speră să găsească răspunsuri la multitudinea de frământări și necunoscute din mintea ei. Pașii o poartă pe una dintre cele mai minunate insule ale lumii, nu numai pentru a o admira în splendoarea și desăvârșirea ei, dar și pentru că doar aici, în acest cadru și în tot acest context, reușește să își exploreze interiorul, să își depășească multe dintre barierele mentale auto-impuse, tipare adânc înrădăcinate. Oamenii, locurile, întâmplările, toate au însoțit-o pe traseu, Yda fiind prezentă acolo cu toată ființa ei. Palawan este copleșitor pentru ea, o transformă și o desăvârșește la un nivel pe care nici măcar ea nu și l-ar fi imaginat. Plină de inspirație, cartea a fost o reală provocare. Cu fiecare pagină parcursă, vei descoperi o lume nouă, vei simți ce a trăit Yda.`,
  },
  
  
  {
    id: "2",
    title: "Zile și nopți de Vietnam",
    subtitle: "Jurnal de călătorie în Vietnam",
    author: "Autor: Mida-Malena",
    description: "Orașe pline de viață și drumuri care schimbă suflete.",
    genre: "Travel",
    location: "Vietnam",
    year: 2025,
    publisher: "Independent Publisher Mida Malena",
    tags: ["memorii", "călătorii", "cultură", "autentic"],
    coverUrl: "https://images.unsplash.com/photo-1504788363733-507549153474?q=80&w=1200&auto=format&fit=crop",
    sampleUrl: "#sample-2",
    ebookUrl: "/carti/vietnam-ebook",
    buyUrl: "#cumpara-2",
    prices: {
      Paperback: 65,
      eBook: 45
    }
  }
];
