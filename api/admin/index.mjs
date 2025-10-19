// /api/admin/index.mjs
export default async function handler(req, res) {
  const BASE =
    (process.env.SITE_URL || "https://midaway.vercel.app").replace(/\/$/, "");
  const token = req.query?.token || "";

  const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Comenzi – Admin</title>
<style>
  body { font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; padding:20px; background:#fafafa; color:#222; }
  h1 { margin:0 0 12px; }
  .bar { display:flex; gap:8px; align-items:center; margin-bottom:12px; }
  input { flex:1; padding:8px 10px; border:1px solid #ddd; border-radius:8px; }
  button { padding:8px 12px; border-radius:8px; border:1px solid #ccc; background:#fff; cursor:pointer; }
  table { width:100%; border-collapse:collapse; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 4px 14px rgba(0,0,0,.05); }
  th, td { padding:10px 12px; border-bottom:1px solid #eee; font-size:14px; vertical-align:top; }
  th { background:#f3f6f7; position:sticky; top:0; }
  code { background:#f3f6f7; padding:2px 6px; border-radius:6px; }
  .chip { display:inline-block; padding:2px 6px; border-radius:999px; background:#e7f4ee; color:#2a7c4a; font-size:12px; }
  .no-orders { color:#777; text-align:center; padding:20px; }
</style>
</head>
<body>
  <h1>📦 Comenzi Midaway</h1>
  <div class="bar">
    <input id="token" value="${token}" placeholder="token admin" />
    <button onclick="reload()">Reîncarcă</button>
  </div>
  <div id="root">Încărcare…</div>

<script>
async function load() {
  const t = document.getElementById('token').value.trim();
  if (!t) { document.getElementById('root').innerHTML = '<p style="color:#b42318">Introdu tokenul admin.</p>'; return; }
  const res = await fetch('${BASE}/api/admin/orders?token=' + encodeURIComponent(t));
  if (!res.ok) { document.getElementById('root').innerHTML = '<p style="color:#b42318">Eroare: ' + res.status + '</p>'; return; }
  const orders = await res.json();
  if (!orders.length) { document.getElementById('root').innerHTML = '<div class="no-orders">Fără comenzi.</div>'; return; }

  const rows = orders.map(o => {
    const when = new Date(o.createdAt || 0).toLocaleString('ro-RO');
    const items = (o.items||[]).map(it => \`\${it.description || ''} × \${it.quantity} — \${(it.amount_total||0)} \${(it.currency||'').toUpperCase()}\`).join('<br/>');
    return \`
      <tr>
        <td><code>\${o.id}</code><br/><span class="chip">\${o.status || 'paid'}</span></td>
        <td>\${when}</td>
        <td>\${o.name || ''}<br/><a href="mailto:\${o.email}">\${o.email}</a></td>
        <td>\${items || '-'}</td>
        <td><strong>\${o.amount} \${(o.currency||'').toUpperCase()}</strong></td>
        <td>\${o.hasDownloads ? 'eBooks' : 'Fizic'}</td>
      </tr>\`;
  }).join('');

  document.getElementById('root').innerHTML = \`
    <table>
      <thead>
        <tr><th>ID</th><th>Data</th><th>Client</th><th>Produse</th><th>Total</th><th>Tip</th></tr>
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
  res.status(200).send(html);
}
