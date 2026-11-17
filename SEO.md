# SEO

- URL `/`: giới thiệu Công nghệ số Phương Nam, ngành phát triển game; title “PhuongNam Digital | Công nghệ số Phương Nam”.
- Một H1, H2 từng section, HTML prerender, lang vi.
- Canonical/sitemap chỉ sinh URL từ NEXT_PUBLIC_SITE_URL hợp lệ. SITE_INDEXABLE=true mở index ở domain đã cấu hình, không ở Vercel Preview; mặc định noindex.
- Organization JSON-LD: tên, legalName, alternateName, taxID, địa chỉ. Không review/rating.
- OG 1200x630, favicon PN; URL absolute nếu có domain. Không gắn social account giả.
- Không đo hay cam kết thứ hạng/Lighthouse. Kết quả kiểm tra trong QA_REPORT.
- Tham khảo: https://nextjs.org/docs/app/guides/static-exports ; https://nextjs.org/docs/app/getting-started/metadata-and-og-images ; https://vercel.com/docs/git

## V2
Title/description/canonical và OG riêng cho từng danh mục/sản phẩm. Static params sinh route từ JSON. Sitemap sinh toàn bộ route nếu bật index ở domain production; hiện vẫn noindex. Không thêm Product schema hay đánh giá giả cho concept demo.
