// scripts/generate-rss.js
import fs from "node:fs";
import path from "node:path";
import posts from "../src/data/posts.js";

/**
 * Determinăm domeniul site-ului din variabile de mediu:
 * - SITE_URL        (recomandat)  ex: https://midaway.ro
 * - VITE_SITE_URL   (alternativ)
 * - VERCEL_URL      (setat automat de Vercel, fără protocol) → îl prefixăm cu https://
 *
 * Fallback: https://midaway.vercel.app
 */
const envSite =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

const site = envSite || "https://midaway.vercel.app"; // fallback sigur

function escapeXml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toRssItem(p) {
  const absoluteLink = `${site}/blog/${encodeURIComponent(p.slug)}`;
  const desc = escapeXml((p.excerpt || "").trim());
  const pub = new Date(p.date).toUTCString();

  return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${absoluteLink}</link>
      <guid>${absoluteLink}</guid>
      <pubDate>${pub}</pubDate>
      <description>${desc}</description>
    </item>`;
}

const itemsXml = posts
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(toRssItem)
  .join("\n");

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Midaway — Blog</title>
    <link>${site}/blog</link>
    <description>Gânduri, povești și fragmente de drum.</description>
    <language>ro-RO</language>
${itemsXml}
  </channel>
</rss>
`;

// scriem feed.xml în /public
const outDir = path.join(process.cwd(), "public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "feed.xml"), rssXml.trim() + "\n", "utf8");

console.log(`[RSS] generat ${posts.length} articole → public/feed.xml`);
console.log(`[RSS] bazat pe site: ${site}`);
