---
title: FormRender 表单配置组件
---

FormRender组件:目的是让写表单变为配置表单。使用时，分两个阶段，组件声明与组件调用
## 代码演示

## API

### FormRender 输入
组件声明：FormRender = formRender({ getFieldDecorator })。 声明时，接受以下参数设置： 

| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|:--  
| getFieldDecorator | 表单装饰器 | 是 | function | --
| formItemLayout | 布局 | 否 | object | 8 ： 15
| require | 是否必填 | 否 | boolean | false  
| Wrapper | 包装组件 | 否 | Node | --  
| withWrap | 是否用包装组件包装 | 否  | boolean | false  

其他配置见`FormGroup`

## Change Log

### 2019-05-13

 - feat: 新增isDynamic属性，用于获取从异步接口获取回来的动态枚举，需在props设置enums，对应的属性名为enumKey或key，主要用于WithSearch  

 ### 2019-06-28

 - feat: 新增extendRenderTypes使用说明文档

### 2019-07-01

 - fix: 解决节点为isEnable为false时，有wrapper包装时，表单不渲染，但wrapper还会渲染的bug