---
title: CommonJS & ES6 Module
description: JavaScript模块化详解，对比CommonJS和ES6 Module的差异
sidebar:
  order: 1
tags:
  - JavaScript
  - 模块化
  - CommonJS
  - ES6 Module
category: 前端开发
difficulty: advanced
---

## 一、模块化

### 作用
- 解决全局污染和依赖管理混乱的问题
- 全局污染：每个加载的 js 文件都共享变量
- 依赖管理：正常情况下，执行 js 的先后顺序就是 script 标签排列的前后顺序，有依赖，下层可以调用上层，上层无法调用下层

## 二、CommonJS

### 应用场景
- Node 是 CommonJS 在服务端具有代表性的实现
- Browserify 是 CommonJS 在浏览器中的一种实现
- Webpack 打包工具支持 CommonJS 的转换

### 1. CommonJS 使用与原理

- CommonJS 中每一个 js 文件都是一个单独的模块，称为 module
- 核心变量包括 exports、module.exports、require
- exports、module.exports 负责对模块的内容导出
- require 负责导入其他模块的内容

#### 实现原理
- module 记录当前模块信息
- require 引入当前模块的方法
- exports 当前模块导出的属性

编译过程：
对 js 代码块进行首尾包装，形成包装函数。我们写的代码将作为包装函数的执行上下文，使用的 require exports module 通过形参传入包装函数。模块加载时，通过 runThisContext 执行 modulefunction，传入 require exports module 等参数。

### 2. require 文件加载流程

```js
const fs = require('fs')        // ①核心模块
const sayName = require('./hello.js')  //② 文件模块
const crypto = require('crypto-js')   // ③第三方自定义模块
```

- ① 为 nodejs 底层的核心模块
- ② 为我们编写的文件模块
- ③ 为我们通过 npm 下载的第三方自定义模块

#### require 加载标识符原则

- 首先像 fs、http、path 等标识符，会被作为 nodejs 的**核心模块**
- `./` 和 `../` 作为相对路径的**文件模块**， `/` 作为绝对路径的**文件模块**
- 非路径形式也非核心模块的模块，将作为**自定义模块**

### 3. Require 模块引入与处理

CommonJS 同步加载并执行模块文件，模块在执行阶段分析模块依赖，采用**深度优先遍历**，执行顺序是父-子-父。

### 4. require 避免重复加载 - 缓存

一个模块已经 require 引入了 a 模块，如果另外一个模块再次引用 a，那么会直接读取缓存值 module，所以无需再次执行模块。

### 5. exports 和 module.exports

- exports 就是传入到当前模块内的一个对象，本质上是 module.exports
- module.exports 本质上是 exports
- 也可以单独导出一个函数或者一个类

## 三、ES Module

### 优势
- 实现了 tree shaking
- `import()` 懒加载方式实现代码分割

### 导出 export 导入 import

所有通过 export 导出的属性，在 import 中可以通过解构出来。

#### 默认导出 export default

```js
// a.js
const name = '《React进阶实践指南》'
const author = '我不是外星人'
const say = function (){
    console.log('hello , world')
}
export default {
    name,
    author,
    say
}
```

```js
import mes from './a.js'
```

- `export default anything` 导入 module 的默认导出
- 对于引入默认导出的模块，`import anyName from 'module'`，anyName 可以是自定义名称

### ES6 module 特性

#### 1. 静态语法

ES6 module 的引入和导出是静态的，`import` 会自动提升到代码的顶层，`import`、`export` 不能放在块级作用域或条件语句中。

#### 2. 执行特性

- CommonJS 同步加载并执行模块文件
- ES6 模块提前加载并执行模块文件，在预处理阶段分析模块依赖，执行顺序是子 -> 父

#### 3. 导出绑定

不能直接修改 import 导入的属性：

```js
export let num = 1
export const addNumber = ()=>{
    num++
}
```

```js
// main.js
import { num, addNumber } from './a'
num = 2 // 报错

// 正确方式
import { num, addNumber } from './a'
console.log(num) // num = 1
addNumber()
console.log(num) // num = 2
```

### import 动态引入

`import()` 返回一个 `Promise` 对象，返回的 `Promise` 的 then 成功回调中，可以获取模块的加载成功信息。

## 四、总结

### CommonJS 特性
1. 由 JS 运行时实现
2. 单个值导出，本质上导出的是 exports 属性
3. 可以动态加载，对每一个加载都存在缓存，可以有效的解决循环引用问题
4. 同步加载并执行模块文件

### ES Module 特性
1. 静态的，不能放在块级作用域内，代码发生在编译时
2. 动态绑定，可以通过导出方法修改，可以直接访问修改结果
3. 可以导出多个属性和方法，可以单个导出，混合导入导出
4. 提前加载并执行
5. 导入模块在严格模式下
6. 容易实现 tree shaking 和代码分割 code splitting