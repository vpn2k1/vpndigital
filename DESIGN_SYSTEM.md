# Hệ thống thiết kế

## Màu
|Token|HEX|Vai trò|
|---|---|---|
|background|#FCF8EF|Nền trắng ngà|
|surface|#FFFDF8|Nền phụ|
|primary|#B51F24|Nút, biểu tượng, điểm nhấn|
|primary-hover|#95191E|Hover nút|
|heading|#771B20|Tiêu đề|
|ink|#302824|Nội dung|
|muted|#70645B|Chú thích|
|gold|#B58B45|Trang trí, không dùng cho chữ nhỏ|
|line|#DFD2BA|Viền|

## Typography
Be Vietnam Pro, self-hosted từ @fontsource/be-vietnam-pro (OFL). Dùng 400, 500, 600, 700; subset latin và vietnamese. Fallback Arial, sans-serif. Heading 700, tracking -0.045em, line-height 1.13; body 400 line-height 1.75. H1 desktop 76px, mobile 42px; H2 40/30px; body 16px; nhãn 11px chữ hoa tracking 0.14em; footer tối thiểu 12px. Cỡ linh hoạt dùng clamp.

## Layout
Container 1184px, gutter 48px desktop / 24px mobile. Hero grid 1.25fr 1fr, biểu tượng sen vector vẽ riêng. Section padding 80px desktop / 56px mobile. Spacing 4, 8, 12, 16, 24, 32, 48, 64, 80. Border radius 4px cho nút, 0 cho layout; không shadow, không gradient. Divider 1px.

## Breakpoints và tương tác
<=760px: menu thu gọn; hero một cột, sen nhỏ ở dưới; lĩnh vực thành ba hàng; thông tin doanh nghiệp xếp dọc. 761–1023: giảm cỡ hero và khoảng trống. >=1024: desktop đầy đủ. Focus 3px đỏ + offset. Nút min-height 48px. Menu Escape đóng, chọn anchor đóng. prefers-reduced-motion tắt smooth-scroll. Không animation trang trí.

## Mapping
Header → components/Header.tsx; Lotus → components/Lotus.tsx; Icons → components/Icon.tsx; nội dung → content/company.ts; sections → app/page.tsx; token/style → app/globals.css; metadata → app/layout.tsx và app/robots.ts, app/sitemap.ts. design/tokens.json dùng cùng token; SVG desktop/mobile là hướng dẫn nhập Figma, không phải .fig gốc.

## Chi tiết font trước tích hợp
Nạp CSS Fontsource từng weight với unicode-range, giữ đầy đủ latin/vietnamese để dấu tiếng Việt không rơi về font dự phòng. Không gọi Google Fonts lúc build.

## V2 — Mở rộng
Giữ nguyên màu/font. Ảnh 3D dùng đỏ ruby, ngà và vàng đồng, thêm xanh lá tự nhiên rất ít. Product card: ảnh 16:10, nền ngà, viền line, radius 8px; badge DEMO nhỏ đỏ nhưng rõ. Category hero split text/ảnh; detail dùng hero image và nội dung 2 cột. Breakpoint <=760 một cột, tablet hai cột, desktop ba cột.

## V3 — Artwork
Flat illustration 2.5D dạng paper-cut/clean vector: đổ bóng một lớp rất nhẹ, không kính, không bóng kim loại, không perspective sâu. Giữ primary #B51F24, ivory #FCF8EF, gold #B58B45, chi tiết xanh lá tiết chế. Kích thước và bố cục ảnh hiện tại được giữ để tránh đổi layout.

## V4 — Motion tokens
Duration 160–280ms, easing cubic-bezier(.2,.8,.2,1); nâng nút 2px, card 4px; icon dịch 4px, ảnh scale 1.025. Hover chỉ ở thiết bị hỗ trợ hover; focus-visible trên link có hiệu ứng tương đương. Reduced motion: không transform/animation/transition. Xem docs/sections/10-interaction-motion.md.

## V5 — Tương tác và phân cấp

## V6 — Logo
Biểu tượng cánh sen hình học: đỏ ruby hai cánh ngoài, vàng đồng tâm, đỏ đậm nét đáy. Lockup chữ PhuongNam (Be Vietnam Pro 700) và DIGITAL (500, tracking rộng) được chuyển thành path trong SVG. Bản âm bản dùng ngà trên nền đỏ đậm, giữ tâm vàng. Vùng trống tối thiểu 1/4 chiều cao biểu tượng; logo ngang từ 180px, dưới mức đó dùng biểu tượng. Xem `brand/README.md`.

## V7 — Theme và nhận diện đang dùng
Ảnh chủ doanh nghiệp cung cấp với chữ VPN, sen đỏ, quỹ đạo sao vàng: 4 asset PNG tách riêng cho logo vuông/banner ngang × nền sáng/tối. Bản sáng dùng nền ngà và chữ đỏ; bản tối dùng nền gần đen, chữ ngà, điểm nhấn đỏ/vàng. Dark tokens: background #100E0E, surface #1D1918, heading #F8EEE3, ink #E8DFD7, muted #C1B3A8, primary cho chữ/link #F06469, action #BD1E29, gold #E0AD52. Nút đổi theme nhớ lựa chọn hoặc theo hệ thống. Xem `brand/THEME_ASSETS.md`.

## V8 — Hồ sơ doanh nghiệp
Banner nhận diện trang chủ tạm ẩn. Section hồ sơ sau hero: editorial 2 cột desktop, một cột mobile; khung thông tin nền surface, viền line, cạnh trên primary, fact grid hai cột/thu gọn một cột. Thông tin dài có overflow-wrap và không gắn badge trạng thái. Cùng token sáng/tối, focus và reduced motion hiện có.
CTA: nền đỏ, mũi tên trong vòng tròn 34px; card nền ngà, viền vàng, nhãn số góc và thanh tiến độ ngắn khi hover/focus. Reveal một lần, 18px/480ms, trễ card tối đa 80ms. Reduced-motion hiện tức thì. Xem docs/sections/11-interface-upgrade.md.
