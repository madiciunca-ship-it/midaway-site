// /api/admin/index.mjs
export default async function handler(req, res) {
  const BASE = (process.env.SITE_URL || "https://midaway.vercel.app").replace(/\/$/, "");
  const token = (req.query?.token || "").trim();
  const dataUrl = `${BASE}/api/admin/orders?token=${encodeURIComponent(token)}`;

  const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Comenzi – Admin</title>
<style>
  :root{
    --bg:#fafafa; --card:#fff; --muted:#6b7280; --line:#e5e7eb;
    --accent:#2a9d8f; --gold:#d4a017; --danger:#b42318;
  }
  * { box-sizing:border-box }
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; background: var(--bg); color:#222; }
  h1 { margin: 0 0 16px 0; display:flex; align-items:center; gap:10px; }
  h1::before{content:"📦"; font-size:28px}

  .bar { display:grid; grid-template-columns: 1fr repeat(4, minmax(140px, 220px)) auto; gap:8px; align-items:center; margin-bottom:12px; }
  .bar input, .bar select { padding:8px 10px; border:1px solid var(--line); border-radius:8px; background: #fff; }
  .bar .url { grid-column: 1 / -2; display:inline-block; font-size:12px; color:var(--muted); border:1px dashed var(--line); border-radius:8px; padding:8px 10px; background:#fff; overflow:auto; white-space:nowrap}
  .bar button { padding:8px 12px; border-radius:8px; border:1px solid #ccc; background:#fff; cursor:pointer; }

  .table-wrap { background:var(--card); border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,.06); }
  table { width:100%; border-collapse:collapse; }
  th, td { padding:12px 14px; border-bottom:1px solid var(--line); vertical-align:top; font-size:14px; }
  th { text-align:left; background:#f3f6f7; position:sticky; top:0; z-index:2; }
  code { background:#f3f6f7; padding:2px 6px; border-radius:6px; }
  .chip { display:inline-block; padding:2px 8px; border-radius:999px; font-size:12px; font-weight:600 }
  .chip.paid { background:#e7f4ee; color:#2a7c4a; }
  .chip.refunded { background:#ffecec; color:#b42318; }
  .muted { color:var(--muted) }
  .no-orders { color:#777; text-align:center; padding:20px; }

  .nowrap{ white-space:nowrap }
  .right{ text-align:right }
</style>
</head>
<body>
  <h1>Comenzi Midaway</h1>

  <div class="bar">
    <input id="token" value="${token}" placeholder="token admin" />
    <select id="statusFilter">
      <option value="">Status (toate)</option>
      <option value="paid">paid</option>
      <option value="refunded">refunded</option>
    </select>
    <select id="currencyFilter">
      <option value="">Monedă (toate)</option>
      <option value="RON">RON</option>
      <option value="EUR">EUR</option>
    </select>
    <select id="countryFilter">
      <option value="">Țară (toate)</option>
    </select>
    <select id="formatFilter">
      <option value="">Format (toate)</option>
      <option value="PDF">PDF</option>
      <option value="EPUB">EPUB</option>
      <option value="PAPERBACK">PAPERBACK</option>
    </select>
    <button onclick="reload()">Reîncarcă</button>

    <div class="url" id="urlView">Citesc din: ${dataUrl}</div>
  </div>

  <div id="root" class="table-wrap">Încărcare…</div>

<script>
const BASE = ${JSON.stringify(BASE)};

function fmtDate(ts){
  try{ return new Date(ts||0).toLocaleString('ro-RO') }catch{ return '-' }
}
function orderType(o){
  if (o.hasDownloads && o.hasPaperback) return 'Mix';
  if (o.hasDownloads) return 'eBooks';
  return 'Fizic';
}
function unique(arr){ return Array.from(new Set(arr)); }

let RAW = [];

async function load(){
  const t = document.getElementById('token').value.trim();
  const statusFilter = document.getElementById('statusFilter').value;
  const currencyFilter = document.getElementById('currencyFilter').value;
  const countrySel = document.getElementById('countryFilter');
  const formatFilter = document.getElementById('formatFilter').value;

  const url = BASE + '/api/admin/orders?token=' + encodeURIComponent(t);
  document.getElementById('urlView').textContent = 'Citesc din: ' + url;

  const res = await fetch(url, { cache: 'no-store' });
  const root = document.getElementById('root');
  if (!res.ok){
    root.innerHTML = '<div class="no-orders">Eroare: ' + res.status + '</div>';
    return;
  }
  const orders = await res.json();
  RAW = Array.isArray(orders) ? orders : [];

  // populăm dinamic dropdown Țară
  const countries = unique(RAW.map(o => o.country || '').filter(Boolean)).sort();
  const countrySelHtml = ['<option value="">Țară (toate)</option>']
    .concat(countries.map(c => '<option value="'+c+'">'+c+'</option>')).join('');
  countrySel.innerHTML = countrySelHtml;

  render();
}

function render(){
  const t = document.getElementById('token').value.trim();
  const statusFilter = document.getElementById('statusFilter').value;
  const currencyFilter = document.getElementById('currencyFilter').value;
  const countryFilter = document.getElementById('countryFilter').value;
  const formatFilter = document.getElementById('formatFilter').value;

  const filtered = RAW.filter(o => {
    if (statusFilter && (o.status||'') !== statusFilter) return false;
    if (currencyFilter && (o.currency||'').toUpperCase() !== currencyFilter) return false;
    if (countryFilter && (o.country||'') !== countryFilter) return false;
    if (formatFilter){
      const fmts = Array.isArray(o.formats) ? o.formats : [];
      if (!fmts.includes(formatFilter)) return false;
    }
    return true;
  });

  if (!filtered.length){
    document.getElementById('root').innerHTML = '<div class="no-orders">Fără comenzi pentru filtrele selectate.</div>';
    return;
  }

  const rows = filtered.map(o => {
    const when = fmtDate(o.createdAt);
    const items = (o.items||[]).map(it =>
      \`\${it.description || (it.title || '')} — \${it.quantity} × \${it.amount_total} \${(it.currency||'').toUpperCase()}\`
    ).join('<br/>');

    const total = \`\${o.amount} \${(o.currency||'').toUpperCase()}\`;
    const chipClass = (o.status === 'paid') ? 'chip paid' : 'chip refunded';
    const fmts = (Array.isArray(o.formats) && o.formats.length) ? o.formats.join(', ') : '-';
    const country = o.country || '-';
    const type = orderType(o);

    return \`
      <tr>
        <td><code>\${o.id}</code><br/><span class="\${chipClass}">\${o.status || 'paid'}</span></td>
        <td class="nowrap">\${when}</td>
        <td>\${o.name || ''}<br/>\${o.email ? '<a href="mailto:'+o.email+'">'+o.email+'</a>' : ''}</td>
        <td class="nowrap">\${country}</td>
        <td>\${items || '-'}</td>
        <td class="nowrap">\${fmts}</td>
        <td class="right"><strong>\${total}</strong></td>
        <td class="nowrap">\${type}</td>
      </tr>\`;
  }).join('');

  document.getElementById('root').innerHTML = \`
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Client</th>
          <th>Țară</th>
          <th>Produse</th>
          <th>Format(e)</th>
          <th>Total</th>
          <th>Tip</th>
        </tr>
      </thead>
      <tbody>\${rows}</tbody>
    </table>\`;
}

function reload(){ load(); }

// re-render la schimbarea filtrelor fără a re-cere rețeaua
['statusFilter','currencyFilter','countryFilter','formatFilter'].forEach(id => {
  document.getElementById(id).addEventListener('change', render);
});

load();
</script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
