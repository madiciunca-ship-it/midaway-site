// src/server/_event-inventory-store.mjs
import { put } from "@vercel/blob";

const FILE = "event-inventory.json";

const PUBLIC_BASE = String(
  process.env.BLOB_PUBLIC_BASE || ""
).replace(/\/+$/, "");

// ─────────────────────────────────────────────────────────────
// Structura inventarului
// ─────────────────────────────────────────────────────────────
//
// {
//   "version": 1,
//   "updatedAt": 0,
//   "events": {
//     "gaudeamus-sibiu-2026": {
//       "eventId": "gaudeamus-sibiu-2026",
//       "createdAt": 0,
//       "updatedAt": 0,
//       "books": {
//         "book-id": {
//           "bookId": "book-id",
//           "title": "Titlu",
//           "initialStock": 80,
//           "stock": 79,
//           "sold": 1,
//           "manualAdded": 0,
//           "manualRemoved": 0,
//           "createdAt": 0,
//           "updatedAt": 0,
//           "history": [
//             {
//               "id": "...",
//               "createdAt": 0,
//               "type": "sale",
//               "delta": -1,
//               "stockBefore": 80,
//               "stockAfter": 79,
//               "reason": "Comandă Stripe",
//               "reference": "GAU-...",
//               "actor": "stripe-webhook"
//             }
//           ]
//         }
//       },
//       "processedReferences": {
//         "stripe:cs_live_...": 0
//       }
//     }
//   }
// }
//
// ─────────────────────────────────────────────────────────────

function emptyInventory() {
  return {
    version: 1,
    updatedAt: Date.now(),
    events: {},
  };
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.trunc(number);
}

function normalizeNonNegativeInteger(value, fallback = 0) {
  return Math.max(
    0,
    normalizeInteger(value, fallback)
  );
}

function createHistoryId() {
  return [
    Date.now().toString(36),
    Math.random().toString(36).slice(2, 10),
  ].join("-");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeInventory(raw) {
  const data =
    raw &&
    typeof raw === "object" &&
    !Array.isArray(raw)
      ? raw
      : emptyInventory();

  return {
    version: 1,

    updatedAt:
      typeof data.updatedAt === "number"
        ? data.updatedAt
        : Date.now(),

    events:
      data.events &&
      typeof data.events === "object" &&
      !Array.isArray(data.events)
        ? data.events
        : {},
  };
}

function ensureEventRecord(data, eventId) {
  const id = String(eventId || "").trim();

  if (!id) {
    throw new Error("Missing eventId");
  }

  const now = Date.now();

  if (
    !data.events[id] ||
    typeof data.events[id] !== "object"
  ) {
    data.events[id] = {
      eventId: id,
      createdAt: now,
      updatedAt: now,
      books: {},
      processedReferences: {},
    };
  }

  const event = data.events[id];

  if (
    !event.books ||
    typeof event.books !== "object" ||
    Array.isArray(event.books)
  ) {
    event.books = {};
  }

  if (
    !event.processedReferences ||
    typeof event.processedReferences !== "object" ||
    Array.isArray(event.processedReferences)
  ) {
    event.processedReferences = {};
  }

  return event;
}

function ensureBookRecord(
  event,
  {
    bookId,
    title = "",
    initialStock = 0,
  }
) {
  const id = String(bookId || "").trim();

  if (!id) {
    throw new Error("Missing bookId");
  }

  const now = Date.now();
  const normalizedInitial =
    normalizeNonNegativeInteger(initialStock);

  if (
    !event.books[id] ||
    typeof event.books[id] !== "object"
  ) {
    event.books[id] = {
      bookId: id,
      title: String(title || ""),
      initialStock: normalizedInitial,
      stock: normalizedInitial,
      sold: 0,
      manualAdded: 0,
      manualRemoved: 0,
      createdAt: now,
      updatedAt: now,
      history: [
        {
          id: createHistoryId(),
          createdAt: now,
          type: "initial",
          delta: normalizedInitial,
          stockBefore: 0,
          stockAfter: normalizedInitial,
          reason: "Stoc inițial",
          reference: "",
          actor: "system",
        },
      ],
    };
  }

  const book = event.books[id];

  book.bookId = id;

  if (title && !book.title) {
    book.title = String(title);
  }

  book.initialStock =
    normalizeNonNegativeInteger(
      book.initialStock,
      normalizedInitial
    );

  book.stock =
    normalizeNonNegativeInteger(
      book.stock,
      book.initialStock
    );

  book.sold =
    normalizeNonNegativeInteger(book.sold);

  book.manualAdded =
    normalizeNonNegativeInteger(
      book.manualAdded
    );

  book.manualRemoved =
    normalizeNonNegativeInteger(
      book.manualRemoved
    );

  if (!Array.isArray(book.history)) {
    book.history = [];
  }

  return book;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "cache-control": "no-store",
    },
  });

  if (response.status === 404) {
    return {
      ok: false,
      status: 404,
      json: null,
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
      json: text
        ? JSON.parse(text)
        : emptyInventory(),
    };
  } catch {
    return {
      ok: false,
      status: 500,
      text: "invalid_json",
    };
  }
}

async function writeInventory(data) {
  const normalized = normalizeInventory(data);

  normalized.updatedAt = Date.now();

  const body = JSON.stringify(
    normalized,
    null,
    2
  );

  const result = await put(FILE, body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  console.log(
    "📚 Event inventory saved:",
    result.url
  );

  return normalized;
}

// ─────────────────────────────────────────────────────────────
// Citire
// ─────────────────────────────────────────────────────────────

export async function readEventInventory() {
  if (!PUBLIC_BASE) {
    console.warn(
      "BLOB_PUBLIC_BASE is not configured."
    );

    return emptyInventory();
  }

  const url = `${PUBLIC_BASE}/${FILE}`;
  const response = await fetchJson(url);

  if (!response.ok) {
    if (response.status !== 404) {
      console.error(
        "readEventInventory error:",
        {
          url,
          status: response.status,
          text: response.text,
        }
      );
    }

    return emptyInventory();
  }

  return normalizeInventory(response.json);
}

export async function getEventInventory(
  eventId
) {
  const data = await readEventInventory();

  const event =
    data.events?.[String(eventId)] || null;

  return event
    ? clone(event)
    : null;
}

export async function getEventStock(
  eventId,
  bookId
) {
  const event =
    await getEventInventory(eventId);

  const book =
    event?.books?.[String(bookId)] || null;

  if (!book) {
    return null;
  }

  return normalizeNonNegativeInteger(
    book.stock
  );
}

export async function getEventBookInventory(
  eventId,
  bookId
) {
  const event =
    await getEventInventory(eventId);

  const book =
    event?.books?.[String(bookId)] || null;

  return book
    ? clone(book)
    : null;
}

export async function getEventBookHistory(
  eventId,
  bookId
) {
  const book =
    await getEventBookInventory(
      eventId,
      bookId
    );

  return Array.isArray(book?.history)
    ? [...book.history].sort(
        (a, b) =>
          Number(b?.createdAt || 0) -
          Number(a?.createdAt || 0)
      )
    : [];
}

// ─────────────────────────────────────────────────────────────
// Inițializare
// ─────────────────────────────────────────────────────────────

export async function initializeEventInventory({
  eventId,
  books = [],
}) {
  const id = String(eventId || "").trim();

  if (!id) {
    throw new Error("Missing eventId");
  }

  if (!Array.isArray(books)) {
    throw new Error(
      "Inventory books must be an array"
    );
  }

  const data = await readEventInventory();
  const event = ensureEventRecord(data, id);

  for (const entry of books) {
    ensureBookRecord(event, {
      bookId: entry?.bookId,
      title: entry?.title || "",
      initialStock:
        entry?.initialStock ?? 0,
    });
  }

  event.updatedAt = Date.now();

  await writeInventory(data);

  return clone(event);
}

// ─────────────────────────────────────────────────────────────
// Ajustare manuală: +stoc / -stoc
// ─────────────────────────────────────────────────────────────

export async function adjustEventStock({
  eventId,
  bookId,
  delta,
  reason = "Ajustare manuală",
  reference = "",
  actor = "admin",
  title = "",
  initialStock = 0,
  type = "manual",
  allowNegative = false,
}) {
  const normalizedDelta =
    normalizeInteger(delta);

  if (normalizedDelta === 0) {
    throw new Error(
      "Inventory delta must not be zero"
    );
  }

  const data = await readEventInventory();

  const event = ensureEventRecord(
    data,
    eventId
  );

  const book = ensureBookRecord(event, {
    bookId,
    title,
    initialStock,
  });

  const before =
    normalizeNonNegativeInteger(
      book.stock
    );

  const calculatedAfter =
    before + normalizedDelta;

  if (
    calculatedAfter < 0 &&
    allowNegative !== true
  ) {
    const error = new Error(
      "Insufficient inventory"
    );

    error.code = "INSUFFICIENT_STOCK";
    error.eventId = String(eventId);
    error.bookId = String(bookId);
    error.available = before;
    error.requested =
      Math.abs(normalizedDelta);

    throw error;
  }

  const after = allowNegative
    ? calculatedAfter
    : Math.max(0, calculatedAfter);

  const now = Date.now();

  book.stock = after;
  book.updatedAt = now;

  if (type === "sale") {
    book.sold =
      normalizeNonNegativeInteger(
        book.sold
      ) + Math.abs(normalizedDelta);
  } else if (normalizedDelta > 0) {
    book.manualAdded =
      normalizeNonNegativeInteger(
        book.manualAdded
      ) + normalizedDelta;
  } else {
    book.manualRemoved =
      normalizeNonNegativeInteger(
        book.manualRemoved
      ) + Math.abs(normalizedDelta);
  }

  const historyEntry = {
    id: createHistoryId(),
    createdAt: now,
    type: String(type || "manual"),
    delta: normalizedDelta,
    stockBefore: before,
    stockAfter: after,
    reason: String(
      reason || "Ajustare manuală"
    ),
    reference: String(reference || ""),
    actor: String(actor || "admin"),
  };

  book.history.unshift(historyEntry);

  event.updatedAt = now;

  await writeInventory(data);

  return {
    eventId: String(eventId),
    book: clone(book),
    historyEntry: clone(historyEntry),
  };
}

// ─────────────────────────────────────────────────────────────
// Setare directă a stocului
// Utilă pentru inventar fizic / corecții
// ─────────────────────────────────────────────────────────────

export async function setEventStock({
  eventId,
  bookId,
  stock,
  reason = "Corecție inventar",
  reference = "",
  actor = "admin",
  title = "",
  initialStock = 0,
}) {
  const requestedStock =
    normalizeNonNegativeInteger(stock);

  const data = await readEventInventory();

  const event = ensureEventRecord(
    data,
    eventId
  );

  const book = ensureBookRecord(event, {
    bookId,
    title,
    initialStock,
  });

  const before =
    normalizeNonNegativeInteger(
      book.stock
    );

  const delta = requestedStock - before;
  const now = Date.now();

  book.stock = requestedStock;
  book.updatedAt = now;

  const historyEntry = {
    id: createHistoryId(),
    createdAt: now,
    type: "set",
    delta,
    stockBefore: before,
    stockAfter: requestedStock,
    reason: String(
      reason || "Corecție inventar"
    ),
    reference: String(reference || ""),
    actor: String(actor || "admin"),
  };

  book.history.unshift(historyEntry);

  event.updatedAt = now;

  await writeInventory(data);

  return {
    eventId: String(eventId),
    book: clone(book),
    historyEntry: clone(historyEntry),
  };
}

// ─────────────────────────────────────────────────────────────
// Scădere automată pentru o comandă plătită
//
// Primește TOATE produsele comenzii și le scade într-o singură
// salvare. `reference` împiedică procesarea aceleiași plăți
// de două ori dacă Stripe retrimite webhook-ul.
// ─────────────────────────────────────────────────────────────

export async function consumeEventStock({
  eventId,
  items = [],
  reference,
  reason = "Comandă Stripe",
  actor = "stripe-webhook",
}) {
  const id = String(eventId || "").trim();
  const ref = String(reference || "").trim();

  if (!id) {
    throw new Error("Missing eventId");
  }

  if (!ref) {
    throw new Error(
      "Missing inventory transaction reference"
    );
  }

  if (!Array.isArray(items) || !items.length) {
    throw new Error(
      "Inventory transaction has no items"
    );
  }

  const data = await readEventInventory();
  const event = ensureEventRecord(data, id);

  const referenceKey = `sale:${ref}`;

  if (event.processedReferences[referenceKey]) {
    return {
      ok: true,
      duplicate: true,
      reference: ref,
      event: clone(event),
      changes: [],
    };
  }

  const normalizedItems = items.map(
    (item) => {
      const bookId = String(
        item?.bookId || ""
      ).trim();

      const quantity =
        normalizeNonNegativeInteger(
          item?.quantity
        );

      if (!bookId || quantity < 1) {
        throw new Error(
          "Invalid inventory transaction item"
        );
      }

      return {
        bookId,
        quantity,
        title: String(item?.title || ""),
        initialStock:
          normalizeNonNegativeInteger(
            item?.initialStock
          ),
      };
    }
  );

  // Verificăm toate stocurile înainte să modificăm ceva.
  for (const item of normalizedItems) {
    const book = ensureBookRecord(event, {
      bookId: item.bookId,
      title: item.title,
      initialStock: item.initialStock,
    });

    const available =
      normalizeNonNegativeInteger(
        book.stock
      );

    if (available < item.quantity) {
      const error = new Error(
        "Insufficient inventory"
      );

      error.code = "INSUFFICIENT_STOCK";
      error.eventId = id;
      error.bookId = item.bookId;
      error.available = available;
      error.requested = item.quantity;

      throw error;
    }
  }

  const now = Date.now();
  const changes = [];

  // După ce toate au trecut verificarea, le scădem.
  for (const item of normalizedItems) {
    const book = event.books[item.bookId];

    const before =
      normalizeNonNegativeInteger(
        book.stock
      );

    const after =
      before - item.quantity;

    book.stock = after;

    book.sold =
      normalizeNonNegativeInteger(
        book.sold
      ) + item.quantity;

    book.updatedAt = now;

    const historyEntry = {
      id: createHistoryId(),
      createdAt: now,
      type: "sale",
      delta: -item.quantity,
      stockBefore: before,
      stockAfter: after,
      reason: String(reason),
      reference: ref,
      actor: String(actor),
    };

    book.history.unshift(historyEntry);

    changes.push({
      bookId: item.bookId,
      quantity: item.quantity,
      stockBefore: before,
      stockAfter: after,
      historyEntry,
    });
  }

  event.processedReferences[referenceKey] =
    now;

  event.updatedAt = now;

  await writeInventory(data);

  return {
    ok: true,
    duplicate: false,
    reference: ref,
    changes: clone(changes),
    event: clone(event),
  };
}

// ─────────────────────────────────────────────────────────────
// Verificarea unui coș înainte de Stripe
// ─────────────────────────────────────────────────────────────

export async function validateEventStock({
  eventId,
  items = [],
}) {
  const event =
    await getEventInventory(eventId);

  if (!event) {
    return {
      ok: false,
      reason: "inventory_not_initialized",
      unavailable: [],
    };
  }

  const unavailable = [];

  for (const item of items) {
    const bookId = String(
      item?.bookId || ""
    );

    const requested =
      normalizeNonNegativeInteger(
        item?.quantity
      );

    const available =
      normalizeNonNegativeInteger(
        event.books?.[bookId]?.stock
      );

    if (
      !bookId ||
      requested < 1 ||
      available < requested
    ) {
      unavailable.push({
        bookId,
        requested,
        available,
      });
    }
  }

  return {
    ok: unavailable.length === 0,
    unavailable,
  };
}