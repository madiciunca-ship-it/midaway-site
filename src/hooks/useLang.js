// src/hooks/useLang.js
import { useEffect, useState } from "react";

export function detectLang() {
  if (typeof window === "undefined") return "ro";
  const v =
    localStorage.getItem("lang") ||
    localStorage.getItem("home.lang") ||
    localStorage.getItem("travelers.lang") ||
    localStorage.getItem("guides.lang") ||
    "ro";
  return v === "en" ? "en" : "ro";
}

export function useLang() {
  const [lang, setLang] = useState(detectLang());

  const changeLang = (l) => {
    setLang(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      window.dispatchEvent(new Event("midaway:lang"));
    }
  };

  useEffect(() => {
    const sync = () => setLang(detectLang());
    window.addEventListener("midaway:lang", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("midaway:lang", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { lang, changeLang };
}
// NOTE: păstrat pentru viitoare extindere a sistemului bilingv (RO/EN)