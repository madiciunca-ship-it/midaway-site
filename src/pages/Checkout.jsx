import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

// endpoint Formspree
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mrbaajzn";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [error, setError] = useState(null); // 🟢 pentru mesajele din server (409 etc.)

  const currencyOf = (i) =>
    (i?.currency || "").toUpperCase() === "EUR" ? "EUR" : "RON";

  const primaryCurrency = items.length ? currencyOf(items[0]) : "RON";

  const orderText = useMemo(() => {
    if (items.length === 0) return "Coș gol.";
    return items
      .map((i) => {
        const cur = currencyOf(i);
        return `${i.title} – ${i.format}${
          i.lang ? ` ${i.lang}` : ""
        } × ${i.qty} = ${i.price * i.qty} ${cur}`;
      })
      .join("\n");
  }, [items]);

  // ⚡ funcția Stripe
  const payWithCard = async () => {
    if (!items.length) return alert("Coșul este gol!");
    try {
      setError(null); // resetăm erorile anterioare

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      // 🟠 coș mixt RON/EUR → mesaj clar
      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        setError(
          data?.error ||
            "Finalizează separat comenzile pentru RON (RO) și EUR (EN)."
        );
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "A apărut o eroare la inițierea plății.");
        return;
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url; // redirect către Stripe
      } else {
        setError("Nu am primit URL-ul de plată de la Stripe.");
      }
    } catch (e) {
      console.error(e);
      setError("A apărut o eroare de rețea.");
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
                {i.lang ? ` ${i.lang}` : ""} × {i.qty} — {i.price * i.qty}{" "}
                {currencyOf(i)}
              </li>
            ))}
          </ul>
          <p>
            <strong>
              Total: {total} {primaryCurrency}
            </strong>
          </p>

          {/* 🟢 banner eroare, dacă e cazul */}
          {error && (
            <div
              style={{
                margin: "12px 0",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #f3d2d2",
                background: "#fff0f0",
                color: "#b42318",
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

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
            {/* anti-spam + redirect după submit */}
            <input type="text" name="_gotcha" style={{ display: "none" }} />
            <input
              type="hidden"
              name="_redirect"
              value="https://midaway.vercel.app/#/thanks"
            />

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
            <input
              name="total"
              readOnly
              value={`${total} ${primaryCurrency}`}
              style={field}
            />
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
