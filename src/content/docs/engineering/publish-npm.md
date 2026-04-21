---
title: 发布 NPM 包
description: 如何创建、发布和维护一个NPM包，包括版本管理和最佳实践
sidebar:
  order: 3
tags:
  - NPM
  - 包管理
  - 发布
  - 开源
category: 开发实践
difficulty: intermediate
---

> 纯 js 包，没有其他设置
>
> 项目 package.json type 属性默认 common.js

## 创建项目

创建一个文件夹目录：

```bash
mkdir my-npm-demo
cd my-npm-demo
```

## 初始化

```bash
npm init
```

按照提示填写包的信息：
- 包名（必须是唯一的）
- 版本号
- 描述
- 入口文件
- 测试命令
- 仓库地址
- 关键字
- 作者
- 许可证

## 编写代码

创建一个简单的 JavaScript 文件：

```js
// index.js
function greet(name) {
  return `Hello, ${name}!`;
}

function add(a, b) {
  return a + b;
}

module.exports = {
  greet,
  add
};
```

或者使用 ES6 模块语法：

```js
// index.js
export function greet(name) {
  return `Hello, ${name}!`;
}

export function add(a, b) {
  return a + b;
}
```

记得在 package.json 中设置正确的 type：

```json
{
  "type": "module",  // 如果使用 ES6 模块
  "main": "index.js"
}
```

## 登录 NPM

没有账号，去 [NPM 官网](https://www.npmjs.com/) 注册。

```bash
npm login
```

按照提示输入用户名、密码和邮箱。

## 发布 NPM 包

```bash
npm publish
```

首次发布成功后，你的包就可以在 NPM 上被搜索和安装了。

## 在其他项目中使用

```bash
npm install my-npm-demo --save
```

```js
// 使用 CommonJS
const { greet, add } = require('my-npm-demo');

// 使用 ES6 模块
import { greet, add } from 'my-npm-demo';

console.log(greet('World')); // Hello, World!
console.log(add(1, 2)); // 3
```

## 更新 NPM 包

### 更新版本号

NPM 使用语义化版本控制（SemVer）：

```bash
# 小变动，比如修复 bug 等，版本号变动 v1.0.0 -> v1.0.1
npm version patch

# 增加新功能，不影响现有功能，版本号变动 v1.0.0 -> v1.1.0
npm version minor

# 破坏模块对向后的兼容性，版本号变动 v1.0.0 -> v2.0.0
npm version major
```

### 发布更新

```bash
npm publish
```

## 查看 NPM 版本

```bash
# 查看所有版本
npm view my-npm-demo versions

# 查看最新版本
npm view my-npm-demo version

# 查看包信息
npm view my-npm-demo
```

## 废弃 NPM 包（使用会出现警告）

```bash
npm deprecate my-npm-demo@1.0.0 'test deprecate'
```

这会给用户一个警告，但不会阻止包的安装。

## 删除 NPM 包（删除的包不能再使用）

⚠️ **注意**：
- 删除的版本 24 小时后方可重发！
- 只有发布 72 小时之内的包可以删除！

```bash
npm unpublish my-npm-demo --force
```

## 最佳实践

### 1. 包命名规范

- 使用小写字母和连字符
- 名称要简洁明了
- 避免使用过于通用的名称
- 检查名称是否已被占用

### 2. 版本管理

- 遵循语义化版本控制
- 使用 npm version 命令更新版本
- 在 CHANGELOG.md 中记录版本变更

### 3. 文档完善

- 提供清晰的 README.md
- 包含安装和使用示例
- 说明 API 和配置选项
- 提供完整的文档网站（可选）

### 4. 测试覆盖

```bash
npm install jest --save-dev
```

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### 5. 持续集成

使用 GitHub Actions 或其他 CI/CD 工具：

```yaml
# .github/workflows/publish.yml
name: Publish to NPM
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 常见问题解决

### 1. 包名已被占用

```bash
# 检查包名是否可用
npm view 包名

# 如果已被占用，选择其他名称
```

### 2. 发布失败

```bash
# 检查网络连接
ping registry.npmjs.org

# 检查登录状态
npm whoami

# 重新登录
npm login
```

### 3. 版本冲突

```bash
# 强制发布（谨慎使用）
npm publish --force
```

## 参考资料

- [如何自己写一个公用的 NPM 包](https://segmentfault.com/a/1190000010521272)
- [如何发布一个 npm 包](https://segmentfault.com/a/1190000015766869)
- [如何发布自己的 NPM 包](https://juejin.cn/post/6844903673684836365)
- [废弃/删除 npm 包](https://segmentfault.com/a/1190000017479985)
- [NPM 官方文档](https://docs.npmjs.com/)