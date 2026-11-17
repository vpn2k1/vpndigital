# Nhập thiết kế vào Figma

Đây là bộ SVG + tokens + spec, KHÔNG phải file .fig gốc hay liên kết Figma. Không có thao tác tạo file Figma native trong phiên này.

1. Cài Be Vietnam Pro (OFL; bản WOFF2 và giấy phép nằm trong package Fontsource; có thể tải bản desktop từ nguồn chính thức của font).
2. Import frames/desktop.svg và frames/mobile.svg vào Figma.
3. Tạo variables theo tokens.json; dựng auto layout theo DESIGN_SYSTEM.md.
4. Tạo components theo COMPONENTS.md, thêm variants hover/focus/menu open.
5. SVG là frame tham khảo với text/vector chỉnh sửa được, không tự tạo auto layout, variables hoặc component variants. Bản web là nguồn chính xác về responsive và interaction.

## Ghi chú V2
Các frame SVG ban đầu là mốc thiết kế V1 tối giản. V2 giữ token này và bổ sung artwork/catalog theo SPEC.md, docs/sections/07–09 và COMPONENTS.md; mã Next.js là nguồn chính xác cho các trang mới. Ảnh WebP để dựng frame nằm trong public/images/. Chưa tạo frame Figma native hoặc SVG riêng cho mọi trang V2.
