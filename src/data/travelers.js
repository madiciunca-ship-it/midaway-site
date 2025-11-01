// src/data/travelers.js
//
// IMAGINI:
// public/assets/travelers/<id>/cover.webp
// public/assets/travelers/<id>/1.webp
// public/assets/travelers/<id>/2.webp
// public/assets/travelers/<id>/3.webp

const travelers = [
    // ────────────────────────────────────────────────────────────
    // 1) Adi — Nomadul din Bali
    // ────────────────────────────────────────────────────────────
    {
      id: "nomad-bali",
      emoji: "🏝️",
   
      name: "Adrian Ștefan Ileș – Nomadul din Bali",
      tagline: "Laptop, motocicletă și filme",
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
          "La final, lasăm loc pentru povestea comună — sau un gând către cititori.",
        ],
      },
      en: {
        intro: `I first met Adi years ago, back when we were both taking dance classes. Back then, I had no idea what role he would one day play in my story.
        
A few months later, I was toying with the idea of going to Bali, when I stumbled upon one of his posts – he was actually there. We had never really talked before, but I wrote to him on Facebook: “Hey, how’s Bali?”
        
That’s how it all began. We started chatting, I asked him countless questions about traveling solo – safety, courage, what it really feels like. He told me something I’ll never forget:
“Don’t worry. I’ll be there to help you with anything I can.”
And he was.

Two months later, I left – not to Bali, but to Palawan, in the Philippines. A few months after that, I finally made it to Bali. Adi sent me everything he knew: files, routes, secret spots, and local tips. Wherever I was, he was there too – from afar – helping, guiding, encouraging.

Years later, when I no longer needed a travel guide, he still helped me – this time with my laptop, which constantly broke down. From a distance, he fixed every issue. We finally saw each other again after two and a half years, at the launch of my books.

And to think it all started with one message:
“Hey, do you think it’s safe for me to travel alone in Asia?”
Turns out, it was safer – and more beautiful – than I ever imagined. Because sometimes, the right people show up exactly when you need them most.`,
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
        story: ["Shared story / final thought."],
      },
      video: null,
    },
  
    {
      // 2) Yulia — O coincidență frumoasă
      id: "yulia-amalfi",
      emoji: "✍️",
      name: "Yulia — O coincidență frumoasă",
      tagline: "Luminoasă. Sinceră. De neuitat.",
      cover: "/assets/travelers/yulia-amalfi/yulia-amalfi-cover.webp",
      gallery: [
        "/assets/travelers/yulia-amalfi/yulia-amalfi-1.webp",
        "/assets/travelers/yulia-amalfi/yulia-amalfi-2.webp",
        "/assets/travelers/yulia-amalfi/yulia-amalfi-3.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "https://www.youtube.com/@Yutravelwithme/shorts",
        website: "",
        blog: "",
      },
    
      ro: {
        intro: `Am cunoscut-o pe Yulia întâmplător. Eram pe Coasta Amalfi, în Italia – am aflat mai târziu că Italia e locul ei preferat din lume. Nu aveam de gând să stau mult prin zonă, așa că, pe moment, am decis să merg către un loc mai liniștit, mai puțin vizitat de turiști: Ravello.
    A fost o decizie de o secundă. Dacă n-aș fi luat-o, nu aș fi întâlnit-o niciodată pe Yulia.
    
    Era cu cineva, dar povestea lor era… să spunem, puțin ciudată. Mi-a cerut un sfat, i l-am oferit, și am rămas de vorbă aproape o oră. Ne-am plimbat puțin prin Ravello, iar la întoarcere ei au coborât la o altă stație. Am crezut că nu o voi mai revedea vreodată.
    
    Dar Universul a avut alte planuri. Ne-am reîntâlnit, complet neașteptat, în Florența.
    Am petrecut o dimineață împreună – am vizitat Basilica din centru și am mâncat croissante cu fistic pe un trotuar, așteptând să se deschidă porțile. Apoi ea a plecat, la amiază.
    
    Ocazional, ne mai scriem. Iar zilele trecute mi-a trimis un mesaj care m-a făcut să zâmbesc:
    
    “Mida, I finally began your book! It’s fantastic – so simple and interesting. You know, I came back from Vietnam two months ago, and there are so many coincidences with my travels. It’s like you wrote about me!”
    
    Nu m-am gândit niciodată la Yulia ca la un „călător” – dar mesajul ei mi-a spus clar: da, este.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Eram o persoană obișnuită – mergeam la birou cinci zile pe săptămână, într-o companie internațională, mă vedeam cu prietenii, petreceri vinerea... viață normală. După despărțirea de soț, am început să călătoresc ca să mă vindec și să trec peste tot ce a fost greu. Nu pot spune că am uitat totul, dar am înțeles ce iubesc cel mai mult: să merg undeva nou, să descopăr locuri, oameni și tradițiile lor." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Nu altcineva m-a împins să plec, ci eu însămi. Prima dată a fost din cauza unei despărțiri dureroase – și călătoria a devenit modul meu de a mă vindeca." },
          { q: "3. Când ai știut că merită?", a: "De fiecare dată când mă întreb ce țară vreau să vizitez în continuare – atunci știu că merită." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Italia – pentru frumusețea ei, peste tot." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Călătoriile m-au schimbat complet. Acum, singurul lucru la care mă gândesc este să descopăr țări noi, oameni noi, tradiții noi – nu lucruri materiale ca mașini, haine sau bijuterii." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "A fost greu cu sancțiunile – când cardurile rusești au fost blocate peste tot în lume. A fost un stres mare, un șoc." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Fără ezitare. Alege un loc și du-te." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Am un canal de YouTube." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Eram cu cineva cu care nu-mi doream să fiu aproape. Pe drum, Mida i-a oferit acelui om locul ei, dar eu am ales să stau lângă Mida. Și n-am pierdut nimic – s-a dovedit a fi o prietenă caldă, sinceră și o povestitoare fascinantă. ❤️" },
        ],
        story: [
          `Un moment în plus, de păstrat în amintire:
    
    Zilele dinainte să îi scriu Midei erau plictisitoare – nici măcar apusul, pe care îl vedeam în fiecare zi, nu mă mai impresiona.
    Apoi, într-o zi, am mers la sală, am deschis cartea ei și am început să citesc.
    
    Totul s-a schimbat pe loc. I-am scris ei – și unui alt călător pe care îl întâlnisem cândva în Cambodgia.
    După ce am vorbit cu Mida, m-am simțit inspirată să merg în Indonezia, după ce termin munca.
    Același călător mi-a trimis poze din Australia, unde locuiește acum, și chiar m-a invitat într-o excursie prin Sydney.
    
    Așa că acum mă tot gândesc… poate că n-ar trebui să mă întorc acasă, ci să continui să călătoresc? 😴💋
    
    Și am observat ceva amuzant – când vorbesc cu Mida, scriu foarte mult! 😂
    E o profesoară tare bună. 🥰`
        ],
      },
    
      en: {
        intro: `I met Yulia by chance. I was on the Amalfi Coast in Italy – later I found out that Italy is actually her favorite place in the world. I wasn’t planning to stay long in the area, so, on a whim, I decided to go somewhere quieter, less touristy: Ravello.
    It was a split-second decision. If I hadn’t made it, I would have never met Yulia.
    
    She was with someone, though their story was… let’s say, a little complicated. She asked me for advice, I gave it, and we ended up talking for about an hour, walking through the streets of Ravello. On the way back, they got off at another stop. I thought I’d never see her again.
    
    But the universe had other plans.
    We met again, unexpectedly, in Florence.
    We spent a morning together – visited the central Basilica and ate pistachio croissants on the sidewalk, waiting for it to open. Then she left, around noon.
    
    From time to time, we still write to each other.
    Just a few days ago, she sent me a message that made me smile:
    
    Mida, I finally began your book! It’s fantastic – so simple and interesting. You know, I came back from Vietnam two months ago, and there are so many coincidences with my own travels. It feels like you wrote about me!
    
    I had never really thought of Yulia as a traveler – but her message told me everything I needed to know: she is one.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I used to be an ordinary person – working five days a week in a big international company, meeting friends, Friday parties, all that routine. After I separated from my husband, I started traveling to heal and move through the pain. I can’t say I’ve forgotten everything, but I realized what I truly love most: going somewhere new, discovering places, meeting people, learning their traditions." },
          { q: "2. What made you start traveling?", a: "It was me – not someone else – who made me go. The first time, it was because of a breakup. It hurt a lot, so traveling became my way to heal, to feel better." },
          { q: "3. When did you know it was worth it?", a: "Whenever I ask myself which country I want to visit next – that’s when I know it’s worth it." },
          { q: "4. A place that changed the way you see the world?", a: "Italy – for its beauty, everywhere." },
          { q: "5. How did traveling change you as a person?", a: "Traveling changed me completely. Now, the only thing I think about is discovering new countries, meeting new people, learning new traditions – not material things like cars, clothes, or jewelry." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "The hardest thing was the sanctions – Russian bank cards being blocked around the world. It was a big stress, a shock." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Don’t hesitate. Just choose a place – and go." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "I have a YouTube channel." },
          { q: "9. Bonus: How did we meet?", a: "I was with someone I didn’t really want to be near. On the road, Mida offered her seat to that person, but I chose to sit next to Mida instead. And I didn’t lose – she turned out to be a kind, genuine friend and a fascinating storyteller. ❤️" },
        ],
        story: [
          `A little extra moment to remember:
    The days before I met Mida were dull –s even the sunset didn’t move me anymore. Then one day, I went to the gym, opened her book, and started reading.
    Everything changed instantly. I wrote to her – and to another traveler I once met in Cambodia.
    After we talked, I felt inspired to go to Indonesia after finishing my job.
    That same traveler sent me photos from Australia, where he lives now, and even invited me on an excursion in Sydney.
    
    So now I’m wondering… maybe I shouldn’t go home after all, but keep traveling? 😴💋
    Also, I noticed something funny – when I talk to Mida, I write a lot! 😂
    She’s a really good teacher. 🥰`
        ],
      },
    
      video: null,
    },
      
    // ────────────────────────────────────────────────────────────
    // 3) Călătoarea cu barca
    // ────────────────────────────────────────────────────────────
    {
      id: "calatoare-barca",
      emoji: "🚤",
      name: "Călătoarea cu barca",
      tagline: "Insule, vânt, povești",
      cover: "/assets/travelers/calatoare-barca/cover.webp",
      gallery: [
        "/assets/travelers/calatoare-barca/1.webp",
        "/assets/travelers/calatoare-barca/2.webp",
        "/assets/travelers/calatoare-barca/3.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Insule mici, vânt prieten bun, nopți pe ponton.
  O hartă lichidă a curajului de a porni la drum fără acoperiș.`,
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
        story: [],
      },
      en: {
        intro: `Small islands, friendly winds, nights on a pontoon.`,
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
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 4) Nomadul din Tokyo
    // ────────────────────────────────────────────────────────────
    {
      id: "nomad-tokyo",
      emoji: "🗼",
      name: "Nomadul din Tokyo",
      tagline: "Luminile orașului, liniștea trenurilor",
      cover: "/assets/travelers/nomad-tokyo/cover.webp",
      gallery: [
        "/assets/travelers/nomad-tokyo/1.webp",
        "/assets/travelers/nomad-tokyo/2.webp",
        "/assets/travelers/nomad-tokyo/3.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Tokyo nu e doar o metropolă — e un haos ordonat unde te poți pierde fără frică. Între lumini de neon și grădini zen, am descoperit că ritmul vieții poate fi simultan frenetic și meditativ.
  
  Trenurile sosesc la secundă, dar poveștile oamenilor se scriu în tăceri lungi. Tokyo e despre contrast — și exact acolo se naște frumusețea.`,
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
        story: [],
      },
      en: {
        intro: `Tokyo is not just a metropolis — a tidy chaos where you can lose yourself without fear.`,
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
        story: [],
      },
      video: null,
    },
  ];

  // ✅ TEMPLATE pentru adăugare rapidă de călător nou
/*

{
  id: "exemplu-id",                   // folosit în URL: /calatori/exemplu-id
  emoji: "🌍",                        // mică iconiță personalizată
  name: "Numele Călătorului",
  tagline: "O propoziție scurtă care îl descrie",
  cover: "/assets/travelers/exemplu-id/cover.webp",  // imagine principală
  gallery: [
    "/assets/travelers/exemplu-id/1.webp",
    "/assets/travelers/exemplu-id/2.webp",
    "/assets/travelers/exemplu-id/3.webp",
  ],
  socials: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    website: "",
    blog: "",
  },
  ro: {
    intro: `Scrie aici povestea introductivă — în limba română.
Poate fi oricât de lungă, suportă paragrafe și newline (\n).`,
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
      "Aici poți adăuga gândul final sau povestea comună.",
    ],
  },
  en: {
    intro: `Write here the English version of the intro story.`,
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
      "Add here the final thought / shared story (English).",
    ],
  },
  video: null, // dacă vrei, poți pune link YouTube: "https://www.youtube.com/embed/..."
},

*/
  export default travelers;
  