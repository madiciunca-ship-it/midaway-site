import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom"; // pentru detectarea rutei /thanks

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
          ? state.items.map((it, i) =>
              i === idx ? { ...it, qty: (Number(it.qty) || 0) + (Number(item.qty) || 1) } : it
            )
          : [...state.items, { ...item, qty: Number(item.qty) || 1 }];
      const next = { ...state, items };
      save(next);
      return next;
    }

    case "INCREMENT": {
      const items = state.items.map((it) =>
        it.key === action.key ? { ...it, qty: (Number(it.qty) || 0) + 1 } : it
      );
      const next = { ...state, items };
      save(next);
      return next;
    }

    case "DECREMENT": {
      const items = state.items
        .map((it) =>
          it.key === action.key ? { ...it, qty: Math.max(0, (Number(it.qty) || 0) - 1) } : it
        )
        .filter((it) => (Number(it.qty) || 0) > 0); // scoate itemul dacă ajunge la 0
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
      add: ({ id, title, format, lang, price, payLink, currency }) => {
        // IMPORTANT: lang trebuie trimis corect din locul de add (ex. book.lang pentru EN)
        const safeLang = (lang || "RO").toUpperCase();
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
          currency: (currency || "RON").toUpperCase(),
        };
        dispatch({ type: "ADD", key, item });
      },
      increment: (key) => dispatch({ type: "INCREMENT", key }),
      decrement: (key) => dispatch({ type: "DECREMENT", key }),
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

/* golește coșul automat când ajungem pe pagina de mulțumire (#/thanks). */
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
