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
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "În acea zi, găteam ca de obicei pentru clienți, când am aflat că o clientă remarcase o diferență în micul dejun. Tocmai ieșisem puțin din bucătărie, dar când am auzit discuția dintre ospătari, am sărit imediat să vin la masă și să vorbesc cu ea personal. Mi-am cerut scuze, deși nu fusese o greșeală gravă, dar am vrut să mă asigur că se simte respectată și binevenită. I-am propus să aibă încredere în mine pentru data viitoare – și dimineața următoare am gătit ceva special pentru ea, cu toată inima. Când am văzut bucuria de pe chipul ei, m-am simțit și eu fericit. Cred că atunci când gătești din inimă, oamenii simt. Și poate de acolo a început o prietenie." },
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
          { q: "Bonus) Tell us how we met.", a: "That day, I was cooking as usual for the customers when I heard that a guest had noticed a difference in her breakfast. I had just stepped out of the kitchen for a short while, but when I heard the waiters talking, I immediately went to her table to speak with her personally. I apologized, even though it wasn’t a serious mistake – I just wanted to make sure she felt respected and welcomed. I asked her to trust me next time – and the next morning, I cooked something special for her, with all my heart. When I saw the joy on her face, I felt happy too. I believe that when you cook from the heart, people can feel it. And maybe, that’s where a friendship began." },
        ],
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 2) Tono — ghidul care te duce pentru o cafea și te lasă cu o amintire
    // ────────────────────────────────────────────────────────────
    {
      id: "tono-lombok",
      emoji: "🛵",
      name: { ro: "Tono — ghidul care te duce pentru o cafea și te lasă cu o amintire", en: "Tono — the guide who brings you coffee and leaves you with a memory" },
      tagline: { ro: "Grijuliu. Generos. Autentic.", en: "Caring. Generous. Genuine." },
      cover: "/assets/guides/tono-lombok/2.webp",
      gallery: [
        "/assets/guides/tono-lombok/cover.webp",
        "/assets/guides/tono-lombok/2.webp",
        "/assets/guides/tono-lombok/3.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/mawan.astono/",
        facebook: "https://www.facebook.com/mawanastono.mawanastono/",
        tiktok: "",
        youtube: "",
        website: "https://tonoscooter.com/",
        blog: "",
      },
      ro: {
        intro: `L-am cunoscut pe Tono într-o împrejurare neașteptată.
Căutam un ghid care să mă ducă la nisipurile roz (celebra Pink Beach) și am postat un anunț într-un grup local din Lombok, unde turiștii și ghizii interacționează. Printre cei care mi-au răspuns a fost și Tono.
        
Nu am mai ajuns la acele nisipuri, pentru că, la doar două zile după acel anunț, am avut un accident pe munte.
Totul s-a dat peste cap.
Viața mea era, literalmente, întoarsă pe dos.
        
După șapte zile de repaus, în care aproape că nu puteam merge, am reușit să ajung în Kuta Mandalika.
Tono îmi spusese că, dacă ajung prin zona lui, mă va ajuta să o explorez. Așa că i-am scris.
        
Și nu doar că mi-a arătat locul…
Când i-am povestit despre accident și i-am zis, aproape în glumă, că aș da orice pentru o cafea dar nu găsesc una aproape, a venit cu scuterul direct de la serviciu – doar ca să mă ducă să beau o cafea din oraș.
Era vorba de aproximativ doi kilometri. Eu, în starea în care eram, cu siguranță nu i-aș fi putut parcurge pe jos.
        
Mai târziu, în aceeași seară, a venit din nou la cazarea mea, după ce și-a terminat lucrul. M-a dus să văd pista de Formula 1 – celebra Mandalika Circuit. Era deja târziu și nu am mai reușit să intrăm, dar ne-am făcut poze la intrare și a fost o seară liniștită, frumoasă.
        
Mi-a spus că povestea accidentului l-a impresionat și a fost de o grijă și o delicatețe cum rar mai întâlnești.
Iar ceva ce nu m-aș fi așteptat: nu a acceptat nicio plată pentru timpul petrecut împreună.
Mi-a spus simplu:
        
— Acum ești prietena mea. N-am făcut asta pentru bani.
        
Și sincer, m-a atins profund.
Într-o lume tot mai materialistă, sunt oameni care îți dau din timpul și energia lor doar pentru că vor să ai o experiență frumoasă.
Pentru mine, acel gest a îndulcit puțin durerea accidentului și mi-a lăsat o amintire frumoasă legată de Lombok.
        
Tono este unul dintre acei oameni care înțeleg că natura umană e construită pentru bunătate, nu pentru interes.
Și îi mulțumesc, cu ocazia asta, pentru toată generozitatea pe care mi-a arătat-o – mie, o străină, pe care nu știa dacă o va mai revedea vreodată.
        
Ah, și să nu uit: Tono are și o mică afacere locală – închiriază scutere turiștilor.
Așa că, dacă ajungi prin Lombok, nu ezita să îl contactezi.
Cu siguranță vei înțelege și tu ce fel de om e.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "I am Tono. Sunt ghid turistic în Kuta Mandalika, Lombok, pasionat să le arăt vizitatorilor frumusețea naturală a zonei și cultura locală." },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "Locuiesc în Lombok și iubesc plajele spectaculoase și ospitalitatea caldă a comunității locale din Kuta Mandalika." },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "Am devenit ghid din pasiune pentru a împărtăși experiențe și pentru a le arăta vizitatorilor frumusețea din Kuta Mandalika, asigurându-mă că au parte de amintiri de neuitat." },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "Momentele în care vizitatorii privesc răsăritul de soare pe plaja din Kuta Mandalika sau descoperă frumusețea subacvatică la snorkeling sunt cu adevărat speciale pentru mine." },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "Aș alege să le arăt apusul de soare pe plaja din Kuta Mandalika – este incredibil de frumos și aduce o stare de liniște." },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "Un ghid bun oferă informații corecte, are grijă de siguranța și confortul vizitatorilor și prezintă frumusețea locului cu pasiune." },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "Aș vrea ca vizitatorii să se simtă inspirați să exploreze mai mult din Kuta Mandalika și să păstreze amintiri frumoase din călătoria lor." },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "Faptul că sunt ghid m-a învățat să fiu mai răbdător, mai comunicativ și să apreciez diversitatea culturală." },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "În situații de urgență, am învățat să rămân calm și profesionist, găsind soluții pentru a asigura siguranța vizitatorilor." },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "Îmi doresc să promovez turismul sustenabil în Kuta Mandalika și să cresc gradul de conștientizare asupra frumuseților naturale și culturale ale zonei." },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "Pot fi găsit prin rețelele sociale sau pe site-urile locale de turism. Instagram: @mawan.astono și Facebook: @Mawanastono" },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "Ne-am cunoscut prin această platformă, dar simt că întâlnirea noastră n-a fost deloc întâmplătoare. Mă bucur că am avut ocazia să împărtășesc cu Mida din ceea ce iubesc cel mai mult: Kuta Mandalika, locul meu de suflet." },
        ],
        story: [],
      },
      en: {
        intro: `I met Tono under unexpected circumstances.
I was looking for a guide to take me to the pink sands and posted a message in a local Lombok group – a space where tourists and guides connect. Among the replies was Tono.
        
But I never made it to the pink sands.
Two days after posting that message, I had an accident in the mountains. 
Suddenly, everything changed.
My whole life was turned upside down.
        
After seven days of rest, during which I could barely walk, I finally made it to Kuta Mandalika.
Tono had told me that if I ever made it to his area, he’d help me explore. So I messaged him.
        
And he didn’t just show me around…
When I told him about my injury and casually mentioned that I’d love a coffee but couldn’t find one nearby, he came on his scooter, straight from work – just to take me into town for a cup of coffee.
It was about a two kilometers walk, and in the condition I was in, there was no way I could’ve made it.
        
Later that evening, after he finished work, he came to my guesthouse again.
He took me to see the Mandalika Circuit, the famous Formula 1 track.
It was already late, and we couldn’t go inside, but we took some photos at the entrance and shared a quiet, special evening.
        
He was so kind and thoughtful – clearly touched by my story and what I had been through.
And something I didn’t expect at all: he refused to let me pay for the time he spent with me.
He simply said:
        
— You’re my friend now. I didn’t do this for money.
        
And honestly, it moved me deeply.
In a world that often feels driven by money, there are still people who give you their time and energy simply because they want you to have a beautiful experience.
        
In a strange way, his kindness helped soften the pain of what had happened to me in Lombok.
Tono is one of those rare people who truly understands that human nature is built for kindness – not transaction.
And for that, I’m deeply grateful.
        
Oh, and one more thing: Tono also has a small local business renting scooters to tourists.
So if you ever find yourself in Lombok, don’t hesitate to reach out to him.
Anyone who meets him will understand the kind of person he truly is.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "I am Tono. I'm a tour guide in Kuta Mandalika, Lombok, passionate about showcasing the area's natural beauty and local culture to visitors." },
          { q: "2) Where do you live and what do you love most about your place?", a: "I live in Lombok and love the stunning beaches and warm hospitality of the local community in Kuta Mandalika." },
          { q: "3) How did you become a guide / start showing your place to others?", a: "I became a guide because of my passion for sharing experiences and showcasing Kuta Mandalika's beauty to visitors, ensuring they have unforgettable memories." },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "The moment visitors see the sunrise over Kuta Mandalika's beach or enjoy the underwater beauty while snorkeling is truly precious to me." },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "I'd show them the sunset at Kuta Mandalika's beach, as it's breathtakingly beautiful and brings a sense of peace." },
          { q: "6) What does being a “good guide” mean to you?", a: "Being a good guide means providing accurate information, ensuring visitors' safety and comfort, and showcasing local beauty with passion." },
          { q: "7) What do you want people to feel after touring with you?", a: "I want visitors to feel inspired to explore more of Kuta Mandalika and have fond memories of their trip." },
          { q: "8) How has being a guide changed you as a person?", a: "Being a guide has taught me to be more patient, communicative, and appreciative of cultural diversity." },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "During emergencies, I've learned to stay calm and professional, finding solutions to ensure visitors' safety." },
          { q: "10) Your dream for yourself or for your place from now on?", a: "I aim to promote sustainable tourism in Kuta Mandalika and raise awareness about the area's natural and cultural beauty." },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "People can find me through social media or local tourism websites. Instagram: @mawan.astono, and Facebook: @Mawanastono" },
          { q: "Bonus: Tell us how we met.", a: "We met through this platform, but I believe it wasn’t just a coincidence. I’m truly glad I had the chance to share with Mida what I love most – my home, Kuta Mandalika." },
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
  