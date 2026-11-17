# Danh mục và dữ liệu

## SPEC (trước code)
3 category pages + 6 detail pages sinh tĩnh. JSON chứa slug, category, name, subtitle, summary, description, features, platform, image, imageAlt, status=demo. Không ID trùng; empty category có thông báo. Header dùng đường dẫn root đúng từ subpage, category tabs aria-current; breadcrumb; related products cùng category. CTA chi tiết dẫn /#lien-he, không download giả.

## PLAN (trước code)
Viết schema và seed JSON → shared ProductCard/Footer → category route generateStaticParams → detail route với notFound, metadata → sitemap → build và duyệt toàn bộ link.

## Nghiệm thu
Giữ bảng màu, đúng route, có nhãn demo, assets tồn tại, build và typecheck đạt. Browser QA ghi theo kết quả thực tế.

## Bổ sung trước chỉnh code
Thêm featured boolean trong JSON để chọn nội dung trang chủ theo dữ liệu, không dựa vào vị trí mảng. Thông báo demo chỉ nói về các mục có nhãn DEMO để dùng được khi thêm sản phẩm thật sau này.
