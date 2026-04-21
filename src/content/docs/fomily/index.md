---
title: Fomily 表单框架
description: Fomily 表单框架文档和核心概念介绍
sidebar:
  order: 1
tags:
  - 表单
  - 框架
  - React
category: 前端框架
difficulty: advanced
---

# Fomily 表单框架

Fomily 是一个现代化的表单解决方案，专为 React 应用设计，提供完整的表单状态管理、验证和交互功能。它采用响应式架构，支持复杂的表单场景，同时保持简洁的API设计。

## 🌟 核心特性

- **🎯 类型安全**: 完整的 TypeScript 支持
- **⚡ 高性能**: 基于 Proxy 的响应式系统
- **🔧 可扩展**: 插件系统和自定义渲染器
- **📦 轻量级**: 核心库体积小，按需加载
- **🎨 灵活**: 支持多种UI框架集成

## 🏗️ 核心概念

- **Form 类**: 表单的核心控制器，管理整个表单状态
- **Field 组件**: 表单字段的抽象，处理单个字段逻辑
- **Heart 系统**: 生命周期管理，协调各组件交互
- **Graph 模型**: 表单数据结构，支持嵌套和数组

## 📚 文档结构

### 核心概念
- [Form 类详解](/fomily/core/form/) - 表单核心API和使用指南
- [生命周期系统](/fomily/core/lifecycle/) - Heart系统工作原理
- [响应式原理](/fomily/core/observe/) - 数据响应机制详解
- [核心架构](/fomily/core/heart/) - 框架设计理念和实现

### 进阶指南
- 自定义验证规则
- 复杂表单场景处理
- 性能优化技巧
- 与其他UI库集成

## 🚀 快速开始

```bash
npm install fomily
```

```typescript
import { Form } from 'fomily';

const form = new Form({
  initialValues: { name: '', email: '' },
  onSubmit: async (values) => {
    console.log('提交:', values);
  }
});

// 在React组件中使用
function MyForm() {
  return (
    <form onSubmit={form.handleSubmit}>
      <input {...form.field('name').props} />
      <input {...form.field('email').props} />
      <button type="submit">提交</button>
    </form>
  );
}
```
