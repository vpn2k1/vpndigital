# UI icon library — Lucide React

Sử dụng bộ [Lucide](https://lucide.dev/guide/react/) có sẵn với `lucide-react@1.76.0`. Icon là SVG nội tuyến, sắc nét trên retina và tự thích nghi màu sáng/tối theo `currentColor`; không cần ảnh WebP cho các nút điều hướng.

- Component dùng chung: `components/Icon.tsx`. Giữ những tên icon đã có (`arrow`, `up`, `down`, `external`, `pin`, `game`, `code`, `layers`, `mail`, `phone`, `clock`, `sparkle`, `menu`).
- CSS hiệu ứng: `app/ui-icons.css` và `app/motion.css`.
- Text của liên kết/nút phải còn ý nghĩa nếu icon bị ẩn; icon trang trí có `aria-hidden`.
- Không cài thư viện icon khác hoặc tự tạo ảnh WebP cho những icon UI nhỏ này.
- QA: `npm ci`, `npm run typecheck`, `npm run build` và Playwright.
