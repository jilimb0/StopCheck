# StopCheck

Lead-capture landing page for automotive diagnostics and tuning business. Multilingual (RU, UK, EN) with Netlify serverless form handler.

## Tech Stack
- **Frontend:** React 17 + Create React App
- **Styling:** SCSS/Sass
- **Serverless:** Netlify Functions (Node.js)
- **Email:** Resend API
- **Tests:** React Testing Library + Jest
- **Lint/Format:** Biome (double quotes, asNeeded semicolons)
- **Deploy:** Netlify + GitHub Pages

## Commands
- `pnpm start` — CRA dev server
- `pnpm build` — production build
- `pnpm test` — run tests
- `pnpm deploy` — GitHub Pages deploy
- `pnpm lint` / `pnpm format` — Biome

## Conventions
- Class components (React 17)
- i18n hardcoded in App.js (no library)
- SCSS with reset stylesheet
- Single-page modal-based UI
- Netlify redirects: `/api/*` → Functions
