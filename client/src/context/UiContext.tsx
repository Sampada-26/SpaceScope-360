import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Language = "en" | "hi" | "mr";
type Theme = "dark" | "light";

type UiContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (text: string) => string;
};

const UiContext = createContext<UiContextType | undefined>(undefined);

const LANGUAGE_KEY = "spacescope.language";
const THEME_KEY = "spacescope.theme";

export function UiProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [tick, setTick] = useState(0);
  const cacheRef = useRef<Record<Language, Record<string, string>>>({
    en: {},
    hi: {},
    mr: {},
  });
  const pendingRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (storedLang === "en" || storedLang === "hi" || storedLang === "mr") {
      setLanguageState(storedLang);
    }

    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    pendingRef.current.clear();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [language]);

  const flushTranslations = async (lang: Language, texts: string[]) => {
    const apiUrl =
      (import.meta.env.VITE_TRANSLATE_URL as string | undefined) ||
      "/translate";

    const langCache = cacheRef.current[lang] || {};
    for (const text of texts) {
      if (langCache[text]) continue;
      try {
        const url = new URL(apiUrl, window.location.origin);
        url.searchParams.set("q", text);
        url.searchParams.set("langpair", `en|${lang}`);

        const res = await fetch(url.toString(), { method: "GET" });
        if (!res.ok) {
          const errText = await res.text();
          console.warn("Translation request failed", res.status, errText);
          continue;
        }
        const data = await res.json();
        const translated = data?.responseData?.translatedText;
        if (typeof translated === "string" && translated) {
          langCache[text] = translated;
        }
      } catch {
        // no-op
      }
    }
    cacheRef.current[lang] = langCache;
    setTick((v) => v + 1);
  };

  const t = (text: string) => {
    if (!text || language === "en") return text;
    const cached = cacheRef.current[language]?.[text];
    if (cached) return cached;

    pendingRef.current.add(text);
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        const batch = Array.from(pendingRef.current);
        pendingRef.current.clear();
        timerRef.current = null;
        if (batch.length > 0) {
          void flushTranslations(language, batch);
        }
      }, 200);
    }

    return text;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: (lang: Language) => setLanguageState(lang),
      theme,
      toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
      t,
    }),
    [language, theme, tick]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return context;
}
