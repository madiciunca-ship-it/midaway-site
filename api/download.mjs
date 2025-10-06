// api/download.mjs
import fs from "fs";
import path from "path";
import crypto from "crypto";

// mapare cheie → fișier
// poți schimba denumirile și ordinea după preferință
const FILES = {
  "PDF/RO": {
    path: "./public/files/o-zi-de-care-sa-ti-amintesti-ro.pdf",
    filename: "o-zi-de-care-sa-ti-amintesti-RO.pdf",
  },
  "PDF/EN": {
    path: "./public/files/o-zi-de-care-sa-ti-amintesti-en.pdf",
    filename: "o-zi-de-care-sa-ti-amintesti-EN.pdf",
  },
  "EPUB/RO": {
    path: "./public/files/o-zi-de-care-sa-ti-amintesti-ro.epub",
    filename: "o-zi-de-care-sa-ti-amintesti-RO.epub",
  },
  "EPUB/EN": {
    path: "./public/files/o-zi-de-care-sa-ti-amintesti-en.epub",
    filename: "o-zi-de-care-sa-ti-amintesti-EN.epub",
  },
};

// content-type în funcție de extensie
function contentTypeFor(filePath) {
  const ext = (filePath.split(".").pop() || "").toLowerCase();
  if (ext === "pdf") return "application/pdf";
  if (ext === "epub") return "application/epub+zip";
  return "application/octet-stream";
}

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
    const { token, file } = req.query;
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

    // dacă avem ?file=..., servim fișierul direct (stream)
    if (file) {
      const entry = FILES[file.toUpperCase()];
      if (!entry) {
        res.status(404).send("Fișierul solicitat nu există.");
        return;
      }
      const filePath = path.resolve(entry.path);
      if (!fs.existsSync(filePath)) {
        res.status(404).send("Fișierul nu a fost găsit.");
        return;
      }

      res.setHeader("Content-Type", contentTypeFor(filePath));
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${entry.filename || path.basename(filePath)}"`
      );
      return fs.createReadStream(filePath).pipe(res);
    }

    // altfel, afișăm pagina cu link-urile (toate) – fiecare merge prin /api/download?token=...&file=CHEIE
    const SITE = process.env.SITE_URL || "https://midaway.vercel.app";
    const brand = {
      primary: "#2a9d8f",
      text: "#222",
      light: "#f7faf9",
    };

    const links = Object.keys(FILES)
      .map((k) => {
        const url = `${SITE}/api/download?token=${encodeURIComponent(token)}&file=${encodeURIComponent(
          k
        )}`;
        return `<li style="margin:10px 0">
          <a href="${url}" style="color:${brand.primary};text-decoration:none;font-weight:600">📥 ${k}</a>
        </li>`;
      })
      .join("");

    const page = `<!doctype html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <title>Descărcări eBook</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="background:${brand.light};margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:${brand.text}">
    <div style="max-width:720px;margin:32px auto;background:#fff;border-radius:16px;border:1px solid #e9f3f1;overflow:hidden">
      <div style="padding:22px 24px;border-bottom:1px solid #eef5f3;display:flex;align-items:center;gap:12px">
        <img src="${SITE}/logo-midaway.png" alt="Midaway" height="28" />
        <strong style="font-size:18px">Descărcări eBook</strong>
      </div>
      <div style="padding:24px">
        <h1 style="margin:0 0 8px 0;color:${brand.primary};font-size:22px">Descărcări eBook</h1>
        <p style="margin:0 0 8px 0">Linkul tău este activ și valabil <strong>48 de ore</strong> de la primirea emailului.</p>
        <ul style="padding:0 0 0 18px;margin:16px 0 18px 0">
          ${links}
        </ul>
        <p style="color:#666;font-size:12px;margin-top:12px"><small>ID sesiune: ${data.sid}</small></p>
      </div>
    </div>
  </body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(page);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("A apărut o eroare. Te rugăm să ne scrii.");
  }
}
