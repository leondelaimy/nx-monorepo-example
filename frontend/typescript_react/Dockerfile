FROM node:22-alpine AS builder

WORKDIR /app

ENV CI=true \
  HUSKY=0 \
  NX_DAEMON=false

# Install dependencies (including devDependencies for build)
COPY package.json pnpm-lock.yaml ./
RUN corepack enable \
  && corepack prepare pnpm@10.33.2 --activate \
  && pnpm install --frozen-lockfile --strict-peer-dependencies

# Copy root metadata / lockfiles first for better Docker cache
COPY nx.json tsconfig.base.json eslint.config.mjs ./

# Copy only what we need to build this app
COPY frontend/typescript_react ./frontend/typescript_react
COPY shared/typescript_lib ./shared/typescript_lib

# Build the frontend app
RUN pnpm exec nx build frontend/typescript_react --configuration=production

# ---- Runtime image ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g serve

COPY --from=builder /app/dist/frontend/typescript_react ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
