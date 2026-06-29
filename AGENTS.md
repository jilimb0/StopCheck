# StopCheck

Lead-capture landing page for automotive diagnostics and tuning business. Multilingual (RU, UK, EN) with Netlify serverless form handler.

## Tech Stack
- **Frontend:** React 18 + Vite 8
- **Styling:** SCSS/Sass
- **Serverless:** Netlify Functions (Node.js)
- **Email:** Resend API
- **Tests:** Vitest + React Testing Library
- **Lint/Format:** Biome 2.5
- **Deploy:** Netlify + GitHub Actions CI

## Commands
- `pnpm dev` — Vite dev server
- `pnpm build` — production build
- `pnpm preview` — preview build
- `pnpm test` — Vitest
- `pnpm lint` / `pnpm format` — Biome
- `pnpm validate` — lint + test

## Conventions
- React 18 functional components
- i18n hardcoded in App.jsx (no library)
- SCSS with reset stylesheet
- Single-page modal-based UI
- Netlify redirects: `/api/*` → Functions
- Form rate limiting: 5 req/min/IP
