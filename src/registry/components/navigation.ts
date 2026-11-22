import type { ComponentDocEntry } from '../types'

export const navigationComponents: ComponentDocEntry[] = [
  {
    id: 'forge-tabs',
    slug: 'forge-tabs',
    name: 'ForgeTabs',
    exportName: 'ForgeTabs',
    rendererSupported: false,
    directMode: 'ForgeTabs',
    category: 'navigation-overlay',
    summary: {
      vi: 'Thanh chuyển đổi nhiều Tab kèm badge số lượng/trạng thái cho màn hình chi tiết.',
      en: 'Multi-tab navigation header with optional count/status badges for complex detail screens.',
    },
    description: {
      vi: 'ForgeTabs tổ chức màn hình nhiều phân khu thành các tab gọn gàng. Import trực tiếp từ @kietvpt/uiforge-core; bỏ trống props.activeTabId để chuyển tab tự động bằng state nội bộ.',
      en: 'ForgeTabs organizes multi-section screens into clean tabbed views. Import directly from @kietvpt/uiforge-core; omit props.activeTabId in standalone mode to let internal state switch tabs.',
    },
    defaultNode: {
      id: 'demo_tabs_1',
      type: 'Tabs',
      parentId: null,
      pageId: 'docs_playground',
      order: 1,
      props: {
        tabs: [
          { id: 'general', label: 'THÔNG TIN CHUNG' },
          { id: 'items', label: 'CHI TIẾT HÀNG HÓA', badge: 12 },
          { id: 'docs', label: 'CHỨNG TỪ ĐÍNH KÈM', badge: 3 },
        ],
      },
      style: {},
      events: [],
    },
    controls: [],
    props: [
      { name: 'node.props.tabs', type: '{ id: string; label: string; badge?: string | number; badgeColor?: string }[]', defaultValue: "[{ id: 'main', label: 'TAB 1' }]", description: { vi: 'Danh sách các tab hiển thị.', en: 'Array of tab definitions.' } },
      { name: 'node.props.activeTabId', type: 'string', description: { vi: 'ID tab đang active (controlled). Bỏ trống để component tự quản lý state.', en: 'Controlled active tab ID. Omit for uncontrolled switching.' } },
    ],
    notes: [
      {
        vi: 'Trong ComponentRenderer, ComponentType="Tabs" được map sang ForgeContainer để phục vụ cơ chế gộp tab động (ForgeTabStack). Để dùng thanh Tab độc lập, import trực tiếp ForgeTabs.',
        en: 'In ComponentRenderer, ComponentType="Tabs" renders ForgeContainer for dynamic tab-stacking (ForgeTabStack). Use direct import of ForgeTabs for standalone tab bars.',
      },
    ],
    reactSnippet: `import { ForgeTabs } from '@kietvpt/uiforge-core'

export function OrderTabs() {
  return (
    <ForgeTabs
      node={{
        id: 'order_tabs',
        type: 'Tabs',
        parentId: null,
        pageId: 'order_detail',
        order: 1,
        props: {
          tabs: [
            { id: 'general', label: 'GENERAL' },
            { id: 'items', label: 'LINE ITEMS', badge: 12 },
          ],
        },
        style: {},
        events: [],
      }}
    >
      <div className="p-4 text-sm">Tab content area</div>
    </ForgeTabs>
  )
}`,
  },
  {
    id: 'forge-tab-stack',
    slug: 'forge-tab-stack',
    name: 'ForgeTabStack',
    exportName: 'ForgeTabStack',
    rendererSupported: false,
    directMode: 'ForgeTabStack',
    category: 'navigation-overlay',
    summary: {
      vi: 'Cơ chế gộp tự động nhiều Container có cùng thứ tự (order) thành bộ Tab động.',
      en: 'Dynamic container stacker that groups sibling tab-flagged Container nodes sharing the same order into a tabbed view.',
    },
    description: {
      vi: 'ForgeTabStack tự động gom các Container có props.isTab=true (hoặc type="Tabs") cùng order thành một khung Tab hoàn chỉnh. Luôn truyền renderChild để hiển thị nội dung bên trong từng tab.',
      en: 'ForgeTabStack groups sibling containers marked with isTab=true and matching order into a unified tab stack. Always pass renderChild when rendering standalone.',
    },
    defaultNode: {
      id: 'demo_tabstack_root',
      type: 'Container',
      parentId: null,
      pageId: 'docs_playground',
      order: 2,
      props: {},
      style: {},
      events: [],
    },
    controls: [],
    props: [
      { name: 'tabNodes', type: 'ComponentNode[]', required: true, description: { vi: 'Danh sách các Container node đóng vai trò từng tab.', en: 'Array of Container nodes representing individual tabs.' } },
      { name: 'order', type: 'number', required: true, description: { vi: 'Thứ tự nhóm tab.', en: 'Shared tab group order.' } },
      { name: 'parentId', type: 'string | null', required: true, description: { vi: 'ID của node cha.', en: 'Parent node ID.' } },
      { name: 'renderChild', type: '(child: ComponentNode, flexConfig?) => React.ReactNode', required: true, description: { vi: 'Hàm render nội dung tab đang chọn (bắt buộc khi dùng độc lập).', en: 'Renderer callback for the active tab node (required in standalone usage).' } },
    ],
    reactSnippet: `import { ForgeTabStack, ComponentRenderer } from '@kietvpt/uiforge-core'

<ForgeTabStack
  parentId="root"
  order={1}
  tabNodes={[tab1Node, tab2Node]}
  renderChild={(child) => <ComponentRenderer node={child} />}
/>`,
  },
  {
    id: 'forge-modal',
    slug: 'forge-modal',
    name: 'ForgeModal',
    exportName: 'ForgeModal',
    componentType: 'Modal',
    rendererSupported: true,
    category: 'navigation-overlay',
    summary: {
      vi: 'Khung hộp thoại (Modal Dialog) dạng thẻ chứa các component con bên trong.',
      en: 'Structured Modal Dialog container card for grouping dialog content.',
    },
    description: {
      vi: 'ForgeModal hiển thị khung hộp thoại chuẩn để đặt nội dung form hoặc cảnh báo. Để mở popup động toàn màn hình theo FeaturePage, kết hợp với navigationEngine.openPopup().',
      en: 'ForgeModal renders a structured dialog container card for nested components. For fullscreen dynamic feature popups, combine with navigationEngine.openPopup().',
    },
    defaultNode: {
      id: 'demo_modal_1',
      type: 'Modal',
      parentId: null,
      pageId: 'docs_playground',
      order: 3,
      props: {
        label: 'Xác Nhận Phê Duyệt Chứng Từ',
      },
      style: {},
      events: [],
      children: [
        {
          id: 'demo_modal_lbl',
          type: 'Label',
          parentId: 'demo_modal_1',
          pageId: 'docs_playground',
          order: 1,
          props: { label: 'Bạn có chắc chắn muốn phê duyệt đơn hàng #ORD-2026-01?' },
          style: {},
          events: [],
        },
      ],
    },
    controls: [{ key: 'label', label: { vi: 'Tiêu đề Modal', en: 'Modal Title' }, type: 'text' }],
    props: [
      { name: 'label / title', type: 'string', defaultValue: "'Hộp Thoại (Modal Dialog)'", description: { vi: 'Tiêu đề hộp thoại.', en: 'Dialog title.' } },
    ],
    reactSnippet: `const modalNode: ComponentNode = {
  id: 'modal_confirm',
  type: 'Modal',
  parentId: null,
  pageId: 'order_detail',
  order: 3,
  props: { label: 'Confirm Approval' },
  style: {},
  events: [],
  children: [/* inner fields & action buttons */],
}`,
  },
  {
    id: 'forge-search-modal',
    slug: 'forge-search-modal',
    name: 'ForgeSearchModal',
    exportName: 'ForgeSearchModal',
    rendererSupported: false,
    directMode: 'ForgeSearchModal',
    category: 'navigation-overlay',
    summary: {
      vi: 'Cửa sổ tra cứu dữ liệu toàn màn hình hỗ trợ tìm kiếm đa cột và điều hướng phím ↑/↓/Enter/Esc.',
      en: 'Fullscreen entity lookup modal with instant multi-column filtering and ↑/↓/Enter/Esc keyboard navigation.',
    },
    description: {
      vi: 'ForgeSearchModal tự động suy luận tới 6 cột từ dataset của entityName trong useDataEngine nếu không truyền columns. Cho phép double-click hoặc bấm Enter để trả bản ghi đã chọn.',
      en: 'ForgeSearchModal auto-infers up to 6 columns from the entity dataset in useDataEngine if columns are omitted. Supports double-click or Enter to pick a record.',
    },
    defaultNode: {
      id: 'demo_search_modal_1',
      type: 'Modal',
      parentId: null,
      pageId: 'docs_playground',
      order: 4,
      props: {
        title: 'Tra Cứu Nhà Cung Cấp (Vendor)',
        entityName: 'Vendor',
      },
      style: {},
      events: [],
    },
    controls: [
      { key: 'title', label: { vi: 'Tiêu đề Modal', en: 'Modal Title' }, type: 'text' },
      {
        key: 'entityName',
        label: { vi: 'Thực thể (entityName)', en: 'Entity Name' },
        type: 'select',
        options: [
          { value: 'Vendor', label: 'Vendor' },
          { value: 'Product', label: 'Product' },
          { value: 'Customer', label: 'Customer' },
        ],
      },
    ],
    props: [
      { name: 'isOpen', type: 'boolean', required: true, description: { vi: 'Bật/tắt hiển thị modal.', en: 'Controls modal visibility.' } },
      { name: 'entityName', type: 'string', required: true, description: { vi: 'Tên thực thể nguồn trong useDataEngine.', en: 'Entity name in useDataEngine.' } },
      { name: 'title', type: 'string', description: { vi: 'Tiêu đề cửa sổ tra cứu.', en: 'Modal title.' } },
      { name: 'columns', type: 'TableColumn[]', description: { vi: 'Cấu hình cột hiển thị (tự động suy luận nếu bỏ trống).', en: 'Optional column definitions (auto-inferred if omitted).' } },
      { name: 'onSelect', type: '(item: any) => void', required: true, description: { vi: 'Callback nhận bản ghi được chọn.', en: 'Callback with selected record.' } },
      { name: 'onClose', type: '() => void', required: true, description: { vi: 'Callback đóng modal.', en: 'Callback when closed.' } },
    ],
    reactSnippet: `import { useState } from 'react'
import { ForgeSearchModal } from '@kietvpt/uiforge-core'

export function VendorLookupDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Lookup Vendor</button>
      <ForgeSearchModal
        isOpen={open}
        entityName="Vendor"
        title="Select Vendor"
        onSelect={(v) => { console.log(v); setOpen(false) }}
        onClose={() => setOpen(false)}
      />
    </>
  )
}`,
  },
  {
    id: 'forge-record-selector',
    slug: 'forge-record-selector',
    name: 'ForgeRecordSelector',
    exportName: 'ForgeRecordSelector',
    componentType: 'RecordSelector',
    rendererSupported: true,
    category: 'navigation-overlay',
    summary: {
      vi: 'Thanh chuyển đổi nhanh giữa các bản ghi (Master-Detail Pill Switcher) kèm nút Tạo mới.',
      en: 'Master-Detail record pill switcher with built-in Add New action and automatic dataEngine sync.',
    },
    description: {
      vi: 'ForgeRecordSelector giúp người dùng chuyển qua lại giữa nhiều bản ghi ngay trên cùng một màn hình chi tiết và tự động nạp dữ liệu bản ghi đang chọn vào useDataEngine.',
      en: 'ForgeRecordSelector lets users switch between multiple records directly inside a detail screen and automatically syncs the active record into useDataEngine.',
    },
    defaultNode: {
      id: 'demo_record_selector_1',
      type: 'RecordSelector',
      parentId: null,
      pageId: 'docs_playground',
      order: 5,
      props: {
        label: 'Hồ sơ:',
        reference: 'Order',
        displayField: 'code',
        canAdd: true,
      },
      style: {},
      events: [],
    },
    controls: [
      { key: 'label', label: { vi: 'Nhãn (label)', en: 'Label' }, type: 'text' },
      { key: 'canAdd', label: { vi: 'Nút Tạo mới (canAdd)', en: 'Allow Add New' }, type: 'boolean' },
    ],
    props: [
      { name: 'label', type: 'string', defaultValue: "'Bản ghi:'", description: { vi: 'Nhãn đứng trước danh sách bản ghi.', en: 'Prefix label.' } },
      { name: 'reference', type: 'string', defaultValue: "'Records'", description: { vi: 'Tên thực thể liên kết.', en: 'Linked entity name.' } },
      { name: 'displayField', type: 'string', defaultValue: "'code'", description: { vi: 'Trường hiển thị trên mỗi nút bản ghi.', en: 'Field rendered on each pill.' } },
      { name: 'records', type: 'RecordItem[]', defaultValue: '3 sample records', description: { vi: 'Danh sách bản ghi hiển thị.', en: 'Array of selectable records.' } },
      { name: 'canAdd', type: 'boolean', defaultValue: 'true', description: { vi: 'Hiển thị nút + Tạo mới.', en: 'Shows the + Add New button.' } },
      { name: 'onSelectRecord', type: '(record: RecordItem) => void', description: { vi: 'Callback khi chuyển bản ghi.', en: 'Callback on record switch.' } },
    ],
    reactSnippet: `const selectorNode: ComponentNode = {
  id: 'rec_selector',
  type: 'RecordSelector',
  parentId: null,
  pageId: 'order_detail',
  order: 5,
  props: { label: 'Orders:', reference: 'Order', displayField: 'code', canAdd: true },
  style: {},
  events: [],
}`,
  },
]
