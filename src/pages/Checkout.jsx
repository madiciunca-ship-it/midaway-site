import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, total, clear } = useCart();

  const orderText = useMemo(() => {
    if (items.length === 0) return "Coș gol.";
    return items.map(i => `${i.title} – ${i.format}${i.lang ? ` ${i.lang}` : ""} × ${i.qty} = ${i.price * i.qty} lei`).join("\n");
  }, [items]);

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>Finalizare comandă</h1>

      {items.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <>
          <h3>Sumar produse</h3>
          <ul style={{ paddingLeft: 18 }}>
            {items.map(i => (
              <li key={i.key}>{i.title} — {i.format}{i.lang ? ` ${i.lang}` : ""} × {i.qty} — {i.price * i.qty} lei</li>
            ))}
          </ul>
          <p><strong>Total: {total} lei</strong></p>

          {/* Formspree: înlocuiește cu endpointul tău */}
          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            style={{ display: "grid", gap: 10, marginTop: 16 }}
            onSubmit={() => setTimeout(clear, 1000)}
          >
            <input name="name" required placeholder="Nume complet" style={field} />
            <input name="email" type="email" required placeholder="Email" style={field} />
            <input name="phone" placeholder="Telefon (opțional)" style={field} />
            <textarea name="address" placeholder="Adresă (pentru paperback)" rows={3} style={field} />

            {/* atașăm sumarul comenzii */}
            <textarea name="order" readOnly value={orderText} rows={Math.min(8, items.length + 3)} style={{ ...field, fontFamily: "monospace" }} />
            <input name="total" readOnly value={`${total} lei`} style={field} />

            <button type="submit" style={{ padding: "12px", borderRadius: 10, background: "#2a9d8f", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
              Trimite comanda
            </button>
          </form>

          <p style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
            După trimitere, îți confirmăm pe email și primești instrucțiunile de plată (sau link-urile directe, dacă alegi să plătești separat pe produse).
          </p>
        </>
      )}
    </div>
  );
}

const field = { padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd" };
