---
title: Husky 代码规范
description: 使用Git钩子实现代码规范检查，包括commit规范、ESLint检查等
sidebar:
  order: 2
tags:
  - Husky
  - Git钩子
  - 代码规范
  - ESLint
category: 开发实践
difficulty: intermediate
---

## 简介

Git hooks 是 git 执行特定事件后触发运行的脚本，没有设置时可以忽略。

Husky 是 git hooks 工具，为 git 增加 hook 的工具。

比如：pre-commit 钩子会在执行 git commit 命令时触发，可以做一些 lint 检查、单元测试、代码美化等操作。

## 安装使用

### 1. 安装 Husky

```bash
# 将 husky 添加到项目的开发依赖中
npm install husky --save-dev
```

### 2. 配置 package.json

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

prepare 脚本会在 `npm install`（不带参数）之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 `husky install` 命令，该命令会创建 `.husky/` 目录，并指定该目录为 git hooks 所在的目录。

### 3. 添加 Git Hooks

```bash
# 添加 pre-commit 钩子
npx husky add .husky/pre-commit "npm run test"

# 添加 commit-msg 钩子
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

运行完命令后会在 `.husky/` 目录下新增对应的 shell 脚本。

## 对应钩子函数

### 1. commit-msg 实现 commit 信息规范化

验证 commit 信息是否符合规范。

#### 配置 commit-msg 钩子

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# npx 是 npm 的一个免安装工具
# 本质就是可以临时 download 执行某个二进制
npx --no-install commitlint --edit $1
```

#### 配置 commitlint

在根目录下配置 `.commitlintrc.js` 文件：

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      // 数组中第一位为 level，可选 0,1,2，0 为 disable，1 为 warning，2 为 error
      // 第二位为应用与否，可选 always|never
      // 第三位该 rule 的值
      'type-enum': [
        2,
        'always',
        ['feat', 'fix', 'docs', 'refactor', 'style', 'perf', 'test', 'chore']
      ],
      'type-case': [0],
      'type-empty': [0],
      'scope-empty': [0],
      'scope-case': [0],
      'subject-full-stop': [0, 'never'],
      'subject-case': [0, 'never'],
      'header-max-length': [0, 'always', 72]
    }
  };
```

#### Commit 类型规范

- **feat**: 新功能（feature）
- **fix**: 修补 bug
- **docs**: 文档（documentation）
- **style**: 格式（不影响代码运行的变动）
- **refactor**: 重构（即不是新增功能，也不是修改 bug 的代码变动）
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动

#### 示例

符合规范的 commit 通过：
```bash
git commit -m "feat: 添加用户登录功能"
```

不符合规范的不通过，commit 失败，需要重新 commit。

#### 跳过校验

```bash
git commit --no-verify -m "跳过校验的提交"
```

### 2. pre-commit 提交前做 ESLint 检查

格式化代码 eslint。

#### 配置 pre-commit 钩子

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 这里就是唤醒 lint-staged
npx lint-staged
```

#### 配置 lint-staged

在 package.json 里面配置：

```json
{
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix"
    ]
  }
}
```

在 git commit 的时候，对 add 过的 js/vue 文件，进行 eslint-fix，并把修复后的代码重新 add。

#### 配置 ESLint

在根目录下，添加 `.eslintrc.js`，配置相应的格式：

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```

## 完整配置示例

### package.json

```json
{
  "name": "my-project",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "eslint --fix"
    ],
    "*.{css,scss,less,styl}": [
      "stylelint --fix"
    ]
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^13.0.0",
    "eslint": "^8.0.0",
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0"
  }
}
```

### .husky/pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### .husky/commit-msg

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

## 常见问题解决

### 1. Husky 安装失败

```bash
# 确保使用正确的安装命令
npm install husky --save-dev

# 如果仍然失败，尝试清除缓存
npm cache clean --force
```

### 2. 钩子不执行

```bash
# 检查钩子文件是否有执行权限
ls -la .husky/

# 添加执行权限
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### 3. Windows 系统问题

在 Windows 系统上，可能需要额外的配置：

```bash
# 安装 cross-env
npm install cross-env --save-dev

# 修改钩子脚本
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

cross-env npx lint-staged
```

## 总结

Husky 解决了不同 IDE 需要本地配置代码格式的问题，通过 Git 钩子在团队开发中实现统一的代码规范，逐渐实现代码规范化。

## 参考资料

- [Husky 官方文档](https://typicode.github.io/husky/)
- [Commitlint 官方文档](https://commitlint.js.org/)
- [给 Husky 添加 commitlint 钩子](https://commitlint.js.org/#/guides-local-setup?id=install-husky)