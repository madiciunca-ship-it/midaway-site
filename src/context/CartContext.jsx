import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom"; // ✅ nou: pentru detectarea rutei /thanks

const CartContext = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem("midaway_cart");
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}
function save(state) {
  try {
    localStorage.setItem("midaway_cart", JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { key, item } = action;
      const idx = state.items.findIndex((i) => i.key === key);
      const items =
        idx >= 0
          ? state.items.map((it, i) => (i === idx ? { ...it, qty: it.qty + item.qty } : it))
          : [...state.items, item];
      const next = { ...state, items };
      save(next);
      return next;
    }
    case "REMOVE": {
      const items = state.items.filter((i) => i.key !== action.key);
      const next = { ...state, items };
      save(next);
      return next;
    }
    case "CLEAR": {
      const next = { items: [] };
      save(next);
      return next;
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, load);

  const total = useMemo(
    () => state.items.reduce((s, i) => s + Number(i.price || 0) * Number(i.qty || 0), 0),
    [state.items]
  );

  const count = useMemo(
    () => state.items.reduce((s, i) => s + Number(i.qty || 0), 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      total,
      count,
      add: ({ id, title, format, lang, price, payLink }) => {
        const safeLang = lang || "RO";
        const key = [id, format, safeLang].join("|");
        const item = {
          key,
          id,
          title,
          format,
          lang: safeLang,
          price: Number(price || 0),
          qty: 1,
          payLink,
        };
        dispatch({ type: "ADD", key, item });
      },
      remove: (key) => dispatch({ type: "REMOVE", key }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, total, count]
  );

  useEffect(() => {}, []);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* ✅ Nou: golește coșul automat când ajungem pe pagina de mulțumire (#/thanks).
   - Funcționează cu HashRouter: useLocation().pathname === "/thanks".
   - Are fallback și pe window.location.hash === "#/thanks".
*/
export function ClearCartOnThanks() {
  const { clear, count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const isThanks =
      location?.pathname === "/thanks" || window.location.hash === "#/thanks";
    if (isThanks && count > 0) {
      clear();
    }
  }, [location, clear, count]);

  return null;
}
