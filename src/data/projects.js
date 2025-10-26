// src/data/projects.js
const projects = [
  // 1️⃣ EDITURA MIDAWAY — prima
  {
    id: "editura",
    title: "Editura Midaway",
    emoji: "✍️",
    // ce tab-uri să prindă în /proiecte
    categories: ["nou", "educatie", "editura"],
    // tema vizuală
    colorVar: "--card3",
    darkOnCard: false,
    // ✅ hero & card
    cover:
      "https://images.unsplash.com/photo-1491841651911-c44c30c34548?q=80&w=1600&auto=format&fit=crop",
    // text scurt sub titlu (și în hero)
    tagline: "Cărți independente — din real, spre ficțiune.",
    // conținut detaliu (paragrafe)
    body: [
      "Publicăm jurnale de drum, eseuri, proză scurtă și traduceri din culturile întâlnite.",
      "Ne interesează literatura vie: texte care nasc dialog, curaj și apropiere. Fiecare carte e făcută cu grijă — de la editare la tipar — pentru a rămâne.",
      "• Ce publicăm: jurnale de drum & memorii; eseuri & literatură de idei; proză scurtă & nonficțiune narativă; traduceri selectate din spații „mai puțin cartografiate”.",
      "• Cum lucrăm: curatoriere atentă și editare îngrijită; design tipografic clar, hârtie bună, tiraje sustenabile; tipărire locală, atenție la detaliul material; respect pentru autor — contract corect, transparență, promovare.",
      "Colecții: Jurnale de drum (călătorii care schimbă viața) • Eseuri din mers (idei care luminează prezentul) • Ficțiune vie (proză scurtă care respiră).",
    ],
    // butoanele din footer-ul paginii de detaliu
    links: [
      { label: "Explorează cărțile", href: "/carti" },
      { label: "Trimite manuscris", href: "/contact?subject=Manuscris" },
    ],
    // inscripția „Nou”
    badge: "Nou",
    badgeColor: "#E53935",
  },

  // 2️⃣ AUTORI MIDAWAY — în locul Erasmus
  {
    id: "autori",
    emoji: "✒️",
    title: "Autori Midaway",
    tagline: "Vocile independente care scriu lumea.",
    cover:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card2", // teal (text alb)
    categories: ["educatie", "nou"], // apare la „Educație” și „Nou”
    badge: "Nou",
    badgeColor: "#E53935",
    body: [
      "„Autori Midaway” este locul în care vocea fiecărui scriitor capătă formă. Căutăm texte vii, oneste, care îndrăznesc să privească lumea din unghiuri reale.",
      "Publicăm autori la început de drum și scriitori consacrați, atât timp cât ceea ce scriu este viu, curajos și cu rost.",
      "• Ce oferim autorilor: editor dedicat, feedback onest, proces editorial clar, design tipografic atent, tiraje sustenabile și promovare integrată.",
      "• Ce căutăm: jurnale de drum, memorii, eseuri, proză scurtă, nonficțiune narativă – texte care nasc dialog și apropiere.",
      "Dacă vrei să ni te alături, trimite-ne un manuscris sau o propunere. Spune-ne de ce este important pentru tine să fie publicat acum.",
    ],
    links: [
      { label: "Vezi cărțile autorilor", href: "/carti" },
      { label: "Devino autor Midaway", href: "/contact?subject=Autor%20nou" },
      { label: "Interviuri & media", href: "/multimedia" },
    ],
  },

  // 3️⃣ BIBLIOTECA MIDAWAY — actualizată
  {
    id: "biblioteca",
    emoji: "📚",
    title: "Biblioteca Midaway",
    tagline: "Un loc unde cărțile se întorc spre comunitate.",
    cover:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card1",
    categories: ["educatie", "nou"],
    badge: "Nou",
    badgeColor: "#E53935",
    body: [
      "Biblioteca Midaway nu este doar o arhivă. O gândim ca spațiu viu de lectură — digital și fizic — unde textele circulă, iar cititorii se întâlnesc.",
      "Construim o bibliotecă digitală cu fragmente, eseuri și selecții cu acces liber. La acestea adăugăm materiale bonus și recomandări curatoriate.",
      "Pregătim și o sală de lectură fizică (în curând), cu întâlniri tematice și rafturi deschise atunci când ești în trecere prin oraș.",
      "Cum poți contribui: propune titluri, donează exemplare pentru raftul comun sau spune-ne ce ți-ar plăcea să citești în continuare.",
    ],
    links: [
      { label: "Vezi cărțile", href: "/carti" },
      { label: "Fragmente & lecturi", href: "/blog" },
      {
        label: "Propune un titlu",
        href: "/contact?subject=Propunere%20Biblioteca%20Midaway",
      },
    ],
  },

  // 4️⃣ EVENIMENTE & RETREATURI
  {
    id: "evenimente",
    emoji: "🧭",
    title: "Evenimente & Retreaturi",
    tagline: "Spații pentru scris, respirație și întâlniri vii.",
    cover:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card1",
    categories: ["evenimente", "educatie"],
    badge: "În curând",
    badgeColor: "#FF9800",
    body: [
      "Evenimentele Midaway adună oameni care scriu, citesc și trăiesc aproape de sensul lucrurilor. Fiecare retreat este o pauză de respirație — un loc unde tăcerea lucrează, iar cuvintele încep să curgă.",
      "Organizăm workshopuri de scris, întâlniri cu autorii, discuții deschise despre cărți și procesul creativ. Fiecare participant devine parte dintr-un cerc viu de învățare și explorare.",
      "Rezidențele creative Midaway oferă timp, spațiu și tihnă pentru scriitori aflați în lucru. Fiecare ediție are o temă, un loc inspirant și o comunitate mică, dar intensă.",
      "Programul este scurt, atent construit: exerciții de imaginație, plimbări, conversații, reflecții. E un mod de a te întoarce la scris, dar și la tine însuți.",
      "Toate evenimentele Midaway sunt gândite în spiritul editurii — autentic, simplu și profund uman."
    ],
    links: [
      { label: "Vezi calendarul", href: "/evenimente" },
      { label: "Înscrie-te la următorul retreat", href: "/contact?subject=Retreat%20Midaway" },
      { label: "Propune un workshop", href: "/contact?subject=Propunere%20Workshop" }
    ]
  },

  // 5️⃣ CONȚINUT MEDIA
  {
    id: "media",
    emoji: "🎙️",
    title: "Conținut Media",
    tagline: "Podcasturi, interviuri și minidocuri despre oameni și povești.",
    cover:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card2",
    darkOnCard: true,
    categories: ["media", "educatie"],
    badge: "Media",
    badgeColor: "#2196F3",
    body: [
      "Secțiunea Media Midaway adună voci, imagini și idei din jurul cărților și al oamenilor care le dau viață. Este locul unde poveștile se aud, se văd și se simt altfel.",
      "Realizăm podcasturi, interviuri și minidocumentare despre scris, călătorii, procesul editorial și tot ce se întâmplă în culisele unei edituri independente.",
      "Invităm autorii Midaway, traducători, artiști, dar și oameni din comunitatea noastră — cititori, prieteni, colaboratori — să vorbească despre sens, curaj și creație.",
      "Veți găsi aici fragmente audio, discuții relaxate și filmări din timpul retreaturilor sau al lansărilor de carte. Tot conținutul este creat intern, cu grijă și sinceritate.",
      "Scopul nostru e simplu: să dăm mai departe energia din spatele fiecărei povești și să creăm un spațiu unde cultura respiră firesc, fără zgomot."
    ],
    links: [
      { label: "Vezi podcasturile & interviurile", href: "/multimedia" },
      { label: "Abonează-te la canalul Midaway", href: "/blog" },
      { label: "Propune un invitat sau subiect", href: "/contact?subject=Propunere%20Media" }
    ]
  },

  // 6️⃣ IMPLICĂ-TE (fost „Susține”)
  {
    id: "sustinere",
    emoji: "🤝",
    title: "Susține Midaway",
    tagline: "Abonamente & donații pentru materiale și impact real.",
    cover:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card4",
    categories: ["sustinere"],
    badge: "În curând",
    badgeColor: "#FF9800",
    body: [
      "Devino parte din povestea Midaway și primește acces la materiale exclusive: fragmente în premieră, ebook-uri cadou, jurnal de proiecte și întâlniri online.",
      "Pachete dedicate pentru persoane fizice și instituții (biblioteci, centre culturale): licență de folosire pentru materiale, invitații la lansări și beneficii speciale.",
      "Transparență totală: publicăm periodic raportul de impact și direcțiile în care merg resursele.",
    ],
    links: [
      {
        label: "Înscrie-mă pe lista de interes",
        href: "/contact?subject=Abonamente%20Midaway",
      },
      { label: "Detalii abonamente", href: "/proiecte/sustinere#planuri" },
      { label: "Sponsorizări (PF & PJ)", href: "/sponsorizari" },
    ],
  },
];

export default projects;
