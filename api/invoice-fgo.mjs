// ===============================
// File: /api/invoice-fgo.mjs
// Purpose: Create & email invoices in FGO after Stripe payment
// Notes:
// - Uses env: FGO_API_KEY, FGO_API_URL, FGO_SITE (ex: midaway.ro)
// - Tries a few common FGO endpoints (they differ per account)
// - Returns minimal data: { ok, number, series, id, pdfUrl, raw }
// - Safe to import dynamically from other routes
// ===============================


const API_KEY = process.env.FGO_API_KEY;
const API_URL = (process.env.FGO_API_URL || "https://api.fgo.ro/api/v1").replace(/\/$/, "");
const FGO_SITE = process.env.FGO_SITE || "midaway.ro"; // OPTIONAL but recommended by FGO


function pickVatRate(item) {
const type = String(item?.type || "").toLowerCase();
const fmt = String(item?.format || "").toUpperCase();
// Books in RO: 5% TVA; services/courier usually 19%
if (type === "book" || fmt === "PAPERBACK" || fmt === "PDF" || fmt === "EPUB") return 5;
return 19;
}


function buildFgoPayload({ order, email, company }) {
const isCompany = !!(company && (company.name || company.cui) && company.requested);


const client = isCompany
? {
Tip: "PJ", // Persoană juridică
Denumire: company.name || "Client PJ",
CodUnic: company.cui || undefined, // CUI
RegCom: company.regCom || undefined,
PlatitorTVA: !!company.vatPayer,
Email: email,
Tara: (company.country || "RO").toUpperCase(),
Judet: company.county || undefined,
Localitate: company.city || undefined,
Adresa: company.address || undefined,
}
: {
Tip: "PF", // Persoană fizică
Nume: order?.name || "Client",
Email: email,
Tara: (order?.country || "RO").toUpperCase(),
};


const lines = (order?.items || []).map((it) => ({
Denumire: it.name || it.description || "Produs",
CodArticol: it.fileKey || it.format || undefined, // optional, helps matching in FGO
UM: "buc",
Cantitate: it.quantity || 1,
Pret: Number(it.amount_total || 0),
TVA: pickVatRate(it),
}));


const payload = {
Site: FGO_SITE,
Client: client,
Articole: lines,
Moneda: (order?.currency || "RON").toUpperCase(),
Data: new Date().toISOString().slice(0, 10),
NrComanda: order?.orderNo || order?.id,
TrimiteEmailClient: true, // FGO să trimită factura clientului automat
Observatii: "Factura generata automat din Midaway (Stripe)",
};


return payload;
}


async function tryPost(url, body) {
const res = await fetch(url, {
method: "POST",
headers: {
//