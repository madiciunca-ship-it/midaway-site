// /api/admin/index.mjs
export default async function handler(req, res) {
  const BASE =
    (process.env.SITE_URL || "https://midaway.vercel.app").replace(/\/$/, "");
  const token = (req.query?.token || "").trim();
  const dataUrl = `${BASE}/api/admin/orders?token=${encodeURIComponent(token)}`;

  const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="Cache-Control" content="no-store" />
<title>Comenzi – Admin</title>
<style>
  :root{
    --bg:#fafafa;
    --card:#fff;
    --muted:#6b7280;
    --line:#ececec;
    --chip:#eef2ff;
    --chip-txt:#4338ca;
    --ok:#e7f4ee;
    --ok-t:#2a7c4a;
    --warn:#fff4e5;
    --warn-t:#9a5b13;
    --err:#fee2e2;
    --err-t:#b42318;
  }
  *{box-sizing:border-box}
  body{
    font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    margin:0; padding:20px; background:var(--bg); color:#222;
  }
  h1{ margin:0 0 14px 0; font-weight:800; letter-spacing:.3px; }
  .bar{ display:grid; grid-template-columns: 1fr 180px 180px 180px 220px auto; gap:8px; align-items:center; margin-bottom:12px; }
  @media (max-width:960px){ .bar{ grid-template-columns: 1fr 1fr; } }
  input,select,button{
    padding:10px 12px; border:1px solid var(--line); border-radius:10px; background:#fff; font:inherit;
  }
  input{ min-width:160px; }
  button{ cursor:pointer; background:#fff; }
  .hint{ color:var(--muted); font-size:12px; margin: 4px 0 12px; display:block; }
  table{
    width:100%; border-collapse:separate; border-spacing:0; background:var(--card);
    border:1px solid var(--line); border-radius:12px; overflow:hidden;
  }
  th, td{ padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top; font-size:14px; }
  th{ text-align:left; background:#f8fafc; position:sticky; top:0; z-index:2; font-weight:700; }
  tr:last-child td{ border-bottom:0; }
  .row{ background:#fff; }
  .id{
    max-width: 420px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
    display:inline-block; vertical-align:bottom;
  }
  .chip{
    display:inline-block; padding:2px 8px; border-radius:999px; background:var(--chip); color:var(--chip-txt);
    font-size:12px; font-weight:700; margin-right:6px; vertical-align:middle;
  }
  .status{ margin-right:8px; }
  .status.paid{ background:var(--ok); color:var(--ok-t); }
  .status.failed{ background:var(--err); color:var(--err-t); }
  .status.expired{ background:#eef0f2; color:#444; }
  .muted{ color:var(--muted); }
  .right{ text-align:right; white-space:nowrap; }
  .nowrap{ white-space:nowrap; }
  .products{ color:#111; }
  .products small{ color:var(--muted); }
  .t{ font-feature-settings:"tnum" 1,"lnum" 1; letter-spacing:.3px; }
  .tiny{ font-size:12px; color:var(--muted); }
  .formats{ color:#111; }
  .typeChip{
    display:inline-block; padding:2px 6px; border-radius:999px; background:#eefaf8; color:#11725f; font-size:12px; font-weight:700;
  }
  .typeChip.mix{ background:#fff7e6; color:#9a5b13; }
  .country{ font-weight:600; }
  .controls{ display:flex; gap:8px; align-items:center; }
</style>
</head>
<body>
  <h1>📦 Comenzi Midaway</h1>

  <div class="bar">
    <input id="token" value="${token}" placeholder="token admin" />
    <select id="status">
      <option value="">Status (toate)</option>
      <option value="paid">paid</option>
      <option value="failed">failed</option>
      <option value="expired">expired</option>
    </select>
    <select id="currency">
      <option value="">Monedă (toate)</option>
      <option value="RON">RON</option>
      <option value="EUR">EUR</option>
    </select>
    <select id="country">
      <option value="">Țară (toate)</option>
    </select>
    <select id="format">
      <option value="">Format (toate)</option>
      <option value="PDF">PDF</option>
      <option value="EPUB">EPUB</option>
      <option value="PAPERBACK">Paperback</option>
      <option value="AUDIOBOOK">Audiobook</option>
    </select>
    <button onclick="reload()">Reîncarcă</button>
  </div>

  <div class="hint">Citesc din: <code id="src" class="muted tiny">${dataUrl}</code></div>

  <div id="root">Încărcare…</div>

<script>
function fmtDate(ts){
  if(!ts) return "-";
  try{
    const d = new Date(ts);
    return d.toLocaleDateString('ro-RO', { day:'2-digit', month:'2-digit', year:'numeric'}) + ", " + d.toLocaleTimeString('ro-RO', { hour:'2-digit', minute:'2-digit' });
  }catch{ return "-"; }
}
function sumFormats(items){
  const f = Array.from(new Set((items||[]).map(i => (i.format||'').toUpperCase()).filter(Boolean)));
  return f.join(", ") || "-";
}
function typeFromItems(items){
  const hasE = (items||[]).some(i => (i.format||"").toUpperCase()!=="PAPERBACK");
  const hasP = (items||[]).some(i => (i.format||"").toUpperCase()==="PAPERBACK");
  if (hasE && hasP) return {label:"mix", cls:"mix"};
  if (hasP) return {label:"fizic", cls:""};
  return {label:"eBooks", cls:""};
}
function countryName(code){
  if(!code) return "-";
  try{
    return new Intl.DisplayNames(['ro'], { type: 'region' }).of(code) || code;
  }catch{ return code; }
}
function money(n, cur){ return \`\${n} \${(cur||'').toUpperCase()}\`; }

async function load(){
  const t = document.getElementById('token').value.trim();
  const s = document.getElementById('status').value.trim();
  const c = document.getElementById('currency').value.trim();
  const k = document.getElementById('country').value.trim();
  const f = document.getElementById('format').value.trim();

  if(!t){
    document.getElementById('root').innerHTML = '<p style="color:#b42318">Introdu tokenul admin mai sus.</p>';
    return;
  }

  const url = new URL('${BASE}/api/admin/orders');
  url.searchParams.set('token', t);

  document.getElementById('src').textContent = url.toString();

  const res = await fetch(url, { cache:'no-store' });

  // ▶ mesaj clar pentru 401/403
  if (res.status === 401 || res.status === 403) {
    document.getElementById('root').innerHTML =
      '<p style="color:#b42318">Neautorizat (token invalid sau lipsă).</p>';
    return;
  }
  if(!res.ok){
    document.getElementById('root').innerHTML = '<p style="color:#b42318">Eroare: ' + res.status + '</p>';
    return;
  }

  let data = await res.json();
  // ▶ compat: acceptă fie array brut, fie {orders:[...]}
  let orders = Array.isArray(data) ? data : (Array.isArray(data?.orders) ? data.orders : []);

  // populate country select (distinct din date)
  const allCountries = Array.from(new Set((orders||[]).map(o => (o.country||"").toUpperCase()).filter(Boolean))).sort();
  const cSel = document.getElementById('country');
  if (cSel.getAttribute('data-init')!=='1'){
    allCountries.forEach(cc => {
      const opt = document.createElement('option');
      opt.value = cc; opt.textContent = cc + " — " + countryName(cc);
      cSel.appendChild(opt);
    });
    cSel.setAttribute('data-init','1');
  }

  // FILTRE
  orders = (orders||[]).filter(o => {
    if (s && (o.status||'') !== s) return false;
    if (c && (o.currency||'').toUpperCase() !== c) return false;
    if (k && (o.country||'').toUpperCase() !== k) return false;
    if (f){
      const hasFmt = (o.items||[]).some(it => (it.format||'').toUpperCase() === f);
      if (!hasFmt) return false;
    }
    return true;
  });

  if(!orders.length){
    document.getElementById('root').innerHTML = '<div class="muted" style="padding:16px;background:#fff;border:1px solid var(--line);border-radius:12px;">Fără comenzi pentru filtrele curente.</div>';
    return;
  }

  const rows = orders.map(o => {
    const when = fmtDate(o.createdAt);
    const email = o.email || '';
    const name = o.name || '';
    const id = o.id || '';
    const total = money(o.amount || 0, o.currency || '');
    const status = (o.status || 'paid').toLowerCase();

    const prods = (o.items||[]).map(it => {
      const d = it.description || (it.title || '') || '-';
      const q = it.quantity || 1;
      const amt = it.amount_total || 0;
      const cur = (it.currency||'').toUpperCase();
      return \`\${d}<br/><small class="muted">— \${q} × \${amt} \${cur}</small>\`;
    }).join('<br/>');

    const fmts = sumFormats(o.items);
    const type = typeFromItems(o.items);
    const country = (o.country||"").toUpperCase();

    return \`
      <tr class="row">
        <td>
          <span class="chip status \${status}">\${status}</span>
          <span class="id"><code>\${id}</code></span>
        </td>
        <td class="nowrap t">\${when}</td>
        <td>
          \${name ? name : '<span class="muted">-</span>'}
          <br/><a href="mailto:\${email}">\${email}</a>
        </td>
        <td class="country">\${country ? country : '-' }<br/><span class="tiny">\${country ? countryName(country) : ''}</span></td>
        <td class="products">\${prods || '-'}</td>
        <td class="formats">\${fmts}</td>
        <td class="right t"><strong>\${total}</strong></td>
        <td><span class="typeChip \${type.cls}">\${type.label}</span></td>
      </tr>\`;
  }).join('');

  document.getElementById('root').innerHTML = \`
    <table>
      <thead>
        <tr>
          <th>ID / Status</th>
          <th>Data</th>
          <th>Client</th>
          <th>Țară</th>
          <th style="min-width:320px">Produse</th>
          <th>Format(e)</th>
          <th class="right">Total</th>
          <th>Tip</th>
        </tr>
      </thead>
      <tbody>\${rows}</tbody>
    </table>\`;
}
function reload(){ load(); }
load();
</script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store"); // anti-cache la răspuns
  res.status(200).send(html);
}
