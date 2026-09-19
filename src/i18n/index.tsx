import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from './ui.en'
import { es } from './ui.es'

export type Locale = 'en' | 'es'
export const LOCALES: { id: Locale; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
]

const KEY = 'from-love.locale'
const TABLES: Record<Locale, Record<string, string>> = { en, es }

interface Ctx {
  locale: Locale
  setLocale: (l: Locale) => void
}
const LocaleContext = createContext<Ctx>({ locale: 'en', setLocale: () => {} })

function detect(): Locale {
  try {
    const saved = localStorage.getItem(KEY) as Locale | null
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* no storage */
  }
  return typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detect)
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* ignore */
    }
  }, [])
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

/**
 * UI string lookup: t('nav.learn') or t('studio.speed', { n: 2 }) with {n} placeholders.
 * Falls back to English, then to the key itself, so a missing translation never blanks the UI.
 */
export function useT() {
  const { locale } = useLocale()
  return useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let s = TABLES[locale][key] ?? TABLES.en[key] ?? key
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v))
      return s
    },
    [locale],
  )
}
