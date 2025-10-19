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
 * Adaugă o comandă nouă în începutul listei și rescrie fișierul JSON.
 * Planul Hobby → necesită { access: "public" } la scriere.
 */
export async function appendOrder(order) {
  // Citiți ce avem deja (poate fi gol prima dată)
  let list = [];
  try {
    list = await readOrders();
  } catch {
    list = [];
  }

  list.unshift(order);
  const body = JSON.stringify(list, null, 2);

  // scriem / suprascriem fișierul public
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

  console.log("🗂️ Order logged:", order.id);
}
