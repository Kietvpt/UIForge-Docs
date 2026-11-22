# UIForge Docs

Cổng tài liệu chính thức và **Live Component Playground** cho **UIForge** — nền tảng **Enterprise Low-Code UI & Rapid Application Development Framework** trung lập nghiệp vụ (100% Domain-Agnostic).

## UIForge là gì?

**UIForge** được thiết kế để giúp các đội ngũ kỹ sư xây dựng ứng dụng doanh nghiệp (ERP, Logistics, Bán lẻ, Tài chính, Kho bãi, Y tế...) với tốc độ vượt bậc mà vẫn giữ được kiến trúc sạch, linh hoạt và dễ mở rộng.

- **Frontend Core (`@kietvpt/uiforge-core`)**: Bộ 26+ UI Components chuẩn doanh nghiệp (DataGrid `ForgeTable`, Multi-Column Select, DatePicker, TreeView, Pure SVG Chart, FileUploadGrid...), Dynamic `ComponentRenderer`, Visual Studio Designer và 14 Core Engines (Two-Way Data Binding, OData Query, Multi-tier RBAC, Validation, Cascading, Event Runner, SignalR Realtime, Export/Print, Offline Resilience Queue).
- **Backend Core (`UIForge.Core` — .NET 8)**: Động cơ Metadata & OData CRUD tổng quát, hỗ trợ Multi-DB (PostgreSQL, SQL Server, SQLite), Multi-Branch, SignalR Record Locking, phân quyền RBAC/ABAC đến từng trường dữ liệu và bộ xuất Excel / PDF / DOCX hoàn toàn Zero-Dependency.
- **Tách biệt tuyệt đối Core & Nghiệp vụ**: Lõi Framework không chứa bất kỳ logic đặc thù ngành nghề nào — mọi quy tắc nghiệp vụ vận hành độc lập qua các module `*.bl.ts` (`BaseBL`) và Metadata JSON động.

## Điểm nổi bật của UIForge Docs

- **Live Interactive Playground**: Trải nghiệm và tùy chỉnh trực tiếp thuộc tính (Props) & JSON Schema của từng component thật từ `@kietvpt/uiforge-core` ngay trên trình duyệt.
- **Tài liệu toàn diện**: Bao phủ đầy đủ 26 UI Components, 14 Frontend Core Engines, 10 Backend .NET 8 REST Controllers, 12 Core Entities và SignalR Hub.
- **Song ngữ Việt – Anh (`VI / EN`)** kèm giao diện **Light / Dark Mode** hiện đại và tìm kiếm tức thì (`Ctrl+K`).
- **Sẵn sàng mở rộng**: Kiến trúc Registry-Driven giúp cập nhật tài liệu đồng bộ mỗi khi UIForge Core phát triển thêm tính năng và component mới.
