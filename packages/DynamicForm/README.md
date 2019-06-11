---
title: DynamicForm 自定义动态表单组件
---

DynamicForm组件的出现是为了解决需求中大量的动态表单实现，为表单项提供增，删，上移，下移操作。这是一个类renderProps模式组件，表单内容自己定制
## 代码演示

## API

### DynamicForm 输入
| 参数 | 说明 | 类型 | 默认值  
:--|:------------------------------------------:|:---:|:---:   
| children | 必填, 动态渲染的内容节点 | function | --
| canMove | 是否可上移下移 |  bool |  false
| value | 初始值 | array | [{ key: 0 }] 
| onChange | 状态改变要触发的方法 | fun | --    

### DynamicForm 输出

| 参数名 | 作用
:--|:--:
| rule | 渲染节点要绑定的数据对象
| acitons | 动作，包含三种，比较常用的一种就是handleChange，做数据绑定用