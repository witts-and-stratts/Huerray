# syntax=docker.io/docker/dockerfile:1
FROM node:24-alpine3.21 AS base
ARG ENVIRONMENT=dev

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install ci

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_TIMEOUT
ARG NEXT_PUBLIC_NOTIFICATIONS_REFETCH_INTERVAL
ARG NEXT_PUBLIC_PROFILE_REFRESH_INTERVAL
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_CLOUDFLARE_SITE_KEY
ARG NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY

ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_API_TIMEOUT=${NEXT_PUBLIC_API_TIMEOUT}
ENV NEXT_PUBLIC_NOTIFICATIONS_REFETCH_INTERVAL=${NEXT_PUBLIC_NOTIFICATIONS_REFETCH_INTERVAL}
ENV NEXT_PUBLIC_PROFILE_REFRESH_INTERVAL=${NEXT_PUBLIC_PROFILE_REFRESH_INTERVAL}
ENV NEXT_PUBLIC_SANITY_DATASET=${NEXT_PUBLIC_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${NEXT_PUBLIC_SANITY_PROJECT_ID}
ENV NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=${NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
ENV NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY=${NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY}

ENV NODE_ENV=production

# RUN npm run build
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]
