# NOÊMA — image du front Astro, utilisée par le service « publisher ».
# Contient les sources + Astro ; reconstruit le statique à la demande (publisher.mjs).
FROM node:22-alpine
RUN apk add --no-cache wget && npm install -g pnpm@10
WORKDIR /app
COPY package.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
EXPOSE 9000
CMD ["node", "publisher.mjs"]
