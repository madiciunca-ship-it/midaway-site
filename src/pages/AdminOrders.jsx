// src/pages/AdminOrders.jsx
import React, { useEffect, useMemo, useState } from "react";

const MONTHS = [
  { v: 0, label: "Ianuarie" },
  { v: 1, label: "Februarie" },
  { v: 2, label: "Martie" },
  { v: 3, label: "Aprilie" },
  { v: 4, label: "Mai" },
  { v: 5, label: "Iunie" },
  { v: 6, label: "Iulie" },
  { v: 7, label: "August" },
  { v: 8, label: "Septembrie" },
  { v: 9, label: "Octombrie" },
  { v: 10, label: "Noiembrie" },
  { v: 11, label: "Decembrie" },
];

function ymKey(ts) {
  const d = new Date(Number(ts || 0));
  if (isNaN(d)) return "—";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

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
  const [format, setFormat] = useState("all");

  async function fetchOrders(tok) {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`/api/admin/orders?token=${encodeURIComponent(tok)}`, {
        headers: { "cache-control": "no-store" },
      });
      if (!res.ok) throw new Error("Unauthorized sau eroare server");
      const data = await res.json();
      // API poate întoarce [] sau {orders: []}; suportăm ambele.
      const list = Array.isArray(data) ? data : Array.isArray(data?.orders) ? data.orders : [];
      setOrders(list);
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
    for (const o of orders) if (o.status) s.add(String(o.status).toLowerCase());
    return Array.from(s).sort();
  }, [orders]);

  const currencies = useMemo(() => {
    const s = new Set();
    for (const o of orders) if (o.currency) s.add(o.currency.toUpperCase());
    return Array.from(s).sort();
  }, [orders]);

  const formats = useMemo(() => {
    const s = new Set();
    for (const o of orders) {
      for (const it of o.items || []) {
        if (it?.format) s.add(String(it.format).toUpperCase());
      }
    }
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
      if (status !== "all" && String(o.status || "").toLowerCase() !== String(status).toLowerCase()) return false;
      if (currency !== "all" && (o.currency || "").toUpperCase() !== String(currency).toUpperCase()) return false;

      if (format !== "all") {
        const hasFmt = (o.items || []).some(
          (it) => String(it.format || "").toUpperCase() === String(format).toUpperCase()
        );
        if (!hasFmt) return false;
      }

      if (query) {
        const hay = [
          o.orderNo,
          o.merchantOrderId,
          o.id,
          o.email,
          o.name,
          o.phone,
          o.address?.line1,
          o.address?.city,
          o.address?.state,
          o.address?.postal_code,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
      
        if (!hay.includes(query)) return false;
      }
      
      return true;
    });
  }, [orders, q, year, month, status, currency, format]);

  // totaluri pe monedă (după filtre)
  const totals = useMemo(() => {
    const m = new Map();
    for (const o of filtered) {
      const cur = (o.currency || "RON").toUpperCase();
      m.set(cur, (m.get(cur) || 0) + Number(o.amount || 0));
    }
    return Array.from(m.entries());
  }, [filtered]);

  // sumar lunar (după filtre): { ym -> { cur -> {sum, count} } }
  const monthlySummary = useMemo(() => {
    const map = new Map();
    for (const o of filtered) {
      const ym = ymKey(o.createdAt);
      if (!map.has(ym)) map.set(ym, new Map());
      const cur = (o.currency || "RON").toUpperCase();
      const entry = map.get(ym);
      const prev = entry.get(cur) || { sum: 0, count: 0 };
      entry.set(cur, { sum: prev.sum + Number(o.amount || 0), count: prev.count + 1 });
    }
    // convert în listă ordonată desc după YM
    return Array.from(map.entries()).sort(([a], [b]) => (a < b ? 1 : -1));
  }, [filtered]);

  // export CSV (include orderNo, courierFee, formats)
  const asCSV = () => {
    const head = [
      "nr",
      "orderNo",
      "id",
      "createdAtIso",
      "email",
      "name",
      "phone",
      "country",
      "addressLine1",
      "city",
      "state",
      "postal_code",
      "currency",
      "amount",
      "courierFee",
      "status",
      "formats",
      "items",
    ];
    
    const rows = filtered.map((o, idx) => [
      filtered.length - idx,
      o.orderNo || "",
      o.id || "",
      new Date(Number(o.createdAt || 0)).toISOString(),
      o.email || "",
      o.name || "",
      o.phone || "",
      (o.country || "").toUpperCase(),
      o.address?.line1 || "",
      o.address?.city || "",
      o.address?.state || "",
      o.address?.postal_code || "",
      (o.currency || "").toUpperCase(),
      o.amount ?? "",
      typeof o.courierFee === "number" ? o.courierFee : "",
      o.status || "",
      Array.from(new Set((o.items || []).map((i) => String(i.format || "").toUpperCase()))).join("|"),
      (o.items || [])
        .map(
          (i) =>
            `${i.description} x${i.quantity} = ${i.amount_total} ${(i.currency || "").toUpperCase()}`
        )
        .join(" | "),
    ]);
    
    const csv = [
      head.join(","),
      ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
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

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email || "");
    } catch {}
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        📦 Comenzi Midaway
        <span style={{ fontSize: 14, color: "#666" }}>
          • Total: <strong>{filtered.length}</strong>
        </span>
      </h1>

      {!token && (
        <form onSubmit={onSaveToken} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input name="token" placeholder="Admin token" style={field} />
          <button type="submit" style={btn}>
            Autentificare
          </button>
        </form>
      )}

      {token && (
        <>
          {/* acțiuni / filtre */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <button onClick={() => fetchOrders(token)} style={btn}>
              Reîncarcă
            </button>
            <button onClick={asCSV} style={btn}>
              Export CSV
            </button>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Caută #comandă / email / nume"
              style={{ ...field, minWidth: 220 }}
            />

            <select value={year} onChange={(e) => setYear(e.target.value)} style={fieldSel}>
              <option value="all">An (toate)</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)} style={fieldSel}>
              <option value="all">Lună (toate)</option>
              {MONTHS.map((m) => (
                <option key={m.v} value={m.v}>
                  {m.label}
                </option>
              ))}
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)} style={fieldSel}>
              <option value="all">Status (toate)</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={fieldSel}>
              <option value="all">Monedă (toate)</option>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select value={format} onChange={(e) => setFormat(e.target.value)} style={fieldSel}>
              <option value="all">Format (toate)</option>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
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

          {/* sumar lunar */}
          {filtered.length > 0 && (
            <div
              style={{
                margin: "12px 0 16px",
                padding: 12,
                border: "1px solid #eee",
                borderRadius: 12,
                background: "#fafafa",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Sumar lunar (după filtre)</div>
              <div style={{ display: "grid", gap: 6 }}>
                {monthlySummary.map(([ym, curMap]) => {
                  const cells = Array.from(curMap.entries()).map(([cur, v]) => (
                    <span key={cur} style={{ marginRight: 12 }}>
                      <strong>{v.sum}</strong> {cur} <span style={{ color: "#888" }}>({v.count} com.)</span>
                    </span>
                  ));
                  return (
                    <div key={ym} style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ color: "#555" }}>{ym}</div>
                      <div>{cells}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* lista comenzi */}
          <div style={{ display: "grid", gap: 12 }}>
            {filtered.map((o, index) => {
              const d = new Date(Number(o.createdAt || 0));
              const nr = filtered.length - index;
              const fmtList = Array.from(
                new Set((o.items || []).map((i) => String(i.format || "").toUpperCase()))
              );
              const hasCourierFee =
                typeof o.courierFee === "number" ||
                (o.items || []).some((i) =>
                  String(i.description || "").toLowerCase().includes("taxă curier")
                );

              return (
                <div
                  key={o.id}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 12,
                    padding: 12,
                    background: "#fff",
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "68px 1fr 160px 120px 1fr 150px",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    {/* Nr + OrderNo */}
                    <div style={{ color: "#777" }}>
                      <div style={{ fontWeight: 800 }}>#{nr}</div>
                      <div style={{ fontSize: 12, color: "#2a9d8f" }}>{o.orderNo || "—"}</div>
                    </div>

                    {/* Client + email + copy */}
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {o.name || o.email}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                          color: "#666",
                          fontSize: 13,
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={o.email}
                        >
                          {o.email}
                        </span>
                        <button
                          onClick={() => copyEmail(o.email)}
                          title="Copiază email"
                          style={btnMini}
                          type="button"
                        >
                          Copiază
                        </button>
                      </div>
                  

{/* Telefon + adresă */}
{(o.phone || (o.address && (o.address.line1 || o.address.city || o.address.state))) && (
    <div
      style={{
        marginTop: 2,
        fontSize: 12,
        color: "#777",
        lineHeight: 1.4,
      }}
    >
      {o.phone && <div>📞 {o.phone}</div>}
      {o.address && (o.address.line1 || o.address.city || o.address.state) && (
        <div>
          {o.address.line1 || ""}
          {o.address.city ? `, ${o.address.city}` : ""}
          {o.address.state ? `, ${o.address.state}` : ""}
          {o.address.postal_code ? ` (${o.address.postal_code})` : ""}
        </div>
      )}
    </div>
  )}
</div>
                    {/* Data */}
                    <div style={{ color: "#444" }}>
                      <div>{!isNaN(d) ? d.toLocaleDateString() : "-"}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>
                        {!isNaN(d)
                          ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                          : "-"}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: 999,
                          background:
                            o.status === "paid"
                              ? "#e6f4ea"
                              : o.status === "failed"
                              ? "#fee4e2"
                              : "#fff4e5",
                          color:
                            o.status === "paid"
                              ? "#1e7f4c"
                              : o.status === "failed"
                              ? "#b42318"
                              : "#b46b00",
                          fontSize: 12,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {o.status || "—"}
                      </span>
                    </div>

                    {/* Items */}
                    <div style={{ lineHeight: 1.4 }}>
                      {(o.items || []).map((i, k) => (
                        <div key={k} style={{ color: "#333" }}>
                          {i.description} — <span style={{ color: "#888" }}>x{i.quantity}</span> —{" "}
                          {i.amount_total} {(i.currency || "").toUpperCase()}
                        </div>
                      ))}
                      {typeof o.courierFee === "number" && (
                        <div style={{ color: "#333" }}>
                          Taxă curier — {o.courierFee} {(o.currency || "").toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Total + formate */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 800 }}>
                        {o.amount} {(o.currency || "").toUpperCase()}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {fmtList.length ? fmtList.join(", ") : "—"}
                      </div>
                    </div>
                  </div>

                  {/* extra info: Autor / Canal / Tag-uri dacă există */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                    <span style={pillGrey}>Țară: {(o.country || "—").toUpperCase()}</span>
                    {o.hasDownloads ? (
                      <span style={pillGreen}>are eBook-uri</span>
                    ) : (
                      <span style={pillYellow}>probabil conține Paperback</span>
                    )}
                    {hasCourierFee && <span style={pillBlue}>Taxă curier</span>}
                    <span style={pillGrey}>Autor(i): {o.authors?.join(", ") || "—"}</span>
                    <span style={pillGrey}>Canal: {o.channel || "Stripe"}</span>
                    <span style={pillGrey}>Tag-uri: {o.tags?.join(", ") || "—"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && filtered.length === 0 && (
            <div>Nu sunt comenzi pe criteriile selectate.</div>
          )}
        </>
      )}

      {!loading && !token && (
        <div style={{ marginTop: 10, color: "#666" }}>
          Introdu token-ul de admin pentru a încărca comenzile.
        </div>
      )}
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

const btnMini = {
  padding: "4px 8px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#f7f7f7",
  color: "#333",
  cursor: "pointer",
  fontSize: 12,
};

const pillBase = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  border: "1px solid transparent",
};

const pillGreen = {
  ...pillBase,
  background: "#e9f7f1",
  color: "#1b7f5a",
  borderColor: "#cdeee2",
};
const pillYellow = {
  ...pillBase,
  background: "#fff7e6",
  color: "#b36b00",
  borderColor: "#ffe2b3",
};
const pillBlue = {
  ...pillBase,
  background: "#e8f1ff",
  color: "#1a5fb4",
  borderColor: "#cbdfff",
};
const pillGrey = {
  ...pillBase,
  background: "#f3f4f6",
  color: "#555",
  borderColor: "#e5e7eb",
};
