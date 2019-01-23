# Table工具类

后台系统业务大部分都是表格＋表单的形式，故我们在`model`层，统一定义模型的数据结构，以方便在`table+form`中复用，简化实际的开发工作.  
这里主要介绍下`Table`工具类的使用.

### 使用场景
field提供统一的数据格式，以方便在form以及table中复用，参考如下:

``` javascript

const fields = [
  {
    key: 'name', // 字段key
    name: '名称' // 字段name
    type: 'text' // 字段类型支持如下类型: date|datetime|datetimeRange|enum|boolean|number|textarea|text
    meta: {
      min: 0,
      max: 100,
      rows: 12
    },
    enums: [ //枚举数据，如果包含enums属性，则field默认为每句类型
      { value: 'APP', label: 'APP' },
      { value: 'WEB', label: 'WEB' },
      { value: 'PC', label: 'PC' },
    ], 
    required: true
  }
]

```

Table类的主要作用是将以上通用的`field`格式，转换为`antd`中`table`支持的`column`定义
更多参数定义请参考https://ant.design/components/table-cn/#Column

### 如何使用

与`form`类类似，通过`carno`引入

> import { TableUtil } from 'carno/addons';
> const { createColumns } = TableUtil;

Table工具类主要提供以下接口:

- createColumns 转换field为column格式
- combineTypes 扩展支持的字段类型
- getFieldValue 获取数据显示值，传入field定义

##### createColumns
核心方法，转换通用字段类型为column格式, createColumnss需要配合`antd.Table`组件使用.

参数：

- originFields 通用的fields定义，一般由model中定义
- fieldKeys 需要pick的keys, 通用的fields往往是个字段的超级，在table中一般只需要显示部分字段
- extraFields 扩展的字段定义, 可以对通用字段的属性扩展

createColumns返回的是一个链式对象，需要调用`values`方法才能返回最终的结果。
链式对象支持如下方法:

- pick 参数与fieldKeys格式一致
- excludes 排除部分字段
- enhance 参数与extraFields格式一致
- values 返回数据结果

```javascript 

import { TableUtil } from 'carno';

const { createColumns } = TableUtil;

const fields = [{
  key: 'name',
  name: '名称'
}, {
  key: 'author',
  name: '作者'
}, {
  key: 'desc',
  name: '简介'
}];

function UserList({ users }) {

  const operatorColumn = [{
    key: 'operator',
    name: '操作',
    //扩展字段的render支持自定义渲染
    render: (value, record) => {
      return (
        <div>
          <a onClick={() => this.handleModal(record)}>详情</a>
          <span className="ant-divider" />
          <a onClick={() => this.props.onWalletAmend(record)}>修复钱包</a>
        </div>
      );
    }
  }]

  const tableColumns = createColumns(fields, ['name', 'author'], operatorColumn).values();
  //排除id,desc字段
  const tableColumns = createColumns(fields).excludes(['id', 'desc']).enhance(operatorColumn).values();
  //pick name|author|openTime字段，并且扩展name字段的rules属性
  const tableColumns = createColumns(fields).pick(['name', 'author', 'openTime']).enhance(operatorColumn).values();

  const tableProps = {
    dataSource: users,
    columns: tableColumns
  }

  return <Table {...tableProps} />;
}

//pick name|author字段


```

##### combineTypes

扩展通用字段定义支持的表格字段类型, 自定义字段类型写法参考如下:

```javascript
combineTypes（{
  //参数：value: item值, field: 字段定义
  datetime: (value, field) => {
    return moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss');
  },
})

```

##### getFieldValue

通过传入字段定义，获取对应字段的值，此函数会根据默认的fieldTypes来做数据转换

```javascript
const rowData = { createTime: 14300000231823 };
const field = {
  key: 'createTime',
  type: 'datatime'
}
getFieldValue(rowData.createTime, field);// 返回日期时间格式：2017-12-12 10:10:10

```
