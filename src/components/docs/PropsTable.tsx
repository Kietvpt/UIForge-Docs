import type { PropDoc } from '@/registry/types'
import { useI18n } from '@/i18n/LanguageContext'

export function PropsTable({ props }: { props: PropDoc[] }) {
  const { ui, t } = useI18n()

  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/90 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
            <th className="px-4 py-3">{ui.componentDoc.propName}</th>
            <th className="px-4 py-3">{ui.componentDoc.propType}</th>
            <th className="px-4 py-3">{ui.componentDoc.propDefault}</th>
            <th className="px-4 py-3">{ui.componentDoc.propDesc}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
          {props.map((p) => (
            <tr key={p.name} className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
              <td className="px-4 py-3 align-top font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                {p.name}
                {p.required && <span className="ml-1 text-rose-500">*</span>}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-emerald-700 dark:text-emerald-400">
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5">{p.type}</span>
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {p.defaultValue || '—'}
              </td>
              <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300 leading-relaxed">
                {t(p.description)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
