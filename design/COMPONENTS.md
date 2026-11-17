# Component spec

|Component|Props / nội dung|Trạng thái|Code|
|---|---|---|---|
|Header|company.name, navigation|desktop, mobile closed/open; Escape đóng và trả focus|components/Header.tsx|
|Button|anchor và label|default, hover, focus-visible|app/globals.css .button|
|Lotus|className|decorative aria-hidden|components/Lotus.tsx|
|Icon|name, size|decorative SVG|components/Icon.tsx|
|Field|title, detail, icon|static, không tương tác giả|app/page.tsx .field|
|Company details|legalName, taxId, address|definition list, wrap mobile|content/company.ts|
|Contact|address, optional email/phone|ẩn kênh chưa cấu hình|app/page.tsx|
|Footer|brand, tax ID|anchor top và focus|app/page.tsx|

Không có form/loading/error vì không có backend nhận lead trong phạm vi này.

## V2
- Artwork.tsx: src/srcset WebP 640 và 1600, alt, sizes, width/height, eager hero/lazy cards.
- ProductCard.tsx: image + demo badge + tags + name + summary, toàn card link chi tiết, focus inset.
- CategoryNav.tsx: link category, aria-current cho trang đang xem.
- Footer.tsx: dùng chung tất cả route, liên kết danh mục và về đầu trang.
- content/catalog.ts + content/products.json → category route và product route qua generateStaticParams.
- Header dùng usePathname đánh dấu category hiện tại, root-relative links cho subpages.

## V4 — Motion
Button, ProductCard, category cards, text links, brand và menu toggle có trạng thái hover/focus/pressed theo app/motion.css. Hiệu ứng chỉ là phản hồi cho hành động; focus luôn có outline. Reduced motion bỏ transform và animation.
