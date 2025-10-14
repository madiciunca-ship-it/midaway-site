// /api/download.mjs
import crypto from "crypto";
import { BOOKS } from "../src/data/books.js";

// verificare token HMAC (valabilitate 48h)
function verifyToken(token) {
  try {
    const [bodyB64, sig] = String(token || "").split(".");
    if (!bodyB64 || !sig) return null;

    const expectedSig = crypto
      .createHmac("sha256", process.env.DOWNLOAD_SECRET || "dev-secret")
      .update(bodyB64)
      .digest("base64url");

    if (sig !== expectedSig) return null;

    const data = JSON.parse(Buffer.from(bodyB64, "base64url").toString("utf8"));
    if (!data || !data.exp || Date.now() > Number(data.exp)) return null; // expirat
    return data; // { sid, email, keys, exp }
  } catch (err) {
    console.error("Eroare verificare token:", err);
    return null;
  }
}

// Construim dinamic hărțile: <bookId>:<FORMAT> → url și etichetă
const FILES = {};
const LABELS = {};

for (const book of BOOKS) {
  if (!book?.files) continue;
  const title = book.title || book.id;
  for (const [fmtRaw, url] of Object.entries(book.files)) {
    const fmt = String(fmtRaw).toUpperCase();
    const key = `${book.id}:${fmt}`;
    FILES[key] = url; // ex: "/files/....pdf"
    LABELS[key] = `${title} — ${fmt}`;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const { token, f } = req.query || {};
    if (!token) {
      res.status(400).send("Token lipsă.");
      return;
    }

    const data = verifyToken(token);
    if (!data) {
      res
        .status(403)
        .send("Link invalid sau expirat. Te rugăm să ne contactezi pentru reactivare.");
      return;
    }

    const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
    const rawKeys = Array.isArray(data.keys) ? data.keys : [];
    // Cheile din token sunt deja în forma nouă <bookId>:<FORMAT>
    const allowedKeys = rawKeys.filter(Boolean);

    // DESCĂRCARE DIRECTĂ: ?f=<bookId>:<FORMAT>
    if (f) {
      const key = String(f);
      if (FILES[key] && allowedKeys.includes(key)) {
        const fileUrl = `${SITE}${FILES[key]}`; // URL public (din /public/files)
        res.writeHead(302, { Location: fileUrl });
        res.end();
        return;
      }
    }

    // LISTA: doar cheile permise + care există în FILES
    const links = allowedKeys
      .filter((key) => !!FILES[key])
      .map(
        (key) =>
          `<li>📥 <a href="${SITE}/api/download?token=${encodeURIComponent(
            token
          )}&f=${encodeURIComponent(
            key
          )}" style="color:#2a9d8f;text-decoration:none;font-weight:600">${LABELS[key] || key}</a></li>`
      )
      .join("");

    const bodyHtml =
      links ||
      `<div style="margin-top:16px;padding:14px;border:1px solid #eee;border-radius:10px;background:#fafafa;color:#666">
         Nu există fișiere disponibile pentru comanda ta.
         Scrie-ne la <a href="mailto:contact@midaway.ro" style="color:#2a9d8f;text-decoration:none">contact@midaway.ro</a>.
       </div>`;

    const html = `
      <!doctype html>
      <html lang="ro">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Descărcări eBook</title>
      </head>
      <body style="margin:0;background:#f6f8f9;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111;">
        <div style="max-width:720px;margin:40px auto;background:#fff;border-radius:14px;padding:24px 20px;box-shadow:0 8px 30px rgba(0,0,0,.06)">
          <h1 style="margin:0 0 10px 0;color:#2a9d8f">Descărcări eBook</h1>
          <p>Linkul tău este activ și valabil 48 de ore de la primirea emailului.</p>
          <ul style="line-height:1.9;margin:14px 0 0 18px">${bodyHtml}</ul>
          <p style="color:#666;font-size:12px;margin-top:22px"><small>ID sesiune: ${data.sid || "-"}</small></p>
        </div>
      </body>
      </html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("A apărut o eroare. Te rugăm să reîncerci.");
  }
}
