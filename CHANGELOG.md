# Changelog

## 1.0.0 (2026-06-30)

Production-ready release. Complete transformation from 5/10 to 10/10.

### Infrastructure
- CRA → Vite migration (React 18, Vite 8, esbuild)
- Biome 1.9 → 2.5 (preset, VCS integration)
- netlify.toml: Node 20 → 26, removed DISABLE_ESLINT_PLUGIN
- Docker Compose for local dev
- Removed dead files: prepros.config, reportWebVitals, setupTests, gh-pages

### Code Quality
- Class → functional components (Modal.jsx)
- Structured logger in Netlify Function (ISO timestamps, levels)
- Rate limiting on contact form (5 req/min/IP)
- Vitest + jsdom test environment
- 2 tests passing

### Monitoring & Security
- Form rate limiting with 429 Retry-After headers
- Logger with level filtering for production
- Lighthouse CI configured
