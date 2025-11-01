// src/pages/Checkout.jsx
import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { BOOKS } from "../data/books";

// endpoint Formspree
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mrbaajzn";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [error, setError] = useState(null);

  // --- helperi pentru tipuri ---
  const isServiceItem = (it) =>
    String(it?.fulfillment || it?.format || "").toLowerCase() === "service";

  const isDigitalItem = (it) => {
    const f = String(it?.fulfillment || it?.format || "").toLowerCase();
    return f === "digital";
  };

  // --- flaguri coș ---
  const hasService = (items || []).some(isServiceItem);
  const hasDigital = (items || []).some(isDigitalItem);

  // --- verificăm fișiere doar pentru PRODUSE DIGITALE care există în BOOKS ---
const hasMissingFiles = (items || []).some((it) => {
  const isDigital =
    String(it?.fulfillment || it?.format || "").toLowerCase() === "digital";
  if (!isDigital) return false;

  const book = BOOKS.find((b) => b.id === it.id);
  if (!book) return false; // ⬅️ servicii (svc-*) sau item necunoscut: nu afișăm banner

  const fmt = String(it.format || "").toUpperCase();
  if (fmt === "PDF") return !book?.files?.PDF;
  if (fmt === "EPUB") return !book?.files?.EPUB;
  if (fmt === "AUDIOBOOK") return !book?.files?.AUDIOBOOK;
  return false;
});

// Banner doar dacă există cel puțin un digital cu fișiere lipsă
const showFilesWarning = hasMissingFiles;

  // consimțământ legal
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeDigital, setAgreeDigital] = useState(false);

  // buton Plătește activ doar când sunt bifate
  const canPay = agreeTerms && (!hasDigital || agreeDigital);

  // determină moneda din item sau (fallback) din books.js
  const currencyOf = (i) => {
    const direct = (i?.currency || "").toUpperCase();
    if (direct === "RON" || direct === "EUR") return direct;
    const b = BOOKS.find((x) => x.id === i?.id);
    return (b?.currency || "RON").toUpperCase();
  };

  const primaryCurrency = items.length ? currencyOf(items[0]) : "RON";

  const orderText = useMemo(() => {
    if (items.length === 0) return "Coș gol.";
    return items
      .map((i) => {
        const cur = currencyOf(i);
        return `${i.title} – ${i.format}${i.lang ? ` ${i.lang}` : ""} × ${
          i.qty
        } = ${i.price * i.qty} ${cur}`;
      })
      .join("\n");
  }, [items]);

  // Stripe
  const payWithCard = async () => {
    if (!items.length) return alert("Coșul este gol!");
    if (!canPay) {
      alert("Te rugăm să bifezi consimțământul legal înainte de plată.");
      return;
    }

    try {
      setError(null);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

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
        window.location.href = url;
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

          {/* mesaj informativ doar dacă există servicii în coș */}
          {hasService && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                border: "1px dashed #e6c200",
                background: "#fffbea",
                borderRadius: 10,
                color: "#5c4b00",
                fontSize: 13,
              }}
            >
              <strong>Servicii:</strong> programare & prestare în baza termenilor
              agreați. Politica de anulare:{" "}
              <a
                href="/politica-anulare"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#7a5b00" }}
              >
                vezi aici
              </a>
              .
            </div>
          )}

          {/* banner fișiere lipsă – doar pentru produse digitale */}
          {showFilesWarning && (
            <div
              style={{
                margin: "12px 0",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #f0b7b7",
                background: "#ffecec",
                color: "#a52828",
                fontSize: 14,
              }}
            >
              Momentan nu sunt disponibile fișiere pentru produsele selectate.
            </div>
          )}

          {/* banner eroare Stripe, dacă e cazul */}
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

          {/* consimțământ legal */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 12,
              background: "#fff",
            }}
          >
            <label style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span style={{ fontSize: 13, lineHeight: 1.4 }}>
                Sunt de acord cu{" "}
                <a
                  href="#/termeni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Termenii și condițiile
                </a>
                ,
                <a
                  href="#/politica-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Politica de cookies
                </a>{" "}
                și
                <a
                  href="#/politica-confidentialitate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Politica de confidențialitate
                </a>
                .
              </span>
            </label>

            {hasDigital && (
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <input
                  type="checkbox"
                  checked={agreeDigital}
                  onChange={(e) => setAgreeDigital(e.target.checked)}
                />
                <span style={{ fontSize: 13, lineHeight: 1.4 }}>
                  Sunt de acord cu începerea livrării digitale înainte de
                  expirarea termenului legal de retragere și înțeleg că îmi pierd
                  dreptul de retragere după descărcare. (
                  <a
                    href="#/politica-descarcare"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Detalii
                  </a>
                  )
                </span>
              </label>
            )}
          </div>

          {/* Buton Stripe */}
          <button
            type="button"
            onClick={payWithCard}
            disabled={!canPay}
            style={{
              padding: "12px",
              borderRadius: 10,
              background: "#2a9d8f",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 10,
              opacity: canPay ? 1 : 0.6,
            }}
          >
            💳 Plătește acum cu cardul (Stripe)
          </button>

          {/* Formular fallback (Formspree) */}
          <form
            action={FORMSPREE_ENDPOINT}
            method="POST"
            style={{ display: "grid", gap: 10, marginTop: 16 }}
            onSubmit={() => setTimeout(clear, 1000)}
          >
            <input type="text" name="_gotcha" style={{ display: "none" }} />
            <input
              type="hidden"
              name="_redirect"
              value="https://midaway.vercel.app/#/thanks"
            />
            <input
              type="hidden"
              name="agree_terms"
              value={agreeTerms ? "yes" : "no"}
            />
            <input
              type="hidden"
              name="agree_digital_waiver"
              value={agreeDigital ? "yes" : "no"}
            />

            <input name="name" required placeholder="Nume complet" style={field} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              style={field}
            />
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
