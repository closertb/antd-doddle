"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.extendRenderTypes = exports.isUndefind = void 0;

var _react = _interopRequireDefault(require("react"));

var _OriginSearch = _interopRequireDefault(require("../OriginSearch"));

var _FileUpload = _interopRequireDefault(require("../FileUpload"));

var _InputWithUnit = _interopRequireDefault(require("../InputWithUnit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isUndefind = function isUndefind(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
};

exports.isUndefind = isUndefind;

var OriginInput = function OriginInput(_ref) {
  var field = _ref.field,
      props = _ref.props,
      data = _ref.data;
  var service = field.service,
      searchKey = field.searchKey,
      placeholder = field.placeholder,
      onSelect = field.onSelect,
      allowClear = field.allowClear,
      valueFormat = field.valueFormat,
      format = field.format,
      maxSize = field.maxSize,
      seldomProps = field.seldomProps,
      disable = field.disable;
  return _react["default"].createElement(_OriginSearch["default"], Object.assign({
    disabled: disable && disable(data),
    style: {
      width: '100%',
      height: 32
    },
    searchKey: searchKey,
    onSelect: props.onSelect || onSelect,
    format: format,
    placeholder: placeholder,
    allowClear: allowClear,
    maxSize: maxSize,
    valueFormat: valueFormat,
    fetchData: service
  }, seldomProps));
};

var UploadFile = function UploadFile(_ref2) {
  var field = _ref2.field,
      props = _ref2.props;
  var key = field.key,
      name = field.name,
      _field$seldomProps = field.seldomProps,
      seldomProps = _field$seldomProps === void 0 ? {} : _field$seldomProps;
  return _react["default"].createElement(_FileUpload["default"], Object.assign({
    info: field.info,
    url: props.url,
    name: name,
    simple: field.psimple,
    key: key,
    listType: field.listType,
    reg: field.reg,
    fileSize: field.fileSize,
    tips: field.tips,
    upload: props.upload || field.upload,
    maxSize: field.maxSize
  }, seldomProps));
};

var WithUnit = function WithUnit(_ref3) {
  var field = _ref3.field;
  var inputProps = field.inputProps,
      selectProps = field.selectProps,
      defaultUnit = field.defaultUnit,
      enums = field.enums,
      seldomProps = field.seldomProps;
  return _react["default"].createElement(_InputWithUnit["default"], Object.assign({
    enums: enums,
    selectProps: selectProps,
    inputProps: inputProps,
    defaultUnit: defaultUnit
  }, seldomProps));
};

var selfDefine = function selfDefine(_ref4) {
  var field = _ref4.field,
      props = _ref4.props,
      data = _ref4.data;
  return field.child({
    field: field,
    props: props,
    data: data
  });
};

var renderType = {
  origin: OriginInput,
  image: UploadFile,
  imageUpload: UploadFile,
  selfDefine: selfDefine,
  withUnit: WithUnit
};

var extendRenderTypes = function extendRenderTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign(renderType, types);
};

exports.extendRenderTypes = extendRenderTypes;
var _default = renderType;
exports["default"] = _default;