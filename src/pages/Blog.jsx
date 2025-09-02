import { Link } from "react-router-dom";

const POSTS = [
  {
    id: 1,
    title: "Cum a început călătoria mea…",
    excerpt:
      "Povestea startului: primele zile, primele decizii, primul pas în necunoscut.",
  },
  {
    id: 2,
    title: "Yda – între ficțiune și realitate?",
    excerpt:
      "Despre felul în care un personaj poate deveni oglindă pentru cine ești tu.",
  },
  {
    id: 3,
    title: "De ce alegem drumuri neștiute?",
    excerpt:
      "Nu alegem drumuri neștiute pentru că sunt comode. Le alegem tocmai pentru că nu știm…",
  },
];

export default function Blog() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>✍️ Blog</h1>
      <p style={{ color: "#555", marginTop: 6 }}>
        Texte literare & reflecții. Click pe titlu pentru a citi articolul.
      </p>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {POSTS.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>
              <Link
                to={`/blog/${p.id}`}
                style={{ textDecoration: "none", color: "#111" }}
              >
                {p.title}
              </Link>
            </h3>
            <p style={{ margin: 0, color: "#666" }}>{p.excerpt}</p>

            <div style={{ marginTop: 12 }}>
              <Link
                to={`/blog/${p.id}`}
                style={{
                  display: "inline-block",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  textDecoration: "none",
                  color: "#111",
                  background: "#fff",
                }}
              >
                Citește articolul →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

