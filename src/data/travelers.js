// src/data/travelers.js
//
// IMAGINI:
// public/assets/travelers/<id>/cover.webp
// public/assets/travelers/<id>/1.webp
// public/assets/travelers/<id>/2.webp
// public/assets/travelers/<id>/3.webp

const travelers = [
    // ────────────────────────────────────────────────────────────
    // 1) Adi — Cel care mi-a dat curajul să plec
    // ────────────────────────────────────────────────────────────
    {
      id: "adi-satumare",
      emoji: "🏝️",
   
      name: {
        ro: "Adi – Cel care mi-a dat curajul să plec",
        en: "Adi – The one who gave me the courage to leave",
      },
      tagline: {
        ro: "Curios. Aventuros. Adaptabil.",
        en: "Curious. Adventurous. Adaptable.",
      },
      cover: "/assets/travelers/adi-satumare/adicover1.webp",
      gallery: [
        "/assets/travelers/adi-satumare/1.webp",
        "/assets/travelers/adi-satumare/2.webp",
        "/assets/travelers/adi-satumare/adicover.webp",
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
        intro: `Pe Adi l-am cunoscut acum mulți ani, când mergeam la dansuri. Nu aveam atunci nici cea mai mică idee despre rolul pe care urma să-l joace în povestea mea.

Câteva luni mai târziu cochetam cu ideea de a pleca în Bali, iar într-o seară am văzut o postare de-a lui – era chiar acolo, în locul la care visam. Nu vorbisem niciodată cu el, dar i-am scris simplu:
        
— Cum e în Bali?
        
De acolo a început totul. Am început să vorbim, să-i pun o mie de întrebări despre cum e să călătorești singur, despre siguranță, curaj și începuturi. Atunci mi-a spus ceva ce nu am uitat niciodată:
        
— Nu-ți face griji. O să-ți fiu alături cu tot ce pot.
        
Și așa a fost.
        
Două luni mai târziu am plecat – nu spre Bali, ci spre Palawan, în Filipine. Iar câteva luni după aceea drumul m-a dus, inevitabil, și în Bali. Adi mi-a trimis fișiere, trasee, contacte și mici secrete de călătorie. Oriunde mergeam, el era la celălalt capăt al telefonului, gata să mă ajute, de la mii de kilometri distanță.
        
Ani mai târziu, când nu mai aveam nevoie de un ghid prin lume, Adi a rămas sprijinul meu „tehnic” – omul care repara de la distanță orice problemă aveam cu laptopul. Ne-am revăzut abia după doi ani și jumătate, la lansarea cărților mele.
        
Și totul pornise de la un singur mesaj:
        
— Hey, crezi că e safe să plec singură în Asia?
        
Și da, a fost mai safe decât mi-aș fi imaginat vreodată – pentru că, uneori, oamenii potriviți apar exact atunci când ai nevoie de ei.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Sunt Adrian, am 33 de ani și sunt din România. Deși lucrez în IT, sufletul meu aparține aventurii și descoperirii. Sunt un visător care crede că fiecare loc, fiecare om și fiecare moment are o poveste de spus. Dansul latino este felul meu de a simți viața, iar călătoriile – modul în care o trăiesc cu adevărat. Până acum am explorat 34 de țări de pe 4 continente, mereu cu aparatul foto în rucsac și cu o curiozitate care nu se oprește niciodată. Îmi place să citesc, să ascult muzică, să merg la sală și să mă pierd în locuri noi, din care să învăț câte ceva despre lume – și despre mine." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Totul a pornit dintr-un vis din copilărie – dorința aceea pură de a descoperi lumea, de a vedea cum trăiesc alți oameni, ce gust are mâncarea lor, cum sună limba lor și ce tradiții îi definesc. Nu a fost un moment anume, ci mai degrabă o chemare care a crescut în mine în timp. Într-o zi mi-am dat seama că, dacă nu plec atunci, voi rămâne mereu cu întrebarea: „Cum ar fi fost dacă?”. Așa că mi-am luat rucsacul, aparatul foto și curajul – și am început să transform visul de copil într-un mod de viață." },
          { q: "3. Când ai știut că merită?", a: "Am știut că merită din primele momente în care am simțit acea bucurie pură a drumului – senzația aceea de „trăiesc cu adevărat”. Fiecare loc nou îmi aducea un entuziasm greu de pus în cuvinte, dar au fost câteva momente care mi s-au întipărit adânc: prima dată când am pășit pe străzile din New York, când am văzut luminile din Las Vegas sau când am admirat Parisul noaptea. Atunci am înțeles că visul meu din copilărie devenise realitate – eram acolo, în locuri pe care le văzusem doar în filme, trăind emoții pe care altădată doar le visam." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Nu pot spune că un singur loc m-a schimbat complet. Mai degrabă simt că fiecare loc pe care l-am vizitat a adăugat ceva la mine, ca o piesă într-un puzzle. Fiecare experiență, fiecare cultură, fiecare om întâlnit m-a completat puțin câte puțin. Pentru mine, călătoriile nu au fost despre o transformare bruscă, ci despre construcție – despre a mă descoperi pas cu pas prin tot ceea ce trăiesc și învăț de la lume." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Călătoriile m-au învățat recunoștința. Cu fiecare țară vizitată am început să văd mai clar cât de multe lucruri avem și cât de puțin le apreciem uneori. Mi-am dat seama că, deși în România ne plângem des de neajunsuri, adevărul este că trăim într-un loc cu foarte multe lucruri frumoase – oameni, natură, libertate. În alte părți ale lumii am văzut cât de greu le este unora și cât de mult și-ar dori să aibă ceea ce noi considerăm „normal”. Călătoria m-a făcut mai recunoscător, mai conștient și mai prezent." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Cele mai grele momente sunt mereu ultimele zile dintr-o călătorie – clipa în care trebuie să plec și să las totul în urmă. În rest, chiar și situațiile dificile m-au ajutat să cresc. Am învățat să rămân calm, indiferent cât de stresantă pare o situație, și să mă adaptez rapid. De fiecare dată când ceva nu ieșea cum planificasem, mă întrebam: „O să mai conteze asta peste cinci ani?” Dacă răspunsul era „nu”, respiram adânc, zâmbeam și mergeam mai departe." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Sfatul meu e simplu: nu ezita. Niciodată nu va exista momentul „perfect” să pleci, iar fiecare zi în care amâni e o zi pierdută dintr-o poveste care ar putea fi a ta. Îmi place mult un citat de Mark Twain: „Peste douăzeci de ani vei fi mai dezamăgit de lucrurile pe care nu le-ai făcut decât de cele pe care le-ai făcut. Așa că ridică ancora, părăsește portul sigur, prinde vântul în pânze. Explorează. Visează. Descoperă.” Exact asta le-aș spune celor care stau pe gânduri: pornește acum, pentru că lumea nu te așteaptă." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Instagram: @adrianstefanilles, Facebook: Adrian Stefan Illes. Acolo împărtășesc momente din călătoriile mele, povești, experiențe și mici fragmente din felul în care văd lumea." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Ne-am întâlnit prima oară acum 5–6 ani, la o petrecere de latino în Baia Mare. Ne-am văzut pe ringul de dans, am schimbat câteva vorbe spontan și apoi contactele pe Facebook. La început am rămas doar cunoscuți, iar tu îmi urmăreai din când în când aventurile și călătoriile. Cu timpul, discuțiile noastre despre lume și călătorii au devenit tot mai dese. Am început să împărtășim povești, impresii și recomandări, iar conexiunea noastră s-a transformat firesc dintr-o simplă cunoaștere într-o prietenie frumoasă – construită în jurul pasiunii pentru descoperirea lumii." },
        ],
        story: [
          "",
        ],
      },
      en: {
        intro: `I first met Adi years ago, back when we were both taking dance classes. Back then, I had no idea what role he would one day play in my story.

A few months later, I was toying with the idea of going to Bali, when I stumbled upon one of his posts – he was there. We had never really talked before, but I wrote to him on Facebook:
        
— Hey, how’s Bali?
        
That’s how it all began. We started chatting, and I asked him countless questions about travelling solo – safety, courage, what it truly feels like. He told me something I’ll never forget:
        
— Don’t worry. I’ll be there to help you with anything I can.
        
And he was.
        
Two months later, I left – not to Bali, but to Palawan in the Philippines. A few months after that, I finally made it to Bali. Adi sent me everything he knew: files, routes, secret spots, and local tips. Wherever I was, he was there too – from afar – helping, guiding, encouraging.
        
Years later, when I no longer needed a travel guide, he still helped me – this time with my laptop, which kept breaking down. From a distance, he fixed every issue. We finally saw each other again after two and a half years, at the launch of my books.
        
And to think it all started with one message:
        
— Hey, do you think it’s safe for me to travel alone in Asia?
        
Turns out, it was safer – and more beautiful – than I ever imagined. Because sometimes, the right people show up exactly when you need them most.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I’m Adrian, 33 years old, from Romania. Although I work in IT, my heart belongs to adventure and discovery. I’m a dreamer who believes that every place, every person, and every moment has a story to tell. Latin dance is how I feel life; traveling is how I truly live it. So far, I’ve explored 34 countries across 4 continents, always with my camera in my backpack and a curiosity that never stops growing. I love reading, listening to music, working out, and getting lost in new places where I can learn something about the world – and about myself." },
          { q: "2. What made you start traveling?", a: "It all started with a childhood dream – that pure desire to discover the world, to see how other people live, what their food tastes like, how their language sounds, and what traditions shape them. It wasn’t a single moment, but rather a calling that grew inside me over time. One day I realized that if I didn’t leave then, I would always live with the question: “What if?”. So I packed my backpack, my camera, and my courage – and began turning that childhood dream into a way of life." },
          { q: "3. When did you know it was worth it?", a: "I knew it was worth it from the very first moments when I felt that pure joy of being on the road – that feeling of truly being alive. Every new place brought a thrill that’s hard to describe, but a few moments stayed with me: the first time I walked through the streets of New York, saw the lights of Las Vegas, or admired Paris at night. That’s when I realized my childhood dream had become real – I was there, in places I had only seen in movies, living emotions I had once only imagined." },
          { q: "4. A place that changed the way you see the world?", a: "I can’t say that one specific place completely changed me. I feel like every destination I’ve visited has added something to me – like a piece of a puzzle. Each experience, each culture, each person I’ve met has completed me little by little. For me, traveling was never about sudden transformation, but about growth – discovering myself step by step through everything I experience and learn from the world." },
          { q: "5. How did traveling change you as a person?", a: "Travel has taught me gratitude. With every country I’ve visited, I’ve seen more clearly how much we have – and how little we sometimes appreciate it. I realized that although in Romania we often complain about what’s missing, the truth is that we live in a place full of beauty – in its people, its nature, and its freedom. In other parts of the world, I’ve seen how hard life can be, and how much some people wish for what we take for granted. Traveling made me more grateful, more aware, and more present." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "The hardest moments for me are always the last days of a journey – that moment when you have to leave and say goodbye. Everything else, even the difficult parts, has helped me grow. I’ve learned to stay calm no matter how stressful things seem, and to adapt quickly. Whenever something didn’t go as planned, I would ask myself, “Will this matter in five years?” If the answer was “no,” I took a deep breath, smiled, and moved on." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "My advice is simple: don’t hesitate. There will never be a “perfect” time to leave, and every day you wait is a day lost from a story that could be yours. I love a quote by Mark Twain: “Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.” And that’s exactly what I’d tell anyone who’s hesitating: start now, because the world won’t wait." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "Instagram: @adrianstefanilles, Facebook: Adrian Stefan Illes. That’s where I share travel moments, stories, experiences, and glimpses into how I see the world." },
          { q: "9. Bonus: How did we meet?", a: "We first met about 5–6 years ago at a Latin dance party in Baia Mare. We crossed paths on the dance floor, had a spontaneous chat, and exchanged Facebook contacts. At first, we were just acquaintances, and you’d occasionally follow my travels and adventures. Over time, our conversations about the world and traveling became more frequent. We started sharing stories, impressions, and recommendations, and our connection naturally grew from a simple acquaintance into a beautiful friendship built around our shared passion for discovering the world." },
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
        intro: `Am cunoscut-o pe Yulia întâmplător. 
Eram pe Coasta Amalfi, în Italia – aveam să aflu mai târziu că Italia este locul ei preferat din lume. Nu plănuiam să stau mult prin zonă, așa că, într-un impuls, am decis să merg într-un loc mai liniștit, mai puțin călcat de turiști: Ravello.
A fost o decizie de o secundă. Dacă nu o luam, nu aș fi întâlnit-o niciodată pe Yulia.
    
Era cu cineva, dar povestea lor era… să spunem, puțin ciudată. Mi-a cerut un sfat, i l-am oferit, și am rămas de vorbă aproape o oră. Ne-am plimbat puțin prin Ravello, iar la întoarcere ei au coborât la o altă stație. Am crezut că nu o voi mai revedea vreodată.
    
Dar Universul a avut alte planuri. 

Ne-am reîntâlnit, complet neașteptat, în Florența.
Am petrecut o dimineață împreună – am vizitat Basilica din centru și am mâncat croissante cu fistic pe un trotuar, așteptând să se deschidă porțile. Apoi ea a plecat, la amiază.
    
Din când în când, încă ne mai scriem. Iar zilele trecute mi-a trimis un mesaj care m-a făcut să zâmbesc:
    
— Mida, am început în sfârșit cartea ta! Este fantastică – atât de simplă și atât de interesantă. Știi, m-am întors din Vietnam acum două luni și sunt atâtea coincidențe cu propriile mele călătorii. Parcă ai fi scris despre mine!

Nu m-am gândit niciodată la Yulia ca la un „călător” – dar mesajul ei mi-a spus clar: este.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Eu sunt Yulia și sunt din Rusia. Eram o persoană obișnuită – mergeam la birou cinci zile pe săptămână, lucram într-o companie internațională, mă vedeam cu prietenii, petreceri vinerea… o viață normală. După despărțirea de soț, am început să călătoresc ca să mă vindec și să trec peste ce a fost greu. Nu pot spune că am uitat totul, dar am înțeles ce iubesc cel mai mult: să merg în locuri noi, să descopăr oameni, locuri și tradițiile lor." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Nu m-a împins nimeni să plec – am făcut-o eu însămi. Prima dată a fost după o despărțire dureroasă, iar călătoria a devenit modul meu de a mă vindeca și de a-mi aduna bucățile." },
          { q: "3. Când ai știut că merită?", a: "De fiecare dată când mă surprind întrebându-mă ce țară vreau să vizitez în continuare – atunci știu că a meritat." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Italia – pentru frumusețea ei, pur și simplu peste tot." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Călătoriile m-au schimbat complet. Acum singurul lucru la care mă gândesc este să descopăr țări noi, oameni noi, tradiții noi – nu lucruri materiale precum mașini, haine sau bijuterii." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Cel mai greu a fost momentul sancțiunilor – când cardurile rusești au fost blocate peste tot în lume. A fost un stres imens, un adevărat șoc." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Fără ezitare. Alege un loc și du-te." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Am un canal de YouTube." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Eram cu cineva lângă care nu-mi doream, de fapt, să stau. Pe drum, Mida i-a oferit acelui om locul ei, dar eu am ales să stau lângă Mida. Și n-am avut nimic de pierdut – s-a dovedit a fi o prietenă caldă, sinceră și o povestitoare fascinantă." },
        ],
        story: [
          `Un moment în plus, de păstrat:
    
Zilele dinainte să îi scriu Midei erau monotone – nici măcar apusul, pe care îl vedeam zilnic, nu mă mai impresiona. Apoi, într-o zi, eram la sală, am deschis cartea ei și am început să citesc. Totul s-a schimbat pe loc.

I-am scris ei – și unui alt călător pe care îl întâlnisem cândva în Cambodgia.
După ce am vorbit cu Mida, m-am simțit inspirată să merg în Indonezia, după ce termin munca.
          
Același călător mi-a trimis poze din Australia, unde locuiește acum, și chiar m-a invitat într-o excursie prin Sydney. Așa că acum mă tot gândesc… poate nu ar trebui să mă întorc acasă, ci să continui să călătoresc?
          
Și am observat ceva amuzant – când vorbesc cu Mida, scriu enorm! E o profesoară tare bună.`,
        ],
      },
    
      en: {
        intro: 
         `I met Yulia by chance. 
I was on the Amalfi Coast in Italy – and later I found out that Italy is actually her favorite place in the world. I wasn’t planning to stay long in the area, so on a whim I decided to head somewhere quieter, less touristy: Ravello.
It was a split-second decision. If I hadn’t made it, I never would have met Yulia.
         
She was with someone, though their story was… let’s say, a little complicated. She asked me for advice, I gave it, and we ended up talking for almost an hour, wandering through Ravello. On the way back, they got off at a different stop. I thought I’d never see her again.
         
But the universe had other plans.

We ran into each other again, unexpectedly, in Florence.
We spent a morning together – visited the central Basilica and ate pistachio croissants on the sidewalk while waiting for it to open. Then she left around noon.
         
From time to time, we still write to each other.
Just a few days ago, she sent me a message that made me smile:
         
— Mida, I finally started your book! It’s fantastic – so simple and so interesting. You know, I came back from Vietnam two months ago, and there are so many similarities with my own travels. It feels like you wrote about me!
         
I had never really thought of Yulia as a traveler – but her message told me everything I needed to know: she is one.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I’m Yulia, and I’m from Russia. I used to be an ordinary person – working five days a week in a large international company, meeting friends, Friday night parties… the usual routine. After I separated from my husband, I started traveling to heal and move through the pain. I can’t say I’ve forgotten everything, but I realized what I truly love most: going somewhere new, discovering places, meeting people, and learning their traditions." },
          { q: "2. What made you start traveling?", a: "It wasn’t someone else who pushed me – it was me. The first time, it happened after a painful breakup, and traveling became my way of healing and putting myself back together." },
          { q: "3. When did you know it was worth it?", a: "Every time I catch myself wondering which country I want to visit next – that’s when I know it was worth it." },
          { q: "4. A place that changed the way you see the world?", a: "Italy – for its beauty, absolutely everywhere." },
          { q: "5. How did traveling change you as a person?", a: "Traveling changed me completely. Now the only thing I think about is discovering new countries, meeting new people, and learning new traditions – not material things like cars, clothes, or jewelry." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "The hardest moment was when the sanctions came – when Russian bank cards were blocked worldwide. It was incredibly stressful, a real shock." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Don’t hesitate. Just choose a place – and go." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "I have a YouTube channel." },
          { q: "9. Bonus: How did we meet?", a: "I was with someone I didn’t really want to be near. On the way, Mida offered her seat to that person, but I chose to sit next to her instead. And I didn’t lose anything – she turned out to be a warm, sincere friend, and a fascinating storyteller." },
        ],
        story: [
          `A little extra moment worth remembering:

The days before I wrote to Mida felt dull – even the sunset, which I saw every day, no longer moved me. Then one day, at the gym, I opened her book and started reading. Everything changed instantly.

I wrote to her – and to another traveler I once met in Cambodia.
After talking to Mida, I felt inspired to go to Indonesia once I finish my job.
          
That same traveler sent me photos from Australia, where he lives now, and even invited me on a trip around Sydney. So now I’m wondering… maybe I shouldn’t go home at all, but keep traveling?
          
And I noticed something funny – whenever I talk to Mida, I end up writing a lot! She’s a really good teacher.`,
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
        "/assets/travelers/hamza-maroc/hamza11.webp",
        "/assets/travelers/hamza-maroc/hamza12.webp",
        "/assets/travelers/hamza-maroc/hamza14.webp",
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
Eram acolo de două zile, pierdută printre străduțele labirintice ale Medinei, când, răsfoind profiluri, mi-a atras atenția pagina lui.
        
Avea o scurtă poveste despre oamenii pe care i-a întâlnit în călătorii și despre țările vizitate. Nicio urmă de „România”. Asta m-a intrigat.
        
I-am scris:
        
— Hey, vrei să ai și o româncă în lista ta? Am văzut că îți lipsește.
        
Probabil a zâmbit. Dar a doua zi, spre surprinderea mea, a venit după mine cu mașina și m-a dus să vizitez un mic orășel din apropiere – Ifrane, renumitul „oraș austriac al Marocului”.
        
A fost o după-amiază superbă, plină de povești, râsete și de acea liniște de drum care, între doi necunoscuți, devine atât de firească.
        
Un om de milioane.
        
Câteva luni mai târziu, mi-a scris că urmează examenul de rezidențiat și mi-a trimis o poză cu prima pagină a lucrării lui – acolo unde avea o dedicație pentru cei mai importanți oameni care i-au marcat viața (să nu uităm, are doar 26 de ani!). Printre acele 9–10 nume era și Mida.
        
Mi-a spus că am fost una dintre persoanele care, în doar câteva ore și câteva cuvinte, au reușit să miște ceva profund în interiorul lui. Să-i schimbe puțin felul de a vedea viața.
        
Așa că azi, aici, îi mulțumesc pentru că a ales să-mi împărtășească un moment atât de personal și frumos.
        
Extra-story:
Când ne întorceam din Ifrane, am decis spontan să oprim la un loc luxos – renumitul Michlifen Resort & Golf – ca doi turiști cu mulți bani. La poartă, Hamza le-a spus portarilor că mergem să luăm masa acolo.
        
Desigur, nu am mâncat. Dar am vizitat celebra locație, am făcut poze și ne-am bucurat de aerul acela elegant, de vacanță de vis.
        
Pe treptele care duceau spre grădină, ne-am întâlnit și cu un mic șarpe – un moment de neuitat, amuzant și puțin… exotic.
Unul dintre acele momente care rămân în poveste, nu pentru că au fost perfecte, ci pentru că au fost vii.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Sunt Hamza, medic de 26 de ani din Fes, Maroc. Am o perspectivă deschisă asupra lumii și o curiozitate profundă față de oameni și culturi diferite. Îmi place să explorez experiențe din toată lumea și să învăț din felul unic în care fiecare persoană o înțelege. Cred că ființa umană este remarcabil de complexă și că spiritul uman nu poate fi redus la câteva cuvinte." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Motivația mea de a explora lumea vine din dorința de a înțelege perspectivele diferite – mai ales felul în care gândirea variază de la un om la altul și de la o cultură la alta." },
          { q: "3. Când ai știut că merită?", a: "Momentele în care am întâlnit și am înțeles punctele de vedere diferite ale oamenilor asupra lumii au fost cu adevărat uimitoare și pline de inspirație." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Fiecare loc mi-a lăsat o amprentă unică, dar dacă ar fi să aleg o țară, aș spune Turcia. Asta pentru că am explorat-o în profunzime, nu doar câteva orașe. Fiecare loc mi-a dat ocazia să mă cufund în atmosfera lui, iar acolo am întâlnit oameni din toate colțurile lumii – europeni, americani, asiatici, africani. A fost o experiență profund pozitivă și îmbogățitoare." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Înainte să călătoresc, eram mult mai retras și timid. Mi-era teamă să mă exprim, de frica de a nu fi judecat sau ridiculizat. Călătoriile m-au transformat într-o persoană mai deschisă, comunicativă și liberă. Acum pot să vorbesc și să-mi împărtășesc ideile fără teamă." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Provocările neprevăzute apar mereu – dificultăți financiare, întâlniri mai puțin plăcute – dar fiecare experiență te face mai puternic și mai echilibrat." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Îmbrățișează viitorul. Fă primul pas. Îți va schimba viața în profunzime." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Pagina mea de Instagram este @Lahlou_.hamza." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Ne-am întâlnit prin Couchsurfing, în timpul vizitei ei în Fes. Ziua petrecută împreună a fost specială încă de la început. Mida are o poveste de viață impresionantă și o energie caldă, senină. Călătoriile ei, din România până în Vietnam, nu sunt doar despre locuri, ci despre sens – despre felul în care fiecare drum poate deveni o lecție. Cartea ei mi s-a părut profund inspirațională, iar felul în care vorbește despre oameni și experiențe te face să privești lumea altfel." },
        ],
        story: [],
      },
      en: {
        intro: `I met Hamza through Couchsurfing, during a trip to Fes, Morocco.
I’d been there for two days, wandering through the labyrinthine streets of the Medina, when something on his profile caught my eye.
        
He had this short story about the people he’d met on his travels and the countries he’d visited – but there was no mention of Romania. That intrigued me.
        
So I wrote to him:
        
— Hey, would you like to have a Romanian on your list? I noticed you’re missing one.
        
He probably smiled. But the next day, to my surprise, he showed up by car and took me to visit a small town nearby – Ifrane, known as “the Austrian town of Morocco.”
        
It turned into a beautiful afternoon, full of stories, laughter, and that easy silence you sometimes find only on the road between two strangers who somehow feel like old friends.
        
He’s a truly remarkable person.
        
A few months later, he wrote to tell me he was preparing for his residency exam and sent me a photo of the first page of his thesis – the one with a dedication to the most important people who had shaped his life (and mind you, he’s only 26!). Among those nine or ten names was Mida.
        
He told me that in just a few hours, with just a few words, I had managed to stir something deep within him – to shift, even just a little, the way he saw life.
So today, here, I want to thank him for choosing to share such a personal and beautiful moment with me.
        
Extra story
On our way back from Ifrane, we decided, quite spontaneously, to stop at a fancy place – the famous Michlifen Resort & Golf – like two very wealthy tourists on holiday.
At the gate, Hamza told the guards we were going there for lunch.
        
Of course, we didn’t eat there. But we did walk around the place, took photos, and soaked in that dreamy, luxurious atmosphere.
        
On the steps leading down to the garden, we even came across a small snake – an unforgettable moment: funny, and just a little… exotic.
One of those memories that stay with you not because they were perfect, but because they were so alive.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I’m Hamza, a 26-year-old doctor from Fes, Morocco. I’m open-minded and deeply curious about people and different cultures. I love exploring the world and learning from the unique ways each person makes sense of it. I believe human beings are remarkably complex, and that the human spirit can’t be reduced to just a handful of words." },
          { q: "2. What made you start traveling?", a: "My motivation to explore the world comes from one simple thing: curiosity. I want to understand different perspectives – especially the ways of thinking that change from one person to another and from one culture to the next." },
          { q: "3. When did you know it was worth it?", a: "The moments when I’ve truly come to understand people’s different ways of seeing the world have been nothing short of astonishing – and deeply inspiring every single time." },
          { q: "4. A place that changed the way you see the world?", a: "very place I’ve visited has left its own unique mark on me, but if I had to choose one country, it would be Turkey. I was able to explore it in depth, not just pass through a few cities. Each place gave me the chance to really sink into its atmosphere, and there I met people from all over the world – Europeans, Americans, Asians and Africans. It was a deeply positive and enriching experience." },
          { q: "5. How did traveling change you as a person?", a: "Before I started traveling, I was much more reserved and shy, afraid to speak up for fear of being judged or laughed at. Traveling has made me more open, communicative and free. Now I can share my thoughts and ideas without that fear holding me back." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "Unexpected challenges always come up – financial struggles, uncomfortable encounters – but each experience helps you grow, making you stronger and more balanced." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Embrace the future. Take the first step. It will change your life forever." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "My Instagram is @Lahlou_.hamza." },
          { q: "9. Bonus: How did we meet?", a: "We met through Couchsurfing during her visit to Fes, and the day we spent together felt special from the very beginning. Mida has an inspiring life story and a warm, calm energy. Her travels – from Romania to Vietnam – aren’t just about places, but about meaning: about the way every journey can become a lesson. I found her book deeply inspiring, and the way she talks about people and experiences makes you see the world in a different light." },
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
Erau ultimele mele trei zile în Maroc, așa că am zis „da”. Ce nu știam atunci era că, prin acea invitație, Kamal avea să-mi scoată în cale un om complet necunoscut – dar de neuitat.
        
Totul s-a întâmplat prin Couchsurfing. Inițial urma să stau două zile și apoi să-mi caut cazare pentru a treia, până la zborul spre Catania.
Dar Rachid mi-a spus, zâmbind, că pot rămâne la el până plec – și s-a asigurat că am tot ce-mi trebuie.
Inclusiv mi-a dus rochia la călcat.
        
Era o rochie lungă, colorată, pe care plănuiam s-o port la ziua lui Kamal – complet șifonată după atâtea zile de rucsac.
Gestul acela simplu m-a impresionat enorm.
        
Am ieșit împreună în club, am râs mult și mi-a povestit câteva secrete bine păzite ale Marocului.
Un om deosebit, generos, cald, care cu siguranță va rămâne în sufletul meu mult timp.
        
Ah, da – și în ultima zi, când am plecat, am uitat să încui ușa.
Dar, cum se închidea automat, Rachid n-a avut de ce să-și facă griji. Totul a rămas în ordine – așa cum ar trebui să rămână amintirile frumoase: simple și liniștite.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Sunt Rachid și locuiesc în Casablanca, Maroc. Sunt un suflet curios, cu o dragoste profundă pentru descoperirea oamenilor, a locurilor și a perspectivelor noi. Mă las condus de frumusețea necunoscutului și de bucuria simplă a conexiunii. Rucsacul meu e ușor, dar inima e mereu plină de povești." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Nu a fost un moment anume, ci mai degrabă o voce tăcută care devenea tot mai puternică. Voiam să scap de rutină și să mă simt din nou viu. Într-o zi am realizat că, dacă aștept momentul „perfect”, s-ar putea să nu vină niciodată. Așa că mi-am făcut bagajul și am plecat." },
          { q: "3. Când ai știut că merită?", a: "Mi-am dat seama într-o dimineață, privind răsăritul după o noapte lungă petrecută în autobuz. Toată lumea dormea, iar eu stăteam acolo – obosit, dar complet împăcat. A fost momentul în care am știut că am făcut alegerea potrivită." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Thailanda. Energia acelei țări mi-a deschis ochii către un alt ritm al vieții – calm, spiritual și profund uman. De la bunătatea oamenilor până la simplitatea momentelor de zi cu zi, Thailanda m-a învățat că fericirea nu înseamnă să ai mai mult, ci să trăiești cu recunoștință și prezență." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "M-a învățat să am încredere în fluxul vieții. Obișnuiam să planific totul, iar acum îmbrățișez incertitudinea. Am descoperit că sunt mai puternic, mai adaptabil și mai deschis la inimă decât am crezut vreodată. Lumea nu mi se mai pare uriașă, ci ca un singur mare „acasă”." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Într-o zi, în Thailanda, am mers spre Railay Beach fără nicio rezervare, după o problemă cu cardul meu bancar. Când am ajuns, toate hotelurile erau pline și mi-a fost greu să găsesc un loc unde să dorm. Târziu în noapte, am dat peste un mic hostel care avea o limită de vârstă. Administratorul, impresionat de povestea mea și de atitudinea mea, a decis să facă o excepție și mi-a oferit un pat pentru noapte, păstrându-mi pașaportul ca garanție. Acel mic gest de compasiune mi-a reamintit cât de generoși și umani pot fi oamenii, chiar și atunci când nu te aștepți." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Nu aștepta să fii pregătit – nu vei fi niciodată complet. Frica nu dispare, dar după primul pas se transformă în entuziasm. Viața îi răsplătește pe cei curajoși, nu pe cei perfecți." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Facebook: Rachid Casablanca; Instagram: @el_richaud" },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Am întâlnit-o pe Mida în timpul călătoriei ei în Casablanca, când am avut plăcerea de a o găzdui. Atunci am descoperit omul minunat care este – cald, sincer și plin de lumină. A fost o perioadă memorabilă, plină de momente frumoase, care au rămas cu mine." },
        ],
        story: [],
      },
      en: {
        intro: `I met Rachid thanks to Kamal. It was Kamal’s birthday, and the invitation to join the party came at just the right time.
I only had three days left in Morocco, so I said “yes.” What I didn’t know then was that Kamal’s invitation would bring into my life a complete stranger – who would soon become unforgettable.
        
It all started through Couchsurfing. I was supposed to stay for two nights and then find another place for my last night before flying to Catania.
But Rachid smiled and told me I could stay at his place until my flight – and he made sure I had everything I needed.
He even took my dress to be ironed.
        
It was a long, colorful dress I wanted to wear to Kamal’s birthday, completely wrinkled after spending days in my backpack.
That simple gesture really touched me.
        
We went out to a club together, laughed a lot, and he shared a few of Morocco’s best-kept secrets with me.
A wonderful, generous, warm-hearted person who will surely stay in my heart for a long time.
        
Oh, and on my last day, I left the house without locking the door.
But since it closed automatically, Rachid had nothing to worry about. Everything was perfectly fine – just like the best memories: simple and peaceful.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I’m Rachid, and I live in Casablanca, Morocco. I’m a curious soul with a deep love for discovering new people, places and perspectives. I’m guided by the beauty of the unknown and the simple joy of human connection. My backpack is light, but my heart is always full of stories." },
          { q: "2. What made you start traveling?", a: "It wasn’t a single moment – more like a quiet voice that kept getting louder. I wanted to break free from routine and feel alive again. One day I realized that if I kept waiting for the “perfect time”, it might never come. So I packed my bag and left." },
          { q: "3. When did you know it was worth it?", a: "It hit me one morning, watching the sunrise after a long night on a bus. Everyone else was still asleep, and I was just standing there – tired, but completely at peace. That was the moment I knew I’d made the right choice." },
          { q: "4. A place that changed the way you see the world?", a: "Thailand. The energy of that country opened my eyes to a different rhythm of life – calm, spiritual and deeply human. From the kindness of its people to the simplicity of everyday moments, Thailand taught me that happiness isn’t about having more, but about living with gratitude and presence." },
          { q: "5. How did traveling change you as a person?", a: "It taught me to trust the flow of life. I used to plan everything – now I embrace uncertainty. I discovered that I’m stronger, more adaptable, and more open-hearted than I ever imagined. The world feels less like a big place, and more like one big home." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "One day in Thailand, I went to Railay Beach without any hotel reservation after an incident with my bank card. When I arrived, I found that every hotel was fully booked, and I struggled to find a place to stay. Late at night, I came across a small hostel that had an age policy. The manager, touched by my story and my attitude, decided to make an exception and offered me a bed for the night, keeping my passport for security reasons. That small act of compassion reminded me how generous and human people can be, even when you least expect it." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Don’t wait to be ready – you never really will be. The fear doesn’t disappear, but once you take the first step, it turns into excitement. Life rewards courage, not perfection." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "Facebook: Rachid Casablanca, and Instagram: @el_richaud" },
          { q: "9. Bonus: How did we meet?", a: "I met Mida during her trip to Casablanca, when I had the pleasure of hosting her at my place. That’s when I discovered the wonderful person she is – warm, genuine and full of light. It was a memorable time, filled with beautiful moments that have stayed with me ever since." },
        ],
        story: [],
      },
      video: null,
    },

       // ────────────────────────────────────────────────────────────
    // 5) Akwaa — Un gest mic, o amintire mare
    // ────────────────────────────────────────────────────────────
    {
      id: "akwaa-yemen",
      emoji: "🚢",
   
      name: {
        ro: "Akwaa — O întâlnire pe mare",
        en: "Akwaa — A meeting at sea",
      },
      tagline: {
        ro: "Pasionat. Explorato. Povestitor.",
        en: "Passionate. Explorer. Storyteller.",
      },
    
      cover: "/assets/travelers/akwaa-yemen/cover 2.webp",
      gallery: [
        "/assets/travelers/akwaa-yemen/1.webp",
        "/assets/travelers/akwaa-yemen/2.webp",
        "/assets/travelers/akwaa-yemen/3.webp",
      ],
      socials: {
        instagram: "https://www.instagram.com/abdullah_akwaa_?igsh=MTB0NWlvOTUyczBhMw%3D%3D",
        facebook: "",
        tiktok: "",
        youtube: "",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Marți, 12 noiembrie 2024.
Plecam din Bali către Papua. De fapt, trebuia să plec cu o zi înainte – dar așa s-a întâmplat, n-am mai putut. Am mai stat o noapte în Bali și m-am urcat a doua zi pe feribotul care mergea spre Lombok.
        
Povestea noastră e chiar haioasă. Eram cuminte, așezată în primele rânduri ale feribotului, privind la televizor. Telefonul meu era la încărcat, așa că nu aveam altceva de făcut decât să privesc marea și oamenii din jur.
        
Atunci i-am văzut.
Doi tipi înalți, bruneți, care vorbeau în arabă. Mai târziu, au început să vorbească și cu mine.
Erau prieteni – se cunoscuseră de doar câteva zile în Bali și deciseseră să călătorească împreună.
        
Unul dintre ei era Akwaa, din Yemen, un tânăr de doar 23 de ani, cu un zâmbet cald și o curiozitate de copil care vede lumea pentru prima dată.
Călătorește cu o inimă deschisă și o liniște rară – genul de prezență care îți amintește că frumusețea lumii e mai aproape decât crezi, dacă știi să o vezi. Împreună, nici nu am simțit cum au trecut cele patru ore pe feribot.
Am povestit, am râs, am făcut poze cu cartea mea (prima mea carte) și am dat ochii peste cap la tot felul de mici întâmplări din jurul nostru.
Călătoria s-a transformat într-un fel de mic film de vară, cu glume, oameni noi și o energie ușoară.
        
Am ajuns seara în portul Lembar, din Lombok. Eu, ca de obicei – fără cazare.
Ei, mai organizați, aveau deja ceva închiriat în Mataram. Nu aveam de gând să merg până acolo, dar… ca să fie ziua completă, am zis: „De ce nu?”
        
Așa că am mers împreună.
Am împărțit un taxi, am lăsat bagajele lor la hotel și am căutat un loc unde să mâncăm. Ne era foame, după atâtea ore pe drum.
Apoi m-au condus pe mine la hotelul pe care îl găsisem între timp – unul modest, dar cu un pat curat și liniște, exact cât aveam nevoie.
        
Akwaa mi-a dus rucsacul până la intrare.
Ne-am luat rămas bun acolo, în fața hotelului, cu zâmbete și cu sentimentul acela simplu, frumos, al unui moment trăit pe deplin.
        
Seara aceea a fost memorabilă.
De atunci nu ne-am mai reîntâlnit, dar ținem legătura – ca și cum feribotul acela ar fi lăsat o punte între două lumi, care încă rezistă.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Sunt Akwaa, un aventurier din fire – un om care își găsește liniștea în natură și entuziasmul în descoperirea noilor culturi. Pentru mine, călătoriile nu înseamnă doar a vedea locuri noi, ci a mă simți viu, a învăța și a mă conecta cu lumea la un nivel mai profund." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Totul a început cu o dorință puternică de schimbare. Voiam să scap de rutină și să trăiesc viața dincolo de ce îmi era familiar. A fost un moment în care am realizat că lumea e prea mare ca să rămân într-un singur loc – și acela a fost impulsul meu să plec." },
          { q: "3. Când ai știut că merită?", a: "Prima dată când am ajuns în vârful unui munte, după o drumeție lungă și obositoare, și am privit apusul în liniște completă, am știut că a meritat. Fiecare pas, fiecare provocare a dus la acel sentiment de libertate pură." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Un mic sat ascuns în munți mi-a schimbat, la un moment dat, perspectiva. Oamenii de acolo trăiau simplu, dar păreau cu adevărat fericiți. M-au învățat că fericirea nu vine din a avea mai mult, ci din a aprecia ceea ce ai deja." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Călătoriile m-au făcut mai răbdător, mai deschis și mai recunoscător. M-au învățat să accept diferențele și să văd frumusețea în cele mai mici detalii. Am înțeles că fiecare om pe care îl întâlnesc și fiecare loc pe care îl vizitez poartă o poveste care merită ascultată."},
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Odată am rămas blocat în munți, într-o ploaie torențială, fără semnal și fără o cale clară de întoarcere. M-am bazat doar pe instinct, pe curaj și pe calmul meu – și am învățat că, uneori, cea mai sigură busolă e în tine." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Nu aștepta momentul perfect – nu există. Fă primul pas, chiar dacă pare nesigur. Drumul te va învăța tot ce ai nevoie să știi." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "Mă poți găsi pe Instagram, unde împărtășesc momente din călătorii, aventuri în natură și povești despre oamenii pe care îi întâlnesc pe drum." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Drumurile noastre s-au intersectat undeva, în timpul unei călătorii – poate din întâmplare, poate din destin. Cred însă că cele mai frumoase conexiuni se întâmplă tocmai atunci când nu le cauți." },
        ],
        story: [],
      },
      en: {
        intro: `Tuesday, November 12, 2024.  
I was leaving Bali for Papua.  
I was actually supposed to leave a day earlier – but, as it often happens, things didn’t go as planned. So I stayed one more night in Bali and took the ferry to Lombok the next day.
        
Our story is quite funny.  
I was quietly sitting in the front rows of the ferry, watching TV. My phone was charging, so I just sat there – calm, watching the sea and the people around me.
        
That’s when I noticed them.  
Two tall, dark-haired guys speaking Arabic. Later, they started talking to me.  
They were friends – they’d met only a few days earlier in Bali and had decided to travel together.
        
One of them was Akwaa, from Yemen, only 23 years old, with a warm smile and the kind of curiosity that makes the world feel new again.  
He travels with an open heart and a calm presence – the kind that reminds you the beauty of the world is always close, if you know how to look.
        
The four hours on the ferry passed without us even noticing.  
We talked, laughed, took photos with my book (my very first one), and rolled our eyes at all kinds of small things happening around us.  
The journey turned into a little summer movie – full of jokes, new faces and light-hearted energy.
        
We arrived in Lembar, Lombok, in the evening.  
I had no accommodation, as usual.  
They already had a place booked in Mataram. I wasn’t planning to go that far, but – to make the day complete – I said, “Why not?”
        
So we went together.  
We shared a taxi, dropped their bags off at their hotel and went looking for something to eat – we were starving after all those hours on the road.  
Then they walked me to my hotel – a small budget place I’d found along the way, simple but peaceful, just what I needed.
        
Akwaa carried my backpack for me.  
We said goodbye in front of the hotel, with smiles and that quiet, beautiful feeling of a day well lived.
        
That evening was truly memorable.  
We haven’t seen each other again since then, but we still keep in touch – as if that ferry had left a bridge between two worlds, and somehow, it’s still there.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "I’m Akwaa, an adventurer at heart – someone who finds peace in nature and excitement in discovering new cultures. Traveling isn’t just about seeing places for me; it’s about feeling alive, learning, and connecting with the world on a deeper level." },
          { q: "2. What made you start traveling?", a: "It started with a strong desire for change. I wanted to break free from routine and experience life beyond the familiar. There was a moment when I realized the world is too big to stay in one place – and that was the push I needed to go." },
          { q: "3. When did you know it was worth it?", a: "The first time I reached the top of a mountain after a long, exhausting hike and watched the sun set in complete silence – that’s when I knew it was all worth it. Every step, every challenge led to that feeling of pure freedom." },
          { q: "4. A place that changed the way you see the world?", a: "A small village hidden in the mountains once changed my perspective. The people there lived simply, yet they seemed genuinely happy. It taught me that happiness doesn’t come from having more – it comes from appreciating what you already have." },
          { q: "5. How did traveling change you as a person?", a: "Travel has made me more patient, open-minded, and grateful. It has taught me to embrace differences and to see beauty in the smallest details. I’ve learned that every person I meet and every place I visit holds a story worth listening to." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "Once I got stuck in the mountains during heavy rain with no signal and no clear path out. I relied on my instincts, courage, and calm – and I learned that sometimes the safest compass is the one within you." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Don’t wait for the perfect time – it doesn’t exist. Take the first step, even if it feels uncertain. The road will teach you everything you need to know." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "You can find me on Instagram, where I share moments from my travels, nature adventures, and stories about the people I meet along the way." },
          { q: "9. Bonus: How did we meet?", a: "We crossed paths somewhere along the journey – maybe by chance, maybe by fate. But I believe the best connections always happen when you least expect them." },
        ],
        story: [],
      },
      video: null,
    },


       // ────────────────────────────────────────────────────────────
    // 6) Heidi — Un gest mic, o amintire mare
    // ────────────────────────────────────────────────────────────
    {
      id: "heidi-scotia",
      emoji: "🎨",
   
      name: {
        ro: "Heidi — O viață trăită ca o operă de artă",
        en: "Heidi — A life lived as a work of art",
      },
      tagline: {
        ro: "Creativă. Curajoasă. Liberă.",
        en: "Creative. Brave. Free.",
      },
    
      cover: "/assets/travelers/heidi-scotia/heidi1.webp",
      gallery: [
        "/assets/travelers/heidi-scotia/heidicover1.webp",
        "/assets/travelers/heidi-scotia/heidi2.webp",
        "/assets/travelers/heidi-scotia/heidi3.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "https://www.youtube.com/@eatlovetravelwithheidi",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Era o zi superbă de vară, într-un hostel din Catania. Eram singură în cameră, cu aerul condiționat pornit și cu 33 de grade care fierbeau orașul de afară.  
Am mers până la baie… și, când m-am întors, nu mai eram singură.
        
Apăruse o tipă – exact în momentul în care mă pregăteam să închid laptopul și să ies să mănânc.  
O întâlnire „aranjată”. Nu o spun doar eu – am simțit asta împreună.
        
Heidi, din Scoția. O rebelă, exact opusul meu – cum chiar ea s-a definit. Artistă, călătoare de o viață, o femeie care a strâns în suflet povești cât pentru trei existențe.  
Mi-a povestit cum a cutreierat lumea, cum și-a urmat impulsurile, cum s-a aruncat în experiențe brute, uneori frumoase, alteori dureroase.
        
Dar fraza care m-a cucerit a fost asta:
        
— Când am nevoie de bani, mă pot opri să-i fac… când nu, pot călători.
        
Face meditație și stretching pe plajă. Pictează – nu doar ca hobby, ci ca o formă de respirație. Trăiește liber.  
Și iar Universul a lucrat în culise: cu o zi înainte își schimbase hostelul. Inițial îl alesese pe cel la care trebuia să merg și eu – Eco Hostel. Dar a schimbat planurile și a ales aici, pentru trei nopți.  
Bizar? Deloc. Știm amândouă că nimic nu e întâmplător.
        
Era fascinată de cât de diferite suntem. Și, în timp ce povestea, i se vedea în ochi ceva foarte rar: iubirea sinceră pentru viață, în cele mai brute forme ale ei.  
O cred. Se simțea în felul în care respira, în felul în care zâmbea.  
Puțini oameni pot spune asta, în ciuda greutăților vizibile pe care le trăim cu toții.
        
Și da, apropo de rochița mea „boemă”… era logic ca a doua zi să meargă să-și cumpere și ea una.  
        
Poate că undeva, cândva, drumurile noastre se vor intersecta din nou.  
Cine știe ce ne este menit?`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Numele meu este Heidi Karin. M-am născut pe coasta de nord-est a Scoției și am un sfert sânge norvegian. Lucrez ca artistă și pentru o companie norvegiană. Călătoresc de când eram foarte tânără – cred că drumul a făcut mereu parte din mine." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Am început să călătoresc singură la începutul vârstei de 20 de ani. Am avut mereu o dragoste pentru descoperire – pentru lucruri noi, pentru învățare, pentru culturi diferite. Sunt o persoană profund curioasă despre lume și despre tot ce are ea de oferit." },
          { q: "3. Când ai știut că merită?", a: "Acel moment în care simți cu adevărat că trăiești! Când realizezi că există atât de mult de descoperit dincolo de ușa ta – și că totul se rezumă la oamenii pe care îi întâlnești pe drum." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Sunt multe locuri, dar primul a fost Egiptul. L-am vizitat la 13 ani și a fost prima mea „lovitură culturală”. De atunci m-am tot întors – călătoresc în Egipt încă din anii ’90." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Călătoriile mi-au modelat întreaga viață. Mi-au deschis mintea și inima. M-au ajutat să mă privesc mai adânc, să caut sens, să mă las inspirată și să creez artă – să surprind cele mai frumoase momente cu aparatul foto. A fost uimitor. Tot ce trebuie să faci este să trăiești clipa și să o respiri cu totul." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "M-am îmbolnăvit de mai multe ori, mai ales în țările mai puțin dezvoltate. Odată, în Mumbai, India, am fost bolnavă aproape 12 săptămâni. Am mers la spital în Kerala, am primit tratament și apoi mi-am continuat drumul spre Sri Lanka. La scurt timp după, am fost electrocutată într-un duș – dar am supraviețuit, am ajuns în Dubai și, în cele din urmă, am primit medicația corectă. A trebuit doar să merg mai departe. Eram singură, dar trebuia să-mi croiesc drumul spre casă." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Doar fă-o. Nu planifica prea mult. Fii spontan. Încearcă lucruri pe care, de obicei, nu le-ai face. Călătorește ușor. Simplifică-ți viața. Nu ai nevoie de multe – doar de un rucsac mic, un zâmbet mare și o inimă deschisă. Dar… ține ochii deschiși!" },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "YouTube: @eatlovetravelwithheidi (Heidi nu folosește foarte mult rețelele sociale, dar împărtășește momente și povești de călătorie pe canalul ei de YouTube.)" },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Tocmai ajunsesem la hostelul din Catania, în Sicilia, după un drum lung cu autobuzul din Palermo. Mida a intrat în dormitor purtând o rochie boemă superbă și am început să vorbim imediat. Am rezonat pe loc. Mi-a povestit puțin despre călătoria ei – mi s-a părut fascinantă. De atunci am mai ținut legătura, din când în când." },
        ],
        story: [],
      },
      en: {
        intro: `It was a beautiful summer day in a small hostel in Catania.  
I was alone in the room, the air conditioning humming softly while the heat outside – over 33 degrees – was melting the city.  
I went to the bathroom… and when I came back, I was no longer alone.
        
A woman had appeared – right in the moment when I was about to close my laptop and go eat.  
An “arranged” meeting. Not just according to me – that’s how we both felt.
        
Heidi, from Scotland.  
A rebel.  
My opposite – as she herself put it.  
An artist, a lifelong traveler, a woman who carries inside her enough stories for three lifetimes.
        
She told me how she’s wandered the world, how she’s followed her impulses, how she’s thrown herself into raw experiences – some beautiful, others painfully deep.
        
But the sentence that completely won me over was this:
        
— When I need money, I can stop and make it… and when I don’t, I can travel.
        
She meditates and stretches on the beach. She paints – not as a hobby, but as a way to breathe. She lives freely.  
And once again, the universe was working behind the scenes: the day before, she had changed her hostel.  
Originally, she had booked the same place I was supposed to stay at – Eco Hostel – but she switched and chose this one instead, for three nights.  
Strange? Not at all. We both know nothing is ever random.
        
She was fascinated by how different we are. And as she spoke, I noticed something rare in her eyes: a sincere love for life, in its rawest, most unfiltered forms.  
I believed her instantly. You could feel it in the way she smiled, in the way she breathed.  
Few people can truly say that, despite the visible hardships we all go through.
        
And yes, about my little “bohemian dress”… of course she went out the next day and bought one for herself.
        
Maybe somewhere, someday, our paths will cross again.  
Who knows what life has in store for us?`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "My name is Heidi Karin. I was born on the north-east coast of Scotland, and I’m one-quarter Norwegian. I work as an artist and I also work for a Norwegian company. I’ve been travelling since I was very young – it’s always been part of who I am." },
          { q: "2. What made you start traveling?", a: "I first started travelling solo in my early 20s. I’ve always had a love for travel – to discover new things, to learn, and to absorb new cultures. I’ve always been deeply curious about the world." },
          { q: "3. When did you know it was worth it?", a: "That moment when you really feel alive! You realise there is so much more outside your door to discover – and that it’s really all about the people you meet on your journey." },
          { q: "4. A place that changed the way you see the world?", a: "So many places, really. I first visited Egypt when I was 13, and it was my first real culture shock. I’ve been travelling back there since the early ’90s." },
          { q: "5. How did traveling change you as a person?", a: "Travel has shaped my whole life. It has opened my mind and my heart. It’s allowed me to look deeper into myself, to search for meaning, to be inspired and to create art – to capture the most beautiful moments with my camera. All of it has been amazing. You just have to live in that moment and breathe it in." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "I’ve gotten sick quite a few times, especially in the less developed countries. I got sick in Mumbai, India, and was ill for around 12 weeks. I visited a hospital in Kerala, got medication, and made my way to Sri Lanka. After that, I got electrocuted in a shower – but I survived, made my way to Dubai, and finally got the proper medication I needed. I just had to keep going. I was alone, but I had to make my way home." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "Just do it. Don’t plan too much. Be spontaneous – try things you would never normally do. Travel light. Keep your life simple. You don’t need much in life – just the essentials. Bring a small rucksack, a big smile and an open heart… but keep your eyes open!" },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "YouTube: @eatlovetravelwithheidi (I don’t use social media much, but I share my travel moments and stories on my YouTube channel.)" },
          { q: "9. Bonus: How did we meet?", a: "I had just arrived at a hostel in Catania, Sicily, after a long bus journey from Palermo. Mida walked into the dorm wearing a beautiful bohemian dress, and we instantly started talking. We hit it off right away. She told me a little about her journey, and I found it fascinating. Since then, we’ve stayed in touch from time to time." },
        ],
        story: [],
      },
      video: null,
    },

    // ────────────────────────────────────────────────────────────
    // 7) Yassir — Un marocan la capătul pământului
    // ────────────────────────────────────────────────────────────
    {
      id: "yassir-maroc",
      emoji: "🌊",
   
      name: {
        ro: "Yassir — Un marocan la capătul pământului",
        en: "Yassir — A Moroccan at the edge of the world",
      },
      tagline: {
        ro: "Liber. Intuitiv. Hotărât.",
        en: "Free. Intuitive. Determined.",
      },
    
      cover: "/assets/travelers/yassir-maroc/yassircover1.webp",
      gallery: [
        "/assets/travelers/yassir-maroc/yassir5.webp",
        "/assets/travelers/yassir-maroc/yassir2.webp",
        "/assets/travelers/yassir-maroc/yassir4.webp",
      ],
      socials: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "https://www.youtube.com/@freedomtells",
        website: "",
        blog: "",
      },
      ro: {
        intro: `Plecasem din Bali de aproape 80 de zile. Drumul meu spre Papua nu avea un scop clar – doar acea voce interioară care îmi spunea că trebuie să ajung acolo.
Trecusem prin încercări care i-ar fi oprit pe mulți: dureri, oboseală, accidentări, îndoieli.

Dar în mine exista o forță pe care nu o puteam explica.
Știam că miza era mai mare, chiar dacă nu știam care.
        
Cu o mână și un picior rupt, cu energia adunată în rucsac ca un talisman, după ce am traversat alte insule din Indonezia, am ajuns – într-un final – în Raja Ampat.
O aventură cu „A” mare.
Și chiar dacă nu știam încă, eram exact în locul potrivit.
        
Nu eu am ales insula.
Insula m-a ales pe mine.
        
Sam, proprietarul micuțului resort din Arborek, a insistat să merg acolo. M-a sunat, m-a convins, iar eu i-am spus:

— Dacă ajung în port și încă ești acolo, vin cu tine. Dacă nu… nu sta după mine.

Dar Universul mă voia acolo.
Și a avut grijă să fie.
        
Iar acolo, da, acolo, la capătul unui drum care părea fără sfârșit, a apărut el: Yassir.
Marocanul care părea că mă așteptase.
        
De ce spun asta?
Pentru că, mai târziu, am înțeles că întâlnirea noastră nu a fost una obișnuită.
Datorită lui, câteva luni mai târziu, am ajuns în Maroc.
Fără să știe, Yassir a fost unul dintre acei oameni care îți schimbă direcția – subtil, profund, exact cum Universul știe să o facă.
        
L-am vizitat în Tanger, orașul lui natal.
I-am cunoscut familia, frații, nepotul.
Am împărțit bunătăți locale, ne-am plimbat pe plajă și am râs ca doi oameni care, de fapt, nu s-au întâlnit niciodată „din întâmplare”.
        
Fără el, probabil nimic din ce a urmat nu s-ar fi întâmplat.
Și îi mulțumesc azi pentru tot.
        
Unele conexiuni nu se explică în cuvinte.
Ele se trăiesc.
Atât.`,
        qna: [
          { q: "1. Cine ești în câteva fraze?", a: "Numele meu este Yassir. Sunt din Maroc și sunt un om profund conectat cu natura – albastrul mării, verdele pădurilor, frumusețea liniștită a locurilor neatinse. De aceea trăiesc cu rucsacul în spate; să mă mut dintr-un loc frumos în altul mi se pare cel mai natural lucru pentru mine." },
          { q: "2. Ce te-a împins să pleci la drum?", a: "Sincer, totul a început din cauza vremii din Maroc – dar și fiindcă sunt o persoană activă. Nu-mi puteam imagina să stau într-un singur loc când știam că există altele, mai potrivite pentru mine, care mă așteaptă." },
          { q: "3. Când ai știut că merită?", a: "De fiecare dată când ajung într-o destinație nouă și o văd pentru prima dată cu ochii mei. Momentul acela în care frumusețea reală a unui loc te lasă fără cuvinte – atunci știu că am făcut alegerea potrivită." },
          { q: "4. Ce loc ți-a schimbat cel mai mult felul de a privi lumea?", a: "Indonezia, în special prima mea călătorie în Bali. Să trăiesc o cultură, o natură și un stil de viață complet diferite mi-a deschis mintea. M-a făcut să reflectez la multe lucruri pe care le credeam „normale”." },
          { q: "5. Cum te-a schimbat călătoria ca om?", a: "Călătoria mi-a schimbat dorințele. Înainte cheltuiam bani pe lucruri materiale; acum prefer aventurile și descoperirea locurilor noi. Am descoperit și că pot trăi singur foarte mult timp fără probleme – fără să simt că îmi lipsește ceva." },
          { q: "6. Un moment greu de pe drum și cum l-ai depășit.", a: "Sincer, încă nu am trăit un moment cu adevărat dificil. Poate sunt făcut mai puternic, sau poate nu văd lucrurile ca fiind dificile atât de ușor." },
          { q: "7. Un sfat pentru cine vrea să pornească, dar încă ezită.", a: "Dacă ești sărac, muncește, economisește și călătorește pe un alt continent – îți va schimba perspectiva, dorințele, poate chiar viitorul. Ai o singură viață; cu cât vezi mai multe drumuri, cu atât îți vei da seama mai clar care e al tău. Dacă ai deja bani, nu văd niciun motiv serios să nu călătorești, decât dacă pur și simplu nu îți place – după ce ai încercat." },
          { q: "8. Unde te găsim (IG / FB / YouTube / TikTok / site / blog)?", a: "YouTube: @freedomtells – acolo postez aventurile mele din Indonezia și Raja Ampat." },
          { q: "9. Bonus: Cum ne-am cunoscut?", a: "Am întâlnit-o pe Mida în Raja Ampat. Am stat în același loc, am mâncat împreună și ne-am cunoscut treptat. Am devenit prieteni natural. Câteva luni mai târziu, Mida a venit în Maroc după ce am invitat-o. Până astăzi, încă ținem legătura." },
        ],
        story: [],
      },
      en: {
        intro: `I had been on the road for nearly 80 days, leaving Bali behind and slowly making my way toward Papua.
I didn’t have a clear purpose – just a quiet knowing inside me that I had to get there.
Along the way, I went through trials that would have stopped many people: pain, exhaustion, setbacks, moments where everything seemed too much.
        
But there was a strength in me I couldn’t explain.
I knew the journey had a deeper meaning… even if I didn’t yet know what it was.
        
With a broken arm, a broken foot, and all my remaining energy packed into my backpack like a talisman, I crossed island after island in Indonesia until, finally, I reached Raja Ampat.
An adventure with a capital “A.”
And even if I didn’t fully understand it then – I was exactly where I needed to be.
        
I didn’t choose the island.
The island chose me.
        
Sam, the owner of the little homestay in Arborek, insisted that I go to his place. He called me, insisted again, and I told him:

— If I reach the port and you’re still there, I’ll come with you. If not… don’t wait for me.

But the Universe wanted me there.
And it made sure I arrived.
        
And there – at the end of a road that felt endless – he appeared: Yassir.
The Moroccan who felt as if he had been waiting for me.
        
Why do I say that?
Because later, I realized our meeting was more than a simple coincidence.
Thanks to him, months later, I ended up in Morocco.
Without knowing it, Yassir became one of those people who shift your path – subtly, quietly, exactly the way the Universe likes to send signs.
        
I visited him in Tangier, his hometown.
I met his family, his brothers, his little nephew.
We shared local sweets, explored the city, walked along the beach, and talked like two people who were never meant to meet… yet were somehow meant to meet all along.
        
Without him, none of what followed would have happened.
And today, I thank him for everything.
        
Some connections cannot be explained in words.
They can only be lived.
And felt.`,
        qna: [
          { q: "1. Who are you in a few sentences?", a: "My name is Yassir. I’m from Morocco, and I’m someone who feels deeply connected to nature – the blue of the sea, the green of the forest, the quiet beauty of untouched places. That’s why I live with a backpack; moving from one beautiful place to another feels natural to me." },
          { q: "2. What made you start traveling?", a: "Honestly, it started with the weather in Morocco, but also because I’m naturally an active person. I couldn’t imagine staying in one place when I knew there were better places out there waiting for me – places that match who I am." },
          { q: "3. When did you know it was worth it?", a: "It hits me every time I arrive in a new destination and finally see it with my own eyes. That moment of being stunned by the real-life beauty of a place – that’s when I know I made the right choice." },
          { q: "4. A place that changed the way you see the world?", a: "Indonesia, especially my first trip to Bali. Experiencing a totally different culture, nature, and lifestyle opened my mind. It made me reflect on many things I grew up thinking were “normal.”" },
          { q: "5. How did traveling change you as a person?", a: "Traveling changed my desires. I used to spend money on physical things; now I prefer spending it on adventures and discovering new places. I also discovered that I can live alone for a very long time without any problem – without feeling like I’m missing anything." },
          { q: "6. A hard moment on the road and how you overcame it.", a: "Honestly, I haven’t experienced a real difficult moment yet. Maybe I’m built tough, or maybe I don’t see things as difficult easily." },
          { q: "7. A tip for someone who wants to leave but still hesitates.", a: "If you’re poor, work, save money, and travel to a new continent – it will change your perspective, your desires, maybe even your whole future. You have only one life; the more paths you see, the better you’ll understand which one is right for you. If you already have money, I don’t really see a reason not to travel unless you simply don’t enjoy it after trying." },
          { q: "8. Where can we find you (IG / FB / YouTube / TikTok / site / blog)?", a: "I’m on YouTube: @freedomtells – I’ve posted some of my adventures from Indonesia and Raja Ampat there." },
          { q: "9. Bonus: How did we meet?", a: "I met Mida in Raja Ampat. We stayed in the same place, ate together, and slowly got to know each other. We became friends naturally. A few months later, Mida visited me in Morocco after I invited her. Until today, we’re still in touch." },
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
  