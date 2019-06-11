---
title: OriginSearch 输入搜索框组件
---

OriginSearch 组件在 Antd 的 AutoComplete 基础上封装，将输入与选择后两个状态隔离，获得更好的交互体验。

## 代码演示

## API

### OriginSearch
| 参数 | 说明 | 类型 | 默认值  
:--|:------------------------------------------:|:---:|:---:   
| fetchData | 必填，带promise的数据获取接口 |  fun：promise | --
| format | 必填，下拉列表显示自定义数据展示函数，返回[{ key: 0, label: '',value: ''}]，入口参数为接口返回结果 |  fun |  value => value
| value | 初始值 | any | --
| valueFormat | 数据显示框自定义数据显示函数 |  fun | value => value
| search | 自定义搜索数据对象 |  objet |  {}
| searchKey | 搜索关键词属性名 | string | keyword
| onSelect | 下拉列表选择后自定义动作 | fun | --
| allowClear | 是否允许清除 | bool | false
| maxSize | 超过指定长度使用tooltip开始提示 | number | 500
| onChange| 兼容getFieldDecorator，正常情况下使用onSelect已足够，入参为option的value值或onSelect参数格式化后的返回值 | fun | --   

### 特别说明  

组件支持纯表单与带数据双向绑定（getFieldDecorator）的表单，上面的示例展示的是双向数据绑定的

- value 与 valueFormat：主要考虑是 value 更多时候是一个对象，而要显示出来的一般都是一个字符串，而字符串怎么生成的，完全由传递过去的 value 决定，valueFormat 则是一个加工函数，决定 value 怎么展示出来。
- search 与 searchKey: 做远程数据搜索，一般我们的传参是一个由对象生成的 key=value 表单形式，而针对于边输入边搜索的远程搜索接口，往往都只有一个参数是改变的，但这个接口需要三个必传参数，所以就可以把  不变的两个参数放在 search，而 searchKey 会在 search 中动态写入值。
- format： 其作用最重要的就是生成下拉列表 options 的原始数据，而键值 key 除了标识这是唯一数据，还被用来做数据的索引， 所以返回值不带 key 的时候，组件内部会议数组索引作为 Key。
- onSelect：这个函数的入参是（value，index， searchRes），分别对于下拉选择的 value，下拉项对应的数据索引和搜索的结果。通过 searchRes[index],可以得到搜索结果对应的哪一行数据。而且其必须有一个返回值，这个值会被当作下一周期的初始值。
