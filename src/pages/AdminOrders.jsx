// src/pages/AdminOrders.jsx
import React, { useEffect, useMemo, useState } from "react";

const MONTHS = [
  { v: 0,  label: "Ianuarie" },
  { v: 1,  label: "Februarie" },
  { v: 2,  label: "Martie" },
  { v: 3,  label: "Aprilie" },
  { v: 4,  label: "Mai" },
  { v: 5,  label: "Iunie" },
  { v: 6,  label: "Iulie" },
  { v: 7,  label: "August" },
  { v: 8,  label: "Septembrie" },
  { v: 9,  label: "Octombrie" },
  { v: 10, label: "Noiembrie" },
  { v: 11, label: "Decembrie" },
];

export default function AdminOrders() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // filtre UI
  const [q, setQ] = useState("");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [status, setStatus] = useState("all");
  const [currency, setCurrency] = useState("all");

  async function fetchOrders(tok) {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`/api/admin/orders?token=${encodeURIComponent(tok)}`);
      if (!res.ok) throw new Error("Unauthorized sau eroare server");
      const data = await res.json();
      // endpoint-ul /api/admin/orders trimite acum {orders: []}
      setOrders(Array.isArray(data?.orders) ? data.orders : []);
    } catch (e) {
      setErr(e.message || "Eroare");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchOrders(token);
  }, [token]);

  // seturi pentru dropdown-uri (din date)
  const years = useMemo(() => {
    const s = new Set();
    for (const o of orders) {
      const d = new Date(Number(o.createdAt || 0));
      if (!isNaN(d)) s.add(d.getFullYear());
    }
    return Array.from(s).sort((a, b) => b - a);
  }, [orders]);

  const statuses = useMemo(() => {
    const s = new Set();
    for (const o of orders) if (o.status) s.add(o.status);
    return Array.from(s).sort();
  }, [orders]);

  const currencies = useMemo(() => {
    const s = new Set();
    for (const o of orders) if (o.currency) s.add(o.currency.toUpperCase());
    return Array.from(s).sort();
  }, [orders]);

  // filtrare
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return orders.filter((o) => {
      const d = new Date(Number(o.createdAt || 0));
      const y = d.getFullYear();
      const m = d.getMonth();

      if (year !== "all" && y !== Number(year)) return false;
      if (month !== "all" && m !== Number(month)) return false;
      if (status !== "all" && (o.status || "").toLowerCase() !== String(status).toLowerCase()) return false;
      if (currency !== "all" && (o.currency || "").toUpperCase() !== String(currency).toUpperCase()) return false;

      if (query) {
        const hay =
          `${o.orderNo || ""} ${o.merchantOrderId || ""} ${o.id || ""} ${o.email || ""} ${o.name || ""}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [orders, q, year, month, status, currency]);

  // totaluri pe monedă (după filtre)
  const totals = useMemo(() => {
    const m = new Map();
    for (const o of filtered) {
      const cur = (o.currency || "RON").toUpperCase();
      m.set(cur, (m.get(cur) || 0) + Number(o.amount || 0));
    }
    return Array.from(m.entries());
  }, [filtered]);

  // export CSV (include orderNo)
  const asCSV = () => {
    const head = [
      "orderNo",
      "id",
      "createdAtIso",
      "email",
      "name",
      "currency",
      "amount",
      "status",
      "country",
      "items",
    ];
    const rows = filtered.map((o) => [
      o.orderNo || "",
      o.id || "",
      new Date(Number(o.createdAt || 0)).toISOString(),
      o.email || "",
      o.name || "",
      (o.currency || "").toUpperCase(),
      o.amount ?? "",
      o.status || "",
      o.country || "",
      (o.items || [])
        .map((i) => `${i.description} x${i.quantity} = ${i.amount_total} ${(i.currency || "").toUpperCase()}`)
        .join(" | "),
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
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        🧾 Comenzi Midaway
        <span style={{ fontSize: 14, color: "#666" }}>• Total: <strong>{filtered.length}</strong></span>
      </h1>

      {!token && (
        <form onSubmit={onSaveToken} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input name="token" placeholder="Admin token" style={field} />
          <button type="submit" style={btn}>Autentificare</button>
        </form>
      )}

      {token && (
        <>
          {/* acțiuni */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <button onClick={() => fetchOrders(token)} style={btn}>Reîncarcă</button>
            <button onClick={asCSV} style={btn}>Export CSV</button>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Caută #comandă / email / nume"
              style={{ ...field, minWidth: 220 }}
            />

            <select value={year} onChange={(e) => setYear(e.target.value)} style={fieldSel}>
              <option value="all">An (toate)</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)} style={fieldSel}>
              <option value="all">Lună (toate)</option>
              {MONTHS.map((m) => (
                <option key={m.v} value={m.v}>{m.label}</option>
              ))}
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)} style={fieldSel}>
              <option value="all">Status (toate)</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={fieldSel}>
              <option value="all">Monedă (toate)</option>
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {loading && <div>Se încarcă…</div>}
          {err && <div style={{ color: "#b42318" }}>{err}</div>}

          {/* totaluri după filtre */}
          {filtered.length > 0 && (
            <div style={{ margin: "10px 0", color: "#666" }}>
              Totaluri:{" "}
              {totals.map(([cur, sum]) => (
                <span key={cur} style={{ marginRight: 12 }}>
                  <strong>{sum}</strong> {cur}
                </span>
              ))}
            </div>
          )}

          {/* lista comenzi */}
          <div style={{ display: "grid", gap: 12 }}>
            {filtered.map((o) => {
              const d = new Date(Number(o.createdAt || 0));
              const hasCourierFee = (o.items || []).some(
                (i) => String(i.description || "").toLowerCase().includes("taxă curier")
              );
              return (
                <div key={o.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12, background: "#fff" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                    <strong>#{o.orderNo || "—"}</strong>
                    <span style={{ color: "#666" }}>{o.id}</span>
                    <span style={{ marginLeft: "auto" }}>{!isNaN(d) ? d.toLocaleString() : "-"}</span>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6, flexWrap: "wrap" }}>
                    <div><strong>{o.name || o.email}</strong></div>
                    <div style={{ color: "#666" }}>{o.email}</div>
                    <div style={{ marginLeft: "auto" }}>
                      <strong>{o.amount} {(o.currency || "").toUpperCase()}</strong> • {o.status}
                    </div>
                  </div>

                  <ul style={{ marginTop: 6, paddingLeft: 18 }}>
                    {(o.items || []).map((i, idx) => (
                      <li key={idx}>
                        {i.description} — x{i.quantity} — {i.amount_total} {(i.currency || "").toUpperCase()}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                    {o.hasDownloads ? (
                      <span style={pillGreen}>are eBook-uri</span>
                    ) : (
                      <span style={pillYellow}>probabil conține Paperback</span>
                    )}
                    {hasCourierFee && <span style={pillBlue}>Taxă curier</span>}
                    {o.country && <span style={pillGrey}>Țară: {o.country}</span>}
                    {o.formats && o.formats.length > 0 && (
                      <span style={pillGrey}>Format(e): {o.formats.join(", ")}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && filtered.length === 0 && <div>Nu sunt comenzi pe criteriile selectate.</div>}
        </>
      )}

      {!loading && !token && <div style={{ marginTop: 10, color: "#666" }}>Introdu token-ul de admin pentru a încărca comenzile.</div>}
    </div>
  );
}

const field = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 10,
  flex: 1,
  background: "#fff",
};

const fieldSel = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 10,
  background: "#fff",
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

const pillBase = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  border: "1px solid transparent",
};

const pillGreen  = { ...pillBase, background: "#e9f7f1", color: "#1b7f5a", borderColor: "#cdeee2" };
const pillYellow = { ...pillBase, background: "#fff7e6", color: "#b36b00", borderColor: "#ffe2b3" };
const pillBlue   = { ...pillBase, background: "#e8f1ff", color: "#1a5fb4", borderColor: "#cbdfff" };
const pillGrey   = { ...pillBase, background: "#f3f4f6", color: "#555",   borderColor: "#e5e7eb" };
