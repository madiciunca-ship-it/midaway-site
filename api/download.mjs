import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    res.status(400).send("Token lipsă");
    return;
  }

  // decodăm tokenul și verificăm expirarea (48h)
  const decoded = Buffer.from(token, "base64url").toString("utf8");
  const [email, timestamp] = decoded.split(":");
  const expired = Date.now() - Number(timestamp) > 48 * 60 * 60 * 1000;

  if (expired) {
    res.status(403).send("Linkul de descărcare a expirat. Te rugăm să ne contactezi.");
    return;
  }

  // aici poți adapta pentru fișierul dorit
  const filePath = path.resolve("./public/ebooks/o-zi-de-care-sa-ti-amintesti.pdf");

  res.setHeader("Content-Disposition", 'attachment; filename="Midaway_eBook.pdf"');
  res.setHeader("Content-Type", "application/pdf");

  fs.createReadStream(filePath).pipe(res);
}
