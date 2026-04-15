FROM node:24-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
ENV CI=true
ARG BACKEND_DOMAIN=localhost
ARG BACKEND_PORT=8000
ARG API_PATTERN=api
ARG TELEGRAM_URL=https://t.me/your_username
ARG WHATSAPP_URL=https://wa.me/70000000000
ENV VITE_BACKEND_DOMAIN=$BACKEND_DOMAIN
ENV VITE_BACKEND_PORT=$BACKEND_PORT
ENV VITE_API_PATTERN=$API_PATTERN
ENV VITE_TELEGRAM_URL=$TELEGRAM_URL
ENV VITE_WHATSAPP_URL=$WHATSAPP_URL
RUN rm -rf .angular dist node_modules/.vite
RUN pnpm run build

FROM node:24-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/dist ./dist
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/analog/server/index.mjs"]