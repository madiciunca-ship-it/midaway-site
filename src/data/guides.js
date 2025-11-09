// src/data/guides.js
//
// IMAGINI:
// public/assets/guides/<id>/cover.webp
// public/assets/guides/<id>/1.webp
// public/assets/guides/<id>/2.webp
// public/assets/guides/<id>/3.webp

const guides = [
    // ────────────────────────────────────────────────────────────
    // 1) Farid — Bucătarul care transformă un mic dejun într-o amintire
    // ────────────────────────────────────────────────────────────
    {
      id: "farid-maroc",
      emoji: "🍳",
      name: { ro: "Farid — Bucătarul care transformă un mic dejun într-o amintire", en: "Farid – the chef who turns breakfast into a memory" },
      tagline: { ro: "Autentic. Primitor. Pasionat.", en: "Authentic. Welcoming. Passionate." },
      cover: "/assets/guides/farid-maroc/cover1.webp",
      gallery: [
        "/assets/guides/farid-maroc/1.webp",
        "/assets/guides/farid-maroc/2.webp",
        "/assets/guides/farid-maroc/cover.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/hall_valhalla__kitchen/",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `L-am întâlnit pe Farid pentru că așa a vrut Universul, probabil. Nu glumesc.
Am ajuns întâmplător la restaurantul unde lucrează ca bucătar – și am revenit acolo de trei ori. Prima dată, mi-am comandat un mic dejun. Delicios, trebuie să recunosc.
        
A doua zi, am revenit și am cerut fix același mic dejun, gândindu-mă cu poftă la ziua precedentă. Dar... surpriză. Am primit altceva. La fel de bun, dar prezentarea era total diferită.
Puțin contrariată, l-am chemat pe chelner și i-am spus, râzând:
— Ieri am comandat același lucru, dar arăta complet diferit. Ați schimbat bucătarul?
        
Ce-a înțeles el? Habar n-am. Cert e că, în câteva minute, ghici ce: bucătarul a venit la masa mea. Era el, Farid.
Și-a cerut scuze pentru... o „neplăcere” care nu exista, de fapt. A fost un gest atât de delicat. Aș fi putut tăcea și pur și simplu să mănânc. Dar iată că o întrebare a deschis o ușă.
        
A treia zi – ultima mea zi în Ouarzazate, înainte să plec spre Merzouga – când am intrat din nou în restaurant, toată lumea m-a recunoscut. Mi s-a părut amuzant cât de agitați deveniseră.
Și, din spate, a apărut Farid. Zâmbind, mi-a spus:
— Pentru că ieri nu am reușit să îți satisfacem așteptările, azi îți voi găti ceva special. Chiar dacă ai comandat meniul simplu.
        
Și așa a fost. Cel mai delicios mic dejun pe care l-am mâncat vreodată.
La final, chiar înainte de a pleca, m-a rugat să facem câteva poze împreună.
        
Un om cu suflet deosebit.
Mă bucur că, punând o simplă întrebare, am descoperit, dincolo de fațada unei bucătării, un om minunat.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "Mă numesc Farid Aitsi Ahmed. Sunt un om simplu, îmi place să gătesc cu bucurie și din inimă. Îmi place să mă distrez, să joc fotbal, să merg la sală și iubesc pisicile. Sunt un bărbat singur, pasionat de călătorii, de gătit, de citit cărți și de a mă bucura de lucrurile simple din viață." },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "Sunt din Maroc și trăiesc în orașul meu natal, Ouarzazate. Ceea ce iubesc cel mai mult aici este cultura noastră, mâncarea, muzica și arhitectura Kasbah-urilor. Orașul nostru este plin de studiouri de film internaționale. Turiștii pot vizita Kasbah-urile și se pot bucura de mâncare și de muzică și dansuri tradiționale. La noi s-au filmat multe filme celebre: Gladiator, Lawrence of Arabia, Babel, Kingdom of Heaven, The Mummy, Prince of Persia, Game of Thrones, The Hills Have Eyes, Alexander, Exodus: Gods and Kings și multe altele. Peisajele variază de la deșertul Sahara la Munții Atlas, ceea ce face din Ouarzazate o destinație populară pentru filmări internaționale." },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "Îmi place să arăt turiștilor magia orașului Ouarzazate. Așa încep: le arăt locuri frumoase și priveliști, și le gătesc. Gătesc pentru prieteni – așa am făcut și cu Mida când am întâlnit-o. I-am pregătit micul dejun tradițional și i-a plăcut mult. Cel mai mult îmi place să văd turiștii fericiți, bucurându-se de oraș, de mâncare, de oameni. Asta mă face și pe mine fericit." },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "Un moment foarte frumos a fost când am cunoscut-o pe Mida – i-am gătit micul dejun tradițional, a fost o dimineață frumoasă, ne-am cunoscut și am devenit prieteni. Altă poveste este cu niște turiști din Japonia. Le-am arătat locuri minunate, le-am gătit și s-au bucurat foarte mult. Le-au plăcut studiourile de film și am devenit prieteni." },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "Le-aș arăta orașul Aït Ben Haddou și le-aș găti mâncăruri tradiționale. Asta ne reprezintă – cultura, ospitalitatea și bucătăria noastră." },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "Un ghid și un bucătar bun înseamnă să ai grijă ca vizitatorii să se bucure, să fie fericiți, să mănânce sănătos și să se simtă bine. Să le arăt Kasbah-urile, să se plimbe cu cămilele și să asculte istoria locurilor. Îmi place să văd zâmbetul pe fețele lor – înseamnă că iubesc orașul nostru și cultura noastră." },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "Aș vrea ca vizitatorii să se simtă fericiți și în siguranță. Vreau să se bucure de mâncare sănătoasă, să simtă bucurie și distracție, și să nu uite niciodată vizita lor în Ouarzazate. Și să mă aibă ca prieten adevărat, care își dorește sincer ca ei să fie bineveniți mereu." },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "M-a făcut fericit. Când văd că oamenii apreciază mâncarea mea și se bucură de locurile pe care le arăt, simt o mare bucurie. Știu că au trăit ceva ce nu vor uita." },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "Cel mai greu este când văd oameni care înșală turiști doar pentru bani. Mă doare pentru că nu e corect. Mi-am promis că eu voi face bine și voi arăta partea frumoasă a Marocului. Nimeni nu vrea să fie înșelat. Întotdeauna mă pun în locul celuilalt. E frumos să fii important, dar e mai important să fii frumos la suflet." },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "Visul meu e ca lumea să știe că suntem un popor primitor și frumos. Avem o țară minunată și oameni minunați. Să fac bine și binele să se întoarcă la mine. Sper ca într-o zi să devin bucătarul lumii." },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "Instagram: @hall_valhalla_kitchen; Gmail: ridf5202@gmail.com și în curând: YouTube, blog și site – toți sunt bineveniți: cupluri, familii, turiști singuri." },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "" },
        ],
        story: [],
      },
      en: {
        intro: `I met Farid because… well, the universe probably wanted it that way.
Not joking.
        
I randomly ended up at the restaurant where he works as a chef – and I went back there three times.
The first time, I ordered breakfast. Delicious, I have to admit.
        
The next day, I came back and ordered exactly the same thing, thinking fondly of the day before.
But surprise – I received something else. Still delicious, but the presentation was totally different.
A little confused, I called the waiter and said, laughing:
— Yesterday I ordered the same thing, but it looked completely different. Did you change the chef?
        
What he understood – no idea. But a few minutes later, guess what: the chef came to my table.
It was him. Farid.
        
He apologized so kindly, even though there was really nothing to apologize for.
I could’ve just stayed quiet and eaten my food.
But it turned out that one simple question opened a door.
        
On the third day – my last day in Ouarzazate, before heading to Merzouga – I walked into the same restaurant once more.
Everyone there instantly knew I had arrived.
It was funny to watch how the whole staff lit up.
        
And then Farid appeared from the back, smiling. He said:
— Since we didn’t manage to meet your expectations yesterday, today I’ll cook something special for you… even if you ordered the regular menu.
        
And he did. It was the most delicious breakfast I’ve ever had.
Before I left, he asked if we could take some photos together.
        
A man with a beautiful soul.
I’m grateful that a simple question led me beyond the kitchen, to discover a truly wonderful human being.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "My name is Farid Aitsi Ahmed. I’m a classic man who enjoys cooking with joy and heart. I love having fun, playing soccer, going to the gym, and I like cats. I’m a single man who enjoys traveling, cooking, reading books, and enjoying the simple things in life." },
          { q: "2) Where do you live and what do you love most about your place?", a: "I’m from Morocco and I live in my hometown, Ouarzazate. What I love most about my city is our culture, food, music, and the Kasbah architecture. Our city is full of international film studios. Tourists can enjoy the Kasbah buildings all around the city, our food, and our unique cultural music and dance. Many famous movies were filmed here: Gladiator, Lawrence of Arabia, Babel, Kingdom of Heaven, The Mummy, Prince of Persia, Game of Thrones, The Hills Have Eyes, Alexander, Exodus: Gods and Kings, and many more. The area’s landscapes go from the Sahara Desert to the Atlas Mountains – that’s why Ouarzazate is a very popular international filming location." },
          { q: "3) How did you become a guide / start showing your place to others?", a: "I like to show tourists the magic of Ouarzazate. That’s how it starts – I take them to beautiful places and views, and I cook for them. I cook for my friends – like when I met Mida, I cooked our delicious breakfast and she really liked it. What I love most is seeing tourists happy, enjoying my city, my food, and my people. That makes me happy too." },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "One of the most beautiful moments was when I met my dear friend Mida – I got the chance to cook for her our traditional breakfast, and she really enjoyed the food and the city. We had time to talk, connect, and become friends. Another story is with some visitors from Japan – I showed them many beautiful places, I cooked for them, and they really enjoyed it. They were excited about the film studios, and we became friends too." },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "If I could show one place or moment in my city, I would take them to Aït Ben Haddou and cook for them our cultural food. That shows who we are." },
          { q: "6) What does being a “good guide” mean to you?", a: "Being a good cook and guide means making sure visitors enjoy, have fun, and are happy eating healthy organic food and drinks. I show them the Kasbah buildings, camel rides, and they listen to the history around our city. What I appreciate is the smile and happiness on their faces – it means they love our city and culture." },
          { q: "7) What do you want people to feel after touring with you?", a: "I always want visitors to feel happy and safe. I want them to enjoy healthy food, have fun, and never forget their visit to Ouarzazate. And I want them to have me as a real friend who truly wants them to feel welcome anytime." },
          { q: "8) How has being a guide changed you as a person?", a: "Being a cook and guide changed me because I feel real happiness when I see visitors appreciate and enjoy my food and the adventures I show them. I know they’ll never forget it." },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "The hardest moment is when I see others take money from tourists and scam them. I feel sorry for visitors. I promised myself to always do good and show the best of Morocco. No one likes being scammed. I always put myself in other people’s shoes. It’s nice to be important, but it’s more important to be nice 💯" },
          { q: "10) Your dream for yourself or for your place from now on?", a: "My dream is that the world will know we are a welcoming, kind people. We have a beautiful country and beautiful people. Do good, and good will come back to you. I hope one day I become a cook of the world." },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "Instagram: @hall_valhalla_kitchen; Gmail: ridf5202@gmail.com; Soon: YouTube channel, blog, and website – everyone is welcome: couples, families, solo travelers." },
          { q: "Bonus) Tell us how we met.", a: "" },
        ],
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 2) I Made — Ghidul din Ubud (Bali)
    // ────────────────────────────────────────────────────────────
    {
      id: "ghid-ubud",
      emoji: "🌿",
      name: { ro: "I Made — Ghidul din Ubud", en: "I Made — Ubud Guide" },
      tagline: { ro: "Temple. Orezării. Liniște.", en: "Temples. Rice fields. Silence." },
      cover: "/assets/guides/ghid-ubud/cover.webp",
      gallery: [
        "/assets/guides/ghid-ubud/1.webp",
        "/assets/guides/ghid-ubud/2.webp",
        "/assets/guides/ghid-ubud/3.webp",
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
        intro: `Ubud e o respirație lungă. Cu I Made, fiecare potecă printre terasele de orez devine o poveste. Îți arată templele ca pe case vii și oamenii ca pe prieteni vechi. Nu vinde „tururi” — ci întâlniri.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "" },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "" },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "" },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "" },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "" },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "" },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "" },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "" },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "" },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "" },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "" },
        ],
        story: [],
      },
      en: {
        intro: `Ubud is a long, gentle breath. With I Made, every footpath across the rice terraces becomes a story. He shows temples as living homes and locals as old friends. He doesn’t sell “tours” — he offers encounters.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "" },
          { q: "2) Where do you live and what do you love most about your place?", a: "" },
          { q: "3) How did you become a guide / start showing your place to others?", a: "" },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "" },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "" },
          { q: "6) What does being a “good guide” mean to you?", a: "" },
          { q: "7) What do you want people to feel after touring with you?", a: "" },
          { q: "8) How has being a guide changed you as a person?", a: "" },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "" },
          { q: "10) Your dream for yourself or for your place from now on?", a: "" },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
          { q: "Bonus) Tell us how we met.", a: "" },
        ],
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 3) Ahmed — Berber din Merzouga (Maroc)
    // ────────────────────────────────────────────────────────────
    {
      id: "ghid-merzouga",
      emoji: "🏜️",
      name: { ro: "Ahmed — Berber din Merzouga", en: "Ahmed — Berber from Merzouga" },
      tagline: { ro: "Dune. Stele. Ceai de mentă.", en: "Dunes. Stars. Mint tea." },
      cover: "/assets/guides/ghid-merzouga/cover.webp",
      gallery: [
        "/assets/guides/ghid-merzouga/1.webp",
        "/assets/guides/ghid-merzouga/2.webp",
        "/assets/guides/ghid-merzouga/3.webp",
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
        intro: `În deșert, timpul curge altfel. Ahmed te învață să-l asculți: nisipul, vântul, cămilele, focul de seară și cerul care cade peste tine. Nu promite „spectacol” — ci liniște.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "" },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "" },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "" },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "" },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "" },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "" },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "" },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "" },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "" },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "" },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "" },
        ],
        story: [],
      },
      en: {
        intro: `In the desert, time flows differently. Ahmed teaches you to listen: sand, wind, camels, evening fire, and the sky pouring over you. No “show” promised — just quiet.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "" },
          { q: "2) Where do you live and what do you love most about your place?", a: "" },
          { q: "3) How did you become a guide / start showing your place to others?", a: "" },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "" },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "" },
          { q: "6) What does being a “good guide” mean to you?", a: "" },
          { q: "7) What do you want people to feel after touring with you?", a: "" },
          { q: "8) How has being a guide changed you as a person?", a: "" },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "" },
          { q: "10) Your dream for yourself or for your place from now on?", a: "" },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
          { q: "Bonus) Tell us how we met.", a: "" },
        ],
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 4) Elena — Povestitoare din Apuseni (România)
    // ────────────────────────────────────────────────────────────
    {
      id: "ghid-apuseni",
      emoji: "⛰️",
      name: { ro: "Elena — Povestitoare din Apuseni", en: "Elena — Storyteller from Apuseni" },
      tagline: { ro: "Păduri. Sate. Pâine caldă.", en: "Forests. Villages. Warm bread." },
      cover: "/assets/guides/ghid-apuseni/cover.webp",
      gallery: [
        "/assets/guides/ghid-apuseni/1.webp",
        "/assets/guides/ghid-apuseni/2.webp",
        "/assets/guides/ghid-apuseni/3.webp",
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
        intro: `Elena știe potecile pe nume. Îți arată că Apusenii nu sunt doar munți — sunt oameni care coc pâine în cuptoare vechi, râuri care povestesc și sărbători care încă se țin în curți.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "" },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "" },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "" },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "" },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "" },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "" },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "" },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "" },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "" },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "" },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "" },
        ],
        story: [],
      },
      en: {
        intro: `Elena knows the trails by name. She shows you that the Apuseni are not just mountains — they’re people baking bread in old ovens, rivers that tell stories, and village feasts still held in courtyards.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "" },
          { q: "2) Where do you live and what do you love most about your place?", a: "" },
          { q: "3) How did you become a guide / start showing your place to others?", a: "" },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "" },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "" },
          { q: "6) What does being a “good guide” mean to you?", a: "" },
          { q: "7) What do you want people to feel after touring with you?", a: "" },
          { q: "8) How has being a guide changed you as a person?", a: "" },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "" },
          { q: "10) Your dream for yourself or for your place from now on?", a: "" },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
          { q: "Bonus) Tell us how we met.", a: "" },
        ],
        story: [],
      },
      video: null,
    },
  ];
  
  // ✅ TEMPLATE pentru adăugare rapidă de ghid nou
  /*
  
  {
    id: "exemplu-ghid",                // folosit în URL: /ghizi/exemplu-ghid
    emoji: "📍",                       // mică iconiță personalizată
    name: "Numele Ghidului",
    tagline: "O propoziție scurtă care îl descrie",
    cover: "/assets/guides/exemplu-ghid/cover.webp",  // imagine principală
    gallery: [
      "/assets/guides/exemplu-ghid/1.webp",
      "/assets/guides/exemplu-ghid/2.webp",
      "/assets/guides/exemplu-ghid/3.webp",
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
      intro: `Scrie aici introducerea în română — suportă paragrafe și newline (\n).`,
      qna: [
        { q: "1) Cine ești în câteva cuvinte?", a: "" },
        { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "" },
        { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "" },
        { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "" },
        { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "" },
        { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "" },
        { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "" },
        { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "" },
        { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "" },
        { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "" },
        { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
        { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "" },
      ],
      story: [
        "Aici poți adăuga gândul final sau povestea comună.",
      ],
    },
    en: {
      intro: `Write here the English intro — paragraphs and newline (\n) supported.`,
      qna: [
        { q: "1) Who are you in a few words?", a: "" },
        { q: "2) Where do you live and what do you love most about your place?", a: "" },
        { q: "3) How did you become a guide / start showing your place to others?", a: "" },
        { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "" },
        { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "" },
        { q: "6) What does being a “good guide” mean to you?", a: "" },
        { q: "7) What do you want people to feel after touring with you?", a: "" },
        { q: "8) How has being a guide changed you as a person?", a: "" },
        { q: "9) A difficult moment during a tour that taught you something important?", a: "" },
        { q: "10) Your dream for yourself or for your place from now on?", a: "" },
        { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "" },
        { q: "Bonus) Tell us how we met.", a: "" },
      ],
      story: [
        "Add here the final thought / shared story (English).",
      ],
    },
    video: null, // poți pune link YouTube: "https://www.youtube.com/embed/..."
  },
  
  */
  
  export default guides;
  