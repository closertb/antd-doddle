---
title: FormGroup 表单配置组件
---

FormGroup组件: 是鉴于当前Function Component的盛行，老组件FormRender的使用必须依赖Class组件，需要声明局部变量，然后在Constructor中初始化。这样写虽然方便，但其实不太符合React风格；故此，对FormRender老组件进行了使用上的优化，功能还是一致；只是新增几个功能：
 - 新增`表单联动`，通过自定义isEnable与disable方法，决定表单项是否隐藏或禁用, 参见示例`是否激活`；
 - dynamicParams：属性给下拉列表传递动态参数，使用方式参考示例`远程状态`一栏的配置
 - decorProps: 主要解决Switch这种组件，在被getFieldDecorator传参时不能用initValue设置，需要额外设置valuePropName，详情请参考**是否激活**一栏的配置
 - seldomProps: 这个属性其实很早前就有了。antd组件支持的属性太多，我只加了一些常用的，如果需要用到特殊的，可在这个组件上扩展， 参考示例见**备注**一栏；
 - 暂时想不起了， 详细请看代码演示


## 代码演示
 
## API

## RenderType 扩充
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

### 组件输入
老的组件声明见FormRender组件 

 #### FormGroup 设置
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|:--  
| getFieldDecorator | 表单装饰器 | 是 | function | --
| formItemLayout | 布局 | 否 | object | 8 ： 15
| fields | 表单配置项 | 否 | Array | []
| datas | 初始化数据，和下面子组件的data 一致 | 否 | object | {}
| required | 是否必填, 老的组件任然是require | 否 | boolean | false  
| Wrapper | 包装组件 | 否 | Node | --  
| withWrap | 是否用包装组件包装 | 否  | boolean | false  


 #### FormRender
组件调用时，组件相关的静态属性都被放在了props的field属性中，动态属性则直接放在了props中，而表单项对应的值被放在了data（对象）中，渲染时会通过data[key]获取  

| 属性名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:--    
| field | 表单装饰器 | 是 |  object | --
| itemKey | 表单key：设置该项就不用设置field，表单会通过父组件的fields与 itemKey，自动去适配field | 否  | string | --
| data | 布局 | 否  | object | {}
| onChange| 数据改变事件 | 否 | fun | --
| isEnable | 是否渲染 | 否  | object | {}
| enums | 枚举 | 否 | array | --
| required | 是否必填 | 否 | bool | --
| withWrap | 是否用包装组件包装 | 否  | boolean | --  

#### field属性  
type属性一共包含： input， inputNumber， text， select, radio, check, datepicker, rangepicker等常用表单， 除外还支持image(FileUpload), origin(OriginSearch), withUnit(InputWithUnit)三个非常规组件，除了以上，你还可以使用extendRenderType或则selfDefine来自定义你所需的组件具体可参看下面介绍

| 属性名 | 作用 | 必传 | 类型 | 默认值 | 备注
:--|:--:|---:|:---:|:---:|:--  
| type | 表单类型 | 是 |  string | input| --
| key | 键值，表单属性值 | 是  | string | - | --
| name| 表单中文名 | 否 | string | -- | --
| required | 必填 | 否  | bool | false | 权重： props.required > required > require
| placeholder | 说明 | 否  | string | 请输入/请选择 | --
| defaultValue| 初始值 | 否 | 根据需要 | -- | --
| `disable` | 是否禁用 | 否 | fun：（props.data, innerData） => { return ... } | -- | --
| `isEnable` | 是否显示表单项 | 否 | bool`|`fun：（props.data, innerData） => { return ... } | true | --
| rules| 校验规则 | 否 | array | -- |  必填的校验不在此定义
| maxLength| 最大长度 | 否 | num | -- | 适用：input， text  
| format| 日期格式化 | 否 | string | -- | 适用：日期类
| showTime| 时间可选 | 否 | bool | -- | 适用：日期类
| allowClear| 是否可清除 | 否 | bool | 适用：日期类， select | --
| enums| 枚举 | 否 | array | {} | 适用：select, radio, check, 详见示例
| seldomProps | 不常用配置属性对象 | 否 | object | {} | --
| withWrap | 是否用包装组件包装 | 否  | boolean | false | --

很多在field和props同时出现的属性，props中的权重大于field中的, field中的权重大于Render声明中的。除了上面所列，还有一些不常用的，后面慢慢补充    

#### 表单联动实现
主要通过disable 与 isEnable属性实现，如果是静态的，可直接设置布尔值一步到位；这里主要演示动态设置, 具体应用请参看示例
```javascript
// disable 与 isEnable两个属性作为函数时，入参会收到两个值props.datas 与 currentDatas
// props.datas 是FormGroup接受的初始属性datas
// currentDatas 是表单内部所有项目当前值的集合，key-value的形式，key 为field.key
const fields = [{
  key: 'userName',
  name: '真实姓名',
  disable: data => typeof data.userName !== 'undefined'
}, {
  key: 'cardStatus',
  name: '卡状态',
  type: 'radio',
  enums: statusEnums
}, {
  key: 'corpLegalIdCardFrontStoreId',
  url: 'corpLegalIdCardFrontUrl',
  name: '正面',
  required: false,
  type: 'image',
  psimple: 'https://cos.56qq.com/loan/loanuser/idcard_back.png',
  isEnable: (_, data) => {
    return data.cardStatus !== 'error';
  },
}]
```

## Change Log

### 2019-11-26

 - feat: 新增FormGroup组件，优化FormRender使用体验 

### 2019-12-14

 - feat: enums新增object支持

 ### 2020-03-01

 - feat: 新增1.4.0 beta版，支持Form表单联动