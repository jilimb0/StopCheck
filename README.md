# StopCheck Portfolio Project

Upgraded lead-capture web app for an automotive diagnostics and tuning business, with the original visual identity preserved.

## Live Project Summary

This project presents a service business in a recruiter-friendly format:

- original branded visual style and page concept retained
- stabilized modal + service interaction flow
- lead form connected to a JavaScript serverless endpoint
- responsive layout for desktop and mobile
- production-ready static build for Netlify

## Tech Stack

- React (CRA)
- SCSS
- Netlify Functions (Node.js)
- Resend API (transactional email)
- React Testing Library + Jest

## Portfolio Highlights

- Replaced legacy PHP form handler with JavaScript serverless architecture
- Preserved original UI concept while improving code quality and runtime behavior
- Added SEO and social metadata for shareability
- Added/updated tests for key user flows (navigation + quote modal form)
- Validated production build and deployment config

## Architecture

- Frontend app: `src/App.js`
- Styling system: `src/styles/App.scss`
- Serverless API: `netlify/functions/contact.js`
- Netlify routing/build config: `netlify.toml`

Request flow:
1. User submits quote form in the React app.
2. Frontend sends JSON to `/api/contact`.
3. Netlify redirect maps request to `/.netlify/functions/contact`.
4. Function validates payload and sends email via Resend.
5. Function returns JSON status message to UI.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm start
```

Run tests:

```bash
pnpm test -- --watchAll=false
```

Create production build:

```bash
pnpm run build
```

## Netlify Deployment

Recommended build settings:

- Branch to deploy: `master` (or your feature branch)
- Base directory: *(empty)*
- Build command: `pnpm run build`
- Publish directory: `build`
- Functions directory: `netlify/functions`

Required environment variables:

- `RESEND_API_KEY` (required)
- `CONTACT_TO_EMAIL` (optional, default: `stopchek@gmail.com`)
- `CONTACT_FROM_EMAIL` (optional, default: `onboarding@resend.dev`)

## Recruiter Notes

This repo demonstrates practical frontend + serverless integration skills:

- preserving a unique existing UI while modernizing implementation
- migration from mixed stack (PHP) to JavaScript-only runtime
- deployment-aware engineering (Netlify redirects/functions)
- test-backed iteration and production validation

## Project Case Study

### Goal

Turn a legacy service website into a portfolio-grade product demo that shows modern frontend execution, deployment readiness, and practical backend integration.

### Before

- custom visual concept that required preserving identity during upgrade
- mixed stack (`React + PHP`) that does not fit static hosting platforms like Netlify
- minimal project story for recruiters (default CRA-style documentation)
- weak test signal for key UI flows

### After

- retained original landing concept and interaction style, while removing fragile legacy behavior
- full JavaScript runtime path:
  - React frontend
  - Netlify Function endpoint
  - email delivery via Resend API
- improved SEO/social metadata for sharing and presentation
- stronger test coverage around core user interactions

### Measurable Outcomes

- Build pipeline: `pnpm run build` passes
- Test suite: `2/2` tests passing
- Backend migration: `PHP endpoint -> Netlify Function (Node.js)`
- Deployment model: static frontend + serverless API under one platform

### Evidence in Repository

- UI implementation: `src/App.js`, `src/styles/App.scss`
- API function: `netlify/functions/contact.js`
- deployment config: `netlify.toml`
- metadata improvements: `public/index.html`
- tests: `src/App.test.js`

### Screenshot Slots

Add project visuals here for final portfolio presentation:

- `docs/images/before-ui.png`
- `docs/images/after-ui.png`

## Future Improvements

- Add image optimization pipeline and Lighthouse performance pass
- Add anti-spam/rate-limiting for form submissions
- Add i18n toggle (UA/RU/EN)
- Add Playwright E2E smoke tests
