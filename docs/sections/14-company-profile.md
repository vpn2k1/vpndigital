# V8 — Tạm ẩn dải nhận diện, làm rõ hồ sơ doanh nghiệp

## SPEC (trước code)
- Dải banner “NHẬN DIỆN PHƯƠNG NAM” ở trang chủ tạm ẩn qua một cấu hình nội dung; không xóa bốn asset logo/banner, theme sáng/tối, favicon hoặc logo header/footer. Không render section ẩn ra DOM.
- Chuyển phần giới thiệu lên ngay sau hero. Bố cục hai cột trên desktop: cột trái là bối cảnh ngắn và nhãn địa phương; cột phải là khung hồ sơ dễ quét. Mobile xếp dọc, hàng thông tin tự xuống dòng, không tràn chữ.
- Thông tin hồ sơ lấy từ dữ liệu người dùng đã cung cấp: tên pháp lý, tên quốc tế, tên viết tắt, MST (giữ số 0 đầu), người đại diện, địa chỉ doanh nghiệp và ngành nghề chính. Không hiển thị tình trạng hoạt động theo thời gian thực hoặc cơ quan thuế vì hai dữ liệu này có thể đổi. Không thêm doanh thu, khách hàng, dự án thật hay thành tích chưa được xác nhận.
- Ba lĩnh vực hiện có được mô tả cụ thể hơn và liên kết đến ba trang danh mục. Các sản phẩm demo vẫn ghi nhãn DEMO. Giao diện giữ cả hai theme, focus và reduced-motion.

## PLAN (trước code)
1. [x] Bổ sung dữ liệu hồ sơ vào `content/company.ts` và cờ hiển thị banner; giữ nguồn thông tin tập trung.
2. [x] Đổi thứ tự trang chủ, thiết kế lại section giới thiệu và copy ba lĩnh vực.
3. [x] Viết CSS profile cho desktop/mobile và hai theme; kiểm tra route, anchor, thông tin, build/TypeScript.
4. [x] Cập nhật brief/QA và chuẩn bị đồng bộ source, triển khai lại Site riêng tư.
