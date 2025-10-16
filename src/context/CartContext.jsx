// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useLocation } from "react-router-dom";

const CartContext = createContext(null);

// ——— localStorage
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

// ——— reducer
function cartReducer(state, action) {
  console.log("[CART] action =", action.type, action);
  switch (action.type) {
    case "ADD": {
      const { key, item } = action;
      const idx = state.items.findIndex((i) => i.key === key);

      let items;
      if (idx >= 0) {
        const nextQty =
          (Number(state.items[idx]?.qty) || 0) + (Number(item.qty) || 1);
        console.log("[CART] ADD → idx:", idx, "nextQty:", nextQty);
        items = state.items.map((it, i) =>
          i === idx ? { ...it, qty: nextQty } : it
        );
      } else {
        const nextQty = Number(item.qty) || 1;
        console.log("[CART] ADD new item → qty:", nextQty);
        items = [...state.items, { ...item, qty: nextQty }];
      }

      const next = { ...state, items };
      save(next);
      return next;
    }

    case "DECREMENT": {
      console.log("[CART] DECREMENT key =", action.key);
      const items = state.items
        .map((it) =>
          it.key === action.key
            ? { ...it, qty: Math.max(0, (Number(it.qty) || 0) - 1) }
            : it
        )
        .filter((it) => (Number(it.qty) || 0) > 0);
      const next = { ...state, items };
      save(next);
      return next;
    }

    case "REMOVE": {
      console.log("[CART] REMOVE key =", action.key);
      const items = state.items.filter((i) => i.key !== action.key);
      const next = { ...state, items };
      save(next);
      return next;
    }

    case "CLEAR": {
      console.log("[CART] CLEAR");
      const next = { items: [] };
      save(next);
      return next;
    }

    default:
      return state;
  }
}

// ——— provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, load);

  const total = useMemo(
    () =>
      state.items.reduce(
        (s, i) => s + Number(i.price || 0) * Number(i.qty || 0),
        0
      ),
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
      decrement: (key) => dispatch({ type: "DECREMENT", key }),
      remove: (key) => dispatch({ type: "REMOVE", key }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, total, count]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* ✅ golește coșul automat pe /thanks (HashRouter compatibil) */
export function ClearCartOnThanks() {
  const { clear, count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const isThanks =
      location?.pathname === "/thanks" ||
      window.location.hash === "#/thanks";
    if (isThanks && count > 0) clear();
  }, [location, clear, count]);

  return null;
}
