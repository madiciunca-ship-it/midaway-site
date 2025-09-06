// scripts/generate-rss.js
import fs from "node:fs";
import path from "node:path";
import posts from "../src/data/posts.js";

const site = ""; // lasă gol în dev. Vercel va servi /feed.xml la rădăcină

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toRssItem(p) {
  const link = `/blog/${encodeURIComponent(p.slug)}`;
  const desc = escapeXml((p.excerpt || "").trim());
  const pub = new Date(p.date).toUTCString();
  return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pub}</pubDate>
      <description>${desc}</description>
    </item>`;
}

const items = posts
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(toRssItem)
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Midaway — Blog</title>
    <link>${site}/blog</link>
    <description>Gânduri, povești și fragmente de drum.</description>
    <language>ro-RO</language>
    ${items}
  </channel>
</rss>`;

const outDir = path.join(process.cwd(), "public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "feed.xml"), rss.trim(), "utf8");

console.log(`[RSS] generat ${posts.length} articole -> public/feed.xml`);
