import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";

// endpoint Formspree
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mrbaajzn";

export default function Checkout() {
  const { items, total, clear } = useCart();

  const orderText = useMemo(() => {
    if (items.length === 0) return "Coș gol.";
    return items
      .map(
        (i) =>
          `${i.title} – ${i.format}${i.lang ? ` ${i.lang}` : ""} × ${i.qty} = ${
            i.price * i.qty
          } lei`
      )
      .join("\n");
  }, [items]);

  // ⚡ funcția Stripe
  const payWithCard = async () => {
    if (!items.length) return alert("Coșul este gol!");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect către Stripe
      } else {
        alert("Eroare la inițierea plății.");
      }
    } catch (e) {
      console.error(e);
      alert("A apărut o eroare.");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>Finalizare comandă</h1>

      {items.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <>
          <h3>Sumar produse</h3>
          <ul style={{ paddingLeft: 18 }}>
            {items.map((i) => (
              <li key={i.key}>
                {i.title} — {i.format}
                {i.lang ? ` ${i.lang}` : ""} × {i.qty} — {i.price * i.qty} lei
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: {total} lei</strong>
          </p>

          {/* 🟢 Buton Stripe */}
          <button
            type="button"
            onClick={payWithCard}
            style={{
              padding: "12px",
              borderRadius: 10,
              background: "#2a9d8f",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            💳 Plătește acum cu cardul (Stripe)
          </button>

          <form
            action={FORMSPREE_ENDPOINT}
            method="POST"
            style={{ display: "grid", gap: 10, marginTop: 16 }}
            onSubmit={() => setTimeout(clear, 1000)}
          >
            <input name="name" required placeholder="Nume complet" style={field} />
            <input name="email" type="email" required placeholder="Email" style={field} />
            <input name="phone" placeholder="Telefon (opțional)" style={field} />
            <textarea
              name="address"
              placeholder="Adresă (pentru paperback)"
              rows={3}
              style={field}
            />
            <textarea
              name="order"
              readOnly
              value={orderText}
              rows={Math.min(8, items.length + 3)}
              style={{ ...field, fontFamily: "monospace" }}
            />
            <input name="total" readOnly value={`${total} lei`} style={field} />
            <button
              type="submit"
              style={{
                padding: "12px",
                borderRadius: 10,
                background: "#2a9d8f",
                color: "#fff",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Trimite comanda (fără plată)
            </button>
          </form>
        </>
      )}
    </div>
  );
}

const field = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
};
