// src/data/projects.js
const projects = [
    {
      id: "biblioteca",
      emoji: "📚",
      title: "Biblioteca Midaway",
      tagline: "O colecție de cărți, jurnale și texte publicate.",
      cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
      colorVar: "--card1", // bejul cald (ca pe Home)
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
      colorVar: "--card3", // bej-roz (cald)
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
      colorVar: "--card2", // teal (ca pe cardul Blog)
      darkOnCard: true,     // cardul devine cu text alb
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
      colorVar: "--card3",
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
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop", // <— nou
        colorVar: "--card1",
        body: [
          "Workshopuri de scris, rezidențe creative și retreaturi în locuri care te așază pe interior.",
          "Program scurt, tihnă multă, exerciții de imaginație și o comunitate bună."
        ],
        links: [
          { label: "Înscrie-te", href: "/voluntari" },
          { label: "Detalii & întrebări", href: "/contact" }
        ]
      }      
  ];
  
  export default projects;
  