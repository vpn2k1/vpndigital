# Thêm, sửa và xóa sản phẩm

Website hiện dùng dữ liệu JSON, không có trang quản trị/CMS. Sau khi chỉnh file, chạy build và deploy lại để thay đổi có hiệu lực.

## File cần sửa
- `content/products.json`: mọi game, phần mềm và công cụ.
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
