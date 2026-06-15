# NOÊMA — builder du front Astro (SSG).
# Service "one-shot" : attend le CMS, génère le statique dans /out (volume partagé),
# puis se termine. Un conteneur nginx sert ensuite /out. Runtime web = nginx seul (RAM mini).
FROM node:22-alpine
RUN npm install -g pnpm@10
WORKDIR /app
COPY package.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
