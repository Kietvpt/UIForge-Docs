import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Package } from 'lucide-react'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { ComponentPlayground } from '@/components/playground/ComponentPlayground'
import { PropsTable } from '@/components/docs/PropsTable'
import { Callout } from '@/components/docs/Callout'
import { ALL_COMPONENTS, getComponentBySlug } from '@/registry'
import { useI18n } from '@/i18n/LanguageContext'

export function ComponentDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { ui, t } = useI18n()

  const entry = slug ? getComponentBySlug(slug) : ALL_COMPONENTS[0]

  if (!entry) {
    return (
      <DocsLayout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold">Component not found</h1>
          <Link to="/components/forge-textbox" className="mt-4 inline-block text-sm text-indigo-500 underline">
            Back to Components
          </Link>
        </div>
      </DocsLayout>
    )
  }

  const idx = ALL_COMPONENTS.findIndex((c) => c.slug === entry.slug)
  const prev = idx > 0 ? ALL_COMPONENTS[idx - 1] : null
  const next = idx < ALL_COMPONENTS.length - 1 ? ALL_COMPONENTS[idx + 1] : null

  return (
    <DocsLayout>
      {/* Header & Badges */}
      <div className="mb-6 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/12 px-2.5 py-0.5 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Package className="h-3.5 w-3.5" />
            @kietvpt/uiforge-core
          </span>
          {entry.componentType && (
            <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              type: "{entry.componentType}"
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              entry.rendererSupported
                ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-500/12 text-amber-700 dark:text-amber-300'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {entry.rendererSupported ? ui.componentDoc.rendererSupport : ui.componentDoc.directImportOnly}
          </span>
        </div>

        <h1 className="font-mono text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {entry.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {t(entry.description)}
        </p>
      </div>

      {/* Live Interactive Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {ui.componentDoc.livePlayground}
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {ui.componentDoc.interactiveHint}
        </p>
        <ComponentPlayground entry={entry} />
      </section>

      {/* Props Reference */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {ui.componentDoc.propsTitle}
        </h2>
        <PropsTable props={entry.props} />
      </section>

      {/* Events */}
      {entry.events && entry.events.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
            {ui.componentDoc.eventsTitle}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
                  <th className="px-4 py-2.5">Trigger</th>
                  <th className="px-4 py-2.5">Payload</th>
                  <th className="px-4 py-2.5">{ui.componentDoc.propDesc}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
                {entry.events.map((ev) => (
                  <tr key={ev.trigger}>
                    <td className="px-4 py-2.5 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {ev.trigger}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {ev.payload || 'BaseBLContext'}
                    </td>
                    <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">
                      {t(ev.description)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Notes */}
      {entry.notes && entry.notes.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
            {ui.componentDoc.notesTitle}
          </h2>
          {entry.notes.map((n, i) => (
            <Callout key={i} type="tip">
              {t(n)}
            </Callout>
          ))}
        </section>
      )}

      {/* Prev / Next Footer */}
      <div className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
        {prev ? (
          <Link
            to={`/components/${prev.slug}`}
            className="group flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-indigo-400 dark:border-slate-800"
          >
            <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
            <div>
              <div className="text-[11px] text-slate-500">Previous</div>
              <div className="font-mono font-semibold">{prev.name}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next && (
          <Link
            to={`/components/${next.slug}`}
            className="group flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-right text-sm font-medium transition hover:border-indigo-400 dark:border-slate-800"
          >
            <div>
              <div className="text-[11px] text-slate-500">Next</div>
              <div className="font-mono font-semibold">{next.name}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
          </Link>
        )}
      </div>
    </DocsLayout>
  )
}
