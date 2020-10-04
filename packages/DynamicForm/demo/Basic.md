---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, TimePicker, InputNumber } from 'antd';
// import { DynamicForm } from 'antd-doddle';
import DynamicForm from "../index";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const format = 'HH:mm';
const NowTime = Date.now();
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
    this.state = { reducRules: [] };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ reducRules: [{ full: 80, reduction: 5 }, { full: 50, reduction: 3 }] });
    }, 1000);
  }
  render() {
    const { reducRules } = this.state;
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
              <DynamicForm key="fullRules" value={reducRules} canMove >
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
            <FormItem {...formItemLayout} label="仅回显，禁用编辑">
              <DynamicForm key="suiteConsumeTimespanArr" value={[{ start: NowTime, end: NowTime + 100 }, { start: NowTime + 100000, end: NowTime + 100 }]} disableBtn >
                {(rule, dataBind) => <span key={rule.key}>
                  <TimePicker
                    format={format}
                    disabled={rule.disableBtn}
                    style={{ width: 100 }}
                    placeholder="请选择"
                    value={rule.start && moment(rule.start)}
                    onChange={value => dataBind(value, rule.key, 'start')}
                  />  到
                  <TimePicker
                    format={format}
                    disabled={rule.disableBtn}
                    placeholder="请选择"
                    style={{ width: 100, marginLeft: 10 }}
                    value={rule.end && moment(rule.end)}
                    onChange={value => dataBind(value, rule.key, 'end')}
                  />
                </span>}
              </DynamicForm>
            </FormItem>
          </Col>     
          <Col span={9}>
            <FormItem {...formItemLayout} label="有效期规则" >
              <DynamicForm key="limitDateArr" value={[{ time:[ NowTime, NowTime + 100000] }, { time:[ NowTime + 9000, NowTime + 900000] }]}>
                {(rule, dataBind) => <span key={rule.key}>
                  <RangePicker
                    format={'YYYY-MM-DD'}
                    style={{ width: 228 }}
                    value={rule.time && [moment(rule.time[0]), moment(rule.time[1])] }
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