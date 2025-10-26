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
    colorVar: "--card3", // bej-roz; merge frumos cu tema
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

  // 3️⃣ BIBLIOTECA MIDAWAY
  {
    id: "biblioteca",
    emoji: "📚",
    title: "Biblioteca Midaway",
    tagline: "O colecție de cărți, jurnale și texte publicate.",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card1",
    categories: ["educatie", "nou"],
    badge: "Nou",
    badgeColor: "#E53935",
    body: [
      "Un loc unde cititorii pot descoperi fragmente, cumpăra volume și găsi inspirație.",
      "Construim o bibliotecă digitală și fizică pentru comunitate, cu acces gratuit la materiale selectate.",
    ],
    links: [
      { label: "Vezi cărțile", href: "/carti" },
      { label: "Contact", href: "/contact" },
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
    categories: ["evenimente"],
    badge: "În derulare",
    badgeColor: "#9C27B0",
    body: [
      "Workshopuri de scris, rezidențe creative și retreaturi în locuri care te așază pe interior.",
      "Program scurt, tihnă multă, exerciții de imaginație și o comunitate bună.",
    ],
    links: [
      { label: "Înscrie-te", href: "/voluntari" },
      { label: "Detalii & întrebări", href: "/contact" },
    ],
  },

  // 5️⃣ CONȚINUT MEDIA
  {
    id: "media",
    emoji: "🎥",
    title: "Conținut media",
    tagline: "Podcasturi, interviuri și minidocumentare.",
    cover:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card2",
    darkOnCard: true,
    categories: ["media"],
    badge: "Media",
    badgeColor: "#2196F3",
    body: [
      "Documentăm voci autentice din călătorii, educație alternativă și creație.",
      "Podcasturi, interviuri, clipuri scurte – povești din mersul lumii.",
    ],
    links: [
      { label: "Vezi Multimedia", href: "/multimedia" },
      { label: "Propune un invitat", href: "/contact" },
    ],
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
