# V4 — Hiệu ứng nút, icon và thẻ

## SPEC (viết trước code)
- Giữ token đỏ, ngà, vàng đồng và minh họa 2D/2.5D. Chuyển động chỉ cho phản hồi tương tác, không tự chạy liên tục khi trang mở.
- Nút chính: hover/focus nâng 2px và bóng nhẹ; dải sáng mảnh lướt một lần, mũi tên dịch 4px; active thu nhẹ. Màu chữ luôn đủ tương phản.
- Card danh mục/sản phẩm: nâng tối đa 4px, hình phóng tối đa 1.025 và mũi tên dịch 4px; focus keyboard trên chính link cho phản hồi tương đương. Không di chuyển layout bên cạnh.
- Nav danh mục, liên kết văn bản, brand và icon về đầu: nhấn hover/focus kín đáo. Menu mobile giữ trạng thái mở/đóng và focus hiện hữu.
- Thiết bị không hover: không đặt hover animation. prefers-reduced-motion:reduce: bỏ transform, keyframe, transition và scroll mượt; trạng thái focus/border/màu còn rõ. Không thêm JS hoặc thư viện animation.
- Thiết bị cảm ứng: :active chỉ nhấn rất nhẹ và đổi màu/viền; không giữ trạng thái hover sau khi chạm.
- Chỉ animatable transform/opacity/color/shadow, thời lượng 160–280ms. Không hiệu ứng vô tận. Nút bấm vẫn là link thật, không tạo hành vi giả.

## PLAN (trước code)
1. Thêm app/motion.css sau globals.css trong layout và dùng selector chính xác cho component hiện tại.
2. Kiểm tra hover, focus-visible, active, reduced-motion và breakpoint mobile; sửa nếu che focus hoặc tràn.
3. Build + typecheck + kiểm tra CSS output và route; cập nhật design system/QA; publish phiên bản mới lên Site.

## Nghiệm thu
Hiệu ứng ngắn, không đổi cấu trúc/route/nội dung, dùng bàn phím thấy focus, reduced-motion không có di chuyển. Browser QA báo đúng trạng thái thực tế.
