// ===============================
// File: /api/invoice-fgo.mjs
// Purpose: Emite factură în FGO (API v1) după plata Stripe.
// Doc: POST https://api.fgo.ro/v1/factura/emitere
// Hash = SHA-1( CodUnicFurnizor + CheiePrivata + DenumireClient ) UPPERCASE
// Env necesare: FGO_API_URL, FGO_ISSUER_CUI, FGO_PRIVATE_KEY, FGO_SERIE, SITE_URL
// ===============================

import crypto from "crypto";

const API_BASE     = (process.env.FGO_API_URL || "https://api.fgo.ro/v1").replace(/\/+$/, "");
const ISSUER_CUI   = process.env.FGO_ISSUER_CUI;     // ex: 42435400
const PRIVATE_KEY  = process.env.FGO_PRIVATE_KEY;    // FGO → Setări → eCommerce → Setări API
const SERIE        = process.env.FGO_SERIE || "MID";
const SITE_URL     = process.env.SITE_URL || "https://midaway.ro";

// ——— Helpers ———
function sha1Upper(s) {
  return crypto.createHash("sha1").update(String(s), "utf8").digest("hex").toUpperCase();
}

// Firmă neplătitoare TVA → mereu 0
function pickVatRate() {
  return 0;
}

// FGO cere „Judet” când Țara = RO. Fallback dacă lipsește.
function normalizeCounty(j, city) {
  if (j) return j;
  const c = String(city || "").toLowerCase();
  if (c.includes("bucure")) return "Bucuresti";
  return "Bucuresti";
}

// ——— Mapare comandă → payload FGO v1 ———
function buildFgoPayload({ order, email, company }) {
  const country = (order?.country || company?.country || "RO").toUpperCase();
  const isCompany = !!(company && company.requested && (company.name || company.cui));

  // adrese/aliasuri venite din webhook (vezi stripe-webhook)
  const addr   = order?.address || {};
  const judet  = normalizeCounty(order?.county || addr.state, addr.city);

  const client = isCompany
    ? {
        Tip: "PJ",
        Denumire:   company.name || "Client PJ",
        CodUnic:    company.cui || undefined,
        NrRegCom:   company.regCom || undefined,
        PlatitorTVA: !!company.vatPayer,
        Email:      email,
        Tara:       (company.country || "RO").toUpperCase(),
        Judet:      company.county || judet,
        Localitate: company.city || addr.city || undefined,
        Adresa:     company.address || [addr.line1, addr.line2].filter(Boolean).join(", ") || undefined,
      }
    : {
        Tip: "PF",
        Nume:       order?.name || "Client",
        Email:      email,
        Tara:       country,
        Judet:      judet,
        Localitate: addr.city || undefined,
        Adresa:     [addr.line1, addr.line2].filter(Boolean).join(", ") || undefined,
      };

  // Linii conform doc v1: Continut[i]{Denumire, UM, NrProduse, CotaTVA, (PretUnitar|PretTotal)}
  const items = Array.isArray(order?.items) ? order.items : [];
  const continut = items.map((it) => {
    const qty   = Math.max(1, Number(it.quantity || 1));
    const total = Number(it.amount_total || it.price || 0); // Stripe dă centi → tu deja ai transformat în RON/EUR în webhook
    const unit  = total / qty;

    const name =
      String(it.type).toLowerCase() === "courier_fee"
        ? (it.name || "Taxă transport")
        : (it.name || it.description || "Produs");

    return {
      Denumire:  name,
      UM:        "buc",
      NrProduse: qty,
      CotaTVA:   pickVatRate(),  // 0
      PretUnitar: Number(unit),
    };
  });

  // Pentru hash la PF folosim Nume, la PJ Denumire
  const clientNameForHash = client.Denumire || client.Nume || order?.name || "Client";

  // Payload minim v1
  const payload = {
    CodUnic:   ISSUER_CUI,                         // CUI furnizor (firma ta)
    Hash:      sha1Upper(`${ISSUER_CUI}${PRIVATE_KEY}${clientNameForHash}`),
    Valuta:    (order?.currency || "RON").toUpperCase(),
    TipFactura: "Factura",
    Serie:     SERIE,

    IdExtern:  order?.id || order?.orderNo,       // id comanda → verificare duplicat
    VerificareDuplicat: true,

    Client:    client,
    Continut:  continut,
    PlatformaUrl: SITE_URL,                       // recomandat de doc
  };

  return payload;
}

// ——— Apel efectiv către FGO ———
export async function createFgoInvoice({ order, email, company }) {
  if (!ISSUER_CUI || !PRIVATE_KEY) {
    throw new Error("FGO missing env: FGO_ISSUER_CUI or FGO_PRIVATE_KEY");
  }

  const url = `${API_BASE}/factura/emitere`;
  const body = buildFgoPayload({ order, email, company });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch { data = { raw: text }; }

  if (!res.ok || data?.Success === false) {
    const msg = data?.Message || res.statusText || "FGO error";
    const err = new Error(`FGO emitere eșuată: ${msg}`);
    err.details = data;
    throw err;
  }

  const f = data?.Factura || {};
  return {
    ok: true,
    number:  f.Numar || null,
    series:  f.Serie || null,
    link:    f.Link || null,
    payLink: f.LinkPlata || null,
    raw:     data,
  };
}
// ===============================
