---
title: JSDoc 使用
description: JavaScript代码文档生成工具，通过注释生成API文档
sidebar:
  order: 4
tags:
  - JSDoc
  - 文档
  - API
  - 注释
category: 开发实践
difficulty: intermediate
---

## 简介

JSDoc 3 是 JavaScript 的 API 文档生成器，类似于 Javadoc 或 phpDocumentor。可以通过为源代码添加固定格式的注释，JSDoc 工具将扫描源代码及其注释并生成一个 HTML 文档网站。

## 功能

- **API 文档展示**：根据 JS 的 API 注释，生成文档网页展示相应信息，如展示方法参数、返回类型、例子等
- **标准化注释**：JSDoc 注释通常应放置在文档记录之前，每个注释必须以一个 `/**` 序列开头才能被 JSDoc 解析器识别

## 安装

```bash
# 全局安装
npm install -g jsdoc

# 或者作为开发依赖
npm install --save-dev jsdoc
```

## 使用

### 单个文件

```bash
# 生成单个文件的文档
jsdoc index.js
```

### 多个文件

通过配置 `conf.json`，然后执行：

```bash
jsdoc -c conf.json
```

## JSDoc 配置文件

创建 `conf.json` 文件：

```json
{
  "source": {
    "include": ["./src/utils/", "README.md"],
    "exclude": [],
    "includePattern": ".+\\.js(doc)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "template": "node_modules/docdash",
    "encoding": "utf8",
    "destination": "./out/",
    "recurse": true,
    "verbose": true
  },
  "tags": {
    "allowUnknownTags": true
  },
  "templates": {
    "cleverLinks": true,
    "default": {
      "outputSourceFiles": true,
      "includeDate": false,
      "useLongnameInNav": false,
      "systemName": "Common Modules",
      "footer": "",
      "navType": "vertical"
    }
  },
  "docdash": {
    "search": true,
    "collapse": true,
    "footer": "",
    "sort": true,
    "meta": {
      "title": "函数工具库",
      "description": "日常 JavaScript 函数工具库，方便查看",
      "keyword": "javaScript, utils, jsdoc"
    },
    "menu": {
      "GitLab": {
        "href": "https://git.jd.com/label-fe/js-utils",
        "class": "menu-item",
        "id": "website_link"
      }
    }
  }
}
```

## 注释语法

### 基本注释结构

```js
/**
 * 函数描述
 * @param {类型} 参数名 参数描述
 * @returns {类型} 返回值描述
 * @example 使用示例
 */
```

### 实际示例

```js
/**
 * 两个数组的交集
 * @author w
 * @param {Array} arr1 数组1
 * @param {Array} arr2 数组2
 * @returns {Array} 数组1和数组2重复的部分
 * @example
 * const arr1 = [1,2,3]
 * const arr2 = [2,3,4]
 * getArrRepeat(arr1,arr2) => [2,3]
 */
export function getArrRepeat (arr1, arr2) {
  return arr1.filter((item) => {
    return arr2.includes(item)
  })
}
```

### 常用标签

| 标签 | 说明 | 示例 |
|------|------|------|
| `@author` | 作者 | `@author John Doe` |
| `@param` | 函数参数 | `@param {string} name 用户名` |
| `@returns` | 返回值 | `@returns {number} 计算结果` |
| `@example` | 使用示例 | `@example add(1, 2)` |
| `@throws` | 异常 | `@throws {Error} 参数错误` |
| `@deprecated` | 已废弃 | `@deprecated 使用新方法` |
| `@since` | 从哪个版本开始 | `@since 1.0.0` |
| `@see` | 参考链接 | `@see https://example.com` |

### 类注释

```js
/**
 * 用户类
 * @class
 * @classdesc 表示一个系统用户
 */
class User {
  /**
   * 创建用户
   * @param {string} name 用户名
   * @param {number} age 年龄
   */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  /**
   * 获取用户信息
   * @returns {string} 用户信息字符串
   */
  getInfo() {
    return `${this.name} is ${this.age} years old`;
  }
}
```

### 模块注释

```js
/**
 * 数组工具函数模块
 * @module ArrayUtils
 */

/**
 * 数组去重
 * @function
 * @param {Array} arr 输入数组
 * @returns {Array} 去重后的数组
 */
export function unique(arr) {
  return [...new Set(arr)];
}
```

## 遇到的问题及解决

### 1. 函数不分类

**问题**：扫描后的函数函数不分类，默认在 GLOBAL 里面，我们希望数组操作的函数都写 array 分类下

**解决**：在 array.js 里面顶部写 `@module Array`，这样写后 array.js 里面所有的函数都在 module/array 分组下

```js
// array.js
/**
 * @module Array
 */

/**
 * 数组去重
 * @param {Array} arr 输入数组
 * @returns {Array} 去重后的数组
 */
export function unique(arr) {
  return [...new Set(arr)];
}
```

### 2. 私有方法隐藏

```js
/**
 * 私有方法，不显示在文档中
 * @private
 */
function privateMethod() {
  // ...
}
```

### 3. 忽略某些文件

在配置文件中设置 exclude 模式：

```json
{
  "source": {
    "exclude": ["node_modules/", "test/"]
  }
}
```

## 生成文档

### 基本命令

```bash
# 生成文档
jsdoc -c conf.json

# 生成并打开文档
jsdoc -c conf.json && open out/index.html
```

### 使用模板

```bash
# 安装 docdash 模板
npm install docdash --save-dev

# 在配置中指定模板
{
  "opts": {
    "template": "node_modules/docdash"
  }
}
```

## 集成到构建流程

### package.json 脚本

```json
{
  "scripts": {
    "docs": "jsdoc -c conf.json",
    "docs:watch": "nodemon --watch src --exec 'npm run docs'",
    "docs:serve": "http-server out -p 8080"
  }
}
```

### CI/CD 集成

```yaml
# GitHub Actions
name: Generate Docs
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run docs
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 最佳实践

### 1. 注释规范

- 每个公共函数都应该有完整的 JSDoc 注释
- 参数和返回值类型要明确
- 提供使用示例
- 保持注释与代码同步更新

### 2. 文档结构

```
docs/
├── conf.json          # JSDoc 配置
├── README.md          # 文档说明
└── src/
    ├── modules/       # 模块文档
    └── examples/      # 示例代码
```

### 3. 自动化

- 将文档生成集成到 CI/CD 流程
- 设置文档自动部署
- 使用代码审查确保注释质量

## 总结

JSDoc 是一个强大的文档生成工具，通过标准化的注释格式，可以自动生成美观、易用的 API 文档。结合现代开发流程，可以实现文档的自动化生成和维护，提高项目的可维护性和团队协作效率。

## 参考资料

- [JSDoc 官方文档](https://jsdoc.app/)
- [JSDoc GitHub](https://github.com/jsdoc/jsdoc)
- [Docdash 主题](https://github.com/clenemt/docdash)