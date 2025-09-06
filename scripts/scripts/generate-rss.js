// scripts/generate-rss.js
import fs from "node:fs";
import path from "node:path";
import posts from "../src/data/posts.js";

// când legi domeniul propriu, schimbă în: "https://midaway.ro"
const site = "https://midaway.vercel.app";

function escapeXml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function itemXml(p) {
  const slug = encodeURIComponent(p.slug);
  const link = `${site}/blog/${slug}`;
  const title = escapeXml(p.title);
  const pubDate = new Date(p.date).toUTCString();
  const desc = escapeXml(p.excerpt || (p.content?.[0] ?? "").slice(0, 160));

  return (
`    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${desc}</description>
    </item>`
  );
}

const items = posts
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(itemXml)
  .join("\n");

const rss =
`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Midaway — Blog</title>
    <link>${site}/blog</link>
    <description>Gânduri, povești și fragmente de drum.</description>
    <language>ro-RO</language>
${items}
  </channel>
</rss>
`;

const outDir = path.join(process.cwd(), "public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "feed.xml"), rss, "utf8");

console.log(`[RSS] generat ${posts.length} articole -> public/feed.xml`);
