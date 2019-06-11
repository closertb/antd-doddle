import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT, toDecimalNumber } from '../utils';
var detailType = {
  date: function date(value) {
    return moment(value).format(DATE_FORMAT);
  },
  datetime: function datetime(value) {
    return moment(value).format(DATE_TIME_FORMAT);
  },
  decimal: function decimal(value) {
    return toDecimalNumber(value);
  }
};
export var extendDetailTypes = function extendDetailTypes(types) {
  return Object.assign(detailType, types);
};
export default detailType;