function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var STATUS = {
  init: 0,
  fetch: 1,
  success: 2,
  error: 3,
  finish: 4
};

var QueryData =
/*#__PURE__*/
function () {
  function QueryData(_ref, _ref2) {
    var url = _ref.url,
        options = _ref.options,
        _ref$body = _ref.body,
        body = _ref$body === void 0 ? {} : _ref$body,
        _ref$request = _ref.request,
        request = _ref$request === void 0 ? {} : _ref$request,
        _ref$configs = _ref.configs,
        configs = _ref$configs === void 0 ? {} : _ref$configs;
    var forceUpdate = _ref2.forceUpdate;

    _classCallCheck(this, QueryData);

    this.url = url;
    this.options = options;
    this.configs = configs;
    this.body = body;
    this.initData = Object.assign({}, body);
    this.request = request;
    this.result = {
      loading: false,
      data: undefined
    };
    this.status = STATUS.init;
    this.firstTrigger = options.prompt;
    this.forceUpdate = forceUpdate;
    this.runLazy = this.runLazy.bind(this);
    this.forceQuery = this.forceQuery.bind(this);
  }

  _createClass(QueryData, [{
    key: "startQuery",
    value: function startQuery() {
      var _this = this;

      var url = this.url,
          body = this.body,
          forceUpdate = this.forceUpdate,
          result = this.result;

      if (this.status > STATUS.fetch) {
        return;
      } // 状态反转为请求中


      this.status = STATUS.fetch;
      result.loading = true;
      this.request(url, body).then(function (data) {
        result.data = data;
        result.loading = false;
        _this.status = STATUS.success;
        forceUpdate();
      })["catch"](function (error) {
        _this.status = STATUS.error;
        result.error = error;
      });
    }
  }, {
    key: "execute",
    value: function execute() {
      // skip：是否禁用查询
      var result = this.result,
          _this$options$skip = this.options.skip,
          skip = _this$options$skip === void 0 ? false : _this$options$skip;
      !skip && this.startQuery(); // 当skip 为true 时，说明没有查询结果，所以不能用上次的查询结果来做过渡

      return Object.assign({
        error: undefined,
        data: undefined,
        loading: !skip,
        forceUpdate: this.forceQuery
      }, skip ? {} : result);
    }
  }, {
    key: "executeLazy",
    value: function executeLazy() {
      return this.firstTrigger || this.lazyCalling ? [this.runLazy, this.execute()] : [this.runLazy, {
        error: undefined,
        data: undefined,
        loading: false,
        forceUpdate: this.forceQuery
      }];
    }
  }, {
    key: "runLazy",
    value: function runLazy(params) {
      var initData = this.initData;
      this.body = Object.assign({}, initData, params);
      this.lazyCalling = true;
      this.forceUpdate();
    }
  }, {
    key: "forceQuery",
    value: function forceQuery() {
      this.execute();
    }
  }, {
    key: "afterExecute",
    value: function afterExecute() {
      var callback = this.options.callback;

      if (this.status === STATUS.success) {
        this.status = STATUS.init;
        callback && callback();
        this.lazyCalling = false;
        this.firstTrigger = false;
        this.cleanup();
      }
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      // this.result.data = undefined;
      this.result.loading = false;
      this.result.error = undefined;
    } // 更新查询规则

  }, {
    key: "updateOptions",
    value: function updateOptions() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // NOTE: 这里区分lazyCalling， 因为事件请求的传参是通过runLazy来做的
      !this.lazyCalling && (this.body = body);
      Object.assign(this.configs, configs);
      Object.assign(this.options, options);
    }
  }]);

  return QueryData;
}();

export { QueryData as default };