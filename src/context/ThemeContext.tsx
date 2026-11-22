import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('uiforge-docs-theme') as ThemeMode | null
      if (saved === 'light' || saved === 'dark') return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('uiforge-docs-theme', theme)
    } catch {
      // ignore storage errors
    }
  }, [theme])

  const setTheme = (t: ThemeMode) => setThemeState(t)
  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
