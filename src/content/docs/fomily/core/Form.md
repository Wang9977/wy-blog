---
title: Form 类详解
description: Fomily 表单框架的核心 Form 类完整API和使用指南
sidebar:
  order: 1
tags:
  - 表单
  - API
  - 类设计
category: Fomily
difficulty: advanced
---

# Form 类详解

## 概述

Form 类是 Fomily 表单框架的核心，负责管理整个表单的状态、生命周期和交互逻辑。它提供了完整的API来创建、验证和提交表单。

## 核心API

### 构造函数

```typescript
constructor(options?: FormOptions)
```

创建一个新的Form实例。

### 重要属性

- `values`: 当前表单值
- `errors`: 表单错误信息
- `valid`: 表单是否有效
- `submitting`: 是否正在提交

### 常用方法

- `setValues(values)`: 设置表单值
- `validate()`: 验证表单
- `reset()`: 重置表单
- `submit()`: 提交表单

## 使用示例

```typescript
import { Form } from 'fomily';

const form = new Form({
  initialValues: { name: '', email: '' },
  onSubmit: async (values) => {
    // 处理表单提交
    console.log(values);
  }
});

// 监听表单变化
form.subscribe((state) => {
  console.log('表单状态变化:', state);
});
```

## 高级特性

- **异步验证**: 支持异步验证规则
- **字段联动**: 字段间依赖关系处理
- **动态表单**: 支持动态添加/删除字段
- **性能优化**: 基于Proxy的响应式系统

属性
```typescript
{
  displayName = 'Form'
  id: string
  initialized: boolean
  validating: boolean
  submitting: boolean
  loading: boolean
  modified: boolean
  pattern: FormPatternTypes
  display: FormDisplayTypes
  values: ValueType
  initialValues: ValueType
  mounted: boolean
  unmounted: boolean
  props: IFormProps<ValueType>
  heart: Heart
  graph: Graph
  fields: IFormFields = {}
  requests: IFormRequests = {}
  indexes: Record<string, string> = {}
  disposers: (() => void)[] = []
}
```

构造函数
```typescript
constructor(props: IFormProps<ValueType>) {
    this.initialize(props)
    this.makeObservable()
    this.makeReactive()
    this.makeValues()
    this.onInit()
  }
```
初始化表单
```typescript

/**
   * 初始化表单组件
   * @param props 表单属性
   */
  protected initialize(props: IFormProps<ValueType>) {
    this.id = uid() // 生成一个唯一标识符
    this.props = { ...props } // 将传入的属性复制到 this.props
    this.initialized = false // 初始化状态为 false
    this.submitting = false // 提交状态为 false
    this.validating = false // 验证状态为 false
    this.loading = false // 加载状态为 false
    this.modified = false // 修改状态为 false
    this.mounted = false // 挂载状态为 false
    this.unmounted = false // 卸载状态为 false
    this.display = this.props.display || 'visible' // 显示状态，默认为 'visible'
    this.pattern = this.props.pattern || 'editable' // 模式，默认为 'editable'
    this.editable = this.props.editable // 可编辑状态
    this.disabled = this.props.disabled // 禁用状态
    this.readOnly = this.props.readOnly // 只读状态
    this.readPretty = this.props.readPretty // 美观只读状态
    this.visible = this.props.visible // 可见状态
    this.hidden = this.props.hidden // 隐藏状态
    this.graph = new Graph(this) // 创建一个新的 Graph 实例
    this.heart = new Heart({
      lifecycles: this.lifecycles, // 生命周期
      context: this, // 上下文
    })
  }
```

使form对象属性可观察 makeObservable
```typescript
/**
 * 使对象的属性和方法可观察
 *
 * @protected
 * @method makeObservable
 * @observable fields 浅观察
 * @observable indexes 浅观察
 * @observable initialized 引用观察
 * @observable validating 引用观察
 * @observable submitting 引用观察
 * @observable loading 引用观察
 * @observable modified 引用观察
 * @observable pattern 引用观察
 * @observable display 引用观察
 * @observable mounted 引用观察
 * @observable unmounted 引用观察
 * @observable values 深观察
 * @observable initialValues 深观察
 * @computed valid 计算属性
 * @computed invalid 计算属性
 * @computed errors 计算属性
 * @computed warnings 计算属性
 * @computed successes 计算属性
 * @computed hidden 计算属性
 * @computed visible 计算属性
 * @computed editable 计算属性
 * @computed readOnly 计算属性
 * @computed readPretty 计算属性
 * @computed disabled 计算属性
 * @action setValues 设置值
 * @action setValuesIn 设置嵌套值
 * @action setInitialValues 设置初始值
 * @action setInitialValuesIn 设置嵌套初始值
 * @action setPattern 设置模式
 * @action setDisplay 设置显示
 * @action setState 设置状态
 * @action deleteInitialValuesIn 删除嵌套初始值
 * @action deleteValuesIn 删除嵌套值
 * @action setSubmitting 设置提交状态
 * @action setValidating 设置验证状态
 * @action reset 重置
 * @action submit 提交
 * @action validate 验证
 * @batch onMount 批处理挂载
 * @batch onUnmount 批处理卸载
 * @batch onInit 批处理初始化
 */
  protected makeObservable() {
    define(this, {
      fields: observable.shallow,
      indexes: observable.shallow,
      initialized: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      loading: observable.ref,
      modified: observable.ref,
      pattern: observable.ref,
      display: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      values: observable,
      initialValues: observable,
      valid: observable.computed,
      invalid: observable.computed,
      errors: observable.computed,
      warnings: observable.computed,
      successes: observable.computed,
      hidden: observable.computed,
      visible: observable.computed,
      editable: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      disabled: observable.computed,
      setValues: action,
      setValuesIn: action,
      setInitialValues: action,
      setInitialValuesIn: action,
      setPattern: action,
      setDisplay: action,
      setState: action,
      deleteInitialValuesIn: action,
      deleteValuesIn: action,
      setSubmitting: action,
      setValidating: action,
      reset: action,
      submit: action,
      validate: action,
      onMount: batch,
      onUnmount: batch,
      onInit: batch,
    })
  }
```

makeReactive 用于将 Form 类的实例变为响应式。
```typescript
/**
 * 使对象具有响应性，并在变化时触发相应的处理函数。
 * @protected
 * @method makeReactive
 * @returns {void}
 */
  protected makeReactive() {
    this.disposers.push(
      observe(// observe 是一个函数，用于观察对象的变化。它接受三个参数：
        this,    // 第一个参数是要观察的对象（在这里是 this，即当前 Form 实例）。
        (change) => { // 第二个参数是一个回调函数，当被观察的对象发生变化时，这个回调函数会被调用。
          triggerFormInitialValuesChange(this, change)
          triggerFormValuesChange(this, change)
        },
        true // 第三个参数是一个布尔值，通常用于配置观察行为（在这里是 true，一个布尔值，表示是否进行深度观察。）。
      )
    )
  }
```

makeValues 生成有效的表单值并赋值给Form类属性
```typescript
/**
 * 生成有效的表单值并赋值给类属性
 * @protected
 * @method makeValues
 * @returns {void}
 */
  protected makeValues() {
    this.values = getValidFormValues(this.props.values)
    this.initialValues = getValidFormValues(this.props.initialValues)
  }
```

onInit 初始化函数

/**
 * 初始化函数，将 `initialized` 设置为 true，并通知生命周期类型为 `ON_FORM_INIT`。
 */
  onInit = () => {
    this.initialized = true
    this.notify(LifeCycleTypes.ON_FORM_INIT)
  }