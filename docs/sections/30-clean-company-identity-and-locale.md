# V21 — Remove Claude-like star ornament and company profile details

The owner requested:
- Remove the Claude-like asterisk ornament (`✳`) and unnecessary decorative sparkle icons. The selected **VPN Digital** brand icon/logo remains in Header/Footer and image overlays.
- Remove the company-profile table listing International name, Short name, Tax ID, Legal representative, Registered address, Primary business, and disclaimer.
- Use exactly **PhuongNam Digital** in the English company-name area (`/en/`).
- Use exactly **Công ty TNHH Một Thành Viên Công Nghệ Số Phương Nam** in the Vietnamese company-name area (`/vi/`).
- Company name remains real HTML text, not a raster picture. Text comes from `config/strings/en.ts` and `config/strings/vi.ts`.
- Remove tax ID from the footer, and don't expose full registered address in the contact aside or map query.
- Keep concise location display, contact form, selected VPN logo, WebP illustrations and both themes.
- Structured Organization JSON-LD also omits taxID, legalName and registered address.
- Browser checks assert locale-specific name and absence of the old profile table/decorative stars.
