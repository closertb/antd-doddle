import moment from 'moment';
import { getEnumObject, toDecimalNumber, DATE_FORMAT, DATE_TIME_FORMAT } from '../index';

const isValid = date => Boolean(date) && (typeof date === 'number' || typeof date === 'string');
const getParsedDate = (date, format) => isValid(date) ? moment(date).format(format) : '';

/*
 * column类型定义
 */
const fieldTypes = {
  normal: value => value,
  date: value => getParsedDate(value, DATE_FORMAT),
  datetime: value => getParsedDate(value, DATE_TIME_FORMAT),
  decimal: value => toDecimalNumber(value),
  enum: (value, { enums }) => getEnumObject(enums, value).label || ''
};

/*
 * 扩展column类型定义
 */
export const combineTypes = types => Object.assign(fieldTypes, types);

export default fieldTypes;
