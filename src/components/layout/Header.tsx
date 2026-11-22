import { Link, useLocation } from 'react-router-dom'
import { Layers, Menu, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useI18n } from '@/i18n/LanguageContext'

interface HeaderProps {
  onOpenSearch: () => void
  onToggleMobileMenu: () => void
}

export function Header({ onOpenSearch, onToggleMobileMenu }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { locale, toggleLocale, ui } = useI18n()
  const location = useLocation()

  const navLinks = [
    { to: '/docs/introduction', label: ui.nav.docs, match: '/docs' },
    { to: '/components/forge-textbox', label: ui.nav.components, match: '/components' },
    { to: '/docs/data-engine', label: ui.nav.engines, match: '/docs/data-engine' },
    { to: '/docs/backend-setup', label: ui.nav.backend, match: '/docs/backend' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#090b10]/80">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 lg:px-6">
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
              <Layers className="h-4 w-4" />
            </span>
            <span className="text-base">UIForge</span>
            <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-indigo-600 dark:text-indigo-300 sm:inline-block">
              v1.0.1
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = location.pathname.startsWith(link.match)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right: Search + VI/EN + Theme */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 transition hover:border-indigo-400/60 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{ui.searchPlaceholder.slice(0, 26)}...</span>
            <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-indigo-400"
            title="Switch Language (VI / EN)"
          >
            {locale.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-amber-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
