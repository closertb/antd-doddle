"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormRender;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _utils = require("../utils");

var _default = require("./default");

var _renderType = _interopRequireDefault(require("./renderType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;
var RadioGroup = _antd.Radio.Group;
var RangePicker = _antd.DatePicker.RangePicker;
var TextArea = _antd.Input.TextArea;
var CheckboxGroup = _antd.Checkbox.Group;

var defaultAction = function defaultAction() {};

var getContainer = function getContainer(className) {
  return function () {
    return className ? document.getElementsByClassName(className)[0] : document.body;
  };
};

var isUndefind = function isUndefind(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
};

var handleDisabledDate = function handleDisabledDate(currentDate) {
  return currentDate && currentDate > (0, _moment["default"])().endOf('day');
};

var generateOption = function generateOption(enums) {
  if (!enums || _typeof(enums) !== 'object') {
    console.error('enums is not an object or array');
    return [];
  }

  return Array.isArray(enums) ? enums : Object.keys(enums).map(function (value) {
    return {
      value: value,
      label: enums[value]
    };
  });
};

var setFieldValue = function setFieldValue(value, type) {
  if (type === 'input') {
    return value && value.target.value;
  }

  if (type === 'radio') {
    return value && value.target.value;
  }

  return value;
}; // 用于接受一个从接口获取到的枚举数组


var getParamFromProps = function getParamFromProps(key, props) {
  return props[key] || [];
};

function FormRender(unionProps, rightProps) {
  var props;
  var construtProps; // have the special extend SYmbol, the function is call by old FormRender;

  if (unionProps.extend === _default.extendSymbol) {
    construtProps = unionProps;
    props = rightProps;
  } else {
    construtProps = unionProps.extendProps;
    props = unionProps;
  }

  var _construtProps = construtProps,
      require = _construtProps.require,
      getFieldDecorator = _construtProps.getFieldDecorator,
      formItemLayout = _construtProps.formItemLayout,
      containerName = _construtProps.containerName,
      defaultWrap = _construtProps.withWrap,
      Wrapper = _construtProps.Wrapper,
      dynamicParams = _construtProps.dynamicParams,
      datas = _construtProps.datas,
      _construtProps$_datas = _construtProps._datas,
      _datas = _construtProps$_datas === void 0 ? {} : _construtProps$_datas;

  var _props = props,
      field = _props.field,
      _props$data = _props.data,
      data = _props$data === void 0 ? datas : _props$data,
      _props$wrapProps = _props.wrapProps,
      wrapProps = _props$wrapProps === void 0 ? {} : _props$wrapProps;
  var _field$type = field.type,
      type = _field$type === void 0 ? 'input' : _field$type,
      key = field.key,
      name = field.name,
      _field$style = field.style,
      style = _field$style === void 0 ? {
    width: '100%'
  } : _field$style,
      _field$required = field.required,
      required = _field$required === void 0 ? require || false : _field$required,
      _field$allowClear = field.allowClear,
      allowClear = _field$allowClear === void 0 ? true : _field$allowClear,
      placeholder = field.placeholder,
      defaultValue = field.defaultValue,
      _field$disable = field.disable,
      disable = _field$disable === void 0 ? false : _field$disable,
      _field$rules = field.rules,
      rules = _field$rules === void 0 ? [] : _field$rules,
      maxLength = field.maxLength,
      _field$isEnable = field.isEnable,
      isEnable = _field$isEnable === void 0 ? true : _field$isEnable,
      specialKey = field.specialKey,
      _field$onChange = field.onChange,
      onChange = _field$onChange === void 0 ? defaultAction : _field$onChange,
      format = field.format,
      withWrap = field.withWrap,
      _field$enums = field.enums,
      enums = _field$enums === void 0 ? [] : _field$enums,
      _field$seldomProps = field.seldomProps,
      seldomProps = _field$seldomProps === void 0 ? {} : _field$seldomProps,
      _field$decorProps = field.decorProps,
      decorProps = _field$decorProps === void 0 ? {} : _field$decorProps,
      _field$isDynamic = field.isDynamic,
      isDynamic = _field$isDynamic === void 0 ? false : _field$isDynamic;
  var enumKey = field.enumKey || key;
  var content = null;
  var tempOnchange = props.onChange || onChange;
  var finalChange = (0, _react.useCallback)(function (value) {
    _datas[key] = setFieldValue(value, type);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    tempOnchange.apply(void 0, [value].concat(args));
  }, []);

  if (!field) {
    console.error('field can not be undefined');
    return content;
  } // 如果props.isEnable为false，或则isEnable 传值为false 或 enableTemp(data) 返回值为false；此节点不渲染


  var checkEnable = props.isEnable || isEnable;

  if (typeof checkEnable === 'function') {
    if (!checkEnable(data, _datas)) {
      return content;
    }
  } else if (!isUndefind(props.isEnable, isEnable)) {
    return content;
  }

  switch (type) {
    // eslint-disable-next-line
    case 'input':
      // eslint-disable-next-line
      var patternRules = [{
        required: required,
        message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
      }, {
        pattern: /^\S.*\S$|^\S$/,
        message: '首尾不能含有空字符'
      }].concat(rules);
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout, {
        className: "self-define-item"
      }), getFieldDecorator(key, {
        initialValue: data[key],
        rules: patternRules
      })(_react["default"].createElement(_antd.Input, Object.assign({
        type: "text",
        style: style,
        maxLength: maxLength,
        onChange: finalChange,
        placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
        disabled: disable && disable(data)
      }, seldomProps))));
      break;
    // eslint-disable-next-line

    case 'inputNumber':
      // min 设计了默认值的话，会导致表单为非必填时，会默认填上最小值；
      // eslint-disable-next-line
      var max = field.max,
          min = field.min,
          _field$precision = field.precision,
          precision = _field$precision === void 0 ? 0 : _field$precision,
          _field$step = field.step,
          step = _field$step === void 0 ? 1 : _field$step;
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout, {
        className: "self-define-item"
      }), getFieldDecorator(key, {
        initialValue: data[key],
        rules: [{
          required: required,
          message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
        }].concat(rules)
      })(_react["default"].createElement(_antd.InputNumber, Object.assign({
        max: max,
        min: min,
        step: step,
        precision: precision,
        style: style,
        placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
        onChange: finalChange,
        disabled: disable && disable(data)
      }, seldomProps))));
      break;
    // eslint-disable-next-line

    case 'text':
      // eslint-disable-next-line
      var _field$minRows = field.minRows,
          minRows = _field$minRows === void 0 ? 2 : _field$minRows,
          _field$maxRows = field.maxRows,
          maxRows = _field$maxRows === void 0 ? 6 : _field$maxRows;
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout, {
        className: "self-define-item"
      }), getFieldDecorator(key, {
        initialValue: data[key],
        rules: [{
          required: required,
          message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
        }].concat(rules)
      })(_react["default"].createElement(TextArea, Object.assign({
        type: "text",
        style: style,
        maxLength: maxLength || 300,
        placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
        autosize: {
          minRows: minRows,
          maxRows: maxRows
        },
        onChange: finalChange,
        disabled: disable && disable(data)
      }, seldomProps))));
      break;
    // eslint-disable-next-line

    case 'select':
      // eslint-disable-next-line
      var selectEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : props.enums || enums;
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout), getFieldDecorator(key, {
        initialValue: isUndefind(data[key], defaultValue),
        rules: [{
          required: required,
          message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
        }].concat(rules)
      })(_react["default"].createElement(_antd.Select, Object.assign({
        style: style,
        placeholder: placeholder || '不限',
        allowClear: allowClear,
        disabled: disable && disable(data),
        onChange: finalChange,
        getPopupContainer: getContainer(containerName)
      }, seldomProps), generateOption(selectEnums).map(function (_ref) {
        var value = _ref.value,
            label = _ref.label;
        return _react["default"].createElement(Option, {
          key: value,
          value: value
        }, label);
      }))));
      break;
    // eslint-disable-next-line

    case 'radio':
      // eslint-disable-next-line
      var radioEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : props.enums || enums;
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout), getFieldDecorator(key, {
        initialValue: isUndefind(data[key], defaultValue),
        rules: [{
          required: required,
          message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
        }].concat(rules)
      })(_react["default"].createElement(RadioGroup, Object.assign({
        options: generateOption(radioEnums),
        disabled: disable && disable(data),
        onChange: finalChange
      }, seldomProps))));
      break;
    // eslint-disable-next-line

    case 'check':
      // eslint-disable-next-line
      var checkEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : props.enums || enums;
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout), getFieldDecorator(key, {
        initialValue: isUndefind(data[key], defaultValue),
        rules: [{
          required: required,
          message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
        }].concat(rules)
      })(_react["default"].createElement(CheckboxGroup, Object.assign({
        options: generateOption(checkEnums),
        disabled: disable && disable(data),
        onChange: finalChange
      }, seldomProps))));
      break;

    case 'datePicker':
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout), getFieldDecorator(key, {
        initialValue: data[key] && (0, _moment["default"])(data[key]),
        rules: [{
          required: required,
          message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
        }].concat(rules)
      })(_react["default"].createElement(_antd.DatePicker, Object.assign({
        style: style,
        showTime: field.showTime || false,
        format: format || _utils.DATE_FORMAT,
        onChange: finalChange,
        placeholder: placeholder || '请选择',
        disabled: disable && disable(data),
        getCalendarContainer: getContainer(containerName)
      }, seldomProps))));
      break;
    // eslint-disable-next-line

    case 'rangePicker':
      // eslint-disable-next-line
      var startKey = field.startKey,
          endKey = field.endKey,
          rangeKey = field.key,
          _field$disabledDate = field.disabledDate,
          disabledDate = _field$disabledDate === void 0 ? false : _field$disabledDate,
          _field$showTime = field.showTime,
          showTime = _field$showTime === void 0 ? false : _field$showTime; // eslint-disable-next-line

      var beginDate = data[startKey]; // eslint-disable-next-line

      var endDate = data[endKey]; // eslint-disable-next-line

      var rangeDate = beginDate && endDate ? [(0, _moment["default"])(beginDate), (0, _moment["default"])(endDate)] : [];
      content = _react["default"].createElement(FormItem, Object.assign({
        key: specialKey || key,
        label: name
      }, formItemLayout), getFieldDecorator(rangeKey, {
        initialValue: rangeDate,
        rules: [{
          required: required,
          message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
        }].concat(rules)
      })(_react["default"].createElement(RangePicker, Object.assign({
        style: style,
        allowClear: allowClear,
        showTime: showTime,
        className: "search-range-picker",
        onChange: finalChange,
        format: format || (showTime ? _utils.DATE_TIME_FORMAT : _utils.DATE_FORMAT),
        getCalendarContainer: getContainer(containerName),
        disabledDate: disabledDate ? function (currentDate) {
          return handleDisabledDate(currentDate);
        } : undefined
      }, seldomProps))));
      break;

    default:
      if (_renderType["default"][type]) {
        var render = _renderType["default"][type];
        content = _react["default"].createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, Object.assign({
          initialValue: data[key],
          rules: [{
            required: props.required || required,
            message: placeholder
          }].concat(rules)
        }, decorProps))(render({
          field: field,
          props: props,
          data: data,
          onChange: finalChange
        })));
      } else {
        console.error('type is not supported');
      }

  }

  return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ? _react["default"].createElement(Wrapper, Object.assign({}, wrapProps), content) : content;
}

FormRender.$type = _default.extendSymbol;