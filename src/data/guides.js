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
      name: { ro: "Farid — Bucătarul care transformă un mic dejun într-o amintire", en: "Farid – The chef who turns breakfast into a memory" },
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
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "Sunt din Maroc și trăiesc în orașul meu natal, Ouarzazate. Ceea ce iubesc cel mai mult aici este cultura noastră, mâncarea, muzica și arhitectura Kasbah-urilor. Orașul nostru este plin de studiouri de film internaționale. Turiștii pot vizita Kasbah-urile și se pot bucura de mâncare, de muzică și dansuri tradiționale. La noi s-au filmat multe filme celebre: Gladiator, Lawrence of Arabia, Babel, Kingdom of Heaven, The Mummy, Prince of Persia, Game of Thrones, The Hills Have Eyes, Alexander, Exodus: Gods and Kings și multe altele. Peisajele variază de la deșertul Sahara la Munții Atlas, ceea ce face din Ouarzazate o destinație populară pentru filmări internaționale." },
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
      name: { ro: "Tono — Ghidul care te duce pentru o cafea și te lasă cu o amintire", en: "Tono — The guide who brings you coffee and leaves you with a memory" },
      tagline: { ro: "Grijuliu. Generos. Autentic.", en: "Caring. Generous. Genuine." },
      cover: "/assets/guides/tono-lombok/2.webp",
      gallery: [
        "/assets/guides/tono-lombok/cover.webp",
        "/assets/guides/tono-lombok/1.webp",
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
          { q: "1) Cine ești în câteva cuvinte?", a: "Numele meu este Tono. Sunt ghid turistic în Kuta Mandalika, Lombok, pasionat să le arăt vizitatorilor frumusețea naturală a zonei și cultura locală." },
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
    // 3) Kaci — Ghidul care cunoaște deșertul ca pe propria poveste.
    // ────────────────────────────────────────────────────────────
    {
      id: "kaci-maroc",
      emoji: "🏜️",
      name: { ro: "Kaci — Ghidul care cunoaște deșertul ca pe propria poveste", en: "Kaci — The guide who knows the desert like his own story" },
      tagline: { ro: "Blând. Deschis. Conectat.", en: "Kind. Open. Grounded." },
      cover: "/assets/guides/kaci-maroc/cover1.webp",
      gallery: [
        "/assets/guides/kaci-maroc/cover.webp",
        "/assets/guides/kaci-maroc/2.webp",
        "/assets/guides/kaci-maroc/1.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/kaci_merzouga?igsh=cjFkM3N2c2E0Y2Jy",
        facebook: "https://www.facebook.com/kaci.merzouga",
        tiktok: "",
        youtube: "",
        website: "https://moroccotravelhotelchezbelkacem.com/moments-partages-avec-nos-voyageurs-souvenirs-inoubliables/",
        blog: "",
      },
      ro: {
        intro: `Eram de aproape o lună în Maroc și îmi doream cu disperare să ajung în deșert. Nu conta că drumul era lung, că nu aveam cazare sau că urma să ajung târziu. Am zis că ora 20:00 e rezonabilă și sigur găsesc ceva. Nu era prima dată.

Plecând din Ouarzazate, drumul a durat mai mult decât planificasem. Când am ajuns în Merzouga era 21:30. Noapte. Pustiu. Gara – undeva pe un câmp.
        
Auzi tot felul de povești: „Nu merge în deșert fără ghid.” „E periculos.” „E plin de băieți dubioși.” Dar mi-am strâns rucsacul pe spate și mi-am zis: „Te descurci. Ca întotdeauna.” Și m-am descurcat.
        
Am luat-o pe jos spre ce părea a fi un local. Eram flămândă și voiam doar un loc unde să dorm. Studiasem toate opțiunile de pe Booking, dar nimic nu mă convinsese. Speram să găsesc ceva doar pentru o noapte, apoi să mă mut între dune.
        
Dar cum socoteala de acasă nu se potrivește cu cea din deșert, Universul mi l-a scos în cale pe Kaci. Nu direct, nu încă.
        
Am ajuns într-un bar plin doar de bărbați. Toți s-au uitat la mine ca la o apariție. Chelnerul mi-a zis că nu servesc mâncare și m-a îndrumat spre oraș. Așa că am pornit din nou pe jos.
        
Erau cam doi kilometri. Pe drum, mulți bărbați. Unul mă urmărea și tot spunea ceva. Simțeam că vreau doar să scap. Când, dintr-o dată, văd o firmă luminoasă: hotel.
        
Fără să mai stau pe gânduri, am traversat strada și am intrat. Miros de praf peste tot. A apărut un băiat tânăr – am aflat apoi că avea 17 ani. Nu vorbea engleză, doar câteva cuvinte. Mi-a arătat o cameră cu trei paturi. I-am zis: „Ceva mai mic, buget redus…”
A zâmbit și mi-a făcut semn spre un divan în hol: „Așteaptă.”
        
Și atunci a apărut el: Kaci.
Fratele mai mare. Și de acolo… a început povestea.
        
Am stat o noapte, apoi încă una în deșert. Și m-am întors la ei pentru încă două.
Kaci mi-a arătat împrejurimile, un lac cu pelicani (deși am ajuns cam târziu ca să-i văd bine), am băut lapte de cămilă pentru prima dată în viață și… m-a dus la o pizzerie pentru că i-am spus că mi-e poftă de una.
        
Am descoperit și cât de impecabil conduce motocicleta. La un moment dat, am derapat pe drum și am ajuns prin câmpuri. Fără nicio zgârietură. Fără panică. Nici nu ne-am oprit.
        
Dacă ajungi vreodată în Merzouga, caută-l.
Nu vei regreta. 
Kaci nu e doar un om bun, e și un ghid pe măsură. Cunoaște fiecare colț din Merzouga și din jurul ei.
Știe locurile ascunse, momentele potrivite și micile secrete care fac diferența între o simplă excursie și o amintire de suflet.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "Sunt un om simplu, născut și crescut în deșert, într-o familie mare dar într-o casă mică. Am început să lucrez ca ghid turistic în satul meu, Merzouga, arătând vizitatorilor frumusețea Saharei." },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "Trăiesc în Merzouga, în sudul Marocului – partea deșertică a țării. Iubesc răsăriturile și apusurile spectaculoase și faptul că e un loc liniștit, calm, mai ales când ajungi în mijlocul dunelor din Erg Chebbi." },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "Dacă te naști într-un sat ca Merzouga, care e foarte turistic, ajungi ghid aproape natural – mai ales dacă nu ai continuat școala sau nu ai un loc de muncă la stat. Pentru mine, a fost o alegere din pasiune. Îmi place să întâlnesc oameni din diferite țări. E ca și cum aș călători fără avion – doar vorbind și schimbând povești și culturi." },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "Am trăit multe momente frumoase cu turiști, dar cel mai special a fost cu un cuplu care s-a logodit în satul meu și s-a căsătorit chiar în deșert. Am fost parte din acel moment și am împărțit cu ei toată fericirea." },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "Răsăritul din mijlocul deșertului – e cel mai liniștit loc de pe Pământ." },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "Un ghid bun e cel care înțelege ce caută fiecare om și îl duce exact acolo unde vrea să ajungă." },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "Aș vrea ca, după ce mă cunosc, oamenii să își amintească de mine și să îndrăgească Marocul. Și să se întoarcă, datorită mie." },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "Faptul că sunt ghid m-a învățat multe și m-a ajutat să înțeleg mai bine culturile altor țări." },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "Să fii ghid nu e mereu ușor. Uneori întâlnești oameni dificili, cu atitudini grele, și trebuie să știi cum să te descurci. Asta m-a învățat să lucrez sub presiune." },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "Nu am un vis „mare”. Vreau doar să fiu fericit și să fac ceea ce îmi place: să fiu ghid. Pentru că noi, oamenii, facem locurile speciale – nu invers." },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "Mă puteți contacta pe Instagram: @kacimerzouga" },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "Cum ne-am cunoscut… a fost ceva complet neplanificat. Dar tu știi deja toată povestea, nu-i așa?" },
        ],
        story: [],
      },
      en: {
        intro: `I had been in Morocco for almost a month and was desperate to finally reach the desert. I didn’t care that the road was long, that I had no place to sleep, or that I’d arrive late. I figured 8 p.m. was still decent, and surely I’d find something. It wasn’t my first time traveling like this.

I left Ouarzazate, and the journey took longer than expected. By the time I reached Merzouga, it was 9:30 p.m. Night. Silence. The station was in the middle of nowhere.
        
I had heard the warnings: “Don’t go into the desert without a guide.” “It’s dangerous.” But I strapped on my backpack and told myself: Today, like always, you’ll figure it out. And I did.
        
I walked toward what looked like a small local place. I was starving and just wanted somewhere to sleep. I had checked all the Booking options, but none really called to me. I was hoping to find something for one night, then move into the dunes.
        
But the desert has its own way of arranging things. The Universe sent me Kaci.
        
Not immediately.
        
First, I walked into a bar filled with only men – all eyes on me like I was some kind of mirage. The waiter told me they didn’t serve food and pointed me toward town. I kept walking.
        
Maybe two kilometers. But the streets were full of men. One of them followed me, talking non-stop. I just wanted to escape. Then I saw a lit sign: HOTEL.
        
I forgot about food and town and crossed the street straight into the building. The smell of dust everywhere. A young boy, maybe 17, appeared. Hardly spoke any English. He showed me a room with three beds.
        
I tried to explain: “Small room, low budget…” He smiled and pointed to a couch in the lobby: “Wait.”
        
And that’s when he came in – Kaci. The boy’s older brother. Both sons of the owner. And just like that, my story with Kaci began.
        
I stayed one night. Then another in the desert. Then came back for two more.
        
Kaci showed me around: a quiet lake with pelicans (though we arrived a bit late to see them well), my first camel milk experience, and – because I said I was craving it – he took me to a pizzeria in town.
        
I also discovered he’s an amazing motorcycle rider. At one point, we skidded off-road and ended up in the sand – no scratches, no panic, no stopping.
        
If you ever find yourself in Merzouga, find him. You won’t regret it.
        
Kaci isn’t just kind. He’s the kind of guide who knows every corner, every moment, and all the little secrets that turn a simple trip into something unforgettable.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "I’m a simple person, born and raised in the desert – in a big family, but a small house. I started working as a tour guide in my village, Merzouga, showing tourists the beauty of the Sahara." },
          { q: "2) Where do you live and what do you love most about your place?", a: "I live in Merzouga, in the south of Morocco – the desert part. I love the beautiful sunrises and sunsets, and how peaceful and calm my village is, especially in the middle of the dunes of Erg Chebbi." },
          { q: "3) How did you become a guide / start showing your place to others?", a: "When you’re born in a tourist village like Merzouga, you almost naturally become a guide – especially if you didn’t finish school or get a government job. But for me, it was passion. I love meeting people from different countries – it’s like traveling to their lands without flying, just by talking and sharing culture. It’s a rich exchange of ideas, emotions, and understanding." },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "I’ve shared many beautiful moments with tourists, but the most special was with a couple who got engaged in my village – and later married in the Sahara. I was part of it and shared all that happiness with them." },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "The sunrise in the middle of the desert – it’s the most peaceful place on the planet." },
          { q: "6) What does being a “good guide” mean to you?", a: "A good guide is someone who understands what each person is looking for and helps guide them exactly where they want to be." },
          { q: "7) What do you want people to feel after touring with you?", a: "I hope that after meeting me, people remember me and fall in love with Morocco – and maybe come back because of me." },
          { q: "8) How has being a guide changed you as a person?", a: "Being a guide taught me a lot –s and helped me understand many different cultures from all over the world." },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "Being a guide isn’t always easy. Sometimes you meet difficult people with bad attitudes – and you have to learn how to handle that. It taught me how to work under pressure." },
          { q: "10) Your dream for yourself or for your place from now on?", a: "I don’t have a big dream. I just want to be happy and do what I love – being a guide. Because it’s us who make a place special, not the place that makes us special." },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "You can contact me on Instagram: @kacimerzouga" },
          { q: "Bonus) Tell us how we met.", a: "How we met... it was something totally unplanned. But you already know the whole story, don’t you?" },
        ],
        story: [],
      },
      video: null,
    },
  
    // ────────────────────────────────────────────────────────────
    // 4) Irina — Ghidul care îți amintește că lumea nu e doar de văzut, ci de simțit
    // ────────────────────────────────────────────────────────────
    {
      id: "irina-bali",
      emoji: "🌸",
      name: { ro: "Irina — Ghidul care îți amintește că lumea nu e doar de văzut, ci de simțit", en: "Irina — The guide who reminds you the world isn’t just to be seen, but to be felt" },
      tagline: { ro: "Luminoasă. Răbdătoare. Ancorată.", en: "Luminous. Patient. Grounded." },
      cover: "/assets/guides/irina-bali/cover I2.webp",
      gallery: [
        "/assets/guides/irina-bali/cover.webp",
        "/assets/guides/irina-bali/2.webp",
        "/assets/guides/irina-bali/3.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/ana_irina777/",
        facebook: "https://www.facebook.com/ana777.irina?mibextid=wwXIfr&rdid=8qAvqmM2FwUMya3F&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BfUrTprmT%2F%3Fmibextid%3DwwXIfr#",
        tiktok: "",
        youtube: "",
        website: "www.mereuinvacanta.com",
        blog: "https://www.facebook.com/share/17U3AoAwVK/",
      },
      ro: {
        intro: `Irina, pentru mine, a fost acel cântec de sirenă despre care au scris marii poeți ai lumii. Era omul care trăia deja visul pe care eu abia începeam să-l ating.

De la primul mesaj, până la întâlnirea noastră, pe o plajă din celebra Bali, au fost multe etape de trecut. Dar când momentul a venit, totul a fost pur și simplu… magic.
        
Povestea completă – care se întinde pe câteva capitole și zeci de pagini – o puteți citi în cartea mea:
„Pași prin Indonezia: Când Bali îți atinge sufletul.”
        
Un an mai târziu, ne-am revăzut. De data asta, în Ubud. Închiriasem o căsuță în mijlocul junglei tropicale, ca să pot termina un curs online. Acolo, între frangipani, ofrande și liniște, am cunoscut-o cu adevărat pe Irina.
        
Aveam propriul nostru ritual: în fiecare duminică, ieșeam împreună. Mâncam, beam cappuccino și povesteam. Cinci ore păreau cinci minute. Vespa era locul nostru de întâlnire. Alteori, venea la mine la căsuță. Găteam clătite. Ne bălăceam în piscină. Râdeam mult.
        
— Să nu pleci fără să mai faci o dată clătite! mi-a spus, când a aflat că urma să plec din Ubud după trei luni.
        
Și, cu o zi înainte de plecare, am făcut clătite. La final, i-am dăruit câteva lucruri pe care nu le mai puteam căra în rucsacul meu de 10 kilograme. Printre ele, o răzătoare. A râs și mi-a spus:
        
— Te rog să scrii în cartea ta că mi-ai dăruit o răzătoare. Probabil nimeni n-a mai primit un asemenea cadou.
        
Un suflet cald și o femeie incredibilă. Orice ai nevoie să știi despre Bali, Irina e persoana potrivită. Trăiește acolo de aproape cinci ani – în inima liniștii și a misticismului insulei.
        
De la sfaturi simple, la retreaturi personalizate, o poți întreba orice.
O recomand din suflet.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "Sunt Ana Irina, o călătoare care a ales să transforme pasiunea pentru explorare și transformare interioară într-un mod de viață. Îmi place să creez experiențe care aduc oamenii mai aproape de esența lor, fie printr-o călătorie în Bali, fie printr-un retreat care deschide inima." },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "Locuiesc în Ubud, Bali – un loc unde natura, spiritualitatea și comunitatea se împletesc armonios. Fiecare dimineață începe cu ofrande și parfumul frangipaniului, iar oamenii trăiesc în ritmul blând al recunoștinței. Ce iubesc cel mai mult? Faptul că Bali te învață să trăiești conștient: prezent, conectat și plin de sens." },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "Totul a pornit dintr-o nevoie de reconectare. Am venit în Bali într-un moment de tranziție personală, când am decis să-mi trăiesc viața altfel. Aici am descoperit nu doar un loc, ci o energie care te transformă. Așa s-a născut dorința de a-i ajuta și pe alții să trăiască această transformare – nu ca turiști, ci ca exploratori ai propriei ființe." },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "Îmi amintesc o seară, într-un retreat de reconectare, când un participant mi-a spus: „Nu m-am mai simțit bine cu mine de ani de zile, până azi.” Astfel de momente dau sens a tot ceea ce fac. Când vezi cum o simplă experiență devine o poartă spre vindecare." },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "L-aș duce dimineața pe un vârf de munte, aproape de câmpurile de orez, înainte de răsărit, când ceața încă plutește peste verdele viu. Acolo timpul se oprește. În liniștea aceea, simți că pământul respiră împreună cu tine. Aceea este esența insulei Bali." },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "Un ghid bun este un însoțitor al călătoriei conștiente. Nu cineva care conduce, ci care creează spațiu pentru descoperire. E despre prezență, respect și capacitatea de a asculta – locul, oamenii, viața." },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "Pace și claritate. Aș vrea să plece din Bali nu doar cu fotografii frumoase, ci cu o inimă mai deschisă și o nouă perspectivă asupra propriei vieți." },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "M-a învățat să trăiesc mai autentic. Fiecare persoană pe care o întâlnesc devine o oglindă. Chiar și când organizezi pentru alții, te afli într-un proces propriu de transformare." },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "Da. Odată, o persoană dintr-un grup și-a pierdut bagajul pe drum spre retreat. Am simțit presiunea de a „rezolva totul”, dar am înțeles că uneori ceea ce pare un obstacol devine o lecție de încredere și răbdare." },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "Să continui să creez spații dedicate transformării – în mijlocul naturii, al liniștii, al propriei esențe. Bali e doar începutul." },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "Instagram: @ana_irina777; www.mereuinvacanta.com;  Email: mereuinvacanta@gmail.com " },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "Ne-am cunoscut printr-o dorință comună: aceea de a trăi viața dincolo de regulile societății. De a o simți, nu doar de a o bifa. Încă de la început, am știut că împărtășim aceeași viziune: că lumea nu e doar de vizitat, ci de trăit cu sens, cu prezență și cu bucurie." },
        ],
        story: [],
      },
      en: {
        intro: `Irina, to me, was like that siren song the great poets write about. She was the one already living the dream I was just beginning to reach for.

From our first message to finally meeting on a beach in iconic Bali, many steps had to unfold. But when the moment came, it was nothing short of magical.
        
The full story – which spans several chapters and many pages – can be found in my book:
“Steps through Indonesia: When Bali Touches Your Soul.”
        
A year later, we saw each other again. This time in Ubud.
I had rented a little house in the jungle to finish an online course. And there, surrounded by frangipani, offerings, and silence, I truly got to know Irina.
        
We had our own little ritual: every Sunday, we’d go out together.
We’d eat, sip cappuccinos, and talk. Five hours often felt like five minutes. Vespa was our meeting point.
Other times, she’d come to my little house. We’d make pancakes. Swim in the pool. Laugh a lot.
        
When she found out I was leaving Ubud after three months, she smiled and said:
— Just promise you won’t go without making pancakes one more time.
        
And so, the day before I left, we made pancakes.
        
Before saying goodbye, I gave her a few things I could no longer carry in my 10 kilograms backpack. Among them – a grater. She laughed and said:
        
— Please don’t forget to write in your book that you gave me a grater. I bet no one’s ever received something like that as a gift.
        
A kind soul and an incredible woman.
If you ever need to know anything about Bali, Irina is the one.
She’s been living on the island for almost 5 years now – in the heart of its calm and mysticism.
        
From simple travel tips to fully personalized retreats, she’s someone you can trust.
        
I recommend her with all my heart.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "I’m Ana Irina, a traveler who chose to turn her passion for exploration and inner transformation into a way of life. I love creating experiences that bring people closer to their essence – whether through a journey to Bali or a retreat that opens the heart." },
          { q: "2) Where do you live and what do you love most about your place?", a: "I live in Ubud, Bali – a place where nature, spirituality, and community blend in harmony. Each morning begins with offerings and the scent of frangipani, and people live in a gentle rhythm of gratitude. What I love most is how Bali teaches you to live consciously – present, connected, and full of meaning." },
          { q: "3) How did you become a guide / start showing your place to others?", a: "It all began with a personal need for reconnection. I came to Bali during a time of transition, when I decided to live differently. What I found wasn’t just a place, but an energy that transforms you. That’s how the desire was born – to help others experience this transformation too, not as tourists, but as explorers of their own being." },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "I remember an evening during a reconnection retreat, when one participant told me: “I haven’t felt good with myself for years – until today.” Moments like that give meaning to everything I do. When you witness how a simple experience becomes a doorway to healing." },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "I would take them to the top of a mountain near the rice fields, early in the morning before sunrise, when the mist still floats over the vivid green. Time stands still there. In that silence, you can feel the Earth breathing with you. That is the essence of Bali." },
          { q: "6) What does being a “good guide” mean to you?", a: "A good guide is a companion on the conscious journey – not someone who leads, but someone who creates space for discovery. It’s about presence, respect, and the ability to truly listen – to the place, to the people, to life." },
          { q: "7) What do you want people to feel after touring with you?", a: "Peace and clarity. I hope they leave Bali not just with beautiful photos, but with a more open heart and a fresh perspective on their own life." },
          { q: "8) How has being a guide changed you as a person?", a: "It’s taught me to live more authentically. Every person I meet becomes a mirror. Even when you’re organizing for others, you yourself go through a form of inner transformation." },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "Yes. Once, someone in the group lost their luggage on the way to the retreat. I felt the pressure to ”fix everything,” but I learned that sometimes, what looks like a problem becomes a lesson in trust and patience." },
          { q: "10) Your dream for yourself or for your place from now on?", a: "To continue creating spaces dedicated to transformation – in nature, in silence, in the core of who we are. Bali is just the beginning." },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "Instagram: @ana_irina777; www.mereuinvacanta.com;  Email: mereuinvacanta@gmail.com " },
          { q: "Bonus) Tell us how we met.", a: "We met through a shared desire to experience life beyond society’s rules – to truly feel it, not just tick it off. From the very beginning, I felt we shared the same vision: that the world isn’t just something to visit, but something to live – with meaning, presence, and joy." },
        ],
        story: [],
      },
      video: null,
    },

    // ────────────────────────────────────────────────────────────
    // 5) Inggi — Ghidul care într-o clipă de ploaie transformă natura în poezie.
    // ────────────────────────────────────────────────────────────
    {
      id: "inggi-luwuk",
      emoji: "🌿",
      name: { ro: "Inggi — Ghidul care într-o clipă de ploaie transformă natura în poezie", en: "Inggi — The guide who turns a moment of rain into a poem of nature" },
      tagline: { ro: "Blândă. Naturală. Curajoasă.", en: "Gentle. Natural. Brave." },
      cover: "/assets/guides/inggi-luwuk/inggicover1.webp",
      gallery: [
        "/assets/guides/inggi-luwuk/inggi1.webp",
        "/assets/guides/inggi-luwuk/inggi2.webp",
        "/assets/guides/inggi-luwuk/inggicover.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/nggisptri_/",
        facebook: "https://www.facebook.com/nggisptri",
        tiktok: "https://www.tiktok.com/@dendrophilesixteennine?_r=1&_t=ZN-91U5QKqB8AY",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Eram deja de două zile pe insulă. Încă mă resimțeam după accident, așa că evitam să merg mult pe jos și mă limitam la locurile din apropierea satului unde eram cazată.

Într-una dintre plimbările scurte, am ajuns într-o lagună superbă, cu apă albastră ca cerneala diluată. Femeile spălau rufe în liniște, copiii se bălăceau în râsete, iar câțiva bărbați umpleau bidoane cu apă dintr-un pârâiaș care se vărsa dincolo de lagună.
Totul părea desprins dintr-o lume paralelă. Eu stăteam pe margine, prinsă în vraja acelui loc.
        
Nu puteam înțelege cum, în mijlocul acelei frumuseți copleșitoare, oamenii continuau gesturi atât de simple, atât de omenești. Și exact atunci… a apărut ea: Inggi.
        
Când s-a așezat lângă mine, am știut imediat că vom deveni prietene. Și nu m-am înșelat. Povestea noastră o spune chiar ea, mai jos, atât de frumos încât nu o voi repeta. Doar completez câteva detalii mici, dar esențiale.
        
Da, ploaia m-a împiedicat să ajung la debarcader în ziua aceea. Dar, privind în urmă, așa trebuia să fie. Ziua următoare, pe vaporul spre Luwuk, mă aștepta o întâlnire neașteptată.
Iar, per total, zilele petrecute în Banggai au fost magice – o liniște colorată, o umanitate caldă, o sinceritate rară.
        
Ce nu a menționat Inggi este că pentru tot ce a făcut – drumul de peste 40 de kilometri cu mașina unchiului ei, mâncarea, timpul, atenția – nu a vrut să ia niciun ban.
Ba mai mult: mi-a plătit și biletul de vapor spre Gorontalo.
Am întrebat-o de ce, după toate gesturile ei deja copleșitoare. A ridicat ușor din umeri și mi-a spus, simplu:
        
— Ești prietena mea.
        
Restul… sunt doar detalii.
        
Mă privea cu o lumină blândă, ca și cum în fața ei coborâse, pentru o clipă, luna în propria curte.
        
Am plecat privind-o pe ea și pe prietena ei, cu lacrimi dulci-amare în colțul ochilor.
Și nu, nu cred că există poveste pe care s-o poți inventa.
Realitatea bate imaginația – de fiecare dată. Și cu mult.
        
I-am promis că într-o zi mă voi întoarce.
Și da… îmi doresc din tot sufletul ca promisiunea asta să devină realitate.

P.S.
Când ne-am oprit la o cafea, a probat rochița roșie pe care i-o dăruisem.
A zâmbit, a făcut o piruetă și a spus cu o mândrie jucăușă:

— Foarte sexy!

Toată lumea a izbucnit în râs.
Iar în ochii ei se vedea o fericire care nu avea nevoie de traducere.`,
        qna: [
          { q: "1) Cine ești în câteva cuvinte?", a: "Sunt o fată de 24 de ani, caldă, veselă și apropiată de natură. Am crescut fiind mereu înconjurată de frumusețea naturii și asta mi-a adus fericire. Iubesc animalele și am grijă de ele ori de câte ori le întâlnesc. Uneori, în pauzele dintre aventuri, creez mici bijuterii sau accesorii – brățări, coliere, brelocuri. Sunt o persoană optimistă și iubesc viața, natura, animalele și oamenii din jurul meu. Dacă îți e greu să ți amintești de mine, încearcă doar să ți amintești numele: INGGI SAPUTRI." },
          { q: "2) Unde trăiești și ce iubești cel mai mult la locul tău?", a: "Sunt din Luwuk, regiunea Banggai, o zonă din Sulawesi Central, formată din trei părți: Banggai, Insulele Banggai și Banggai Laut. Este un loc care, deși puțin cunoscut, ascunde o frumusețe naturală rară: dealuri, păduri tropicale, plaje izolate, peșteri spectaculoase și unele dintre cele mai clare lacuri și cascade din Indonezia. În Banggai, cascada Sempe impresionează prin jeturile sale largi, care curg în trepte de pe stânci acoperite cu mușchi. Piala cucerește prin culoarea turcoaz și liniștea pădurii din jur, iar Laumarang ascunde o peșteră misterioasă în spatele căderii de apă. Insulele Banggai găzduiesc lacul Paisupok, cu ape cristaline și reflexii ireal de frumoase, plaja Poganda – cu nisip alb și leagăne între palmieri – și peștera Babanang, unde se află o piscină naturală de un albastru hipnotizant. În Banggai Laut, natura devine și mai spectaculoasă: Tanjung Bandul are un arc natural sculptat de vânt și valuri, locul de snorkeling Bontolan te poartă într-un recif viu și colorat, iar lacul cu meduze Paisu Batongan este un paradis rar, unde poți înota printre creaturi delicate, fără teamă. Toate aceste locuri sunt dovada că Banggai este o comoară naturală ce merită descoperită pas cu pas." },
          { q: "3) Cum ai ajuns să devii ghid / să arăți locul tău altora?", a: "Totul a început simplu – eram doar o fată care iubea să călătorească. Ori de câte ori aveam puțin timp liber, porneam singură spre locuri ascunse: o plajă izolată, o cascadă uitată de lume sau un colț liniștit unde se auzeau doar vântul și păsările. Pe drum, întâlneam adesea străini: unii rătăciți, alții curioși, unii singuri, bucurându-se de natură. Și, cumva, mereu ajungeam să-i ajut – cu un sfat, o poveste sau chiar însoțindu-i. La un moment dat, am început să postez fotografii din aventurile mele: ape limpezi, stânci dramatice, păduri verzi. Fără a aștepta ceva. Dar mesajele au început să curgă: „Unde e locul ăsta?”, „Mă poți duce acolo?”, „Cum ajung?” Nu m-am gândit niciodată că cineva mi-ar cere să fiu ghid. Și totuși, din acele conversații mici, s-a născut o chemare. Așa am devenit, fără să-mi propun, o mică ghidă – născută din dragostea pentru locul meu și din dorința sinceră de a-l împărtăși cu alții." },
          { q: "4) Care e cel mai frumos moment pe care l-ai trăit alături de un vizitator?", a: "A fost o zi care trebuia să fie una obișnuită – însoțeam o turistă către o cascadă ascunsă adânc în pădure. Totul părea perfect: soarele străbătea printre frunze, apa cădea clar și puternic, iar atmosfera era plină de entuziasm. Dar natura are mereu propriile planuri. Cerul s-a întunecat brusc, vântul a început să sufle puternic și, în câteva secunde, o ploaie torențială a căzut peste noi. Ne-am adăpostit sub copaci, fugind și râzând. Eram leoarcă, reci și ude din cap până-n picioare. Și totuși... acel moment a devenit unul dintre cele mai calde. Râdeam. Am simțit căldura conexiunii umane – acel tip de apropiere care se naște din spontaneitate și trăire autentică. Atunci am înțeles: cele mai frumoase clipe nu apar când totul merge perfect, ci când ceva neașteptat ne face să simțim cu adevărat că trăim. Altă dată, am pornit cu o vizitatoare spre cascada Sempe – un traseu greu de șapte kilometri, pe o potecă abruptă și alunecoasă. La primul urcuș, s-a oprit. Respira greu, era palidă și mi-a șoptit: „Mi-e rău și ameșesc… nu mai văd bine.” M-am apropiat imediat și i-am spus că putem renunța. Dar ea a dat din cap, încet, cu o determinare uimitoare: „Am ajuns până aici. Vreau să văd cascada.” Am mers încet, cu pauze dese. Când, în sfârșit, am auzit vuietul apei, ochii i s-au luminat. Și când a zărit cascada, a zâmbit cum n-am mai văzut pe nimeni să zâmbească. În acel moment, tot efortul dispăruse. Nu m-am simțit mândră pentru că am dus-o la destinație, ci pentru că am fost martoră la curajul și puterea unei ființe care și-a depășit propriile limite. Drumul spre Sempe n-a fost doar un traseu fizic, ci o lecție despre perseverență, voință și frumusețea de a nu renunța." },
          { q: "5) Dacă ai putea arăta unui străin doar un singur loc sau moment din viața ta de aici, ce ai alege? De ce?", a: "L-aș duce fără îndoială la Lacul Paisupok – unul dintre cele mai speciale locuri din provincia Sulawesi Central. La prima vedere, pare o bijuterie tropicală ascunsă: apă limpede ca cristalul, reflexii turcoaz și un calm absolut. Dar frumusețea acestui loc stă și în povestea sa. În limba locală, „Paisupok” înseamnă „apă neagră”. Și, într-adevăr, așa părea cândva. Pădurea densă care îl înconjura nu lăsa lumina să pătrundă, iar lacul părea întunecat, misterios, aproape uitat. Apoi, într-o zi, când copacii au fost tăiați, razele soarelui au pătruns pentru prima dată direct pe apă. Și toți au rămas fără cuvinte: ceea ce părea un lac întunecat ascundea, de fapt, o comoară incredibil de clară, în nuanțe de albastru și verde. Acum, fundul lacului e vizibil ca prin sticlă, fiecare detaliu natural se dezvăluie în toată splendoarea lui. Paisupok nu mai e doar un lac. E o revelație. O minune care a ieșit din umbre, gata să inspire și să uimească. Acolo, simți că natura ți-a oferit o lecție despre răbdare, lumină și frumusețea ascunsă." },
          { q: "6) Ce înseamnă pentru tine să fii un „ghid bun”?", a: "Pentru mine, un ghid bun este mai mult decât cineva care arată direcția. Este acel om care te face să te simți în siguranță, înțeles și binevenit. Un ghid bun oferă informații corecte, nu promite mai mult decât poate oferi și tratează fiecare vizitator cu respect și răbdare. E despre responsabilitate – să ai grijă ca fiecare experiență să fie nu doar frumoasă, ci și sigură. E despre sinceritate – să fii autentic în ceea ce spui și faci. E despre căldură – să zâmbești din inimă, chiar și după un drum lung sau o ploaie neașteptată. Și poate cel mai important: un ghid bun nu se plânge ușor. Pentru că energia ta devine energia grupului. Dacă tu ești pozitiv, și ei vor fi. Dacă tu ești atent, și ei se vor simți văzuți. Iar în final, dacă reușești să faci un vizitator să plece acasă cu inima plină și amintiri frumoase, atunci ți-ai îndeplinit misiunea." },
          { q: "7) Ce ai vrea ca oamenii să simtă după ce te cunosc / după ce vizitează zona cu tine?", a: "Cel mai mult îmi doresc ca oamenii să plece de aici cu inima plină. Să se simtă împliniți, apreciați și în siguranță. Să simtă că locul acesta i-a primit cu brațele deschise și că fiecare clipă petrecută a avut sens. Vreau să se îndrăgostească de frumusețea regiunii mele – de locurile ascunse, de natura pură, dar și de liniștea sau poveștile care le însoțesc. Îmi doresc ca experiența lor să se transforme într-o amintire vie, una care să le aducă zâmbetul pe buze chiar și peste ani. Fie că și-au iubit traseul, fie că au fost atinși de o poveste sau de modul în care i-am ghidat – sper ca ceva să rămână cu ei. Iar poate, într-o zi, să revină. Sau să spună altcuiva: „Trebuie să mergi acolo. Vei înțelege de ce.”" },
          { q: "8) Cum te-a schimbat faptul că ești ghid, ca om?", a: "A fi ghid turistic m-a transformat profund. M-a făcut mai deschisă, mai flexibilă și mai atentă la nuanțele fiecărui om. Întâlnind persoane din culturi, regiuni și medii diferite, am învățat să înțeleg mai bine emoțiile și personalitățile lor, fără să judec, ci să ascult și să accept.  Rolul acesta m-a învățat responsabilitatea – pentru siguranța, confortul și starea de bine a fiecărui vizitator. În același timp, m-a învățat să fiu mereu pozitivă. Să zâmbesc, să rămân calmă și caldă, chiar și când lucrurile nu merg perfect. Pe termen lung, toate aceste lecții m-au format ca om: mai înțeleaptă, mai empatică și mai recunoscătoare pentru diversitatea lumii în care trăim." },
          { q: "9) A existat vreun moment dificil într-un tur, care te-a învățat ceva important?", a: "Da, au fost momente dificile – iar cel mai frecvent este legat de vreme. În unele zile, soarele strălucește, iar în următorul minut se pornește o ploaie torențială, fără niciun avertisment. Iar uneori, nu există niciun adăpost potrivit în apropiere. De aceea, am învățat că trebuie să fim mereu pregătiți – chiar și într-o zi însorită, un impermeabil în rucsac poate face diferența. Un alt moment provocator apare când, din diverse motive, o destinație planificată se închide brusc. Aici am învățat importanța flexibilității. E esențial să avem mereu un plan B și chiar un plan C – plus contacte de rezervă (alți șoferi, alte locuri de vizitat). În turism, imprevizibilul face parte din aventură – dar pregătirea face diferența între o zi pierdută și o zi salvată cu zâmbetul pe buze." },
          { q: "10) Ce vis ai pentru tine sau pentru locul tău, de acum înainte?", a: "Visul meu este să devin un ghid profesionist și iubit, care poate oferi vizitatorilor experiențe de neuitat. Cel mai mare vis al meu, însă, este ca într-o zi să am ocazia să călătoresc și eu în lume, să descopăr locuri noi, să învăț lucruri noi și să-mi deschid orizonturile. Pentru zona mea, îmi doresc ca atracțiile noastre turistice să devină cunoscute, astfel încât economia locală să se dezvolte – să-i ajute pe comercianți, pe artiștii locali și întreaga comunitate să simtă beneficiile turismului. Și, bineînțeles, sper ca infrastructura – drumurile, transportul, facilitățile turistice și spațiile publice – să devină mai îngrijite, mai sigure și mai confortabile pentru toți cei care ne vizitează." },
          { q: "11) Unde te pot găsi cei care vor să te contacteze? (IG/FB/YouTube/TikTok/site/blog)", a: "Instagram: nggisptri_ / arthnate; Facebook: inggi / nggisptri; TikTok: i.saputri / dendrophilesixteennine." },
          { q: "Bonus) Povestește-ne cum ne-am cunoscut.", a: "Pe 24 decembrie 2024, în adierea blândă și liniștea locului numit Paisubatango, am cunoscut o turistă pe nume Mida Malena. Întâlnirea noastră a fost simplă: ne-am salutat, am schimbat câteva vorbe, am făcut o fotografie împreună și i-am cerut contul de Instagram – doar ca să ținem legătura și să păstrăm prietenia proaspăt înfiripată. Dar drumurile noastre s-au despărțit imediat. Eu aveam planuri să continui către plaja Poganda, iar a doua zi, spre Peștera Babanang. Mida, în schimb, urma să exploreze Lacul Paisupok. În acea seară, am primit un mesaj de la ea pe Instagram. De acolo, povestea noastră a continuat. Am decis să ne întâlnim din nou, pe 26 decembrie, în port, ca să ne întoarcem împreună spre Luwuk. Dar în ziua respectivă, doar eu am ajuns – Mida fusese prinsă de ploaie în Lukpanenteng. Mi-a spus apoi că vrea să meargă spre Gorontalo și m-a întrebat cum poate ajunge acolo. I-am trimis orarul bărcilor care plecau din portul Pagimana pe 29 decembrie. Pe 27 decembrie, după-amiază, m-a contactat din nou: ajunsese deja în Luwuk și mi-a cerut recomandări de locuri de vizitat. Pe 28 decembrie, împreună cu o prietenă și verișoara mea, am mers să o luăm cu motocicleta și am dus-o la două dintre cele mai frumoase cascade: Piala și Laumarang. La început, cerul era senin, râdeam mult și atmosfera era ușoară. Dar, odată ajunse la cascada Laumarang, cerul s-a schimbat brusc. Norii s-au adunat, iar o ploaie torențială a acoperit toată pădurea. Nu aveam unde să ne adăpostim, în afară de copacii înalți și frunzișul des. Mida s-a refugiat acolo, zâmbind chiar și în mijlocul haosului neașteptat. Eram toate ude până la piele, tremuram de frig, dar... ne era cald în suflet. Am povestit despre viață, despre cum vede ea lumea cu inima deschisă. De la Mida am învățat că adevărata curaj nu înseamnă doar să urci munți sau să explorezi locuri necunoscute, ci și să primești surprizele neașteptate ale vieții cu zâmbetul pe buze. Ploaia de atunci a șters orice distanță între noi. A transformat o simplă excursie într-un moment de neuitat. Laumarang n-a fost doar o cascadă – a fost lecție, prietenie și începutul unei povești noi." },
          { q: "Povestea continuă:", a: " Pe 29 decembrie, mama mea, unchiul meu și câțiva prieteni au venit cu mine să o luăm pe Mida de la hotel și să o conducem până în portul Pagimana. N-am vrut să ne despărțim fără o amintire, așa că ne-am oferit mici daruri. Eu i-am dat o eșarfă batik, iar Mida mi-a dăruit o rochie roșie – elegantă, curajoasă, exact ca ea. I-a oferit prietenei mele o brățară, iar aceasta i-a dăruit la schimb o pereche de ochelari de soare. Pentru că vaporul pleca seara, am oprit la o cafenea – am băut ceai cu gheață și cafea, am râs, am acoperit lacrimile cu glume și am făcut fotografii care vor deveni amintiri. La plecare, Mida mi-a dat un tricou negru din Malaezia și altul alb pentru prietena mea. Când ne-am îmbrățișat la despărțire, am încercat să-mi stăpânesc lacrimile… dar n-am reușit. Am putut doar să mă rog ca Dumnezeu să o însoțească mereu cu oameni buni și sinceri. Apoi am plecat, lăsând portul dimineții în spatele nostru, cu inima plină de un gând simplu: călătoriile nu sunt doar despre locurile unde ajungem, ci despre oamenii pe care îi întâlnim. Oameni care lasă urme în viața noastră, chiar și pentru puțin timp."},
        ],
        story: [],
      },
      en: {
        intro: `I had already been on the island for two days. I was still recovering from the accident, so I avoided walking too much and stayed close to the village where I was staying.

During one of my short walks, I reached a breathtaking lagoon, with water blue like diluted ink. Women were washing clothes, children were splashing and laughing, and a few men were filling containers with water from a small stream flowing beyond the lagoon.
Everything felt unreal, as if borrowed from another world. I sat there, caught in its quiet spell.
        
I couldn’t understand how, right in the middle of such overwhelming beauty, people continued their simple, everyday rituals. And that’s when… she appeared: Inggi.
        
When she sat down next to me, I knew instantly that we would become friends. And I wasn’t wrong. She tells our story below, beautifully, so I won’t repeat it here. I’ll just add a few small but essential details.
        
Yes, the rain kept me from reaching the pier that day. But looking back, that’s exactly how it was meant to happen.
The next morning, on the boat to Luwuk, an unexpected encounter was waiting for me.
And in the end, the days I spent in Banggai were magical – warm-hearted, sincere, unforgettable.
        
What Inggi didn’t mention is that for everything she did – the 40-kilometer drive with her uncle’s car, the food, the time, the care – she refused to take any money.
And even more: she paid for my ferry ticket to Gorontalo.
        
When I asked her why – after everything she had already done – she simply shrugged and said:
        
“You are my friend.”
        
Everything else… is just detail.
        
She looked at me with a gentle light, as if the moon itself had quietly descended into her backyard for a moment.
        
I left while looking at her and her friend, their eyes glistening with sweet, bittersweet tears.
And no, I don’t believe a story like this can be invented.
Reality always outshines imagination. By far.
        
I promised her that one day I would return.
And yes… I truly hope that day will come.

P.S.
When we stopped for a coffee, she tried on the red dress I had given her.
She smiled, spun around playfully, and said:

“Very sexy!”

Everyone burst into laughter.
And in her eyes, happiness shone in a way that needed no translation.`,
        qna: [
          { q: "1) Who are you in a few words?", a: "I'm a 24-year-old girl who is warm, cheerful, and close to nature. I grew up surrounded by nature's beauty, and that's where I always found my happiness. I love and care for animals whenever I meet them. In between my adventures, I sometimes express my creative side by making small things like bracelets, necklaces, keychains, and bag hangers. I'm an optimistic person who loves life, nature, animals, and the people around me. If you have a bit of trouble remembering me, just remember my name: INGGI SAPUTRI." },
          { q: "2) Where do you live and what do you love most about your place?", a: "I’m from Luwuk, Banggai Regency in Central Sulawesi – a region divided into Banggai, the Banggai Islands, and Banggai Laut. Though lesser-known, it’s filled with rare natural beauty: hills, tropical forests, remote beaches, caves, and some of the clearest lakes and waterfalls in Indonesia. In Banggai, Sempe Waterfall impresses with wide, terraced flows over mossy cliffs. Piala is known for its turquoise pools, and Laumarang hides a cave behind its majestic cascade. The Banggai Islands are home to Paisupok Lake, crystal-clear and dreamlike; Poganda Beach, with white sand and ocean swings; and Babanang Cave, with an electric-blue natural pool beneath ancient rock. In Banggai Laut, nature becomes even more surreal: Tanjung Bandul features a giant rock arch carved by time, Bontolan offers vibrant coral reefs for snorkeling, and Paisu Batongan Jellyfish Lake lets you swim with gentle, stingless jellyfish in a magical setting. Banggai is truly a hidden gem, waiting to be explored." },
          { q: "3) How did you become a guide / start showing your place to others?", a: "It all started simply – I was just a girl who loved to explore. Every time I had a bit of free time, I’d head out on my own to quiet places: a hidden beach, a waterfall behind the hills, or a peaceful spot where only birds and wind kept me company. On the way, I often met travelers – some lost, some curious, some simply soaking in nature. Somehow, I always found myself helping them, whether by sharing directions, walking with them, or telling stories. Eventually, I began posting photos from my adventures: crystal-clear waters, dramatic cliffs, lush forests. I never expected much. But then the messages came: „Where is this?”, „Can you take me there?”, „When can we go?” I never planned to be a guide. But from those small conversations, something bigger began. And so, without intending to, I became a little guide – born from a love for my home and a deep desire to share its magic with those who long to discover it." },
          { q: "4) The most beautiful moment you’ve lived with a visitor?", a: "It was supposed to be an ordinary day – I was guiding a tourist to a waterfall hidden deep in the forest. Everything felt perfect: sunlight filtering through the leaves, the waterfall flowing strong and clear, and excitement in the air. But nature loves surprises. The sky suddenly darkened, the wind picked up, and within seconds, heavy rain came pouring down. We ran under the trees, laughing and slipping through the forest – soaked to the bone. Yet somehow... that became one of the warmest moments. No one was upset. We were all smiling, connected by something real. That’s when I realized: the best memories are often born not when things go perfectly, but when the unexpected makes us feel fully alive. Another day, I guided a visitor to Sempe Waterfall – a steep 7-kilometer trek through rough, slippery paths. After just a few minutes, she stopped, pale and short of breath. “I feel dizzy,” she whispered. I suggested we turn back, but she gently shook her head: “I came this far. I want to see the waterfall.” We continued, slowly. When we finally heard the roar of the water, her face lit up. And when she saw the waterfall – majestic, tall, flowing like silk – her smile said it all. It wasn’t just about reaching the destination. It was about the strength she found inside herself. That journey wasn’t only a physical one – it was a moment of breaking limits, of courage, of proving that we’re often stronger than we think." },
          { q: "5) If you could show a stranger just one place or moment, what would it be and why?", a: "Without a doubt, I would take visitors to Lake Paisupok – one of the most special places in Central Sulawesi. At first glance, it looks like a hidden tropical gem: crystal-clear water, shades of turquoise, and an incredible sense of peace. But its true beauty lies in its story. In the local Banggai language, “Paisupok” means dark water. And indeed, it once was. The lake used to be surrounded by thick forest, so dense that sunlight barely touched the surface. From the outside, it looked shadowy, mysterious, even forgotten. Then, one day, trees were cleared around it – and for the first time, light broke through. What had seemed dark suddenly revealed itself: the water shimmered in brilliant blues and greens, as clear as glass. The lakebed, once hidden, became visible in all its natural beauty. Paisupok had transformed from a mysterious shadow into a radiant, breathtaking place. It’s no longer just a lake – it’s a symbol. A quiet miracle that reminds us how beauty often lies just beneath the surface, waiting for the light to reveal it." },
          { q: "6) What does being a “good guide” mean to you?", a: "To me, a good guide is more than someone who points the way. It’s someone who makes you feel safe, seen, and truly welcome. A good guide shares knowledge honestly, without exaggeration, and treats each visitor with deep respect and kindness. It’s about responsibility – making sure the journey is not just beautiful, but also safe and smooth. It’s about sincerity – being genuine in your words and actions. And it’s about warmth – a heartfelt smile can sometimes mean more than any destination. Most of all, a good guide stays positive, even when plans change or challenges appear. Because your energy sets the tone. When you’re calm and joyful, your guests will feel it too. And if they go home with stories that stay with them, with hearts a little fuller – that’s when you know you’ve done something meaningful." },
          { q: "7) What do you want people to feel after touring with you?", a: "Above all, I want visitors to leave with full hearts. I want them to feel fulfilled, appreciated, and safe. I want them to sense that this place welcomed them with open arms, and that every moment here mattered. I hope they fall in love with the unique beauty of my region – its hidden gems, untouched nature, and the quiet stories that surround it. I want their time here to become a vivid memory, one that brings a smile whenever they think of it. Whether it’s because of the landscapes, the stories, or the way I guided them – I hope something stays with them. And maybe, someday, they’ll come back. Or tell someone else: “You have to go there. You’ll understand why.”" },
          { q: "8) How has being a guide changed you as a person?", a: "Being a tour guide has deeply changed me. It made me more open, flexible, and sensitive to the uniqueness of every person I meet. Interacting with people from different cultures, backgrounds, and personalities helped me better understand their feelings – to listen without judgment and to appreciate every story. This role taught me what it means to be truly responsible – to care for the safety, comfort, and happiness of others. At the same time, it taught me to stay positive. To smile, to be cheerful, and to carry good energy even when things don’t go as planned. Over time, all these experiences shaped me into someone wiser, more compassionate, and deeply grateful for the diversity and beauty of this world." },
          { q: "9) A difficult moment during a tour that taught you something important?", a: "Yes, I’ve definitely faced challenging moments – and the most common one is sudden bad weather. There are days when the sun is shining, and the next minute, heavy rain falls without warning. Sometimes there’s no proper shelter nearby, so I’ve learned to always be prepared. Even on sunny days, having a raincoat in the backpack can be a lifesaver. Another challenge comes when a destination suddenly closes for some reason. That’s when I realized how important it is to stay flexible and calm. It’s always best to have a plan B – and even a plan C – ready, along with backup contacts like other drivers or alternative spots to visit. In tourism, unexpected things happen. But the key is to be ready – that way, even the surprises can turn into good memories." },
          { q: "10) Your dream for yourself or for your place from now on?", a: "My dream is to become a professional and well-loved guide – someone who can give visitors truly unforgettable experiences. But my biggest dream is that one day, I’ll get the chance to travel the world myself, to explore new places, learn new things, and expand my perspective on life. For my region, I hope that by making our tourist spots more well-known, we can improve the local economy – helping traders, artists, and the surrounding community to benefit from tourism too. And of course, I wish for better infrastructure: tidier roads, safer transportation, improved tourist facilities, and more comfortable public spaces for everyone who visits." },
          { q: "11) Where can people find/contact you? (IG/FB/YouTube/TikTok/site/blog)", a: "Instagram: nggisptri_ / arthnate; Facebook: inggi / nggisptri; TikTok: i.saputri / dendrophilesixteennine" },
          { q: "Bonus) Tell us how we met.", a: "On December 24, 2024, in the gentle breeze and peaceful surroundings of Paisubatango, I met a tourist named Mida Malena. Our meeting was simple – a few words, a quick photo, and an Instagram exchange to mark a new friendship. Soon after, we had to part ways. I was continuing my journey to Poganda Beach and later to Babanang Cave, while Mida planned to explore the beauty of Lake Paisupok. That night, I received a message from her. From there, our story unfolded. We agreed to meet again on December 26th at the harbor to return to Luwuk together. But that day, only I showed up – Mida got caught in the rain in Lukpanenteng. She messaged me saying she was thinking of heading to Gorontalo and asked how to get there. I sent her the boat schedule from Pagimana Port for December 29th. The next day, December 27, in the afternoon, she contacted me again – she had made it to Luwuk and asked for recommendations on places to visit. On December 28, along with my cousin and a friend, we picked her up on a motorbike and took her to two waterfalls: Piala and Laumarang. At first, the sky was clear, and the ride was full of laughter. But when we arrived at Laumarang Waterfall, dark clouds suddenly rolled in. Rain poured down heavily, drenching the entire forest. With no proper shelter, we took cover under the tall trees. Mida stood there, smiling – even in the rain. We were all soaked and cold, but the moment felt warm. We talked about life, about her open-hearted way of seeing the world. From Mida, I learned that courage isn’t just about grand adventures – it’s also about embracing life’s little surprises with grace. The rain erased the distance between us. That day wasn’t just about waterfalls – it became a memory of friendship, connection, and shared stories." },
          { q: "The story continues:", a: " On December 29, my mother, uncle, and friends helped take Mida from her hotel to Pagimana harbor. Before parting, we exchanged small gifts – a sweet tradition that made the goodbye feel warmer. I gave her a batik scarf, and she gave me a bold red dress – just like her personality. She also gave a bracelet to my friend, who returned the gesture with a pair of sunglasses. Since her ship would depart in the evening, we stopped for iced tea and coffee. We laughed through the tears and took photos to keep the memory alive. Before leaving, Mida handed me a black t-shirt from Malaysia, and a white one for my friend. When we hugged goodbye, I tried to hold back my tears – but I couldn’t. All I could do was pray that God would always surround her with good and kind people. As we walked away, the harbor faded into the twilight. But the memory remained – a reminder that: Travel is not just about the places we visit, but the people we meet along the way. People who leave lasting footprints on our hearts, even if just for a short while."},
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
  