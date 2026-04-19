import { useEffect, useMemo, useState } from "react";
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
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ro";
    const stored = localStorage.getItem("blog.lang");
    return stored === "en" ? "en" : "ro";
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("blog.lang", lang);
    }
  }, [lang]);
  
  const ui =
    lang === "en"
      ? {
          backHome: "← Back to Home",
          backTop: "↑ Back to top",
          title: "Midaway Blog",
          subtitle: "Literary texts & personal reflections.",
          subtitleRo: "Pentru articolele în limba română, folosește butonul RO / EN din dreptul barei de căutare.",
subtitleEn: "For Romanian-language articles, use the RO / EN switch next to the search bar.",
          search: "Search by title or excerpt…",
          noResults: "No articles found for your filter/search.",
          reset: "Reset",
          readMore: "Read article →",
          all: "all",
        }
      : {
          backHome: "← Înapoi la Acasă",
          backTop: "↑ Înapoi sus",
          title: "Blog Midaway",
          subtitle: "Texte literare & reflecții personale.",
          subtitleRo: "Pentru articolele în limba engleză, folosește butonul RO / EN din dreptul barei de căutare.",
subtitleEn: "For English-language articles, use the RO / EN switch next to the search bar.",
          search: "Caută după titlu sau descriere…",
          noResults: "N-am găsit articole pentru filtrul/căutarea ta.",
          reset: "Reset",
          readMore: "Citește articolul →",
          all: "toate",
        };
  
  const sectionNavStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid var(--accent)",
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: 600,
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,.04)",
  };
  const [activeTag, setActiveTag] = useState("toate");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  

  const tags = useMemo(() => {
    const t = new Set();
    posts
      .filter((p) => !p.draft)
      .filter((p) => String(p.lang || "ro").toLowerCase() === lang)
      .forEach((p) => p.tags.forEach((x) => t.add(x)));
  
    return [ui.all, ...Array.from(t)];
  }, [lang, ui.all]);

  useEffect(() => {
    setActiveTag(ui.all);
  }, [ui.all]);

  const filtered = useMemo(() => {
  let list = posts
    .filter((p) => !p.draft)
    .filter((p) => String(p.lang || "ro").toLowerCase() === lang);

  list = list.sort((a, b) => b.date.localeCompare(a.date));

  if (activeTag !== ui.all) {
    list = list.filter((p) => p.tags.includes(activeTag));
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }

  return list;
}, [activeTag, query, lang, ui.all]);

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
          lang === "en"
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
    <div style={{ marginTop: -8, marginBottom: 18 }}>
      <Link to="/" style={sectionNavStyle}>
        {ui.backHome}
      </Link>
    </div>
  
    <header
      className="font-cormorant"
      style={{ textAlign: "center", marginBottom: 24 }}
    >
      <h1 style={{ margin: 0, fontSize: 40 }}>{ui.title}</h1>
<p style={{ color: "var(--secondary)", marginTop: 8 }}>
  {ui.subtitle}
</p>

<p
  className="font-cormorant"
  style={{
    marginTop: 10,
    marginBottom: 24,
    textAlign: "center",
    color: "#2b2b2b",
    fontSize: 18,
    lineHeight: 1.7,
  }}
>
  {ui.subtitleRo}
  <br />
  {ui.subtitleEn}
</p>
</header>
<div className="blog-toolbar">
  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
    <input
      className="input"
      placeholder={ui.search}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ flex: 1 }}
    />


    <div
      role="group"
      aria-label="Blog language switch"
      style={{
        display: "inline-flex",
        border: "1px solid #ddd",
        borderRadius: 999,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <button
        type="button"
        onClick={() => setLang("ro")}
        style={{
          padding: "8px 14px",
          border: "none",
          background: lang === "ro" ? "var(--accent)" : "transparent",
          color: lang === "ro" ? "#fff" : "#444",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        RO
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        style={{
          padding: "8px 14px",
          border: "none",
          background: lang === "en" ? "var(--accent)" : "transparent",
          color: lang === "en" ? "#fff" : "#444",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        EN
      </button>
    </div>
  </div>

  
  <div className="chips">
    {tags.map((t) => (
      <button
        key={t}
        className={`chip ${activeTag === t ? "active" : ""}`}
        onClick={() => setActiveTag(t)}
      >
        {t === ui.all ? (lang === "en" ? "All" : "Toate") : t}
      </button>
    ))}
  </div>
</div>

      {filtered.length === 0 ? (
        <div style={{ marginTop: 16, color: "var(--secondary)" }}>
          {ui.noResults}
          <button
            className="chip"
            style={{ marginLeft: 8 }}
            onClick={() => {
              setQuery("");
              setActiveTag(ui.all);
            }}
          >
          {ui.reset}
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
  style={{
    backgroundImage: `url(${p.cover})`,
    position: "relative",
  }}
>
  <span
    style={{
      position: "absolute",
      top: 10,
      right: 10,
      background: "rgba(139,44,52,.92)",
      color: "#fff",
      fontSize: 11,
      fontWeight: 700,
      padding: "4px 8px",
      borderRadius: 999,
      letterSpacing: ".04em",
    }}
  >
    {String(p.lang || "ro").toUpperCase()}
  </span>
</div>
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
                <span className="read-more">{ui.readMore}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter mini-CTA */}
      <section className="newsletter-cta" style={{ marginTop: 24 }}>
      <h4 className="font-cormorant" style={{ margin: 0 }}>
  {lang === "en" ? "Subscribe to updates" : "Abonează-te la noutăți"}
</h4>
        <p style={{ marginTop: 6, color: "var(--secondary)" }}>
  {lang === "en"
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

  <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
  <input
  name="email"
  type="email"
  placeholder={lang === "en" ? "Your email" : "Emailul tău"}
  required
/>
    <input
  type="hidden"
  name="_subject"
  value={
    lang === "en"
      ? "English newsletter subscription Midaway"
      : "Abonare newsletter Midaway"
  }
/>
    <input type="hidden" name="language" value={lang} />
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
  ? (lang === "en" ? "Sending..." : "Se trimite...")
  : (lang === "en" ? "Subscribe" : "Mă abonez")}
    </button>
  </form>
</>
      </section>
      <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
  <a
    href="#top"
    onClick={(e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }}
    style={sectionNavStyle}
  >
    {ui.backTop}
  </a>
</div>
    </div>
  );
}
