import React, { createContext, useContext, useEffect, useState } from 'react'
import { translations, type Locale, type BilingualText } from './translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (text: BilingualText) => string
  ui: (typeof translations)[Locale]
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'vi',
  setLocale: () => {},
  toggleLocale: () => {},
  t: (text) => text.vi,
  ui: translations.vi,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('uiforge-docs-locale')
      if (saved === 'vi' || saved === 'en') return saved
    } catch {
      // ignore
    }
    return 'vi'
  })

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem('uiforge-docs-locale', locale)
    } catch {
      // ignore
    }
  }, [locale])

  const setLocale = (l: Locale) => setLocaleState(l)
  const toggleLocale = () => setLocaleState((prev) => (prev === 'vi' ? 'en' : 'vi'))
  const t = (text: BilingualText) => text[locale]

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t, ui: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useI18n() {
  return useContext(LanguageContext)
}
