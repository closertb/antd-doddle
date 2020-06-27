---
title: FormGroup 表单配置组件
---

FormGroup组件: 延续了1.x版90% 语法，其他10% 改动只是为了迎合antd 4.x 的重构而变动，主要体现在：
 - FormGroup 扩展了useForm hooks，支持了ref传参和form属性；
 - 内部自动实现了initialValues 改变时的自动resetFieldsValue；
 - decorProps属性变更为formProps: 4.x 之前FormItem 更多的是承担UI的作用，但现在还兼顾了以前getDecorator的作用，所以新增了formProps来增加对FormItem的配置入口；
 - seldomProps: 这个属性其实很早前就有了。antd组件支持的属性太多，我只加了一些常用的，如果需要用到特殊的，可在这个组件上扩展，参考示例见**备注**一栏；
 - RangePicker组件的初始值自动包装取消，考虑到两方面原因，一是：antd4 支持了moment与dayJs时间库的切换；二是：4.x之前，value设置是在getDecorator时设置，现在是在Form这一层就要设置；


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

### 组件输入API

 #### FormGroup 设置
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|:--  
| form | 表单实例 | 是（函数组件） | formInstance | --
| ref | 表单实例 | 是（类组件） | instance | --
| formItemLayout | 布局 | 否 | object | 8 ： 15
| fields | 表单配置项 | 否 | Array | []
| datas | 初始化数据 | 否 | object | {}
| required | 是否必填 | 否 | boolean | false  
| Wrapper | 包装组件 | 否 | Node | --  
| withWrap | 是否用包装组件包装 | 否  | boolean | false  
| containerName | 容器类名 | 否 | string | --  
| ...others | 其它属性, 请参考ant.Form属性 | - | -  

 #### FormRender
组件调用时，组件相关的静态属性都被放在了props的field属性中，动态属性则直接放在了props中，而表单项对应的值被放在了data（对象）中，渲染时会通过data[key]获取  

| 属性名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:--    
| field | 表单装饰器 | 是 |  object | --
| itemKey | 表单key：设置该项就不用设置field，表单会通过父组件的fields与 itemKey，自动去适配field | 否  | string | --
| isEnable | 是否渲染 | 否  | fun：（innerData） => { return ... } | true
| `disabled` | 是否禁用 | 否 | fun：（innerData） => { return ... } | false
| `required` | 是否必填 | 否 | fun：（innerData） => { return ... } | false
| enums | 枚举 | 否 | array | --
| withWrap | 是否用包装组件包装 | 否  | boolean | --  
| ...others | 其它属性, 请参考ant.FormItem属性 | - | -

>由于antd4.x 重构改变form的更新机制，所以要使用required, isEnable与disabled来做联动表单时，需要配合新增属性`shouldUpdate`来激活，使用见下面说明；

#### field属性  
type属性一共包含： input， inputNumber， text， select, radio, check, datepicker, rangepicker等常用表单， 除外还支持image(FileUpload), origin(OriginSearch), withUnit(InputWithUnit)三个非常规组件，除了以上，你还可以使用extendRenderTypes或则selfDefine来自定义你所需的组件具体可参看下面介绍

| 属性名 | 作用 | 必传 | 类型 | 默认值 | 备注
:--|:--:|---:|:---:|:---:|:--  
| type | 表单类型 | 是 |  string | input| --
| key | 键值，表单属性值 | 是  | string | - | --
| name| 表单中文名 | 否 | string | -- | --
| `required` | 是否必填 | 否 | fun：（innerData） => { return ... } | false | 权重： props.required > required > Form.required
| placeholder | 说明 | 否  | string | 请输入/请选择 | --
| defaultValue| 初始值 | 否 | 根据需要 | -- | --
| isEnable | 是否渲染 | 否  | fun：（innerData） => { return ... } | true | --
| `disabled` | 是否禁用 | 否 | fun：（innerData） => { return ... } | false | --
| rules| 校验规则 | 否 | array | -- |  必填的校验不在此定义
| enums| 枚举 | 否 | array | {} | 适用：select, radio, check, 详见示例
| seldomProps | 不常用配置属性对象 | 否 | object | {} | --
| withWrap | 是否用包装组件包装 | 否  | boolean | false | --

很多在field和props同时出现的属性，props中的权重大于field中的, field中的权重大于Render声明中的。除了上面所列，还有一些不常用的，后面慢慢补充    

#### 表单联动实现
主要通过rerquired, disabled 与 isEnable三个属性实现，如果是静态的，可直接设置布尔值一步到位；这里主要演示动态设置, 具体应用请参看示例
```javascript
// rerquired, disabled 与 isEnable三个属性为函数时，入参会收到一个入参,其值为Object.assign({}, innitialValues 与 currentDatas
// innitialValues 是FormGroup接受的初始属性datas
// currentDatas 是表单form.getFieldsValue()获取到的即时表单值
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
  isEnable: (datas) => {
    return datas.cardStatus !== 'error';
  },
}]
```

## Change Log

### 2019-11-26

 - feat: 新增FormGroup组件，优化FormRender使用体验 

### 2019-12-14

 - feat: enums新增object支持

 ### 2020-03-01

 - feat: 新增1.4.0版，支持Form表单联动

  ### 2020-06-24

 - feat: 新增2.0.0版，定向支持antd 4.x版本表单