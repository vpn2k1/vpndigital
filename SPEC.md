# SPEC — Landing page

## Hợp đồng
Một route chính `/`, các anchor #gioi-thieu, #linh-vuc, #lien-he. Trang 404 riêng. Nội dung prerender HTML bằng Next.js App Router. Không backend, tài khoản, thu thập dữ liệu hoặc tracking. CTA hero đến giới thiệu; CTA liên hệ đến thông tin doanh nghiệp. Nếu email/điện thoại được cấu hình, render mailto/tel; nếu trống thì không render kênh giả.

## Các phần
Spec và plan chi tiết từng phần nằm trong docs/sections/01–06. Các file này được viết trước code. Không bắt đầu component nếu chưa có spec/plan. Khi thay đổi yêu cầu, cập nhật spec/plan trước code.

## SEO và deploy
Static export Next.js ra out/ để preview; Vercel framework Next.js được cấu hình trực tiếp. NEXT_PUBLIC_SITE_URL chỉ đặt domain thật. SITE_INDEXABLE=true chỉ mở index khi có URL hợp lệ và không phải Vercel Preview. Không domain thì không canonical, sitemap rỗng, noindex. Organization schema chỉ dùng thông tin doanh nghiệp được cung cấp. Social image PNG riêng 1200x630, favicon SVG.

## Nghiệm thu
Build/typecheck pass, có text trong HTML, link nội trang có đích, menu mobile dùng bàn phím, không tràn ngang, focus rõ, reduced motion, logo/ảnh tự tạo không hotlink, không nút submit giả. Chưa có kênh liên hệ trực tiếp và kết nối Vercel phải ghi rõ trong bàn giao. Browser QA nếu hạ tầng hỗ trợ.

## V2 — Danh mục sản phẩm và ảnh 3D
Theo yêu cầu mới: giữ toàn bộ token màu hiện tại; tham khảo bố cục minh họa 3D trong ảnh user, chuyển vật liệu sang đỏ ruby/kem/vàng đồng. Thêm /game/, /phan-mem/, /cong-cu/ và /san-pham/[slug]/. Mỗi category có 2 sản phẩm demo. Tất cả cards và detail có nhãn DEMO; không nút tải/chơi giả hoặc số liệu/người dùng giả. Nội dung nằm tại content/products.json, có hướng dẫn thêm/sửa/xóa. Không CMS/admin/backend ở phiên bản này; sửa file rồi build/deploy lại.
