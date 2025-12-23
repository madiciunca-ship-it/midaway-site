// src/data/posts.js
// Structură: fiecare post are slug (unic), titlu, excerpt, date ISO, tags, cover, minutes, content (array de paragrafe)

const posts = [
  {
    slug: "cum-a-inceput-calatoria-mea",
    title: "Cum a început călătoria mea",
    excerpt:
      "Povestea startului: primele zile, primele decizii, primul pas în necunoscut.",
    date: "2025-10-15",
    tags: ["călătorii", "jurnal"],
    cover: "assets/blog/blog-1.jpg",
    minutes: 5,
    content: [
      `Uneori, călătoriile nu încep cu un pas, ci cu o întrebare care nu te mai lasă să dormi. În cazul meu, întrebarea era: „Ce se întâmplă cu visul când ajungi să-l trăiești?”`,
      `Aveam tot ce „ar fi trebuit” să-mi aducă liniștea: un apartament frumos în București, o firmă care mergea bine, o mașină de lux, oameni care mă iubeau. Dar într-o zi m-am trezit simțindu-mă străină în propria viață. Nu mai aparțineam acelui univers familiar. Simțeam că ceea ce construisem nu mai avea greutate.`,
      `A fost nevoie de o singură lună în Filipine – 30 de zile pe care le credeam o vacanță – ca să-mi dau seama că nu mă mai pot întoarce la vechiul „eu”. Plajele din Palawan, liniștea oceanului, oamenii întâlniți, dialogurile profunde și tăcerile și mai puternice mi-au arătat că lumea e mai mare decât visul din care făcusem parte.`,
      `Așa a început. Nu cu un plan, ci cu o ruptură. Cu o nevoie de a înțelege, de a simți, de a deveni.`,
      `De la decizie la desprindere nu a fost un salt spectaculos, ci o serie de alegeri dureroase: am renunțat la iubire. La stabilitate. La venituri sigure. La prieteni care nu mai rezonau cu mine. La viața pe care alții o visau și pe care eu nu o mai puteam purta.`,
      `Am înțeles că nu pierd – ci eliberez. Că tot ceea ce mă frământa era, de fapt, un portal către o formă mai autentică a mea.`,
      `Scrisul a devenit busola mea. Fiecare pagină scrisă era o oglindă. Uneori încețoșată, alteori limpezită de curaj.`,
      `Așa s-a născut a doua mea carte. Yda a mers mai departe. Și, mult mai târziu, a apărut Midaway.`,
      `„Zile și nopți de Vietnam” este prima oprire scrisă a acestui nou drum. O carte despre transformare, despre rătăcire și regăsire. Despre cum te poți pierde în lume pentru a te regăsi în tine.`,
      `Yda nu e doar un personaj. E reflexia acelei femei care a ales necunoscutul în locul confortului. Care a trăit 626 de zile într-un haos frumos, în Asia, și a descoperit că libertatea nu înseamnă lipsa fricii, ci puterea de a merge mai departe în ciuda ei.`,
      `Și tu poți începe o astfel de călătorie. Poate nu pe un alt continent. Poate nu cu un bilet de avion. Dar sigur cu o întrebare sinceră: „Trăiesc ceea ce mi se potrivește... sau doar ceea ce mi s-a spus că trebuie?”`,
      `Dacă ai simțit vreodată că vrei mai mult – nu în sens de „a avea”, ci în sens de a deveni – atunci povestea mea s-ar putea să fie și despre tine.`,
      `Midaway este spațiul unde îți poți lăsa sufletul să respire. Unde te poți regăsi printre pagini, printre povești, printre pașii altora care au avut curajul să plece.`,
      `Cartea „Zile și nopți de Vietnam: Bucăți dintr-un suflet nomad” este acum disponibilă în România. Dacă simți să o citești, scrie-mi. S-ar putea să găsești în ea exact ceea ce aveai nevoie să auzi.`
    ]
  },
  {
    slug: "yda-intre-fictiune-si-realitate",
    title: "Yda – între ficțiune și realitate?",
    excerpt:
      "Despre felul în care un personaj poate deveni oglindă pentru cine ești tu.",
    date: "2025-10-22",
    tags: ["proiecte", "scris"],
    cover: "assets/blog/blog-2.jpg",
    minutes: 6,
    content: [
      `„Cine este Yda?” E o întrebare pe care o primesc des, mai ales de când am lansat „Zile și nopți de Vietnam”. E întrebarea din spatele multor priviri curioase, zâmbete în colțul gurii sau mesaje în care cititorii caută... o confirmare. E ea reală? E doar un personaj? Sau e o parte din mine?`,
      `Răspunsul sincer? Da. La toate. Yda s-a născut din realitate, dar trăiește și dincolo de ea. A apărut într-o perioadă în care viața mea nu mai încăpea în formele vechi. Eram între lumi: între o identitate pe care o lăsam în urmă și un drum care nu era încă vizibil. În acea ruptură, am început să scriu. Nu pentru a crea un personaj, ci pentru a mă ține de ceva.`,
      `Yda a fost acea parte din mine care a avut curajul să meargă mai departe când eu ezitam. A spus adevărul când eu îl sugrumam. A privit înainte când eu mă agățam de trecut. Scrisul a fost oglinda. Iar în acea oglindă, Yda a început să prindă contur.`,
      `Ficțiune? Doar atât cât e nevoie ca să spun adevărul mai bine. Sunt detalii din carte care s-au întâmplat exact așa. Oamenii pe care i-am întâlnit. Deciziile luate. Fricile și revelațiile. Dar sunt și scene în care realitatea se topește în metaforă, pentru că uneori doar o poveste poate cuprinde întregul sens.`,
      `Yda este, în esență, o voce sinceră. Un alter ego, da, dar și un canal prin care am învățat să mă ascult. Nu este idealizată. Nu e salvatoare. E imperfectă, vulnerabilă, uneori contradictorie. Exact ca mine. Exact ca tine.`,
      `De ce am scris-o așa? Pentru că aveam nevoie să înțeleg. Pentru că aveam nevoie să iert. Pentru că aveam nevoie să transform ceea ce mă apăsa într-o formă care să poată merge mai departe. Și pentru că știam, cumva, că încercările mele nu sunt doar ale mele.`,
      `Yda e un nume. Dar și o cale. Poate că Yda este partea aceea din noi care vrea să plece și nu îndrăznește. Poate e femeia care a fost învățată să se conformeze, dar alege să se asculte. Poate este pur și simplu o versiune posibilă a ceea ce putem deveni atunci când spunem: „Nu știu ce mă așteaptă, dar aleg să merg.”`,
      `Așadar, este Yda reală? Poate nu în sensul clasic. Dar este vie. Și continuă să respire în fiecare pagină, în fiecare pas făcut în necunoscut, în fiecare alegere curajoasă. Și dacă citind ai simțit că o înțelegi, că te regăsești, că parcă ești și tu acolo – atunci poate că și tu porți o Yda în tine.`,
      `Yda trăiește în „Zile și nopți de Vietnam: Bucăți dintr-un suflet nomad” – o carte scrisă cu toată sinceritatea de care am fost capabilă. Dacă vrei să o citești, scrie-mi. Povestea e deschisă.`
    ]
  },
  {
    slug: "de-ce-alegem-drumuri-nestiute",
    title: "De ce alegem drumuri neștiute?",
    excerpt:
      "Nu alegem drumuri neștiute pentru că sunt comode. Le alegem tocmai pentru că nu știm…",
    date: "2025-10-29",
    tags: ["proiecte", "scris"],
    cover: "assets/blog/blog-3.jpg",
    minutes: 6,
    content: [
      `Nu alegem drumuri neștiute pentru că sunt comode. Nici pentru că știm unde duc. Le alegem tocmai pentru că nu știm. Pentru că, dincolo de teama de necunoscut, există o altă frică – mai subtilă, dar mai profundă: frica de a rămâne pe loc în propria viață.`,
      `Ce se ascunde în spatele unui „nu mai pot”? Uneori, o viață întreagă se poate construi în jurul siguranței: stabilitate, previzibil, totul la locul lui. Dar vine un moment în care te trezești și în interiorul tău e un gol pe care niciun confort nu-l poate umple.`,
      `Eu am simțit acel gol în liniștea aparent perfectă a unui apartament frumos, cu un business stabil și tot ce „trebuie”. Și atunci am știut. Nu pentru că aveam un plan. Ci pentru că nu mai puteam sta.`,
      `Drumul neștiut începe când îți dai voie să întrebi: „Ce-ar fi dacă?” „Ce-ar fi dacă aș pleca?” „Ce-ar fi dacă n-aș mai urma tiparele impuse?” „Ce-ar fi dacă aș face ceva nebunesc, doar pentru mine?”`,
      `Nu toate drumurile au hartă. Dar toate lasă urme. Drumul meu neștiut a durat 626 de zile și a traversat Asia. Dar cel mai important drum nu a fost cel dintre țări, ci cel dintre versiuni de sine.`,
      `Am plecat cu un rucsac. M-am întors cu o carte nouă. Și cu o întrebare rămasă deschisă: Cine sunt eu, cu adevărat, atunci când mă dau jos de pe pilot automat?`,
      `Alegem drumuri neștiute pentru că vrem să ne reamintim că suntem vii. Că suntem mai mult decât funcții, roluri și așteptări.`,
      `Dacă simți că acest text ți-a atins o coardă sensibilă, „Zile și nopți de Vietnam: Bucăți dintr-un suflet nomad” e prima carte de nomad pe care am scris-o din acea călătorie. Și poate e exact ce aveai nevoie să citești acum. Scrie-mi. Hai să vorbim. Călătoria ta s-ar putea să înceapă chiar acum.`
    ]
  },

  {
    slug: "povestea-din-culise-cum-am-construit-site-ul",
    title: "Povestea din culise: cum mi-am împins „piatra” până a devenit un website, o editură și un drum nou",
    excerpt:
      "Uneori, un simplu „nu știu” devine piatra pe care o împingi spre vârf. Așa a început drumul meu...",
    date: "2025-11-18",
    tags: ["scris", "proces creativ", "culise", "editura", "proiecte"],
    cover: "assets/blog/blog-4.jpg",
    minutes: 8,
    content: [
      `Există momente în viață în care nu cauți nimic anume – și totuși găsești exact ce-ți trebuia. Așa a început povestea site-ului meu. Nu cu un plan, nici cu o strategie bine definită, ci cu un „nu știu” care mi-a scăpat spontan, sincer, și care a deschis, paradoxal, niște uși pe care până atunci nici nu le vedeam.`,
      
      `În secunda aceea, am simțit cum ceva se mișcă în mine – o voce mică, aproape timidă, care îmi șoptea: „Poate tocmai pentru că nu știi… e momentul perfect să începi.” Acel „nu știu” avea să devină piatra mea: grea, alunecoasă, încăpățânată, dar exact piatra care trebuia împinsă.`,
  
      `Mult timp n-am înțeles metafora cu piatra urcată spre vârf. Până când am început să construiesc site-ul. Atunci piatra a prins contur: o simțeam cum alunecă, cum îmi rănește degetele, cum mă face să mă opresc și să mă întreb: „De ce te chinui? Pentru ce? Nu e mai simplu să renunți?”`,
  
      `Dar exista și cealaltă voce, caldă și încăpățânată, care nu ridica tonul niciodată: „Mai încearcă o dată. Hai. Încă o dată.” Între două căderi, am înțeles că nu vârful te schimbă, ci urcarea. Respirația grea, răbdarea, revenirea. Faptul că, de zece ori căzută, ridici piatra a unsprezecea oară.`,
  
      `Tot ce descopeream era necunoscut. Linii de cod într-o limbă străină, setări bizare, un labirint tehnic pe care încercam să-l înțeleg în timp ce îl parcurgeam. Eu voiam doar un loc unde să-mi vând cărțile. Atât. Dar piatra avea alt plan.`,
  
      `Apoi a venit momentul declanșator. Într-un webinar, un tip a spus cu o simplitate aproape sfidătoare: „Mi-am făcut singur automatizările. Mi-am construit singur site-ul.” În mine s-a făcut liniște, o liniște densă, ca aerul care se strânge înaintea furtunii. „Dacă el poate… de ce eu nu?” A fost pentru prima dată când piatra mea chiar s-a urnit.`,
  
      `N-am știut ce fac – deloc. Fiecare buton, fiecare setare, fiecare eroare roșie era un mister. Dar era un mister pe care simțeam nevoia să-l descifrez. Puțin câte puțin. Când nu-mi plăcea ce ieșea, o luam de la capăt. Când apărea un gând nou – „Dar dacă îl fac așa?” – testam. Când ceva se bloca, mă enervam, respiram și reveneam.`,
  
      `De multe ori îmi spuneam în gând: „Nu înțeleg nimic.” Dar câteva secunde mai târziu auzeam: „Dar dacă mai încerc?” Și asta era, de fapt, lupta. Nu cu platforma, nu cu tehnicul. Cu mine însămi: cu nerăbdarea, cu frica de greșeală, cu impulsul de a renunța. Și totuși… reveneam. Pentru că undeva, dincolo de frustrare, era o forță care mă trăgea înainte: „Nu vei ști niciodată ce poți dacă nu rămâi aici. Încă puțin. Încă un pas.”`,
  
      `Într-o zi, după multe ore de muncă, am observat că nu eu îmi construiam site-ul. El mă construia pe mine. Îmi rupea orgoliul, îmi cerea răbdare, mă obliga să mă întreb: „Ce vrei, de fapt? Îți e frică sau doar cauți scuze? Ai nevoie de perfecțiune sau ai nevoie de un început?”`,
  
      `Atunci am înțeles că nu mă temeam de muncă și nici măcar de necunoscut. De fapt, necunoscutul începea să mă atragă. Și am realizat că trecutul nu e o povară, ci o busolă. Fiecare alegere, oricât de mică, te împinge undeva. Iar toate drumurile mele m-au adus aici: la propriul meu website, la propria mea editură, la propria mea poveste spusă în felul meu.`,
  
      `Există un moment înainte de lansarea unui proiect în care timpul se dilată. Totul în jur tace, dar în tine ceva bate altfel – nu de teamă, ci de presimțire. Așa a fost în ziua în care am apăsat „publică”. În inima mea ceva a spus: „Respiră. Uite, exact acum începe.” A fost ca lumina rece de dinaintea zorilor: inevitabilă și limpede.`,
  
      `Da, am construit un site. Da, am fondat o editură. Da, am un loc în care îmi pot vinde cărțile așa cum vreau. Dar, în realitate, am construit un spațiu viu, care respiră odată cu mine. Un drum care nu va fi niciodată complet. Un loc pe care îl voi modela, rescrie și îmbogăți, exact ca piatra pe care am împins-o până aici.`,
  
      `Poate că asta e frumusețea: nu e niciodată gata. Pentru că nici eu nu sunt. Și poate că nici nu contează cât de greu a fost. Poate că totul – absolut totul – m-a adus exact aici. Și simt, cu o liniște interioară ciudat de limpede, că e doar începutul.`,
  
      `Poate ai ajuns aici întâmplător. Poate ești pentru prima dată pe pagina mea. Dar dacă citești asta… deja faci parte din poveste. O poți simți. O poți trăi. O poți lua cu tine. Eu mi-am împins „piatra” până aici. De azi înainte, o iau cu mine mai departe – cu altă energie, altă claritate, altă bucurie. Cu un site, cu o editură, cu un drum care m-a ales, de fapt, pe mine.`,
  
      `Mida Malena, 18 noiembrie 2025`
    ]
  },

  {
    id: "no-connection-jurnale-de-drum-din-china",
    slug: "no-connection-jurnale-de-drum-din-china",
    title: "No Connection – Jurnale de drum din China",
    subtitle: "Despre frig, hosteluri, tuse, mâncare picantă și liniștea pe care nu o poți descărca din niciun app",
    date: "2025-12-23",
    author: "Mida Malena",
    tags: ["China", "jurnal", "călătorie", "tech", "mindset"],
    excerpt:
      "Unele vise încep când nu te mai gândești la ele. China m-a scos din priză cu un «NO CONNECTION» repetat… și mi-a pus sufletul la loc.",
    cover: "/assets/blog/no-connection-china.webp", // schimbă dacă ai altă imagine
    lang: "ro",
    content: [
      `Unele vise încep fix atunci când nu te mai gândești la ele. Când nu mai stai cu ochii pe destinație, cu dorul încordat, cu liste și planuri. Pur și simplu… se întâmplă.`,
      `China a fost mereu undeva în spatele minții mele. Ca o imagine neclară: zgârie-nori, metrou, tehnologie de ultimă generație, ecrane uriașe, caractere pe care nu le înțelegeam și o limbă care suna ca o ploaie de sunete fără logică pentru mine.`,
      `Fascinația necunoscutului era „acolo”. Dar, undeva, foarte bine ascunsă, era și o emoție mică: „Și dacă nu mă descurc?”`,
      `Auzisem de: aplicații noi, fără de care „nu exiști” acolo; restricții; faptul că mulți oameni nu vorbesc engleză… Nu că engleza mea ar fi perfectă, dar măcar aveam iluzia că mă pot descurca cu ea.`,
      `Și totuși…`,
  
      `### Bilet „out of nowhere”`,
      `Într-o zi, fără mari pregătiri, fără vision board, fără plan pe un an înainte… mi-am luat bilet. Atât.`,
      `În 9 zile urma să zbor spre China. Beijing.`,
      `Nu mă întreba de ce Beijing. N-am un răspuns logic.`,
      `Cochetasem ultimele două luni cu o cu totul altă destinație – ceva cu soare, mare, nisip cald, tot pachetul de „lifestyle de prințesă”.`,
      `Doar că planurile și destinația finală nu sunt întotdeauna același lucru. De multe ori, sunt diametral opuse.`,
      `Și, cumva, știam deja: zarurile fuseseră aruncate.`,
      `Ce a urmat a fost mai mult decât aș fi putut să: plănuiesc, controlez sau măcar să-mi imaginez în liniște, într-o seară de iarnă, în România, când lucram de zor să-mi termin site-ul ca să pot „zbura”.`,
  
      `### Beijing, frigul care mușcă`,
      `Știam că va fi iarnă acolo. Ce nu știam era că iarna aceea avea să mă muște, la propriu.`,
      `„În Beijing sunt minus patru grade,” ne-a anunțat, oarecum nepăsător, căpitanul aeronavei Turkish Airlines.`,
      `Când „îl auzi”, pare un număr ușor de suportat. În realitate, frigul din Beijing mușca din mine ca un animal flămând, hotărât să-și apere teritoriul.`,
      `Pe lângă frig, corpul meu a decis să își facă și el numărul. Am tușit aproape constant, ca și cum plămânii mei încercau să țină ritmul cu orașul.`,
      `Iar cazările din hosteluri mi-au mâncat și restul de nervi pe care îi mai aveam. Paturi suprapuse care scârțâiau la fiecare întoarcere, pereți subțiri, lumini aprinse la două noaptea – micile taxe pe care le plătești când alegi să vezi lumea la preț de hostel, nu de hotel.`,
      `Într-una dintre nopți, într-un hostel din Chengdu, am dormit cu geamul deschis, la minus un grad afară. Eu îl închideam, o chinezoaică înfocată îl deschidea la loc.`,
      `Un tango absurd între frigul ei și frigul meu, între „mie mi-e prea cald” și „mie mi-au înghețat deja gândurile”.`,
      `Mă uitam la geam, la termometru și la respirația mea în aerul rece și mă întrebam, cu un râs amar: „Chiar asta ți-ai dorit, Mida?”`,
      `Fiecare pas afară era un mic război cu aerul. Mă strângeam în geacă, îmi băgam mâinile mai adânc în buzunare și îmi spuneam în gând: „Ai vrut China, Mida. Acum ai China. Asta e China!”`,
      `Dar dacă doar frigul ar fi fost problema…`,
  
      `### Lecția la care nu mă așteptam: când tehnologia îți întoarce spatele`,
      `China avea altă lecție pregătită pentru mine. Mai dură decât îmi imaginam.`,
      `Și totuși, înainte să ajung la lecția aceea mare, China m-a luat pe ocolite.`,
      `M-a trecut prin frig, tuse și prin focul mic al wok-urilor lor. Mâncarea lor picantă mi-a dat destule „senzații interioare” cât să nu le uit prea curând.`,
      `Genul acela de iuțeală care nu îți arde doar gura, ci îți reaprinde tot corpul din interior.`,
      `Mi-era foame, o foame de ceva ce nici măcar nu puteam defini. Farfurii aproape neatinse. Pentru ei, era „puțin picant”. Pentru mine? Infernul pe pământ.`,
      `Au fost seri în care stomacul meu protesta serios, în timp ce corpul încerca să adoarmă, doar ca să uite.`,
      `Râdeam singură, într-un efort de a „face haz de necaz”: „Dacă nu mă termină frigul și hostelurile, sigur o face chili-ul chinezesc.”`,
      `Dar nu era despre mâncare, nici despre temple sau mulțimea de oameni de pretutindeni. Era despre… conexiune.`,
  
      `Știam de restricțiile lor. Îmi instalasem VPN, eram liniștită. „Ce poate să fie atât de complicat?” mi-am zis, din confortul casei mamei mele, din România.`,
      `Răspuns scurt: TOTUL!`,
      `M-am trezit în cea mai dură perioadă tehnologică a vieții mele. Și nu exagerez.`,
      `Fiecare: mesaj, mail, postare, încercare de conectare… era un mic maraton spre nicăieri.`,
      `Laptopul? Inutilizabil. Nu a vrut nici mort să se conecteze la vreo rețea existentă.`,
      `Fiecare nouă zi, fiecare oraș nou îmi aducea exact același lucru: „Resend.”, „Retry.”, „No connection.”`,
      `De zeci de ori. Poate chiar mii…`,
      `Conexiunea ținea uneori trei minute, sau trei secunde… apoi se rupea. Fix când aveam senzația că „gata, merge”, apărea din nou micul mesaj care părea să-mi râdă în față.`,
      `Am vrut să renunț.`,
      `Mi-am imaginat biletul de retur, spre orice loc în care nu trebuie să te rogi la Wi-Fi ca la un zeu capricios.`,
      `Ajunsesem într-un punct foarte clar: ori rezist, ori cedez.`,
      `Dar știam. Nu era doar despre internet. Era despre: control, nevoia de a fi „la curent”, dependența de „a fi online” și frica de a nu „dispărea” dacă nu postez, nu răspund, nu apar.`,
  
      "### Când universul îți scoate din priză telefonul ca să-ți bagi sufletul înapoi",
      "Am rezistat. Dar nu în felul în care eram obișnuită să o fac.",
      "China mi-a adus pace. Dar nu pacea aceea zen, instagramabilă, cu cafele fierbinți și bambus în spate. Alt tip de pace.",
      "Mi-a adus înapoi ceva ce nu știam că pierdusem demult, în tumultul notificărilor și al scroll-ului: timp de reconectare cu mine, cu sufletul meu.",
      "Aveam timp și înainte, dar nu îl vedeam așa. Îl acopeream cu: scris, gândit, creație, inbox-uri, feed-uri și uneori cu mesaje la care „trebuie să răspund acum”.",
      "Când multe dintre lucrurile pe care le consideri „normale” dispar – acces constant la internet, aplicații familiare, ritmul tău obișnuit – ce rămâne?",
      "Rămâi tu, cu tine. Cu gândurile tale. Cu corpul tău, care simte frigul, oboseala, curiozitatea.",
      "Cu cerul de deasupra unui oraș pe care nu-l înțelegi, dar pe care îl simți.",
      "Pentru prima dată după mult timp: am mers mai mult pe jos fără să caut mereu semnal; m-am uitat mai mult la oameni, nu la ecran; am simțit mai clar ce îmi doresc, ce mă doare, ce mă bucură.",
      "China m-a forțat să desacelerez agresiv. Nu cu blândețe, nu cu un retreat de mindfulness, ci cu un „NO CONNECTION” rece, repetat, enervant.",
  
      "### În mijlocul deconectării, am decis să nu renunț",
      "Printre zecile de minute de „connect / reconnect”, am reușit totuși să am acces. Parțial. Limitat. Încet.",
      "Îmi lua și jumătate de oră să postez ceva pe social media. Un story. O poză. Câteva rânduri.",
      "Orice „normal” ar fi renunțat la un moment dat. Dar ceva în mine s-a încăpățânat.",
      "Nu era vorba despre algoritmi. Era vorba despre promisiunea pe care mi-o făcusem mie: „Vreau să duc cu mine poveștile astea, să le las undeva în lume.”",
      "Așa că am continuat. Frustrată. Înghețată. Enervată. Dar prezentă.",
      "Uneori, nici chef să scriu nu aveam. Nici măcar să deschid laptopul. Dar știam că… trebuie.",
      "Și, undeva între un resend și altul, am realizat că „ăsta e testul meu!”",
      "Nu să fiu „cea mai conectată”. Ci să văd cine sunt atunci când conexiunea externă se rupe.",
  
      "### Ce mi-a dat, de fapt, China",
      "China mi-a dat: frig care m-a trezit din inerție; limitări care m-au obligat să-mi văd dependențele; „no connection”-uri care m-au deconectat de la lume, ca să mă conectez cu mine.",
      "Și, peste toate, mi-a dat un alt fel de liniște.",
      "Liniștea de a ști că mă pot descurca și acolo unde nimic nu merge „ca acasă”.",
      "Că pot sta cu mine, fără să mă ascund după ecrane.",
      "Că pot alege să rămân, chiar și atunci când primul impuls e să fug.",
      "Uneori, cele mai mari visuri nu încep când le planifici. Încep într-un ecran care îți spune „NO CONNECTION”, într-un oraș înghețat, pe un continent care vorbește o altă limbă și într-o versiune de tine pe care încă n-ai cunoscut-o.",
      "China a fost, pentru mine, exact asta: țara în care s-au blocat aplicațiile și s-a deblocat ceva în mine.",
  
      "La un moment dat, nici eu nu știu exact când, am decis să nu scriu o carte întreagă despre China.",
      "Ar însemna probabil să mă plâng pe sute de pagini. Sute de pagini în care aș povesti mai mult despre cât am tușit, cât am înghețat și câte „No connection” am primit.",
      "Am decis altceva: să las China să trăiască aici, în mici jurnale de drum.",
      "În următoarele articole, o să te plimb prin Beijing, Xi’an, Chengdu, Chongqing, Zhangjiajie, Yangshuo și Hong Kong – așa cum au fost ele: imperfecte, reci, aglomerate și, cumva, absolut necesare pentru mine.",
      "Dacă ai ajuns până aici, spune-mi: tu unde ai trăit propriul tău „No Connection” – și ce ți-a deblocat în tine?"
    ]
  }
  
  
  // 🔒 MODEL INVIZIBIL – COPY/PASTE când adaugi articol nou.
  // Setează draft: false sau șterge proprietatea ca să devină vizibil.
  /*
  {
    draft: true,
    slug: "slug-ul-tau-aici",
    title: "Titlul articolului",
    excerpt: "Un scurt rezumat atrăgător (1–2 fraze).",
    date: "2025-11-05", // ISO: YYYY-MM-DD
    tags: ["categorie1", "categorie2"],
    cover: "assets/blog/IMAGINE.jpg", // 1200x630 recomandat
    minutes: 4, // opțional – dacă lipsește, se estimează automat
    content: [
      "Paragraful 1…",
      "Paragraful 2…",
      "Paragraful 3…"
    ]
  },
  */
];

export default posts;
