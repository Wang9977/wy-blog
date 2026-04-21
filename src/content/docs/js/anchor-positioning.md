---
title: 锚点定位
description: 页面滚动和锚点定位技术，包括scrollIntoView、Intersection Observer等
sidebar:
  order: 3
tags:
  - JavaScript
  - DOM
  - 滚动
  - 定位
category: 前端开发
difficulty: intermediate
---

## 1. href 锚点

缺点：点击锚点浏览器URL变化，刷新会出现问题

```vue
<h2>
    <a href="#div1">to div1</a>
    <a href="#div2">to div2</a>
    <a href="#div3">to div3</a>
</h2>
    <div id="div1">div1</div>
    <div id="div2">div2</div>
    <div id="div3">div3</div>
```

F5刷新在Chrome浏览器下，这个过程由三部曲完成：首先，滚动高度为`0`；其次，锚点定位高度；最后，还原成刷新之前滚动条的滚动高度。

## 2. window.location.hash方法

缺点：地址变化

## 3. animate属性

优点：URL地址不会变，同时点击锚点时自动响应scroll事件，不需要重新绑定

缺点：页面复杂偏移值需要重新计算

## 4. scrollIntoView方法（推荐）

```js
document.getElementById("divId").scrollIntoView();

比如：

document.querySelector("#roll1").onclick = function(){
      document.querySelector("#roll1_top").scrollIntoView(true);
}
```

优点：URL不会变，同时能够响应相应的scroll事件

### 参数

**alignToTop（可选）**
- 值为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐
- 值为false，元素的底端将和其所在滚动区的可视区域的底端对齐

**scrollIntoViewOptions（可选）** 该参数为对象形式
- `behavior`（可选）：定义动画过渡效果，值为 `auto` 或 `smooth` 之一。默认为 `auto`
- `block`（可选）：定义垂直方向的对齐，值为 `start`, `center`, `end`, 或 `nearest` 之一。默认为 `start`
- `inline`（可选）：定义水平方向的对齐，值为 `start`, `center`, `end`, 或 `nearest` 之一。默认为 `nearest`

## 平滑滚动

### CSS属性 scroll-behavior

MDN介绍：当用户手动导航或者CSSOM scrolling API触发滚动操作时，scroll-behavior为一个滚动框指定滚动行为，其他滚动不受影响。在根元素中指定这个属性时，它反而适用于视窗。

该属性有2个值可选：
- **auto**：滚动框立即滚动，即默认效果，没有平滑滚动效果
- **smooth**：有平滑滚动效果

缺点：兼容性。不支持IE

### scrollIntoView

JS实现scroll-behavior，实现效果多，IE也支持让元素进入视区通过触发滚动容器实现

例子：

```js
document.links[0].scrollIntoView({
    behavior: "smooth"
});
```

## Intersection Observer

> Intersection Observer API 提供了一种异步观察目标元素与祖先元素或顶级文档视口viewport的交集变化的方法。这个API叫做交叉观察器。

### 使用场景
- 图片懒加载 - 图片滚动到可见时再加载
- 内容无限滚动
- 检测广告的曝光情况 - 为了计算广告收益，需要知道广告元素的曝光情况
- 在用户看见某个区域时执行任务或播放动画

### 痛点
需要频繁使用事件监听，频繁调用 Element.getBoundingClientRect() 方法以获取相关元素的边界信息，在主线程调用，事件会造成性能问题。

### 原理
注册一个回调函数，每当被监听的元素进入或退出另一个元素时，或者两个元素的相交部分发生变化时，该回调方法会被触发执行。

> ⚠️ 注意 Intersection Observer API 无法提供重叠的像素个数或者具体哪个像素重叠，更常见的使用方式是——当两个元素相交比例在 N% 左右时，触发回调，以执行某些逻辑。

### 概念及用法

#### 创建一个intersection observer对象

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

#### options对象

**root**
- 指定根元素，必须是target元素的父级元素
- 未指定或为`null`则默认浏览器视窗
- 顶级文档视窗 viewport

**rootMargin**
- 根元素的外边距，可以是百分比
- 用作 root元素和target元素发生交集的区域范围，使用可以控制root元素每一边的收缩和扩张
- 默认0

**threshold**
- 可以是number，也可以是number Array
- target元素和root元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行
- 默认值是0（意味着只要有一个 target 像素出现在 root 元素中，回调函数将会被执行）
- 该值为1.0含义是当 target 完全出现在 root 元素中时候回调才会被执行

### 设置目标元素

```js
let target = document.querySelector('#listItem');
observer.observe(target);
```

### callback返回数组里面每一个元素

callback一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。

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

### IntersectionObserverEntry对象

**boundingClientRect**
返回包含目标元素（被检测的元素）的边界信息的 DOMRectReadOnly

**intersectionRatio**
返回 intersectionRect 与 boundingClientRect 的比例值

**intersectionRect**
目标元素与视口（或根元素）的交叉区域的信息

**isIntersecting**
布尔值，如果目标元素与交叉区域观察者对象的根相交，则返回 true，不相交返回 false

**rootBounds**
根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null

**target**
与根出现相交区域改变的元素（Element），是一个 DOM 节点对象

**time**
返回一个记录从 IntersectionObserver 的时间原点到交叉被触发的时间的时间戳

## 元素的宽度与高度

### offsetHeight offsetWidth
元素本身的宽度和高度，包括border、padding，不包括margin，整数值。

### clientWidth, clientHeight
所包含的子元素的宽度及高度，包含padding，不包含border。

### scrollWidth, scrollHeight
包含的子元素的完整宽度和高度，其中包含了超出卷轴之外的部分的宽度与高度。在没有卷轴的情况下，这个值就等于 clientWidth/clientHeight。

## 元素的相对位置

- `scrollTop`: 代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度
- `offsetTop`: 当前元素顶部距离最近父元素顶部的距离，和有没有滚动条没有关系

## 方法

### 获取整个页面的可视区域（兼容所有浏览器）

```js
const height = window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight;
```

### 判定元素是否滚动到底部

```js
element.scrollHeight - element.scrollTop === element.clientHeight // 为true表示元素滚动到底部