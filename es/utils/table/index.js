"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fieldTypes = _interopRequireWildcard(require("./fieldTypes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
 * 获取column中显示的filedValue
 */

/*eslint-disable*/
function getFieldValue(value) {
  var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = field.type || field.enums && 'enum';
  type = _fieldTypes.default.hasOwnProperty(type) ? type : 'normal';
  return _fieldTypes.default[type](value, field);
}
/*
 * 获取表格column数组
 * 示例:
 * const columns = createColumns(fields,['name','author'],{ name: { render: ()=>{} }}).values();
 * const columns = createColumns(fields).excludes(['id','desc']).values();
 * const columns = createColumns(fields).pick(['name','author','openTime']).enhance({name:{ render: ()=>{} }}).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */


function createColumns(fields, fieldKeys, extraFields) {
  var chain = {};
  var columns = [];

  var transform = function transform(_fields) {
    return _fields.map(function (field) {
      var dataIndex = field.dataIndex,
          title = field.title,
          key = field.key,
          name = field.name,
          render = field.render,
          others = _objectWithoutProperties(field, ["dataIndex", "title", "key", "name", "render"]);

      if (!render) {
        render = function render(value) {
          return getFieldValue(value, field);
        };
      }

      return _objectSpread({
        dataIndex: key || dataIndex,
        title: name || title,
        render: render
      }, others);
    });
  };

  var pick = function pick(_fieldKeys) {
    _fieldKeys = [].concat(_fieldKeys);
    columns = _fieldKeys.map(function (fieldKey) {
      var column = columns.find(function (item) {
        return fieldKey == (item.key || item.dataIndex);
      });

      if (!column) {
        // 如果fieldKey不存在，则创建text类型的column
        column = {
          dataIndex: fieldKey,
          title: fieldKey,
          render: function render(value) {
            return getFieldValue(value);
          }
        };
      }

      return column;
    });
    return chain;
  };

  var excludes = function excludes(_fieldKeys) {
    _fieldKeys = [].concat(_fieldKeys);
    columns = columns.filter(function (column) {
      return !_fieldKeys.includes(column.dataIndex);
    });
    return chain;
  };

  var enhance = function enhance(_extraColumns) {
    if (!Array.isArray(_extraColumns)) {
      _extraColumns = Object.keys(_extraColumns).map(function (key) {
        return Object.assign(_extraColumns[key], {
          key: key
        });
      });
    }

    _extraColumns.forEach(function (extraColumn) {
      var _extraColumn = extraColumn,
          dataIndex = _extraColumn.dataIndex,
          title = _extraColumn.title,
          key = _extraColumn.key,
          name = _extraColumn.name,
          others = _objectWithoutProperties(_extraColumn, ["dataIndex", "title", "key", "name"]);

      extraColumn = _objectSpread({
        dataIndex: key || dataIndex,
        title: name || title
      }, others); // 如果extraColumn.title为undefined，则删除title属性，防止assign时覆盖掉原来的title

      if (extraColumn.hasOwnProperty('title') && extraColumn.title == undefined) {
        delete extraColumn.title;
      }

      var column = columns.find(function (item) {
        return item.dataIndex == extraColumn.dataIndex;
      });

      if (column) {
        Object.assign(column, extraColumn);
      } else {
        columns.push(extraColumn);
      }
    });

    return chain;
  };

  var values = function values() {
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
    pick: pick,
    excludes: excludes,
    enhance: enhance,
    values: values
  });
}

var _default = {
  combineTypes: _fieldTypes.combineTypes,
  getFieldValue: getFieldValue,
  createColumns: createColumns
};
exports.default = _default;