# Graph Report - vpndigital  (2026-11-28)

## Corpus Check
- 144 files · ~57,980 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 11, (none) 2, .example 1)

## Summary
- 760 nodes · 1651 edges · 66 communities (42 shown, 24 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3dff8454`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- getStrings
- components.json
- with
- devDependencies
- next
- PhuongNam Digital
- compilerOptions
- render_theme_illustrations.py
- V12 — VPN Digital / Orbit Studio: full website redesign
- Hệ thống thiết kế
- PLAN — Viết spec trước code
- Báo cáo QA
- Nền tảng, SEO và Vercel
- Thêm, sửa và xóa sản phẩm
- ui-smoke.mjs
- Ảnh 3D V2
- Header và điều hướng
- Hero và hoa sen
- Lĩnh vực hoạt động
- Giới thiệu và thông tin doanh nghiệp
- Liên hệ và footer
- Ảnh 3D
- V9 — UI/UX refresh và trạng thái sắp ra mắt
- SPEC — Landing page
- Danh mục và dữ liệu
- json
- Trang chủ và tài liệu chỉnh sửa
- V4 — Hiệu ứng nút, icon và thẻ
- Bộ logo PhuongNam Digital · v1
- Component spec
- V5 — Nâng cấp giao diện và chuyển động
- V6 — Bộ logo PhuongNam Digital
- V7 — Logo và banner theo hai theme
- V8 — Tạm ẩn dải nhận diện, làm rõ hồ sơ doanh nghiệp
- V10 — Nhận diện VPN Digital màu xanh (mẫu đã chọn)
- Nhập thiết kế vào Figma
- SEO
- V15 — Reintroduce 3D raster images and make Light/Dark reliable
- THEME_ASSETS.md
- BRIEF.md
- 16-lucide-icon-library.md
- 18-blue-cyan-theme.md
- 19-blue-cyan-site-images.md
- 20-light-dark-artwork.md
- en.ts
- V22 — End-to-end locale text audit
- 22-logo-only-design.md
- 23-brand-lockup-mark-plus-live-text.md
- 25-swapped-light-dark-artwork.md
- 27-contact-form-preview.md
- 28-bilingual-en-vi-routing.md
- 29-rhf-zod-contact-validation.md
- 30-clean-company-identity-and-locale.md
- cn
- compilerOptions
- dependencies
- package.json
- scripts
- cn@^0.5.2
- @fontsource/be-vietnam-pro
- tw-animate-css@^1.4.0
- @types/node@^22.0.0
- typescript@^5.9.0

## God Nodes (most connected - your core abstractions)
1. `cn()` - 55 edges
2. `getStrings()` - 37 edges
3. `AppsTab()` - 29 edges
4. `react` - 26 edges
5. `json()` - 23 edges
6. `UsersTab()` - 22 edges
7. `AdminPage()` - 21 edges
8. `fail()` - 21 edges
9. `homeHref()` - 20 edges
10. `Header()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `V17 — One WebP per illustration in both themes, clearer theme toggle` --references--> `Artwork()`  [INFERRED]
  docs/sections/26-single-artwork-clear-theme-toggle.md → components/Artwork.tsx
- `LocaleLayout()` --calls--> `isLocale()`  [EXTRACTED]
  app/[locale]/layout.tsx → config/i18n.ts
- `doPublish()` --calls--> `api()`  [EXTRACTED]
  app/admin/page.tsx → components/admin/api.ts
- `LegacyTools()` --calls--> `LegacyRedirect()`  [EXTRACTED]
  app/cong-cu/page.tsx → components/LegacyRedirect.tsx
- `LegacyGame()` --calls--> `LegacyRedirect()`  [EXTRACTED]
  app/game/page.tsx → components/LegacyRedirect.tsx

## Import Cycles
- None detected.

## Communities (66 total, 24 thin omitted)

### Community 0 - "getStrings"
Cohesion: 0.08
Nodes (76): dynamicParams, generateMetadata(), LocalizedCategory(), Params, dynamicParams, generateMetadata(), LegalPage(), Params (+68 more)

### Community 1 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 2 - "with"
Cohesion: 0.07
Nodes (29): concurrency, cancel-in-progress, group, jobs, verify, name, on, pull_request (+21 more)

### Community 3 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, @cloudflare/pages-plugin-cloudflare-access@^1.0.5, @cloudflare/workers-types@^5.20261127.1, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5, @types/react@^19.2.0, @types/react-dom@^19.2.0, wrangler@^4.168.0 (+7 more)

### Community 4 - "next"
Cohesion: 0.08
Nodes (23): AdminLayout(), metadata, LegacyTools(), LegacyGame(), metadata, RootLayout(), metadata, RootGateway() (+15 more)

### Community 5 - "PhuongNam Digital"
Cohesion: 0.11
Nodes (18): Biến môi trường, Chạy, CLI, Git, Giới hạn hiện tại, Nguồn kỹ thuật, Nội dung và thiết kế, PhuongNam Digital (+10 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "render_theme_illustrations.py"
Cohesion: 0.09
Nodes (13): outlined_text(), svg(), text_lockup(), write(), png(), circle(), ellipse(), path() (+5 more)

### Community 8 - "V12 — VPN Digital / Orbit Studio: full website redesign"
Cohesion: 0.33
Nodes (5): Components, Goal, QA, UX decisions, V12 — VPN Digital / Orbit Studio: full website redesign

### Community 9 - "Hệ thống thiết kế"
Cohesion: 0.13
Nodes (14): Breakpoints và tương tác, Chi tiết font trước tích hợp, Hệ thống thiết kế, Layout, Mapping, Màu, Typography, V2 — Mở rộng (+6 more)

### Community 10 - "PLAN — Viết spec trước code"
Cohesion: 0.14
Nodes (13): PLAN — Viết spec trước code, Quyết định triển khai, Trình tự, Trạng thái kiểm tra, Trạng thái Vercel cuối, V2 — Kế hoạch trước code, V3 — Yêu cầu 2D/2.5D, V4 — Chuyển động tương tác (+5 more)

### Community 11 - "Báo cáo QA"
Cohesion: 0.17
Nodes (11): Báo cáo QA, Kiểm tra cuối, Triển khai và kiểm tra đường dẫn, Trạng thái Vercel cuối, V2 — Danh mục và ảnh 3D, V3 — Chỉnh minh họa 2D/2.5D, V4 — Hiệu ứng icon và nút, V5 — Nâng cấp giao diện (+3 more)

### Community 12 - "Nền tảng, SEO và Vercel"
Cohesion: 0.20
Nodes (9): Asset plan, Kế hoạch triển khai Vercel trực tiếp, Mapping, Nghiệm thu, Nền tảng, SEO và Vercel, PLAN, SPEC, Trạng thái implementation (+1 more)

### Community 13 - "Thêm, sửa và xóa sản phẩm"
Cohesion: 0.17
Nodes (11): Chạy admin ở máy local, File cần sửa, Kiểm tra, Quản lý nội dung, Sửa trực tiếp file (khi chạy local, không dùng D1), Sửa/xóa, Thiết lập Cloudflare (một lần), Thêm một sản phẩm (+3 more)

### Community 14 - "ui-smoke.mjs"
Cohesion: 0.09
Nodes (13): texts, admin, english, products, sql, time, categories, englishSource (+5 more)

### Community 15 - "Ảnh 3D V2"
Cohesion: 0.29
Nodes (6): game, hero, software, tools, V3 — Prompt chỉnh sửa theo yêu cầu, Ảnh 3D V2

### Community 16 - "Header và điều hướng"
Cohesion: 0.29
Nodes (6): Header và điều hướng, Mapping, Nghiệm thu, PLAN, SPEC, Trạng thái implementation

### Community 17 - "Hero và hoa sen"
Cohesion: 0.29
Nodes (6): Hero và hoa sen, Mapping, Nghiệm thu, PLAN, SPEC, Trạng thái implementation

### Community 18 - "Lĩnh vực hoạt động"
Cohesion: 0.29
Nodes (6): Lĩnh vực hoạt động, Mapping, Nghiệm thu, PLAN, SPEC, Trạng thái implementation

### Community 19 - "Giới thiệu và thông tin doanh nghiệp"
Cohesion: 0.29
Nodes (6): Giới thiệu và thông tin doanh nghiệp, Mapping, Nghiệm thu, PLAN, SPEC, Trạng thái implementation

### Community 20 - "Liên hệ và footer"
Cohesion: 0.29
Nodes (6): Liên hệ và footer, Mapping, Nghiệm thu, PLAN, SPEC, Trạng thái implementation

### Community 21 - "Ảnh 3D"
Cohesion: 0.29
Nodes (6): Nghiệm thu, PLAN (trước code), Plan V3, SPEC (trước code), V3 — Điều chỉnh đã chọn trước code, Ảnh 3D

### Community 22 - "V9 — UI/UX refresh và trạng thái sắp ra mắt"
Cohesion: 0.29
Nodes (6): A11y + responsive, Design decisions, Mục tiêu, Nguồn tham khảo, QA cần thực hiện, V9 — UI/UX refresh và trạng thái sắp ra mắt

### Community 23 - "SPEC — Landing page"
Cohesion: 0.29
Nodes (6): Các phần, Hợp đồng, Nghiệm thu, SEO và deploy, SPEC — Landing page, V2 — Danh mục sản phẩm và ảnh 3D

### Community 24 - "Danh mục và dữ liệu"
Cohesion: 0.33
Nodes (5): Bổ sung trước chỉnh code, Danh mục và dữ liệu, Nghiệm thu, PLAN (trước code), SPEC (trước code)

### Community 25 - "json"
Cohesion: 0.11
Nodes (38): productsEn, Data, Env, fail(), Handler, json(), now(), Role (+30 more)

### Community 26 - "Trang chủ và tài liệu chỉnh sửa"
Cohesion: 0.40
Nodes (4): Nghiệm thu, PLAN (trước code), SPEC (trước code), Trang chủ và tài liệu chỉnh sửa

### Community 27 - "V4 — Hiệu ứng nút, icon và thẻ"
Cohesion: 0.40
Nodes (4): Nghiệm thu, PLAN (trước code), SPEC (viết trước code), V4 — Hiệu ứng nút, icon và thẻ

### Community 28 - "Bộ logo PhuongNam Digital · v1"
Cohesion: 0.50
Nodes (3): Bộ logo PhuongNam Digital · v1, Quy tắc nhanh, Tệp sử dụng

### Community 29 - "Component spec"
Cohesion: 0.50
Nodes (3): Component spec, V2, V4 — Motion

### Community 30 - "V5 — Nâng cấp giao diện và chuyển động"
Cohesion: 0.50
Nodes (3): PLAN (trước code), SPEC (trước code), V5 — Nâng cấp giao diện và chuyển động

### Community 31 - "V6 — Bộ logo PhuongNam Digital"
Cohesion: 0.50
Nodes (3): PLAN (trước code), SPEC (trước khi vẽ và tích hợp), V6 — Bộ logo PhuongNam Digital

### Community 32 - "V7 — Logo và banner theo hai theme"
Cohesion: 0.50
Nodes (3): PLAN (trước code), SPEC (trước triển khai), V7 — Logo và banner theo hai theme

### Community 33 - "V8 — Tạm ẩn dải nhận diện, làm rõ hồ sơ doanh nghiệp"
Cohesion: 0.50
Nodes (3): PLAN (trước code), SPEC (trước code), V8 — Tạm ẩn dải nhận diện, làm rõ hồ sơ doanh nghiệp

### Community 34 - "V10 — Nhận diện VPN Digital màu xanh (mẫu đã chọn)"
Cohesion: 0.50
Nodes (3): Dùng trong website, Rebuild, V10 — Nhận diện VPN Digital màu xanh (mẫu đã chọn)

### Community 38 - "V15 — Reintroduce 3D raster images and make Light/Dark reliable"
Cohesion: 0.33
Nodes (5): Brand system, QA, Theme behavior, V15 — Reintroduce 3D raster images and make Light/Dark reliable, Visible placements

### Community 47 - "V22 — End-to-end locale text audit"
Cohesion: 0.50
Nodes (3): Findings and fixes, QA, V22 — End-to-end locale text audit

### Community 55 - "cn"
Cohesion: 0.07
Nodes (87): AdminPage(), doPublish(), api(), send(), AppForm(), AppsTab(), patch(), reorder() (+79 more)

### Community 56 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, isolatedModules, lib, module, moduleResolution, noEmit, resolveJsonModule, skipLibCheck (+4 more)

### Community 57 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority@^0.7.1, lucide-react@1.76.0, next@16.4.6, radix-ui@^1.8.1, react@^19.2.0, react-dom@^19.2.0, react-hook-form@7.92.0 (+7 more)

### Community 58 - "package.json"
Cohesion: 0.20
Nodes (9): clsx@^2.1.1, @hookform/resolvers@7.0.8, engines, node, name, private, version, clsx (+1 more)

### Community 59 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, build:cf, dev, dev:cf, typecheck

## Knowledge Gaps
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `cn` to `getStrings`, `dependencies`, `package.json`, `next`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Should `getStrings` be split into smaller, more focused modules?**
  _Cohesion score 0.07682227682227682 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `getStrings`, `dependencies`, `package.json`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `Product` connect `getStrings` to `json`, `cn`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `with` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._