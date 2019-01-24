import "antd/lib/upload/style";
import _Upload from "antd/lib/upload";
import _classCallCheck from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck";
import _createClass from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf";
import _inherits from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/inherits";
import "antd/lib/button/style";
import _Button from "antd/lib/button";
import "antd/lib/icon/style";
import _Icon from "antd/lib/icon";
import "antd/lib/modal/style";
import _Modal from "antd/lib/modal";
import style from './index.less';
var kb = 1024 * 1024;

function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
}

function showInfoModal(content) {
  _Modal.info({
    title: '提示',
    content: content
  });
}

var uploadButton = function uploadButton() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'picture-card';
  return type === 'picture-card' ? React.createElement("div", null, React.createElement(_Icon, {
    type: "plus"
  }), React.createElement("div", {
    className: "ant-upload-text"
  }, "\u4E0A\u4F20")) : React.createElement(_Button, null, React.createElement(_Icon, {
    type: "upload"
  }), " \u9009\u62E9\u6587\u4EF6");
};

var FileUpload =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FileUpload, _React$Component);

  function FileUpload(props) {
    var _this;

    _classCallCheck(this, FileUpload);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileUpload).call(this, props));

    _this.beforeUpload = function (file) {
      var _this$props = _this.props,
          _this$props$listType = _this$props.listType,
          listType = _this$props$listType === void 0 ? 'picture-card' : _this$props$listType,
          _this$props$reg = _this$props.reg,
          reg = _this$props$reg === void 0 ? /(jpe?g|JPE?G|png|PNG)$/ : _this$props$reg,
          _this$props$tips = _this$props.tips,
          tips = _this$props$tips === void 0 ? '请选择jpg,png类型的图片格式' : _this$props$tips,
          _this$props$fileSize = _this$props.fileSize,
          size = _this$props$fileSize === void 0 ? 5 : _this$props$fileSize;
      var fileType = file.name;
      var fileSize = file.size;
      return new Promise(function (resolve, reject) {
        if (!reg.test(fileType)) {
          showInfoModal(tips);
          reject();
          return;
        }

        if (fileSize > size * kb) {
          showInfoModal("\u6587\u4EF6\u7684\u5927\u5C0F\u4E0D\u80FD\u8D85 ".concat(size, "M"));
          reject();
          return;
        }

        if (listType === 'picture-card') {
          var img = new Image();

          img.onload = function () {
            resolve();
          };

          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        } else {
          resolve();
        }
      });
    };

    _this.customRequest = function (option) {
      var _this$props2 = _this.props,
          handleSetStart = _this$props2.handleSetStart,
          upload = _this$props2.upload;
      var file = option.file,
          onSuccess = option.onSuccess;
      handleSetStart && handleSetStart();
      upload({
        file: file
      }).then(function (res) {
        var content = res.content;
        onSuccess({
          content: content
        });
      });
    };

    _this.handleChange = function (_ref) {
      var file = _ref.file,
          fileList = _ref.fileList;
      var ids = _this.state.ids;
      var onChange = _this.props.onChange;

      if (file.status === 'done') {
        var storeId = file.response.content.storeId;
        var storeIds = ids.concat(storeId);

        _this.setState({
          ids: storeIds
        });

        getBase64(file.originFileObj, function (imageUrl) {
          return file.thumbUrl = imageUrl;
        });
        onChange && onChange(storeIds.join(','), file.name);
      }

      _this.setState({
        fileList: fileList
      });
    };

    _this.handlePreview = function (file) {
      var _this$props$listType2 = _this.props.listType,
          listType = _this$props$listType2 === void 0 ? 'picture-card' : _this$props$listType2;

      if (listType !== 'picture-card') {
        return;
      }

      _this.setState({
        imageUrl: file.url || file.thumbUrl,
        previewVisible: true
      });
    };

    _this.handleSimplePreview = function (url) {
      return function () {
        _this.setState({
          imageUrl: url,
          previewVisible: true
        });
      };
    };

    _this.handleCancel = function () {
      _this.setState({
        previewVisible: false
      });
    };

    _this.handleRemove = function (file) {
      if (!file.response || !file.response.content) {
        return true;
      }

      var ids = _this.state.ids;
      var storeId = file.response.content.storeId;
      var index = ids.indexOf(storeId);

      if (index === -1) {
        return true;
      }

      var onChange = _this.props.onChange;
      ids.splice(index, 1);
      onChange && onChange(ids.length ? ids.join(',') : undefined);

      _this.setState({
        ids: ids
      });

      return true;
    };

    _this.state = {
      imageUrl: '',
      ids: [],
      previewVisible: false,
      fileList: []
    };
    return _this;
  }

  _createClass(FileUpload, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          _this$props3$maxSize = _this$props3.maxSize,
          maxSize = _this$props3$maxSize === void 0 ? 1 : _this$props3$maxSize,
          _this$props3$listType = _this$props3.listType,
          listType = _this$props3$listType === void 0 ? 'picture-card' : _this$props3$listType,
          children = _this$props3.children,
          simple = _this$props3.simple,
          info = _this$props3.info,
          disabled = _this$props3.disabled;
      var child = children || uploadButton(listType);
      var _this$state = this.state,
          imageUrl = _this$state.imageUrl,
          fileList = _this$state.fileList,
          previewVisible = _this$state.previewVisible;
      return React.createElement("div", {
        className: style.ImageUpload
      }, React.createElement("div", {
        className: fileList.length ? 'imgArea has-child' : 'imgArea'
      }, React.createElement(_Upload, {
        listType: listType,
        fileList: fileList,
        disabled: disabled,
        beforeUpload: this.beforeUpload,
        onPreview: this.handlePreview,
        customRequest: this.customRequest,
        onChange: this.handleChange,
        onRemove: this.handleRemove
      }, fileList.length >= maxSize ? null : child), simple && fileList.length === 0 &&
      /* eslint-disable-next-line */
      React.createElement("img", {
        src: simple,
        alt: "\u6837\u4F8B",
        onClick: this.handleSimplePreview(simple),
        className: "show-simple"
      })), info && fileList.length === 0 && React.createElement("div", {
        className: 'show-info'
      }, info), React.createElement(_Modal, {
        visible: previewVisible,
        footer: null,
        onCancel: this.handleCancel
      }, React.createElement("img", {
        alt: "",
        style: {
          width: '100%'
        },
        src: imageUrl
      })));
    }
  }]);

  return FileUpload;
}(React.Component);

export { FileUpload as default };