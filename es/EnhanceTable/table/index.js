var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}; // 该文件来源于carno/addons


import fieldTypes, { combineTypes } from './fieldTypes';
/*
 * 获取column中显示的filedValue
 */

/*eslint-disable*/

function getFieldValue(value, field) {
  var type = field.type || field.enums && 'enum';
  type = fieldTypes.hasOwnProperty(type) ? type : 'normal';
  return fieldTypes[type](value, field);
}

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
          others = __rest(field, ["dataIndex", "title", "key", "name", "render"]);

      if (!render) {
        render = function render(value) {
          return getFieldValue(value, field);
        };
      }

      return Object.assign({
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
          others = __rest(extraColumn, ["dataIndex", "title", "key", "name"]);

      extraColumn = Object.assign({
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

export default {
  combineTypes: combineTypes,
  getFieldValue: getFieldValue,
  createColumns: createColumns
};