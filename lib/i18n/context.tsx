"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translations, type Lang, type TranslationKey } from "./translations";

const STORAGE_KEY = "tsc-lang";

/* --------------------------------------------------------------------------
   Language is stored in localStorage (same key as the original site) and
   read through useSyncExternalStore so SSR renders "gu" (the default for
   first-time visitors) and the client hydrates to the stored value without
   a setState-in-effect. A visitor who has explicitly picked English gets
   "en" back; everyone else — including first-time visitors — gets Gujarati.
   -------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "gu";
  } catch {
    return "gu";
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function writeStoredLang(next: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode / disabled storage */
  }
  listeners.forEach((l) => l());
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Translate a key for the active language (falls back to English, then the key). */
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Lang>(
    subscribe,
    readStoredLang,
    () => "gu",
  );

  const setLang = useCallback((next: Lang) => writeStoredLang(next), []);

  // Keep <html lang> in sync so the :root[lang="gu"] typography rules apply.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = translations[lang] as Record<TranslationKey, string>;
    const fallback = translations.en as Record<TranslationKey, string>;
    return {
      lang,
      setLang,
      toggle: () => setLang(lang === "en" ? "gu" : "en"),
      t: (key) => dict[key] ?? fallback[key] ?? key,
    };
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
