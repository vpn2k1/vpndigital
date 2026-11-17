# PLAN — Viết spec trước code

## Trình tự
1. [x] Trích brief, chốt hướng, viết SPEC và DESIGN_SYSTEM.
2. [x] Viết spec/plan từng phần 01–06 trước code.
3. [x] Tạo Next.js + TypeScript, khóa dependencies, self-host font.
4. [x] Code Header → Hero → Lĩnh vực → Giới thiệu → Liên hệ/Footer theo tài liệu.
5. [x] Metadata, robots, sitemap, social image, 404 và cấu hình Vercel.
6. [x] Typecheck/build; kiểm tra HTML, assets, links, contrast; browser responsive khi có thể.
7. [x] Bàn giao mã nguồn, tài liệu, bộ SVG/tokens và URL chạy thử nếu publish thành công.

## Quyết định triển khai
Next.js + TypeScript theo yêu cầu, render tĩnh giúp tải nhẹ và SEO; không CMS giai đoạn này, nội dung tách vào content/company.ts. Vercel hỗ trợ framework trực tiếp. Preview có thể chạy trên Sites với output export; đó không phải deployment Vercel. Chưa có quyền truy cập tài khoản Vercel nên không tuyên bố đã tích hợp tài khoản/deploy thật trên Vercel.

## Việc còn cần từ chủ doanh nghiệp
Email, điện thoại, domain và quyền truy cập Vercel để hoàn tất kênh liên hệ/deployment chính thức. Không chặn xây dựng/kiểm thử vì các mục này.

## Trạng thái kiểm tra
Build và kiểm tra tĩnh đã đạt. Browser responsive/menu chưa xác minh do preview relay không khả dụng. Đã đóng gói và publish bản chạy thử riêng tư; Vercel đã kết nối nhưng tạo project bị từ chối 403.

Bản chạy thử: https://phuongnam-digital-viet-landing.namdeppz.chatgpt.site
Deployment thành công, owner-private; trình duyệt bên ngoài yêu cầu đăng nhập ChatGPT. Không thay đổi quyền công khai.

## Trạng thái Vercel cuối
Đã kết nối plugin và xác nhận team nam133's projects (team_zMWkgC58ElSxQtysKIRQkhYf). Không có project khớp phuongnam. POST tạo project phuongnam-digital trả 403 forbidden: “You don't have permission to create the project.” Không retry nguyên trạng, không nâng cấp gói hay đổi team. CLI fallback không có sẵn trong môi trường. Cần quyền tạo project trong team này hoặc một project có sẵn mà tài khoản có quyền deploy. Browser sign-in đã bị từ chối và không được thử lại.

## V2 — Kế hoạch trước code
1. [x] Viết spec/plan phần 07–09.
2. [x] Tạo 4 ảnh: hero, game, phần mềm, công cụ; WebP responsive.
3. [x] Tạo JSON schema nội dung + dữ liệu demo, component card, category routes/detail route.
4. [x] Cập nhật home, shared header/footer, điều hướng và metadata/sitemap.
5. [x] Build/typecheck; kiểm tra routes, links, ảnh và nội dung demo.
6. [x] Publish cùng Site, đóng gói source mới. Vercel vẫn bị chặn 403 quyền tạo project, không retry nguyên trạng.

V2 kiểm tra xong; publish cùng Site và tạo source ZIP trong bước bàn giao. Browser QA vẫn chưa xác minh do preview relay unavailable.

## V3 — Yêu cầu 2D/2.5D
- [x] Viết spec/plan chỉnh artwork trước khi thay asset.
- [x] Tạo 4 illustration cùng phong cách.
- [x] Thay WebP và cập nhật docs.
- [x] Build, kiểm tra link/asset, publish.

## V4 — Chuyển động tương tác
1. [x] Viết spec/plan trong docs/sections/10-interaction-motion.md trước code.
2. [x] Thêm hiệu ứng hover/focus/active CSS cho nút, icon, card, nav.
3. [x] Kiểm tra reduced-motion, build/typecheck và publish.

## V5 — Nâng cấp giao diện
1. [x] Viết docs/sections/11-interface-upgrade.md trước code.
2. [x] Triển khai reveal nhẹ và nâng cấp nút/thẻ/icon.
3. [x] Build và QA xuất tĩnh; publish sau khi tạo commit.

## V6 — Bộ logo thương hiệu
1. [x] Viết spec/plan trong docs/sections/12-brand-logo.md trước thiết kế.
2. [x] Tạo các biến thể SVG, preview, hướng dẫn sử dụng.
3. [x] Tích hợp vào header/footer/favicon/OG và kiểm tra bản build; chuẩn bị publish.

## V7 — Hai theme với logo và banner mới
1. [x] Viết spec/plan trong docs/sections/13-dual-theme-brand.md trước code.
2. [x] Tách bốn asset từ hai ảnh tham chiếu, kiểm tra crop.
3. [x] Áp dụng theme sáng/tối, chuyển theme và dùng asset trong giao diện.
4. [x] Build, QA tĩnh và cập nhật tài liệu; chuẩn bị đồng bộ Git/triển khai.

## V8 — Hồ sơ doanh nghiệp chi tiết
1. [x] Viết spec/plan trong docs/sections/14-company-profile.md trước code.
2. [x] Tạm ẩn dải nhận diện trang chủ, giữ logo và theme.
3. [x] Thiết kế lại thông tin doanh nghiệp và ba lĩnh vực.
4. [x] Build, QA tĩnh và chuẩn bị triển khai.
