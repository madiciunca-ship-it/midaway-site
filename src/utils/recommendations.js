// src/utils/recommendations.js
import { BOOKS } from "../data/books";

/**
 * Returnează până la `limit` cărți relevante, excluzând cartea curentă.
 * Match pe: limbă, gen, locație, tag-uri.
 */
export function recommendBooks(current, limit = 3) {
  const cur = current || null;

  const scored = BOOKS
    .filter(b => b && !b.hidden && (!cur || b.id !== cur.id))
    .map(b => {
      let score = 0;
      if (cur) {
        if (b.lang && cur.lang && b.lang === cur.lang) score += 4;
        if (b.genre && cur.genre && b.genre === cur.genre) score += 3;
        if (b.location && cur.location && b.location === cur.location) score += 2;

        const t1 = new Set((cur.tags || []).map(x => String(x).toLowerCase()));
        const t2 = new Set((b.tags || []).map(x => String(x).toLowerCase()));
        let common = 0;
        t1.forEach(x => { if (t2.has(x)) common += 1; });
        score += common; // +1 / tag comun
      }
      // mic bonus pt. cărți noi
      const added = b.addedAt ? Date.parse(b.addedAt) : 0;
      if (added && !Number.isNaN(added)) {
        const days = (Date.now() - added) / (1000 * 60 * 60 * 24);
        if (days < 60) score += 1; // ușor boost
      }
      return { b, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.b);

  return scored;
}

// opțional, dacă vrei să poți importa și default
export default recommendBooks;
