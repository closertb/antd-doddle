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
// 该文件来源于carno/addons
import fieldTypes, { combineTypes } from './fieldTypes';
/*
 * 获取column中显示的filedValue
 */
/*eslint-disable*/
function getFieldValue(value, field) {
    let type = field.type || (field.enums && 'enum');
    type = fieldTypes.hasOwnProperty(type) ? type : 'normal';
    return fieldTypes[type](value, field);
}
function createColumns(fields, fieldKeys, extraFields) {
    const chain = {};
    let columns = [];
    const transform = (_fields) => {
        return _fields.map(field => {
            let { dataIndex, title, key, name, render } = field, others = __rest(field, ["dataIndex", "title", "key", "name", "render"]);
            if (!render) {
                render = (value) => {
                    return getFieldValue(value, field);
                };
            }
            return Object.assign({ dataIndex: key || dataIndex, title: name || title, render }, others);
        });
    };
    const pick = (_fieldKeys) => {
        _fieldKeys = [].concat(_fieldKeys);
        columns = _fieldKeys.map(fieldKey => {
            let column = columns.find(item => fieldKey == (item.key || item.dataIndex));
            if (!column) {
                // 如果fieldKey不存在，则创建text类型的column
                column = {
                    dataIndex: fieldKey,
                    title: fieldKey,
                    render: (value) => {
                        return getFieldValue(value);
                    }
                };
            }
            return column;
        });
        return chain;
    };
    const excludes = (_fieldKeys) => {
        _fieldKeys = [].concat(_fieldKeys);
        columns = columns.filter(column => !_fieldKeys.includes(column.dataIndex));
        return chain;
    };
    const enhance = (_extraColumns) => {
        if (!Array.isArray(_extraColumns)) {
            _extraColumns = Object.keys(_extraColumns).map(key => {
                return Object.assign(_extraColumns[key], {
                    key
                });
            });
        }
        _extraColumns.forEach(extraColumn => {
            let { dataIndex, title, key, name } = extraColumn, others = __rest(extraColumn, ["dataIndex", "title", "key", "name"]);
            extraColumn = Object.assign({ dataIndex: key || dataIndex, title: name || title }, others);
            // 如果extraColumn.title为undefined，则删除title属性，防止assign时覆盖掉原来的title
            if (extraColumn.hasOwnProperty('title') && extraColumn.title == undefined) {
                delete extraColumn.title;
            }
            const column = columns.find(item => item.dataIndex == extraColumn.dataIndex);
            if (column) {
                Object.assign(column, extraColumn);
            }
            else {
                columns.push(extraColumn);
            }
        });
        return chain;
    };
    const values = () => {
        return columns;
    };
    columns = transform(fields);
    if (fieldKeys) {
        pick(fieldKeys);
    }
    if (extraFields) {
        enhance(extraFields);
    }
    return Object.assign(chain, {
        pick,
        excludes,
        enhance,
        values
    });
}
export default {
    combineTypes,
    getFieldValue,
    createColumns
};
