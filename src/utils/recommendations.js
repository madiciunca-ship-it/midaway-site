import { BOOKS } from "../data/books";

// mic random determinist ca să „rotim” zilnic
function seededRand(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function recommendBooks(current, limit = 3) {
  if (!current) return [];

  const todaySeed = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ""), 10);

  // 1) candidații: nu cartea curentă, nu hidden
  const candidates = BOOKS.filter(
    (b) => b && b.id !== current.id && !b.hidden
  );

  // 2) scor de similaritate + tie-break random stabil pe zi
  const scored = candidates.map((b) => {
    let score = 0;
    if (b.lang && current.lang && b.lang === current.lang) score += 3;
    if (b.genre && current.genre && b.genre === current.genre) score += 2;
    if (b.location && current.location && b.location === current.location) score += 1;
    const tagsA = new Set((current.tags || []).map((t) => String(t).toLowerCase()));
    const tagsB = new Set((b.tags || []).map((t) => String(t).toLowerCase()));
    let overlap = 0;
    tagsB.forEach((t) => { if (tagsA.has(t)) overlap++; });
    score += overlap * 1; // +1 pe tag comun

    // ușoară preferință pentru cărți adăugate recent
    const added = b.addedAt ? Date.parse(b.addedAt) : 0;
    if (isFinite(added) && added > 0) score += 0.5;

    // tie-break: random stabil (în funcție de zi + id)
    const tie = seededRand(todaySeed + b.id.length);

    return { b, score, tie };
  });

  // 3) sortare: scor desc, apoi tie desc
  scored.sort((a, b) => (b.score - a.score) || (b.tie - a.tie));

  // 4) luăm un top mai mare și apoi „rotim” ușor ca să nu fie mereu aceleași 3
  const top = scored.slice(0, Math.max(limit * 2, limit + 1));
  // amestecare mică stabilă
  top.sort((a, b) => seededRand(todaySeed + a.b.id.length) - seededRand(todaySeed + b.b.id.length));

  return top.slice(0, limit).map((x) => x.b);
}
