import "antd/lib/upload/style";
import _Upload from "antd/lib/upload";
import "antd/lib/modal/style";
import _Modal from "antd/lib/modal";
import "antd/lib/icon/style";
import _Icon from "antd/lib/icon";
import _objectWithoutProperties from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck";
import _createClass from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf";
import _inherits from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/applyDecoratedDescriptor";

var _class;

import React from 'react';
import bind from 'bind-decorator';
var UploadImg = (_class =
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
    _this.state = {
      previewVisible: false,
      previewImage: ''
    };
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

      var uploadButton = React.createElement("div", null, React.createElement(_Icon, {
        type: "plus"
      }), React.createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20\u56FE\u7247"));
      return React.createElement("div", {
        className: "clearfix"
      }, React.createElement(_Upload, Object.assign({
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
        beforeUpload: function beforeUpload(file, fileList) {
          if (!/.+\.(jpg|jpeg|png)$/.test(file.name)) {
            var index = fileList.indexOf(file);
            index !== -1 && fileList.splice(index, 1);

            _Modal.warning({
              title: "\u6587\u4EF6'".concat(file.name, "'\u662F\u975EJPG,PNG\u683C\u5F0F\u56FE\u7247")
            });

            return false;
          }

          return true;
        }
      }, resetConfig), !disabled && fileList.length < maxCount && uploadButton), React.createElement(_Modal, {
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
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, "handleCancel", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleCancel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handlePreview", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handlePreview"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleRemove", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleRemove"), _class.prototype)), _class);
export default UploadImg; // 说明 props {onChange,disabled,value,config:{maxNum,uploadUrl}}