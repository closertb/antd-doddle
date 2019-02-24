## 摘要 ##
金融组基础组件与方法,支持按需打包
## 组件 ##
eg:  
```
import { formRender } from 'ffe-basic';
```
### formRender: 包含装饰器的表单组件  ###
说明： 写这个组件的目的是让写表单变为配置表单。使用时，分两个阶段，组件声明与组件调用
```
let FormRender; // 用于生成绑定了装饰器getFieldDecorator的组件

// constructor中声明
FormRender = formRender({ getFieldDecorator });

// 调用
<FormRender key={field.key} field={field} data={data} />
```
一个简单的使用用例  
eg：  
```
// userStatus 定义
export const userStatus = [{
  value: 1,
  label: '启用',
}, {
  value: 0,
  label: '禁用',
}];

// fields.js 定义
import { userStatus } from '../../configs/constants';

export const editFields = [{
  key: 'userName',
  name: '真实姓名',
  required: true,
  disable: data => typeof data.userName !== 'undefined'
}, {
  key: 'mail',
  name: '邮箱',
  required: true
}, {
  key: 'userId',
  name: '用户ID',
  required: true
}, {
  key: 'status',
  name: '状态',
  required: true,
  type: 'select',
  enums: userStatus
}, {
  key: 'remark',
  name: '备注',
}];
// Edit.js
import React from 'react';
import { Spin } from 'antd';
import { editFields } from './fields';
import { formRender } from 'antd-doddle';

let FormRender; // 用于生成绑定了装饰器getFieldDecorator的组件
export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { form: { getFieldDecorator } } = props;
    this.state = {};
    FormRender = formRender({ getFieldDecorator });
  }
  render() {
    const { detail: data, confirmLoading } = this.props;
    return (
      <Spin spinning={confirmLoading}>
        {editFields.map(field=> <FormRender key={field.key} {...{ field, data }} />)}
      </Spin>
    );
  }
}
```
![组件渲染效果图][1]
上面Map这种骚操作只适用于简单的表单组件，所以有些特俗组件还没有支持，所以你可能需要FotmItem与FormRender结合着写的方式，就像下面这样：
```
       <FormItem label="申请人家庭住址" {...formItemLayout} >
          {getFieldDecorator('homeAddress',
            {
              initialValue: undefined,
              rules: [{ required, message: '申请人家庭住址不能为空' }, {
                validator: this.handleAddressCheck('家庭住址', required)
              }] }
          )(
            <CityPickerExtend />
          )}
        </FormItem>
        <FormRender {...{ field: fields.marriage, data, onChange: handleMarryStatus }} />
        {typeof getFieldValue('maritalStatus') !== 'undefined' && !isEnable &&
          <div style={{ marginLeft: '185px' }}>
            <FormRender {...{ field: fields.checkMaritalStatus,
              data: {
                checkMaritalStatus: ['1'] }
            }}
            />
          </div>
        }
```
有可能你觉得单独声明一个FormRender显得别扭，你也可以在组件初始化时使用this的一个属性来声明，比如
```
// constructor中声明
this.formRender = formRender({ getFieldDecorator }) 
// render调用
{this.formRender({ field, data })}
```
#### 关于参数 ####
组件声明：FormRender = formRender({ getFieldDecorator }) 声明时，接受三个参数，getFieldDecorator，formItemLayout， require   
| 参数名| 作用 | 必传 | 默认值  
---|:--:|---:|---:  
| getFieldDecorator | 表单装饰器 | 是 |  --
| formItemLayout | 布局 | 否 |  8 ： 15
| require | 是否必填 | 否 |  false  

 组件调用：组件调用时，组件相关的静态属性都被放在了props的field属性中，动态属性则直接放在了props中，而表单对应的值被放在了data（对象）中，渲染时通过data【key】获取  

| 属性名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|---:    
| field | 表单装饰器 | 是 |  object | --
| data | 布局 | 否  | object | {}
| onChange| 改变事件 | 否 | fun | --
| isEnable | 是否渲染 | 否  | object | {}
| enums| 改变事件 | 否 | fun | --
| required| 是否必填 | 否 | bool | --

field属性
type属性一共包含： input， inputNumber， text， select, radio, check, datepicker, rangepicker等常用表单， 除外还支持file， image， origin三个非常规组件，具体可参看下面介绍
| 属性名| 作用 | 必传 | 类型 | 默认值 | 备注
:---|:--:|---:|:---:|:---:|:---:  
| type | 表单类型 | 是 |  string | input
| key | 键值，表单属性值 | 是  | string | --
| name| 表单中文名 | 否 | string | --
| required | 必填 | 否  | bool | false | 权重： props.required > required > require
| placeholder | 说明 | 否  | string | 请输入/请选择
| defaultValue| 初始值 | 否 | 根据需要 | --
| disable| 是否禁用 | 否 | fun：data => { return } | --
| defaultValue| 初始值 | 否 | 根据需要 | --  
| rules| 校验规则 | 否 | array | -- |  必填的校验不在此定义
| maxLength| 最大长度 | 否 | num | -- | 适用：input， text  
| format| 日期格式化 | 否 | string | -- | 适用：日期类
| allowClear| 是否可清除 | 否 | bool | 适用：日期类， select
| enums| 枚举 | 否 | array | [] | 适用：select, radio, check  
很多在field和props同时出现的属性，props中的权重大于field中的。除了上面所列，还有一些不常用的，后面慢慢补充
### WithSearch：搜索框组件 ###
组件主要是要解决中台业务每个页面都会出现搜索框的共性问题，将共性提取到一个组件中，作为一个容器，用renderProps设计模式实现，容器中就是搜索框要展示的内容。见下面示例：
```
// fields.js
export const searchFields = [{
  key: 'userId',
  name: '用户ID',
},{
  key: 'mail',
  name: '邮箱',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'effectDate',
  name: '生效日期',
  startKey: 'effectBeginDate',
  endKey: 'effectEndDate',
  type: 'rangePicker'
}];

// SearchBar.js
import React from 'react';
import { Row, Col, Form, Button } from 'antd';

export default function SearchBar(props) {
  const { formRender, onSearch, search, searchFields, operate } = props;
  return (
    <Form className="h-search-form">
      <Row>
        {searchFields.map((field, index) => (
          <Col span={8} key={index}>
            {formRender({ field, data: search })}
          </Col>
        ))}
      </Row>
      <div style={{ paddingTop: 2, textAlign: 'center' }}>
        <Button type="primary" onClick={onSearch}>搜索</Button>
        <Button className="ml-20" onClick={() => operate('add')}>新增用户</Button>
      </div>
    </Form>
  );
}

// index.js 部分

const searchBarProps = {
  search,
  actions,
  paramFormat: ({ effectDate = [], ...others }) => ({
    effectBeginDate: effectDate[0] && effectDate[0].valueOf(),
    effectEndDate: effectDate[1] && effectDate[1].valueOf(),
    ...others
  })
};
return (
  <div>
    <WithSearch {...searchBarProps} >
      {props => <Search {...props} searchFields={searchFields} operate={this.handleOperate} />}
    </WithSearch>
  </div>
);
```
![搜索框渲染图][2]
#### 参数 ####
props输入  
| 参数名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|:---:   
| search | 搜索初始值 | 否 | object | {} 
| actons | 动作处理函数 | 是 |  object | 无：对象中得包含一个onSearch方法 
| paramFormat | 搜索值格式化 | 否 |  fun: 参照示例 | -- 
| pageName | 页码属性名 | 否 | string | pageNo

renderProps输出
| 参数名| 作用 | 
---|:--:
| form | 表单form属性 | 
| getFormData | 获取表单值，没有被paramformat格式化过 | 
| formRender | 表单渲染组件 | 
### EnhanceTable：用法通HTable，传参更少  ### 
组件主要是要解决中台业务每个表单页面都会使用antd的table，但相似度极高。所以用一个组件将table包起来，并加入了一些通用的处理逻辑，作用同HTable。  
看示例  
```
// fields.js
export const fields = [{
  key: 'userName',
  name: '真实姓名',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'status',
  name: '状态',
  enums: userStatus
}];

// index.js
import React from 'react';
import { Popconfirm } from 'antd';
import { EnhanceTable} from 'antd-doddle';
import { fields } from './fields';

const forkDatas = [{
  id: 1,
  userName: 'Dom',
  userId: 'closertb',
  status: 0
}, {
  id: 2,
  userName: 'Simon',
  userId: 'simona',
  status: 1
}];
export default class ExampleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getExtraFields() {
    return [
      {
        key: 'operate',
        name: '操作',
        width: 180,
        fixed: 'right',
        render: (text, detail) => (
          <div>
            <a onClick={() => { this.handleOperate('update', detail); }}>修改</a>
            <Popconfirm title="确认删除？" onConfirm={() => { this.handleOperate('delete', detail); }}>
              <a className="ml-10">删除</a>
            </Popconfirm>
          </div>)
      }
    ];
  }
  render() {
    const { search, actions = { onSearch: (param) => { console.log('fork', param); }} } = this.props;
    const forkProps = {
      fields,
      actions,
      search,
      rowKey: 'id',
      datas: forkDatas,
      extraFields: this.getExtraFields()
    };

    return (
      <div>
        <EnhanceTable {...forkProps} />
      </div>
    );
  }
}
```  
![table渲染列表][3]
#### 参数 ####  
| 参数名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|:---:   
| fields | 渲染属性 | 是 | array | --
| actons | 翻页查询操作 | 是 |  object | 无：对象中得包含一个onSearch方法 
| search | 初始化分页 | 是 |  object | { pageSize: 10, pageNo: 1 } 
| datas | 要渲染的数据 | 是 | array | []
| total | 总数 | 是 | number | --
| rowKey | 主键名 | 否 | string | id
| loading | 加载标示 | 否 | object | --： 其中含一个list属性的bool值
| rowKey | 主键名 | 否 | string | id
| footer | 总条数自定义显示 | 否 | fun | t => `共 ${t} 条`
| pageName | 页码属性名 | 否 | string | pageNo: 除了pageNo，还对pageNum做了兼容
| noPage | 是否显示分页 | 否 | bool | false
| ... | table其他可设置属性 | 否 | -- | --
### RenderDetail：详情渲染组件 ###
解决中台常出现的详情展示问题。
```
// fields.js
export const fields = [{
  key: 'userName',
  name: '真实姓名',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'status',
  name: '状态',
  enums: userStatus
}, {
  key: 'applyTime',
  name: '申请时间',
  type: 'datetime',
}];

export const privateFields = [{
  key: 'address',
  name: '家庭地址',
},{
  key: 'marital',
  name: '婚姻状况',
}, {
  key: 'mateName',
  name: '配偶姓名',
  isShow: detail => detail.marital === '已婚'
}, {
  key: 'mateIdNo',
  name: '配偶证件号码',
  isShow: detail => detail.marital === '已婚'
}, {
  key: 'familylNum',
  name: '家庭人数',
},  {
  key: 'childrenStatus',
  name: '子女情况',
  render: ({ childrenStatus }) => {
    if (childrenStatus.childlessness === -1) {
      return '--';
    }
    return childrenStatus.childlessness ? `成年子女${childrenStatus.adultChildren}个,未成年子女${childrenStatus.minorChildren}个` : '无子女';
  }
}];

// detail.js
import React from 'react';
import { Spin } from 'antd';
import { RenderDetail } from 'antd-doddle';
import { fields, privateFields } from './fields';

const forkDatas = {
  baseInfo: {
    id: 1,
    userName: 'Dom',
    userId: 'closertb',
    status: 0,
    applyTime: 1550973288220
  }, 
  defineInfo: {
    address: 'china sichuan',
    familylNum: 6,
    marital: '已婚',
    mateName: 'Simon',
    mateIdNo: '5107021970',
    childrenStatus: { childlessness: 1, adultChildren: 1, minorChildren: 1 },
  }, 
  noInfo: {
    address: 'china sichuan',
    familylNum: 3,
    marital: '未婚',
    childrenStatus: { childlessness: 0 },
  }
};

export default function Detail(props) {
  const { confirmLoading } = props;
  return (
    <Spin spinning={confirmLoading}>
      <RenderDetail fields={fields} detail={forkDatas.baseInfo} fieldsName="用户信息" />
      <RenderDetail fields={privateFields} detail={forkDatas.defineInfo} fieldsName="自定义已婚信息" />
      <RenderDetail fields={privateFields} detail={forkDatas.noInfo} fieldsName="自定义未婚信息" />
    </Spin>
  );
}
```
![详情渲染][4]
#### 参数 ####  
| 参数名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|:---:   
| fields | 渲染列表 | 是 | array | --
| detail | 翻页查询操作 | 是 |  object | {} 
| fieldsName | 栏目标题 | 是 |  string |  
field 参数  
| 参数名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|:---:   
| key | 渲染属性名 | 是 | string | --
| name | 属性名称 | 是 |  string | -- 
| type | 类型 | 否 |  string | 
| isShow | 是否渲染 | 否 | fun: detail => !detail.name | --
| enums | 枚举 | 否 |  [] | -- [{ label: '', value: '' }]
| render | 自定义渲染 | 否 |  string | 
**注：**如果对显示的样式不符合要求，可自己重定义样式。
### HModal: 最早的carno Hmodal组件 ###  
同HModal，只是大前端HModal更新太快，所以单独复制了一份出来。
### OriginSearch：搜索下拉框选择组件  ### 
组件在Antd的AutoComplete基础上包了一层，将输入与选择后两个状态隔离开。
```
import React from "react";
import { Form } from "antd";
import { OriginSearch } from "antd-doddle";

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const mockFetch = ({ keyword }) =>
  new Promise(resolve =>
    setTimeout(() => {
      const ran = Math.floor((Math.random() + 0.1) * 10); // 生成一个1~11的随机数列表
      const no = 80000 + ran * 1111;
      const res = new Array(ran).fill(1).map((data, index) => ({
        id: no + index,
        name: `${keyword}0${index + 1}`
      }));
      resolve(res);
    }, 600)
  );
class ModalBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(value, index, searchRes) {
    const snapshot = searchRes[index];
    console.log(value, index, searchRes);
    this.setState({ value: snapshot });
    // return值，既是搜索输入框最终要显示的值
    return snapshot;
  }
  render() {
    const modalProps = {
      style: { width: "200px" },
      placeholder: "请输入员工工号/姓名", // 默认为请输入姓名或工号
      // allowEmpty: true, // 是否允许输入为空时，发起请求，默认为false；
      // isShowIcon: false, // 是否显示搜索标志，默认显示，false时不显示
      onSelect: this.handleSelect,
      format: datas =>
        datas.map(({ name, id }, index) => ({
          label: `${name}(${id})`,
          value: `${id}`,
          key: index
        })),
      valueFormat: value => `${value.name}(${value.id})`,
      fetchData: mockFetch, // 一个带promise特性的请求；
      searchKey: "keyword",
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="inline" style={{ width: 600 }}>
          <FormItem type="inline" {...formItemLayout} label="员工姓名">
            {getFieldDecorator("search", {
              initialValue: { name: "Dom", id: '0909' }
            })(<OriginSearch {...modalProps} />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ModalBase);
```
![远程搜索框渲染详情][5]
#### 参数 ####  
| 参数名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|:---:   
| fetchData | 带promise的数据获取接口 | 是 |  fun：promise | --
| format | 下拉列表显示自定义规则函数，返回[{ key: 0, label: '',value: ''}] | 是 |  fun |  value => value
| value | 初始值 | 否 | any | --
| valueFormat | 数据显示框自定义数据显示函数 | 否 |  fun | value => value
| search | 自定义搜索数据对象 | 否 |  objet |  {}
| searchKey | 搜索关键词属性名 | 否 | string | keyword
| onSelect | 下拉列表选择后自定义动作 | 是 | fun | --：函数返回值即为选择后的数据
#### 特别说明 ####
组件支持纯表单与带数据双向绑定（getFieldDecorator）的表单，上面的示例展示的是双向数据绑定的
 - value与valueFormat：主要考虑是value更多时候是一个对象，而要显示出来的一般都是一个字符串，而字符串怎么生成的，完全由传递过去的value决定，valueFormat则是一个加工函数，决定value怎么展示出来。
 - search 与 searchKey: 做远程数据搜索，一般我们的传参是一个由对象生成的key=value表单形式，而针对于边输入边搜索的远程搜索接口，往往都只有一个参数是改变的，但这个接口需要三个必传参数，所以就可以把不变的两个参数放在search，而searchKey会在search中动态写入值。
 - format： 其作用最重要的就是生成下拉列表options的原始数据，而键值key除了标识这是唯一数据，还被用来做数据的索引，所以返回值不带key的时候，组件内部会议数组索引作为Key。
  - onSelect：这个函数的入参是（value，index， searchRes），分别对于下拉选择的value，下拉项对应的数据索引和搜索的结果。通过searchRes[index],可以得到搜索结果对应的哪一行数据。而且其必须有一个返回值，这个值会被当作下一周期的初始值。
### DaynamicForm：动态增减下拉框组件 ###
此组件的出现是为了解决需求大量的动态表单实现，为其提供数据的增加一行，或删除一行，看示例：
```
import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, TimePicker, InputNumber } from 'antd';
import { DaynamicForm } from 'antd-doddle';
import { formItemLayout } from '../../configs/constants';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const format = 'HH:mm';

export default class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Form>
        <Row>
          <Col span={15}>
            <FormItem {...formItemLayout} label="分布规则">
              <DaynamicForm name="dispenses2">
                {(rule, actions) => <span key={rule.key}>
                  <InputNumber
                    style={{ margin: '0 5px', width: 140 }}
                    value={rule.min}
                    min={0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 保留2位小数"
                    onChange={e => actions.handleChange(e, rule.key, 'min')}
                  />元    到
                  <InputNumber
                    style={{ margin: '0 5px', width: 140 }}
                    value={rule.max}
                    min={rule.min || 0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 保留2位小数"
                    onChange={e => actions.handleChange(e, rule.key, 'max')}
                  />
                  元    占比
                  <InputNumber
                    style={{ margin: '0 5px', width: 140 }}
                    min={1}
                    step={1}
                    precision={0}
                    value={rule.ratio}
                    placeholder=">0, 正整数"
                    onChange={e => actions.handleChange(e, rule.key, 'ratio')}
                  />%
                </span>}
              </DaynamicForm>
            </FormItem>
          </Col>
          <Col span={9}>
            <FormItem {...formItemLayout} label="满减规则">
              <DaynamicForm key="fullRules">
                {(rule, actions) => <span key={rule.key}>
                  <span>满</span>
                  <InputNumber
                    style={{ margin: '0 5px', width: 100 }}
                    value={rule.full}
                    min={0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 2位小数"
                    onChange={e => actions.handleChange(e, rule.key, 'full')}
                  />元，减
                  <InputNumber
                    style={{ margin: '0 5px', width: 100 }}
                    value={rule.reduction}
                    min={0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 2位小数"
                    onChange={e => actions.handleChange(e, rule.key, 'reduction')}
                  />
                  元
                </span>}
              </DaynamicForm>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <FormItem {...formItemLayout} label="使用时间限制">
              <DaynamicForm key="suiteConsumeTimespanArr" canMove >
                {(rule, actions) => <span key={rule.key}>
                  <TimePicker
                    format={format}
                    style={{ width: 100 }}
                    placeholder="请选择"
                    value={rule.start && moment(rule.start, format)}
                    onChange={e => actions.handleChange(e, rule.key, 'start')}
                  />  到
                  <TimePicker
                    format={format}
                    placeholder="请选择"
                    style={{ width: 100, marginLeft: 10 }}
                    value={rule.end && moment(rule.end, format)}
                    onChange={e => actions.handleChange(e, rule.key, 'end')}
                  />
                </span>}
              </DaynamicForm>
            </FormItem>
          </Col>     
          <Col span={9}>
            <FormItem {...formItemLayout} label="禁用期规则">
              <DaynamicForm key="limitDateArr">
                {(rule, actions) => <span key={rule.key}>
                  <RangePicker
                    format={'YYYY-MM-DD'}
                    style={{ width: 228 }}
                    value={rule.time || []}
                    className="search-range-picker"
                    onChange={e => actions.handleChange(e, rule.key, 'time')}
                  />
                </span>}
              </DaynamicForm>
            </FormItem>
          </Col> 
        </Row>
      </Form>
    );
  }
}
```
![远程搜索框渲染详情][6]
#### 参数 ####  
** 输入 **
| 参数名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|:---:   
| children | 动态渲染的内容节点 | 是 |  node | --
| canMove | 是否可上移下移 | 否 |  bool |  false
| value | 初始值 | 否 | array | [{ key: 0 }] 
| onChange | 状态改变要触发的方法 | 否 |  fun | --
** 输出 **
| 参数名| 作用 |
---|:--:|  
| rule | 渲染节点要绑定的数据对象 |
| acitons | 动作，包含三种，比较常用的一种就是handleChange，做数据绑定用 |
#### 特别说明 ####
 - value：从上面看出，value是有一个默认值的，所以会初始化一行内容。下面自定义dom节点的值，来源也是value，所以在做数据绑定值务必要一一对应
### FileUpload：文件上传（也可传图片）组件，支持与装饰器继承，支持样板设置，与初始上传提醒  ###
文件的上传，支持form双向数据绑定（文件先上传，存储storeId），支持多文件的上传，支持图片预览与图片样例与提示，支持回显。
```
后面补充
```
![图片上传渲染详情][7]
#### 参数 ####  
** 输入 **
| 参数名| 作用 | 必传 | 类型 | 默认值  
---|:--:|---:|---:|:---:   
| upload | 图片上传请求 | 是 |  fun：promise | --
| children | 动态渲染的内容节点 | 是 |  node | --
| fileSize | 文件最大限制 | 否 | bool |  false
| reg | 文件类型限制 | 否 | regex | /(jpe?g|JPE?G|png|PNG)$/
| tips | 类型错误提示语 | 否 | string | 请选择jpg,png类型的图片格式
| listType |  上传类型，普通文件同 | 否 |  同antd |  false
| simple | 样例，仅适用于listType为picture-card时 | 否 | array | [{ key: 0 }] 
| info | 上传前的提示语 | 否 |  string | --
| maxSize | 最大上传数量 | 否 | number | 1
| value | 初始值 | 否 | string | '',多个图片以逗号隔开
| onChange | 状态改变触发的方法 | 否 |  fun | --

## utils方法 ##
说明：utils是一个常用方法集，也包含一些常用枚举定义   
eg:
``` 
import utils from 'ffe-basic';
const { DATE_FORMAT, getEnumObject } = utils;
```
DATE_FORMAT： 标准日期格式，YYYY-MM-DD  
DATE_TIME_FORMAT： 标准时间格式，YYYY-MM-DD HH:mm:ss  
formItemLayout： 表单布局通用格式， label：wrapper = 8 ：15  
isEmpty：判断输入是否是空对象或空数组  
getEnumObject：根据指定的枚举值和枚举数组，找出其枚举对应的数组索引  
toFormatEnums： 将后端返回的对象转化成标准的label，value对象数组  
concatAddress： 用于地址拼接，常与citypicker套用  
throttle：节流函数  
compileParam：详情跳转参数简单加密  
unCompileParam： 详情跳转参数简单解密 
idCodeValid：校验身份证号码是否合法  
getSexById： 通过身份证号获取性别  
getAgeById： 根据身份证号码获取年龄  
toDecimalNumber：金额数据千分位化与保留小数点后n位  
objectToList： 从动态表单中提取list数据  


[1]: https://image-static.segmentfault.com/137/732/1377327670-5c70bf34c3559_articlex
[2]:https://image-static.segmentfault.com/300/531/3005317161-5c71348f2075f_articlex
[3]:https://image-static.segmentfault.com/394/669/3946697895-5c714f5490a3e_articlex
[4]:https://image-static.segmentfault.com/258/724/2587248964-5c720534ba46c_articlex
[5]:https://image-static.segmentfault.com/357/114/3571145259-5c72398e109ea_articlex
[6]:https://image-static.segmentfault.com/111/705/1117054860-5c72670c6852f_articlex
[7]:https://image-static.segmentfault.com/419/056/4190565611-5c726f538d345_articlex