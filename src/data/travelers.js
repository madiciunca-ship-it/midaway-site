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
   
      name: "Adi – Nomadul din Bali",
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
        intro: `Pe Adi (Adrian Ștefan Illeș) l-am cunoscut pe vremea când făceam dansuri. Atunci nu aveam nicio idee ce rol urma să joace în povestea mea. Câteva luni mai târziu, cochetam cu gândul unei plecări în Bali, iar într-o seară am văzut o postare de-a lui – era fix acolo, în locul la care visam. Nu vorbisem niciodată cu el, dar i-am scris simplu: „Cum e în Bali?”
  
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
        intro: 
         `I met Yulia by chance. I was on the Amalfi Coast in Italy – later I found out that Italy is actually her favorite place in the world. I wasn’t planning to stay long in the area, so, on a whim, I decided to go somewhere quieter, less touristy: Ravello.
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
    // 3) Hamza — O întâlnire care lasă urme
    // ────────────────────────────────────────────────────────────
    {
      id: "medic-maroc",
      emoji: "🐪",
      name: "Hamza — O întâlnire care lasă urme",
      tagline: "Couchsurfing. Șarpe. Ifrane.",
      cover: "/assets/travelers/medic-maroc/medic-maroc-cover.webp",
      gallery: [
        "/assets/travelers/medic-maroc/medic-maroc-1.webp",
        "/assets/travelers/medic-maroc/medic-maroc-2.webp",
        "/assets/travelers/medic-maroc/medic-maroc-3.webp",
      ],
      socials: {
        instagram: "lahlou_.hamza",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Pe Hamza l-am întâlnit prin Couchsurfing, în timpul vizitei mele în Fes, Maroc. 
Eram acolo de două zile, pierdută printre străduțele labirintice ale Medinei, și în pagina lui mi-a atras atenția ceva. 
Avea acolo o mică poveste despre oamenii pe care i-a întâlnit în călătoriile lui și despre țările vizitate. Nicio urmă de „România”. Asta m-a intrigat. 
I-am scris: 
„Hey, vrei să ai și o româncă în lista ta? Am văzut că îți lipsește.” 

Probabil a zâmbit. Dar a doua zi, spre surprinderea mea, a venit după mine cu mașina și m-a dus să vizitez un mic orășel din apropiere – Ifrane, renumitul „oraș austriac al Marocului”. 

A fost o după-amiază superbă, plină de povești, râsete și o liniște de drum care doar între necunoscuți devine atât de firească.
        
Un om de milioane.
Câteva luni mai târziu, mi-a scris că urmează examenul de rezidențiat și mi-a trimis o poză cu prima pagină a lucrării lui – acolo unde avea o dedicație pentru cei mai importanți oameni care i-au marcat existența (să nu uităm, are doar 26 de ani!). Printre acele 9 sau 10 nume era și Mida.
        
Mi-a spus că am fost una dintre persoanele care, în doar câteva ore și câteva cuvinte, au reușit să miște ceva profund în interiorul lui. Să-i schimbe puțin felul de a vedea viața.
Așa că azi, aici, îi mulțumesc pentru că a ales să-mi împărtășească un moment atât de personal și frumos.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Sunt Hamza, medic de 26 de ani din Maroc. Am o perspectivă deschisă asupra lumii și o curiozitate profundă față de oameni și culturi diferite. Îmi place să explorez experiențe globale și să învăț din modul unic în care fiecare persoană înțelege lumea. Consider că ființa umană este remarcabil de complexă și cred că spiritul uman nu poate fi definit printr-un set limitat de cuvinte." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Motivația mea pentru a explora lumea vine din dorința de a înțelege perspectivele diferite – mai ales felul în care gândirea variază între oameni și culturi." },
          { q: "3. Când ai știut că merită?", a: "Momentele în care am întâlnit și am înțeles punctele de vedere diferite ale oamenilor despre lume au fost cu adevărat uimitoare și pline de inspirație." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Fiecare loc mi-a lăsat o amprentă unică, dar dacă ar fi să aleg o țară, aș spune Turcia. Asta pentru că am explorat-o în profunzime, nu doar câteva orașe. Fiecare loc mi-a oferit ocazia să mă cufund în atmosfera sa, iar acolo am întâlnit oameni din toate colțurile lumii – europeni, americani, asiatici, africani. Această experiență a fost profund pozitivă și îmbogățitoare." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Înainte să călătoresc, eram mai retras și timid, îmi era teamă să mă exprim, să nu fiu judecat sau ridiculizat. După călătorii, am devenit o persoană mai deschisă, comunicativă și liberă. Acum pot vorbi și împărtăși ideile mele fără teamă." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Provocările neprevăzute apar mereu – dificultăți financiare, întâlniri mai puțin plăcute – dar fiecare experiență te face mai puternic și mai echilibrat." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Îmbrățișează viitorul. Fă primul pas. Îți va schimba viața profund." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Pagina mea de Instagram este @Lahlou_.hamza." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Ne-am întâlnit prin Couchsurfing, în timpul vizitei ei în Fes. Ziua petrecută împreună a fost specială încă de la început. Mida are o poveste de viață impresionantă și o energie caldă, senină. Călătoriile ei, din România până în Vietnam, nu sunt doar despre locuri, ci despre sens – despre felul în care fiecare drum poate deveni o lecție. Cartea ei mi s-a părut plină de inspirație, iar felul în care vorbește despre oameni și experiențe te face să privești lumea altfel." },
        ],
        story: [],
      },
      en: {
        intro: `I met Hamza through Couchsurfing, during my visit to Fes, Morocco.
I had been there for two days, wandering through the labyrinthine streets of the Medina, when something on his profile caught my attention.
He had written a short story about the people he’d met on his travels and the countries he had visited – but there was no mention of “Romania.” That intrigued me.
        
So I wrote to him: 
“Hey, would you like to have a Romanian on your list? I noticed you’re missing one.”
        
He probably smiled. But the next day, to my surprise, he came to pick me up by car and took me to visit a small nearby town – Ifrane, known as “the Austrian town of Morocco.”

It was a beautiful afternoon, full of stories, laughter, and that quiet ease that only exists between strangers who somehow feel like old friends.

A truly remarkable person.
A few months later, he wrote to tell me he was preparing for his residency exam and sent me a photo of the first page of his thesis – where he had written a dedication to the most important people who had marked his life (let’s remember, he’s only 26!). Among those nine or ten names was Mida.

He told me that, in just a few hours and a few words, I had managed to stir something deep within him – to make him see life a little differently.
So today, here, I thank him for sharing such a personal and beautiful moment with me.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I am Hamza, a 26-year-old physician from Morocco. I have an open-minded outlook and a deep curiosity toward diverse people and cultures. I’m eager to explore global experiences and to learn from the unique ways each person understands the world. I find human beings remarkably complex, and I believe the human spirit cannot be defined by a limited set of descriptors." },
          { q: "2. What made you start traveling?", a: "My motivation for global engagement stems from curiosity – the desire to understand different perspectives, especially the ways of thinking that vary among individuals and cultures." },
          { q: "3. When did you know it was worth it?", a: "The moments when I encountered and truly comprehended the diverse perspectives of others regarding the world were astonishing and deeply inspiring." },
          { q: "4. A place that changed the way you see the world?", a: "Each location left a distinct impression on me, but if I were to choose one country, it would be Turkey. I traveled extensively within it, not limiting myself to just a few cities. Each one allowed me to immerse myself in its unique atmosphere and meet people from all over the world – Europeans, Americans, Asians, and Africans. It was a profoundly positive and enriching experience." },
          { q: "5. How did traveling change you as a person?", a: "Before I started traveling, I was more reserved and shy – afraid to express myself or to be misunderstood. After my travels, I became more open-minded and communicative. I can now share my thoughts and ideas without fear of being judged." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "Unforeseen challenges may arise – financial troubles, uncomfortable encounters – but each one contributes to personal growth and resilience." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Embrace the future. Take the first step. It will profoundly transform your life." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "My Instagram is @Lahlou_.hamza." },
          { q: "9. Bonus: How did we meet?", a: "We met through Couchsurfing during her visit to Fes. The day we spent together was special from the very beginning. Mida has an inspiring life story and a calm, warm energy. Her travels – from Romania to Vietnam – aren’t just about places, but about meaning: about how every journey can become a lesson. Her book felt deeply inspiring to me, and the way she speaks about people and experiences makes you see the world differently." },
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
  