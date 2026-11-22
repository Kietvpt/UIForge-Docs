import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Box, Search, X } from 'lucide-react'
import { ALL_COMPONENTS, GUIDE_PAGES } from '@/registry'
import { useI18n } from '@/i18n/LanguageContext'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  type: 'component' | 'guide'
  title: string
  subtitle: string
  path: string
  badge?: string
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { ui, t } = useI18n()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIdx(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [isOpen])

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase()
    const list: SearchResult[] = []

    for (const c of ALL_COMPONENTS) {
      const hay = [
        c.name,
        c.exportName,
        c.componentType || '',
        c.summary.vi,
        c.summary.en,
        ...c.props.map((p) => p.name),
      ]
        .join(' ')
        .toLowerCase()
      if (!q || hay.includes(q)) {
        list.push({
          type: 'component',
          title: c.name,
          subtitle: t(c.summary),
          path: `/components/${c.slug}`,
          badge: c.componentType || 'Direct',
        })
      }
    }

    for (const g of GUIDE_PAGES) {
      const hay = [
        g.title.vi,
        g.title.en,
        g.summary.vi,
        g.summary.en,
        ...(g.keywords || []),
      ]
        .join(' ')
        .toLowerCase()
      if (!q || hay.includes(q)) {
        list.push({
          type: 'guide',
          title: t(g.title),
          subtitle: t(g.summary),
          path: `/docs/${g.slug}`,
          badge: g.section,
        })
      }
    }

    return list.slice(0, 14)
  }, [query, t])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx((i) => Math.min(i + 1, Math.max(0, results.length - 1)))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIdx]) {
        navigate(results[selectedIdx].path)
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, results, selectedIdx, navigate, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-4 pt-20 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0f1420]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIdx(0)
            }}
            placeholder={ui.searchPlaceholder}
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">{ui.searchNoResults}</div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.path}
                type="button"
                onMouseEnter={() => setSelectedIdx(idx)}
                onClick={() => {
                  navigate(item.path)
                  onClose()
                }}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  idx === selectedIdx
                    ? 'bg-indigo-500/12 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.type === 'component' ? (
                  <Box className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                ) : (
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{item.title}</span>
                    {item.badge && (
                      <span className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
          {ui.searchHint}
        </div>
      </div>
    </div>
  )
}
