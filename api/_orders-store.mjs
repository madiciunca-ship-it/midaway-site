// /api/_orders-store.mjs
import { put } from "@vercel/blob";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const FILE = "orders.json";

// ⚠️ Hostul public al Blob-ului (setează în Vercel → Environment Variables)
// Exemplu de valoare: https://midaway-abc123.public.blob.vercel-storage.com
const PUBLIC_BASE = (process.env.BLOB_PUBLIC_BASE || "").replace(/\/+$/, "");

// 🔐 cheie pentru criptarea comenzilor stocate în blob
const ENC_SECRET = process.env.ORDER_DATA_SECRET || "";

function getKey() {
  if (!ENC_SECRET || ENC_SECRET.length < 16) {
    throw new Error("Missing or weak ORDER_DATA_SECRET");
  }

  return crypto.createHash("sha256").update(ENC_SECRET).digest();
}

function encryptOrder(order) {
  const iv = crypto.randomBytes(12);
  const key = getKey();
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const plaintext = JSON.stringify(order);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64url"),
    tag: tag.toString("base64url"),
    data: encrypted.toString("base64url"),
  };
}

function decryptOrder(enc) {
  const key = getKey();
  const iv = Buffer.from(enc.iv, "base64url");
  const tag = Buffer.from(enc.tag, "base64url");
  const data = Buffer.from(enc.data, "base64url");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(data),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString("utf8"));
}

function encodeStoredOrder(order) {
  const enc = encryptOrder(order);

  return {
    id: order.id,
    orderNo: order.orderNo || order.order_no || undefined,
    createdAt:
      typeof order.createdAt === "number" ? order.createdAt : Date.now(),
    status: order.status || "paid",
    enc,
  };
}

function decodeStoredOrder(row) {
  if (!row || typeof row !== "object") return null;

  // compatibilitate cu comenzile vechi, deja salvate în clar
  if (!row.enc) return row;

  const plain = decryptOrder(row.enc);

  return {
    ...plain,
    id: row.id || plain.id,
    orderNo: row.orderNo || plain.orderNo,
    createdAt:
      typeof row.createdAt === "number" ? row.createdAt : plain.createdAt,
    status: row.status || plain.status,
  };
}

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
 * Comenzile noi sunt stocate criptat, cele vechi pot fi încă în clar.
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

  const raw = Array.isArray(res.json) ? res.json : [];

  return raw
    .map((row) => {
      try {
        return decodeStoredOrder(row);
      } catch (e) {
        console.error("decodeStoredOrder failed:", e);
        return null;
      }
    })
    .filter(Boolean);
}

// ⬇️ păstrăm helperul de idempotency
export async function orderExists(id) {
  try {
    if (!id) return false;
    const list = await readOrders();
    if (!Array.isArray(list)) return false;
    return list.some((o) => o && o.id === id);
  } catch {
    return false;
  }
}

/**
 * Adaugă / actualizează o comandă și rescrie fișierul JSON.
 * - idempotent pe `order.id`: dacă există, face merge (nu pierdem câmpuri vechi)
 * - sortare desc după `createdAt`
 * - stocare criptată pentru comenzile noi
 * Planul Hobby → necesită { access: "public" } la scriere.
 */
export async function appendOrder(order) {
  // 1) Citim ce avem deja
  let list = [];
  try {
    list = await readOrders();
  } catch {
    list = [];
  }

  // 2) Normalizări minime
  const normalized = {
    ...order,
    createdAt:
      typeof order.createdAt === "number"
        ? order.createdAt
        : Date.now(),
    status: order.status || "paid",
    orderNo: order.orderNo || order.order_no || undefined,
    courierFee:
      typeof order.courierFee === "number"
        ? order.courierFee
        : undefined,
  };

  // 3) Idempotent update după `id`
  const idx = list.findIndex((o) => o && o.id === normalized.id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...normalized };
  } else {
    list.unshift(normalized);
  }

  // 4) Sortăm desc după createdAt
  list.sort((a, b) => {
    const aa = typeof a?.createdAt === "number" ? a.createdAt : 0;
    const bb = typeof b?.createdAt === "number" ? b.createdAt : 0;
    return bb - aa;
  });

  // 5) Scriem în blob varianta criptată
  const storedList = list.map((o) => encodeStoredOrder(o));
  const body = JSON.stringify(storedList, null, 2);

  const { url } = await put(FILE, body, {
    access: "public", // public ca blob endpoint, dar conținutul este criptat
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  // Log clar pentru setare BLOB_PUBLIC_BASE
  const origin = new URL(url).origin;
  console.log("🟢 Blob write url:", url);
  console.log(
    "ℹ️  SUGESTIE: setează BLOB_PUBLIC_BASE =",
    origin,
    "dacă nu este setat."
  );

  console.log("🗂️ Order logged:", normalized.orderNo || normalized.id);
}

/**
 * Șterge toate comenzile din Blob Storage (rescrie [] în fișierul public).
 */
export async function clearOrders() {
  try {
    const emptyList = [];
    const body = JSON.stringify(emptyList, null, 2);
    const { url } = await put(FILE, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const origin = new URL(url).origin;
    console.log("🗑️  Toate comenzile au fost șterse din Blob Storage.");
    console.log("🟢 Blob reset url:", url);
    console.log("ℹ️  Dacă nu e setat, setează BLOB_PUBLIC_BASE =", origin);
    return true;
  } catch (e) {
    console.error("Eroare la clearOrders:", e);
    return false;
  }
}