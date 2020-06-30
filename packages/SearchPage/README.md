---
title: SearchPage 搜索列表页面组件
---

虽然搜索框组件WithSearch 与 列表组件EnhanceTable解决了绝大多数后台搜索表单重复需求，但还不够彻底。对于简单搜索列表页面，还可以进行组件化抽离，让组件自己来维护挂载搜索，分页等逻辑，详情使用请查看Demo；

## 代码演示

## API

### SearchPage 输入   

| 参数名 | 作用 | 类型 | 默认值    
:--|:------------------------------------------:|:---:|:---:   
| searchProps | 搜索框配置，同WithSearch | object | {}
| tableProps | 必填，搜索表单项 | array | []
| onSearch | 必填，查询操作 | fun | 无
| setQuery | 非必填，获取实时查询参数，见Demo | fun | 无
| pn | 搜索参数pageNum的名称 |  string | 同全局配置
| ps | 搜索参数pageSize的名称  | string | 同全局配置
| extraBtn | 介于搜索框与列表组件之间的自定义组件实例 | React.Node | -
| children | 自定义实例 | React.Node | -

## Change Log

### 2020-06-29

 - feat: 新增SearchPage 组件