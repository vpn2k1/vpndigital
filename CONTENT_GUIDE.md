# Quản lý nội dung

## Trang quản trị `/admin` (cách chính)
Dữ liệu apps (VI + EN) và toàn bộ chữ trên web (`strings-vi`, `strings-en`) lưu trong Cloudflare D1; ảnh upload lưu R2 (`https://media.vpndigital.io.vn/...`). Website vẫn là trang tĩnh: sửa xong bấm **Publish** để build lại (1–3 phút).

- **Apps**: thêm / sửa / xoá, đổi thứ tự (↑↓), bật `visible`/`featured`, upload icon, splash, screenshot (WebP/PNG/JPEG ≤ 5 MB, nên dùng WebP đúng kích thước). Lưu bị từ chối nếu dữ liệu sai (slug trùng, thiếu trường, ảnh ngoài `/apps/` hoặc media domain…) — cùng luật với lúc build (`lib/product-schema.ts`).
- **Nội dung web**: sửa chữ từng ngôn ngữ. Không thêm/xoá khoá được; hai ngôn ngữ phải cùng cấu trúc.
- **Người dùng** (chỉ admin): cấp quyền `admin` (mọi thứ + quản lý người dùng) hoặc `editor` (sửa nội dung, upload, Publish). Email còn phải nằm trong policy Cloudflare Access.
- Thông tin doanh nghiệp (`content/company.ts`) và cấu trúc danh mục (`content/catalog.ts`) vẫn sửa trong code.

## Thiết lập Cloudflare (một lần)
1. `npx wrangler d1 create vpndigital` → điền `database_id` vào `wrangler.toml`. `npx wrangler r2 bucket create vpndigital-media`, bật public custom domain `media.vpndigital.io.vn` cho bucket.
2. `npx wrangler d1 execute vpndigital --remote --file db/schema.sql`, rồi `node scripts/seed-d1.mjs <email-admin>` và `npx wrangler d1 execute vpndigital --remote --file db/seed.sql` (nạp dữ liệu hiện có).
3. Tạo Pages project nối repo: build command `npm run build:cf`, output `out`. Biến môi trường build: `CF_ACCOUNT_ID`, `CF_API_TOKEN` (quyền D1 Read), `D1_DATABASE_ID`, `NEXT_PUBLIC_SITE_URL`; `SITE_INDEXABLE=true` chỉ đặt ở môi trường Production.
4. Zero Trust → Access → Application cho `vpndigital.io.vn/admin*` và `vpndigital.io.vn/api/admin*`, policy theo email. Đặt biến Functions `CF_ACCESS_TEAM_DOMAIN` (`https://<team>.cloudflareaccess.com`), `CF_ACCESS_AUD` (AUD tag), secret `DEPLOY_HOOK_URL` (Pages → Settings → Deploy hooks).

## Chạy admin ở máy local
`npm run build`, tạo `.dev.vars` với `DEV_ADMIN_EMAIL=<email đã seed>` (chỉ có hiệu lực trên localhost), nạp D1 local bằng hai lệnh ở bước 2 với `--local`, rồi `npm run dev:cf` và mở `http://localhost:8788/admin/`.

---

# Sửa trực tiếp file (khi chạy local, không dùng D1)

Khi build không có biến D1, `scripts/pull-content.mjs` bỏ qua và dùng các file JSON đang commit. Lưu ý: build trên Pages sẽ ghi đè các file này bằng dữ liệu D1.

## File cần sửa
- `content/products.json`: mọi app (tiếng Việt); `content/products-en.json`: bản tiếng Anh theo slug.
- `content/strings-vi.json`, `content/strings-en.json`: chữ giao diện.
- `content/catalog.ts`: tên, mô tả, ảnh hero của 3 danh mục.
- `content/company.ts`: thông tin doanh nghiệp và menu.
- `public/images/`: ảnh WebP, gồm bản chuẩn 1600×1067 và bản nhỏ 640×427.

## Thêm một sản phẩm
Sao chép một object trong `content/products.json`, đổi slug duy nhất (chữ thường không dấu, số, dấu gạch ngang). Chọn category: `game`, `phan-mem` hoặc `cong-cu`. Điền đầy đủ các trường:

```json
{
  "slug": "ten-san-pham-moi",
  "category": "game",
  "name": "Tên sản phẩm",
  "subtitle": "Một câu giới thiệu ngắn",
  "summary": "Mô tả ngắn trên thẻ",
  "description": "Bài giới thiệu chi tiết, chỉ ghi thông tin đã xác nhận",
  "features": ["Tính năng thứ nhất", "Tính năng thứ hai"],
  "platform": "Nền tảng dự kiến",
  "tags": ["Thể loại", "Chủ đề"],
  "image": "/images/game.webp",
  "imageAlt": "Mô tả nội dung ảnh để hỗ trợ khả năng tiếp cận",
  "status": "demo",
  "featured": false
}
```

Route `/san-pham/ten-san-pham-moi/` và card trong danh mục được tạo tự động lúc build. Đặt `featured: true` để đưa vào trang chủ; trang chủ lấy tối đa 3 mục featured theo thứ tự JSON. Đổi thứ tự object để sắp xếp.

## Sửa/xóa
Sửa nội dung trực tiếp trong object. Xóa object để bỏ sản phẩm; build tiếp theo bỏ route tương ứng. Nếu đổi slug của sản phẩm đã công bố, cần bổ sung redirect trong nền tảng hosting để không làm hỏng liên kết cũ. Không đổi taxId/địa chỉ doanh nghiệp từ file sản phẩm.

## Ảnh mới
Lưu cặp `ten-anh.webp` (1600×1067) và `ten-anh-640.webp` (640×427) vào public/images; đổi image thành /images/ten-anh.webp. Chỉ dùng ảnh có quyền sử dụng. Tất cả ảnh hiện tại là minh họa 2D/2.5D AI, không phải screenshot của một ứng dụng/game thực tế.

## Từ demo thành sản phẩm thật
Chỉ đổi status thành `released` sau khi xác nhận sản phẩm thực sự phát hành. Đồng thời thay toàn bộ mô tả demo, ảnh concept và nền tảng bằng nội dung thật. Hiện chưa có trường URL tải/chơi thử hoặc hành vi download: nếu cần, cập nhật spec rồi bổ sung link chính thức, không dùng link giả.

## Kiểm tra
```sh
npm ci
npm run build
npm run typecheck
```
Build kiểm tra slug trùng/không hợp lệ, category không tồn tại và các trường bắt buộc. Sau deploy, kiểm tra danh mục, trang chi tiết, ảnh và điều hướng. Noindex vẫn mặc định đến khi chủ doanh nghiệp xác nhận domain/nội dung chính thức.
