import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/translations'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Callout } from '@/components/docs/Callout'

export function renderFrontendGuide(slug: string, locale: Locale): ReactNode | null {
  const isVi = locale === 'vi'

  switch (slug) {
    case 'introduction':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'UIForge là Enterprise Low-Code UI & Rapid Application Development Framework trung lập nghiệp vụ (100% Domain-Agnostic). Nền tảng giúp doanh nghiệp ở mọi lĩnh vực (Bán lẻ, Logistics, Y tế, Tài chính, Kho bãi, Sản xuất...) xây dựng giao diện quản trị và vận hành nghiệp vụ với tốc độ vượt bậc.'
              : 'UIForge is a 100% Domain-Agnostic Enterprise Low-Code UI & Rapid Application Development Framework designed to build complex business applications (Retail, Logistics, Healthcare, Finance, ERP) at high velocity.'}
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? 'Hệ sinh thái 3 nguồn mã nguồn (3-Repo Architecture)' : '3-Repository Ecosystem'}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-900/70">
                <tr>
                  <th className="px-4 py-3">Repository / Package</th>
                  <th className="px-4 py-3">{isVi ? 'Vai trò' : 'Role'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">@kietvpt/uiforge-core & UIForge.Core</td>
                  <td className="px-4 py-3">{isVi ? 'Lõi Framework (26 Components, 14 Frontend Engines, 10 Backend .NET 8 Controllers, Zero-Dependency Reports).' : 'Core Framework packages (26 UI Components, 14 Frontend Engines, 10 .NET 8 Controllers, Zero-Dependency Reports).'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">UIForge-App-Template</td>
                  <td className="px-4 py-3">{isVi ? 'Dự án mẫu cài đặt package Core để kiểm thử và phát triển nghiệp vụ thực tế (Docker + Caddy HTTPS).' : 'Starter application consuming Core packages for building real domain features with Docker & Caddy HTTPS.'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-violet-600 dark:text-violet-400">UIForge-Docs</td>
                  <td className="px-4 py-3">{isVi ? 'Trang tài liệu chính thức & Live Interactive Playground chạy trực tiếp từ @kietvpt/uiforge-core.' : 'Official documentation portal & Live Interactive Playground powered directly by @kietvpt/uiforge-core.'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="info" title={isVi ? 'Nguyên tắc Tách biệt Tuyệt đối (Strict Separation of Concerns)' : 'Strict Separation of Concerns'}>
            {isVi
              ? 'Lõi Core chứa 0% logic nghiệp vụ đặc thù. Toàn bộ logic doanh nghiệp được đặt trong các file *.bl.ts (tuân theo hợp đồng BaseBL) và kích hoạt động qua hệ thống Event Runner & JSON Metadata lưu trong Database.'
              : 'The Core contains 0% domain-specific business logic. All business rules live in *.bl.ts modules (BaseBL contract) and execute via the Event Runner & Database JSON Metadata.'}
          </Callout>
        </div>
      )

    case 'installation':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? '1. Cài đặt Frontend (@kietvpt/uiforge-core)' : '1. Frontend Installation (@kietvpt/uiforge-core)'}
          </h2>
          <p>
            {isVi
              ? 'Cấu hình file .npmrc trỏ về GitHub Packages (dùng biến môi trường GITHUB_TOKEN — tuyệt đối không commit token thật vào Git):'
              : 'Configure .npmrc to point @kietvpt to GitHub Packages (use GITHUB_TOKEN env var — never commit raw PAT tokens):'}
          </p>
          <CodeBlock
            language="ini"
            title=".npmrc"
            code={`@kietvpt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`}
          />
          <CodeBlock
            language="bash"
            title="Install Package & Peer Dependencies"
            code={`npm install @kietvpt/uiforge-core react react-dom zustand axios zod lucide-react @tanstack/react-query @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`}
          />
          <CodeBlock
            language="tsx"
            title="src/App.tsx"
            code={`import { useEffect } from 'react'
import { UIForgeApp, setApiBaseUrl } from '@kietvpt/uiforge-core'
import '@kietvpt/uiforge-core/style.css'
import './logic' // Đăng ký các module *.bl.ts

export function App() {
  useEffect(() => {
    setApiBaseUrl(import.meta.env.VITE_API_URL || 'http://localhost:5048')
  }, [])

  return <UIForgeApp />
}`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? '2. Cài đặt Backend (UIForge.Core — .NET 8 NuGet)' : '2. Backend Installation (UIForge.Core — .NET 8 NuGet)'}
          </h2>
          <CodeBlock
            language="bash"
            title="Add NuGet Source & Package"
            code={`dotnet nuget add source "https://nuget.pkg.github.com/Kietvpt/index.json" --name github --username Kietvpt --password "$GITHUB_TOKEN"
dotnet add package UIForge.Core --version 1.0.0`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? '3. Triển khai nhanh với Docker Compose' : '3. Docker Compose Quick Start'}
          </h2>
          <CodeBlock
            language="bash"
            title="PostgreSQL (mặc định) hoặc SQL Server"
            code={`cp .env.example .env
# PostgreSQL (~150MB RAM)
docker compose up -d --build
# Hoặc SQL Server 2022
docker compose --profile sqlserver up -d --build`}
          />
        </div>
      )

    case 'architecture':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'Mọi màn hình trong UIForge được mô tả bằng một cây JSON chuẩn hóa (FeaturePage → ComponentNode[]). ComponentRenderer đọc cây này, tự động bọc mỗi node trong PermissionGuard và áp dụng bố cục 12 cột hoặc Flexbox.'
              : 'Every screen in UIForge is represented by a declarative JSON tree (FeaturePage → ComponentNode[]). ComponentRenderer traverses this tree, wraps each node in PermissionGuard, and applies 12-column Grid or Flexbox layouts.'}
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">ComponentNode Schema</h2>
          <CodeBlock
            language="ts"
            title="ComponentNode Interface"
            code={`interface ComponentNode {
  id: string
  type: ComponentType // 'TextBox' | 'Number' | 'Select' | 'DatePicker' | 'Table' | 'Section' | ...
  parentId: string | null
  pageId: string
  order: number
  props: ComponentProps
  style: ComponentStyle
  events: ComponentEvent[]
  children?: ComponentNode[]
  dataBinding?: DataBindingConfig
  validation?: ValidationConfig
  permissions?: ComponentPermissionConfig
}`}
          />
          <Callout type="warning" title={isVi ? 'Phân biệt ComponentRenderer vs Direct Import' : 'ComponentRenderer vs Direct Import'}>
            {isVi
              ? '20 ComponentType (TextBox, Number, Textarea, Checkbox, Select, DatePicker, Autocomplete, SearchEntry, Button, Container, Section, Divider, Label, Table, TreeView, Chart, Modal, RecordSelector, FileUploadGrid, Tabs) được render động qua ComponentRenderer. 6 primitive chuyên dụng (EnterpriseSelect, EnterpriseDatePicker, ForgeFormContainer, ForgeAdvancedGrid, ForgeTabs, ForgeSearchModal) được import trực tiếp từ @kietvpt/uiforge-core.'
              : '20 ComponentTypes dispatch dynamically through ComponentRenderer. 6 specialized primitives (EnterpriseSelect, EnterpriseDatePicker, ForgeFormContainer, ForgeAdvancedGrid, ForgeTabs, ForgeSearchModal) are imported directly from @kietvpt/uiforge-core.'}
          </Callout>
        </div>
      )

    case 'data-engine':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'useDataEngine là kho trạng thái Zustand trung lập nghiệp vụ chịu trách nhiệm cho Two-Way Form Binding, bộ đệm dataset trong bộ nhớ, truy vấn OData (/api/core/data/{entity}), Auto-Populate và Dirty Tracking.'
              : 'useDataEngine is the domain-agnostic Zustand store powering Two-Way Form Binding, in-memory entity datasets, OData queries (/api/core/data/{entity}), Auto-Populate, and Dirty Tracking.'}
          </p>
          <CodeBlock
            language="ts"
            title="useDataEngine Usage"
            code={`import { useDataEngine } from '@kietvpt/uiforge-core'

const engine = useDataEngine.getState()

// 1. Nạp dataset cục bộ (offline hoặc cache)
engine.registerDataset('Vendor', [
  { id: 'V1', code: 'V01', name: 'Acme Corp', taxCode: '0101234567' }
])

// 2. Two-Way Form Binding (tự đồng bộ camelCase & PascalCase + đánh dấu dirty tab)
engine.setFieldValue('order_form', 'VendorId', 'V1')

// 3. Auto-Populate theo chuỗi quy tắc metadata
engine.applyPopulate('order_form', 'TaxCode = Vendor.taxCode, VendorName = Vendor.name', vendorObj)

// 4. Truy vấn OData & Lưu bản ghi (tự động POST nếu mới / PUT nếu đã có Id)
const vendors = await engine.queryEntity('Vendor', '?$filter=Active eq true&$orderby=Name asc')
const result = await engine.saveRecord('Order', engine.collectScreenData('order_form'), 'order_form')`}
          />
        </div>
      )

    case 'event-runner-bl':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'Mọi tương tác người dùng (click, change, dblclick, rowClick) và vòng đời màn hình (onInit, beforeSave, onSave, afterSave, beforeDelete, onFieldChange, onDispose) đều đi qua eventRunner để gọi hàm trong file *.bl.ts.'
              : 'All UI events (click, change, dblclick, rowClick) and screen lifecycles (onInit, beforeSave, onSave, afterSave, beforeDelete, onFieldChange, onDispose) route through eventRunner into *.bl.ts modules.'}
          </p>
          <CodeBlock
            language="ts"
            title="orderDetail.bl.ts (BaseBL / defineBL)"
            code={`import { defineBL, registerBL, type BaseBLContext } from '@kietvpt/uiforge-core'

export const OrderDetailBL = defineBL({
  async onInit(ctx: BaseBLContext) {
    console.log('Initialized feature:', ctx.featureId)
  },
  async beforeSave(entity) {
    if (!entity.customerCode) {
      return { valid: false, message: 'Vui lòng chọn khách hàng!' }
    }
    return true
  },
  async onSave(entity, ctx) {
    return ctx.dataEngine?.saveRecord('Order', entity, ctx.pageId)
  },
  async handleApprove(ctx: BaseBLContext) {
    return { success: true, message: 'Đã phê duyệt đơn hàng!' }
  },
})

// Đăng ký vào Core Event Runner
registerBL('orderDetail.bl.ts', OrderDetailBL)`}
          />
        </div>
      )

    case 'validation-cascading':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Validation Engine</h2>
          <p>
            {isVi
              ? 'Hỗ trợ kiểm tra toàn form với các luật: required, minLength, maxLength, pattern, containerNo (chuẩn kiểm tra chữ số kiểm tra ISO 6346), dateSequence (so sánh chuỗi ngày DD/MM/YYYY) và custom.'
              : 'Validates fields and entire forms using built-in rules: required, minLength, maxLength, pattern, containerNo (ISO 6346 check-digit verification), dateSequence (DD/MM/YYYY comparison), and custom validators.'}
          </p>
          <CodeBlock
            language="ts"
            title="validateForm & ISO 6346"
            code={`import { validateForm, validateISO6346ContainerNo } from '@kietvpt/uiforge-core'

const errors = validateForm(
  { containerNo: 'MSCU1234567', etd: '25/11/2026', eta: '20/11/2026' },
  {
    containerNo: [{ rule: 'required' }, { rule: 'containerNo' }],
    etd: [{ rule: 'dateSequence', targetField: 'eta', message: 'ETD phải trước ETA' }],
  }
)

const isoCheck = validateISO6346ContainerNo('MSCU1234567')`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cascading Engine</h2>
          <CodeBlock
            language="ts"
            title="cascadingRegistry"
            code={`import { getCascadedOptions, calculateAutoPopulatedFields } from '@kietvpt/uiforge-core'

// Lấy danh sách dropdown con phụ thuộc vào giá trị trường cha
const cities = getCascadedOptions('country', 'VN', 'city')
const populated = calculateAutoPopulatedFields('vendorId', 'V001', formValues)`}
          />
        </div>
      )

    case 'permission-rbac':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'usePermissionEngine quản lý phân quyền 3 tầng (Feature → Container/Component → Grid Column), hỗ trợ Role Simulation (previewRoleCode) ngay trong Studio, Partial Edit Mode (tô viền xanh các trường được phép sửa) và khóa sửa/xóa theo thời gian (lockUpdateAfterCreated / lockDeleteAfterCreated).'
              : 'usePermissionEngine evaluates 3-tier RBAC (Feature → Component → Grid Column), supports live Role Simulation (previewRoleCode), Partial Edit Mode highlighting, and time-based edit/delete locking.'}
          </p>
          <CodeBlock
            language="ts"
            title="usePermissionEngine & Role Simulation"
            code={`import { usePermissionEngine } from '@kietvpt/uiforge-core'

const perm = usePermissionEngine.getState()
await perm.fetchSecurityMetadata()

// Mô phỏng vai trò 'Sales' ngay lập tức (tự gửi header X-Preview-Role sang Backend)
perm.setPreviewRole('Sales')

const evalResult = perm.evaluateComponentPermission('page_1', textBoxNode)
// => { canRead, canWrite, isReadOnly, shouldHighlightEditable }`}
          />
        </div>
      )

    case 'navigation-realtime-resilience':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Navigation Engine (Multi-Tab & Popup)</h2>
          <CodeBlock
            language="ts"
            title="openTab & openPopup"
            code={`import { openTab, openPopup, closeTab, closePopup } from '@kietvpt/uiforge-core'

openTab('OrderDetail', { id: 101 }, 'Order #101')
openPopup('VendorQuickAdd', {}, 'New Vendor')`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Realtime Engine (SignalR Pessimistic Record Locking)</h2>
          <CodeBlock
            language="ts"
            title="useRealtimeEngine"
            code={`import { useRealtimeEngine } from '@kietvpt/uiforge-core'

const rt = useRealtimeEngine.getState()
await rt.connect()
await rt.lockRecord('Order', 101, 'alice')
const lockedByOther = rt.isRecordLocked('Order', 101, 'bob')`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Excel, PDF, DOCX & Global Hotkeys</h2>
          <CodeBlock
            language="ts"
            title="Export, Print & Hotkeys"
            code={`import {
  exportGridToExcel,
  printGridReport,
  downloadBackendPdfReport,
  downloadBackendDocxReport,
  useGlobalHotkeys,
} from '@kietvpt/uiforge-core'

// Phím tắt toàn cục: Alt+\` (đổi tab), Esc (đóng popup), F9/Ctrl+S (onSave), F8 (onApprove), Ctrl+Shift+F (tìm kiếm)
useGlobalHotkeys({ isPreview: true, canEdit: false })

exportGridToExcel({ fileName: 'Orders', columns, rows, includeSummary: true })
printGridReport({ title: 'Order Report', columns, rows, showSignatures: true })`}
          />

          <Callout type="tip" title="Resilience Client (Offline / 502-503 Queue)">
            {isVi
              ? 'Mọi request POST/PUT/PATCH/DELETE gặp lỗi mạng hoặc 502/503/504 được tự động xếp hàng vào localStorage (uiforge_resilience_queue_v1) và phát lại theo thứ tự FIFO mỗi 20 giây hoặc ngay khi có mạng trở lại.'
              : 'Network or 502/503/504 mutations automatically queue in localStorage (uiforge_resilience_queue_v1) and replay FIFO every 20 seconds or immediately upon window.online.'}
          </Callout>
        </div>
      )

    default:
      return null
  }
}
