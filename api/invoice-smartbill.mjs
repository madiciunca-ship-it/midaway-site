// /api/invoice-smartbill.mjs
import fetch from "node-fetch";

/**
 * Creează o factură în SmartBill.
 * NU aruncă erori critice: dacă lipsesc cheile → întoarce null și loghează.
 *
 * @param {Object} params
 *   - order  → obiectul order salvat (conține orderNo, items, amount, currency, company etc.)
 *   - email  → email client (pt. trimitere PDF din SmartBill)
 *   - company → meta companie (companyMeta din webhook)
 */
export async function createSmartBillInvoice({ order, email, company }) {
  // 1) Guard – nu avem configurare încă
  const USER = process.env.SMARTBILL_USER || "";
  const PASS = process.env.SMARTBILL_PASS || "";
  const SERIES = process.env.SMARTBILL_SERIES || ""; // ex: 'MID'
  const TAX = Number(process.env.SMARTBILL_TAX_RATE ?? 19); // TVA implicit
  const SANDBOX = String(process.env.SMARTBILL_SANDBOX || "true") === "true";

  if (!USER || !PASS || !SERIES) {
    console.log("🟡 SmartBill not configured. Skipping invoice.");
    return null;
  }

  try {
    // 2) Endpoint: sandbox vs. live
    const base = SANDBOX
      ? "https://ws.sandbox.smartbill.ro/SBORO/api"
      : "https://ws.smartbill.ro/SBORO/api";

    // 3) Linie produse: mapăm itemele (ignorăm taxa de curier ca linie separată, dacă vrei poți să o adaugi)
    const rows = (order.items || [])
      .filter((it) => it.type !== "courier_fee")
      .map((it) => ({
        // nume pe factură
        name: it.name || "Produs",
        // cantitate — pentru servicii per pagină ai cantități > 1 (qty vine în Stripe, aici order.items e sumarizat)
        // în logul nostru nu am reținut qty, dar poți trece 1; totalul îl dăm la preț
        // dacă vrei cantitatea exactă, putem salva qty și în order (de făcut ulterior)
        quantity: 1,
        // preț unitar fără TVA – SmartBill așteaptă fără TVA; dacă lucrezi cu prețuri cu TVA, ajustează formula
        // aici simplificăm și presupunem prețuri sunt cu TVA inclus → scoatem TVA-ul
        price: round2(removeVAT(it.amount_total || 0, TAX)),
        isTaxIncluded: false,      // prețul de sus e fără TVA
        taxName: "TVA",
        taxPercentage: TAX,
      }));

    // poți adăuga și taxa curier ca linie separată (opțional)
    if (order.courierFee > 0) {
      rows.push({
        name: "Taxă curier",
        quantity: 1,
        price: round2(removeVAT(order.courierFee, TAX)),
        isTaxIncluded: false,
        taxName: "TVA",
        taxPercentage: TAX,
      });
    }

    // 4) Client – dacă nu a bifat „factură pe firmă”, folosim persoană fizică
    const client = company?.requested
      ? {
          name: company.name || "Client companie",
          vatCode: company.cui || undefined,         // CUI
          regCom: company.regCom || undefined,       // RC
          isTaxPayer: company.vatPayer || false,     // plătitor TVA?
          address: company.address || "",
          city: company.city || "",
          county: company.county || "",
          country: company.country || "RO",
          email: email || undefined,
        }
      : {
          name: order.name || "Client",
          address: order.address || "",
          city: "",
          county: "",
          country: "RO",
          email: email || undefined,
        };

    // 5) Payload minim SmartBill
    const payload = {
      companyVatCode: process.env.SMARTBILL_OUR_VAT || "", // CUI-ul tău (emitent)
      seriesName: SERIES,
      isDraft: false,             // true → nu finalizează; false → emite
      issueDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      currency: (order.currency || "RON").toUpperCase(),
      language: "ro",
      client,
      products: rows,
      sendEmail: true,            // trimite email clientului cu factura
      email: email || undefined,  // destinatar PDF
      mentions: `Comandă #${order.orderNo} • ${order.formats?.join(", ") || ""}`,
      // opțional: dueDate, deliveryDate etc.
    };

    // 6) Request HTTP (Basic Auth)
    const res = await fetch(`${base}/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64"),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("🔴 SmartBill error:", res.status, data);
      return null;
    }

    console.log("✅ SmartBill invoice created:", data?.number || data);
    return data; // conține număr factură etc.
  } catch (e) {
    console.error("🔴 SmartBill exception:", e);
    return null;
  }
}

// ——— helpers ———
function removeVAT(priceWithVAT, vatPct) {
  const v = Number(priceWithVAT) || 0;
  const r = 1 + (Number(vatPct) || 0) / 100;
  return v / r;
}
function round2(x) {
  return Math.round((Number(x) || 0) * 100) / 100;
}
