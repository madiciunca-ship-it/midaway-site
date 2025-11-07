// ===============================
// File: /api/invoice-fgo.mjs
// Purpose: Creează factură în FGO după plata Stripe.
// Env: FGO_API_KEY, FGO_API_URL, FGO_SITE, IS_VAT_PAYER (optional)
// ===============================

const API_KEY = process.env.FGO_API_KEY;
const RAW_API_URL = process.env.FGO_API_URL || "https://api.fgo.ro/api/v1";
const FGO_SITE = process.env.FGO_SITE || "midaway.ro";

// Normalizează baza (fără trailing slash)
function trimSlash(s) { return String(s || "").replace(/\/+$/, ""); }
const API_URL = trimSlash(RAW_API_URL);

// ——— TVA ———
function pickVatRate(item) {
  if (String(process.env.IS_VAT_PAYER || "").toLowerCase() === "true") {
    const type = String(item?.type || "").toLowerCase();
    const fmt = String(item?.format || "").toUpperCase();
    if (type === "book" || fmt === "PDF" || fmt === "EPUB" || fmt === "PAPERBACK") return 11;
    return 21;
  }
  return 0;
}

// ——— Payload ———
function buildFgoPayload({ order, email, company }) {
  const isCompany = !!(company && (company.name || company.cui) && company.requested);

  const client = isCompany
    ? {
        Tip: "PJ",
        Denumire: company.name || "Client PJ",
        CodUnic: company.cui || undefined,
        RegCom: company.regCom || undefined,
        PlatitorTVA: !!company.vatPayer,
        Email: email,
        Tara: (company.country || "RO").toUpperCase(),
        Judet: company.county || undefined,
        Localitate: company.city || undefined,
        Adresa: company.address || undefined,
      }
    : {
        Tip: "PF",
        Nume: order?.name || "Client",
        Email: email,
        Tara: (order?.country || "RO").toUpperCase(),
      };

  const srcItems = Array.isArray(order?.items) ? order.items : [];

  const lines = srcItems.map((it) => {
    const qty = Math.max(1, Number(it.quantity || 1));
    const total = Number(it.amount_total || 0);
    const unit = total / qty;
    const label =
      String(it.type).toLowerCase() === "courier_fee"
        ? (it.name || "Taxă transport")
        : (it.name || it.description || "Produs");
    return {
      Denumire: label,
      CodArticol: it.fileKey || it.format || undefined,
      UM: "buc",
      Cantitate: qty,
      Pret: unit,
      TVA: pickVatRate(it),
    };
  });

  // Transport: îl includem DOAR dacă vine ca linie din coș/Stripe.
  return {
    Site: FGO_SITE,
    Client: client,
    Articole: lines,
    Moneda: (order?.currency || "RON").toUpperCase(),
    Data: new Date().toISOString().slice(0, 10),
    NrComanda: order?.orderNo || order?.id,
    TrimiteEmailClient: true,
    Observatii: "Factura generata automat din Midaway (Stripe) — neplatitor TVA",
  };
}

// ——— POST helper + LOG ———
async function tryPost(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "X-API-KEY": API_KEY,
      "X-Auth-Token": API_KEY,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
  console.log("FGO try:", url, "→", res.status);
  return { status: res.status, ok: res.ok, json, url };
}

export async function createFgoInvoice({ order, email, company }) {
  if (!API_KEY) throw new Error("Missing FGO_API_KEY");

  const payload = buildFgoPayload({ order, email, company });

  // Construim o matrice de baze (v1, v2, fără v, v4) × căi posibile
  const bases = [
    trimSlash(API_URL),                                                // ce ai în ENV (ex: /api/v1)
    trimSlash(API_URL).replace(/\/api\/v\d+$/i, "/api"),               // /api
    trimSlash(API_URL).replace(/\/api\/v\d+$/i, ""),                   // fără /api/v
    trimSlash(API_URL).replace(/\/api\/v\d+$/i, "/api/v2"),            // /api/v2
    trimSlash(API_URL).replace(/\/api\/v\d+$/i, "/api/v4"),            // /api/v4 (unii o expun așa)
  ];

  const paths = [
    "/invoice/create",
    "/invoices/create",
    "/invoices",
    "/ecommerce/invoice",
    "/ecommerce/invoice/create",
    "/ecommerce/create-invoice",
    "/factura/create",
    "/facturi/create",
  ];

  const endpoints = [];
  for (const b of bases) {
    for (const p of paths) {
      const u = trimSlash(b) + p;
      endpoints.push(u);
      endpoints.push(`${u}?site=${encodeURIComponent(FGO_SITE)}`);
    }
  }

  let last;
  for (const ep of endpoints) {
    try {
      last = await tryPost(ep, payload);
      if (last.ok) {
        const j = last.json || {};
        return {
          ok: true,
          id: j?.id || j?.Id || j?.InvoiceId,
          number: j?.NumarFactura || j?.number || j?.Numar || j?.InvoiceNumber,
          series: j?.SerieFactura || j?.series,
          pdfUrl: j?.pdf || j?.PdfUrl || j?.url || undefined,
          raw: j,
        };
      }
    } catch (e) {
      last = { error: String(e) };
    }
  }

  const err = new Error(`FGO create invoice failed: ${last?.status || "no-response"}`);
  err.details = last?.json || last;
  throw err;
}

// ===============================
// End of /api/invoice-fgo.mjs
// ===============================
