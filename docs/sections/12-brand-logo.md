# V6 — Bộ logo PhuongNam Digital

## SPEC (trước khi vẽ và tích hợp)
- Kế thừa đỏ ruby `#B51F24`, đỏ đậm `#771B20`, vàng đồng `#B58B45`, nền ngà `#FCF8EF`; hình phẳng 2D, không gradient/đổ bóng.
- Biểu tượng gồm ba cánh sen hình học và nét hướng xuống tượng trưng cho “Phương Nam”; nhìn rõ ở 24 px. Dùng các mảng đặc và khoảng trắng, tránh chi tiết vi mô.
- Bộ xuất: logo ngang màu, logo dọc màu, biểu tượng màu, biểu tượng âm bản trên nền đỏ đậm, logo ngang trắng cho nền tối, bản một màu, favicon và ảnh xem trước. SVG có `viewBox`; bản có chữ là vector path để không phụ thuộc font máy nhận. Giữ Be Vietnam Pro trong hướng dẫn và chữ HTML của website.
- Vùng trống tối thiểu bằng 1/4 chiều cao biểu tượng mỗi cạnh. Bản ngang dùng từ 180 px; dưới mức đó chỉ dùng icon. Không kéo méo, đổi màu tùy ý, thêm hiệu ứng 3D hoặc đặt trực tiếp trên ảnh nhiều chi tiết.
- Header, footer, favicon, ảnh Open Graph dùng cùng biểu tượng; giữ tên thương mại và pháp lý hiện tại. Logo là đề xuất nhận diện, chưa thực hiện tra cứu nhãn hiệu.

## PLAN (trước code)
1. [x] Vẽ một master mark vector và tạo các lockup theo cùng tỷ lệ; xuất preview và hướng dẫn.
2. [x] Thay mark PN cũ trên header/footer/favicon/OG; giữ layout và điều hướng.
3. [x] Kiểm tra kích thước nhỏ, màu nền sáng/tối, SVG hợp lệ, build/typecheck và 10 route; cập nhật QA.
4. [x] Chuẩn bị gói logo và source để triển khai Site hiện có ở chế độ riêng tư.
