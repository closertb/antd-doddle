var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
export default class DynamicForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handlMoveUp = index => () => {
            const { rules } = this.state;
            const _a = rules[index], { key } = _a, temp = __rest(_a, ["key"]);
            const lastIndex = findValid(rules, key, -1);
            rules[index] = Object.assign({}, rules[lastIndex], { key });
            rules[lastIndex] = Object.assign({}, temp, { key: lastIndex });
            this.setState({
                rules: [...rules]
            });
            this.trigger(rules);
        };
        this.handlMoveDown = index => () => {
            const { rules } = this.state;
            const _a = rules[index], { key } = _a, temp = __rest(_a, ["key"]);
            const nextIndex = findValid(rules, key, 1);
            rules[index] = Object.assign({}, rules[nextIndex], { key });
            rules[nextIndex] = Object.assign({}, temp, { key: nextIndex });
            this.setState({
                rules: [...rules]
            });
            this.trigger(rules);
        };
        const { value, disableBtn = false } = props;
        const isValid = !!value && value.length > 0;
        const initValue = isValid ? value : [{ key: 0 }];
        this.state = {
            canReset: !isValid,
            rules: initValue.map((ele, key) => (Object.assign({ disableBtn }, ele, { key }))),
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
            return { rules: value.map((ele, key) => (Object.assign({ disableBtn }, ele, { key }))), canReset: false };
        }
        return null;
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
        return (React.createElement("div", { className: "doddle-daynamic-form" }, validDatas.map((rule, index) => (React.createElement("div", { key: rule.key },
            children(rule, dataBind),
            !rule.disableBtn && index > 0 &&
                React.createElement(Button, { style: { marginLeft: 10 }, type: "primary", shape: "circle", icon: "minus", onClick: () => this.handlMinus(rule.key) }),
            !rule.disableBtn && index === 0 &&
                React.createElement(Button, { style: { marginLeft: 10 }, onClick: this.handlAdd, type: "primary", shape: "circle", icon: "plus" }),
            !rule.disableBtn && canMove && index > 0 &&
                React.createElement(Button, { style: { marginLeft: 10 }, onClick: this.handlMoveUp(rule.key), type: "primary", shape: "circle", icon: "up" }),
            !rule.disableBtn && canMove && (index < length) &&
                React.createElement(Button, { style: { marginLeft: 10 }, onClick: this.handlMoveDown(rule.key), type: "primary", shape: "circle", icon: "down" }))))));
    }
}
