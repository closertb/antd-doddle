---
title: WithSearch 搜索框组件
---

WithSearch组件主要是要解决中台业务每个页面都会出现搜索框的共性问题，将共性提取到一个组件中，作为一个容器，用renderProps设计模式实现, 可以传一个fields，其中field属性定义清参照FormRender组件，采用默认样式渲染，也可以自定义节点，定制搜索框要展示的内容。详见下面示例：  
## 代码演示

## API

### WithSearch 输入   

| 参数名 | 作用 | 类型 | 默认值    
:--|:------------------------------------------:|:---:|:---:   
| search | 搜索初始值 | object | {}
| fields | 必填，搜索表单项 | array | []
| onSearch | 必填，查询操作 | fun | 无
| onReset | 查询重置操作, 只有设置了此项，重置按钮才会显示 | fun | 无
| paramFormat | 搜索结果格式化 |  fun: 参照示例 | --
| pageName | 页码属性名 | string | pageNo
| extraBtns | 额外按钮节点 | fun | --
| formItemLayout | 表单项样式 | {} | { labelCol: { span: 6 }, wrapperCol: { span: 18 } }

### WithSearch 输出

| 参数名 | 作用 | 
:--|:--:
| form           | 表单form属性 | 
| search         | 表单form值 | 
| formItemLayout | 表单项样式  | 
| handleSearch   | 表单提交操作 | 
| handleReset    | 表单重置操作 | 