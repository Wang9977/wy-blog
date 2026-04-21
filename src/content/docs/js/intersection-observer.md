---
title: Intersection Observer API
description: 异步观察目标元素与视口交集变化的方法，用于懒加载、无限滚动等场景
sidebar:
  order: 4
tags:
  - JavaScript
  - DOM
  - API
  - 性能优化
category: 前端开发
difficulty: advanced
---

> Intersection Observer API 提供了一种异步观察目标元素与祖先元素或顶级文档视口viewport的交集变化的方法。这个API叫做交叉观察器。

## 使用场景

- **图片懒加载** - 图片滚动到可见时再加载
- **内容无限滚动** - 当用户滚动到底部时加载更多内容
- **检测广告的曝光情况** - 为了计算广告收益，需要知道广告元素的曝光情况
- **在用户看见某个区域时执行任务或播放动画** - 提升用户体验

## 痛点

传统位置计算的方式，依赖于对 DOM 状态的轮询计算，然而这种方式会在主线程里密集执行从而造成页面性能问题。

getBoundingClientRect() 的频繁调用也可能引发浏览器的样式重计算和布局。如果是在 iframe 里，因为同源策略，我们不能直接访问元素，也就很难用传统方式去处理 iframe 里的元素。

Intersection Observer 的设计，就是为了更方便的处理元素的可视问题。使用 Intersection Observer 我们可以很容易的监控元素进入和离开可视窗口，实现节点的预加载和延迟加载。Intersection Observer 并不是基于像素变化的实时计算，它的反馈会有一定的延时，这种异步的方式减少了对 DOM 和 style 查询的昂贵计算和持续轮询，相比传统方式降低了 CPU、GPU 的消耗。

## 原理

注册一个回调函数，每当被监听的元素进入或退出另一个元素时，或者两个元素的相交部分发生变化时，该回调方法会被触发执行。

> ⚠️ 注意 Intersection Observer API 无法提供重叠的像素个数或者具体哪个像素重叠，更常见的使用方式是——当两个元素相交比例在 N% 左右时，触发回调，以执行某些逻辑。

> 一旦 IntersectionObserver 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。

## 概念及用法

### 概念

配置一个回调函数，触发时机：
1. 每当目标元素target与视窗（或其他指定元素）发生交集的时候执行
2. Observer 第一次监听目标元素的时候

### 创建一个 IntersectionObserver 对象

创建一个 IntersectionObserver 对象，并传入相应参数和回调函数，该回调函数将会在目标(**target**)元素和根(**root**)元素的交集大小超过阈值(**threshold**)规定的大小时候被执行。

```js
let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);
```

阈值为1.0意味着目标元素完全出现在 root 选项指定的元素中可见时，回调函数将会被执行。

### IntersectionObserver 对象参数

#### callback回调函数

当元素可见比例超过指定阈值后，会调用一次回调函数，这个回调函数有两个参数 entries 和 observer。

**entries**：一个 `IntersectionObserverEntry` 对象的数组。

**observer**: 被调用的 `IntersectionObserver` 实例。

#### entries

```js
let callback = (entries, observer) => {
  entries.forEach(entry => {
    // 每个entry都描述了一个观察到的目标元素交集的变化
    // entry.boundingClientRect
    // entry.intersectionRatio
    // entry.intersectionRect
    // entry.isIntersecting
    // entry.rootBounds
    // entry.target
    // entry.time
  });
};
```

### IntersectionObserverEntry 对象

**boundingClientRect**
返回包含目标元素（被检测的元素）的边界信息的 `DOMRectReadOnly`。边界的计算方式与 `Element.getBoundingClientRect()` 相同。

**intersectionRatio**
返回 `intersectionRect` 与 `boundingClientRect` 的比例值。

一个介于 0.0 和 1.0 之间的数字，表示在根的相交矩形内实际可见的目标元素有多少。更准确地说，该值是相交矩形 (intersectionRect) 的面积与目标边界矩形 (boundingClientRect) 的面积之比。

**intersectionRect**
目标元素与视口（或根元素）的交叉区域的信息。

**isIntersecting**
布尔值，如果目标元素与交叉区域观察者对象的根相交，则返回 true，不相交返回 false。

**rootBounds**
根元素的矩形区域的信息，`getBoundingClientRect()` 方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null。

**target**
被检测的元素（目标元素），是一个 DOM 节点对象。

**time**
返回一个记录从 `IntersectionObserver` 的时间原点到交叉被触发的时间的时间戳。

### options对象

**root**
- 指定根元素，必须是target元素的父级元素
- 未指定或为`null`则默认浏览器视窗
- 顶级文档视窗 viewport

> ⚠️ 视口当前可见的部分叫做**可视视口**，可视视口比布局视口更小，缩小缩放时，布局视口不变，可视视口变小

**rootMargin**
- 根元素的外边距，可以是百分比
- 用作 root元素和target元素发生交集的区域范围，使用可以控制root元素每一边的收缩和扩张
- 默认0px

**threshold**
- 可以是number，也可以是number Array
- target元素和root元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行
- 默认值是0（意味着只要有一个 target 像素出现在 root 元素中，回调函数将会被执行）
- 该值为1.0含义是当 target 完全出现在 root 元素中时候回调才会被执行

### 方法

| 方法 | 说明 |
|------|------|
| observe() | 开始监听一个目标元素 |
| unobserve() | 停止监听特定目标元素 |
| takeRecords() | 返回所有观察目标的 IntersectionObserverEntry 对象数组 |
| disconnect() | 使 IntersectionObserver 对象停止全部监听工作 |

```js
// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```

### 兼容性

总体来说 `IntersectionObserver` 在检测元素进入视口区域来说提供了极大的便利性。但是在使用的时候需要考虑兼容性（可以使用 intersection-observer-polyfill 解决）。

> ⚠️ 建议设置的观察视口是上一级的可滚动的元素，如果 root 是视口而且上一级有滚动元素的时候会有一些问题

## 总结

Intersection Observer API 是现代 Web 开发中非常有用的 API，它提供了一种高效的方式来检测元素的可见性变化，避免了传统方法中的性能问题。通过异步的方式监听元素与视口的交叉状态，可以很好地实现懒加载、无限滚动、广告曝光统计等功能。