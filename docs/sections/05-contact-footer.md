# Liên hệ và footer

Trạng thái ban đầu: spec/plan đã viết trước implementation.

## SPEC
Vùng liên hệ hiển thị địa chỉ doanh nghiệp. Link Xem vị trí mở Google Maps search theo địa chỉ, không tuyên bố tọa độ/điểm đã xác minh. Email/phone chỉ hiện nếu được chủ doanh nghiệp cung cấp. Không form. Footer brand, MST, địa phương và Về đầu trang.

## PLAN
1. Tạo cấu hình contact optional. 2. Render chỉ kênh có thật. 3. Code footer. 4. Test external link rel, anchors, không mailto/tel placeholder.

## Mapping
content/company.ts; app/page.tsx

## Nghiệm thu
Đúng nội dung, responsive, không fake data hoặc interaction giả; kiểm thử theo QA_REPORT.md.

## Trạng thái implementation
Đã triển khai theo spec/plan. Chi tiết kiểm tra và giới hạn trong QA_REPORT.md.
