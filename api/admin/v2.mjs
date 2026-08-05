// /api/admin/v2.mjs


export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const token = String(req.query?.token || "").trim();
    const ADMIN = String(process.env.ADMIN_DASH_TOKEN || "").trim();

    if (!token || !ADMIN || token !== ADMIN) {
      return res.status(401).send("Unauthorized");
    }

    const requestedSource = String(
      req.query?.source || "online"
    ).toLowerCase();
    
    const source = [
      "online",
      "event",
      "inventory",
    ].includes(requestedSource)
      ? requestedSource
      : "online";
    
    const eventId = String(
      req.query?.eventId ||
        "gaudeamus-sibiu-2026"
    ).trim();

    

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const BASE =
      (process.env.SITE_URL || "https://midaway.ro").replace(/\/$/, "");
      const dataUrl =
  `${BASE}/api/admin/orders` +
  `?token=${encodeURIComponent(token)}` +
  `&source=${encodeURIComponent(source)}` +
  (
    source === "inventory"
      ? `&eventId=${encodeURIComponent(eventId)}`
      : ""
  );

    const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Comenzi – Admin v2</title>
<style>
  :root{
    --bg:#fafafa;
    --card:#fff;
    --muted:#6b7280;
    --line:#ececec;
    --chip:#eef2ff;
    --chip-txt:#4338ca;
    --ok:#e7f4ee; --ok-t:#2a7c4a;
    --warn:#fff4e5; --warn-t:#9a5b13;
    --err:#fee2e2; --err-t:#b42318;
  }
  *{box-sizing:border-box}
  body{font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0; padding:20px; background:var(--bg); color:#222;}
  h1{ margin:0 0 14px 0; font-weight:800; letter-spacing:.3px; display:flex; gap:12px; align-items:baseline;}
  .muted{ color:var(--muted) }
  .bar{ display:grid; grid-template-columns: 1fr 160px 160px 160px 160px 160px 160px auto; gap:8px; align-items:center; margin: 12px 0; }
  @media (max-width:1200px){ .bar{ grid-template-columns: 1fr 1fr; } }
  input,select,button{ padding:10px 12px; border:1px solid var(--line); border-radius:10px; background:#fff; font:inherit;}
  input{ min-width:160px; }
  button{ cursor:pointer; background:#2a9d8f; color:#fff; border:1px solid #228474; font-weight:700;}
  .ghost{ background:#fff; color:#333; border-color: var(--line); }
  .hint{ color:var(--muted); font-size:12px; margin: 6px 0 14px; display:block; }

  .pill{ display:inline-block; padding:2px 8px; border-radius:999px; font-size:12px; font-weight:700; border:1px solid #e5e7eb; }
  .pill.green{ background:#e9f7f1; color:#1b7f5a; }
  .pill.yellow{ background:#fff7e6; color:#b36b00; }
  .pill.blue{ background:#e8f1ff; color:#1a5fb4; }
  .pill.grey{ background:#f3f4f6; color:#555; }

  table{ width:100%; border-collapse:separate; border-spacing:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden; }
  th, td{ padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top; font-size:14px; }
  th{ text-align:left; background:#f8fafc; position:sticky; top:0; z-index:2; font-weight:700; }
  tr:last-child td{ border-bottom:0; }
  .right{ text-align:right; white-space:nowrap; }
  .chip{ display:inline-block; padding:2px 8px; border-radius:999px; background:var(--chip); color:var(--chip-txt); font-size:12px; font-weight:700; margin-right:6px; vertical-align:middle; }
  .status{ margin-right:8px; }
  .status.paid{ background:var(--ok); color:var(--ok-t); }
  .status.failed{ background:var(--err); color:var(--err-t); }
  .status.expired{ background:#eef0f2; color:#444; }
  .formats{ color:#111; }
  .typeChip{ display:inline-block; padding:2px 6px; border-radius:999px; background:#eefaf8; color:#11725f; font-size:12px; font-weight:700; }
  .typeChip.mix{ background:#fff7e6; color:#9a5b13; }
  .id{ max-width: 420px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; display:inline-block; vertical-align:bottom; }
  .nowrap{ white-space:nowrap; }
  .inventory-card{
    background:#fff;
    border:1px solid var(--line);
    border-radius:14px;
    padding:16px;
    margin-bottom:14px;
  }
  
  .inventory-title{
    font-size:18px;
    font-weight:800;
    margin-bottom:12px;
  }
  
  .inventory-grid{
    display:grid;
    grid-template-columns:
      minmax(220px, 2fr)
      repeat(4, minmax(80px, .65fr))
      minmax(260px, 1.7fr);
    gap:10px;
    align-items:center;
  }
  
  .inventory-head{
    font-size:12px;
    font-weight:800;
    color:#555;
    text-transform:uppercase;
  }
  
  .inventory-number{
    font-size:20px;
    font-weight:800;
  }
  
  .inventory-actions{
    display:grid;
    grid-template-columns:100px 1fr auto;
    gap:7px;
    align-items:center;
  }
  
  .inventory-set{
    display:grid;
    grid-template-columns:100px 1fr auto;
    gap:7px;
    align-items:center;
    margin-top:8px;
  }
  
  .inventory-history{
    margin-top:12px;
    padding-top:10px;
    border-top:1px solid var(--line);
    font-size:12px;
    color:#555;
  }
  
  .inventory-history-row{
    display:flex;
    justify-content:space-between;
    gap:12px;
    padding:4px 0;
  }
  
  .btn-burgundy{
    background:#8b2c34;
    border-color:#7a252d;
  }
  
  .btn-dark{
    background:#444;
    border-color:#333;
  }
  
  @media (max-width:1000px){
    .inventory-grid{
      grid-template-columns:1fr 1fr;
    }
  
    .inventory-actions,
    .inventory-set{
      grid-column:1 / -1;
    }
  }
  
  @media (max-width:620px){
    .inventory-grid{
      grid-template-columns:1fr;
    }
  
    .inventory-actions,
    .inventory-set{
      grid-template-columns:1fr;
    }
  }
</style>
</head>
<body>
<h1>
  ${
    source === "inventory"
      ? "📚 Inventar Gaudeamus"
      : source === "event"
        ? "🎪 Comenzi Gaudeamus"
        : "📦 Comenzi Midaway"
  }
  <span class="muted" id="count"></span>
</h1>

  <div class="bar">
    <input id="token" value="${token}" placeholder="token admin" />
    <select id="source" onchange="changeSource()">
  <option value="online" ${source === "online" ? "selected" : ""}>
    Comenzi online
  </option>
  <option value="event" ${source === "event" ? "selected" : ""}>
    Comenzi Gaudeamus
  </option>
  <option
  value="inventory"
  ${source === "inventory" ? "selected" : ""}
>
  Inventar Gaudeamus
</option>
</select>
    
    <input id="q" placeholder="Caută #comandă / email / nume" />
    <select id="status"><option value="">Status (toate)</option></select>
    <select id="currency"><option value="">Monedă (toate)</option></select>
    <select id="country"><option value="">Țară (toate)</option></select>
    <select id="month"><option value="">Lună (toate)</option></select>
    <select id="format">
      <option value="">Format (toate)</option>
      <option value="PDF">PDF</option>
      <option value="EPUB">EPUB</option>
      <option value="PAPERBACK">Paperback</option>
      <option value="AUDIOBOOK">Audiobook</option>
      <option value="CONSULTANTA">Consultanță editorială</option>
      <option value="DESIGN">Design copertă</option>
      <option value="PUBLICARE">Publicare & distribuție KDP</option>
      <option value="EDITARE">Editare completă RO</option>
      <option value="CORECTURA">Corectură RO</option>
      <option value="TRADUCERE">Traducere literară RO-EN</option>
      <option value="LISTARE">Listare & vânzare pe Midaway.ro</option>
      <option value="AMAZON">Pachet: De la manuscris la Amazon</option>
      <option value="MENTORAT">Mentorat autor debutant</option>
    </select>

    <div style="display:flex; gap:8px;">
      <button class="ghost" onclick="reload()">Reîncarcă</button>
      <button class="ghost" onclick="downloadCSV()">Export CSV</button>
    </div>
  </div>

  <div class="hint">Citesc din: <code id="src" class="muted">${dataUrl}</code></div>
  <div class="totals" id="totals"></div>
  <div class="summary" id="monthly"></div>
  <div id="root">Încărcare…</div>

<script>
const SOURCE = '${source}';
const EVENT_ID = '${eventId}';
const fmt = (n, cur)=> \`\${n} \${(cur||'').toUpperCase()}\`;
const dfmt = (ts)=>{ try{const d=new Date(ts); return d.toLocaleDateString('ro-RO')+", "+d.toLocaleTimeString('ro-RO',{hour:'2-digit',minute:'2-digit'})}catch{return '-'} };
const countryName = (code)=>{ if(!code) return "-"; try{ return new Intl.DisplayNames(['ro'],{type:'region'}).of(code)||code }catch{return code} }
const ym = (ts)=>{ const d=new Date(Number(ts||0)); if(isNaN(d)) return '—'; return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); };
const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Formate listate + SERVICE dacă există servicii în items
const sumFormats = (items)=>{
  const base = new Set((items||[])
    .map(i=>(i.format||'').toUpperCase())
    .filter(Boolean));
  if ((items||[]).some(i => i.type === "service")) base.add("SERVICE");
  return Array.from(base).join(", ") || "-";
};

const typeFromItems = (items)=>{
  const hasE = (items||[]).some(i => (i.format||"").toUpperCase()!=="PAPERBACK");
  const hasP = (items||[]).some(i => (i.format||"").toUpperCase()==="PAPERBACK");
  if (hasE && hasP) return {label:"mix", cls:"mix"};
  if (hasP) return {label:"fizic", cls:""};
  return {label:"eBooks", cls:""};
};

// chei pentru filtrarea serviciilor
const SERVICE_KEYS = {
  CONSULTANTA: ["CONSULT", "CONSULTANȚ", "CONSULTANTA"],
  DESIGN: ["DESIGN", "COPERT"],
  PUBLICARE: ["PUBLICARE", "KDP", "DISTRIBU"],
  EDITARE: ["EDITARE"],
  CORECTURA: ["CORECTUR"],
  TRADUCERE: ["TRADUCERE"],
  LISTARE: ["LISTARE", "VÂNZARE", "VANZARE", "MIDAWAY"],
  AMAZON: ["MANUSCRIS", "AMAZON", "PACHET"],
  MENTORAT: ["MENTOR"],
};
const FORMAT_VALUES = ["PDF","EPUB","PAPERBACK","AUDIOBOOK"];

let ORDERS = [];
let INVENTORY = null;

// force = true => cache-buster param
async function load(force=false){
  const t = document.getElementById('token').value.trim();
  if(!t){ document.getElementById('root').innerHTML='<p style="color:#b42318">Introdu token.</p>'; return; }
  const url = new URL('${BASE}/api/admin/orders');
  url.searchParams.set('token', t);
  url.searchParams.set(
    'source',
    document.getElementById('source').value
  );
  if (
    document.getElementById('source').value ===
    "inventory"
  ) {
    url.searchParams.set(
      "eventId",
      EVENT_ID
    );
  }
  if (force) url.searchParams.set('_', Date.now()); // cache buster
  document.getElementById('src').textContent = url.toString();

  const res = await fetch(url, { headers: {'cache-control':'no-store'} });
  if(!res.ok){ document.getElementById('root').innerHTML='<p style="color:#b42318">Eroare: '+res.status+'</p>'; return; }
  let data = await res.json();

if (SOURCE === "inventory") {
  INVENTORY = data;
  renderInventory();
  return;
}

ORDERS = Array.isArray(data)
  ? data
  : Array.isArray(data?.orders)
    ? data.orders
    : [];

populateFilters(ORDERS);
render();
}

function populateFilters(list){
  // status
  const sSel = document.getElementById('status'); sSel.innerHTML = '<option value="">Status (toate)</option>';
  const st = Array.from(new Set(list.map(o=>String(o.status||'').toLowerCase()).filter(Boolean))).sort();
  st.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; sSel.appendChild(o); });

  // currency
  const cSel = document.getElementById('currency'); cSel.innerHTML = '<option value="">Monedă (toate)</option>';
  const cu = Array.from(new Set(list.map(o=>(o.currency||'').toUpperCase()).filter(Boolean))).sort();
  cu.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; cSel.appendChild(o); });

  // country
  const kSel = document.getElementById('country'); kSel.innerHTML = '<option value="">Țară (toate)</option>';
  const co = Array.from(new Set(list.map(o=>(o.country||'').toUpperCase()).filter(Boolean))).sort();
  co.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent = v+' — '+countryName(v); kSel.appendChild(o); });

  // months (YYYY-MM)
  const mSel = document.getElementById('month'); mSel.innerHTML = '<option value="">Lună (toate)</option>';
  const months = Array.from(new Set(list.map(o=>ym(o.createdAt)).filter(v=>v && v!=='—'))).sort().reverse();
  months.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; mSel.appendChild(o); });
}

function applyFilters(){
  const q = document.getElementById('q').value.trim().toLowerCase();
  const s = document.getElementById('status').value.trim().toLowerCase();
  const c = document.getElementById('currency').value.trim().toUpperCase();
  const k = document.getElementById('country').value.trim().toUpperCase();
  const mo = document.getElementById('month').value.trim();
  const f = document.getElementById('format').value.trim().toUpperCase();

  return ORDERS.filter(o=>{
    if(s && String(o.status||'').toLowerCase()!==s) return false;
    if(c && (o.currency||'').toUpperCase()!==c) return false;
    if(k && (o.country||'').toUpperCase()!==k) return false;
    if(mo && ym(o.createdAt)!==mo) return false;

    if (f) {
      if (FORMAT_VALUES.includes(f)) {
        const hasFmt = (o.items||[]).some(it => String(it.format||'').toUpperCase() === f);
        if (!hasFmt) return false;
      } else {
        const keys = SERVICE_KEYS[f] || [f];
        const hasService = (o.items||[]).some(it => {
          if (it.type !== "service") return false;
          const hay = (it.name || it.description || "").toUpperCase();
          return keys.some(k => hay.includes(k));
        });
        if (!hasService) return false;
      }
    }

    if(q){
      const hay = \`\${o.orderNo||''} \${o.merchantOrderId||''} \${o.id||''} \${o.email||''} \${o.name||''}\`.toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderInventory(){
  const books = Array.isArray(INVENTORY?.books)
    ? INVENTORY.books
    : [];

  document.getElementById('count').textContent =
    '• Titluri: ' + books.length;

  document.getElementById('totals').innerHTML = '';
  document.getElementById('monthly').innerHTML = '';

  if (!books.length) {
    document.getElementById('root').innerHTML =
      '<div class="inventory-card">Inventarul nu conține cărți.</div>';
    return;
  }

  const totalStock = books.reduce(
    (sum, book) => sum + Number(book.stock || 0),
    0
  );

  const totalSold = books.reduce(
    (sum, book) => sum + Number(book.sold || 0),
    0
  );

  document.getElementById('totals').innerHTML =
    '<strong>Stoc disponibil:</strong> ' +
    totalStock +
    ' exemplare • <strong>Vândute:</strong> ' +
    totalSold;

  const cards = books.map((book) => {
    const bookId = String(book.bookId || '');
    const safeId = encodeURIComponent(bookId);

    const history = Array.isArray(book.history)
      ? book.history.slice(0, 8)
      : [];

    const historyHtml = history.length
      ? history.map((entry) => {
          const delta = Number(entry.delta || 0);
          const sign = delta > 0 ? '+' : '';

          return \`
            <div class="inventory-history-row">
              <span>
                \${esc(dfmt(entry.createdAt))}
                — \${esc(entry.reason || entry.type || '')}
              </span>

              <strong style="color:\${
                delta < 0 ? '#b42318' : '#1b7f5a'
              }">
                \${sign}\${delta}
                (\${Number(entry.stockBefore || 0)}
                → \${Number(entry.stockAfter || 0)})
              </strong>
            </div>
          \`;
        }).join('')
      : '<span class="muted">Fără modificări înregistrate.</span>';

    return \`
      <div class="inventory-card">
        <div class="inventory-title">
          \${esc(book.title || bookId)}
        </div>

        <div class="inventory-grid">
          <div class="inventory-head">Carte</div>
          <div class="inventory-head">Inițial</div>
          <div class="inventory-head">Disponibil</div>
          <div class="inventory-head">Vândut</div>
          <div class="inventory-head">Ajustări</div>
          <div class="inventory-head">Operațiuni</div>

          <div>
            <strong>\${esc(book.title || bookId)}</strong>
            <div class="muted" style="font-size:11px">
              \${esc(bookId)}
            </div>
          </div>

          <div class="inventory-number">
            \${Number(book.initialStock || 0)}
          </div>

          <div class="inventory-number" style="color:\${
            Number(book.stock || 0) <= 5
              ? '#b42318'
              : '#1b7f5a'
          }">
            \${Number(book.stock || 0)}
          </div>

          <div class="inventory-number">
            \${Number(book.sold || 0)}
          </div>

          <div>
            <div style="color:#1b7f5a;font-weight:700">
              +\${Number(book.manualAdded || 0)}
            </div>

            <div style="color:#b42318;font-weight:700">
              −\${Number(book.manualRemoved || 0)}
            </div>
          </div>

          <div>
            <div class="inventory-actions">
              <input
                id="delta-\${safeId}"
                type="number"
                step="1"
                placeholder="+20 / -10"
              />

              <input
                id="reason-\${safeId}"
                type="text"
                placeholder="Motiv: aprovizionare, donație..."
              />

              <button
                type="button"
                onclick="adjustInventory(
                  decodeURIComponent('\${safeId}'),
                  this
                )"
              >
                Ajustează
              </button>
            </div>

            <div class="inventory-set">
              <input
                id="stock-\${safeId}"
                type="number"
                min="0"
                step="1"
                placeholder="Stoc exact"
              />

              <input
                id="set-reason-\${safeId}"
                type="text"
                placeholder="Motiv: inventar fizic..."
              />

              <button
                type="button"
                class="btn-dark"
                onclick="setInventoryExact(
                  decodeURIComponent('\${safeId}'),
                  this
                )"
              >
                Setează exact
              </button>
            </div>
          </div>
        </div>

        <details class="inventory-history">
          <summary style="cursor:pointer;font-weight:700">
            Istoric recent
          </summary>

          <div style="margin-top:8px">
            \${historyHtml}
          </div>
        </details>
      </div>
    \`;
  }).join('');

  document.getElementById('root').innerHTML = cards;
}

function render(){
  const flt = applyFilters();
  document.getElementById('count').textContent = '• Total: '+flt.length;

  // Totaluri per monedă
  const m = new Map(); for(const o of flt){ const cur=(o.currency||'RON').toUpperCase(); m.set(cur,(m.get(cur)||0)+Number(o.amount||0)); }
  document.getElementById('totals').innerHTML =
    'Totaluri: '+(Array.from(m.entries()).map(([cur,sum])=>\`<strong>\${sum}</strong> \${cur}\`).join(' • ')||'-');

  // Sumar lunar
  const map = new Map();
  for(const o of flt){ const key=ym(o.createdAt); if(!map.has(key)) map.set(key,new Map()); const cur=(o.currency||'RON').toUpperCase(); const prev=map.get(key).get(cur)||{sum:0,count:0}; map.get(key).set(cur,{sum:prev.sum+Number(o.amount||0),count:prev.count+1}); }
  const ms = Array.from(map.entries()).sort(([a],[b])=>a<b?1:-1).map(([ymKey,curMap])=>{
    const cells = Array.from(curMap.entries()).map(([cur,v])=>\`<span style="margin-right:12px"><strong>\${v.sum}</strong> \${cur} <span style="color:#888">(\${v.count} com.)</span></span>\`).join('');
    return \`<div style="display:flex;justify-content:space-between"><div style="color:#555">\${ymKey}</div><div>\${cells}</div></div>\`;
  }).join('');
  document.getElementById('monthly').innerHTML = '<div style="font-weight:700;margin-bottom:8px">Sumar lunar</div>'+(ms||'<span class="muted">-</span>');

  // Tabel — rânduri (cu număr de ordine)
  const rows = flt.map((o, idx)=>{
    const no = flt.length - idx;
    
    const when = dfmt(o.createdAt);
    const email = o.email||''; const name=o.name||''; const orderNo=o.orderNo||'';
    const total = fmt(o.amount||0, o.currency||'');
    const status = (o.status||'paid').toLowerCase();
    const pickupStatus =
  String(o.pickupStatus || "pending").toLowerCase();

const pickupLabel =
  pickupStatus === "collected"
    ? "PREDATĂ"
    : "NEPREDATĂ";

const pickupClass =
  pickupStatus === "collected"
    ? "green"
    : "yellow";
    const fmts = sumFormats(o.items);
    const type = typeFromItems(o.items);
    const country = (o.country||"").toUpperCase();

    const displayItems = (o.items||[]).filter(it => it.type !== "courier_fee");
    const items = displayItems
      .map(it => \`\${it.description} — <span class="muted">x\${it.quantity}</span> — \${it.amount_total} \${(it.currency||'').toUpperCase()}\`)
      .join('<br/>');

    const courierLine = Number(o.courierFee) > 0
      ? \`<br/>Taxă curier — \${o.courierFee} \${(o.currency||'').toUpperCase()}\`
      : '';

    return \`
      <tr>
        <td class="nowrap">\${no}</td>
        <td class="nowrap">\${when}</td>
        <td>
          <div><strong>\${name || email}</strong></div>
          <div><a href="mailto:\${email}">\${email}</a>
            <button class="pill grey" style="margin-left:6px"
              onclick="copyEmail('\${email.replace(/'/g,"\\'")}')">copiază</button>
          </div>
        </td>
        <td>\${country || '-'}<br/><span class="muted" style="font-size:12px">\${country ? countryName(country) : ''}</span></td>
        <td>\${items}\${courierLine}</td>
        <td class="formats">\${fmts}</td>
        <td class="right"><strong>\${total}</strong><br/><span class="typeChip \${type.cls}">\${type.label}</span></td>
        <td>
  <div class="chip status \${status}">
    \${status}
  </div>

  \${SOURCE === "event"
    ? \`
      <div style="margin-top:7px">
        <span class="pill \${pickupClass}">
          \${pickupLabel}
        </span>
      </div>

      \${o.pickedUpAt
        ? \`
          <div class="muted" style="font-size:11px;margin-top:5px">
            \${dfmt(o.pickedUpAt)}
          </div>
        \`
        : ''
      }

      \${pickupStatus !== "collected"
        ? \`
          <div style="margin-top:9px">
            <button
              type="button"
              onclick="markCollected(
                decodeURIComponent('\${encodeURIComponent(
                  String(o.id || o.orderNo || "")
                )}'),
                this
              )"
              style="
                padding:7px 10px;
                border-radius:9px;
                border:1px solid #7a252d;
                background:#8b2c34;
                color:#fff;
                font-size:12px;
                font-weight:800;
                cursor:pointer;
              "
            >
              Marchează ca predată
            </button>
          </div>
        \`
        : \`
          <div style="
            margin-top:8px;
            color:#1b7f5a;
            font-size:12px;
            font-weight:700;
          ">
            Comandă finalizată
          </div>
        \`
      }
    \`
    : ''
  }

  \${orderNo
    ? \`<div class="muted" style="font-size:12px;margin-top:7px">
         #\${orderNo}
       </div>\`
    : ''
  }
</td>
      </tr>\`;
  }).join('');

  // header reordonat + col. nr
  document.getElementById('root').innerHTML = \`
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Client</th>
          <th>Țară</th>
          <th style="min-width:320px">Produse</th>
          <th>Format(e)</th>
          <th class="right">Total</th>
          <th>Status / #Comandă</th>
        </tr>
      </thead>
      <tbody>\${rows}</tbody>
    </table>\`;
}

async function inventoryRequest(payload, button){
  const token =
    document.getElementById('token')
      .value
      .trim();

  if (!token) {
    alert("Lipsește tokenul de administrator.");
    return null;
  }

  const originalText =
    button?.textContent || "";

  if (button) {
    button.disabled = true;
    button.textContent = "Se salvează…";
    button.style.opacity = "0.65";
  }

  try {
    const url =
      new URL('${BASE}/api/admin/orders');

    url.searchParams.set("token", token);

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-store",
      },

      body: JSON.stringify(payload),
    });

    const data = await response
      .json()
      .catch(() => ({}));

    if (!response.ok) {
      if (
        data.error ===
        "insufficient_stock"
      ) {
        throw new Error(
          "Stoc insuficient. Disponibil: " +
          Number(data.available || 0)
        );
      }

      throw new Error(
        data.error ||
        "Inventarul nu a putut fi actualizat."
      );
    }

    return data;
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
      button.style.opacity = "1";
    }
  }
}

async function adjustInventory(bookId, button){
  const safeId = encodeURIComponent(bookId);

  const deltaInput =
    document.getElementById(
      'delta-' + safeId
    );

  const reasonInput =
    document.getElementById(
      'reason-' + safeId
    );

  const delta =
    Number(deltaInput?.value);

  const reason =
    String(reasonInput?.value || "")
      .trim();

  if (
    !Number.isInteger(delta) ||
    delta === 0
  ) {
    alert(
      "Introdu o cantitate întreagă diferită de zero.\\n" +
      "Exemple: +20 pentru aprovizionare sau -10 pentru donație."
    );
    return;
  }

  if (!reason) {
    alert(
      "Scrie motivul ajustării."
    );
    return;
  }

  const text =
    delta > 0
      ? "Adaugi " + delta + " exemplare?"
      : "Scazi " + Math.abs(delta) + " exemplare?";

  if (
    !window.confirm(
      text + "\\n\\nMotiv: " + reason
    )
  ) {
    return;
  }

  try {
    await inventoryRequest(
      {
        action: "adjust_inventory",
        eventId: EVENT_ID,
        bookId,
        delta,
        reason,
      },
      button
    );

    alert("Stocul a fost actualizat.");
    await load(true);
  } catch (error) {
    alert(
      error?.message ||
      "A apărut o eroare."
    );
  }
}

async function setInventoryExact(bookId, button){
  const safeId = encodeURIComponent(bookId);

  const stockInput =
    document.getElementById(
      'stock-' + safeId
    );

  const reasonInput =
    document.getElementById(
      'set-reason-' + safeId
    );

  const stock =
    Number(stockInput?.value);

  const reason =
    String(reasonInput?.value || "")
      .trim();

  if (
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    alert(
      "Introdu stocul exact, ca număr întreg pozitiv sau zero."
    );
    return;
  }

  if (!reason) {
    alert(
      "Scrie motivul corecției."
    );
    return;
  }

  if (
    !window.confirm(
      "Setezi stocul exact la " +
      stock +
      " exemplare?\\n\\nMotiv: " +
      reason
    )
  ) {
    return;
  }

  try {
    await inventoryRequest(
      {
        action: "set_inventory",
        eventId: EVENT_ID,
        bookId,
        stock,
        reason,
      },
      button
    );

    alert(
      "Stocul a fost setat la " +
      stock +
      " exemplare."
    );

    await load(true);
  } catch (error) {
    alert(
      error?.message ||
      "A apărut o eroare."
    );
  }
}

async function markCollected(orderId, button){
  if (SOURCE !== "event") return;

  const confirmed = window.confirm(
    "Sigur marchezi această comandă ca predată?\\n\\n" +
    "Clientul va primi automat emailul de confirmare."
  );

  if (!confirmed) return;

  const tokenInput = document.getElementById("token");
  const token = tokenInput ? tokenInput.value.trim() : "";

  if (!token) {
    alert("Lipsește tokenul de administrator.");
    return;
  }

  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Se salvează…";
  button.style.opacity = "0.65";
  button.style.cursor = "not-allowed";

  try {
    const url = new URL('${BASE}/api/admin/orders');
    url.searchParams.set("token", token);

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-store",
      },

      body: JSON.stringify({
        action: "mark_collected",
        orderId,
      }),
    });

    const data = await response
      .json()
      .catch(() => ({}));

    if (!response.ok) {
      if (
        response.status === 409 &&
        data.error === "already_collected"
      ) {
        alert("Această comandă era deja marcată ca predată.");
        await load(true);
        return;
      }

      if (data.error === "order_not_paid") {
        throw new Error(
          "Comanda nu poate fi predată deoarece nu apare ca plătită."
        );
      }

      if (data.error === "order_not_found") {
        throw new Error("Comanda nu a fost găsită.");
      }

      throw new Error(
        data.error ||
        "Nu am putut actualiza această comandă."
      );
    }

    if (data.emailSent === true) {
      alert(
        "Comanda a fost marcată ca PREDATĂ.\\n" +
        "Emailul de confirmare a fost trimis clientului."
      );
    } else {
      alert(
        "Comanda a fost marcată ca PREDATĂ.\\n" +
        "Atenție: emailul de confirmare nu a putut fi trimis."
      );
    }

    await load(true);
  } catch (error) {
    alert(
      error?.message ||
      "A apărut o eroare la confirmarea predării."
    );

    button.disabled = false;
    button.textContent = originalText;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  }
}
function changeSource(){
  const selected = document.getElementById('source').value;

  const url = new URL(window.location.href);
  url.searchParams.set('source', selected);

  window.location.href = url.toString();
}
function reload(){ load(true); }
function copyEmail(email){ try{ navigator.clipboard.writeText(email||""); }catch{} }

function downloadCSV(){
  if (SOURCE === "inventory") {
    alert(
      "Exportul CSV pentru inventar îl adăugăm după verificarea fluxului."
    );
    return;
  }
  const flt = applyFilters();
  const head = ["nr","orderNo","id","createdAtIso","email","name","country","currency","amount","courierFee","status","formats","items"];
  const rows = flt.map((o,idx)=>{
    const formatsCsv = (()=>{ const s = ${"sumFormats"}(o.items); return s.replace(/,\\s*/g,"|"); })();
    return [
      idx+1,
      o.orderNo||"",
      o.id||"",
      new Date(Number(o.createdAt||0)).toISOString(),
      o.email||"",
      o.name||"",
      (o.country||"").toUpperCase(),
      (o.currency||"").toUpperCase(),
      o.amount ?? "",
      typeof o.courierFee==="number" ? o.courierFee : "",
      o.status || "",
      formatsCsv,
      (o.items||[]).filter(i=>i.type!=="courier_fee").map(i=>\`\${i.description} x\${i.quantity} = \${i.amount_total} \${(i.currency||"").toUpperCase()}\`).join(" | ")
    ];
  });
  const csv = [head.join(","), ...rows.map(r => r.map(c => \`"\${String(c).replace(/"/g,'""')}"\`).join(","))].join("\\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = \`orders-\${Date.now()}.csv\`; a.click();
  URL.revokeObjectURL(url);
}

if (SOURCE !== "inventory") {
  document
    .getElementById('q')
    .addEventListener('input', render);

  document
    .getElementById('status')
    .addEventListener('change', render);

  document
    .getElementById('currency')
    .addEventListener('change', render);

  document
    .getElementById('country')
    .addEventListener('change', render);

  document
    .getElementById('month')
    .addEventListener('change', render);

  document
    .getElementById('format')
    .addEventListener('change', render);
}

load();
</script>
</body>
</html>`;

    res.status(200).send(html);
  } catch (e) {
    console.error("admin/v2 ERROR:", e);
    res.status(500).send("server_error");
  }
}
