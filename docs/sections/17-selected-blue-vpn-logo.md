# V10 — Nhận diện VPN Digital màu xanh (mẫu đã chọn)

Nguồn tham khảo: logo màu xanh dương/cyan trên hình người dùng cung cấp ngày 20/11/2026: chữ **VPN Digital**, chữ **V** cách điệu kết hợp vòng quỹ đạo và ngôi sao. Bản được dựng lại bằng các đường vector để tránh nền caro của ảnh chụp, không giữ các phương án logo đỏ/vàng đã thử.

## Dùng trong website
- Header: `public/brand/vpn-digital/wordmark-light.svg` (light) và `wordmark-dark.svg` (dark).
- Footer nền navy: `wordmark-dark.svg`.
- Favicon: `public/favicon.svg`, `public/favicon.ico`, `public/brand/vpn-digital/favicon-32.png`; icon dark hỗ trợ `mark-dark.svg`.
- Apple icon: `public/apple-touch-icon.png`.
- Open Graph: `public/og-image.png`; nguồn `design/og-image.svg`.
- PNG có nền trong suốt: `wordmark-light.png`, `wordmark-dark.png`, `mark.png`, `mark-dark.png`.

Màu tham chiếu: navy #08234B, royal blue #096EBA, cyan #16C8D6; dark nền #09172B và chữ sáng #EDF6FF.

## Rebuild
`python -m pip install pillow cairosvg && python scripts/render_logo_assets.py`. GitHub Actions xuất PNG/ICO/OG từ SVG, kiểm tra TypeScript, build và chạy browser smoke. SVG gốc không chứa ảnh raster/base64. Logo và phong cách là thiết kế phục dựng theo mẫu được chọn, chưa xác minh quyền đăng ký nhãn hiệu.

Giữ nguyên thông tin pháp lý công ty, các danh mục Game/Phần mềm/Công cụ và thông báo "Sắp ra mắt". Không merge vào main trong bước này.
