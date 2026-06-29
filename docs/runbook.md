# StopCheck — Production Runbook

## Architecture

- **Frontend:** React 18 (Vite build)
- **Backend:** Netlify Functions (Node.js)
- **Email:** Resend API
- **CI:** GitHub Actions
- **Deploy:** Netlify (Git-based)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend.com API key for form emails |
| `CONTACT_TO_EMAIL` | No | Recipient email (default: stopchek@gmail.com) |
| `CONTACT_FROM_EMAIL` | No | Sender email (default: onboarding@resend.dev) |
| `LOG_LEVEL` | No | Logger level (debug/info/warn/error) |

## Deployment

### Local development
```bash
pnpm install
pnpm dev       # Vite dev server on port 3000
```

### Netlify production
Set environment variables in Netlify dashboard. Deploy from `main` branch with build command `pnpm run build` and publish directory `build`.

## Form Handling

- Rate limit: 5 requests per minute per IP
- Fields: email, phone, name, car details, services
- Email sent via Resend API
- 429 status returned when rate limited (Retry-After header)

## Troubleshooting

### Form not sending
1. Check `RESEND_API_KEY` is set in Netlify env vars
2. Check Netlify function logs for errors
3. Verify Resend API key is valid

### Build fails
1. Run `pnpm build` locally to verify
2. Check Node version (requires >=26)
3. Clear node_modules and reinstall
