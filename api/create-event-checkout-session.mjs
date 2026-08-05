// /api/create-event-checkout-session.mjs
import Stripe from "stripe";
import { BOOKS } from "../src/data/books.js";
import { EVENTS, findEventBySlug } from "../src/data/events.js";
import {
  initializeEventInventory,
  getEventInventory,
  validateEventStock,
} from "../src/server/_event-inventory-store.mjs";

const STRIPE_KEY =
  process.env.STRIPE_SECRET_KEY || "";
const SITE = (process.env.SITE_URL || "https://midaway.ro").replace(/\/+$/, "");

const stripe = STRIPE_KEY ? new Stripe(STRIPE_KEY) : null;

const BOOK_MAP = new Map(
  BOOKS.map((book) => [String(book.id), book])
);

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function safeQuantity(value) {
  const quantity = Number(value);

  if (!Number.isInteger(quantity)) return 0;
  if (quantity < 1) return 0;

  return quantity;
}

function compactCartMetadata(items) {
  return items
    .map((item) => `${item.bookId}:${item.quantity}`)
    .join("|")
    .slice(0, 490);
}

// ─────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  try {
    /*
      GET — returnează stocul public pentru pagina evenimentului.
    */
    if (req.method === "GET") {
      const eventId = String(
        req.query?.eventId || ""
      ).trim();

      const event =
        findEventBySlug(eventId) ||
        EVENTS.find(
          (entry) =>
            String(entry?.id) === eventId ||
            String(entry?.slug) === eventId
        ) ||
        null;

      if (!event) {
        return sendJson(res, 404, {
          error: "Evenimentul nu există.",
        });
      }

      if (event.active !== true) {
        return sendJson(res, 403, {
          error: "Evenimentul nu este activ.",
        });
      }

      await initializeEventInventory({
        eventId: event.id,

        books: (event.books || []).map((entry) => {
          const book = BOOK_MAP.get(
            String(entry.bookId)
          );

          return {
            bookId: String(entry.bookId),
            title: book?.title || "",
            initialStock:
              Number(entry.initialStock) || 0,
          };
        }),
      });

      const inventory =
        await getEventInventory(event.id);

      const books = (event.books || []).map(
        (entry) => {
          const bookId = String(
            entry.bookId
          );

          const stored =
            inventory?.books?.[bookId] || null;

          return {
            bookId,
            stock: Number(
              stored?.stock || 0
            ),
            initialStock: Number(
              stored?.initialStock ??
                entry.initialStock ??
                0
            ),
            sold: Number(
              stored?.sold || 0
            ),
          };
        }
      );

      res.setHeader(
        "Cache-Control",
        "no-store, max-age=0"
      );

      return sendJson(res, 200, {
        eventId: event.id,
        updatedAt:
          inventory?.updatedAt || null,
        books,
      });
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");

      return sendJson(res, 405, {
        error: "Method Not Allowed",
      });
    }

    if (!stripe) {
      return sendJson(res, 500, {
        error: "Missing STRIPE_SECRET_KEY",
      });
    }

    const {
      eventId,
      items = [],
    } = await readBody(req);

    const event =
      findEventBySlug(eventId) ||
      EVENTS.find((entry) => String(entry.id) === String(eventId)) ||
      null;

    if (!event) {
      return sendJson(res, 404, {
        error: "Evenimentul nu există.",
      });
    }

    /*
      Când active:false, pagina și checkout-ul public sunt blocate.

      Pentru testare, vom schimba temporar active:true.
      După testarea completă, îl punem din nou false.
    */
    if (event.active !== true) {
      return sendJson(res, 403, {
        error: "Evenimentul nu este încă activ.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return sendJson(res, 400, {
        error: "Nu ai selectat nicio carte.",
      });
    }

    const currency = String(event.currency || "RON").toLowerCase();
    const unitPrice = Number(event.unitPrice);

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      return sendJson(res, 500, {
        error: "Prețul evenimentului nu este configurat corect.",
      });
    }

    const eventBookMap = new Map(
      (event.books || []).map((entry) => [
        String(entry.bookId),
        entry,
      ])
    );

    /*
  Ne asigurăm că inventarul există în Blob.
  Dacă este prima comandă pentru acest eveniment,
  se creează automat folosind stocurile inițiale.
*/
await initializeEventInventory({
  eventId: event.id,
  books: (event.books || []).map((entry) => {
    const book = BOOK_MAP.get(String(entry.bookId));

    return {
      bookId: String(entry.bookId),
      title: book?.title || "",
      initialStock: Number(entry.initialStock) || 0,
    };
  }),
});

    const cleanedItems = [];
    const rejectedItems = [];

    for (const rawItem of items) {
      const bookId = String(rawItem?.bookId || "");
      const quantity = safeQuantity(rawItem?.quantity);

      const eventBook = eventBookMap.get(bookId);
      const book = BOOK_MAP.get(bookId);

      if (
        !bookId ||
        !quantity ||
        !eventBook ||
        eventBook.visible === false ||
        !book
      ) {
        rejectedItems.push({
          bookId,
          reason: "invalid_or_unavailable",
        });

        continue;
      }

      
      cleanedItems.push({
        bookId,
        book,
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
      });
    }

    /*
  Verificăm stocul real din inventar.
*/
const inventoryCheck =
await validateEventStock({
  eventId: event.id,
  items: cleanedItems.map((item) => ({
    bookId: item.bookId,
    quantity: item.quantity,
  })),
});

if (!inventoryCheck.ok) {
return sendJson(res, 409, {
  error:
    "Unele produse nu mai sunt disponibile în stoc.",
  unavailable: inventoryCheck.unavailable,
});
}

    if (cleanedItems.length === 0) {
      return sendJson(res, 400, {
        error: "Niciuna dintre cărțile selectate nu este disponibilă.",
        rejectedItems,
      });
    }

    if (rejectedItems.length > 0) {
      return sendJson(res, 409, {
        error:
          "Unele produse nu mai sunt disponibile în cantitatea selectată.",
        rejectedItems,
      });
    }

    const totalQuantity = cleanedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const totalAmount = cleanedItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const lineItems = cleanedItems.map((item) => ({
      price_data: {
        currency,

        // Prețul este calculat exclusiv pe server.
        unit_amount: Math.round(item.unitPrice * 100),

        product_data: {
          name: item.book.title,

          metadata: {
            type: "event_book",
            channel: "event",
            eventId: event.id,
            bookId: item.bookId,
          },
        },
      },

      quantity: item.quantity,
    }));

    const metadata = {
      channel: "event",
      eventId: String(event.id),
      eventSlug: String(event.slug),
      unitPrice: String(unitPrice),
      totalQuantity: String(totalQuantity),
      expectedTotal: String(totalAmount),
      cart: compactCartMetadata(cleanedItems),
    };

    const successUrl =
      `${SITE}/event/confirmare` +
      `?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl =
      `${SITE}/event/${encodeURIComponent(event.slug)}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: lineItems,

      success_url: successUrl,
      cancel_url: cancelUrl,

      locale: "ro",

      customer_creation: "always",

      /*
  Colectăm obligatoriu numele și adresa completă.
  Folosim formularul Stripe pentru adresa de expediere,
  chiar dacă produsele sunt ridicate direct de la stand.
*/
billing_address_collection: "required",

shipping_address_collection: {
  allowed_countries: ["RO"],
},

phone_number_collection: {
  enabled: true,
},
      allow_promotion_codes: false,

      client_reference_id: `${event.id}-${Date.now()}`,

      metadata,

      /*
        Metadata duplicată și pe PaymentIntent,
        ca să putem identifica inclusiv plățile eșuate.
      */
      payment_intent_data: {
        metadata,
      },
    });

    console.log("🎪 Event checkout created:", {
      sessionId: session.id,
      eventId: event.id,
      totalQuantity,
      totalAmount,
      currency: currency.toUpperCase(),
    });

    return sendJson(res, 200, {
      id: session.id,
      url: session.url,

      summary: {
        eventId: event.id,
        totalQuantity,
        totalAmount,
        currency: currency.toUpperCase(),
      },
    });
  } catch (error) {
    console.error("create-event-checkout-session error:", error);

    return sendJson(res, 500, {
      error:
        error?.message ||
        "A apărut o eroare la inițierea plății pentru eveniment.",
    });
  }
}