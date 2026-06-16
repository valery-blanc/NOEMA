# NOÊMA — CMS (Payload v3 / Next.js) — image autonome (output: standalone)
# Contexte de build = apps/cms (app installable indépendamment, versions épinglées).

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat && npm install -g pnpm@10
WORKDIR /app

# --- deps ---
FROM base AS deps
COPY package.json ./
RUN pnpm install --no-frozen-lockfile

# --- build ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Pas de connexion DB requise au build (bundle admin uniquement).
RUN pnpm run build

# --- runtime ---
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 nextjs
COPY --from=builder /app/public ./public
# Dossier des médias téléversés : créé et possédé par nextjs AVANT le montage du volume,
# pour que le volume nommé `media_data` hérite des bons droits (sinon uploads = Permission denied).
RUN mkdir .next media && chown nextjs:nodejs .next media
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
