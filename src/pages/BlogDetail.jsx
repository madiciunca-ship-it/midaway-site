import React from "react";
import { useParams, Link } from "react-router-dom";
import POSTS from "../data/posts";

export default function BlogDetail() {
  const { id } = useParams();
  const post = POSTS.find((p) => String(p.id) === id);

  if (!post) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Articolul nu există</h2>
        <p>
          <Link to="/blog">← Înapoi la blog</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <p style={{ fontSize: 14, margin: 0 }}>
        <Link to="/blog">← Înapoi la blog</Link>
      </p>
      <h1 style={{ margin: "8px 0 16px 0" }}>{post.title}</h1>
      <div style={{ lineHeight: 1.7, color: "#333", whiteSpace: "pre-line" }}>
        {post.content}
      </div>
    </div>
  );
}
