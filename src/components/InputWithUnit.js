import React from 'react';
import { Input, Select } from 'antd';
import bind from 'bind-decorator';

const { Option } = Select;
const DefaultEnums = [{
  value: 'M', label: '分钟',
}, {
  value: 'H', label: '小时',
}, {
  value: 'D', label: '天',
}];

export default class InputWithUnit extends React.Component {
  constructor(props) {
    super(props);
    const { value = {}, defaultUnit } = this.props;
    this.state = {
      number: value.number,
      unit: value.unit || defaultUnit,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    // Should be a controlled component.
    const { value = {} } = nextProps;
    if ('number' in value && preState.number !== value.number) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  @bind
  handleChange(val, key) {
    const res = this.state;
    this.setState({
      [key]: val
    });
    this.trigger({ ...res, [key]: val });
  }

  @bind
  trigger(res) {
    const { onChange } = this.props;
    // 虽说Res的值已经用this.setState更新过，但方法是异步的，所以不能直接用this.state
    onChange && onChange(res);
  }

  render() {
    const { enums = DefaultEnums, inputProps = {}, selectProps = {} } = this.props;
    const time = this.state;
    return (
      <span>
        <Input
          value={time.number}
          onChange={val => this.handleChange(val, 'number')}
          style={{ width: '55%', marginRight: '3%' }}
          placeholder="请输入"
          {...inputProps}
        />
        <Select
          value={time.unit}
          style={{ width: '32%' }}
          allowClear={false}
          onChange={val => this.handleChange(val, 'unit')}
          {...selectProps}
        >
          {enums.map(({ value, label }) => (<Option value={value}>{label}</Option>))}
        </Select>
      </span>
    );
  }
}
