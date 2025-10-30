// src/data/posts.js
// Structură: fiecare post are slug (unic), titlu, excerpt, date ISO, tags, cover, minutes, content (array de paragrafe)

const posts = [
  {
    slug: "cum-a-inceput-calatoria-mea",
    title: "Cum a început călătoria mea",
    excerpt:
      "Povestea startului: primele zile, primele decizii, primul pas în necunoscut.",
    date: "2025-01-15",
    tags: ["călătorii", "jurnal"],
    cover:
      "assets/blog/blog-1.jpg",
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
    date: "2025-02-10",
    tags: ["proiecte", "scris"],
    cover:
      "assets/blog/blog-2.jpg",
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
    date: "2025-03-02",
    tags: ["proiecte", "scris"],
    cover:
      "assets/blog/blog-3.jpg",
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
  }
];

export default posts;
