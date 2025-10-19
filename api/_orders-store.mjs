// /api/_orders-store.mjs
import { put } from "@vercel/blob";

const FILE = "orders.json";
const PUBLIC_URL = `https://blob.vercel-storage.com/${FILE}`;

/**
 * Citește lista de comenzi din Blob Storage.
 * - încearcă public (Hobby, access: "public")
 * - fallback: cu token (dacă e cazul)
 */
export async function readOrders() {
  // 1) încercare publică
  try {
    const r = await fetch(PUBLIC_URL, { cache: "no-store" });
    if (r.status === 404) {
      console.log("[orders-store] public GET 404 (încă nu există).");
    } else if (!r.ok) {
      console.warn("[orders-store] public GET not ok:", r.status, r.statusText);
    } else {
      const txt = await r.text();
      if (!txt) return [];
      return JSON.parse(txt);
    }
  } catch (e) {
    console.warn("[orders-store] public GET error:", e);
  }

  // 2) fallback cu token (unele setup-uri mai vechi)
  try {
    const r2 = await fetch(PUBLIC_URL, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
    if (r2.status === 404) {
      console.log("[orders-store] token GET 404 (încă nu există).");
      return [];
    }
    if (!r2.ok) {
      console.error("[orders-store] token GET not ok:", r2.status, r2.statusText);
      return [];
    }
    const txt2 = await r2.text();
    return txt2 ? JSON.parse(txt2) : [];
  } catch (e) {
    console.error("[orders-store] token GET error:", e);
    return [];
  }
}

/**
 * Adaugă o comandă nouă și rescrie fișierul JSON.
 * Hobby Blob => access: "public", addRandomSuffix: false
 */
export async function appendOrder(order) {
  const list = await readOrders();
  list.unshift(order);

  const body = JSON.stringify(list, null, 2);

  try {
    const result = await put(FILE, body, {
      access: "public",                 // ⬅️ obligatoriu pe Hobby
      contentType: "application/json",
      addRandomSuffix: false,           // suprascriem același fișier
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // log-uri ajutătoare
    console.log("🗂️ Order logged:", order.id);
    console.log("🟢 Blob write url:", result?.url || "(no url)");
  } catch (e) {
    console.error("❌ appendOrder put() failed:", e);
    throw e;
  }
}
