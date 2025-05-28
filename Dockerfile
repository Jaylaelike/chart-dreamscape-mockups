# Multi-stage build for React/Vite + Node.js application
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./
# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy environment file
COPY .env .env

# Generate Prisma client
RUN npm install -g pnpm
RUN npx prisma generate

# Build the frontend application
RUN pnpm run build

# Production stage
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser

# Copy built application and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env

# Ensure proper permissions for database directory
RUN chown -R appuser:appgroup /app

USER appuser

# Expose ports
EXPOSE 8080 5300

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://172.16.202.63:5300/api/sla-metrics', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start both services
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js & npx vite preview --host 0.0.0.0 --port 8080 & wait"]
