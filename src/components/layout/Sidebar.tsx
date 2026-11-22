import { Link, useLocation } from 'react-router-dom'
import { COMPONENTS_BY_CATEGORY, GUIDE_PAGES, type ComponentCategory } from '@/registry'
import { useI18n } from '@/i18n/LanguageContext'

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation()
  const { ui, t } = useI18n()

  const categoryLabels: Record<ComponentCategory, string> = {
    'form-inputs': ui.sidebar.formInputs,
    layout: ui.sidebar.layout,
    'data-display': ui.sidebar.dataDisplay,
    'navigation-overlay': ui.sidebar.navigationOverlay,
    'media-utility': ui.sidebar.mediaUtility,
  }

  const renderGuideGroup = (
    title: string,
    section: 'getting-started' | 'engines' | 'backend' | 'maintaining'
  ) => {
    const items = GUIDE_PAGES.filter((g) => g.section === section)
    return (
      <div className="mb-6">
        <div className="mb-2 px-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {title}
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const path = `/docs/${item.slug}`
            const active = location.pathname === path
            return (
              <li key={item.slug}>
                <Link
                  to={path}
                  onClick={onNavigate}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition ${
                    active
                      ? 'bg-indigo-500/12 font-semibold text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{t(item.title)}</span>
                  {item.badge && (
                    <span className="ml-2 shrink-0 rounded bg-indigo-500/15 px-1.5 py-0.5 font-mono text-[10px] font-medium text-indigo-600 dark:text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <aside className="h-full overflow-y-auto px-3 py-6">
      {renderGuideGroup(ui.sidebar.gettingStarted, 'getting-started')}

      <div className="mb-6">
        <div className="mb-2 px-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {ui.sidebar.componentsOverview}
        </div>
        {(Object.keys(COMPONENTS_BY_CATEGORY) as ComponentCategory[]).map((cat) => (
          <div key={cat} className="mb-3">
            <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {categoryLabels[cat]}
            </div>
            <ul className="space-y-0.5">
              {COMPONENTS_BY_CATEGORY[cat].map((comp) => {
                const path = `/components/${comp.slug}`
                const active = location.pathname === path
                return (
                  <li key={comp.slug}>
                    <Link
                      to={path}
                      onClick={onNavigate}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition ${
                        active
                          ? 'bg-indigo-500/12 font-semibold text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate font-mono text-[12.5px]">{comp.name}</span>
                      {!comp.rendererSupported && (
                        <span className="ml-1.5 shrink-0 rounded bg-slate-200/80 px-1 py-0.5 font-mono text-[9px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          Direct
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {renderGuideGroup(ui.sidebar.coreEngines, 'engines')}
      {renderGuideGroup(ui.sidebar.backendCore, 'backend')}
      {renderGuideGroup(ui.sidebar.maintaining, 'maintaining')}
    </aside>
  )
}
