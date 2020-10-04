import {
  OriginInput,
  UploadFile,
  selfDefine,
  HInputWithUnit,
  HText,
  HInput,
  HInputNumber,
  HSelect,
  HRadio,
  HCheck,
  HDatePicker,
  HRangePicker
} from './fields';

const renderTypes = {
  origin: OriginInput,
  image: UploadFile,
  // imageUpload: UploadFile,
  selfDefine,
  withUnit: HInputWithUnit,
  text: HText,
  input: HInput,
  inputNumber: HInputNumber,
  select: HSelect,
  radio: HRadio,
  check: HCheck,
  datePicker: HDatePicker,
  rangePicker: HRangePicker
};

export const extendRenderTypes = (types = {}) => Object.assign(renderTypes, types);

export default renderTypes;
