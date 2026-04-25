import crypto from "crypto";

function signToken(payloadObj) {
  const body = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", process.env.DOWNLOAD_SECRET || "dev-secret")
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

export default async function handler(req, res) {
  try {
    const { secret, key } = req.query || {};

    if (!process.env.ADMIN_TEST_SECRET) {
      return res.status(500).json({ error: "Missing ADMIN_TEST_SECRET" });
    }

    if (!secret || secret !== process.env.ADMIN_TEST_SECRET) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!key) {
      return res.status(400).json({ error: "Missing key" });
    }

    const exp = Date.now() + 30 * 60 * 1000; // 30 min
    const token = signToken({
      sid: "debug-session",
      email: "test@midaway.ro",
      keys: [String(key)],
      exp,
    });

    const SITE = process.env.SITE_URL || "https://midaway.ro";
    const url = `${SITE}/api/download?token=${encodeURIComponent(token)}&f=${encodeURIComponent(key)}`;

    return res.status(200).json({ ok: true, key, url });
  } catch (err) {
    console.error("debug-download-link error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}