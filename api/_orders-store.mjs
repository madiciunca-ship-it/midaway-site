// /api/_orders-store.mjs
import fs from "fs/promises";
import path from "path";

const ORDERS_PATH = path.join("/tmp", "orders.json");

async function ensureFile() {
  try {
    await fs.access(ORDERS_PATH);
  } catch {
    await fs.writeFile(ORDERS_PATH, "[]", "utf8");
  }
}

export async function readOrders() {
  await ensureFile();
  const raw = await fs.readFile(ORDERS_PATH, "utf8");
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export async function appendOrder(order) {
  const list = await readOrders();
  list.unshift(order); // cele noi la început
  await fs.writeFile(ORDERS_PATH, JSON.stringify(list, null, 2), "utf8");
  return order;
}

export async function clearOrders() {
  await fs.writeFile(ORDERS_PATH, "[]", "utf8");
}
