# Base image
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pass build-time environment variables
ARG NEXT_PUBLIC_SERVER_URI
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_ACCESS_TOKEN

# Inject environment variables into the build
ENV NEXT_PUBLIC_SERVER_URI=$NEXT_PUBLIC_SERVER_URI
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_ACCESS_TOKEN=$NEXT_PUBLIC_ACCESS_TOKEN

ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js app
RUN npm run build

# Runner image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

CMD ["npm", "start"]
