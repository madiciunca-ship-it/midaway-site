// src/components/CartDrawerV2.jsx
import React, { useEffect, useCallback, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawerV2({ open, onClose }) {
  const { items, add, decrement, remove, clear } = useCart();

  // DEBUG: dacă nu vezi acest log în consolă când deschizi coșul, nu se încarcă componenta.
  console.log("CartDrawerV2 LOADED — items:", items.length);

  // Închidere la ESC
  const onKeyDown = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // Totaluri pe monedă
  const totalsByCurrency = useMemo(() => {
    const map = new Map();
    for (const i of items) {
      const cur = (i.currency || "RON").toUpperCase();
      const addVal = Number(i.price) * (Number(i.qty) || 1);
      map.set(cur, (map.get(cur) || 0) + addVal);
    }
    return Array.from(map.entries());
  }, [items]);

  const mixedCurrencies = totalsByCurrency.length > 1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: open ? "auto" : "none",
        zIndex: 1000,
      }}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: open ? "rgba(0,0,0,.25)" : "transparent",
          transition: "background .2s",
        }}
      />

      {/* drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Coș de cumpărături"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: 360,
          maxWidth: "90vw",
          background: "#fff",
          borderLeft: "1px solid #eee",
          boxShadow: "0 10px 30px rgba(0,0,0,.15)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .25s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* header */}
        <div
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid #eee",
            background: "#fff7e6", // marker vizual
          }}
        >
          <strong>🧺 Coș — V2 (± activ)</strong>
          <button
            type="button"
            onClick={onClose}
            style={{
              marginLeft: "auto",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
            }}
            aria-label="Închide coșul"
            title="Închide"
          >
            ✖
          </button>
        </div>

        {/* listă produse */}
        <div
          style={{
            padding: 16,
            flex: 1,
            overflowY: "auto",
            display: "grid",
            gap: 12,
          }}
        >
          {items.length === 0 ? (
            <div style={{ color: "#666" }}>Coșul este gol.</div>
          ) : (
            items.map((it, i) => {
              const cur = (it.currency || "RON").toUpperCase();
              const qty = Number(it.qty) || 1;
              const unit = Number(it.price) || 0;
              const sub = unit * qty;

              return (
                <div
                  key={it.key ?? i}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 12,
                    padding: 12,
                    background: "#fffef9",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{it.title}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>
                    {it.format}
                    {it.lang ? ` • ${it.lang}` : ""}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {/* controale cantitate */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => decrement(it.key)}
                        aria-label="Scade cantitatea"
                        style={qtyBtn}
                      >
                        −
                      </button>
                      <div style={{ minWidth: 28, textAlign: "center" }}>{qty}</div>
                      <button
                        type="button"
                        onClick={() => add(it)}
                        aria-label="Crește cantitatea"
                        style={qtyBtn}
                      >
                        +
                      </button>
                    </div>

                    {/* subtotal */}
                    <div style={{ marginLeft: "auto", fontSize: 14 }}>
                      {unit} {cur} / buc • <strong>{sub} {cur}</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => remove(it.key)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      🗑 Șterge
                    </button>
                    {it.payLink && (
                      <a
                        href={it.payLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "6px 10px",
                          borderRadius: 8,
                          background: "#2a9d8f",
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        Plătește acest produs
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* footer */}
        <div style={{ padding: 16, borderTop: "1px solid #eee" }}>
          {mixedCurrencies && (
            <div
              style={{
                marginBottom: 10,
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid #f3d2d2",
                background: "#fff0f0",
                color: "#b42318",
                fontSize: 12,
              }}
            >
              Ai produse în RON și EUR. Finalizează plățile pe rând.
            </div>
          )}

          <div style={{ display: "grid", gap: 6 }}>
            {totalsByCurrency.map(([cur, sum]) => (
              <div key={cur} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total ({cur})</span>
                <strong>{sum} {cur}</strong>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button
              type="button"
              onClick={clear}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Golește
            </button>
            <Link
              to="/checkout"
              onClick={onClose}
              style={{
                flex: 2,
                textAlign: "center",
                padding: "10px 12px",
                borderRadius: 10,
                background: "#d4a017",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Plasează comanda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  padding: "6px 10px",
  border: "1px solid #ddd",
  borderRadius: 8,
  background: "#fff",
  cursor: "pointer",
};
