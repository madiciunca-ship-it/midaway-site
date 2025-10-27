// src/data/authors.js
const authors = [
    {
      id: "mida-malena",                           // slug din URL: /autori/mida-malena
      photo: "/assets/authors/mida-malena.webp",   // pune poza aici când o ai
      socials: {
        instagram: "https://www.instagram.com/midaway.official/",
        facebook: "https://www.facebook.com/share/1B9AJBjdX1/?mibextid=wwXIfr",
        youtube: "https://www.youtube.com/channel/UCKos5McBc44j6dViovnKiZw",
        website: "https://midaway.ro",             // dacă vrei
      },
      books: [
        // slugs din sistemul tău de cărți (dacă ai); dacă nu, lasă gol sau pune doar titluri plain
        // "zile-si-nopti-de-vietnam",
      ],
  
      ro: {
        name: "Mida Malena",
        role: "scriitoare",
        tagline: "Povești vii, din mersul lumii.",
        bio: [
          "Scriitoare și călătoare. Creează proiecte care adună oameni, drumuri și cuvinte.",
          "Interesată de jurnale de drum, eseuri și literatură care schimbă ceva în interior.",
        ],
      },
      en: {
        name: "Mida Malena",
        role: "writer",
        tagline: "Living stories from the road.",
        bio: [
          "Writer and traveler. Builds projects that bring together people, roads and words.",
          "Interested in travel journals, essays and literature that shifts something inside.",
        ],
      },
    },
  
    // Adaugi ușor alții, copiați după structura de mai sus:
    /*
    {
      id: "john-doe",
      photo: "/assets/authors/john-doe.webp",
      socials: { instagram: "", website: "" },
      books: [],
      ro: { name: "John Doe", role: "autor", tagline: "…", bio: ["…"] },
      en: { name: "John Doe", role: "author", tagline: "…", bio: ["…"] },
    }
    */
  ];
  
  export default authors;
  