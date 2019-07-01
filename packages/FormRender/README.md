---
title: FormRender 表单配置组件
---

FormRender组件:目的是让写表单变为配置表单。使用时，分两个阶段，组件声明与组件调用
## 代码演示

## API

### FormRender 输入
组件声明：FormRender = formRender({ getFieldDecorator }) 声明时，接受三个参数，getFieldDecorator，formItemLayout， require   

| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|:--  
| getFieldDecorator | 表单装饰器 | 是 | function | --
| formItemLayout | 布局 | 否 | object | 8 ： 15
| require | 是否必填 | 否 | boolean | false  
| Wrapper | 包装组件 | 否 | Node | --  
| withWrap | 是否用包装组件包装 | 否  | boolean | false  

 组件调用：组件调用时，组件相关的静态属性都被放在了props的field属性中，动态属性则直接放在了props中，而表单对应的值被放在了data（对象）中，渲染时通过data[key]获取  

| 属性名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:--    
| field | 表单装饰器 | 是 |  object | --
| data | 布局 | 否  | object | {}
| onChange| 数据改变事件 | 否 | fun | --
| isEnable | 是否渲染 | 否  | object | {}
| enums | 枚举 | 否 | array | --
| required | 是否必填 | 否 | bool | --
| withWrap | 是否用包装组件包装 | 否  | boolean | --  

field属性  
type属性一共包含： input， inputNumber， text， select, radio, check, datepicker, rangepicker等常用表单， 除外还支持image(FileUpload), origin(OriginSearch), withUnit(InputWithUnit)三个非常规组件，除了以上，你还可以使用extendRenderType或则selfDefine来自定义你所需的组件具体可参看下面介绍

| 属性名 | 作用 | 必传 | 类型 | 默认值 | 备注
:--|:--:|---:|:---:|:---:|:--  
| type | 表单类型 | 是 |  string | input| --
| key | 键值，表单属性值 | 是  | string | - | --
| name| 表单中文名 | 否 | string | -- | --
| required | 必填 | 否  | bool | false | 权重： props.required > required > require
| placeholder | 说明 | 否  | string | 请输入/请选择 | --
| defaultValue| 初始值 | 否 | 根据需要 | -- | --
| disable| 是否禁用 | 否 | fun：data => { return } | -- | --
| defaultValue| 初始值 | 否 | 根据需要 | --  | --
| rules| 校验规则 | 否 | array | -- |  必填的校验不在此定义
| maxLength| 最大长度 | 否 | num | -- | 适用：input， text  
| format| 日期格式化 | 否 | string | -- | 适用：日期类
| showTime| 时间可选 | 否 | bool | -- | 适用：日期类
| allowClear| 是否可清除 | 否 | bool | 适用：日期类， select | --
| enums| 枚举 | 否 | array | [] | 适用：select, radio, check  
| seldomProps | 不常用配置属性对象 | 否 | object | {} | --
| withWrap | 是否用包装组件包装 | 否  | boolean | false | --
| enumKey | 接口枚举属性字段 | 否  | string | 同field key | --
| isDynamic | 是否去获取动态字段  | boolean | false | --

很多在field和props同时出现的属性，props中的权重大于field中的, field中的权重大于Render声明中的。除了上面所列，还有一些不常用的，后面慢慢补充 

### RenderType 扩充
由于业务的发展，除了上面提供的type以外，有可能你还有一些常用的表单组件，为此，我们提供了一个extendRenderTypes来扩充type

```javascript
import { extendRenderTypes } from 'antd-doddle';
import ComplexUpload from '../components/ComplexUpload'; // 自己封装的一个上传图片组件

extendRenderTypes({
  speImg: ({ field }) => { // 入参为props
    return (<ComplexUpload {...field} />);
  }
});
```

## Change Log

### 2019-05-13

 - feat: 新增isDynamic属性，用于获取从异步接口获取回来的动态枚举，需在props设置enums，对应的属性名为enumKey或key，主要用于WithSearch  

 ### 2019-06-28

 - feat: 新增extendRenderTypes使用说明文档

### 2019-07-01

 - fix: 解决节点为isEnable为false时，有wrapper包装时，表单不渲染，但wrapper还会渲染的bug