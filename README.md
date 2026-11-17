# PhuongNam Digital

Landing page Next.js + TypeScript, thiết kế trắng ngà / đỏ / hoa sen. Font Be Vietnam Pro self-hosted. Một trang tĩnh, không backend/form hay analytics.

## Chạy
Node.js 22+ và npm. Dependency chính được khóa trong package-lock.json.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Mở địa chỉ Next.js in trong terminal. `npm run typecheck` kiểm tra TypeScript. `npm run build` xuất website tĩnh vào `out/`. Không dùng `next start` với output export.

## Nội dung và thiết kế
- `BRIEF.md`: nguồn thông tin và giả định.
- `SPEC.md`, `PLAN.md`: phạm vi và tiến độ.
- `docs/sections/01-header.md` đến `06-platform-seo.md`: spec + plan của từng phần, viết trước implementation.
- `DESIGN_SYSTEM.md`, `design/tokens.json`: palette, font, spacing, responsive.
- `design/frames/`: SVG tham khảo desktop/mobile để nhập Figma, không phải file .fig.
- `content/company.ts`: tên, MST, địa chỉ, các lĩnh vực.
- `app/globals.css`: token CSS và layout.
- `SEO.md`, `QA_REPORT.md`: SEO và kiểm thử.

## Triển khai Vercel
Đã chuẩn bị `vercel.json` với framework Next.js, build npm run build, install npm ci, các response headers. Đã kết nối Vercel; thao tác tạo project bị từ chối 403 forbidden. Chưa có deployment Vercel.

### Git
1. Đưa source vào repository GitHub/GitLab/Bitbucket của bạn (không đưa node_modules/.next/out/.env.local).
2. Vercel → Add New → Project → Import repository. Framework Preset: Next.js. Root Directory là thư mục chứa package.json. Dùng cấu hình build mặc định trong vercel.json.
3. Đặt các biến môi trường bên dưới theo Production/Preview, rồi Deploy.
4. Gắn domain thật trong Settings → Domains, cập nhật NEXT_PUBLIC_SITE_URL và redeploy.
5. Kiểm tra trang chủ, assets, `/robots.txt`, `/sitemap.xml`, Open Graph và liên kết liên hệ trên URL thực tế.

### CLI
```sh
npx vercel login
npx vercel
npx vercel --prod
```
Đăng nhập trực tiếp trên Vercel; không đặt token vào mã nguồn. Hai lệnh cuối tạo deployment thật trên tài khoản đã đăng nhập, có thể chịu giới hạn/gói tài khoản.

### Biến môi trường
|Tên|Giá trị|
|---|---|
|NEXT_PUBLIC_SITE_URL|Origin HTTPS thật của domain production. Để trống thì không canonical/sitemap URL.|
|SITE_INDEXABLE|Mặc định false. Chỉ đặt true khi nội dung và domain production sẵn sàng. Vercel Preview luôn noindex.|
|NEXT_PUBLIC_CONTACT_EMAIL|Email thật của công ty; trống thì không hiện.|
|NEXT_PUBLIC_CONTACT_PHONE|Số điện thoại thật; trống thì không hiện.|

Biến được đọc lúc build; phải redeploy sau khi sửa. Không đặt secrets vào biến NEXT_PUBLIC_. Source đã có đường dẫn riêng phục vụ bản xem trên Sites; deployment Sites không phải Vercel. Nếu dùng repo cho dự án Vercel độc lập, có thể bỏ `.openai/hosting.json` (chỉ dùng cho Sites).

## Giới hạn hiện tại
Email, số điện thoại và domain chưa được cung cấp. Liên hệ hiện có địa chỉ và link tìm kiếm Google Maps theo địa chỉ, chưa phải pin doanh nghiệp được xác minh. Không có form gửi tin, không thu thập lead. Logo PN, tagline và hoa sen là thiết kế đề xuất. Thông tin doanh nghiệp do chủ doanh nghiệp cung cấp, chưa kiểm chứng độc lập.

## Quy trình sửa
Cập nhật spec/plan của section trước → sửa component/content/style → typecheck/build → cập nhật QA_REPORT. Giữ spec và triển khai cùng một phiên bản.

## Nguồn kỹ thuật
https://nextjs.org/docs/app/guides/static-exports
https://nextjs.org/docs/app/getting-started/metadata-and-og-images
https://vercel.com/docs/git
https://vercel.com/docs/frameworks/full-stack/nextjs

## Trạng thái Vercel cuối
Đã kết nối plugin và xác nhận team nam133's projects (team_zMWkgC58ElSxQtysKIRQkhYf). Không có project khớp phuongnam. POST tạo project phuongnam-digital trả 403 forbidden: “You don't have permission to create the project.” Không retry nguyên trạng, không nâng cấp gói hay đổi team. CLI fallback không có sẵn trong môi trường. Cần quyền tạo project trong team này hoặc một project có sẵn mà tài khoản có quyền deploy. Browser sign-in đã bị từ chối và không được thử lại.

## V2 — Danh mục sản phẩm
Thêm 3 trang /game/, /phan-mem/, /cong-cu/ và 6 trang /san-pham/[slug]/. Dữ liệu minh họa có nhãn DEMO. Xem CONTENT_GUIDE.md để sửa/thêm/xóa, thay ảnh, chọn featured. Ảnh 2D/2.5D WebP theo màu thương hiệu; nguồn/prompt tại design/ASSET_PROMPTS.md. Spec/plan mới: docs/sections/07–09.

## V3 — Phong cách ảnh
Theo phản hồi, 4 ảnh chính đã thay bằng minh họa phẳng 2D/2.5D. Các route và dữ liệu demo giữ nguyên.

## V4 — Hiệu ứng tương tác
`app/motion.css` quy định phản hồi hover/focus/active cho nút, icon, card và nav. Không cần JavaScript hay thư viện animation; hệ thống sẽ tắt di chuyển khi người dùng bật reduced motion. Spec/plan nằm ở docs/sections/10-interaction-motion.md.

## V5 — Nâng cấp giao diện và chuyển động
Nút có biểu tượng mũi tên tròn và phản hồi hover/focus; thẻ có vạch vàng, hình phóng nhẹ và hiệu ứng nhấc lên. Các khối nội dung xuất hiện một lần khi cuộn bằng IntersectionObserver. Nếu tắt JavaScript hoặc bật reduced motion, nội dung vẫn hiển thị ngay. Xem docs/sections/11-interface-upgrade.md để biết spec/plan.

## V6 — Bộ logo thương hiệu
Logo cánh sen hình học đã thay dấu PN ở header, footer, favicon và ảnh Open Graph. Bộ SVG/PNG, quy tắc sử dụng và bảng xem trước nằm trong `brand/README.md` và `public/brand/`. Spec/plan trước thiết kế nằm ở `docs/sections/12-brand-logo.md`.

## V7 — Logo và banner VPN, giao diện sáng/tối
Hai ảnh nhận diện mới do chủ doanh nghiệp cung cấp được tách thành bốn asset riêng. Header/footer dùng logo vuông; trang chủ ban đầu dùng banner ngang. Nút “Giao diện” lưu lựa chọn sáng/tối, mặc định theo hệ điều hành. Xem `brand/THEME_ASSETS.md` để lấy PNG/SVG và `docs/sections/13-dual-theme-brand.md` để xem spec/plan. Bộ v1 trong phần trên được giữ làm phương án cũ.

## V8 — Hồ sơ doanh nghiệp chi tiết
Dải banner nhận diện trên trang chủ tạm ẩn qua `sitePresentation.showBrandShowcase = false`; logo header/footer và theme giữ nguyên. Phần giới thiệu được đưa lên sau hero, trình bày hồ sơ pháp lý và ngành nghề chính từ thông tin công ty cung cấp. Ba lĩnh vực có mô tả cụ thể hơn; sản phẩm vẫn là demo. Spec/plan: `docs/sections/14-company-profile.md`.
