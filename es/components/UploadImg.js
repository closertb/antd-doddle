var _class, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import bind from 'bind-decorator';
var UploadImg = (_class = (_temp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UploadImg, _React$Component);

  function UploadImg() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UploadImg);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UploadImg)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      previewVisible: false,
      previewImage: ''
    });

    return _this;
  }

  _createClass(UploadImg, [{
    key: "handleCancel",
    value: function handleCancel() {
      this.setState({
        previewVisible: false
      });
    }
  }, {
    key: "handlePreview",
    value: function handlePreview(file) {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(_ref) {
      var fileList = _ref.fileList,
          _ref$file = _ref.file,
          file = _ref$file === void 0 ? {} : _ref$file;
      var onChange = this.props.onChange;
      var response = file.response;

      if (file.status === 'done' && response) {
        fileList.forEach(function (item) {
          if (item.uid === file.uid) {
            if (response.status === 'OK') {
              item.url = response.content;
            } else {
              item.status = 'error';
            }
          }
        });
      }

      onChange && onChange(fileList, file);
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(file) {
      var onRemove = this.props.onRemove;
      onRemove && onRemove(file);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          previewVisible = _this$state.previewVisible,
          previewImage = _this$state.previewImage;
      var _this$props = this.props,
          _this$props$value = _this$props.value,
          fileList = _this$props$value === void 0 ? [] : _this$props$value,
          _this$props$config = _this$props.config,
          config = _this$props$config === void 0 ? {} : _this$props$config,
          disabled = _this$props.disabled,
          service = _this$props.service;

      var _config$maxCount = config.maxCount,
          maxCount = _config$maxCount === void 0 ? Infinity : _config$maxCount,
          resetConfig = _objectWithoutProperties(config, ["maxCount"]);

      var uploadButton = React.createElement("div", null, React.createElement(Icon, {
        type: "plus"
      }), React.createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20\u56FE\u7247"));
      return React.createElement("div", {
        className: "clearfix"
      }, React.createElement(Upload, _extends({
        accept: "image/*",
        action: service,
        listType: "picture-card",
        fileList: fileList,
        headers: {
          'X-Requested-With': null
        },
        onPreview: this.handlePreview,
        onChange: this.handleChange,
        onRemove: this.handleRemove,
        beforeUpload: function beforeUpload(file, list) {
          if (!/.+\.(jpg|jpeg|png)$/.test(file.name)) {
            var index = list.indexOf(file);
            index !== -1 && list.splice(index, 1);
            Modal.warning({
              title: "\u6587\u4EF6'".concat(file.name, "'\u662F\u975EJPG,PNG\u683C\u5F0F\u56FE\u7247")
            });
            return false;
          }

          return true;
        }
      }, resetConfig), !disabled && fileList.length < maxCount && uploadButton), React.createElement(Modal, {
        visible: previewVisible,
        footer: null,
        onCancel: this.handleCancel
      }, React.createElement("img", {
        alt: "example",
        style: {
          width: '100%'
        },
        src: previewImage
      })));
    }
  }]);

  return UploadImg;
}(React.Component), _temp), (_applyDecoratedDescriptor(_class.prototype, "handleCancel", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleCancel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handlePreview", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handlePreview"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleRemove", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleRemove"), _class.prototype)), _class);
export default UploadImg; // 说明 props {onChange,disabled,value,config:{maxNum,uploadUrl}}