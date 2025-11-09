// src/utils/recommendations.js
import { BOOKS } from "../data/books";

function toSet(arr) {
  return new Set((arr || []).map((t) => String(t).toLowerCase()));
}

export function recommendBooks(currentBook, count = 3) {
  if (!currentBook) return [];

  const tagsA = toSet(currentBook.tags);
  const pool = BOOKS.filter(
    (b) => b && !b.hidden && b.id !== currentBook.id && b.lang === currentBook.lang
  );

  const scored = pool.map((b) => {
    let score = 0;

    // matching criterii simple
    if (b.genre && currentBook.genre && b.genre === currentBook.genre) score += 2;
    if (b.location && currentBook.location && b.location === currentBook.location) score += 2;

    const tagsB = toSet(b.tags);
    let overlap = 0;
    for (const t of tagsB) if (tagsA.has(t)) overlap++;
    score += Math.min(overlap, 3); // max 3p din tags

    // recența ajută puțin la departajare
    const added = b.addedAt ? Date.parse(b.addedAt) || 0 : 0;

    return { b, score, added };
  });

  scored.sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;        // scor mai mare
    if (y.added !== x.added) return y.added - x.added;        // mai nou
    return Math.random() - 0.5;                               // tiebreaker
  });

  let result = scored.slice(0, count).map((s) => s.b);

  // fallback dacă n-am strâns destule
  if (result.length < count) {
    const extras = pool
      .filter((b) => !result.some((r) => r.id === b.id))
      .sort((a, b) => (Date.parse(b.addedAt || 0) || 0) - (Date.parse(a.addedAt || 0) || 0))
      .slice(0, count - result.length);
    result = result.concat(extras);
  }

  return result.slice(0, count);
}
