export const SITE_LANG_KEY = "site.lang";

export function normalizeLanguage(value) {
  return value === "en" ? "en" : "ro";
}

export function getSiteLanguage(legacyKeys = []) {
  if (typeof window === "undefined") return "ro";

  const globalValue = localStorage.getItem(SITE_LANG_KEY);
  if (globalValue === "ro" || globalValue === "en") {
    return globalValue;
  }

  for (const key of legacyKeys) {
    const legacyValue = localStorage.getItem(key);
    if (legacyValue === "ro" || legacyValue === "en") {
      localStorage.setItem(SITE_LANG_KEY, legacyValue);
      return legacyValue;
    }
  }

  return "ro";
}

export function setSiteLanguage(lang, legacyKeys = []) {
  if (typeof window === "undefined") return;

  const normalized = normalizeLanguage(lang);
  localStorage.setItem(SITE_LANG_KEY, normalized);

  for (const key of legacyKeys) {
    localStorage.setItem(key, normalized);
  }
}