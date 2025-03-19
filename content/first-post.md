---
title: "Next.js 與 React 的基礎概念"
date: "2024-03-19"
tags: ["React", "Next.js", "前端開發"]
---

# Next.js 與 React 的基礎概念

Next.js 是一個基於 React 的框架，它提供了許多開箱即用的功能，使得開發 React 應用程式變得更加簡單。

## React 的核心概念

React 是一個用於構建用戶界面的 JavaScript 庫。以下是 React 的一些核心概念：

### 組件 (Components)

React 應用程式由組件構成。組件是獨立、可重用的程式碼片段，它們返回 React 元素，描述畫面上應該出現的內容。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### JSX

JSX 是 JavaScript 的語法擴展，允許你在 JavaScript 中寫 HTML 類似的代碼。

```jsx
const element = <h1>Hello, world!</h1>;
```

### Props

Props 是從父組件傳遞到子組件的資料。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

<Welcome name="Sara" />
```

## Next.js 的特點

Next.js 擴展了 React 的功能，提供了更多開箱即用的功能：

### 路由系統

Next.js 有一個基於文件系統的路由器。你只需要在 `pages` 目錄下創建文件，Next.js 就會自動為你設定路由。

### 預渲染

Next.js 預設預渲染每個頁面，這意味著 Next.js 會提前生成 HTML，而不是完全依賴客戶端的 JavaScript。

這可以通過以下兩種方式實現：

1. **靜態生成 (Static Generation)**：HTML 在構建時生成，並在每次請求時重用。
2. **伺服器端渲染 (Server-side Rendering)**：HTML 在每次請求時生成。

### API 路由

Next.js 允許你創建 API 端點作為 Node.js 函數。

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' })
}
```

## 結論

Next.js 使開發 React 應用程式變得更加簡單和高效。它提供了許多開箱即用的功能，如檔案系統路由、預渲染和 API 路由，使得開發過程更加順暢。

$$
f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d\xi
$$

上面是一個傅立葉變換的公式，用於測試 LaTeX 功能。