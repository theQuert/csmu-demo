# Docker 部署指南

本文件說明如何使用 Docker 和 Docker Compose 部署此 Next.js 應用程式。

## 系統需求

- Docker 安裝版本 20.10.0 或更高
- Docker Compose 安裝版本 2.0.0 或更高

## 部署步驟

### 1. 建置和啟動容器

在專案根目錄執行以下命令：

```bash
docker-compose up -d --build
```

此命令會:
- 建置 Docker 映像檔
- 在背景啟動容器
- 將應用程式部署在 http://localhost:6350

### 2. 檢視日誌

查看應用程式日誌：

```bash
docker-compose logs -f
```

### 3. 停止服務

停止運行中的容器：

```bash
docker-compose down
```

## 部署環境變數

如需配置環境變數，可以在 `docker-compose.yml` 檔案中的 `environment` 區段進行設定：

```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  # 添加其他環境變數
```

## 資料持久化

若需要持久化內容資料，請取消註解 `docker-compose.yml` 中的 volumes 設定：

```yaml
volumes:
  - ./content:/app/content
```

## 故障排除

1. 如果遇到埠號衝突，可以在 `docker-compose.yml` 中修改 ports 設定：

```yaml
ports:
  - "其他埠號:3000"
```

2. 若遇到建置問題，可以嘗試清理 Docker 快取：

```bash
docker builder prune -f
```
