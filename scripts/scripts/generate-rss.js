// scripts/generate-rss.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { default: posts } = await import(
  path.resolve(__dirname, "../src/data/posts.js")
);

const SITE = process.env.SITE_URL || "https://midaway.vercel.app";

const list = [...posts].sort((a, b) => b.date.localeCompare(a.date));

const items = list
  .map((p) => {
    const url = `${SITE}/blog/${encodeURIComponent(p.slug)}`;
    const desc =
      p.excerpt || (p.content?.[0] ?? "").slice(0, 200).replace(/</g, "&lt;");
    return `
<item>
  <title><![CDATA[${p.title}]]></title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  <description><![CDATA[${desc}]]></description>
</item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Midaway — Blog</title>
    <link>${SITE}/blog</link>
    <description>Articole și fragmente de drum.</description>
    ${items}
  </channel>
</rss>`;

const out = path.resolve(__dirname, "../dist/feed.xml");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, xml, "utf8");
console.log("[rss] feed.xml generat:", out);
