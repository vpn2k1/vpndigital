# Nền tảng, SEO và Vercel

Trạng thái ban đầu: spec/plan đã viết trước implementation.

## SPEC
Next.js App Router TypeScript strict; static export; font local; metadata vi_VN; Organization schema; robots/sitemap theo domain và index opt-in; 404; PNG OG; vercel.json framework nextjs, env mẫu và hướng dẫn CLI/Git. Không secrets.

## PLAN
1. Cài dependencies và tạo lockfile. 2. Config nền tảng. 3. Metadata và assets. 4. Typecheck/build. 5. Check robots hai chế độ. 6. Publish preview nếu hỗ trợ; Vercel deployment phụ thuộc tài khoản.

## Mapping
app/layout.tsx; app/robots.ts; app/sitemap.ts; app/not-found.tsx; next.config.ts; vercel.json

## Nghiệm thu
Đúng nội dung, responsive, không fake data hoặc interaction giả; kiểm thử theo QA_REPORT.md.

## Asset plan
Tạo OG PNG từ SVG vector với font hỗ trợ tiếng Việt; SVG desktop/mobile bàn giao là frame tham khảo chỉnh sửa được, không phải screenshot hoặc file Figma native.

## Điều chỉnh trước bàn giao
Bỏ script next start vì output export không dùng Node server. Dùng npm run dev cho phát triển; deploy thư mục out hoặc Vercel cho production. Tạo social image bằng sharp (dependency của Next) do renderer Python không sẵn có.

## Trạng thái implementation
Đã triển khai theo spec/plan. Chi tiết kiểm tra và giới hạn trong QA_REPORT.md.

## Kế hoạch triển khai Vercel trực tiếp
Vercel đã kết nối. Tạo project mới phuongnam-digital trong team duy nhất được trả về; tải source đã kiểm tra qua API, không dùng credential Git của Sites cho Vercel. Build Next.js trên Vercel, giữ noindex trong khi chưa chốt domain/liên hệ; kiểm tra trạng thái, HTTP và assets sau READY. Không nâng cấp gói/mua domain.

Kết quả Vercel: đã đọc team/project qua tích hợp; tạo project trả 403 forbidden. Không có project/deployment Vercel mới. Cấu hình sẵn và source không thay đổi.
