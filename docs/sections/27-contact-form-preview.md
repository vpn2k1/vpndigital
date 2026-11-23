# V18 — Form kết nối dạng demo

Trang chủ `/#lien-he` có biểu mẫu gồm **Họ và tên**, **Số điện thoại**, **Email** và nút **Gửi thông tin**.

- Ấn Gửi chỉ gọi `event.preventDefault()` và `form.reset()` để xóa ba ô, đồng thời thông báo `Đã xóa nội dung biểu mẫu — chưa gửi dữ liệu.`.
- Không có fetch, backend, action, lưu vào bộ nhớ, email hay dịch vụ bên ngoài.
- Chú thích trước khi gửi nêu rõ chỉ là demo. Form `noValidate` để click luôn xóa nội dung, kể cả khi nhập email không đúng.
- Form có label, autocomplete và `role=status` cho accessibility; responsive, tương phản màu tốt.
- Phần địa chỉ và liên kết bản đồ vẫn được giữ phía dưới form.
- Playwright kiểm tra 3 input, click xóa sạch, không có request không phải GET/HEAD, không điều hướng.
