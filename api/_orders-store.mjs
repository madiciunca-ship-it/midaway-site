// /api/_orders-store.mjs
import { put, get } from "@vercel/blob";

const FILE = "orders.json"; // un singur fișier JSON în Blob

export async function readOrders() {
  try {
    const resp = await get(FILE, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!resp?.body) return [];
    const txt = await resp.body.text();
    return JSON.parse(txt || "[]");
  } catch {
    // prima dată poate nu există fișierul
    return [];
  }
}

export async function appendOrder(order) {
  const list = await readOrders();
  // adăugăm ultima comandă sus
  list.unshift(order);

  await put(FILE, JSON.stringify(list, null, 2), {
    token: process.env.BLOB_READ_WRITE_TOKEN,
    contentType: "application/json",
    addRandomSuffix: false, // suprascriem același fișier
    access: "private",
  });

  console.log("🗂️ Order logged:", order.id);
}
