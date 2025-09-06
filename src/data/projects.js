// src/data/projects.js
const projects = [
  {
    id: "biblioteca",
    emoji: "📚",
    title: "Biblioteca Midaway",
    tagline: "O colecție de cărți, jurnale și texte publicate.",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card1",                 // auriu cald
    categories: ["educatie", "nou"],
    badge: "Nou",
    badgeColor: "#E53935",
    body: [
      "Un loc unde cititorii pot descoperi fragmente, cumpăra volume și găsi inspirație.",
      "Construim o bibliotecă digitală și fizică pentru comunitate, cu acces gratuit la materiale selectate."
    ],
    links: [
      { label: "Vezi cărțile", href: "/carti" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    id: "erasmus",
    emoji: "🌍",
    title: "Erasmus+",
    tagline: "Proiecte educaționale și culturale în parteneriat internațional.",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card3",                // bej-roz
    categories: ["educatie"],
    badge: "Educație",
    badgeColor: "#4CAF50",
    body: [
      "Midaway participă la schimburi de experiență și dezvoltă proiecte pentru tineri.",
      "Învățare non-formală, mobilități, comunități internaționale și storytelling aplicat."
    ],
    links: [
      { label: "Aplică voluntar", href: "/voluntari" },
      { label: "Întreabă-ne", href: "/contact" }
    ]
  },
  {
    id: "media",
    emoji: "🎥",
    title: "Conținut media",
    tagline: "Podcasturi, interviuri și minidocumentare.",
    cover:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card2",                // teal (text alb)
    darkOnCard: true,
    categories: ["media"],
    badge: "Media",
    badgeColor: "#2196F3",
    body: [
      "Documentăm voci autentice din călătorii, educație alternativă și creație.",
      "Podcasturi, interviuri, clipuri scurte – povești din mersul lumii."
    ],
    links: [
      { label: "Vezi Multimedia", href: "/multimedia" },
      { label: "Propune un invitat", href: "/contact" }
    ]
  },
  {
    id: "editura",
    emoji: "✍️",
    title: "Editura Midaway",
    tagline: "Cărți independente – din real, spre ficțiune.",
    cover:
      "https://images.unsplash.com/photo-1491841651911-c44c30c34548?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card3",                // bej-roz
    categories: ["educatie", "nou"],
    badge: "Nou",
    badgeColor: "#E53935",
    body: [
      "Publicăm jurnale de drum, eseuri, proză scurtă și traduceri din culturile explorate.",
      "Model editorial curat, tiraje sustenabile, atenție la obiectul carte."
    ],
    links: [
      { label: "Explorează cărțile", href: "/carti" },
      { label: "Trimite manuscris", href: "/contact" }
    ]
  },
  {
    id: "evenimente",
    emoji: "🧭",
    title: "Evenimente & Retreaturi",
    tagline: "Spații pentru scris, respirație și întâlniri vii.",
    cover:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card1",                // auriu cald
    categories: ["evenimente"],
    badge: "În derulare",
    badgeColor: "#9C27B0",
    body: [
      "Workshopuri de scris, rezidențe creative și retreaturi în locuri care te așază pe interior.",
      "Program scurt, tihnă multă, exerciții de imaginație și o comunitate bună."
    ],
    links: [
      { label: "Înscrie-te", href: "/voluntari" },
      { label: "Detalii & întrebări", href: "/contact" }
    ]
  },

  /* Card #6 */
  {
    id: "sustinere",
    emoji: "🤝",
    title: "Susține Midaway",
    tagline: "Abonamente & donații pentru materiale și impact real.",
    cover:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    colorVar: "--card4",                // piersică/terracotta light – se potrivește vizual
    categories: ["sustinere"],
    badge: "În curând",
    badgeColor: "#FF9800",
    body: [
      "Devino parte din povestea Midaway și primește acces la materiale exclusive: fragmente în premieră, ebook-uri cadou, jurnal de proiecte și întâlniri online.",
      "Pachete dedicate pentru persoane fizice și instituții (biblioteci, centre culturale): licență de folosire pentru materiale, invitații la lansări și beneficii speciale.",
      "Transparență totală: publicăm periodic raportul de impact și direcțiile în care merg resursele."
    ],
    links: [
      { label: "Înscrie-mă pe lista de interes", href: "/contact?subject=Abonamente%20Midaway" },
      { label: "Detalii abonamente", href: "/proiecte/sustinere" },
      { label: "Sponsorizări (PF & PJ)", href: "/sponsorizari" } // ⬅️ extra CTA
    ]    
  }
];

export default projects;
