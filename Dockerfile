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
ENV VITE_BACKEND_DOMAIN=$BACKEND_DOMAIN
ENV VITE_BACKEND_PORT=$BACKEND_PORT
ENV VITE_API_PATTERN=$API_PATTERN
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
