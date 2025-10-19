// /api/_orders-store.mjs
import { put } from "@vercel/blob";

const FILE = "orders.json";
const BLOB_BASE = "https://blob.vercel-storage.com";

/**
 * Citește lista de comenzi din Blob Storage folosind fetch + token.
 */
export async function readOrders() {
  try {
    const resp = await fetch(`${BLOB_BASE}/${FILE}`, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
      cache: "no-store",
    });

    if (resp.status === 404) {
      // prima rulare: nu există fișierul încă
      return [];
    }
    if (!resp.ok) {
      throw new Error(`readOrders failed: ${resp.status} ${resp.statusText}`);
    }

    const txt = await resp.text();
    if (!txt) return [];
    return JSON.parse(txt);
  } catch (e) {
    console.error("readOrders error:", e);
    return [];
  }
}

/**
 * Adaugă o comandă nouă și rescrie JSON-ul în Blob.
 */
export async function appendOrder(order) {
  const list = await readOrders();
  list.unshift(order);

  await put(FILE, JSON.stringify(list, null, 2), {
    token: process.env.BLOB_READ_WRITE_TOKEN,
    contentType: "application/json",
    addRandomSuffix: false, // suprascriem același fișier
    access: "private",
  });

  console.log("🗂️ Order logged:", order.id);
}
