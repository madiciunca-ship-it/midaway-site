// src/pages/Servicii.jsx
import React from "react";
import { SERVICES } from "../data/services";
import { useCart } from "../context/CartContext";

function money(n, cur="RON"){
  const v = Number(n) || 0;
  return cur.toUpperCase() === "EUR" ? `€${v}` : `${v} RON`;
}

export default function Servicii() {
  const { add } = useCart();

  const addService = (s) => {
    add({
      id: `service-${s.id}`,
      title: s.title,
      format: "Serviciu",
      lang: null,
      price: s.price,
      currency: (s.currency || "RON").toUpperCase(),
      qty: 1,
      image: null,
      fulfillment: "service",    // 👈 important pentru checkout
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0, textAlign: "center" }}>Servicii</h1>
      <p style={{ textAlign: "center", opacity: .8, maxWidth: 760, margin: "0 auto 16px" }}>
        Alege serviciul potrivit pentru etapa ta: consultanță, design, publicare. 
        Programarea și prestarea se fac conform <a href="/politica-anulare">Politicii de anulare</a>.
      </p>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {SERVICES.map((s) => {
          const avail = !!s.available;
          return (
            <div
              key={s.id}
              style={{
                border: "1px solid #e7e7e7",
                borderRadius: 16,
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,.06)",
                padding: 16,
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
                {!avail && (
                  <span style={{ fontSize: 11, background: "#eee", borderRadius: 999, padding: "2px 8px" }}>
                    în curând
                  </span>
                )}
              </div>

              <p style={{ margin: 0, color: "#555" }}>{s.short}</p>
              <div style={{ fontWeight: 700, color: "#2a9d8f" }}>
                {money(s.price, s.currency)} {s.duration ? `• ${s.duration}` : ""}
              </div>

              {Array.isArray(s.features) && s.features.length > 0 && (
                <ul style={{ margin: "2px 0 0 16px", color: "#555" }}>
                  {s.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              )}

              <button
                disabled={!avail}
                onClick={() => addService(s)}
                style={{
                  marginTop: 8,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: avail ? "#2a9d8f" : "#e5e5e5",
                  color: avail ? "#fff" : "#666",
                  fontWeight: 700,
                  cursor: avail ? "pointer" : "not-allowed",
                }}
              >
                {avail ? "Adaugă în coș" : "în curând"}
              </button>

              <div style={{ fontSize: 12, color: "#777" }}>
                Fereastră anulare: {s.cancellationWindowHours || 24}h • 
                <a href="/politica-anulare" style={{ marginLeft: 6 }}>politica</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
