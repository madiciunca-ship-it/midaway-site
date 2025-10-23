// src/pages/AdminOrders.jsx
import React, { useEffect, useMemo, useState } from "react";

function ymKey(ts) {
  const d = new Date(ts || Date.now());
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function getYear(ts) {
  return new Date(ts || Date.now()).getFullYear();
}
function getMonth(ts) {
  return new Date(ts || Date.now()).getMonth() + 1; // 1..12
}

export default function AdminOrders() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // filtre UI
  const [statusF, setStatusF] = useState("all");
  const [currencyF, setCurrencyF] = useState("all");
  const [countryF, setCountryF] = useState("all");
  const [formatF, setFormatF] = useState("all");
  const [yearF, setYearF] = useState("all");
  const [monthF, setMonthF] = useState("all");

  const fetchOrders = async (tok) => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`/api/admin/orders?token=${encodeURIComponent(tok)}`, {
        headers: { "cache-control": "no-store" },
      });
      if (!res.ok) throw new Error("Unauthorized sau eroare server");
      const data = await res.json();
      // API /api/admin/orders returnează direct lista (sortată desc)
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (e) {
      setErr(e.message || "Eroare");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders(token);
  }, [token]);

  // Derivăm valori pentru filtre
  const { years, months, currencies, countries, formats } = useMemo(() => {
    const yearSet = new Set();
    const monthSet = new Set();
    const curSet = new Set();
    const ctrySet = new Set();
    const fmtSet = new Set();

    for (const o of orders) {
      if (o?.createdAt) {
        yearSet.add(getYear(o.createdAt));
        monthSet.add(getMonth(o.createdAt));
      }
      if (o?.currency) curSet.add(String(o.currency).toUpperCase());
      if (o?.country) ctrySet.add(String(o.country).toUpperCase());
      for (const it of o?.items || []) {
        if (it?.format) fmtSet.add(String(it.format).toUpperCase());
      }
    }

    return {
      years: Array.from(yearSet).sort((a, b) => b - a),
      months: Array.from(monthSet).sort((a, b) => a - b),
      currencies: Array.from(curSet).sort(),
      countries: Array.from(ctrySet).sort(),
      formats: Array.from(fmtSet).sort(),
    };
  }, [orders]);

  // Aplicăm filtre
  const filtered = useMemo(() => {
    return (orders || []).filter((o) => {
      if (statusF !== "all" && String(o.status || "").toLowerCase() !== statusF) return false;
      if (currencyF !== "all" && String(o.currency || "").toUpperCase() !== currencyF) return false;
      if (countryF !== "all" && String(o.country || "").toUpperCase() !== countryF) return false;
      if (yearF !== "all" && getYear(o.createdAt) !== Number(yearF)) return false;
      if (monthF !== "all" && getMonth(o.createdAt) !== Number(monthF)) return false;

      if (formatF !== "all") {
        const hasFmt = (o.items || []).some(
          (it) => String(it.format || "").toUpperCase() === formatF
        );
        if (!hasFmt) return false;
      }
      return true;
    });
  }, [orders, statusF, currencyF, countryF, formatF, yearF, monthF]);

  // totaluri per monedă
  const totals = useMemo(() => {
    const m = new Map();
    for (const o of filtered) {
      const cur = (o.currency || "RON").toUpperCase();
      m.set(cur, (m.get(cur) || 0) + Number(o.amount || 0));
    }
    return Array.from(m.entries());
  }, [filtered]);

  // export CSV
  const asCSV = () => {
    const head = [
      "nr",
      "orderNo",
      "id",
      "createdAt",
      "email",
      "name",
      "country",
      "currency",
      "amount",
      "courierFee",
      "status",
      "formats",
      "items",
    ];
    const rows = filtered.map((o, idx) => [
      filtered.length - idx, // nr desc
      o.orderNo || "",
      o.id,
      new Date(o.createdAt).toISOString(),
      o.email || "",
      o.name || "",
      (o.country || "").toUpperCase(),
      (o.currency || "").toUpperCase(),
      o.amount || 0,
      typeof o.courierFee === "number" ? o.courierFee : "",
      o.status || "",
      Array.from(new Set((o.items || []).map((i) => (i.format || "").toUpperCase()))).join("|"),
      (o.items || [])
        .map((i) => `${i.description} x${i.quantity} = ${i.amount_total} ${i.currency}`)
        .join(" || "),
    ]);
    const csv =
      [head.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );

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
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <h1>📦 Comenzi Midaway</h1>

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
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <button onClick={() => fetchOrders(token)} style={btn}>
              Reîncarcă
            </button>
            <button onClick={asCSV} style={btn}>
              Export CSV
            </button>

            <select value={statusF} onChange={(e) => setStatusF(e.target.value)} style={sel}>
              <option value="all">Status (toate)</option>
              <option value="paid">paid</option>
              <option value="failed">failed</option>
              <option value="expired">expired</option>
            </select>

            <select value={currencyF} onChange={(e) => setCurrencyF(e.target.value)} style={sel}>
              <option value="all">Monedă (toate)</option>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select value={countryF} onChange={(e) => setCountryF(e.target.value)} style={sel}>
              <option value="all">Țară (toate)</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select value={formatF} onChange={(e) => setFormatF(e.target.value)} style={sel}>
              <option value="all">Format (toate)</option>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select value={yearF} onChange={(e) => setYearF(e.target.value)} style={sel}>
              <option value="all">An (toți)</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select value={monthF} onChange={(e) => setMonthF(e.target.value)} style={sel}>
              <option value="all">Lună (toate)</option>
              {[...Array(12)].map((_, i) => {
                const m = i + 1;
                return (
                  <option key={m} value={m}>
                    {String(m).padStart(2, "0")}
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ margin: "10px 0", color: "#666" }}>
            <strong>{filtered.length}</strong> rezultate • Totaluri:{" "}
            {totals.map(([cur, sum]) => (
              <span key={cur} style={{ marginRight: 12 }}>
                <strong>{sum}</strong> {cur}
              </span>
            ))}
          </div>
        </>
      )}

      {loading && <div>Se încarcă…</div>}
      {err && <div style={{ color: "#b42318" }}>{err}</div>}

      {token && filtered.length > 0 && (
        <div style={{ display: "grid", gap: 12 }}>
          {filtered.map((o, idx) => {
            const rowNr = filtered.length - idx; // nr desc
            const d = new Date(o.createdAt);
            const fmtList = Array.from(
              new Set((o.items || []).map((i) => (i.format || "").toUpperCase()))
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 170px 110px 1fr 150px",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "#777" }}>
                    <div style={{ fontWeight: 700 }}>#{rowNr}</div>
                    {o.orderNo && (
                      <div style={{ fontSize: 12, color: "#2a9d8f" }}>{o.orderNo}</div>
                    )}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {o.name || o.email}
                    </div>
                    <div style={{ fontSize: 13, color: "#666", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {o.email}
                    </div>
                  </div>

                  <div style={{ color: "#444" }}>
                    <div>{d.toLocaleDateString()} {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{getYear(o.createdAt)} / {String(getMonth(o.createdAt)).padStart(2, "0")}</div>
                  </div>

                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: o.status === "paid" ? "#e6f4ea" : o.status === "failed" ? "#fee4e2" : "#fff4e5",
                        color: o.status === "paid" ? "#1e7f4c" : o.status === "failed" ? "#b42318" : "#b46b00",
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {o.status || "—"}
                    </span>
                  </div>

                  <div style={{ lineHeight: 1.4 }}>
                    {(o.items || []).map((i, k) => (
                      <div key={k} style={{ color: "#333" }}>
                        {i.description} — <span style={{ color: "#888" }}>x{i.quantity}</span>{" "}
                        — {i.amount_total} {(i.currency || "").toUpperCase()}
                      </div>
                    ))}
                    {typeof o.courierFee === "number" && (
                      <div style={{ color: "#333" }}>
                        Taxă curier — {o.courierFee} {(o.currency || "").toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800 }}>
                      {o.amount} {(o.currency || "").toUpperCase()}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>{fmtList.join(", ") || "—"}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && token && filtered.length === 0 && <div>Nu sunt comenzi pe filtrele curente.</div>}
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

const sel = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
};
