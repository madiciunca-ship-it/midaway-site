// /api/download.mjs
import fs from "fs";
import path from "path";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// —— HMAC verify (token semnat în webhook) ——
function verifyToken(token) {
  try {
    const [bodyB64, sig] = String(token || "").split(".");
    if (!bodyB64 || !sig) return null;

    const expectedSig = crypto
      .createHmac("sha256", process.env.DOWNLOAD_SECRET || "dev-secret")
      .update(bodyB64)
      .digest("base64url");

    if (sig !== expectedSig) return null;

    const payload = JSON.parse(
      Buffer.from(bodyB64, "base64url").toString("utf8")
    );

    if (!payload.exp || Date.now() > Number(payload.exp)) return null;
    return payload; // { sid, email, exp }
  } catch {
    return null;
  }
}

// —— Mapă format → nume fișier EXACT în /public/files ——
const FILES = {
  "PDF/RO": "o-zi-de-care-sa-ti-amintesti-ro.pdf",
  "PDF/EN": "days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.pdf",
  "EPUB/RO": "zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.epub",
  "EPUB/EN": "zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-en.epub",
  // paperback nu are fișier digital
};

function pickFileFromTitle(title) {
  const upper = String(title || "").toUpperCase();
  if (upper.includes("PDF") && upper.includes("RO")) return FILES["PDF/RO"];
  if (upper.includes("PDF") && upper.includes("EN")) return FILES["PDF/EN"];
  if (upper.includes("EPUB") && upper.includes("RO")) return FILES["EPUB/RO"];
  if (upper.includes("EPUB") && upper.includes("EN")) return FILES["EPUB/EN"];
  return null;
}

function contentTypeByExt(file) {
  if (file.endsWith(".pdf")) return "application/pdf";
  if (file.endsWith(".epub")) return "application/epub+zip";
  return "application/octet-stream";
}

export default async function handler(req, res) {
  try {
    // query din runtime vercel classic (StackBlitz)
    const token = req.query?.token;
    const requestedFile = req.query?.file;

    // 1) Validăm tokenul
    const payload = verifyToken(token);
    if (!payload) {
      res
        .status(403)
        .send("Link invalid sau expirat. Te rugăm să ne contactezi.");
      return;
    }

    // 2) Luăm sesiunea Stripe și derivăm fișierele permise
    const session = await stripe.checkout.sessions.retrieve(payload.sid, {
      expand: ["line_items.data.price.product"],
    });

    const items = session.line_items?.data || [];
    const files = [];
    for (const it of items) {
      const name =
        it.price?.product?.name || it.description || it.price?.nickname;
      const file = pickFileFromTitle(name);
      if (file && !files.includes(file)) files.push(file);
    }

    if (!files.length) {
      res
        .status(404)
        .send(
          "Nu am găsit fișiere digitale pentru această comandă. Dacă ai cumpărat Paperback, acesta va fi livrat fizic."
        );
      return;
    }

    // 3) Dacă primim ?file=..., livrăm DIRECT fișierul (doar dacă e permis)
    if (requestedFile) {
      if (!files.includes(requestedFile)) {
        res.status(403).send("Nu ai acces la acest fișier.");
        return;
      }
      const filePath = path.resolve(`./public/files/${requestedFile}`);
      if (!fs.existsSync(filePath)) {
        res.status(404).send("Fișierul nu a fost găsit.");
        return;
      }

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${requestedFile}"`
      );
      res.setHeader("Content-Type", contentTypeByExt(requestedFile));
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // 4) Altminteri, arătăm o pagină simplă cu link-uri către fiecare fișier
    const base = process.env.SITE_URL || "https://midaway.vercel.app";
    const links = files
      .map(
        (f) =>
          `<li><a href="${base}/api/download?token=${encodeURIComponent(
            token
          )}&file=${encodeURIComponent(f)}">📥 ${f}</a></li>`
      )
      .join("");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`
      <!doctype html>
      <html lang="ro">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Descărcări eBook</title>
        <style>
          body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; line-height: 1.6; }
          .card { max-width: 680px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.06); }
          h1 { color: #2a9d8f; margin-top: 0; }
          ul { padding-left: 18px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Descărcări eBook</h1>
          <p>Linkul tău este activ și valabil 48 de ore de la primirea emailului.</p>
          <ul>${links}</ul>
          <p style="color:#666"><small>ID sesiune: ${payload.sid}</small></p>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("A apărut o eroare. Te rugăm să reîncerci.");
  }
}
