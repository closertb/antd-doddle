import { OriginInput, UploadFile, selfDefine, HInputWithUnit, HText, HInput, HInputNumber, HSelect, HRadio, HCheck, HDatePicker, HRangePicker } from './fields';
var renderTypes = {
  origin: OriginInput,
  image: UploadFile,
  // imageUpload: UploadFile,
  selfDefine: selfDefine,
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
export var extendRenderTypes = function extendRenderTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign(renderTypes, types);
};
export default renderTypes;