# V9 — UI/UX refresh và trạng thái sắp ra mắt

## Nguồn tham khảo
Áp dụng checklist và hướng tiếp cận design-system-first từ https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (không sao chép code hay cài runtime skill). Giữ nhận diện VPN Digital hiện có: đỏ ruby, ngà, vàng đồng, Be Vietnam Pro, dark/light.

## Mục tiêu
- Trang chủ có hero rõ mục đích, thông báo minh bạch về các sản phẩm đang chuẩn bị ra mắt.
- Ba route danh mục `/game/`, `/phan-mem/`, `/cong-cu/` hiển thị hero "Sắp ra mắt", mô tả lĩnh vực và danh sách concept.
- Sáu route `/san-pham/[slug]/` có trạng thái "Sắp ra mắt", không ngụ ý đã có chức năng, nút tải, chơi hay đăng ký giả.
- Các card vẫn bấm được, dẫn tới trang giới thiệu trạng thái thay vì màn hình chức năng.
- Giữ nguyên URL, static export, SEO, metadata, content, logo, liên hệ và trang hồ sơ pháp lý.

## Design decisions
Editorial tech / restrained bento: panel bo góc vừa phải, nhịp thở lớn, số nhấn như dấu hiệu thiết kế; không dùng neon, font ngoài hoặc hình ảnh stock. CTA thực sự dẫn đến trang đang có; mô tả tính năng dự kiến, không đưa thời hạn. Hero category và detail khác biệt bằng nhãn, danh mục, trạng thái và ảnh minh họa sẵn có.

## A11y + responsive
Focus-visible rõ, tương phản thông qua token, interactive targets 44px+, grid tự co giãn, text không bị cắt ở 375/768/1024/1440px, chỉ hiệu ứng khi hover được hỗ trợ; tôn trọng prefers-reduced-motion. Giữ noindex khi chưa cấu hình URL public / indexable.

## QA cần thực hiện
`npm ci && npm run typecheck && npm run build`, kiểm tra từng route trên mobile/desktop và bàn phím khi có môi trường browser. Không coi build hoặc responsive đạt nếu chưa chạy.
