---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, TimePicker, InputNumber } from 'antd';
import DynamicForm from "../index.js";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const format = 'HH:mm';
// 表单通用格式
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

class Basic extends React.Component {
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
              <DynamicForm name="dispenses2">
                {(rule, dataBind) => <span key={rule.key}>
                  <InputNumber
                    style={{ margin: '0 5px', width: 140 }}
                    value={rule.min}
                    min={0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 保留2位小数"
                    onChange={value => dataBind(value, rule.key, 'min')}
                  />元    到
                  <InputNumber
                    style={{ margin: '0 5px', width: 140 }}
                    value={rule.max}
                    min={rule.min || 0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 保留2位小数"
                    onChange={e => dataBind(e, rule.key, 'max')}
                  />
                  元    占比
                  <InputNumber
                    style={{ margin: '0 5px', width: 140 }}
                    min={1}
                    step={1}
                    precision={0}
                    value={rule.ratio}
                    placeholder=">0, 正整数"
                    onChange={e => dataBind(e, rule.key, 'ratio')}
                  />%
                </span>}
              </DynamicForm>
            </FormItem>
          </Col>
          <Col span={9}>
            <FormItem {...formItemLayout} label="满减规则">
              <DynamicForm key="fullRules">
                {(rule, dataBind) => <span key={rule.key}>
                  <span>满</span>
                  <InputNumber
                    style={{ margin: '0 5px', width: 100 }}
                    value={rule.full}
                    min={0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 2位小数"
                    onChange={e => dataBind(e, rule.key, 'full')}
                  />元，减
                  <InputNumber
                    style={{ margin: '0 5px', width: 100 }}
                    value={rule.reduction}
                    min={0.01}
                    step={0.01}
                    precision={2}
                    placeholder=">0, 2位小数"
                    onChange={e => dataBind(e, rule.key, 'reduction')}
                  />
                  元
                </span>}
              </DynamicForm>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <FormItem {...formItemLayout} label="使用时间限制">
              <DynamicForm key="suiteConsumeTimespanArr" canMove >
                {(rule, dataBind) => <span key={rule.key}>
                  <TimePicker
                    format={format}
                    style={{ width: 100 }}
                    placeholder="请选择"
                    value={rule.start && moment(rule.start, format)}
                    onChange={value => dataBind(value, rule.key, 'start')}
                  />  到
                  <TimePicker
                    format={format}
                    placeholder="请选择"
                    style={{ width: 100, marginLeft: 10 }}
                    value={rule.end && moment(rule.end, format)}
                    onChange={value => dataBind(value, rule.key, 'end')}
                  />
                </span>}
              </DynamicForm>
            </FormItem>
          </Col>     
          <Col span={9}>
            <FormItem {...formItemLayout} label="禁用期规则">
              <DynamicForm key="limitDateArr">
                {(rule, dataBind) => <span key={rule.key}>
                  <RangePicker
                    format={'YYYY-MM-DD'}
                    style={{ width: 228 }}
                    value={rule.time || []}
                    className="search-range-picker"
                    onChange={value => dataBind(value, rule.key, 'time')}
                  />
                </span>}
              </DynamicForm>
            </FormItem>
          </Col> 
        </Row>
      </Form>
    );
  }
}
ReactDOM.render(<Basic />, mountNode);
```