---
title: RenderDetail 详情批量渲染组件
---

RenderDetail解决中台常出现的详情展示问题。  

## 代码演示

## API

### RenderDetail 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:-------------------------:|:--:|:--:|:--  
| fields | 渲染列表 | 是 | array | --
| detail | 翻页查询操作 | 是 |  object | {} 
| fieldsName | 栏目标题，为空时不渲染标题 | 是 |  string | --   

field 参数  

| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:-------------------------:|:---:|:--:|:--
| key | 渲染属性名 | 是 | string | --
| name | 属性名称 | 是 |  string | -- 
| type | 类型, 默认支持date, datetime, decimal, 和table共用fieldTypes | 否 |  string | 
| isShow | 是否渲染 | 否 | fun: detail => !detail.name | --
| enums | 枚举 | 否 |  [] | -- [{ label: '', value: '' }]
| render | 自定义渲染 | 否 |  string |
| itemCount | 单行显示数量 | 否 |  number | 2（1， 2， 3可选）
| unit | 单位 | 否 |  string | ''

**注**：如果对显示的样式不符合要求，可自己重定义样式。  