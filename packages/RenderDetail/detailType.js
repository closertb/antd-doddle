import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT, toDecimalNumber } from '../utils';

const detailType = {
  date: value => moment(value).format(DATE_FORMAT),
  datetime: value => moment(value).format(DATE_TIME_FORMAT),
  decimal: value => toDecimalNumber(value),
};

export const extendDetailTypes = types => Object.assign(detailType, types);

export default detailType;
