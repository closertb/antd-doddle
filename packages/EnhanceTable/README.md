---
title: EnhanceTable 自定义动态表单组件
---

EnhanceTable组件主要是要解决中台业务每个表单页面都会使用antd的table，但相似度极高。所以用一个组件将table包起来，并加入了一些通用的处理逻辑
## 代码演示

## API

### EnhanceTable 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:--:|---:|---:|:---:   
| fields | 渲染属性，field内部定义见下表 | 是 | array | -- 
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

** field 参数  **

| 参数名 | 作用 | 必传 | 类型 | 默认值  
:--|:-------------------------:|:---:|:--:|:--
| key | 渲染属性名 | 是 | string | --
| name | 属性名称 | 是 |  string | -- 
| type | 类型, 默认支持date, datetime, decimal, 可extendFieldTypes扩充，详见下面的示例 | 否 |  string | 
| enums | 枚举 | 否 |  [] | -- [{ label: '', value: '' }]
| render | 自定义渲染，同table | 否 |  string |  

### FieldType 扩充
由于业务的不同，除了上面提供的type以外，有可能你还有其他常见的table render函数需要写，为此，我们提供了一个extendFieldTypes来扩充type

```javascript
import { extendFieldTypes } from 'antd-doddle';

extendFieldTypes({
    showMoney: value => `${value}$`,
    fullName: (firstname, detail) => `${detail.lastname} ${detail.firstname}`
});

```

## Change Log

### 2019-06-28

 - feat: 新增extendFieldTypes使用说明文档