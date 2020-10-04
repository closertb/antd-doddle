import React from 'react';
import { Input, Select } from 'antd';
import { EnumField } from '../utils';

const Option = Select.Option;
const DefaultEnums = [{
  value: 'M', label: '分钟',
}, {
  value: 'H', label: '小时',
}, {
  value: 'D', label: '天',
}];
interface InputWithUnitProps {
  value?: any, // 初始值
  defaultUnit?: string, // 默认单位
  enums?: EnumField [], // 
  inputProps?: object,
  selectProps?: object,
  onChange?: Function
}

interface InputWithUnitState {
  number: number | string,
  unit: string
}

export default class InputWithUnit extends React.Component<InputWithUnitProps> {
  state: InputWithUnitState
  constructor(props) {
    super(props);
    const { value = {}, defaultUnit } = this.props;
    this.state = {
      number: value.number,
      unit: value.unit || defaultUnit,
    };
    this.handleChange = this.handleChange.bind(this);
    this.trigger = this.trigger.bind(this);
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
  handleChange(val, key) {
    const res = this.state;
    this.setState({
      [key]: val
    });
    this.trigger({ ...res, [key]: val });
  }
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
          onChange={e => this.handleChange(e.target.value, 'number')}
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
          {enums.map(({ value, label }) => (<Option key={value} value={value}>{label}</Option>))}
        </Select>
      </span>
    );
  }
}
