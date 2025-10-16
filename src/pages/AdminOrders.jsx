// src/pages/AdminOrders.jsx
import React, { useEffect, useMemo, useState } from "react";

export default function AdminOrders() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchOrders = async (tok) => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`/api/orders?token=${encodeURIComponent(tok)}`);
      if (!res.ok) throw new Error("Unauthorized sau eroare server");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      setErr(e.message || "Eroare");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders(token);
  }, [token]);

  const totals = useMemo(() => {
    const m = new Map();
    for (const o of orders) {
      const cur = (o.currency || "RON").toUpperCase();
      m.set(cur, (m.get(cur) || 0) + Number(o.amount || 0));
    }
    return Array.from(m.entries());
  }, [orders]);

  const asCSV = () => {
    const head = ["id", "createdAt", "email", "name", "currency", "amount", "items"];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toISOString(),
      o.email || "",
      o.name || "",
      o.currency || "",
      o.amount || "",
      (o.items || []).map((i) => `${i.description} x${i.quantity} = ${i.amount_total} ${i.currency}`).join(" | "),
    ]);
    const csv = [head.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSaveToken = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const t = (form.get("token") || "").trim();
    if (!t) return;
    sessionStorage.setItem("admin_token", t);
    setToken(t);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h1>🧾 Comenzi</h1>

      {!token && (
        <form onSubmit={onSaveToken} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input name="token" placeholder="Admin token" style={field} />
          <button type="submit" style={btn}>Autentificare</button>
        </form>
      )}

      {token && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => fetchOrders(token)} style={btn}>Reîncarcă</button>
          <button onClick={asCSV} style={btn}>Export CSV</button>
        </div>
      )}

      {loading && <div>Se încarcă…</div>}
      {err && <div style={{ color: "#b42318" }}>{err}</div>}

      {orders.length > 0 && (
        <>
          <div style={{ margin: "10px 0", color: "#666" }}>
            Totaluri:{" "}
            {totals.map(([cur, sum]) => (
              <span key={cur} style={{ marginRight: 12 }}>
                <strong>{sum}</strong> {cur}
              </span>
            ))}
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {orders.map((o) => (
              <div key={o.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                  <strong>{o.name || o.email}</strong>
                  <span style={{ color: "#666" }}>{o.email}</span>
                  <span style={{ marginLeft: "auto" }}>{new Date(o.createdAt).toLocaleString()}</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <strong>{o.amount} {o.currency}</strong> • {o.status}
                </div>
                <ul style={{ marginTop: 6, paddingLeft: 18 }}>
                  {(o.items || []).map((i, idx) => (
                    <li key={idx}>
                      {i.description} — x{i.quantity} — {i.amount_total} {i.currency}
                    </li>
                  ))}
                </ul>
                {o.hasDownloads ? (
                  <div style={{ fontSize: 12, color: "#2a9d8f" }}>are eBook-uri</div>
                ) : (
                  <div style={{ fontSize: 12, color: "#d4a017" }}>probabil conține Paperback</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && token && orders.length === 0 && <div>Nu sunt comenzi încă.</div>}
    </div>
  );
}

const field = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 10,
  flex: 1,
};

const btn = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#2a9d8f",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};
