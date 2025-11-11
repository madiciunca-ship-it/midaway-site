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
   
      name: {
        ro: "Adi – Cel care mi-a dat curajul să plec",
        en: "Adi – The one who gave me the courage to leave",
      },
      tagline: {
        ro: "Curios. Aventuros. Adaptabil.",
        en: "Curious. Adventurous. Adaptable.",
      },
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
          { q: "1. Cine ești în câteva fraze?", a: "Sunt Adrian, am 33 de ani, sunt din România și, deși sunt IT-ist de profesie, sufletul meu aparține aventurii și descoperirii. Sunt un visător care crede că fiecare loc, om și moment are o poveste de spus. Dansul latino e felul meu de a simți viața, iar călătoriile – modul în care o trăiesc cu adevărat. Am explorat până acum 34 de țări de pe 4 continente, mereu cu aparatul foto în rucsac și o curiozitate care nu se oprește niciodată. Îmi place să citesc, să ascult muzică, să merg la sală și să mă pierd în locuri noi, unde pot învăța ceva despre lume și despre mine." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Totul a pornit dintr-un vis din copilărie – dorința aceea pură de a descoperi lumea, de a vedea cum trăiesc alți oameni, ce gust are mâncarea lor, cum sună limba lor și ce tradiții îi definesc. Nu a fost un moment anume, ci mai degrabă o chemare care a crescut în mine în timp. Într-o zi mi-am dat seama că dacă nu plec acum, o să rămân mereu cu întrebarea „cum ar fi fost dacă?”. Așa că mi-am luat rucsacul, aparatul foto și curajul, și am început să transform visul de copil într-un mod de viață." },
          { q: "3. Când ai știut că merită?", a: "Am știut că merită din primele momente în care am simțit acea bucurie pură pe drum – senzația că trăiesc cu adevărat. Fiecare loc nou îmi aducea o doză de entuziasm greu de descris, dar au fost momente care mi-au rămas adânc întipărite: când am pășit pentru prima dată pe străzile din New York, când am văzut luminile din Las Vegas sau când am admirat Parisul noaptea. Atunci mi-am dat seama că visul meu din copilărie devenise realitate – că eram acolo, în locuri pe care le văzusem doar în filme, trăind emoțiile pe care altădată doar le visam." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Nu pot spune că un anumit loc m-a schimbat complet. Mai degrabă simt că fiecare loc pe care l-am vizitat a adăugat ceva la mine, ca o piesă într-un puzzle. Fiecare experiență, fiecare cultură, fiecare om întâlnit m-a completat puțin câte puțin. Pentru mine, călătoriile nu au fost despre transformare bruscă, ci despre construcție – despre a mă descoperi pas cu pas prin tot ce trăiesc și învăț de la lume." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Călătoriile m-au învățat recunoștința. Cu fiecare țară vizitată am început să văd mai clar cât de multe lucruri avem și cât de puțin le apreciem uneori. Mi-am dat seama că, deși în România ne plângem des de neajunsuri, adevărul e că trăim într-un loc cu multe lucruri frumoase – oameni, natură, libertate. În alte părți am văzut cât de greu le este unora și cât de mult și-ar dori să aibă ceea ce noi considerăm „normal”. Călătoria m-a făcut să fiu mai recunoscător, mai conștient și mai prezent." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Cele mai grele momente sunt mereu ultimele zile dintr-o călătorie – clipa în care trebuie să plec și să las totul în urmă. În rest, chiar și situațiile dificile m-au ajutat să cresc. Am învățat să rămân calm, indiferent cât de stresantă pare o situație, și să mă adaptez rapid. De fiecare dată când ceva nu mergea cum planificasem, mă întrebam: „O să mai conteze asta peste cinci ani?” Dacă răspunsul era „nu”, atunci respiram adânc, zâmbeam și mergeam mai departe." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Sfatul meu e simplu: nu ezita. Niciodată nu va fi momentul „perfect” să pleci, dar fiecare zi în care amâni e o zi pierdută dintr-o poveste care ar putea fi a ta. Îmi place mult o zicală de la Mark Twain care spune: „Peste douăzeci de ani vei fi mai dezamăgit de lucrurile pe care nu le-ai făcut decât de cele pe care le-ai făcut. Așa că ridică ancora, pleacă din portul sigur, prinde vântul în pânze. Explorează. Visează. Descoperă.” Și exact asta le-aș spune celor care stau pe gânduri – pornește acum, pentru că lumea nu așteaptă." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Instagram: @adrianstefanilles, Facebook: Adrian Stefan Illes. Acolo împărtășesc momente din călătoriile mele, povești, experiențe și fragmente din modul în care văd lumea." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Prima oară ne-am întâlnit acum 5-6 ani, la o petrecere de latino în Baia Mare. Ne-am văzut pe ringul de dans, am legat o conversație spontană și am schimbat contactele pe Facebook. La început am rămas doar cunoscuți, iar tu mi-ai urmărit aventurile și călătoriile din când în când. Cu timpul, discuțiile noastre despre lume și călătorii au devenit tot mai dese. Am început să împărtășim povești, impresii și recomandări, iar conexiunea noastră s-a transformat firesc dintr-o simplă cunoaștere într-o prietenie frumoasă – construită în jurul pasiunii pentru descoperirea lumii." },
        ],
        story: [
          "",
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
          { q: "1. Who are you in a few sentences?", a: "I’m Adrian, 33 years old, I am from Romania, and although I’m an IT professional, my heart belongs to adventure and discovery. I’m a dreamer who believes that every place, person, and moment has a story to tell. Latin dance is how I feel life; traveling is how I truly live it. So far, I’ve explored 34 countries across 4 continents, always with my camera in my backpack and a curiosity that never rests. I love reading, listening to music, working out, and getting lost in new places where I can learn something about the world – and about myself." },
          { q: "2. What made you start traveling?", a: "It all started with a childhood dream – that pure desire to discover the world, to see how other people live, what their food tastes like, how their language sounds, and what traditions define them. It wasn’t a single moment, but rather a calling that grew inside me over time. One day I realized that if I didn’t leave then, I’d always live with the question, “What if?” So I packed my backpack, my camera, and my courage – and began turning a childhood dream into a way of life." },
          { q: "3. When did you know it was worth it?", a: "I knew it was worth it from the very first moments when I felt that pure joy of being on the road – the feeling that I was truly living. Every new place brought an indescribable thrill, but some moments stayed deep within me: the first time I walked the streets of New York, saw the lights of Las Vegas, or admired Paris at night. That’s when I realized my childhood dream had become real – I was there, in places I’d only seen in movies, living emotions I once only dreamed of." },
          { q: "4. A place that changed the way you see the world?", a: "I can’t say that one specific place completely changed me. I feel like every destination I’ve visited has added something to me – like a piece in a puzzle. Each experience, each culture, each person I’ve met has completed me little by little. For me, travel was never about sudden transformation, but about growth – discovering myself step by step through everything I experience and learn from the world." },
          { q: "5. How did traveling change you as a person?", a: "Travel has taught me gratitude. With every country I’ve visited, I’ve seen more clearly how much we have – and how little we sometimes appreciate it. I realized that, although in Romania we often complain about what’s missing, the truth is that we live in a place full of beauty – in its people, nature, and freedom. In other parts of the world, I’ve seen how hard life can be, and how much some people wish for what we take for granted. Travel made me more grateful, more aware, and more present." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "The hardest moments for me are always the last days of a journey – that instant when you have to leave and say goodbye. Everything else, even the tough parts, has helped me grow. I’ve learned to stay calm no matter how stressful things seem, and to adapt quickly. Whenever something didn’t go as planned, I asked myself, “Will this still matter in five years?” If the answer was “no,” I took a deep breath, smiled, and moved on." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "My advice is simple: don’t hesitate. There will never be a “perfect” time to go, and every day you wait is a day lost from a story that could be yours. I love a quote by Mark Twain that says: “Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.” And that’s exactly what I’d tell anyone who’s hesitating – start now, because the world won’t wait." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "Instagram: @adrianstefanilles, Facebook: Adrian Stefan Illes. That’s where I share moments from my travels, stories, experiences, and glimpses of how I see the world." },
          { q: "9. Bonus: How did we meet?", a: "We first met about 5–6 years ago at a Latin dance party in Baia Mare. We met on the dance floor, had a spontaneous chat, and exchanged Facebook contacts. At first, we were just acquaintances, and you occasionally followed my travels and adventures. Over time, our conversations about the world and travel became more frequent. We started sharing stories, impressions, and tips – and our connection naturally grew from a simple acquaintance into a beautiful friendship built around our shared passion for discovering the world." },
        ],
        story: [""],
      },
      video: null,
    },
  
    {
      // 2) Yulia — O coincidență frumoasă
      id: "yulia-rusia",
      emoji: "✍️",
      name: {
        ro: "Yulia — O coincidență frumoasă",
        en: "Yulia — A beautiful coincidence",
      },
      tagline: {
        ro: "Luminoasă. Sinceră. De neuitat.",
        en: "Bright. Honest. Unforgettable.",
      },
      
      cover: "/assets/travelers/yulia-rusia/yulia-rusia-cover.webp",
      gallery: [
        "/assets/travelers/yulia-rusia/yulia-rusia-1.webp",
        "/assets/travelers/yulia-rusia/yulia-rusia-2.webp",
        "/assets/travelers/yulia-rusia/yulia-rusia-3.webp",
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
          { q: "1. Cine ești în câteva fraze?", a: "Eu sunt Yulia și sunt din Rusia. Eram o persoană obișnuită – mergeam la birou cinci zile pe săptămână, într-o companie internațională, mă vedeam cu prietenii, petreceri vinerea... viață normală. După despărțirea de soț, am început să călătoresc ca să mă vindec și să trec peste tot ce a fost greu. Nu pot spune că am uitat totul, dar am înțeles ce iubesc cel mai mult: să merg undeva nou, să descopăr locuri, oameni și tradițiile lor." },
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
    
    Așa că acum mă tot gândesc… poate că n-ar trebui să mă întorc acasă, ci să continui să călătoresc?
    
    Și am observat ceva amuzant – când vorbesc cu Mida, scriu foarte mult!
    E o profesoară tare bună.`
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
          { q: "1. Who are you in a few sentences?", a: "I am Yulia and I am from Russia. I used to be an ordinary person – working five days a week in a big international company, meeting friends, Friday parties, all that routine. After I separated from my husband, I started traveling to heal and move through the pain. I can’t say I’ve forgotten everything, but I realized what I truly love most: going somewhere new, discovering places, meeting people, learning their traditions." },
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
    
    So now I’m wondering… maybe I shouldn’t go home after all, but keep traveling?
    Also, I noticed something funny – when I talk to Mida, I write a lot!
    She’s a really good teacher.`
        ],
      },
    
      video: null,
    },
      
    // ────────────────────────────────────────────────────────────
    // 3) Hamza — O întâlnire care lasă urme
    // ────────────────────────────────────────────────────────────
    {
      id: "hamza-maroc",
      emoji: "🌙",
      name: {
        ro: "Hamza — O întâlnire care lasă urme",
        en: "Hamza — A meeting that leaves traces",
      },
      tagline: {
        ro: "Aventuros. Prietenos. Sincer.",
        en: "Adventurous. Friendly. Honest.",
      },
      
      cover: "/assets/travelers/hamza-maroc/hamza-maroc-cover.webp",
      gallery: [
        "/assets/travelers/hamza-maroc/hamza-maroc-1.webp",
        "/assets/travelers/hamza-maroc/hamza-maroc-2.webp",
        "/assets/travelers/hamza-maroc/hamza-maroc-3.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/lahlou_.hamza?igsh=cTVnYnJxYWh1cGw0",
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
        
Un om de milioane!

Câteva luni mai târziu, mi-a scris că urmează examenul de rezidențiat și mi-a trimis o poză cu prima pagină a lucrării lui – acolo unde avea o dedicație pentru cei mai importanți oameni care i-au marcat existența (să nu uităm, are doar 26 de ani!). Printre acele 9 sau 10 nume era și Mida.
        
Mi-a spus că am fost una dintre persoanele care, în doar câteva ore și câteva cuvinte, au reușit să miște ceva profund în interiorul lui. Să-i schimbe puțin felul de a vedea viața.
Așa că azi, aici, îi mulțumesc pentru că a ales să-mi împărtășească un moment atât de personal și frumos.

Extra-story: 
Când ne întorceam din Ifrane, am decis spontan să oprim la un loc luxos – renumitul Michlifen Resort & Golf, ca doi turiști cu mulți bani. La poartă, Hamza le-a spus portarilor că mergem să luăm masa acolo.
Desigur, nu am mâncat. Dar am vizitat celebra locație, am făcut poze și ne-am bucurat de aerul acela elegant, de vacanță de vis.
Pe treptele care duceau spre grădină, ne-am întâlnit și cu un mic șarpe – un moment de neuitat, amuzant și puțin… exotic.
Unul dintre acele momente care rămân în poveste, nu pentru că au fost perfecte, ci pentru că au fost vii.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Sunt Hamza, medic de 26 de ani din Fes, Maroc. Am o perspectivă deschisă asupra lumii și o curiozitate profundă față de oameni și culturi diferite. Îmi place să explorez experiențe globale și să învăț din modul unic în care fiecare persoană înțelege lumea. Consider că ființa umană este remarcabil de complexă și cred că spiritul uman nu poate fi definit printr-un set limitat de cuvinte." },
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
So today, here, I thank him for sharing such a personal and beautiful moment with me.

Extra-story: 
On our way back from Ifrane, we decided, quite spontaneously, to stop at a fancy place – the famous Michlifen Resort & Golf – like two rich tourists on vacation.
At the gate, Hamza told the guards we were going there for lunch.
Of course, we didn’t eat. But we did visit the beautiful location, took photos, and soaked in that dreamy, luxurious atmosphere.
On the steps leading to the garden, we even met a little snake – an unforgettable, funny, and slightly exotic moment.
One of those memories that stay with you not because they were perfect, but because they were alive.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I am Hamza, a 26-year-old physician from Fes, Morocco. I have an open-minded outlook and a deep curiosity toward diverse people and cultures. I’m eager to explore global experiences and to learn from the unique ways each person understands the world. I find human beings remarkably complex, and I believe the human spirit cannot be defined by a limited set of descriptors." },
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
    // 4) Rachid — Un gest mic, o amintire mare
    // ────────────────────────────────────────────────────────────
    {
      id: "rachid-maroc",
      emoji: "🕌",
   
      name: {
        ro: "Rachid — Un gest mic, o amintire mare",
        en: "Rachid — A small gesture, a lasting memory",
      },
      tagline: {
        ro: "Curajos. Deschis. Recunoscător.",
        en: "Brave. Open. Grateful.",
      },
    
      cover: "/assets/travelers/rachid-maroc/cover.webp",
      gallery: [
        "/assets/travelers/rachid-maroc/1.webp",
        "/assets/travelers/rachid-maroc/2.webp",
        "/assets/travelers/rachid-maroc/3.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/el_richaud/",
        facebook: "https://www.facebook.com/rachid.elkourraa?rdid=UzvaMol7eBZY1Y2z&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CSevS13vF%2F#",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `L-am cunoscut pe Rachid datorită lui Kamal. Era ziua lui, iar invitația de a participa la petrecere a venit la momentul potrivit.
Erau ultimele mele trei zile în Maroc, așa că am zis „da”. Ce nu știam atunci era că, prin acea invitație, Kamal avea să-mi scoată în cale un om cu totul necunoscut – dar de neuitat.
        
Totul s-a întâmplat prin Couchsurfing. Inițial urma să stau două zile, apoi să-mi caut cazare pentru a treia, până la zborul spre Catania.
Dar Rachid mi-a spus cu un zâmbet că pot rămâne la el până plec – și s-a asigurat că am tot ce-mi trebuie.
Inclusiv mi-a dus rochia la călcat. 
Era o rochie lungă, colorată, pe care plănuiam s-o port la ziua lui Kamal – dar era complet șifonată, după atâtea zile de rucsac.
Gestul acela simplu m-a impresionat enorm.
        
Am ieșit împreună în club, am râs mult și mi-a povestit câteva secrete bine păzite ale Marocului.
Un om deosebit, generos, cald, care cu siguranță va rămâne în sufletul meu pentru mult timp.
        
Ah, da – și în ultima zi, când am plecat, am uitat să încui ușa. 
Dar, cum se închidea automat, Rachid n-a avut de ce să-și facă griji. Totul a rămas în ordine – așa cum trebuie să rămână amintirile frumoase: simple și liniștite.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Eu sunt Rachid și locuiesc în Casablanca, Maroc. Sunt un suflet curios, cu o dragoste profundă pentru descoperirea oamenilor, a locurilor și a perspectivelor. Sunt condus de frumusețea necunoscutului și de bucuria simplă a conexiunii. Rucsacul meu e ușor, dar inima e mereu plină de povești." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Nu a fost un moment anume – mai degrabă o voce tăcută care devenea tot mai puternică. Voiam să scap de rutină și să mă simt din nou viu. Într-o zi am realizat că, dacă aștept momentul „perfect”, e posibil ca el să nu vină niciodată. Așa că mi-am făcut bagajul și am plecat." },
          { q: "3. Când ai știut că merită?", a: "Mi-am dat seama într-o dimineață, privind răsăritul după o noapte lungă petrecută în autobuz. Toată lumea dormea, iar eu stăteam acolo – obosit, dar complet împăcat. A fost momentul în care am știut că am făcut alegerea potrivită." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Thailanda. Energia acelei țări mi-a deschis ochii către un alt ritm al vieții – calm, spiritual și profund uman. De la bunătatea oamenilor până la simplitatea momentelor de zi cu zi, Thailanda m-a învățat că fericirea nu înseamnă să ai mai mult, ci să trăiești cu recunoștință și prezență." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "M-a învățat să am încredere în fluxul vieții. Obișnuiam să planific totul, acum îmbrățișez incertitudinea. Am descoperit că sunt mai puternic, mai adaptabil și mai deschis la inimă decât am crezut vreodată. Lumea nu mi se mai pare uriașă, ci ca un singur mare acasă." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Într-o zi, în Thailanda, am mers spre Railay Beach fără nicio rezervare, după o problemă cu cardul meu bancar. Când am ajuns, toate hotelurile erau pline, și mi-a fost greu să găsesc un loc unde să dorm. Târziu în noapte, am dat peste un mic hostel care avea o limită de vârstă. Administratorul, impresionat de povestea mea și de atitudinea mea, a decis să facă o excepție și mi-a oferit un pat pentru noapte, păstrându-mi pașaportul ca garanție. Acel mic gest de compasiune mi-a reamintit cât de generoși și umani pot fi oamenii, chiar și atunci când nu te aștepți." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Nu aștepta să fii pregătit – nu vei fi niciodată complet. Frica nu dispare, dar după primul pas se transformă în entuziasm. Viața îi răsplătește pe cei curajoși, nu pe cei perfecți." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Facebook: Rachid Casablanca; Instagram: @el_richaud" },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Am întâlnit-o pe Mida în timpul călătoriei ei în Casablanca, când am avut plăcerea de a o găzdui. Atunci am descoperit omul minunat care este – cald, sincer și plin de lumină. A fost o perioadă memorabilă, plină de momente frumoase și amintiri de neuitat." },
        ],
        story: [],
      },
      en: {
        intro: `I met Rachid thanks to Kamal. It was his birthday, and the invitation to join the party came at just the right time.
It was my last three days in Morocco, so I said “yes.”
What I didn’t know then was that Kamal’s invitation would bring into my life a stranger – who would soon become unforgettable.
        
It all happened through Couchsurfing.
I was supposed to stay for two days and then find another place for my last night before flying to Catania.
But Rachid smiled and told me I could stay at his place until my flight – and he made sure I had everything I needed.
He even took my dress to be ironed. 
It was a long, colorful dress I wanted to wear to Kamal’s birthday, completely wrinkled after spending days in my backpack.
That simple gesture really touched me.
        
We went out to a club together, laughed a lot, and he shared a few of Morocco’s best-kept secrets with me.
A wonderful, kind-hearted person who will surely stay in my heart for a long time.
        
Oh, and on my last day, I left the house without locking the door.
But since it closed automatically, Rachid didn’t have to worry – everything was in perfect order, just like the best memories: simple and peaceful.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I am Rachid and I live in Casablanca, Morocco. I’m a curious soul with a deep love for discovering people, places, and perspectives. I’m driven by the beauty of the unknown and by the simple joy of connection. My backpack is light, but my heart is always full of stories." },
          { q: "2. What made you start traveling?", a: "It wasn’t one moment – more like a quiet voice that kept getting louder. I wanted to break free from routine and feel alive again. One day I realized that waiting for the “perfect time” might mean it would never come. So I packed my bag and left." },
          { q: "3. When did you know it was worth it?", a: "It hit me one morning, watching the sunrise after a long night bus ride. Everyone was still asleep, and I was standing there – tired, but completely at peace. That was the moment I knew I’d made the right choice." },
          { q: "4. A place that changed the way you see the world?", a: "Thailand. The energy of that country opened my eyes to a new rhythm of life – calm, spiritual, and deeply human. From the kindness of the people to the simplicity of everyday moments, Thailand taught me that happiness isn’t about having more, but about living with gratitude and presence." },
          { q: "5. How did traveling change you as a person?", a: "It taught me to trust the flow of life. I used to plan everything – now I embrace uncertainty. I discovered that I’m stronger, more adaptable, and more open-hearted than I ever imagined. The world feels less like a big place, and more like one big home." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "One day in Thailand, I went to Railay Beach without any hotel reservation after an incident with my bank card. When I arrived, I found that every hotel was fully booked, and I struggled to find a place to stay. Late at night, I came across a small hostel that had an age policy. The manager, touched by my story and my kindness, decided to make an exception and offered me a bed for the night, keeping my passport for security reasons. That small act of compassion reminded me how generous and human people can be, even when you least expect it." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Don’t wait to be ready – you never really will be. The fear doesn’t disappear, but once you take the first step, it turns into excitement. Life rewards courage, not perfection." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "Facebook: Rachid Casablanca, and Instagram: @el_richaud" },
          { q: "9. Bonus: How did we meet?", a: "I met Mida during her trip to Casablanca, when I had the pleasure of hosting her at my place. That’s when I discovered the wonderful person she is – warm, genuine, and full of light. It was a memorable time, filled with beautiful moments and unforgettable memories." },
        ],
        story: [],
      },
      video: null,
    },
  ];

/* TEMPLATE — nou călător (bilingv). Lasă blocul comentat.

{
  id: "exemplu-id",
  emoji: "🌍",
  name: { ro: "Numele (RO)", en: "Name (EN)" },
  tagline: { ro: "Tagline (RO)", en: "Tagline (EN)" },

  cover: "/assets/travelers/exemplu-id/cover.webp",
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
    intro: `Povestea în română...`,
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
    story: ["Gând final / poveste comună (RO)"],
  },

  en: {
    intro: `English intro...`,
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
    story: ["Final thought / shared story (EN)"],
  },

  video: null // sau "https://www.youtube.com/embed/..."
},

*/

  export default travelers;
  