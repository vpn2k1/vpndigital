# Logo và banner VPN theo theme

Hai ảnh được chủ doanh nghiệp cung cấp là nguồn. Mỗi ảnh đã tách thành một logo vuông và một banner ngang, giữ đúng nét/kiểu chữ trong ảnh gốc.

| Giao diện | Logo vuông | Banner ngang |
|---|---|---|
| Sáng | `public/brand/theme/vpn-logo-light.png` | `public/brand/theme/vpn-banner-light.png` |
| Tối | `public/brand/theme/vpn-logo-dark.png` | `public/brand/theme/vpn-banner-dark.png` |

Trong cùng thư mục có bốn bản `.svg` đóng gói nguyên pixel PNG gốc bằng clip, thuận tiện dùng như một asset độc lập; **không phải vector dựng lại**. Trang web dùng PNG đã cắt để tải nhanh hơn. Kích thước: logo sáng 503×506, banner sáng 1344×346, logo tối 526×528, banner tối 1342×367.

Website dùng logo vuông ở header/footer. Dải banner ngang trên trang chủ hiện tạm ẩn bằng `sitePresentation.showBrandShowcase` trong `content/company.ts`; bốn asset vẫn được lưu để bật lại. Nút “Giao diện” đổi giữa sáng và tối, nhớ lựa chọn trên trình duyệt; chưa chọn thì theo hệ điều hành. Favicon chuyển theo theme khi JavaScript chạy. Các trang sản phẩm dùng cùng màu nền/chữ/thẻ theo theme.

Ảnh chia sẻ Open Graph dùng banner sáng trong bố cục riêng (`design/og-image.svg`, `public/og-image.png`); nền tảng chia sẻ thường chỉ đọc một ảnh, không theo theme của người xem.

Nguồn gốc để dựng lại: `design/reference/vpn-light-original.png`, `design/reference/vpn-dark-original.png`, `design/split-reference-assets.py`. Bốn PNG được xuất từ SVG clip bằng Inkscape ở đúng kích thước. Nếu thay ảnh nguồn, cần chỉnh tọa độ crop trong script trước khi xuất lại PNG.

Bộ logo sen hình học v1 trong `public/brand/` được giữ lại làm phương án cũ; bốn asset VPN trong `public/brand/theme/` là nhận diện đang dùng trên website.
