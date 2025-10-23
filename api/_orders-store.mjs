// /api/_orders-store.mjs
import { put } from "@vercel/blob";

const FILE = "orders.json";

// ⚠️ Hostul public al Blob-ului (setează în Vercel → Environment Variables)
// Exemplu de valoare: https://midaway-abc123.public.blob.vercel-storage.com
const PUBLIC_BASE = (process.env.BLOB_PUBLIC_BASE || "").replace(/\/+$/, "");

async function fetchJson(url) {
  const r = await fetch(url, { cache: "no-store" });
  if (r.status === 404) return { ok: false, status: 404, json: [] };
  if (!r.ok) return { ok: false, status: r.status, text: await r.text() };
  try {
    const txt = await r.text();
    return { ok: true, status: 200, json: txt ? JSON.parse(txt) : [] };
  } catch (e) {
    return { ok: false, status: 500, text: "invalid_json" };
  }
}

/**
 * Citește lista de comenzi din Blob Storage (public).
 * Necesită BLOB_PUBLIC_BASE setat corect.
 */
export async function readOrders() {
  if (!PUBLIC_BASE) {
    console.warn(
      "⚠️ BLOB_PUBLIC_BASE nu este setat. Setează hostul public din logul scrierii (🟢 Blob write url)."
    );
    return [];
  }

  const url = `${PUBLIC_BASE}/${FILE}`;
  const res = await fetchJson(url);

  if (!res.ok) {
    console.error("readOrders error:", { url, status: res.status, text: res.text });
    return [];
  }
  return Array.isArray(res.json) ? res.json : [];
}

/**
 * Adaugă / actualizează o comandă și rescrie fișierul JSON.
 * - idempotent pe `order.id`: dacă există, face merge (nu pierdem câmpuri vechi).
 * - sortare desc după `createdAt` (fallback la ordonare pe apariție).
 * Planul Hobby → necesită { access: "public" } la scriere.
 */
export async function appendOrder(order) {
  // 1) Citim ce avem deja (poate fi gol prima dată)
  let list = [];
  try {
    list = await readOrders();
  } catch {
    list = [];
  }

  // 2) Normalizări minime (nu stricăm nimic existent)
  const normalized = {
    ...order,
    createdAt:
      typeof order.createdAt === "number"
        ? order.createdAt
        : Date.now(),
    status: order.status || "paid",
    // câmpuri noi – doar le trecem prin dacă există; altfel lăsăm nedefinite
    orderNo: order.orderNo || order.order_no || undefined,
    courierFee:
      typeof order.courierFee === "number"
        ? order.courierFee
        : undefined,
  };

  // 3) Idempotent update (după `id`)
  const idx = list.findIndex((o) => o && o.id === normalized.id);
  if (idx >= 0) {
    // merge: nu pierdem nimic ce era deja în ordine
    list[idx] = { ...list[idx], ...normalized };
  } else {
    // introducem la început
    list.unshift(normalized);
  }

  // 4) Sortăm desc după createdAt dacă există pe ambele rânduri
  list.sort((a, b) => {
    const aa = typeof a?.createdAt === "number" ? a.createdAt : 0;
    const bb = typeof b?.createdAt === "number" ? b.createdAt : 0;
    return bb - aa;
  });

  // 5) Scriem / suprascriem fișierul public
  const body = JSON.stringify(list, null, 2);
  const { url } = await put(FILE, body, {
    access: "public",                 // ⬅️ important pe Hobby
    contentType: "application/json",
    addRandomSuffix: false,           // suprascriem același fișier
    token: process.env.BLOB_READ_WRITE_TOKEN, // token RW
  });

  // Log clar pentru setare BLOB_PUBLIC_BASE
  const origin = new URL(url).origin;
  console.log("🟢 Blob write url:", url);
  console.log("ℹ️  SUGESTIE: setează BLOB_PUBLIC_BASE =", origin, "dacă nu este setat.");

  console.log("🗂️ Order logged:", normalized.orderNo || normalized.id);
}
