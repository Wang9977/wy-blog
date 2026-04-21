---
title: Vite 构建工具
description: 新一代前端构建工具，基于ESM的开发服务器和Rollup打包
sidebar:
  order: 1
tags:
  - Vite
  - 构建工具
  - 前端
  - ESM
category: 开发实践
difficulty: intermediate
---

## 简介

Vite 是一个基于浏览器原生 ES modules 的开发服务器。它利用浏览器解析 imports，在服务端按需返回，跳过了打包的概念，服务器随起随用。

### 核心特性

- **Bundleless**：基于浏览器原生 ES imports 的开发服务器
- **快速冷启动**：利用原生 ESM，按需编译
- **HMR 热更新**：基于 ESM 的热更新，速度不会随模块增多而变慢
- **生产构建**：使用 Rollup 进行生产环境的打包

### 上手使用

```bash
# 使用 npm
npm init @vitejs/app

# 或者使用 yarn
yarn create @vitejs/app

# 项目创建后的步骤
cd <project-name>
npm install
npm run dev
```

## 核心概念

### Bundleless 无捆绑

基于浏览器开始原生的支持 js 模块功能，js 模块依赖于 import 和 export 特性，目前主流浏览器都支持。

### 去掉打包步骤

**传统打包的问题**：
- 通过打包工具将应用各个模块集合在一起形成 bundle
- 在不支持模块化的浏览器里使用
- 可以减少 http 请求的数量
- 但本地开发过程中打包会增加排查问题的难度，增加响应时长

**Vite 的解决方案**：
- 在本地开发命令中去除打包步骤
- 缩短了构建时常
- 按需加载模块

### 按需加载

**传统方法**：
1. 使用动态引入 `import()` 方式异步加载模块
2. 使用 `tree shaking` 等方式去掉未引用的模块

**Vite 的优势**：
- 只在某个模块被 import 的时候动态加载它
- 实现了真正的按需加载
- 减少了加载文件的体积
- 缩短了加载时长

## Vite 配置

### 基本配置

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

### 常用插件

```bash
# Vue 插件
npm install @vitejs/plugin-vue -D

# React 插件
npm install @vitejs/plugin-react -D

# TypeScript 支持
npm install @vitejs/plugin-vue-jsx -D
```

## 开发优势

### 快速启动

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 模块热替换（HMR）

Vite 提供了一套原生 ESM 的 HMR API。具有 HMR 功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。

### 依赖预构建

Vite 使用 esbuild 进行依赖预构建，比传统的 JavaScript 打包器快 10-100 倍。

## 生产构建

### Rollup 打包

Vite 使用 Rollup 进行生产环境的打包，提供了：

- **代码分割**：自动代码分割，优化加载性能
- **Tree Shaking**：去除未使用的代码
- **压缩优化**：自动压缩 JavaScript 和 CSS

### 环境变量

```js
// .env
VITE_APP_TITLE=My App

// 在代码中使用
console.log(import.meta.env.VITE_APP_TITLE)
```

## 与 Webpack 对比

| 特性 | Vite | Webpack |
|------|------|---------|
| 开发服务器启动 | 极快 | 较慢 |
| HMR 速度 | 快 | 随项目增大而变慢 |
| 配置复杂度 | 简单 | 复杂 |
| 生态成熟度 | 新兴 | 成熟 |
| 生产构建 | Rollup | Webpack |

## 最佳实践

### 项目结构

```
project/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   └── main.js
├── public/
├── vite.config.js
└── package.json
```

### 性能优化

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['lodash', 'dayjs']
        }
      }
    }
  }
})
```

## 总结

Vite 作为新一代前端构建工具，通过利用原生 ESM 和现代化的构建方式，为开发者提供了更快的开发体验和更优的生产构建。特别适合现代前端项目，尤其是 Vue 3 和 React 项目。

## 参考资料

- [Vite 官方文档](https://vitejs.dev/)
- [Vite GitHub](https://github.com/vitejs/vite)
- [为什么选 Vite](https://vitejs.dev/guide/why.html)