---
title: 为什么要写
order: 1
---

关于antd-doddle是什么，前面已经介绍过了.这里介绍一下antd-doddle带来的意义,主要解决通用表单，列表，详情的写法，真正做到用数据（field）去驱动试图，下面一个常用的搜索框，感受一下

## 写一个搜索框
要实现一张类似于下面样式的效果图：
![效果图](https://user-images.githubusercontent.com/22979584/69646343-99d76d00-10a2-11ea-9fdb-197cd810c14f.png)

### 以前
我们会定义一个SearchBar组件，然后在组件中挨个去getFieldDecorator，代码量大，重复复制粘贴, 最后导出；接着在index.js中去引入，传参什么的
```jsx
// SearchBar.js
import { Form, Row, Col, Button, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { STATUS } from '../configs/constants';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const statusOptions = STATUS.map(({ label, value }, index) =>
  (<Option key={index} value={value}>{label}</Option>));

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.form.validateFields((err, { repayDate, ...others }) => {
      if (!err) {
        const [repayStartDate, repayEndDate] = rangeToArray(repayDate);
        this.props.fetchDeptList({ ...others, pageNum: 1, repayStartDate, repayEndDate });
      }
    });
  }
  render() {
    const { form: { getFieldDecorator }, search: { wayBillNum, loanProjNo, repayStartDate, repayEndDate, orderStatus } } = this.props.search;
    return (
      <div className="searchBar" >
        <Form layout="horizontal">
          <Row>
            <Col span={5}>
              <FormItem {...formItemLayout} label="运单号">
                {getFieldDecorator('wayBillNum', {
                  initialValue: wayBillNum
                })(
                  <Input style={{ width: '90%' }} placeholder="请输入运单号" />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem {...formItemLayout} label="贷款单号">
                {getFieldDecorator('loanProjNo', {
                  initialValue: loanProjNo
                })(
                  <Input style={{ width: '90%' }} placeholder="请输入贷款单号" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} className="range-picker" label="还款时间">
                {getFieldDecorator('repayDate', {
                  initialValue: [repayStartDate && moment(repayStartDate), repayEndDate && moment(repayEndDate)]
                })(
                  <RangePicker style={{ width: '90%' }} allowClear format={dateFormat} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <FormItem {...formItemLayout} label="订单状态">
                {getFieldDecorator('orderStatus', {
                  initialValue: orderStatus || 'UNREPAY'
                })(
                  <Select style={{ width: '90%' }} placeholder="请选择" allowClear>
                    {statusOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <div className="btnGroup">
            <Button type="primary" onClick={this.handleSubmit}>查询</Button>
            <Button type="primary" style={{ marginLeft: 20 }} onClick={this.handleExport}>批量导出</Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(SearchBar);

// index.js 这里简写
import { Table } from 'antd';
import SearchBar from './SearchBar';

function Index(props) {
  const { fetchDeptList, search } = props;

  return (
    <div>
      <SearchBar search={search} fetchDeptList={fetchDeptList} />
      <Table />{/* 伪代码 */}
    </div>
  )
}

```
### 现在
嗯，你是不是感觉翻了很久的图片，才翻到这里。过时的写法就是这样的，代码冗余，看着心累。现在看看使用antd-doddle中的WithSearch组件会会发生什么；

```js

// index.js 这里简写
import { Button, Table } from 'antd';
import { WithSearch } from './SearchBar';
import { STATUS } from '../configs/constants';

const searchFields = [{
  key: 'wayBillNum',
  name: '运单号',
}, {
  key: 'loanProjNo',
  name: '贷款单号',
}, {
    key: 'repayDate',
    name: '有效期',
    type: 'rangePicker',
    startKey: 'repayStartDate',
    endKey: 'repayEndDate',
}, {
  key: 'orderStatus',
  name: '订单状态',
  type: 'select',
  enums: STATUS
}];

function Index(props) {
  const { fetchDeptList, search } = props;

  const searchProps = {
    search,
    fields: searchFields,
    onSearch: fetchDeptList,
    extraBtns: () => <Button type="primary" style={{ marginLeft: 20 }} onClick={this.handleExport}>批量导出</Button>
    // 搜索参数格式化
    paramFormat: ({ repayDate = [], ...others }) => ({
      repayStartDate: repayDate[0] && repayDate[0].valueOf(),
      repayEndDate: repayDate[1] && repayDate[1].valueOf()
      ...others
    })
  }
  return (
    <div>
      <WithSearch {...searchProps} />
      <Table />{/* 伪代码 */}
    </div>
  )
}
```

对比一下，代码量是不是减少了好多，要添加减少搜索项，我们只需要去维护field。更多方便，请看组件介绍及示例。