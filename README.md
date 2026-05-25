This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources: 

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity Revalidation

Published Sanity updates do not require a full Next.js rebuild. The app exposes a signed webhook endpoint at `/api/revalidate` that invalidates cache tags for the Help Center content.

Add `SANITY_REVALIDATE_SECRET` to the runtime environment, then create a Sanity webhook that targets:

- URL: `https://<your-domain>/api/revalidate`
- Filter: `_type in ["faq", "helpCenter", "category"]`
- Projection: `{ "_id": _id, "_type": _type, "audience": audience }`

This currently revalidates the cached FAQ and Help Center queries used by the admin, creator, and brand help pages.

## Deployment Runbook (Hetzner Blue/Green)

This repository deploys with GitHub Actions via `.github/workflows/deploy.yml` and executes `deploy/scripts/deploy_blue_green.sh` on the target server.

### Required GitHub Environment Variables

Set these in the GitHub environment (`production` for `main`, `develop` for `develop`):

- `HETZNER_HOST`
- `HETZNER_USER`
- `HETZNER_PORT` (optional, defaults to `22`)
- `HETZNER_DEPLOY_PATH` (optional, defaults to `/opt/huerray-web`)
- `DEPLOY_APP_NAME` (optional, defaults to `huerray-web`)
- `APP_HOST` (required Caddy host, example `stellar.huerray.de`)
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_API_TIMEOUT`
- `NEXT_PUBLIC_NOTIFICATIONS_REFETCH_INTERVAL`
- `NEXT_PUBLIC_PROFILE_REFRESH_INTERVAL`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `BLUE_PORT` (optional, defaults to `18080`)
- `GREEN_PORT` (optional, defaults to `28080`)
- `HEALTH_PATH` (optional, defaults to `/health`)
- `CADDY_UPSTREAM_FILE` (optional)
- `CADDY_RELOAD_CMD` (optional)
- `DRAIN_SECONDS` (optional)

### Required GitHub Environment Secrets

- `HETZNER_SSH_KEY`
- `SANITY_REVALIDATE_SECRET`

### Optional GitHub Environment Secrets (for testing/develop environments)

- `E2E_ADMIN_USERNAME`
- `E2E_ADMIN_PASSWORD`
- `E2E_BRAND_USERNAME`
- `E2E_BRAND_PASSWORD`
- `E2E_CREATOR_USERNAME`
- `E2E_CREATOR_PASSWORD`

### How the rollout works

1. Workflow syncs the repository to the server path.
2. Script builds and starts either `app_blue` or `app_green` from `docker-compose.yml`.
3. Script waits for `http://127.0.0.1:<blue|green-port>/health`.
4. On success, Caddy upstream is switched to the new color.
5. Old color is drained, then stopped.

### Build-time vs runtime environment variables

- Build-time (Docker build): all `NEXT_PUBLIC_*` values are injected so Next.js build output and client bundle are environment-correct.
- Runtime (container environment): `NEXT_PUBLIC_*` and `SANITY_REVALIDATE_SECRET` are set for server-side runtime usage, including `/api/revalidate`.
