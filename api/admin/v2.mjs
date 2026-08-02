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

    const source =
      String(req.query?.source || "online").toLowerCase() === "event"
        ? "event"
        : "online";

    

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const BASE =
      (process.env.SITE_URL || "https://midaway.ro").replace(/\/$/, "");
      const dataUrl =
      `${BASE}/api/admin/orders` +
      `?token=${encodeURIComponent(token)}` +
      `&source=${encodeURIComponent(source)}`;

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
</style>
</head>
<body>
<h1>
  ${source === "event" ? "🎪 Comenzi Gaudeamus" : "📦 Comenzi Midaway"}
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
const fmt = (n, cur)=> \`\${n} \${(cur||'').toUpperCase()}\`;
const dfmt = (ts)=>{ try{const d=new Date(ts); return d.toLocaleDateString('ro-RO')+", "+d.toLocaleTimeString('ro-RO',{hour:'2-digit',minute:'2-digit'})}catch{return '-'} };
const countryName = (code)=>{ if(!code) return "-"; try{ return new Intl.DisplayNames(['ro'],{type:'region'}).of(code)||code }catch{return code} }
const ym = (ts)=>{ const d=new Date(Number(ts||0)); if(isNaN(d)) return '—'; return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); };

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
  if (force) url.searchParams.set('_', Date.now()); // cache buster
  document.getElementById('src').textContent = url.toString();

  const res = await fetch(url, { headers: {'cache-control':'no-store'} });
  if(!res.ok){ document.getElementById('root').innerHTML='<p style="color:#b42318">Eroare: '+res.status+'</p>'; return; }
  let data = await res.json();
  ORDERS = Array.isArray(data) ? data : Array.isArray(data?.orders) ? data.orders : [];

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
    \`
    : ''
  }

  \${orderNo
    ? \`<div class="muted" style="font-size:12px;margin-top:5px">
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
function changeSource(){
  const selected = document.getElementById('source').value;

  const url = new URL(window.location.href);
  url.searchParams.set('source', selected);

  window.location.href = url.toString();
}
function reload(){ load(true); }
function copyEmail(email){ try{ navigator.clipboard.writeText(email||""); }catch{} }

function downloadCSV(){
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

document.getElementById('q').addEventListener('input', render);
document.getElementById('status').addEventListener('change', render);
document.getElementById('currency').addEventListener('change', render);
document.getElementById('country').addEventListener('change', render);
document.getElementById('month').addEventListener('change', render);
document.getElementById('format').addEventListener('change', render);

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
