import React from "react";
import { useParams, Link } from "react-router-dom";

const TRAVELERS = {
  "nomad-bali": {
    title: "🏔️ Nomadul din Bali",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    content: `
Povestea unui nomad între oceane și linii de cod. Dimineți cu mango și apusuri pe scuter.
Cum arată o zi în care munca și libertatea sunt același loc?
    `,
    links: [{ label: "Instagram", url: "#" }],
  },
  "scriitoare-saigon": {
    title: "✍️ Scriitoarea din Saigon",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    content: `
Cafele negre, ploi calde, pagini scrise printre zgomote de oraș. 
Despre cum găsești liniștea într-o metropolă mereu trează.
    `,
    links: [{ label: "Substack", url: "#" }],
  },
  "calatoare-barca": {
    title: "🚤 Călătoarea cu barca",
    image:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1200&auto=format&fit=crop",
    content: `
Insule mici, vânt prieten bun, nopți pe ponton. 
O hartă lichidă a curajului de a porni la drum fără acoperiș.
    `,
    links: [{ label: "YouTube", url: "#" }],
  },
  "nomad-tokyo": {
    title: "Nomadul din Tokyo",
    intro: "Între zgârie-nori și temple ascunse...",
    content: `
  Tokyo nu e doar o metropolă — e un haos ordonat unde te poți pierde
  fără frică. Între lumini de neon și grădini zen, am descoperit că
  ritmul vieții poate fi simultan frenetic și meditativ.
    
  Trenurile sosesc la secundă, dar poveștile oamenilor se scriu în tăceri lungi.
  Tokyo e despre contrast — și exact acolo se naște frumusețea.
    `,
    links: [
      { label: "Instagram", url: "https://instagram.com/exemplu" },
      { label: "YouTube", url: "https://youtube.com/exemplu" },
    ],
  },
  
};

export default function TravelerDetail() {
  const { id } = useParams();
  const t = TRAVELERS[id];

  if (!t) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Povestea nu există</h2>
        <p><Link to="/calatori">← Înapoi la Călători</Link></p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <p style={{ margin: 0 }}>
        <Link to="/calatori" style={{ textDecoration: "none" }}>
          ← Înapoi la Călători
        </Link>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 360px) 1fr", gap: 24, marginTop: 12 }}>
        <div style={{ borderRadius: 12, overflow: "hidden", background: "#f3f3f3", border: "1px solid #eee", aspectRatio: "4/5" }}>
          <img src={t.image} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <h1 style={{ margin: "0 0 8px 0" }}>{t.title}</h1>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#333" }}>{t.content}</div>
          {t.links?.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {t.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", color: "#111", textDecoration: "none" }}
                >
                  🔗 {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
