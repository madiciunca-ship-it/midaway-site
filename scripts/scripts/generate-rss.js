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

const itemsXml = list
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

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Midaway — Blog</title>
    <link>${SITE}/blog</link>
    <description>Articole și fragmente de drum.</description>
    ${itemsXml}
  </channel>
</rss>`;

const outPath = path.resolve(__dirname, "../dist/feed.xml");
fs.writeFileSync(outPath, rss, "utf8");
console.log("[rss] feed.xml generat la:", outPath);
