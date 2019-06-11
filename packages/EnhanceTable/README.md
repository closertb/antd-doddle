---
title: EnhanceTable 自定义动态表单组件
---

EnhanceTable组件主要是要解决中台业务每个表单页面都会使用antd的table，但相似度极高。所以用一个组件将table包起来，并加入了一些通用的处理逻辑
## 代码演示

## API

### DynamicForm 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:---:   
| fields | 渲染属性 | 是 | array | -- 
| onSearch | 翻页查询操作 | 是 | fun | 无：如果onSearch方法不存在，传了actions，或默认去调用actons.onSearch
| actons | 翻页查询操作 | 否 |  object | 无：对象中得包含一个onSearch方法 
| search | 初始化分页 | 是 |  object | { pageSize: 10, pageNo: 1 } 
| datas | 要渲染的数据 | 是 | array | []
| total | 总数 | 是 | number | --
| rowKey | 主键名 | 否 | string | id
| loading | 加载标示 | 否 | object | --： 其中含一个list属性的bool值
| rowKey | 主键名 | 否 | string | id
| footer | 总条数自定义显示 | 否 | fun | t => `共 ${t} 条`
| pageName | 页码属性名 | 否 | string | pageNo: 除了pageNo，还对pageNum做了兼容
| noPage | 是否显示分页 | 否 | bool | false
| ... | table其他可设置属性 | 否 | -- | --  