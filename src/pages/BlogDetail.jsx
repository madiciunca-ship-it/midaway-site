// src/pages/BlogDetail.jsx
import { Link, useParams } from "react-router-dom";
import posts from "../data/posts";
import { useEffect } from "react";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// elimină diacritice (fallback pt. slugs cu ăâîșț)
const stripDiacritics = (s) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  // normalizează orice sursă de imagine (acceptă cover, image, hero etc.)
function resolveSrc(src) {
  if (!src) return ""; 
  const s = String(src).trim();
  // deja absolut sau data-uri
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:") || s.startsWith("/")) {
    return s;
  }
  // transformă "assets/..." sau "./assets/..." în "/assets/..."
  return "/" + s.replace(/^\.?\/*/, "");
}

export default function BlogDetail() {
  const { id: rawId } = useParams();
  const id = decodeURIComponent(rawId || "");

  // 1) potrivire directă
  let post = posts.find((p) => p.slug === id);
  // 2) fallback fără diacritice
  if (!post) {
    const idStripped = stripDiacritics(id);
    post = posts.find((p) => stripDiacritics(p.slug) === idStripped);
  }

  // SEO minim: titlu + meta description
  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Midaway`;
    const desc = post.excerpt || (post.content?.[0] ?? "").slice(0, 150);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, [post]);
  const ui =
  String(post?.lang || "ro").toLowerCase() === "en"
    ? {
        notFound: "Article not found",
        backBlog: "← Back to blog",
        backTop: "↑ Back to top",
        related: "Related articles",
      }
    : {
        notFound: "Articolul nu există",
        backBlog: "← Înapoi la blog",
        backTop: "↑ Înapoi sus",
        related: "Articole înrudite",
      };
  
      const backPillStyle = {
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid var(--accent)",
        color: "var(--secondary)",
        textDecoration: "none",
        fontWeight: 500,
        background: "transparent",
      };

  if (!post) {
    return (
      <div className="container" style={{ padding: "32px 0 48px" }}>
        <h1 className="font-cormorant">{ui.notFound}</h1>
        <p>
        <Link to="/blog" style={backPillStyle}>
  {ui.backBlog}
</Link>
        </p>
      </div>
    );
  }

  // Articole înrudite (max 3) – au cel puțin un tag comun, diferite de articolul curent
  const related = posts
    .filter(x => x.slug !== post.slug && x.tags.some(t => post.tags.includes(t)))
    .slice(0, 3);
    

  return (
    <div className="container" style={{ padding: "24px 0 48px", maxWidth: 900 }}>
      <div style={{ marginTop: 0, marginBottom: 16 }}>
  <Link to="/blog" style={backPillStyle}>
    {ui.backBlog}
  </Link>
</div>
      {/* cover (robust: cover | image | hero + normalizare cale) */}
{(() => {
  const cover = resolveSrc(post.cover || post.image || post.hero);
  return cover ? (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 10px 24px rgba(0,0,0,.08)",
        marginBottom: 16,
      }}
    >
      <img
        src={cover}
        alt={post.title}
        style={{ width: "100%", display: "block", height: "auto" }}
        loading="lazy"
        onError={(e) => {
          // dacă tot nu se încarcă, ascundem figura (evităm iconița ruptă)
          e.currentTarget.parentElement.style.display = "none";
        }}
      />
    </div>
  ) : null;
})()}


      {/* meta + titlu */}
      <div style={{ color: "var(--secondary)", marginBottom: 8 }}>
        {formatDate(post.date)}{post.minutes ? ` · ${post.minutes} min` : ""}
      </div>
      <h1 className="font-cormorant" style={{ marginTop: 0 }}>{post.title}</h1>
      <div style={{ marginBottom: 18 }}>
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      padding: "4px 10px",
      background: "#F4E8E4",
      color: "#7c3740",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: ".05em",
      textTransform: "uppercase",
    }}
  >
    {String(post.lang || "ro").toUpperCase()}
  </span>
</div>

      {/* conținut */}
      <div style={{ lineHeight: 1.85, fontSize: 18 }}>
  {post.content.map((block, i) => {
    // Compatibilitate cu articolele vechi (string simplu)
    if (typeof block === "string") {
      return (
        <p key={i} style={{ margin: "16px 0" }}>
          {block}
        </p>
      );
    }

    // Paragraf nou, cu bucăți de text + linkuri
    if (block?.type === "paragraph" && Array.isArray(block.parts)) {
      return (
        <p key={i} style={{ margin: "16px 0" }}>
          {block.parts.map((part, idx) => {
            if (!part?.href) {
              return <span key={idx}>{part?.text || ""}</span>;
            }

            const isExternal = part.kind === "external";

            if (isExternal) {
              return (
                <a
                  key={idx}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  {part.text}
                </a>
              );
            }

            return (
              <Link
                key={idx}
                to={part.href}
                style={{
                  color: "var(--accent)",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                {part.text}
              </Link>
            );
          })}
        </p>
      );
    }

    return null;
  })}
</div>

      {/* tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        {post.tags.map((t) => (
          <span
            key={t}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 999,
              padding: "6px 10px",
              fontSize: 12,
              color: "var(--secondary)",
              background: "#fff",
            }}
          >
            #{t}
          </span>
        ))}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h3 className="font-cormorant" style={{ marginBottom: 12 }}>{ui.related}</h3>
          <div className="blog-grid">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${encodeURIComponent(r.slug)}`}
                className="blog-card"
              >
                <div
                  className="blog-card-cover"
                  style={{ backgroundImage: `url(${resolveSrc(r.cover || r.image || r.hero)})` }}
                />
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>{formatDate(r.date)}</span>
                  </div>
                  <h4 className="font-cormorant" style={{ margin: 0 }}>{r.title}</h4>
                  <p className="excerpt">{r.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* back */}
      <div
  style={{
    marginTop: 24,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  }}
>
  <Link to="/blog" style={backPillStyle}>
    {ui.backBlog}
  </Link>

  <a
    href="#top"
    onClick={(e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }}
    style={backPillStyle}
  >
    {ui.backTop}
  </a>
</div>
    </div>
  );
}
