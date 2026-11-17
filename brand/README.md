# Bộ logo PhuongNam Digital · v1

Biểu tượng là ba cánh sen hình học và nét hướng xuống, kết hợp bản sắc Việt với chữ “Phương Nam”. SVG dùng mảng phẳng, không gradient. Chữ trong các lockup đã chuyển thành vector path từ Be Vietnam Pro, nên hiển thị giống nhau khi chuyển máy.

## Tệp sử dụng
|Tệp|Dùng cho|
|---|---|
|`public/brand/logo-horizontal.svg`|Header, tài liệu, chữ ký; nền sáng|
|`public/brand/logo-stacked.svg`|Bìa, poster, bố cục vuông; nền sáng|
|`public/brand/logo-mark.svg`|Icon nhỏ hoặc avatar trên nền sáng|
|`public/brand/logo-horizontal-reverse.svg`|Nền đỏ đậm `#771B20`|
|`public/brand/logo-mark-footer.svg`|Biểu tượng riêng trên nền đỏ đậm|
|`public/brand/logo-one-color.svg`|In một màu trên nền sáng|
|`public/brand/logo-icon-on-red.svg`|Avatar/app icon nền đỏ đậm|
|`brand/logo-horizontal.png`, `brand/logo-stacked.png`, `brand/logo-icon-512.png`|Ảnh PNG xuất sẵn|
|`brand/logo-sheet.png`|Bảng xem trước bộ nhận diện|

## Quy tắc nhanh
- Vùng trống quanh logo ít nhất 1/4 chiều cao biểu tượng; không để chữ/hình lấn vào.
- Logo ngang rộng tối thiểu 180 px; nếu nhỏ hơn, dùng biểu tượng riêng. Favicon dùng biến thể nền đỏ.
- Nền sáng: ngà `#FCF8EF` hoặc trắng; nền tối: đỏ đậm `#771B20` và logo âm bản. Không đổi màu, kéo méo, thêm bóng/gradient hay đặt trên nền ảnh rối.
- Màu chính `#B51F24`; đỏ đậm `#771B20`; vàng `#B58B45`; ngà `#FCF8EF`. Chữ nội dung đi kèm dùng Be Vietnam Pro.
- Logo này là thiết kế đề xuất cho dự án. Trước khi dùng làm nhãn hiệu đăng ký, cần kiểm tra khả năng trùng hoặc tương tự.

Nguồn dựng lại: `design/generate-logo.py`; chạy từ thư mục gốc với `python3 design/generate-logo.py` sau khi cài dependency của dự án và `fontTools`. Các bản SVG trong `public/brand/` là file vector hoàn chỉnh, không cần chạy script để sử dụng.
