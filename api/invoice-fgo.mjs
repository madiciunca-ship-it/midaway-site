// ===============================
// File: /api/invoice-fgo.mjs
// Purpose: Creează factură în FGO după plata Stripe.
// Env necesare: FGO_API_KEY, FGO_API_URL, FGO_SITE, IS_VAT_PAYER (optional), SHIPPING_FEE_DEFAULT (optional)
// ===============================

const API_KEY = process.env.FGO_API_KEY;
const API_URL = (process.env.FGO_API_URL || "https://api.fgo.ro/api/v1").replace(/\/$/, "");
const FGO_SITE = process.env.FGO_SITE || "midaway.ro";

// ——— TVA ———
// Firma este NEPLĂTITOARE → TVA 0 pe toate liniile.
// Dacă veți deveni plătitori: IS_VAT_PAYER=true și se aplică 11% cărți / 21% servicii/transport.
function pickVatRate(item) {
  if (String(process.env.IS_VAT_PAYER || "").toLowerCase() === "true") {
    const type = String(item?.type || "").toLowerCase();
    const fmt = String(item?.format || "").toUpperCase();
    if (type === "book" || fmt === "PDF" || fmt === "EPUB" || fmt === "PAPERBACK") return 11;
    return 21;
  }
  return 0;
}

// Construim payload-ul pentru FGO, pe baza comenzii (exact ce vine din coș/Stripe).
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

  // 1) map liniile existente (produse/servicii/curier) din coș
  const lines = srcItems.map((it) => {
    const qty = Math.max(1, Number(it.quantity || 1));
    const total = Number(it.amount_total || 0); // total pe linie
    const unit = total / qty;                   // preț unitar
    const label =
      String(it.type).toLowerCase() === "courier_fee"
        ? (it.name || "Taxă transport")
        : (it.name || it.description || "Produs");

    return {
      Denumire: label,
      CodArticol: it.fileKey || it.format || undefined, // opțional, pt. matching în FGO
      UM: "buc",
      Cantitate: qty,
      Pret: unit,           // FGO așteaptă preț unitar
      TVA: pickVatRate(it), // 0 pentru neplătitor
    };
  });

// Transport: îl includem DOAR dacă vine ca linie din coș/Stripe
// (type === "courier_fee"). Nu inventăm o linie dacă nu a fost plătită.
  
return {
    Site: FGO_SITE,
    Client: client,
    Articole: lines,
    Moneda: (order?.currency || "RON").toUpperCase(),
    Data: new Date().toISOString().slice(0, 10),
    NrComanda: order?.orderNo || order?.id,
    TrimiteEmailClient: true, // FGO trimite factura pe email clientului
    Observatii: "Factura generata automat din Midaway (Stripe) — neplatitor TVA",
  };
}

// POST helper (încearcă toate headerele comune de auth FGO)
async function tryPost(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // FGO acceptă de regulă unul din aceste headere; trimitem toate cele comune
      Authorization: `Bearer ${API_KEY}`,
      "X-API-KEY": API_KEY,
      "X-Auth-Token": API_KEY,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { status: res.status, ok: res.ok, json };
}

export async function createFgoInvoice({ order, email, company }) {
  if (!API_KEY) throw new Error("Missing FGO_API_KEY");

  const payload = buildFgoPayload({ order, email, company });

  // Câteva rute uzuale FGO (difera în funcție de cont/versiune)
  const endpoints = [
    `${API_URL}/invoice/create`,
    `${API_URL}/invoices/create`,
    `${API_URL}/invoices`,
    `${API_URL}/ecommerce/invoice`,
  ];

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
