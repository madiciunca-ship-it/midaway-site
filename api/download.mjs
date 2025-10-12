// /api/download.mjs
import fs from "fs";
import path from "path";
import crypto from "crypto";

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
    if (!data || !data.exp || Date.now() > Number(data.exp)) return null;
    return data; // { sid, email, keys, exp }
  } catch (err) {
    console.error("Eroare verificare token:", err);
    return null;
  }
}

// === HARTA: <bookId>:<FORMAT>/<LANG> → fișier real din /public/files
// Acceptăm ALIASURI pentru bookId (ca să nu mai conteze ce id vine din coș)
const FILES = {
  // O zi de care să-ți amintești (aliasuri: o-zi, o-zi-de-care-sa-ti-amintesti)
  "o-zi:PDF/RO":  "./public/files/o-zi-de-care-sa-ti-amintesti-ro.pdf",
  "o-zi:EPUB/RO": "./public/files/o-zi-de-care-sa-ti-amintesti-ro.epub",
  "o-zi-de-care-sa-ti-amintesti:PDF/RO":  "./public/files/o-zi-de-care-sa-ti-amintesti-ro.pdf",
  "o-zi-de-care-sa-ti-amintesti:EPUB/RO": "./public/files/o-zi-de-care-sa-ti-amintesti-ro.epub",
  // (EN lipsește încă, deci nu mapăm nimic pt EN)

  // Zile și nopți de Vietnam… (aliasuri: vietnam, 2)
  "vietnam:PDF/RO":  "./public/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.pdf",
  "vietnam:EPUB/RO": "./public/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.epub",
  "vietnam:PDF/EN":  "./public/files/days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.pdf",
  "vietnam:EPUB/EN": "./public/files/days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.epub",

  "2:PDF/RO":  "./public/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.pdf",
  "2:EPUB/RO": "./public/files/zile-si-nopti-de-vietnam-bucati-dintr-un-suflet-nomad-ro.epub",
  "2:PDF/EN":  "./public/files/days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.pdf",
  "2:EPUB/EN": "./public/files/days-and-nights-of-vietnam-the-puzzle-of-my-soul-en.epub",
};

const LABELS = {
  "o-zi:PDF/RO":  "O zi de care să-ți amintești — PDF/RO",
  "o-zi:EPUB/RO": "O zi de care să-ți amintești — EPUB/RO",
  "o-zi-de-care-sa-ti-amintesti:PDF/RO":  "O zi de care să-ți amintești — PDF/RO",
  "o-zi-de-care-sa-ti-amintesti:EPUB/RO": "O zi de care să-ți amintești — EPUB/RO",

  "vietnam:PDF/RO":  "Zile și nopți de Vietnam — PDF/RO",
  "vietnam:EPUB/RO": "Zile și nopți de Vietnam — EPUB/RO",
  "vietnam:PDF/EN":  "Days and Nights of Vietnam — PDF/EN",
  "vietnam:EPUB/EN": "Days and Nights of Vietnam — EPUB/EN",

  "2:PDF/RO":  "Zile și nopți de Vietnam — PDF/RO",
  "2:EPUB/RO": "Zile și nopți de Vietnam — EPUB/RO",
  "2:PDF/EN":  "Days and Nights of Vietnam — PDF/EN",
  "2:EPUB/EN": "Days and Nights of Vietnam — EPUB/EN",
};

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
      res.status(403).send("Link invalid sau expirat. Te rugăm să ne contactezi pentru reactivare.");
      return;
    }

    const allowedKeys = Array.isArray(data.keys) ? data.keys : [];

    // DESCĂRCARE DIRECTĂ
    if (f && FILES[f] && allowedKeys.includes(f)) {
      const filePath = path.resolve(FILES[f]);
      if (!fs.existsSync(filePath)) {
        res.status(404).send("Fișierul nu a fost găsit.");
        return;
      }
      const lower = filePath.toLowerCase();
      const isPDF = lower.endsWith(".pdf");
      const isEPUB = lower.endsWith(".epub");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${path.basename(filePath)}"`
      );
      res.setHeader(
        "Content-Type",
        isPDF ? "application/pdf" : isEPUB ? "application/epub+zip" : "application/octet-stream"
      );

      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // PAGINĂ LISTĂ
    const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
    const items = allowedKeys
      .filter((key) => FILES[key] && fs.existsSync(path.resolve(FILES[key])))
      .map(
        (key) =>
          `<li>📥 <a href="${SITE}/api/download?token=${encodeURIComponent(token)}&f=${encodeURIComponent(key)}" style="color:#2a9d8f;text-decoration:none;font-weight:600">${LABELS[key] || key}</a></li>`
      )
      .join("");

    const bodyHtml =
      items ||
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
