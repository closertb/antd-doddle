---
title: ImageLoad 图片加载组件
---

ImageLoad组件的出现是为了解决官网这种业务常出现的页面大量图片出现的加载问题
## 代码演示

## API

## InputWithUnit 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:---:   
| imgProps | 图片相关属性，详见下ImageProps定义 | 是 |  object | --  
| wrapClassName | ImageLoad外层包裹样式名 | 否 |  string | --  
| transtionClassName | 图片加载动画react-transition-group样式名 | 否 | string | 自带：loadImg
| transtionTime | 图片加载动画过度时间 | 否 | number | 1000
| waiting | 图片加载完是否等待显示 | 否 | boolean | --  
| callback | 图片加载完的回调 | 否 |  fun | --   

## ImageProps 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:---:   
| alt | 图片alt属性 | 是 |  object | --  
| src | 图片地址 | 是 |  string | -- 
| 【other】 | 图片其他属性 | 否 |  string | -- 