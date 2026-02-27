# =========================================
# Stage 1: Build the Analog.js Application
# =========================================
ARG NODE_VERSION=24.12.0-alpine
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --link package.json package-lock.json* ./
RUN npm ci
COPY --link . .
RUN npm run build

# =========================================
# Stage 2: Run the Analog.js Server
# =========================================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
COPY --link --from=builder /app/dist/analog ./
USER node 
EXPOSE 3000

ENTRYPOINT ["node", "server/index.mjs"]