FROM node:18-alpine AS base

# 安裝依賴階段
FROM base AS deps
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# 建置階段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 配置環境變數，忽略構建時的 ESLint 錯誤
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# 建置應用程式
RUN npm run build

# 修改 next.config.js 來支援獨立運行模式
RUN npm pkg set dependencies.sharp="latest"

# 生產階段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 建立系統用戶，用於執行應用程式
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 僅複製必要檔案
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 啟動應用程式
CMD ["node", "server.js"]
