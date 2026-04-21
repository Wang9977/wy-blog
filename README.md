# Yuna Tech Blog

个人技术博客，基于 Astro + Starlight 构建，专注于分享前端开发、CSS 布局、Git 使用等实用技术知识。

## 🚀 项目特点

- **现代化架构**: 基于 Astro 框架，性能优异
- **文档友好**: 使用 Starlight 主题，专为技术文档优化
- **响应式设计**: 完美适配各种设备
- **TypeScript 支持**: 完整的类型安全保障
- **SEO 优化**: 内置搜索引擎优化

## 📁 项目结构

```
├── src/
│   ├── assets/          # 静态资源
│   ├── content/         # 文档内容
│   │   ├── css/         # CSS 相关文章
│   │   ├── git/         # Git 相关文章
│   │   ├── guides/      # 指南文档
│   │   └── reference/   # 参考文档
│   ├── styles/          # 自定义样式
│   ├── types/           # TypeScript 类型定义
│   └── utils/           # 工具函数
├── public/              # 公共静态文件
├── astro.config.mjs     # Astro 配置
└── tsconfig.json        # TypeScript 配置
```

## 🛠️ 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [Starlight](https://starlight.astro.build/) - 文档主题
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Markdown](https://daringfireball.net/projects/markdown/) - 内容编写

## 🚦 开发指南

### 安装依赖

```bash
npm install
# 或使用 pnpm
pnpm install
```

### 本地开发

```bash
npm run dev
# 或使用 pnpm
pnpm dev
```

访问 `http://localhost:4321` 查看站点。

### 构建生产版本

```bash
npm run build
# 或使用 pnpm
pnpm build
```

### 代码检查

```bash
# 类型检查
npm run type-check

# ESLint 检查
npm run lint

# 格式化代码
npm run format
```

## 📝 写作指南

### 文档格式

所有文档使用 Markdown 格式，支持以下 frontmatter 元数据：

```yaml
---
title: 文章标题
description: 文章描述
sidebar:
  order: 1  # 侧边栏排序
tags:
  - css
  - layout
category: CSS
difficulty: intermediate  # beginner | intermediate | advanced
---
```

### 文件命名规范

- 使用英文小写字母
- 单词间使用连字符连接
- 示例：`css-flexbox-guide.md`, `git-commands.md`

## 🎨 自定义样式

自定义样式位于 `src/styles/custom.css`，包含：

- 品牌色彩变量
- 代码块样式优化
- 图片样式优化
- 响应式设计

## 📊 内容管理

### 添加新文章

1. 在相应目录下创建 `.md` 文件
2. 添加必要的 frontmatter 信息
3. 编写内容

### 内容元数据

支持以下扩展字段：

- `tags`: 文章标签
- `category`: 文章分类
- `difficulty`: 难度等级
- `readingTime`: 阅读时间（自动计算）

## 🌐 部署

项目配置为 GitHub Pages 部署：

1. 推送到 `main` 分支
2. GitHub Actions 自动构建和部署
3. 访问 `https://wang9977.github.io/wy-blog/`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- GitHub: [@Wang9977](https://github.com/Wang9977)
