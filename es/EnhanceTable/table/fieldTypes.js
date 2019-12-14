import moment from 'moment';
import { getValueFromEnums, toDecimalNumber, DATE_FORMAT, DATE_TIME_FORMAT } from '../../utils';

var isValid = function isValid(date) {
  return Boolean(date) && (typeof date === 'number' || typeof date === 'string');
};

var getParsedDate = function getParsedDate(date, format) {
  return isValid(date) ? moment(date).format(format) : '';
};
/*
 * column类型定义
 */


var fieldTypes = {
  normal: function normal(value) {
    return value;
  },
  date: function date(value) {
    return getParsedDate(value, DATE_FORMAT);
  },
  datetime: function datetime(value) {
    return getParsedDate(value, DATE_TIME_FORMAT);
  },
  decimal: function decimal(value) {
    return toDecimalNumber(value, 2);
  },
  "enum": function _enum(value, _ref) {
    var enums = _ref.enums;
    return getValueFromEnums(enums, value);
  }
};
/*
 * 扩展column类型定义
 */

export var combineTypes = function combineTypes(types) {
  return Object.assign(fieldTypes, types);
};
export default fieldTypes;