// /api/_event-orders-store.mjs
import { put } from "@vercel/blob";
import crypto from "crypto";

const FILE = "event-orders.json";

const PUBLIC_BASE = (process.env.BLOB_PUBLIC_BASE || "").replace(/\/+$/, "");
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
    orderNo: order.orderNo,
    createdAt:
      typeof order.createdAt === "number"
        ? order.createdAt
        : Date.now(),
    status: order.status || "paid",
    pickupStatus: order.pickupStatus || "pending",
    enc,
  };
}

function decodeStoredOrder(row) {
  if (!row || typeof row !== "object") return null;

  if (!row.enc) return row;

  const plain = decryptOrder(row.enc);

  return {
    ...plain,
    id: row.id || plain.id,
    orderNo: row.orderNo || plain.orderNo,
    createdAt:
      typeof row.createdAt === "number"
        ? row.createdAt
        : plain.createdAt,
    status: row.status || plain.status,
    pickupStatus:
      row.pickupStatus || plain.pickupStatus || "pending",
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return {
      ok: false,
      status: 404,
      json: [],
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      text: await response.text(),
    };
  }

  try {
    const text = await response.text();

    return {
      ok: true,
      status: 200,
      json: text ? JSON.parse(text) : [],
    };
  } catch {
    return {
      ok: false,
      status: 500,
      text: "invalid_json",
    };
  }
}

export async function readEventOrders() {
  if (!PUBLIC_BASE) {
    console.warn("BLOB_PUBLIC_BASE is not configured.");
    return [];
  }

  const url = `${PUBLIC_BASE}/${FILE}`;
  const response = await fetchJson(url);

  if (!response.ok) {
    if (response.status !== 404) {
      console.error("readEventOrders error:", {
        url,
        status: response.status,
        text: response.text,
      });
    }

    return [];
  }

  const raw = Array.isArray(response.json)
    ? response.json
    : [];

  return raw
    .map((row) => {
      try {
        return decodeStoredOrder(row);
      } catch (error) {
        console.error("decodeStoredOrder failed:", error);
        return null;
      }
    })
    .filter(Boolean);
}

export async function eventOrderExists(id) {
  if (!id) return false;

  const list = await readEventOrders();

  return list.some((order) => order?.id === id);
}

export async function appendEventOrder(order) {
  let list = [];

  try {
    list = await readEventOrders();
  } catch {
    list = [];
  }

  const normalized = {
    ...order,

    createdAt:
      typeof order.createdAt === "number"
        ? order.createdAt
        : Date.now(),

    status: order.status || "paid",

    pickupStatus:
      order.pickupStatus || "pending",

    channel: "event",
  };

  const index = list.findIndex(
    (item) => item?.id === normalized.id
  );

  if (index >= 0) {
    list[index] = {
      ...list[index],
      ...normalized,
    };
  } else {
    list.unshift(normalized);
  }

  list.sort((a, b) => {
    const aa =
      typeof a?.createdAt === "number"
        ? a.createdAt
        : 0;

    const bb =
      typeof b?.createdAt === "number"
        ? b.createdAt
        : 0;

    return bb - aa;
  });

  const storedList = list.map((item) =>
    encodeStoredOrder(item)
  );

  const body = JSON.stringify(storedList, null, 2);

  const { url } = await put(FILE, body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  console.log(
    "🎪 Event order saved:",
    normalized.orderNo || normalized.id
  );

  console.log("🟢 Event orders blob:", url);

  return normalized;
}

export async function updateEventOrder(id, updates = {}) {
  if (!id) {
    throw new Error("Missing event order id");
  }

  const list = await readEventOrders();

  const index = list.findIndex(
    (item) =>
      item?.id === id ||
      item?.orderNo === id
  );

  if (index < 0) {
    throw new Error("Event order not found");
  }

  list[index] = {
    ...list[index],
    ...updates,
    updatedAt: Date.now(),
  };

  const storedList = list.map((item) =>
    encodeStoredOrder(item)
  );

  const body = JSON.stringify(storedList, null, 2);

  await put(FILE, body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return list[index];
}

export async function clearEventOrders() {
  const body = JSON.stringify([], null, 2);

  await put(FILE, body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return true;
}