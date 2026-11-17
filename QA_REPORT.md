# Báo cáo QA

Ngày: 2026-11-13. Môi trường Node.js 24.22.1, Next.js 16.4.6, TypeScript strict.

- Build đầu tiên: PASS, prerender /, 404, robots.txt, sitemap.xml.
- TypeScript: PASS (`npm run typecheck`), build cuối cũng kiểm tra TypeScript.
- Browser preview: chưa xác minh. `sites-preview start` trả lỗi “preview relay unavailable: No such file or directory”. Không thay thế server hoặc vượt sandbox.
- PNG social: đã tạo bằng sharp từ vector gốc; Python cairosvg không có trong môi trường.
- Lighthouse / field Core Web Vitals: chưa đo.
- Vercel: đã kết nối; API tạo project trong team nam133's projects trả 403 forbidden, chưa deployment Vercel.
- Form: ngoài phạm vi, không hiển thị gửi thành công giả.

Kết quả kiểm tra cuối sẽ được bổ sung trước đóng gói.

## Kiểm tra cuối
- Build cuối: PASS sau khi bổ sung OG/font/footer. Next.js 16.4.6; các route xuất tĩnh đúng.
- HTML: lang=vi, một H1, MST giữ số 0 đầu, 9 liên kết có href hợp lệ, mọi anchor có đích.
- Assets: 9 main references tồn tại; tất cả font tham chiếu trong CSS tồn tại; og-image.png và favicon có thật.
- Preview: noindex/nofollow, robots Disallow /, sitemap không chứa URL được index. Canonical/OG dùng URL bản chạy thử đã cấp.
- SEO config checks: production opt-in được index khi có URL; Vercel preview noindex; domain trống/invalid không canonical. PASS.
- Tương phản (tính từ HEX): primary/background 6.22:1, heading/background 10.10:1, ink/background 13.62:1, muted/background 5.41:1, surface/primary 6.48:1.
- OG PNG: đã xem trực tiếp, chữ tiếng Việt hiển thị đủ.
- Không có mailto/tel placeholder, không form gửi thành công giả.
- Responsive, menu keyboard, overflow và console: đã review code, chưa xác minh runtime/browser vì hạ tầng preview không khả dụng. Không báo pass các mục này.
- Không chạy Lighthouse; không có số đo hiệu năng giả.

## Triển khai và kiểm tra đường dẫn
Sites deployment: succeeded, URL https://phuongnam-digital-viet-landing.namdeppz.chatgpt.site . Trạng thái riêng tư giữ nguyên. Trình duyệt đã mở URL và quan sát cổng “Log in to access”; không truy cập được nội dung web trong session kiểm tra, không báo browser visual QA đạt. Vercel đã kết nối, chưa triển khai do lỗi quyền tạo project (403).

## Trạng thái Vercel cuối
Đã kết nối plugin và xác nhận team nam133's projects (team_zMWkgC58ElSxQtysKIRQkhYf). Không có project khớp phuongnam. POST tạo project phuongnam-digital trả 403 forbidden: “You don't have permission to create the project.” Không retry nguyên trạng, không nâng cấp gói hay đổi team. CLI fallback không có sẵn trong môi trường. Cần quyền tạo project trong team này hoặc một project có sẵn mà tài khoản có quyền deploy. Browser sign-in đã bị từ chối và không được thử lại.

## V2 — Danh mục và ảnh 3D
- Spec/plan 07–09 đã viết trước code.
- Build Next.js: PASS, 10 trang nội dung (home + 3 danh mục + 6 detail), cùng 404/robots/sitemap.
- Typecheck: PASS.
- Kiểm tra HTML export: 10 title duy nhất, 1 H1 mỗi trang, lang vi, nhãn demo và noindex.
- 181 liên kết nội bộ có route/anchor tồn tại; 174 tham chiếu img/srcset/script/style tồn tại.
- 4 ảnh 3D, mỗi ảnh có WebP 1600 và 640; tổng 8 file 584,980 byte. Đã xem ảnh tạo, đúng tông đỏ/ngà/vàng.
- Card demo không có CTA download/chơi giả. 3 category × 2 sản phẩm demo.
- CONTENT_GUIDE hướng dẫn JSON, featured, sửa/xóa/thêm và thay ảnh.
- Browser runtime/responsive chưa kiểm chứng: sites-preview start vẫn báo preview relay unavailable. Không báo pass menu/overflow/Lighthouse.
- Vercel: giữ nguyên lỗi quyền tạo project 403 từ lần trước; không retry nguyên trạng.

## V3 — Chỉnh minh họa 2D/2.5D
- Spec/plan ghi trong docs/sections/07-3d-artwork.md trước khi thay.
- 4 asset được chỉnh bằng imagegen theo tham chiếu V2, chuyển thành mảng màu phẳng/paper-cut 2.5D và tối ưu thành 8 WebP; ảnh gốc có trong workspace generated_images, prompt tại design/ASSET_PROMPTS.md.
- Build Next.js và TypeScript: PASS, vẫn 10 trang nội dung và các metadata route.
- Kiểm tra export: 10 trang có nhãn demo/noindex; 8 ảnh mới đầy đủ, alt cập nhật, trang chủ dùng hero mới.
- Browser responsive vẫn chưa xác minh vì preview relay không khả dụng; không ghi pass.

## V4 — Hiệu ứng icon và nút
- Spec/plan đã ghi trong docs/sections/10-interaction-motion.md trước code.
- Next.js build và TypeScript: PASS, 10 trang nội dung tĩnh.
- CSS xuất bản có các selector hover, focus-visible, hover:none cho cảm ứng, prefers-reduced-motion, keyframe dải sáng một lần; 10 trang đều tham chiếu stylesheet tồn tại.
- Preview relay của môi trường trước đó trả lỗi unavailable; chưa quan sát tương tác thực tế qua browser nên không báo visual QA đạt.
- Không thay nội dung, URL hay dữ liệu demo.

## V5 — Nâng cấp giao diện
- Next.js production build và TypeScript: PASS; 10 trang nội dung xuất tĩnh, cả 10 có markup reveal.
- CSS xuất tĩnh có motion-ready, focus-visible, đường viền card và prefers-reduced-motion; 8 ảnh WebP vẫn có trong output.
- Các đường dẫn, thông tin pháp lý và dữ liệu demo giữ nguyên. Chưa xác minh bằng browser vì preview relay của môi trường không hoạt động; chưa báo pass responsive hay trải nghiệm animation thực tế.

## V6 — Bộ logo
- Đã xem bản logo sheet, icon 32 px và ảnh Open Graph 1200×630: bố cục, màu sáng/tối và dấu sen rõ ở kích thước nhỏ.
- 9 SVG (7 biến thể/biểu tượng + favicon và OG) parse hợp lệ; lockup trong bộ asset dùng path, không cần font bên ngoài. 10/10 trang xuất tĩnh tham chiếu mark mới ở header và footer; 7 SVG nằm trong `out/brand/`.
- Next.js build và TypeScript: PASS. Chưa kiểm tra giao diện vận hành trên browser do preview relay không khả dụng.

## V7 — Hai theme và bốn asset VPN
- Xem riêng bốn crop logo/banner từ hai ảnh người dùng gửi: chữ VPN, sen và họa tiết không bị tách rời; bốn SVG parse hợp lệ, bốn PNG có kích thước riêng và dùng trên website.
- Build Next.js và TypeScript: PASS; 10 trang nội dung có header logo/theme toggle, trang chủ có banner. Theme script nằm trước body; CSS có hệ thống dark mặc định, light/dark tùy chọn, reduced motion.
- Tương phản tính từ token tối: ink/background 14.63:1, muted/background 9.42:1, primary/background 6.17:1, chữ sáng/nút đỏ 6.11:1. Chưa kiểm tra browser trực tiếp hoặc responsive thực tế: `sites-preview start` báo preview relay unavailable.
- Ảnh Open Graph mới 1200×630 dùng banner VPN sáng; đã xem trực quan.

## V8 — Hồ sơ doanh nghiệp
- Build Next.js và TypeScript: PASS; 10 trang nội dung tĩnh giữ nguyên.
- Trang chủ không xuất dải `brand-banner-section`; hồ sơ `#gioi-thieu` nằm trước `#linh-vuc`. Kiểm tra có tên pháp lý, tên quốc tế, tên viết tắt, MST 0901258364, người đại diện, địa chỉ và ngành nghề chính; logo theme và nhãn DEMO vẫn còn.
- CSS profile có grid desktop/mobile và token cho cả hai theme. Chưa kiểm chứng trực quan responsive trong browser do preview relay của môi trường không khả dụng.
