import type { ComponentDocEntry } from '../types'

export const mediaComponents: ComponentDocEntry[] = [
  {
    id: 'forge-file-upload-grid',
    slug: 'forge-file-upload-grid',
    name: 'ForgeFileUploadGrid',
    exportName: 'ForgeFileUploadGrid',
    componentType: 'FileUploadGrid',
    rendererSupported: true,
    category: 'media-utility',
    summary: {
      vi: 'Vùng kéo thả tải lên nhiều tệp kèm bảng quản lý, xem trước Lightbox (Ảnh & PDF), tải về và xóa.',
      en: 'Drag-and-drop multi-file uploader with management table, Image/PDF Lightbox preview, download, and delete.',
    },
    description: {
      vi: 'ForgeFileUploadGrid hoạt động ngay ở phía client (FileReader) hoặc tích hợp với FilesController (/api/core/files/upload). Hỗ trợ giới hạn dung lượng (maxSizeMB), chế độ chỉ đọc và xem trước tệp trực tiếp.',
      en: 'ForgeFileUploadGrid works immediately client-side via FileReader or connects to Backend FilesController (/api/core/files/upload), complete with maxSizeMB validation, Lightbox preview for images/PDFs, and read-only mode.',
    },
    defaultNode: {
      id: 'demo_fileupload_1',
      type: 'FileUploadGrid',
      parentId: null,
      pageId: 'docs_playground',
      order: 1,
      props: {
        label: 'Chứng Từ & Tệp Đính Kèm (Kéo thả thử ngay)',
        maxSizeMB: 25,
        readOnly: false,
      },
      style: {},
      events: [],
    },
    controls: [
      { key: 'label', label: { vi: 'Tiêu đề (label)', en: 'Title' }, type: 'text' },
      { key: 'maxSizeMB', label: { vi: 'Dung lượng tối đa (MB)', en: 'Max Size (MB)' }, type: 'number', min: 1, max: 100 },
      { key: 'readOnly', label: { vi: 'Chỉ đọc (readOnly)', en: 'Read Only' }, type: 'boolean' },
    ],
    props: [
      { name: 'label', type: 'string', defaultValue: "'Danh Sách Tệp Đính Kèm (FileUploadGrid)'", description: { vi: 'Tiêu đề khu vực tệp đính kèm.', en: 'Uploader section heading.' } },
      { name: 'files', type: 'AttachedFile[]', defaultValue: '2 demo files (uncontrolled)', description: { vi: 'Danh sách tệp đính kèm (controlled).', en: 'Controlled list of attached files.' } },
      { name: 'onFilesChange', type: '(files: AttachedFile[]) => void', description: { vi: 'Callback khi thêm hoặc xóa tệp.', en: 'Callback fired when files are added or removed.' } },
      { name: 'maxSizeMB', type: 'number', defaultValue: '25', description: { vi: 'Dung lượng tối đa mỗi tệp (MB).', en: 'Maximum file size per upload in MB.' } },
      { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: { vi: 'Ẩn nút tải lên và nút xóa, chỉ cho xem/tải về.', en: 'Hides upload zone and delete actions; allows preview/download only.' } },
    ],
    reactSnippet: `const uploadNode: ComponentNode = {
  id: 'doc_attachments',
  type: 'FileUploadGrid',
  parentId: null,
  pageId: 'order_detail',
  order: 1,
  props: {
    label: 'Attachments',
    maxSizeMB: 25,
    readOnly: false,
  },
  style: {},
  events: [],
}`,
  },
]
