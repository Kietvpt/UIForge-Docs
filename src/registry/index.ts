import { formInputComponents } from './components/formInputs'
import { layoutComponents } from './components/layout'
import { dataDisplayComponents } from './components/dataDisplay'
import { navigationComponents } from './components/navigation'
import { mediaComponents } from './components/media'
import type { ComponentCategory, ComponentDocEntry, GuideDocEntry } from './types'

export * from './types'

export const ALL_COMPONENTS: ComponentDocEntry[] = [
  ...formInputComponents,
  ...layoutComponents,
  ...dataDisplayComponents,
  ...navigationComponents,
  ...mediaComponents,
]

export const COMPONENTS_BY_CATEGORY: Record<ComponentCategory, ComponentDocEntry[]> = {
  'form-inputs': formInputComponents,
  layout: layoutComponents,
  'data-display': dataDisplayComponents,
  'navigation-overlay': navigationComponents,
  'media-utility': mediaComponents,
}

export function getComponentBySlug(slug: string): ComponentDocEntry | undefined {
  return ALL_COMPONENTS.find((c) => c.slug === slug)
}

export const GUIDE_PAGES: GuideDocEntry[] = [
  // Getting Started
  {
    slug: 'introduction',
    section: 'getting-started',
    title: { vi: 'Giới thiệu UIForge', en: 'Introduction to UIForge' },
    summary: { vi: 'Tổng quan kiến trúc Domain-Agnostic Low-Code Framework cho doanh nghiệp.', en: 'Overview of UIForge Domain-Agnostic Enterprise Low-Code Framework.' },
    keywords: ['overview', 'manifesto', 'architecture', 'low-code'],
  },
  {
    slug: 'installation',
    section: 'getting-started',
    title: { vi: 'Cài đặt & Quick Start', en: 'Installation & Quick Start' },
    summary: { vi: 'Cài đặt @kietvpt/uiforge-core (GitHub Packages), UIForge.Core (.NET 8 NuGet) và Docker.', en: 'Install @kietvpt/uiforge-core (GitHub Packages), UIForge.Core (.NET 8 NuGet), and Docker.' },
    badge: 'v1.0.1',
    keywords: ['install', 'npmrc', 'nuget', 'docker', 'github packages'],
  },
  {
    slug: 'architecture',
    section: 'getting-started',
    title: { vi: 'Kiến trúc & ComponentNode Schema', en: 'Architecture & ComponentNode Schema' },
    summary: { vi: 'Cấu trúc cây JSON ComponentNode, ComponentRenderer, PermissionGuard và phân tách Core/BL.', en: 'ComponentNode JSON tree, ComponentRenderer, PermissionGuard, and Core/BL separation.' },
    keywords: ['schema', 'ComponentNode', 'ComponentRenderer', 'PermissionGuard', 'BaseBL'],
  },
  // Core Engines
  {
    slug: 'data-engine',
    section: 'engines',
    title: { vi: 'Data Engine & OData Binding', en: 'Data Engine & OData Binding' },
    summary: { vi: 'Two-Way Binding, OData query, Auto-Populate và Dirty Tracking với useDataEngine.', en: 'Two-Way Binding, OData queries, Auto-Populate, and Dirty Tracking via useDataEngine.' },
    keywords: ['useDataEngine', 'odata', 'populate', 'dirty', 'saveRecord'],
  },
  {
    slug: 'event-runner-bl',
    section: 'engines',
    title: { vi: 'Event Runner, BL Registry & BaseBL', en: 'Event Runner, BL Registry & BaseBL' },
    summary: { vi: 'Tách biệt logic nghiệp vụ vào *.bl.ts, vòng đời onInit/beforeSave/onSave và Event Dispatcher.', en: 'Decouple business logic in *.bl.ts with BaseBL lifecycle hooks and dynamic event dispatching.' },
    keywords: ['registerBL', 'BaseBL', 'defineBL', 'triggerComponentEvent', 'blRegistry'],
  },
  {
    slug: 'validation-cascading',
    section: 'engines',
    title: { vi: 'Validation & Cascading Engine', en: 'Validation & Cascading Engine' },
    summary: { vi: 'Kiểm tra toàn vẹn form (ISO 6346, DateSequence, Pattern) và Dropdown phụ thuộc (Cascading).', en: 'Form validation (ISO 6346, DateSequence, Pattern) and dependent Cascading Dropdowns.' },
    keywords: ['validateForm', 'ISO6346', 'cascadingRegistry', 'dateSequence'],
  },
  {
    slug: 'permission-rbac',
    section: 'engines',
    title: { vi: 'Permission Engine (Multi-tier RBAC)', en: 'Permission Engine (Multi-tier RBAC)' },
    summary: { vi: 'Phân quyền 3 tầng (Feature → Component → Column), Role Simulation và Partial Edit Mode.', en: '3-tier RBAC (Feature → Component → Column), Role Simulation, and Partial Edit Mode.' },
    keywords: ['usePermissionEngine', 'PermissionGuard', 'RBAC', 'Partial Edit'],
  },
  {
    slug: 'navigation-realtime-resilience',
    section: 'engines',
    title: { vi: 'Navigation, Realtime, Export & Resilience', en: 'Navigation, Realtime, Export & Resilience' },
    summary: { vi: 'Multi-Tab/Popup, SignalR Record Locking, xuất Excel/PDF/DOCX, Offline 502 Queue và Hotkeys.', en: 'Multi-Tab/Popup navigation, SignalR locking, Excel/PDF/DOCX export, Offline 502 Queue, and Hotkeys.' },
    keywords: ['useNavigationEngine', 'useRealtimeEngine', 'exportGridToExcel', 'printGridReport', 'resilienceClient', 'useGlobalHotkeys'],
  },
  // Backend Core
  {
    slug: 'backend-setup',
    section: 'backend',
    title: { vi: 'Backend UIForge.Core (.NET 8) Setup', en: 'Backend UIForge.Core (.NET 8) Setup' },
    summary: { vi: 'Cấu hình Program.cs, Multi-DB (PostgreSQL/SQL Server/SQLite), Multi-Branch và JWT.', en: 'Program.cs wiring, Multi-DB (PostgreSQL/SQL Server/SQLite), Multi-Branch, and JWT.' },
    badge: '.NET 8',
    keywords: ['AddUIForgeCore', 'UseUIForgeDatabase', 'UIForgeDbContext', 'Multi-Branch'],
  },
  {
    slug: 'backend-entities',
    section: 'backend',
    title: { vi: 'BaseEntity & 12 Core Entities', en: 'BaseEntity & 12 Core Entities' },
    summary: { vi: 'Quy chuẩn BaseEntity (Soft Delete, Audit Trail) và sơ đồ 12 bảng lõi trong UIForgeDbContext.', en: 'BaseEntity conventions (Soft Delete, Audit Trail) and the 12 core DbSet tables.' },
    keywords: ['BaseEntity', 'UIForgeDbContext', 'AuditLog', 'FeaturePolicy', 'ComponentPolicy'],
  },
  {
    slug: 'backend-api',
    section: 'backend',
    title: { vi: 'REST API Reference (10 Controllers)', en: 'REST API Reference (10 Controllers)' },
    summary: { vi: 'Toàn bộ endpoint OData Dynamic CRUD, Field Masking, Optimistic Concurrency, Policies, Files & Reports.', en: 'Complete endpoint reference for OData Dynamic CRUD, Field Masking, Concurrency, Policies, Files & Reports.' },
    keywords: ['DynamicMetadataController', 'PagesController', 'FilesController', 'ExcelExportController', 'ReportsController'],
  },
  {
    slug: 'backend-realtime-security',
    section: 'backend',
    title: { vi: 'SignalR Hub, Services & RBAC Filter', en: 'SignalR Hub, Services & RBAC Filter' },
    summary: { vi: 'UIForgeHub (/hubs/uiforge), [RequireEntityPermission] và 10 dịch vụ Zero-Dependency.', en: 'UIForgeHub (/hubs/uiforge), [RequireEntityPermission] filter, and 10 Zero-Dependency services.' },
    keywords: ['UIForgeHub', 'SignalR', 'RequireEntityPermission', 'ExcelExportService', 'PdfReportService', 'DocxReplacerService'],
  },
  // Maintaining
  {
    slug: 'extending-docs',
    section: 'maintaining',
    title: { vi: 'Hướng dẫn Bổ sung & Cập nhật Docs', en: 'Extending & Updating Docs' },
    summary: { vi: 'Quy trình 2 bước thêm Component mới, cập nhật Props hoặc nâng cấp phiên bản @kietvpt/uiforge-core.', en: '2-step workflow for adding new components, updating props, or upgrading @kietvpt/uiforge-core.' },
    keywords: ['contributing', 'registry', 'mdx', 'upgrade'],
  },
]

export function getGuideBySlug(slug: string): GuideDocEntry | undefined {
  return GUIDE_PAGES.find((g) => g.slug === slug)
}
