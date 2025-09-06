// scripts/generate-rss.js
// Script minimal care generază public/rss.xml din src/data/posts.js
const fs = require("fs");
const path = require("path");

// importă posts.js (commonjs friendly)
const posts = require(path.join(process.cwd(), "src", "data", "posts.js")).default;

// DETALII – schimbă cu domeniul final când îl legi:
const site = "https://midaway.vercel.app";
const title = "Midaway – Blog";
const description = "Povești de la capătul lumii";

function rssItem(p) {
  const url = `${site}/blog/${p.slug}`;
  return `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title><![CDATA[${title}]]></title>
  <link>${site}</link>
  <description><![CDATA[${description}]]></description>
  ${posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(rssItem)
    .join("\n")}
</channel>
</rss>`;

const out = path.join(process.cwd(), "public", "rss.xml");
fs.writeFileSync(out, xml, "utf8");
console.log("✓ RSS generat la", out);
