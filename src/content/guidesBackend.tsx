import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/translations'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Callout } from '@/components/docs/Callout'

export function renderBackendGuide(slug: string, locale: Locale): ReactNode | null {
  const isVi = locale === 'vi'

  switch (slug) {
    case 'backend-setup':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'UIForge.Core (.NET 8.0) cung cấp toàn bộ động cơ Metadata động, OData Query, Multi-DB (PostgreSQL / SQL Server / SQLite), Multi-Branch, SignalR và bộ xuất Excel/PDF/DOCX không phụ thuộc thư viện ngoài.'
              : 'UIForge.Core (.NET 8.0) provides the generic Dynamic Metadata Engine, OData querying, Multi-DB (PostgreSQL / SQL Server / SQLite), Multi-Branch routing, SignalR, and Zero-Dependency Excel/PDF/DOCX generators.'}
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">appsettings.json</h2>
          <CodeBlock
            language="json"
            title="appsettings.json"
            code={`{
  "Database": { "Provider": "PostgreSQL" },
  "ConnectionStrings": {
    "BranchTemplate": "Host=localhost;Port=5432;Database=uiforge_{branch};Username=postgres;Password=postgres"
  },
  "Branching": { "DefaultBranch": "BetaV1" },
  "Jwt": {
    "Key": "Min-32-Bytes-Secret-Key-Change-In-Production",
    "Issuer": "UIForge.API",
    "Audience": "UIForge.Client",
    "ExpiresHours": 12
  }
}`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Program.cs</h2>
          <CodeBlock
            language="csharp"
            title="Program.cs"
            code={`builder.Services.AddDbContext<AppDbContext>((sp, opts) => {
    var http = sp.GetRequiredService<IHttpContextAccessor>().HttpContext;
    var branch = http?.User?.FindFirst("branch")?.Value
                 ?? http?.Request.Headers["X-Branch"].FirstOrDefault();
    opts.UseUIForgeDatabase(builder.Configuration, branch);
});

builder.Services.AddUIForgeCore<AppDbContext>(builder.Configuration);
builder.Services.AddUIForgeJwtAuthentication(builder.Configuration);
builder.Services.AddControllers().AddUIForgeControllers();
builder.Services.AddSignalR();
builder.Services.AddHostedService<ScheduledMaintenanceService>();

// Pipeline
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<UIForgeHub>("/hubs/uiforge");`}
          />
        </div>
      )

    case 'backend-entities':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'Mọi bảng nghiệp vụ của doanh nghiệp bắt buộc kế thừa BaseEntity để được DynamicMetadataController tự động khám phá, hỗ trợ Xóa Mềm (Active = false) và Audit Trail.'
              : 'All business tables must inherit from BaseEntity to be auto-discovered by DynamicMetadataController with Soft Delete (Active = false) and full Audit Trail.'}
          </p>
          <CodeBlock
            language="csharp"
            title="BaseEntity & Custom AppDbContext"
            code={`public abstract class BaseEntity
{
    public int Id { get; set; }
    public bool Active { get; set; } = true;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public string? CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public string? UpdatedBy { get; set; }
}

public class AppDbContext : UIForgeDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Order> Orders => Set<Order>();
}`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? '12 Bảng Lõi trong UIForgeDbContext' : '12 Core Tables in UIForgeDbContext'}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ['Projects & Pages', 'Quản lý workspace và cây màn hình phân cấp (Parent/Children).'],
              ['UIComponents', 'Lưu cây component JSON (PropsJson, StyleJson, EventsJson, DataBindingJson, ValidationJson, PermissionsJson).'],
              ['Users, Roles, UserRoles', 'Tài khoản, vai trò động và gán vai trò N-N.'],
              ['FeaturePolicies & ComponentPolicies', 'Ma trận phân quyền 13 cột cấp màn hình và 5 quyền cấp component/cột.'],
              ['RolePermissions', 'Bảng phân quyền dự phòng cấp EntityName (hỗ trợ wildcard *).'],
              ['MasterDatas', 'Danh mục dùng chung phân cấp (ParentId / Path).'],
              ['UserSettings', 'Lưu cá nhân hóa giao diện & GridPolicy theo từng người dùng.'],
              ['AuditLogs', 'Lịch sử thay đổi từng trường (CREATE / UPDATE / PATCH / DELETE).'],
            ].map(([name, desc]) => (
              <div key={name} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{name}</div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )

    case 'backend-api':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? '10 Controller được tự động nạp qua AddUIForgeControllers():'
              : '10 REST Controllers auto-registered via AddUIForgeControllers():'}
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-900/70">
                <tr>
                  <th className="px-4 py-3">Controller</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">{isVi ? 'Chức năng chính' : 'Key Capabilities'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {[
                  ['AuthController', 'POST /api/auth/login', 'Đăng nhập theo nhánh DB (branch), cấp JWT token.'],
                  ['DynamicMetadataController', '/api/core/data/{entity}', 'OData ($filter, $top, $skip, $orderby), Field Masking, Optimistic Concurrency (409), Check-Unique, Audit Logs.'],
                  ['PagesController', '/api/pages', 'CRUD trang, lưu cây component giao dịch (save), reorder, clone, toggle-active.'],
                  ['ProjectsController', '/api/projects', 'Danh sách và khởi tạo Project workspace.'],
                  ['FeaturePoliciesController', '/api/core/feature-policies', 'CRUD Roles, Users và ma trận 13 quyền FeaturePolicy.'],
                  ['ComponentPoliciesController', '/api/core/component-policies', 'Đồng bộ ma trận 5 quyền cấp Component/Cột + cache JSON.'],
                  ['UserSettingsController', '/api/core/user-settings', 'Lưu/đọc/reset cá nhân hóa GridPolicy theo user.'],
                  ['FilesController', '/api/core/files', 'Upload đa tệp, chặn đuôi nguy hiểm, chống Directory Traversal, Range Download.'],
                  ['ExcelExportController', '/api/core/export/excel', 'Xuất .xlsx OpenXML chuẩn từ dữ liệu grid hoặc trực tiếp từ Entity DB.'],
                  ['ReportsController', '/api/core/reports/pdf|docx', 'Xuất PDF 1.4 (watermark, chữ ký), HTML Print View và điền mẫu Word .docx ({Key}).'],
                ].map(([ctrl, route, desc]) => (
                  <tr key={ctrl}>
                    <td className="px-4 py-2.5 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">{ctrl}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-emerald-700 dark:text-emerald-400">{route}</td>
                    <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'backend-realtime-security':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">SignalR UIForgeHub (/hubs/uiforge)</h2>
          <CodeBlock
            language="text"
            title="Hub Methods & Broadcast Events"
            code={`Client -> Server:
  JoinFeatureGroup(featureCode) / LeaveFeatureGroup(featureCode)
  LockRecord(entityName, recordId, username) -> Task<bool> (auto-expire 30m)
  UnlockRecord(entityName, recordId) -> Task<bool>
  GetActiveLocks() -> Task<List<RecordLockInfo>>
  NotifyRecordUpdated(entityName, recordId, updatedBy)
  SendNotification(title, message, type)

Server -> Clients:
  RecordLocked | RecordUnlocked | RecordUpdated | ReceiveNotification`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">[RequireEntityPermission] RBAC / ABAC Filter</h2>
          <p>
            {isVi
              ? 'Hỗ trợ header X-Preview-Role (mô phỏng vai trò) và X-Feature-Id. Nếu vai trò chỉ có CanRead ở FeaturePolicy nhưng có ít nhất 1 ComponentPolicy với CanWrite=true, hệ thống tự kích hoạt Partial Edit Mode (Method B) và kiểm tra chặt từng trường trong DynamicMetadataController.'
              : 'Supports X-Preview-Role simulation and X-Feature-Id headers. When a role has CanRead at Feature level but CanWrite on specific ComponentPolicies, Partial Edit Mode (Method B) allows PUT/PATCH while enforcing field-level write restrictions.'}
          </p>

          <Callout type="info" title="Zero-Dependency Services">
            {isVi
              ? 'ExcelExportService (.xlsx), PdfReportService (%PDF-1.4), DocxReplacerService (.docx) và ScheduledMaintenanceService (dọn tệp tạm mỗi 30 phút) được viết hoàn toàn bằng .NET 8 BCL — không cần thư viện trả phí bên ngoài.'
              : 'ExcelExportService (.xlsx), PdfReportService (%PDF-1.4), DocxReplacerService (.docx), and ScheduledMaintenanceService (30-min cleanup) are built natively with .NET 8 BCL with zero paid third-party dependencies.'}
          </Callout>
        </div>
      )

    case 'extending-docs':
      return (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            {isVi
              ? 'UIForge-Docs v2 được thiết kế theo kiến trúc Registry-Driven để khi UIForge Core phát triển thêm component, thuộc tính hoặc engine mới, việc cập nhật tài liệu chỉ mất vài phút:'
              : 'UIForge-Docs v2 uses a Registry-Driven architecture so adding new components, props, or engines takes only minutes as UIForge Core evolves:'}
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? 'Bước 1: Nâng cấp phiên bản @kietvpt/uiforge-core' : 'Step 1: Upgrade @kietvpt/uiforge-core'}
          </h2>
          <CodeBlock language="bash" code={`npm install @kietvpt/uiforge-core@latest`} />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? 'Bước 2: Thêm hoặc chỉnh sửa Component trong src/registry/components/' : 'Step 2: Add or edit a Component in src/registry/components/'}
          </h2>
          <p>
            {isVi
              ? 'Chỉ cần thêm 1 object ComponentDocEntry vào file nhóm tương ứng (formInputs.ts, layout.ts, dataDisplay.ts, navigation.ts, media.ts). Hệ thống sẽ TỰ ĐỘNG cập nhật Sidebar, tìm kiếm Ctrl+K, bảng Props song ngữ VI/EN và Live Interactive Playground!'
              : 'Add a ComponentDocEntry object to the matching category file (formInputs.ts, layout.ts, dataDisplay.ts, navigation.ts, media.ts). Sidebar navigation, Ctrl+K Search, bilingual Props Table, and Live Interactive Playground update automatically!'}
          </p>
          <CodeBlock
            language="ts"
            title="src/registry/components/formInputs.ts"
            code={`{
  id: 'forge-switch',
  slug: 'forge-switch',
  name: 'ForgeSwitch',
  exportName: 'ForgeSwitch',
  componentType: 'Switch',
  rendererSupported: true,
  category: 'form-inputs',
  summary: { vi: 'Nút gạt bật/tắt trạng thái.', en: 'Toggle switch control.' },
  description: { vi: 'Mô tả chi tiết...', en: 'Detailed description...' },
  defaultNode: { /* ComponentNode mẫu */ },
  controls: [{ key: 'label', label: { vi: 'Nhãn', en: 'Label' }, type: 'text' }],
  props: [/* Danh sách PropDoc */],
  reactSnippet: \`...\`,
}`}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isVi ? 'Bước 3: Thêm trang hướng dẫn hoặc MDX mới' : 'Step 3: Add a new Guide or MDX page'}
          </h2>
          <p>
            {isVi
              ? 'Đăng ký slug mới trong src/registry/index.ts (GUIDE_PAGES) và thêm nội dung vào src/content/guidesFrontend.tsx, src/content/guidesBackend.tsx hoặc tạo file .mdx trực tiếp (đã cấu hình sẵn @mdx-js/rollup + remark-gfm trong vite.config.ts).'
              : 'Register the new slug in src/registry/index.ts (GUIDE_PAGES) and add its content in src/content/guidesFrontend.tsx, src/content/guidesBackend.tsx, or author a standalone .mdx file (@mdx-js/rollup + remark-gfm is preconfigured).'}
          </p>
        </div>
      )

    default:
      return null
  }
}
