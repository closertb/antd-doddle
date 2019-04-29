import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, TimePicker, Input, InputNumber, Button, Tooltip } from 'antd';
import { editFields } from './fields';
import { formRender, DaynamicForm, OriginSearch } from '../../../src/index';
import { formItemLayout } from '../../configs/constants';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const format = 'HH:mm';

let FormRender;
const mockFetch = ({ keyword }) => new Promise(resolve => setTimeout(() => {
  const ran = Math.floor((Math.random() + 0.1) * 10); // 生成一个1~11的随机数
  const no = 80000 + ran * 1111;
  const res = new Array(ran).fill(1).map((data, index) => ({
    id: no + index,
    name: `${keyword}0${index + 1}`
  }));
  resolve(res);
}, 1000)
);
function handleSelect(value, index, searchRes) {
  const snapshot = searchRes[index];
  // return值，既是搜索输入框最终要显示的值
  return snapshot;
}
const field = {
  key: 'id',
  name: '候选人',
  required: true,
  type: 'origin',
  searchKey: 'keyword',
  format: data => data.map(({ id, name }, index) => ({
    label: `${name}(${id})`,
    value: name,
    key: index
  })),
  service: mockFetch
};
class LearnTest extends React.Component {
  constructor(props) {
    super(props);
    const { form: { getFieldDecorator } } = props;
    this.state = {};
    FormRender = formRender({ getFieldDecorator });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(value) {
    const {
      form: { validateFields }
    } = this.props;
    this.setState({ required: !!value }, () => {
      if (!value) {
        validateFields(['reason'], { force: true });
      }
    });
  }
  handleSubmit() {
    const { form: { validateFields } } = this.props;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
    });
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { required } = this.state;
    const originProps = {
      value: { name: 'dom', id: '92168' },
      searchKey: 'keyword',
      fetchData: mockFetch,
      format: data => data.map(({ id, name }, index) => ({
        label: `${name}(${id})`,
        value: name,
        key: index
      })),
      valueFormat: data => `${data.name || ''}(${data.id || ''})`,
      maxSize: 20,
      onSelect: handleSelect,
      allowClear: true
    };
    return (
      <Form>
        <Row>
          <Col span={8}>
            <FormRender field={{ onChange: this.handleChange, ...editFields.status }} />
          </Col>
          <Col span={8}>
            <FormItem label="原因" {...formItemLayout}>
              {
                getFieldDecorator('reason', {
                  rules: [{ required, message: '启用时原因必填' }]
                })(<Input />)
              }
            </FormItem>
          </Col>
          <Col>
            <Button onClick={this.handleSubmit}>提交</Button>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormRender field={field} data={{ id: '' }} />
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="renderProps">
              <OriginSearch {...originProps} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <FormItem {...formItemLayout} label="分布规则">
              <DaynamicForm name="dispenses2">
                {(rule, actions) => (
                  <span key={rule.key}>
                    <InputNumber
                      style={{ margin: '0 5px', width: 140 }}
                      value={rule.min}
                      min={0.01}
                      step={0.01}
                      precision={2}
                      placeholder=">0, 保留2位小数"
                      onChange={e => actions.handleChange(e, rule.key, 'min')}
                    />
                    元    到
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
                    />
                    %
                  </span>)
              }
              </DaynamicForm>
            </FormItem>
          </Col>
          <Col span={9}>
            <FormItem {...formItemLayout} label="满减规则">
              <DaynamicForm key="fullRules">
                {(rule, actions) => (
                  <span key={rule.key}>
                    <span>满</span>
                    <InputNumber
                      style={{ margin: '0 5px', width: 100 }}
                      value={rule.full}
                      min={0.01}
                      step={0.01}
                      precision={2}
                      placeholder=">0, 2位小数"
                      onChange={e => actions.handleChange(e, rule.key, 'full')}
                    />
                    元，减
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
                  </span>)
              }
              </DaynamicForm>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <FormItem {...formItemLayout} label="使用时间限制">
              <DaynamicForm key="suiteConsumeTimespanArr" canMove>
                {(rule, actions) => (
                  <span key={rule.key}>
                    <TimePicker
                      format={format}
                      style={{ width: 100 }}
                      placeholder="请选择"
                      value={rule.start && moment(rule.start, format)}
                      onChange={e => actions.handleChange(e, rule.key, 'start')}
                    />
                    到
                    <TimePicker
                      format={format}
                      placeholder="请选择"
                      style={{ width: 100, marginLeft: 10 }}
                      value={rule.end && moment(rule.end, format)}
                      onChange={e => actions.handleChange(e, rule.key, 'end')}
                    />
                  </span>)
              }
              </DaynamicForm>
            </FormItem>
          </Col>
          <Col span={9}>
            <FormItem {...formItemLayout} label="禁用期规则">
              <DaynamicForm key="limitDateArr">
                {(rule, actions) => (
                  <span key={rule.key}>
                    <RangePicker
                      format="YYYY-MM-DD"
                      style={{ width: 228 }}
                      value={rule.time || []}
                      className="search-range-picker"
                      onChange={e => actions.handleChange(e, rule.key, 'time')}
                    />
                  </span>)
              }
              </DaynamicForm>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}><Tooltip title="hamap"><div>zhesshazi</div></Tooltip></Col>
          <Col span={8}><Tooltip title="hamap"><Input value="dkdjdfhdfkdfk" disabled allowClear onChange={this.handleRemove} /></Tooltip></Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(LearnTest);
