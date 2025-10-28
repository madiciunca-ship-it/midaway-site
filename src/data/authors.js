// src/data/authors.js
const authors = [
  {
    id: "mida-malena",                           // URL: /autori/mida-malena
    photo: "/assets/books/authors/mida-malena.webp",   // pune poza aici (public/assets/authors/)
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
        "Am învățat că frica este doar o iluzie, una pe care o depășim când facem primul pas curajos. Asta sper să inspire cărțile mele: să pășiți în propria aventură, să vă înfruntați temerile și să redescoperiți potențialul nelimitat din voi.",
        "Când nu scriu sau nu explorez, vorbesc cu cititori, planific noi povești și caut mici gesturi de bunătate oriunde merg. Mulțumesc că faceți parte din călătorie – sper ca paginile mele să aducă o scânteie de curaj și bucurie.",
      ],
    },
    en: {
      name: "Mida Malena",
      role: "writer",
      tagline: "Storyteller, traveler, forever seeker.",
      bio: [
        "Hi, I'm Mida Malena—storyteller, adventurer, and eternal seeker.",
        "Over the past three years, I've traveled across three continents: Asia, Europe, and Africa—challenging myself to break free from the limitations and fears I thought defined me. Writing has always been my way of understanding the world, and through my travels, I have discovered that the only real limits we face are those we create in our minds.",
        "My first book, A Day to Remember, explored the beauty of seemingly small, everyday moments in an immersion through the Philippines. With my second book, Days and Nights in Vietnam: The Puzzle Of My Soul, I invite you to join me on a deeply personal adventure through the vibrant landscapes and quiet moments of introspection that shaped my journey. It is a story about courage, self-discovery, and the freedom that comes when you embrace the unknown. But my books don't stop there, the journey continues... I have many stories waiting to see the light of print.",
        "Through my travels, I have learned that fear is just an illusion, one that we can overcome when we take that first courageous step. And that is what I hope my books will inspire you to do—to step into your own adventure, face your fears, and rediscover the unlimited potential within yourself.",
        "When I'm not writing or exploring, I interact with readers like you, plan new stories, and find ways to leave small gestures of kindness wherever I go. Thank you for being part of my journey—I hope my stories bring a spark of courage and joy to your life.",
      
      ],
    },
  },
];

export default authors;
