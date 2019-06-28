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
| disableBtn | 是否禁用编辑，如果只想针对某一行禁用，则只能在传入数据时添加disableBtn为true属性 |  bool |  false   

### DynamicForm 输出

| 参数名 | 作用
:--|:--:
| rule | 渲染节点要绑定的数据对象
| bindChange | 手动绑定数据到传入对象的指定Key

# Change Log

### 2019-05-13

 - fix：重写异步初始值更新逻辑
 - fix：新增disableBtn属性，增加回显禁用编辑功能