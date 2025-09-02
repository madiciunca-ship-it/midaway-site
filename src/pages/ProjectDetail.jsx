import React from "react";
import { useParams, Link } from "react-router-dom";

const PROJECTS = {
  biblioteca: {
    title: "📚 Biblioteca Midaway",
    content: `
O colecție de cărți, jurnale și texte publicate. 
Un loc unde cititorii pot descoperi fragmente, cumpăra volume și găsi inspirație.
    `,
  },
  erasmus: {
    title: "🌍 Erasmus+",
    content: `
Proiecte educaționale și culturale în parteneriat internațional. 
Midaway participă la schimburi de experiență și dezvoltă proiecte pentru tineri.
    `,
  },
  media: {
    title: "🎥 Conținut media",
    content: `
Documentare, podcasturi și materiale video care spun povești reale. 
Proiectele media sunt gândite să aducă lumea mai aproape de tine.
    `,
  },
  editura: {
    title: "✍️ Editura Midaway",
    content: `
Un spațiu de publicare pentru autori independenți și texte inovatoare. 
Aici se nasc volume noi și colecții speciale.
    `,
  },
  evenimente: {
    title: "🧭 Evenimente & Retreaturi",
    content: `
Întâlniri culturale, workshopuri și retreaturi dedicate scrisului și explorării. 
O oportunitate de a cunoaște oameni și povești noi.
    `,
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS[id];

  if (!project) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Proiectul nu există</h2>
        <p>
          <Link to="/proiecte">← Înapoi la proiecte</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <p style={{ fontSize: 14, margin: 0 }}>
        <Link to="/proiecte">← Înapoi la proiecte</Link>
      </p>
      <h1 style={{ margin: "8px 0 16px 0" }}>{project.title}</h1>
      <div style={{ lineHeight: 1.7, color: "#333", whiteSpace: "pre-line" }}>
        {project.content}
      </div>
    </div>
  );
}
