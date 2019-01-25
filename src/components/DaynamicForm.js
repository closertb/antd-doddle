import React from 'react';
import bind from 'bind-decorator';
import { Button } from 'antd';
import styles from './index.less';

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

export default class DaynamicForm extends React.Component {
  constructor(props) {
    super(props);
    const { value = [{ key: 0 }] } = props;
    this.state = {
      rules: value.map((ele, key) => ({ ...ele, key })),
    };
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
  @bind
  handlMinus(index) {
    const { rules } = this.state;
    rules[index].deleteFlag = true;
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  @bind
  handlAdd() {
    let { rules } = this.state;
    rules = rules.concat([{ value: undefined, key: rules.length }]);
    this.setState({ rules: [...rules] });
    this.trigger(rules);
  }
  @bind
  handleChange(val, index, key) {
    const { rules } = this.state;
    rules[index][key] = val;
    this.setState({
      rules: [...rules]
    });
    this.trigger(rules);
  }
  @bind
  trigger(res) {
    const { onChange } = this.props;
    // 虽说Res的值已经用this.setState更新过，但方法是异步的，所以不能直接用this.state
    onChange(res.filter(e => !e.deleteFlag));
  }

  render() {
    const { children, canMove } = this.props;
    const { rules } = this.state;
    const actions = {
      handlAdd: this.handlAdd,
      handlMinus: this.handlMinus,
      handleChange: this.handleChange,
    };
    const validDatas = rules.filter(rule => !rule.deleteFlag);
    const length = validDatas.length - 1;
    return (
      <div className={styles.FullReduction}>
        {validDatas.map((rule, index) => (
          <div key={rule.key}>
            {children(rule, actions)}
            {index ?
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                shape="circle"
                icon="minus"
                onClick={() => this.handlMinus(rule.key)}
              /> :
              <Button
                style={{ marginLeft: 10 }}
                onClick={this.handlAdd}
                type="primary"
                shape="circle"
                icon="plus"
              />
            }
            {/* 第一条只能下移 */}
            {canMove && index > 0 &&
              <Button
                style={{ marginLeft: 10 }}
                onClick={this.handlMoveUp(rule.key)}
                type="primary"
                shape="circle"
                icon="up"
              />
            }
            {/* 最后一条只能上移 */}
            {canMove && (index < length) &&
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
