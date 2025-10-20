// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useLocation } from "react-router-dom";

/* -------------------- persist in localStorage -------------------- */
const STORAGE_KEY = "midaway_cart";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

/* ----------------------------- context --------------------------- */
const CartContext = createContext(null);

/* ----------------------------- reducer --------------------------- */
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { key, item } = action;
      const idx = state.items.findIndex((i) => i.key === key);

      const items =
        idx >= 0
          ? state.items.map((it, i) =>
              i === idx
                ? { ...it, qty: (Number(it.qty) || 0) + (Number(item.qty) || 1) }
                : it
            )
          : [
              ...state.items,
              {
                ...item,
                qty: Number(item.qty) || 1,
              },
            ];

      const next = { ...state, items };
      save(next);
      return next;
    }

    case "DECREMENT": {
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

/* ---------------------------- provider --------------------------- */
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

      // ✅ primește image, currency, lang etc.
      add: ({ id, title, format, lang, price, payLink, currency, image }) => {
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
          payLink: payLink || null,
          currency: (currency || "RON").toUpperCase(),
          image: image || null, // 👈 FIX: folosim parametrul "image", nu "cover"
        };
        console.log("[CART] add() call:", item);
        dispatch({ type: "ADD", key, item });
      },

      decrement: (key) => dispatch({ type: "DECREMENT", key }),
      remove: (key) => dispatch({ type: "REMOVE", key }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, total, count]
  );

  useEffect(() => {
    // console.log("[cart] items:", state.items);
  }, [state.items]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

/* ----------------------------- hook ------------------------------ */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* ------------------ clear cart pe pagina de thanks --------------- */
export function ClearCartOnThanks() {
  const { clear } = useCart();
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    // folosim HashRouter → "thanks" vine în hash (ex: "#/thanks")
    const atThanks =
      (hash && hash.includes("thanks")) ||
      (pathname && pathname.endsWith("/thanks"));

    if (atThanks) {
      const key = "midaway:cart-cleared-on-thanks";
      if (!sessionStorage.getItem(key)) {
        clear();
        sessionStorage.setItem(key, "1");
        console.log("[CART] Cleared on thanks page");
      }
    } else {
      sessionStorage.removeItem("midaway:cart-cleared-on-thanks");
    }
  }, [clear, pathname, hash]);

  return null;
}
