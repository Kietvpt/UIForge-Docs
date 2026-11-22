import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { GUIDE_PAGES, getGuideBySlug } from '@/registry'
import { useI18n } from '@/i18n/LanguageContext'
import { renderFrontendGuide } from '@/content/guidesFrontend'
import { renderBackendGuide } from '@/content/guidesBackend'

export function GuidePage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale, t } = useI18n()

  const guide = slug ? getGuideBySlug(slug) : GUIDE_PAGES[0]

  if (!guide) {
    return (
      <DocsLayout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <Link to="/docs/introduction" className="mt-4 inline-block text-sm text-indigo-500 underline">
            Back to Introduction
          </Link>
        </div>
      </DocsLayout>
    )
  }

  const idx = GUIDE_PAGES.findIndex((g) => g.slug === guide.slug)
  const prev = idx > 0 ? GUIDE_PAGES[idx - 1] : null
  const next = idx < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[idx + 1] : null

  const body = renderFrontendGuide(guide.slug, locale) || renderBackendGuide(guide.slug, locale)

  return (
    <DocsLayout>
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-indigo-500/12 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            {guide.section}
          </span>
          {guide.badge && (
            <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {guide.badge}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t(guide.title)}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          {t(guide.summary)}
        </p>
      </div>

      <article className="pb-6">{body}</article>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
        {prev ? (
          <Link
            to={`/docs/${prev.slug}`}
            className="group flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-indigo-400 dark:border-slate-800"
          >
            <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
            <div>
              <div className="text-[11px] text-slate-500">Previous</div>
              <div className="font-semibold">{t(prev.title)}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next && (
          <Link
            to={`/docs/${next.slug}`}
            className="group flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-right text-sm font-medium transition hover:border-indigo-400 dark:border-slate-800"
          >
            <div>
              <div className="text-[11px] text-slate-500">Next</div>
              <div className="font-semibold">{t(next.title)}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
          </Link>
        )}
      </div>
    </DocsLayout>
  )
}
