import type { ComponentDocEntry } from '../types'

export const layoutComponents: ComponentDocEntry[] = [
  {
    id: 'forge-section',
    slug: 'forge-section',
    name: 'ForgeSection',
    exportName: 'ForgeSection',
    componentType: 'Section',
    rendererSupported: true,
    category: 'layout',
    summary: {
      vi: 'Khối bố cục có tiêu đề, hỗ trợ thu gọn (collapsible) và lưới 12 cột chuẩn ERP.',
      en: 'Titled collapsible layout block with built-in 12-column ERP grid or flexbox layout.',
    },
    description: {
      vi: 'ForgeSection là container tiêu chuẩn để nhóm các trường dữ liệu liên quan thành từng phần rõ ràng (Thông tin chung, Chi tiết thanh toán...). Mặc định dùng layoutMode="grid" với 12 cột.',
      en: 'ForgeSection groups related form fields into clean, collapsible sections (General Info, Billing Details...). Defaults to a 12-column CSS grid.',
    },
    defaultNode: {
      id: 'demo_section_1',
      type: 'Section',
      parentId: null,
      pageId: 'docs_playground',
      order: 1,
      props: {
        label: 'Thông Tin Chung Đơn Hàng',
        collapsible: true,
        layoutMode: 'grid',
        gridConfig: { columns: 12, gap: '12px' },
      },
      style: {},
      events: [],
      children: [
        {
          id: 'demo_sec_child_1',
          type: 'TextBox',
          parentId: 'demo_section_1',
          pageId: 'docs_playground',
          order: 1,
          props: { label: 'Số Chứng Từ', value: 'ORD-2026-001', colSpan: 6, labelPosition: 'top' },
          style: {},
          events: [],
        },
        {
          id: 'demo_sec_child_2',
          type: 'DatePicker',
          parentId: 'demo_section_1',
          pageId: 'docs_playground',
          order: 2,
          props: { label: 'Ngày Lập', value: '22/11/2026', colSpan: 6, labelPosition: 'top' },
          style: {},
          events: [],
        },
      ],
    },
    controls: [
      { key: 'label', label: { vi: 'Tiêu đề (label)', en: 'Section Title' }, type: 'text' },
      { key: 'collapsible', label: { vi: 'Cho phép thu gọn', en: 'Collapsible' }, type: 'boolean' },
      {
        key: 'layoutMode',
        label: { vi: 'Chế độ bố cục', en: 'Layout Mode' },
        type: 'select',
        options: [
          { value: 'grid', label: 'grid (12 cols)' },
          { value: 'flex', label: 'flex' },
        ],
      },
    ],
    props: [
      { name: 'label / title', type: 'string', defaultValue: "'Khối Bố Cục (Section)'", description: { vi: 'Tiêu đề thanh header của section.', en: 'Header title text.' } },
      { name: 'collapsible', type: 'boolean', defaultValue: 'true', description: { vi: 'Cho phép bấm để đóng/mở nội dung.', en: 'Enables collapse/expand toggle.' } },
      { name: 'layoutMode', type: "'grid' | 'flex'", defaultValue: "'grid'", description: { vi: 'Bố cục phần tử con theo Grid hay Flexbox.', en: 'Child layout engine: grid or flex.' } },
      { name: 'gridConfig', type: '{ columns: number; gap: string }', defaultValue: "{ columns: 12, gap: '12px' }", description: { vi: 'Cấu hình số cột và khoảng cách khi dùng grid.', en: 'Grid column count and gap.' } },
      { name: 'flexConfig', type: 'FlexConfig', description: { vi: 'Cấu hình direction, wrap, justify, align, gap khi dùng flex.', en: 'Flexbox configuration when layoutMode="flex".' } },
    ],
    reactSnippet: `const sectionNode: ComponentNode = {
  id: 'sec_general',
  type: 'Section',
  parentId: null,
  pageId: 'order_form',
  order: 1,
  props: { label: 'General Info', collapsible: true, layoutMode: 'grid', gridConfig: { columns: 12, gap: '12px' } },
  style: {},
  events: [],
  children: [/* child ComponentNodes with colSpan: 4 | 6 | 12 */],
}`,
  },
  {
    id: 'forge-container',
    slug: 'forge-container',
    name: 'ForgeContainer',
    exportName: 'ForgeContainer',
    componentType: 'Container',
    rendererSupported: true,
    category: 'layout',
    summary: {
      vi: 'Vùng chứa đa năng hỗ trợ Flexbox và CSS Grid để xếp hàng ngang/dọc hoặc tạo thẻ Tab.',
      en: 'Flexible layout container supporting Flexbox and CSS Grid, plus Tab panel mode.',
    },
    description: {
      vi: 'ForgeContainer là khối chứa nền tảng cho phép lồng nhau không giới hạn, hỗ trợ cả Flex (direction, wrap, justify, align, columnsPerRow) lẫn Grid 12 cột.',
      en: 'ForgeContainer is the fundamental nestable layout wrapper supporting Flexbox (direction, wrap, justify, align, columnsPerRow) and CSS Grid.',
    },
    defaultNode: {
      id: 'demo_container_1',
      type: 'Container',
      parentId: null,
      pageId: 'docs_playground',
      order: 2,
      props: {
        label: 'Action Toolbar',
        layoutMode: 'flex',
        flexConfig: { direction: 'row', wrap: 'wrap', gap: '10px', align: 'center' },
      },
      style: { padding: '14px', borderRadius: '10px' },
      events: [],
      children: [
        {
          id: 'demo_cnt_btn1',
          type: 'Button',
          parentId: 'demo_container_1',
          pageId: 'docs_playground',
          order: 1,
          props: { label: 'Thêm mới', variant: 'primary', size: 'sm' },
          style: {},
          events: [],
        },
        {
          id: 'demo_cnt_btn2',
          type: 'Button',
          parentId: 'demo_container_1',
          pageId: 'docs_playground',
          order: 2,
          props: { label: 'Xuất Excel', variant: 'secondary', size: 'sm' },
          style: {},
          events: [],
        },
        {
          id: 'demo_cnt_btn3',
          type: 'Button',
          parentId: 'demo_container_1',
          pageId: 'docs_playground',
          order: 3,
          props: { label: 'Xóa', variant: 'danger', size: 'sm' },
          style: {},
          events: [],
        },
      ],
    },
    controls: [
      {
        key: 'layoutMode',
        label: { vi: 'Chế độ bố cục', en: 'Layout Mode' },
        type: 'select',
        options: [
          { value: 'flex', label: 'flex' },
          { value: 'grid', label: 'grid' },
        ],
      },
      { key: 'isTab', label: { vi: 'Chế độ Tab (ẩn viền)', en: 'Tab Mode (borderless)' }, type: 'boolean' },
    ],
    props: [
      { name: 'layoutMode', type: "'flex' | 'grid'", defaultValue: "'flex'", description: { vi: 'Chế độ bố cục Flexbox hoặc Grid.', en: 'Flexbox or CSS Grid layout.' } },
      { name: 'flexConfig', type: 'FlexConfig', defaultValue: "{ direction: 'row', wrap: 'wrap', gap: '12px' }", description: { vi: 'Cấu hình hướng, khoảng cách, căn lề Flexbox.', en: 'Flexbox direction, wrap, justify, align, gap.' } },
      { name: 'gridConfig', type: 'GridConfig', defaultValue: "{ columns: 12, gap: '16px' }", description: { vi: 'Cấu hình cột và gap cho Grid.', en: 'Grid columns and gap.' } },
      { name: 'isTab / tab / isTabGroup', type: 'boolean', defaultValue: 'false', description: { vi: 'Bỏ viền & padding khi container đóng vai trò là 1 tab trong ForgeTabStack.', en: 'Strips border/padding when used as a tab inside ForgeTabStack.' } },
    ],
    reactSnippet: `const toolbar: ComponentNode = {
  id: 'cnt_toolbar',
  type: 'Container',
  parentId: null,
  pageId: 'order_list',
  order: 1,
  props: {
    layoutMode: 'flex',
    flexConfig: { direction: 'row', gap: '10px', align: 'center' },
  },
  style: { padding: '12px' },
  events: [],
  children: [/* Button nodes */],
}`,
  },
  {
    id: 'forge-form-container',
    slug: 'forge-form-container',
    name: 'ForgeFormContainer',
    exportName: 'ForgeFormContainer',
    rendererSupported: false,
    directMode: 'ForgeFormContainer',
    category: 'layout',
    summary: {
      vi: 'Khung biểu mẫu doanh nghiệp có thanh tiêu đề, mô tả và nhóm nút thao tác chuẩn.',
      en: 'Enterprise form shell with title header, subtitle, and standard action bar.',
    },
    description: {
      vi: 'ForgeFormContainer cung cấp khung vỏ thống nhất cho các màn hình chi tiết (Detail Forms). Component này được import trực tiếp từ @kietvpt/uiforge-core.',
      en: 'ForgeFormContainer provides a consistent enterprise header and content frame for detail screens via direct React import.',
    },
    defaultNode: {
      id: 'demo_form_container_1',
      type: 'Container',
      parentId: null,
      pageId: 'docs_playground',
      order: 3,
      props: {
        label: 'Phiếu Nhập Kho #NK-2026-089',
        placeholder: 'Quản lý thông tin nhập kho và kiểm định chất lượng',
      },
      style: {},
      events: [],
    },
    controls: [
      { key: 'label', label: { vi: 'Tiêu đề biểu mẫu', en: 'Form Title' }, type: 'text' },
      { key: 'placeholder', label: { vi: 'Phụ đề (placeholder)', en: 'Subtitle' }, type: 'text' },
    ],
    props: [
      { name: 'node.props.label / title', type: 'string', defaultValue: "'Biểu Mẫu Doanh Nghiệp'", description: { vi: 'Tiêu đề chính của form.', en: 'Main form header title.' } },
      { name: 'node.props.placeholder', type: 'string', defaultValue: "'Biểu mẫu nhập liệu & quản lý giao dịch'", description: { vi: 'Dòng mô tả ngắn bên dưới tiêu đề.', en: 'Subtitle description below header.' } },
      { name: 'children', type: 'React.ReactNode', description: { vi: 'Nội dung các Section / trường nhập bên trong.', en: 'Inner sections and fields.' } },
    ],
    reactSnippet: `import { ForgeFormContainer } from '@kietvpt/uiforge-core'

export function OrderFormShell({ children }: { children: React.ReactNode }) {
  return (
    <ForgeFormContainer
      node={{
        id: 'form_order',
        type: 'Container',
        parentId: null,
        pageId: 'order_detail',
        order: 1,
        props: { label: 'Purchase Order #PO-01', placeholder: 'Vendor & items' },
        style: {},
        events: [],
      }}
    >
      {children}
    </ForgeFormContainer>
  )
}`,
  },
  {
    id: 'forge-divider',
    slug: 'forge-divider',
    name: 'ForgeDivider',
    exportName: 'ForgeDivider',
    componentType: 'Divider',
    rendererSupported: true,
    category: 'layout',
    summary: {
      vi: 'Đường phân cách ngang có thể gắn nhãn in hoa căn giữa.',
      en: 'Horizontal section separator with optional centered uppercase label.',
    },
    description: {
      vi: 'ForgeDivider giúp tách rõ các cụm nội dung hoặc nhóm thông tin trong form dài.',
      en: 'ForgeDivider visually separates logical groups of fields inside long enterprise forms.',
    },
    defaultNode: {
      id: 'demo_divider_1',
      type: 'Divider',
      parentId: null,
      pageId: 'docs_playground',
      order: 4,
      props: {
        label: 'Thông Tin Thanh Toán',
      },
      style: {},
      events: [],
    },
    controls: [{ key: 'label', label: { vi: 'Nhãn giữa (label)', en: 'Center Label' }, type: 'text' }],
    props: [
      { name: 'label', type: 'string', defaultValue: 'undefined', description: { vi: 'Chữ in hoa hiển thị giữa đường kẻ (để trống sẽ chỉ vẽ đường thẳng).', en: 'Optional uppercase label centered on the divider line.' } },
    ],
    reactSnippet: `const divider: ComponentNode = {
  id: 'div_payment',
  type: 'Divider',
  parentId: null,
  pageId: 'invoice_form',
  order: 4,
  props: { label: 'Payment Details' },
  style: {},
  events: [],
}`,
  },
]
