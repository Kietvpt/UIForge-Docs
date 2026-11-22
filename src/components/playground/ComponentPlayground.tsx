import { useEffect, useMemo, useState } from 'react'
import {
  ComponentRenderer,
  EnterpriseDatePicker,
  EnterpriseSelect,
  ForgeAdvancedGrid,
  ForgeFormContainer,
  ForgeSearchModal,
  ForgeTabs,
  ForgeTabStack,
  type ComponentNode,
} from '@kietvpt/uiforge-core'
import { Code2, Eye, FileJson, RotateCcw, SlidersHorizontal } from 'lucide-react'
import type { ComponentDocEntry } from '@/registry/types'
import { seedDocsMockDatasets } from '@/registry/mockSeed'
import { useI18n } from '@/i18n/LanguageContext'
import { CodeBlock } from '@/components/docs/CodeBlock'

interface ComponentPlaygroundProps {
  entry: ComponentDocEntry
}

export function ComponentPlayground({ entry }: ComponentPlaygroundProps) {
  const { ui, t } = useI18n()
  const [activeTab, setActiveTab] = useState<'preview' | 'json' | 'code'>('preview')
  const [node, setNode] = useState<ComponentNode>(() => structuredClone(entry.defaultNode))
  const [jsonDraft, setJsonDraft] = useState('')
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)

  // Local state for standalone direct-import demos
  const [directSelectVal, setDirectSelectVal] = useState<any>('P01')
  const [directDateVal, setDirectDateVal] = useState<string>('22/11/2026')
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [pickedRecord, setPickedRecord] = useState<any>(null)

  useEffect(() => {
    seedDocsMockDatasets()
  }, [])

  useEffect(() => {
    const cloned = structuredClone(entry.defaultNode)
    setNode(cloned)
    setJsonDraft(JSON.stringify(cloned, null, 2))
    setJsonError(null)
    setResetKey((k) => k + 1)
  }, [entry])

  const updateProp = (key: string, value: unknown) => {
    setNode((prev) => {
      const next: ComponentNode = {
        ...prev,
        props: {
          ...prev.props,
          [key]: value,
        },
      }
      setJsonDraft(JSON.stringify(next, null, 2))
      return next
    })
  }

  const handleReset = () => {
    const cloned = structuredClone(entry.defaultNode)
    setNode(cloned)
    setJsonDraft(JSON.stringify(cloned, null, 2))
    setJsonError(null)
    setResetKey((k) => k + 1)
  }

  const handleJsonChange = (raw: string) => {
    setJsonDraft(raw)
    try {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && parsed.type && parsed.props) {
        setNode(parsed)
        setJsonError(null)
      }
    } catch (e: any) {
      setJsonError(e?.message || 'Invalid JSON')
    }
  }

  const tabStackNodes = useMemo<ComponentNode[]>(
    () => [
      {
        id: 'ts_tab_1',
        type: 'Container',
        parentId: 'demo_tabstack_root',
        pageId: 'docs_playground',
        order: 1,
        props: { label: 'Tổng Quan', isTab: true, layoutMode: 'grid', gridConfig: { columns: 12, gap: '12px' } },
        style: { padding: '12px' },
        events: [],
        children: [
          {
            id: 'ts_t1_c1',
            type: 'TextBox',
            parentId: 'ts_tab_1',
            pageId: 'docs_playground',
            order: 1,
            props: { label: 'Mã Hợp Đồng', value: 'CTR-2026-88', colSpan: 6, labelPosition: 'top' },
            style: {},
            events: [],
          },
          {
            id: 'ts_t1_c2',
            type: 'DatePicker',
            parentId: 'ts_tab_1',
            pageId: 'docs_playground',
            order: 2,
            props: { label: 'Ngày Hiệu Lực', value: '22/11/2026', colSpan: 6, labelPosition: 'top' },
            style: {},
            events: [],
          },
        ],
      },
      {
        id: 'ts_tab_2',
        type: 'Container',
        parentId: 'demo_tabstack_root',
        pageId: 'docs_playground',
        order: 1,
        props: { label: 'Ghi Chú & Điều Khoản', badge: 2, isTab: true, layoutMode: 'flex', flexConfig: { direction: 'column', gap: '10px' } },
        style: { padding: '12px' },
        events: [],
        children: [
          {
            id: 'ts_t2_c1',
            type: 'Textarea',
            parentId: 'ts_tab_2',
            pageId: 'docs_playground',
            order: 1,
            props: { label: 'Điều khoản thanh toán', value: 'Thanh toán trong vòng 30 ngày kể từ ngày xuất hóa đơn.', rows: 3, labelPosition: 'top' },
            style: {},
            events: [],
          },
        ],
      },
    ],
    []
  )

  const renderLiveComponent = () => {
    switch (entry.directMode) {
      case 'EnterpriseSelect':
        return (
          <div className="w-full max-w-md">
            <EnterpriseSelect
              value={directSelectVal}
              onChange={(v: any) => setDirectSelectVal(v)}
              items={[
                { id: 'P01', code: 'PRD-100', name: 'Enterprise Server Rack 42U', category: 'Hardware' },
                { id: 'P02', code: 'PRD-200', name: 'Fiber Optic Switch 48-Port', category: 'Networking' },
                { id: 'P03', code: 'PRD-300', name: 'Industrial Barcode Scanner', category: 'IoT' },
              ]}
              dropdownColumns={[
                { key: 'code', title: 'Mã', width: '95px' },
                { key: 'name', title: 'Tên Sản Phẩm', width: '210px' },
                { key: 'category', title: 'Nhóm', width: '100px' },
              ]}
              formatData={String(node.props.formatData || '{code} — {name}')}
              placeholder={String(node.props.placeholder || '— Chọn —')}
              disabled={Boolean(node.props.disabled)}
              readOnly={Boolean(node.props.readOnly)}
              canQuickAdd={Boolean(node.props.canQuickAdd)}
            />
          </div>
        )
      case 'EnterpriseDatePicker':
        return (
          <div className="w-full max-w-xs">
            <EnterpriseDatePicker
              value={directDateVal}
              onChange={setDirectDateVal}
              placeholder={String(node.props.placeholder || 'DD/MM/YYYY')}
              disabled={Boolean(node.props.disabled)}
              readOnly={Boolean(node.props.readOnly)}
            />
          </div>
        )
      case 'ForgeFormContainer':
        return (
          <div className="w-full">
            <ForgeFormContainer node={node}>
              <div className="grid grid-cols-12 gap-3 p-2">
                <div className="col-span-12 md:col-span-6">
                  <ComponentRenderer
                    node={{
                      id: 'ffc_demo_1',
                      type: 'TextBox',
                      parentId: null,
                      pageId: 'docs_playground',
                      order: 1,
                      props: { label: 'Mã Phiếu', value: 'NK-2026-089', labelPosition: 'top' },
                      style: {},
                      events: [],
                    }}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <ComponentRenderer
                    node={{
                      id: 'ffc_demo_2',
                      type: 'DatePicker',
                      parentId: null,
                      pageId: 'docs_playground',
                      order: 2,
                      props: { label: 'Ngày Nhập', value: '22/11/2026', labelPosition: 'top' },
                      style: {},
                      events: [],
                    }}
                  />
                </div>
              </div>
            </ForgeFormContainer>
          </div>
        )
      case 'ForgeAdvancedGrid':
        return (
          <div className="w-full">
            <ForgeAdvancedGrid node={node} />
          </div>
        )
      case 'ForgeTabs':
        return (
          <div className="w-full">
            <ForgeTabs key={resetKey} node={node}>
              <div className="p-4 text-sm text-slate-600 dark:text-slate-300">
                Click các tab phía trên để kiểm thử chuyển đổi tab trực tiếp từ <code className="font-mono text-indigo-400">ForgeTabs</code>.
              </div>
            </ForgeTabs>
          </div>
        )
      case 'ForgeTabStack':
        return (
          <div className="w-full">
            <ForgeTabStack
              parentId="demo_tabstack_root"
              order={1}
              tabNodes={tabStackNodes}
              renderChild={(child: ComponentNode) => <ComponentRenderer node={child} />}
            />
          </div>
        )
      case 'ForgeSearchModal':
        return (
          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Mở ForgeSearchModal ({String(node.props.entityName || 'Vendor')})
            </button>
            {pickedRecord && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-mono text-xs text-emerald-700 dark:text-emerald-300">
                Selected: {JSON.stringify(pickedRecord)}
              </div>
            )}
            <ForgeSearchModal
              isOpen={searchModalOpen}
              title={String(node.props.title || 'Tra Cứu Dữ Liệu')}
              entityName={String(node.props.entityName || 'Vendor')}
              onSelect={(item: any) => {
                setPickedRecord(item)
                setSearchModalOpen(false)
              }}
              onClose={() => setSearchModalOpen(false)}
            />
          </div>
        )
      case 'ForgeCheckbox':
        return (
          <div className="w-full max-w-lg">
            <ComponentRenderer key={`${resetKey}_${String(node.props.value)}`} node={node} />
          </div>
        )
      default:
        return (
          <div className="w-full">
            <ComponentRenderer key={resetKey} node={node} />
          </div>
        )
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0d1117]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/90 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center gap-1 rounded-lg bg-slate-200/70 p-1 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
              activeTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            {ui.componentDoc.preview}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
              activeTab === 'json'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <FileJson className="h-3.5 w-3.5" />
            {ui.componentDoc.jsonSchema}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
              activeTab === 'code'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            {ui.componentDoc.reactCode}
          </button>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {ui.componentDoc.reset}
        </button>
      </div>

      {/* Main Content */}
      {activeTab === 'preview' && (
        <div className={`grid grid-cols-1 ${entry.controls.length > 0 ? 'lg:grid-cols-12' : ''}`}>
          <div
            className={`playground-grid-bg flex min-h-[240px] items-center justify-center bg-[#0f172a] p-6 text-slate-100 ${
              entry.controls.length > 0 ? 'lg:col-span-8 lg:border-r lg:border-slate-800' : ''
            }`}
          >
            {renderLiveComponent()}
          </div>

          {entry.controls.length > 0 && (
            <div className="bg-slate-50/70 p-4 dark:bg-slate-900/40 lg:col-span-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-500" />
                {ui.componentDoc.controls}
              </div>
              <div className="space-y-3">
                {entry.controls.map((ctrl) => {
                  const currentVal = node.props[ctrl.key]
                  return (
                    <div key={ctrl.key} className="space-y-1">
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                        {t(ctrl.label)}
                      </label>
                      {ctrl.type === 'text' && (
                        <input
                          type="text"
                          value={String(currentVal ?? '')}
                          onChange={(e) => updateProp(ctrl.key, e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        />
                      )}
                      {ctrl.type === 'number' && (
                        <input
                          type="number"
                          min={ctrl.min}
                          max={ctrl.max}
                          step={ctrl.step ?? 1}
                          value={Number(currentVal ?? 0)}
                          onChange={(e) => updateProp(ctrl.key, Number(e.target.value))}
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        />
                      )}
                      {ctrl.type === 'select' && (
                        <select
                          value={String(currentVal ?? '')}
                          onChange={(e) => updateProp(ctrl.key, e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        >
                          {ctrl.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}
                      {ctrl.type === 'boolean' && (
                        <label className="inline-flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={Boolean(currentVal)}
                            onChange={(e) => updateProp(ctrl.key, e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                            {Boolean(currentVal) ? 'true' : 'false'}
                          </span>
                        </label>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'json' && (
        <div className="p-4">
          <textarea
            value={jsonDraft}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={14}
            spellCheck={false}
            className="w-full rounded-xl border border-slate-200 bg-[#0b0f17] p-4 font-mono text-xs leading-relaxed text-indigo-200 outline-none focus:border-indigo-500 dark:border-slate-800"
          />
          {jsonError && (
            <p className="mt-2 text-xs font-medium text-rose-500">JSON Error: {jsonError}</p>
          )}
        </div>
      )}

      {activeTab === 'code' && (
        <div className="px-4 pb-2">
          <CodeBlock code={entry.reactSnippet} language="tsx" title={`${entry.name}.tsx`} />
        </div>
      )}
    </div>
  )
}
