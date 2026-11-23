# V20 — Contact form: React Hook Form + Zod + preview success toast

Owner request:
- **Validate all three fields** using `react-hook-form`, `@hookform/resolvers/zod` and `zod` before showing success.
- Name: trimmed length 2–120.
- Phone: 9–15 digits, optional international + prefix; spaces, parentheses, period or hyphen separators allowed.
- Email: required, valid email format.
- Field-level, translated errors with `aria-invalid`, `aria-describedby`, `role=alert`.
- After valid submit: success-style toast saying **"Submitted successfully!" / "Gửi thông tin thành công!"**, with a secondary **"Demo only — no information was delivered." / "Bản demo — chưa gửi dữ liệu đến doanh nghiệp."**
- Do **not** show the old cleared-form message. Form values remain entered; user can dismiss the toast.
- There is no backend or API: this UI is a simulation only. Never claim that a real email/message was delivered. No POST, storage or telemetry added.
- Translated messages are in `config/strings/en.ts` and `vi.ts`.
- Responsive fixed toast with accessible live region and dismiss action; input errors outlined.
- Browser tests cover invalid/valid cases in both locales and assert that no write network request occurs.

The workflow updates `package-lock.json` automatically from `package.json` before `npm ci` and commits it to the PR branch.
