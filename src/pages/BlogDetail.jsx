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

  if (!post) {
    return (
      <div className="container" style={{ padding: "32px 0 48px" }}>
        <h1 className="font-cormorant">Articolul nu există</h1>
        <p>
          Înapoi la{" "}
          <Link to="/blog" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Blog
          </Link>
          .
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

      {/* conținut */}
      <div style={{ lineHeight: 1.85, fontSize: 18 }}>
        {post.content.map((para, i) => (
          <p key={i} style={{ margin: "16px 0" }}>
            {para}
          </p>
        ))}
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
          <h3 className="font-cormorant" style={{ marginBottom: 12 }}>Articole înrudite</h3>
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
      <div style={{ marginTop: 24 }}>
        <Link to="/blog" className="btn" style={{ textDecoration: "none" }}>
          ← Înapoi la blog
        </Link>
      </div>
    </div>
  );
}
