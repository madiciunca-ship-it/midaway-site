// src/components/CartDrawer.jsx
import React, { useEffect, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const { items, total, remove, clear } = useCart();

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
        <div
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid #eee",
          }}
        >
          <strong>Coș</strong>
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
            items.map((it, i) => (
              <div
                key={it.key ?? i}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <div style={{ fontWeight: 600 }}>{it.title}</div>
                <div style={{ fontSize: 13, color: "#666" }}>
                  {it.format}
                  {it.lang ? ` • ${it.lang}` : ""}
                </div>
                <div style={{ marginTop: 6 }}>
                  {it.price} lei × {it.qty}
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
                    Șterge
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
            ))
          )}
        </div>

        <div style={{ padding: 16, borderTop: "1px solid #eee" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <span>Total</span>
            <strong>
              {typeof total === "number" ? total.toFixed(2) : total} lei
            </strong>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
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
