# V7 — Logo và banner theo hai theme

## SPEC (trước triển khai)
- Hai ảnh gốc do chủ doanh nghiệp cung cấp là chuẩn hình: mỗi ảnh gồm logo vuông VPN và banner ngang. Tách thành 4 asset độc lập: `logo-light`, `banner-light`, `logo-dark`, `banner-dark`. Giữ nguyên nét sen, quỹ đạo sao, góc đỏ, chữ VPN và màu; cắt phần khoảng trống ngoài khung, không tái tạo logo khác.
- Theme sáng dùng nền ngà, chữ đỏ đậm và bộ asset nền sáng; theme tối dùng nền gần đen, chữ ngà và bộ asset nền tối. Header hiển thị logo vuông, trang chủ hiển thị banner ngang; footer nền tối dùng logo tối. Tên đầy đủ “PhuongNam Digital” vẫn hiện bằng chữ và trong nhãn trợ năng.
- Nút đổi theme có tên rõ ràng, điều khiển bằng bàn phím, lưu lựa chọn trong localStorage. Nếu chưa chọn, theo `prefers-color-scheme`; khi JS không chạy, CSS vẫn theo hệ thống. Cập nhật `color-scheme` cho form/control. Không nhấp nháy theme đã lưu khi tải trang.
- Nền tối phải có tương phản đọc được trên các section, card, menu, thông tin sản phẩm; giữ cấu trúc và 10 route hiện tại. Chuyển màu mượt ≤260ms, tắt chuyển động khi reduced motion. Không thay nội dung pháp lý và dữ liệu demo.
- Asset tách ra là SVG đóng gói PNG gốc, dùng clipping để giữ đúng pixel và cắt phần ngoài. Đây là bản raster trong container SVG, không phải logo vector dựng lại.

## PLAN (trước code)
1. [x] Đo vùng logo/banner trong hai ảnh, xuất 4 asset độc lập và xem trực quan.
2. [x] Thêm theme tokens, theme script/toggle, đổi logo theo theme và đặt banner trong trang chủ.
3. [x] Build/typecheck, kiểm tra asset và cả 10 route; QA theme/tương phản bằng preview nếu hạ tầng cho phép.
4. [x] Cập nhật hướng dẫn và chuẩn bị gói asset/source để xuất bản Site riêng tư.
