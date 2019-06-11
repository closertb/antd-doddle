---
title: InputWithUnit 量化输入框组件
---

InputWithUnit组件的出现是为了解决需求中大量的动态表单实现，为表单项提供增，删，上移，下移操作。这是一个类renderProps模式组件，表单内容自己定制
## 代码演示

## API

## InputWithUnit 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:---:   
| importProps | 输入框属性设置集合 | 是 |  object | --  
| selectProps | 下拉选择框属性设置结合 | 否 |  object | --  
| enums | 下拉选项原始数据，[{ value: '', label: '' }]数组 | 否 | array | 时分 天  
| defaultUnit | 默认单位 | 否 | string | --  
| value | 初始值{ number: '', unit: ''}形式 | 否 | object | {}
| onChange | 状态改变要触发的方法 | 否 |  fun | --   