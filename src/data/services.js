// src/data/services.js
export const SERVICES = [
    {
      id: "consultanta-editoriala",
      title: "Consultanță editorială (60 min)",
      short: "Sesiune 1:1 – structură, flow, public-țintă, strategie publicare.",
      price: 250,
      currency: "RON",
      duration: "60 min",
      cancellationWindowHours: 24,      // pentru politică
      features: [
        "call pe Zoom/Google Meet",
        "feedback pe sinopsis / structură",
        "recomandări concrete următorii pași"
      ],
      available: true,
    },
    {
      id: "design-coperta",
      title: "Design copertă",
      short: "Concept + machetă finală pentru eBook & Paperback.",
      price: 900,
      currency: "RON",
      duration: "livrare 5-10 zile",
      cancellationWindowHours: 48,
      features: [
        "2 concepte inițiale",
        "2 runde revizii",
        "fișiere finale pentru eBook & print"
      ],
      available: true,
    },
    {
      id: "publicare-distributie",
      title: "Publicare & distribuție (KDP)",
      short: "Setare cont, formatare, încărcare, optimizare pagină Amazon.",
      price: 0,
      currency: "RON",
      duration: "livrare 7-14 zile",
      cancellationWindowHours: 48,
      features: [
        "formatare eBook/paperback",
        "optimizare descriere & categorii",
        "încărcare în KDP + verificări"
      ],
      available: false, // afișăm „în curând”
    },
  ];
  