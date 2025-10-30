import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function estimateMinutes(p) {
  const words = [p.title, p.excerpt, ...(p.content || [])]
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("toate");

  const tags = useMemo(() => {
    const t = new Set();
    posts.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return ["toate", ...Array.from(t)];
  }, []);

  const filtered = useMemo(() => {
    // 1) ascundem draft-urile
    let list = posts.filter((p) => !p.draft);

    // 2) sortare descrescătoare după dată (ultimul = primul)
    list = list.sort((a, b) => b.date.localeCompare(a.date));

    // 3) filtrare pe tag
    if (activeTag !== "toate") {
      list = list.filter((p) => p.tags.includes(activeTag));
    }

    // 4) căutare text
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTag, query]);

  return (
    <div className="container" style={{ padding: "32px 0 48px" }}>
      <header className="font-cormorant" style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>Blog Midaway</h1>
        <p style={{ color: "var(--secondary)", marginTop: 8 }}>
          Texte literare & reflecții personale.
        </p>
      </header>

      <div className="blog-toolbar">
        <input
          className="input"
          placeholder="Caută după titlu sau descriere…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          {tags.map((t) => (
            <button
              key={t}
              className={`chip ${activeTag === t ? "active" : ""}`}
              onClick={() => setActiveTag(t)}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ marginTop: 16, color: "var(--secondary)" }}>
          N-am găsit articole pentru filtrul/căutarea ta.
          <button
            className="chip"
            style={{ marginLeft: 8 }}
            onClick={() => {
              setQuery("");
              setActiveTag("toate");
            }}
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${encodeURIComponent(p.slug)}`}
              className="blog-card"
            >
              <div
                className="blog-card-cover"
                style={{ backgroundImage: `url(${p.cover})` }}
              />
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span>{formatDate(p.date)}</span>
                  <span>•</span>
                  <span>{p.minutes || estimateMinutes(p)} min</span>
                </div>
                <h3 className="font-cormorant">{p.title}</h3>
                <p className="excerpt">{p.excerpt}</p>
                <div className="blog-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="mini-chip">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="read-more">Citește articolul →</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter mini-CTA */}
      <section className="newsletter-cta" style={{ marginTop: 24 }}>
        <h4 className="font-cormorant" style={{ margin: 0 }}>Abonează-te la noutăți</h4>
        <p style={{ marginTop: 6, color: "var(--secondary)" }}>
          Primești un email scurt când apare un articol nou.
        </p>
        <form
          action="https://formspree.io/f/mrbaajzn"
          method="POST"
          className="newsletter-form"
        >
          <input name="email" type="email" placeholder="Emailul tău" required />
          <input type="hidden" name="_subject" value="Abonare newsletter Midaway" />
          <input type="hidden" name="_next" value="/multumesc-newsletter" />
          <button type="submit" className="btn">Mă abonez</button>
        </form>
      </section>
    </div>
  );
}
