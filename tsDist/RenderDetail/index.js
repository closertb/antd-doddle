import React from 'react';
import { getEnumObject } from '../utils';
import fieldTypes from '../EnhanceTable/table/fieldTypes';
import './index.less';
/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: detail  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */
const countEnums = ['one-item', 'two-item', 'three-item', 'four-item'];
function renderBaseFields(fields, detail = {}) {
    return fields.map(({ name, key, type, enums, render, isShow, unit = '', itemCount = 2 }, index) => {
        let value = detail[key];
        // 处理格式化数据
        if (type && value && fieldTypes[type]) {
            value = fieldTypes[type](value, detail);
        }
        // 处理枚举
        if (enums && enums.length > 0) {
            value = getEnumObject(enums, detail[key]).label;
        }
        // 处理render 函数
        if (render && typeof render === 'function') {
            value = render(detail);
        }
        // 如果存在是否显示的定义，并且判断为不显示，直接返回null
        if (isShow && !isShow(detail)) {
            return null;
        }
        const lineClass = countEnums[itemCount - 1];
        // 处理没有值时，统一显示为--,
        const final = (value === undefined || value === '') ? '--' : value;
        return (React.createElement("div", { className: `showInfo-item ${lineClass}`, key: index },
            React.createElement("span", { className: "showInfo-label" }, name),
            React.createElement("span", { className: "showInfo-value" },
                final,
                final === value ? unit : '')));
    });
}
function RenderDetail(props) {
    const { fields, detail = {}, fieldsName, children } = this.props;
    return (React.createElement("div", { className: "doddle-render-detail" },
        fieldsName && React.createElement("h3", { className: "title" }, fieldsName),
        React.createElement("div", { className: "showInfo-content" }, children ? children(renderBaseFields) : renderBaseFields(fields, detail))));
}
export default React.memo(RenderDetail);
