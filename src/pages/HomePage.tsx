import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ComponentRenderer,
  type ComponentNode,
} from '@kietvpt/uiforge-core'
import {
  ArrowRight,
  Blocks,
  Cpu,
  Database,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { useI18n } from '@/i18n/LanguageContext'
import { ALL_COMPONENTS } from '@/registry'
import { seedDocsMockDatasets } from '@/registry/mockSeed'

export function HomePage() {
  const { ui, locale } = useI18n()
  const [installTab, setInstallTab] = useState<'frontend' | 'backend'>('frontend')

  useEffect(() => {
    seedDocsMockDatasets()
  }, [])

  const showcaseFormNode: ComponentNode = {
    id: 'home_showcase_section',
    type: 'Section',
    parentId: null,
    pageId: 'home_showcase',
    order: 1,
    props: {
      label: locale === 'vi' ? 'Biểu Mẫu Trực Tiếp (@kietvpt/uiforge-core)' : 'Live Form (@kietvpt/uiforge-core)',
      collapsible: false,
      layoutMode: 'grid',
      gridConfig: { columns: 12, gap: '12px' },
    },
    style: {},
    events: [],
    children: [
      {
        id: 'home_txt_1',
        type: 'TextBox',
        parentId: 'home_showcase_section',
        pageId: 'home_showcase',
        order: 1,
        props: { label: locale === 'vi' ? 'Mã Đơn Hàng' : 'Order Code', value: 'ORD-2026-089', colSpan: 6, labelPosition: 'top', required: true },
        style: {},
        events: [],
      },
      {
        id: 'home_dt_1',
        type: 'DatePicker',
        parentId: 'home_showcase_section',
        pageId: 'home_showcase',
        order: 2,
        props: { label: locale === 'vi' ? 'Ngày Giao' : 'Delivery Date', value: '22/11/2026', colSpan: 6, labelPosition: 'top' },
        style: {},
        events: [],
      },
      {
        id: 'home_sel_1',
        type: 'Select',
        parentId: 'home_showcase_section',
        pageId: 'home_showcase',
        order: 3,
        props: {
          label: locale === 'vi' ? 'Nhà Cung Cấp (Dropdown Đa Cột)' : 'Vendor (Multi-Column Dropdown)',
          reference: 'Vendor',
          formatData: '{code} — {name}',
          colSpan: 12,
          labelPosition: 'top',
          dropdownColumns: [
            { key: 'code', title: 'Code', width: '90px' },
            { key: 'name', title: 'Vendor', width: '200px' },
            { key: 'city', title: 'City', width: '110px' },
          ],
        },
        style: {},
        events: [],
      },
    ],
  }

  const showcaseChartNode: ComponentNode = {
    id: 'home_showcase_chart',
    type: 'Chart',
    parentId: null,
    pageId: 'home_showcase',
    order: 2,
    props: {
      label: locale === 'vi' ? 'Sản Lượng Xử Lý 2026' : '2026 Throughput',
      subtitle: 'Pure SVG • Bar / Line / Donut',
      chartType: 'bar',
      data: [
        { label: 'Q1', value: 48 },
        { label: 'Q2', value: 72 },
        { label: 'Q3', value: 65 },
        { label: 'Q4', value: 98 },
      ],
    },
    style: { minHeight: '260px' },
    events: [],
  }

  return (
    <DocsLayout fullWidth>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.16),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              {ui.home.badge}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              {ui.home.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {ui.home.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/docs/introduction"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
              >
                {ui.home.ctaStart}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/components/forge-table"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-400"
              >
                <Blocks className="h-4 w-4" />
                {ui.home.ctaComponents}
              </Link>
            </div>
          </div>

          {/* Quick Install Card */}
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-500 dark:text-slate-400">
                <Terminal className="h-3.5 w-3.5 text-indigo-500" />
                {ui.home.quickInstall}
              </span>
              <div className="flex gap-1 rounded-lg bg-slate-200/70 p-0.5 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setInstallTab('frontend')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
                    installTab === 'frontend'
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Frontend (npm)
                </button>
                <button
                  type="button"
                  onClick={() => setInstallTab('backend')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
                    installTab === 'backend'
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Backend (.NET 8)
                </button>
              </div>
            </div>
            {installTab === 'frontend' ? (
              <CodeBlock
                language="bash"
                title="GitHub Packages (@kietvpt/uiforge-core)"
                code={`npm install @kietvpt/uiforge-core`}
              />
            ) : (
              <CodeBlock
                language="bash"
                title="NuGet (.NET 8)"
                code={`dotnet add package UIForge.Core --version 1.0.0`}
              />
            )}
          </div>
        </div>
      </section>

      {/* Live Interactive Showcase */}
      <section className="border-b border-slate-200/80 bg-slate-50/60 py-14 dark:border-slate-800/80 dark:bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {ui.home.liveShowcaseTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {ui.home.liveShowcaseDesc}
              </p>
            </div>
            <Link
              to="/components/forge-textbox"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              {locale === 'vi' ? `Xem toàn bộ ${ALL_COMPONENTS.length} Components` : `View all ${ALL_COMPONENTS.length} Components`}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="playground-grid-bg rounded-2xl border border-slate-800 bg-[#0f172a] p-5 text-slate-100 shadow-sm lg:col-span-7">
              <ComponentRenderer node={showcaseFormNode} />
            </div>
            <div className="playground-grid-bg rounded-2xl border border-slate-800 bg-[#0f172a] p-5 text-slate-100 shadow-sm lg:col-span-5">
              <ComponentRenderer node={showcaseChartNode} />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {ui.home.pillarsTitle}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            to="/components/forge-table"
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-400/60 hover:shadow-md dark:border-slate-800 dark:bg-[#0d1117]"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/12 text-indigo-600 dark:text-indigo-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {ui.home.pillar1Title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {ui.home.pillar1Desc}
            </p>
          </Link>

          <Link
            to="/docs/backend-setup"
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-400/60 hover:shadow-md dark:border-slate-800 dark:bg-[#0d1117]"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
              {ui.home.pillar2Title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {ui.home.pillar2Desc}
            </p>
          </Link>

          <Link
            to="/docs/architecture"
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-400/60 hover:shadow-md dark:border-slate-800 dark:bg-[#0d1117]"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/12 text-violet-600 dark:text-violet-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
              {ui.home.pillar3Title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {ui.home.pillar3Desc}
            </p>
          </Link>
        </div>

        {/* Quick stats bar */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-center dark:border-slate-800 dark:bg-slate-900/40 md:grid-cols-4">
          <div>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              <Blocks className="h-5 w-5" /> 26
            </div>
            <div className="mt-1 text-xs font-medium text-slate-500">ERP UI Components</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              <Cpu className="h-5 w-5" /> 14
            </div>
            <div className="mt-1 text-xs font-medium text-slate-500">Frontend Core Engines</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-violet-600 dark:text-violet-400">
              <Server className="h-5 w-5" /> 10
            </div>
            <div className="mt-1 text-xs font-medium text-slate-500">.NET 8 REST Controllers</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              <Database className="h-5 w-5" /> 3 DBs
            </div>
            <div className="mt-1 text-xs font-medium text-slate-500">PostgreSQL • SQL Server • SQLite</div>
          </div>
        </div>
      </section>
    </DocsLayout>
  )
}
