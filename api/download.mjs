// /api/download.mjs
import fs from "fs";
import path from "path";
import crypto from "crypto";

// mapare format → fișier din /public/files
const FILES = {
  "PDF/RO": "./public/files/o-zi-de-care-sa-ti-amintesti-ro.pdf",
  "PDF/EN": "./public/files/o-zi-de-care-sa-ti-amintesti-en.pdf",
  "EPUB/RO": "./public/files/o-zi-de-care-sa-ti-amintesti-ro.epub",
  "EPUB/EN": "./public/files/o-zi-de-care-sa-ti-amintesti-en.epub",
};

function verifyToken(token) {
  try {
    const [bodyB64, sig] = token.split(".");
    if (!bodyB64 || !sig) return null;

    const expectedSig = crypto
      .createHmac("sha256", process.env.DOWNLOAD_SECRET || "dev-secret")
      .update(bodyB64)
      .digest("base64url");

    if (sig !== expectedSig) return null;

    const data = JSON.parse(Buffer.from(bodyB64, "base64url").toString("utf8"));
    if (Date.now() > data.exp) return null; // expirat
    return data;
  } catch (err) {
    console.error("Eroare verificare token:", err);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const { token, f } = req.query;
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

    // dacă s-a cerut direct un format (ex: ?f=EPUB/RO), încearcă descărcarea
    if (f && FILES[f]) {
      const filePath = path.resolve(FILES[f]);
      if (!fs.existsSync(filePath)) {
        res.status(404).send("Fișierul nu a fost găsit.");
        return;
      }

      // content-type corect
      const isPDF = filePath.toLowerCase().endsWith(".pdf");
      const isEPUB = filePath.toLowerCase().endsWith(".epub");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${path.basename(filePath)}"`
      );
      res.setHeader(
        "Content-Type",
        isPDF
          ? "application/pdf"
          : isEPUB
          ? "application/epub+zip"
          : "application/octet-stream"
      );

      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // altfel: afișează pagina cu linkuri DOAR pentru fișierele existente
    const available = Object.entries(FILES).filter(([, p]) =>
      fs.existsSync(path.resolve(p))
    );

    const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
    const links = available
      .map(
        ([label]) =>
          `<li><a href="${SITE}/api/download?token=${encodeURIComponent(
            token
          )}&f=${encodeURIComponent(label)}" style="color:#2a9d8f;text-decoration:none;font-weight:600">${label}</a></li>`
      )
      .join("");

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
          ${
            available.length
              ? `<ul style="line-height:1.9;margin:14px 0 0 18px">${links}</ul>`
              : `<div style="margin-top:16px;padding:14px;border:1px solid #eee;border-radius:10px;background:#fafafa;color:#666">
                   Nu există fișiere disponibile momentan pentru această comandă. Te rugăm să ne scrii la 
                   <a href="mailto:contact@midaway.ro" style="color:#2a9d8f;text-decoration:none">contact@midaway.ro</a>.
                 </div>`
          }
          <p style="color:#666;font-size:12px;margin-top:22px"><small>ID sesiune: ${data.sid}</small></p>
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
