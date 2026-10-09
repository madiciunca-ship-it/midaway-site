
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { BOOKS } from "../src/data/books.js";

const DOMAIN = "https://midaway.ro";
const DIST = "dist";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function replaceHeadTag(html, pattern, replacement) {
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace("</head>", `  ${replacement}\n</head>`);
}

function setMeta(html, key, value, attribute = "name") {
  const pattern = new RegExp(
    `<meta\\b(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`,
    "i"
  );

  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return replaceHeadTag(html, pattern, tag);
}

const template = await readFile(join(DIST, "index.html"), "utf8");
const generatedUrls = [];

for (const book of BOOKS) {
  if (!book?.id || book.hidden === true) continue;

  const url = `${DOMAIN}/carti/${encodeURIComponent(book.id)}`;
  const title = book.seoTitle || `${book.title} | Mida Malena`;
  const description =
    book.seoDescription || book.subtitle || book.title;

  const cover = book.coverUrl
    ? new URL(book.coverUrl, DOMAIN).href
    : null;

  let html = template;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`
  );

  html = setMeta(html, "description", description);
  html = setMeta(html, "author", book.author || "Mida Malena");
  html = setMeta(html, "robots", "index, follow");

  html = replaceHeadTag(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(url)}" />`
  );

  html = setMeta(html, "og:type", "book", "property");
  html = setMeta(html, "og:url", url, "property");
  html = setMeta(html, "og:title", title, "property");
  html = setMeta(html, "og:description", description, "property");

  html = setMeta(html, "twitter:card", "summary_large_image");
  html = setMeta(html, "twitter:title", title);
  html = setMeta(html, "twitter:description", description);

  if (cover) {
    html = setMeta(html, "og:image", cover, "property");
    html = setMeta(html, "twitter:image", cover);
  }

  const isbn =
    book.formatDetails?.paperback?.isbn ||
    book.formatDetails?.epub?.isbn ||
    book.formatDetails?.eBook?.isbn;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    url,
    inLanguage: book.lang === "RO" ? "ro" : book.lang,
    author: {
      "@type": "Person",
      name: book.author || "Mida Malena",
    },
    description,
    ...(cover ? { image: cover } : {}),
    ...(isbn ? { isbn } : {}),
    ...(book.year ? { datePublished: String(book.year) } : {}),
    ...(book.publisher
      ? {
          publisher: {
            "@type": "Organization",
            name: book.publisher,
          },
        }
      : {}),
  };

  const jsonLd = JSON.stringify(structuredData).replace(
    /</g,
    "\\u003c"
  );

  html = html.replace(
    "</head>",
    `<script type="application/ld+json">${jsonLd}</script>\n</head>`
  );

  const paragraphs = Array.isArray(book.description)
    ? book.description
        .filter((item) => typeof item === "string" && item.trim())
        .map((item) => `<p>${escapeHtml(item)}</p>`)
        .join("\n")
    : "";

  const fallbackContent = `
    <article>
      <h1>${escapeHtml(book.title)}</h1>
      <p>${escapeHtml(book.subtitle || "")}</p>
      ${cover ? `<img src="${escapeHtml(cover)}" alt="Coperta cărții ${escapeHtml(book.title)}" width="240" />` : ""}
      ${paragraphs}
      <p>Autor: ${escapeHtml(book.author || "Mida Malena")}</p>
      <p><a href="/carti">Vezi toate cărțile</a></p>
    </article>
  `;

  const rootPattern = /<div\s+id=["']root["']\s*>\s*<\/div>/i;

  if (!rootPattern.test(html)) {
    throw new Error("Nu am găsit <div id=\"root\"></div> în HTML.");
  }

  // Conținut HTML accesibil și înainte de executarea JavaScript.
  // React îl înlocuiește apoi cu pagina interactivă normală.
  html = html.replace(
    rootPattern,
    `<div id="root">${fallbackContent}</div>`
  );

  const outputDir = join(DIST, "carti");
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, `${book.id}.html`), html, "utf8");

  generatedUrls.push(url);
  console.log(`SEO generated: ${url}`);
}

// Completează sitemap-ul existent fără să elimine celelalte pagini.
const sitemapPath = join(DIST, "sitemap.xml");
let sitemap;

try {
  sitemap = await readFile(sitemapPath, "utf8");
} catch {
  sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    "</urlset>";
}

if (!sitemap.includes("</urlset>")) {
  throw new Error("Sitemap-ul existent nu are structura XML așteptată.");
}

const existingUrls = new Set(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    match[1].replace(/&amp;/g, "&")
  )
);

const additions = generatedUrls
  .filter((url) => !existingUrls.has(url))
  .map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`)
  .join("\n");

sitemap = sitemap.replace(
  "</urlset>",
  `${additions}\n</urlset>`
);

await writeFile(sitemapPath, sitemap, "utf8");

console.log(`Gata: ${generatedUrls.length} pagini de carte generate.`);
