// /api/_orders-store.mjs
import { put } from "@vercel/blob";

const FILE = "orders.json";
const BLOB_BASE = "https://blob.vercel-storage.com";

/**
 * Citește lista de comenzi din Blob Storage (public).
 */
export async function readOrders() {
  try {
    // public read – fără token
    const r = await fetch(`${BLOB_BASE}/${FILE}`, {
      cache: "no-store",
    });

    if (r.status === 404) return []; // prima rulare: fișier inexistent
    if (!r.ok) throw new Error(`readOrders failed: ${r.status} ${r.statusText}`);

    const txt = await r.text();
    if (!txt) return [];
    return JSON.parse(txt);
  } catch (e) {
    console.error("readOrders error:", e);
    return [];
  }
}

/**
 * Adaugă o comandă nouă în începutul listei și rescrie fișierul JSON.
 * Hobby Blob => necesită access: "public".
 */
export async function appendOrder(order) {
  const list = await readOrders();
  list.unshift(order);

  const body = JSON.stringify(list, null, 2);

  await put(FILE, body, {
    access: "public",                 // ⬅️ important pe Hobby
    contentType: "application/json",
    addRandomSuffix: false,           // suprascriem același fișier
    token: process.env.BLOB_READ_WRITE_TOKEN, // token-ul RW
  });

  console.log("🗂️ Order logged:", order.id);
}
