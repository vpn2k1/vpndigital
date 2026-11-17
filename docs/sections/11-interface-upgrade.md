# V5 — Nâng cấp giao diện và chuyển động

## SPEC (trước code)
- Giữ màu đỏ–ngà–vàng và ảnh 2D/2.5D. Tăng phân cấp trực quan bằng nút có huy hiệu mũi tên tròn, viền/đường vàng trên thẻ, ảnh thu phóng rất nhẹ và liên kết điều hướng rõ trạng thái.
- Chuyển động xuất hiện một lần khi cuộn cho khối nội dung và card: opacity 0→1, translateY tối đa 18px, 360–520ms; mỗi card trễ tối đa 80ms. Khởi tạo sau khi JS chạy, nội dung luôn hiện nếu JS tắt. IntersectionObserver sẽ kết thúc quan sát khi phần tử hiện; có fallback nếu API không hỗ trợ.
- Hover/focus/active: nút trượt nhẹ và icon mũi tên đi xa hơn trong vòng tròn; thẻ nhấc 4px, viền đổi sang vàng/đỏ, bóng mềm. Mobile chỉ phản hồi lúc bấm, không giữ hover. `:focus-visible` luôn rõ.
- `prefers-reduced-motion: reduce`: tất cả nội dung hiện ngay, bỏ transform, keyframe và hiệu ứng cuộn; focus và màu giữ nguyên. Không tải thư viện động hoặc dùng animation lặp vô hạn.
- Không thay nội dung pháp lý, tên sản phẩm, đường dẫn hoặc trạng thái demo.

## PLAN (trước code)
1. [x] Viết MotionReveal dùng IntersectionObserver, áp dụng cho section/card trên trang chủ, danh mục, chi tiết.
2. [x] Nâng cấp CSS nút/icon/card/menu theo token, không thay logo hoặc ảnh.
3. [x] Build/typecheck; kiểm tra xuất HTML, CSS giảm chuyển động và giữ đủ routes; xem trên browser nếu hạ tầng có thể.
4. [ ] Cập nhật design/QA, đồng bộ source và triển khai lại Site riêng tư.
