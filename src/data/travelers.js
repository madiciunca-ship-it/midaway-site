// src/data/travelers.js

// NOTE despre imagini:
// Pune imaginile în public/assets/travelers/<id>/
//   - cover.webp (eroul din listă + fallback în detaliu)
//   - 1.webp, 2.webp, 3.webp (galeria din detaliu; pot fi mai puține)
//
// Ex: public/assets/travelers/nomad-bali/cover.webp
//     public/assets/travelers/nomad-bali/1.webp
//     public/assets/travelers/nomad-bali/2.webp
//     public/assets/travelers/nomad-bali/3.webp

const travelers = [
    {
      id: "nomad-bali",
      emoji: "🏝️",
      name: "Nomadul din Bali",
      tagline: "Ocean, cod și mango",
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
          "La final, lasăm loc pentru povestea comună – sau un gând către cititori.",
        ],
      },
      en: {
        intro: `I met Adi back when we were both taking dance lessons. A few months later I was flirting with the idea of leaving for Bali — and one evening I saw a post from him: he was there, exactly where I dreamed of going. I had never spoken to him before, but I wrote a simple message: “How is Bali?”
  
  That’s how it all started... (translate/update as you wish)`,
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
          "Space for the shared story / final thought.",
        ],
      },
      video: null,
    },
  
    // 🔻 alte intrări vor urma; doar adaugi obiecte la acest array.
  ];
  
  export default travelers;
  