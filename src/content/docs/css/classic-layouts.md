---
title: CSS 5种经典布局
description: 掌握CSS中最常用的5种经典布局方案，包括空间居中、并列式、两栏式、三明治和圣杯布局
sidebar:
  order: 2
tags:
  - CSS
  - 布局
  - Grid
  - Flexbox
category: CSS
difficulty: intermediate
---

CSS布局是前端开发的核心技能之一。本文将介绍5种最经典、最实用的CSS布局方案，帮助你应对各种布局需求。

## 1. 空间居中布局

**用途**: 将内容在容器中完全居中显示

**实现代码**:
```css
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}
```

**效果**: 内容在水平和垂直方向都居中

![空间居中布局](https://www.wangbase.com/blogimg/asset/202008/bg2020080703.jpg)

## 2. 并列式布局

**用途**: 多个项目并排显示，自动换行

**实现代码**:
```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.item {
  flex: 0 1 150px;
}
```

**关键点**:
- `flex: 0 1 150px` 表示：
  - `flex-grow: 0` - 不放大
  - `flex-shrink: 1` - 可缩小
  - `flex-basis: 150px` - 初始宽度150px

![并列式布局](https://www.wangbase.com/blogimg/asset/202008/bg2020080706.jpg)

## 3. 两栏式布局

**用途**: 侧边栏 + 主内容区域的经典布局

**实现代码**:
```css
.container {
  display: grid;
  grid-template-columns: minmax(200px, 25%) 1fr;
  gap: 20px;
}

.sidebar {
  /* 侧边栏样式 */
}

.main {
  /* 主内容区域样式 */
}
```

**特点**: 侧边栏固定宽度，主内容区域自适应剩余空间

![两栏式布局](https://www.wangbase.com/blogimg/asset/202008/bg2020080712.jpg)

## 4. 三明治布局（粘性页脚）

**用途**: 页眉、内容区、页脚的经典三栏布局，页脚始终保持在底部

**实现代码**:
```css
.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  /* 页眉样式 */
}

.content {
  /* 内容区域 */
}

.footer {
  /* 页脚样式 */
}
```

**关键点**: `grid-template-rows: auto 1fr auto` 确保内容区域占满剩余空间

![三明治布局](https://www.wangbase.com/blogimg/asset/202008/bg2020080715.jpg)

## 5. 圣杯布局

**用途**: 最完整的布局方案，包含页眉、页脚和三栏内容

**实现代码**:
```css
.container {
  display: grid;
  grid-template:
    "header header header" auto
    "left main right" 1fr
    "footer footer footer" auto
    / auto 1fr auto;
  min-height: 100vh;
}

.header {
  grid-area: header;
}

.left-sidebar {
  grid-area: left;
}

.main {
  grid-area: main;
}

.right-sidebar {
  grid-area: right;
}

.footer {
  grid-area: footer;
}
```

**特点**: 使用命名区域，结构清晰，易于维护

![圣杯布局](https://www.wangbase.com/blogimg/asset/202008/bg2020080717.jpg)

## 总结对比

| 布局类型 | 适用场景 | 技术方案 | 复杂度 |
|----------|----------|----------|--------|
| 空间居中 | 登录页、欢迎页 | Grid | ⭐ |
| 并列式 | 卡片列表、图片墙 | Flexbox | ⭐⭐ |
| 两栏式 | 博客、文档网站 | Grid | ⭐⭐ |
| 三明治 | 通用网站布局 | Grid | ⭐⭐⭐ |
| 圣杯 | 复杂后台系统 | Grid | ⭐⭐⭐⭐ |

## 最佳实践建议

1. **优先使用 Grid**: 现代浏览器支持良好，布局更直观
2. **移动端适配**: 使用媒体查询调整布局
3. **语义化**: 使用合适的HTML标签
4. **可维护性**: 使用CSS变量和命名规范

选择合适的布局方案，可以大大提高开发效率和用户体验。