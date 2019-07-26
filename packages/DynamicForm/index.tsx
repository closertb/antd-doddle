import React from 'react';
import { Button } from 'antd';

// 根据方向，找出指定索引的有效的上一或下一数据项
function findValid(arr, index, dir = 1) {
  let target = index + dir;
  for (let i = target; ((dir === 1 && i < arr.length) || (dir === -1 && i >= 0)); i += dir) {
    if (!arr[i].deleteFlag) {
      target = i;
      break;
    }
  }
  return target;
}

// 规则接口定义
interface RuleProp {
  key: number,
  disableBtn?: boolean,
  [propName: string]: any
}

interface RenderFunc {
  (rule: RuleProp, actons: object): Node;
}

// 输入类型定义
interface DynamicFormProps {
    children: RenderFunc; // 子元素
    onChange?: Function; // Change事件回调函数
    canMove?: boolean; // 是否可上下调整
    value?: object []; // 组件初始值
    disableBtn?: boolean, // 组件是否不可编辑
}

// 内部状态定义
interface DynamicFormState {
  canReset: boolean,
  rules: RuleProp []
}



export default class DynamicForm extends React.PureComponent<DynamicFormProps> {
  state: DynamicFormState
  constructor(props) {
    super(props);
    const { value, disableBtn = false } = props;
    const isValid = !!value && value.length > 0;
    const initValue = isValid ? value : [{ key: 0 }];
    this.state = {
      canReset: !isValid,
      rules: initValue.map((ele, key) => ({ disableBtn, ...ele, key })),
    };
    this.handlMinus = this.handlMinus.bind(this);
    this.handlAdd = this.handlAdd.bind(this);
    this.bindChange = this.bindChange.bind(this);
    this.trigger = this.trigger.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { canReset } = prevState;
    const { value = [], disableBtn = false } = nextProps;
    if (canReset && value.length > 0) {
      return { rules: value.map((ele, key) => ({ disableBtn, ...ele, key })), canReset: false };
    }
    return null;
  }
  handlMoveUp = index => () => {
    const { rules } = this.state;
    const { key, ...temp } = rules[index];
    const lastIndex = findValid(rules, key, -1);
    rules[index] = { ...rules[lastIndex], key };
    rules[lastIndex] = { ...temp, key: lastIndex };
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  handlMoveDown = index => () => {
    const { rules } = this.state;
    const { key, ...temp } = rules[index];
    const nextIndex = findValid(rules, key, 1);
    rules[index] = { ...rules[nextIndex], key };
    rules[nextIndex] = { ...temp, key: nextIndex };
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  handlAdd() {
    let { rules } = this.state;
    rules = rules.concat([{ value: undefined, key: rules.length }]);
    this.setState({ rules: [...rules] });
    this.trigger(rules);
  }
  handlMinus(index) {
    const { rules } = this.state;
    rules[index].deleteFlag = true;
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  /**
   * @param {any} val 目标值
   * @param {*} index 索引行
   * @param {*} key 单个对象对应的属性
   */
  bindChange(val, index, key) {
    const { rules } = this.state;
    rules[index][key] = val;
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  trigger(res) {
    const { onChange } = this.props;
    // 虽说Res的值已经用this.setState更新过，但方法是异步的，所以不能直接用this.state
    onChange && onChange(res.filter(({ deleteFlag }) => !deleteFlag));
  }

  render() {
    const { children, canMove } = this.props;
    const { rules } = this.state;
    const dataBind = this.bindChange;
    const validDatas = rules.filter(({ deleteFlag }) => !deleteFlag);
    const length = validDatas.length - 1;
    return (
      <div className="doddle-daynamic-form">
        {validDatas.map((rule, index) => (
          <div key={rule.key}>
            {children(rule, dataBind)}
            {!rule.disableBtn && index > 0 &&
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                shape="circle"
                icon="minus"
                onClick={() => this.handlMinus(rule.key)}
              />
            }
            {!rule.disableBtn && index === 0 &&
              <Button
                style={{ marginLeft: 10 }}
                onClick={this.handlAdd}
                type="primary"
                shape="circle"
                icon="plus"
              />
            }
            {/* 第一条只能下移 */}
            {!rule.disableBtn && canMove && index > 0 &&
              <Button
                style={{ marginLeft: 10 }}
                onClick={this.handlMoveUp(rule.key)}
                type="primary"
                shape="circle"
                icon="up"
              />
            }
            {/* 最后一条只能上移 */}
            {!rule.disableBtn && canMove && (index < length) &&
              <Button
                style={{ marginLeft: 10 }}
                onClick={this.handlMoveDown(rule.key)}
                type="primary"
                shape="circle"
                icon="down"
              />
            }
          </div>)
        )}
      </div>
    );
  }
}
