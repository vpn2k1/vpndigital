# Ảnh 3D

## SPEC (trước code)
Ảnh tham khảo chỉ định phong cách hình khối nổi/isometric, không đổi màu sang xanh. Hero đảo nổi cổng game ruby, cây và thềm ngà; game diorama ruộng bậc thang; phần mềm workspace các khối màn hình; công cụ khối code modular. Ảnh không text/UI giả, không logo của bên thứ ba. Art concept không phải screenshot sản phẩm thật.

## PLAN (trước code)
Tạo bằng imagegen → giữ ảnh gốc → resize WebP 640/1200/1600 phù hợp → img srcset/sizes + width/height → lazy covers, hero eager.

## Nghiệm thu
Giữ bảng màu, đúng route, có nhãn demo, assets tồn tại, build và typecheck đạt. Browser QA ghi theo kết quả thực tế.

## V3 — Điều chỉnh đã chọn trước code
Người dùng yêu cầu đơn giản 2D/2.5D. Thay bốn asset hero/game/software/tools bằng illustration giấy cắt lớp: mảng màu phẳng, bóng rất nhẹ, không vật liệu kính/bóng gương, không khối nổi sâu. Giữ bố cục/đối tượng để các alt text và trang demo còn phù hợp. Giữ tên asset tiêu thụ và cặp 640/1600; đổi prompt nguồn và cập nhật chú thích concept.

### Plan V3
1. Tạo lại 4 asset theo cùng bảng màu và phong cách 2.5D.
2. Thay WebP, tối ưu kích thước.
3. Cập nhật nhãn hình ảnh/tài liệu, kiểm tra build/assets/route.
4. Publish vào Site hiện tại, cập nhật ZIP.
