# Blue/Cyan theme — VPN Digital (selected logo)

Theme aligned with selected blue V + cyan orbit identity. Colors replace legacy red/gold/cream in shared CSS and motion styles; no change to legal company information or product availability.

| Token | Light | Dark |
| --- | --- | --- |
| Primary | #096EBA | #4CCFEA |
| Background | #F7F9FC | #09172B |
| Surface | #FFFFFF | #10253B |
| Heading | #092B55 | #ECF7FF |
| Text | #263B4C | #D7E8F5 |
| Cyan accent | #16C8D6 | #16C8D6 |
| Footer | #07182F | #061325 |

- `app/identity.css`: final palette, logo and component styles; loaded last.
- `app/theme.css`: theme-switch behavior and surface references; legacy brand colors removed.
- `app/globals.css`: fallback defaults and hardcoded legacy colors updated.
- `app/motion.css`: highlight colors updated.
- Light/dark mode respects existing localStorage key and system preference.
- Keep keyboard focus, reduced motion and readable text contrast.
