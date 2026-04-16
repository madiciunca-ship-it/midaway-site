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
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterLang, setNewsletterLang] = useState("ro");

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

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    setNewsletterStatus("submitting");
    setNewsletterMessage("");
  
    try {
      const res = await fetch("https://formspree.io/f/mrbaajzn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        form.reset();
        setNewsletterStatus("success");
        setNewsletterMessage(
          newsletterLang === "en"
            ? "Thank you! You have subscribed to the English newsletter. 🥰"
            : "Mulțumesc! Te-ai abonat la newsletter-ul în limba română. 🥰"
        );
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data?.errors?.[0]?.message || "A apărut o problemă. Te rog încearcă din nou.");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Nu am reușit să trimit formularul. Verifică internetul și încearcă din nou.");
    }
  }

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
      <h4 className="font-cormorant" style={{ margin: 0 }}>
  {newsletterLang === "en" ? "Subscribe to updates" : "Abonează-te la noutăți"}
</h4>
        <p style={{ marginTop: 6, color: "var(--secondary)" }}>
  {newsletterLang === "en"
    ? "You will receive a short email when a new article is published."
    : "Primești un email scurt când apare un articol nou."}
</p>
        <>
  {newsletterMessage && (
    <div
      style={{
        marginBottom: 12,
        padding: "12px 14px",
        borderRadius: 12,
        border: newsletterStatus === "success" ? "1px solid #7dc9bf" : "1px solid #e3b0b0",
        background: newsletterStatus === "success" ? "#e8f8f5" : "#fff3f3",
        color: newsletterStatus === "success" ? "#1f6f67" : "#9f2f2f",
        fontWeight: 600,
      }}
    >
      {newsletterMessage}
    </div>
  )}
<div
  role="group"
  aria-label="Newsletter language"
  style={{
    marginBottom: 12,
    display: "inline-flex",
    border: "1px solid #ddd",
    borderRadius: 999,
    overflow: "hidden",
    background: "#fff",
  }}
>
  <button
    type="button"
    onClick={() => setNewsletterLang("ro")}
    style={{
      padding: "8px 14px",
      border: "none",
      background: newsletterLang === "ro" ? "var(--accent)" : "transparent",
      color: newsletterLang === "ro" ? "#fff" : "#444",
      cursor: "pointer",
      fontWeight: 700,
    }}
  >
    RO
  </button>
  <button
    type="button"
    onClick={() => setNewsletterLang("en")}
    style={{
      padding: "8px 14px",
      border: "none",
      background: newsletterLang === "en" ? "var(--accent)" : "transparent",
      color: newsletterLang === "en" ? "#fff" : "#444",
      cursor: "pointer",
      fontWeight: 700,
    }}
  >
    EN
  </button>
</div>
  <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
    <input name="email" type="email" placeholder={newsletterLang === "en" ? "Your email" : "Emailul tău"} required />
    <input
  type="hidden"
  name="_subject"
  value={
    newsletterLang === "en"
      ? "English newsletter subscription Midaway"
      : "Abonare newsletter Midaway"
  }
/>
    <input type="hidden" name="language" value={newsletterLang} />
    <button
      type="submit"
      className="btn"
      disabled={newsletterStatus === "submitting"}
      style={{
        opacity: newsletterStatus === "submitting" ? 0.8 : 1,
        cursor: newsletterStatus === "submitting" ? "wait" : "pointer",
      }}
    >
     {newsletterStatus === "submitting"
  ? (newsletterLang === "en" ? "Sending..." : "Se trimite...")
  : (newsletterLang === "en" ? "Subscribe" : "Mă abonez")}
    </button>
  </form>
</>
      </section>
    </div>
  );
}
