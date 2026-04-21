---
title: 生命周期系统
description: Fomily 表单框架的 Heart 生命周期管理系统
sidebar:
  order: 2
tags:
  - 生命周期
  - Heart系统
  - 状态管理
category: Fomily
difficulty: advanced
---

# 生命周期系统

## Heart 系统概述

Heart 系统是 Fomily 表单框架的核心生命周期管理机制，负责协调表单各个组件之间的状态和交互。

## 生命周期阶段

### 1. 初始化阶段
- `heart.create`: 表单实例创建
- `heart.init`: 表单初始化
- `heart.mount`: 表单挂载

### 2. 交互阶段
- `heart.change`: 值变化
- `heart.validate`: 验证触发
- `heart.error`: 错误处理

### 3. 提交阶段
- `heart.submit`: 提交开始
- `heart.success`: 提交成功
- `heart.fail`: 提交失败

## 生命周期钩子

```typescript
form.heart.on('change', (payload) => {
  console.log('字段变化:', payload);
});

form.heart.on('validate', (payload) => {
  console.log('验证触发:', payload);
});
```

## 自定义生命周期

可以通过扩展 Heart 系统来自定义生命周期行为：

```typescript
class CustomHeart extends Heart {
  onChange(payload) {
    super.onChange(payload);
    // 自定义逻辑
    console.log('自定义变化处理');
  }
}