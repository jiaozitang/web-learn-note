(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var e = React.createElement;
  var start = 0;
  var end = 0;

  var LikeButton = /*#__PURE__*/function (_React$Component) {
    _inherits(LikeButton, _React$Component);

    var _super = _createSuper(LikeButton);

    function LikeButton(props) {
      var _this;

      _classCallCheck(this, LikeButton);

      _this = _super.call(this, props);
      _this.state = {
        data: [],
        // 分页数据
        time: 0 // 耗时

      };

      _this.go({
        page: 1
      });

      return _this;
    }

    _createClass(LikeButton, [{
      key: "componentWillUpdate",
      value: function componentWillUpdate() {
        start = new Date().getTime();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        end = new Date().getTime();
        console.log(end - start);
      } // 跳转到某一页

    }, {
      key: "go",
      value: function go(_ref) {
        var page = _ref.page;
        var startTime = new Date().getTime();
        var data = this.getData({
          page: page
        });
        this.handleDom(data);
        var endTime = new Date().getTime();
        var time = endTime - startTime;
        this.showTimeOnPage(time);
      }
    }, {
      key: "showTimeOnPage",
      value: function showTimeOnPage(time) {
        this.setState({
          time: time
        });
      }
    }, {
      key: "handleDom",
      value: function handleDom(data) {
        this.setState({
          data: data
        });
      } // 获取某一页的数据

    }, {
      key: "getData",
      value: function getData(_ref2) {
        var page = _ref2.page,
            _ref2$pageSize = _ref2.pageSize,
            pageSize = _ref2$pageSize === void 0 ? 20 : _ref2$pageSize;
        var list = [];
        list.length = pageSize;
        return list.fill(page);
      } // 在线babel转义

    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$state = this.state,
            data = _this$state.data,
            time = _this$state.time;
        return e("div", null, e("p", null, "分页消耗时长：", e("span", null, time), "ms"), e("div", null, e("button", {
          onClick: function onClick() {
            return _this2.go({
              page: 1
            });
          }
        }, "第一页"), e("button", {
          onClick: function onClick() {
            return _this2.go({
              page: 2
            });
          }
        }, "第二页")), e("ul", null, data.map(function (dataItem, index) {
          var key = "".concat(index, "-").concat(dataItem);
          return e("li", {
            key: key
          }, ["".concat(index, "-").concat(dataItem), html]);
        })));
      }
    }]);

    return LikeButton;
  }(React.Component);

  var domContainer = document.querySelector('#container');
  ReactDOM.render(e(LikeButton), domContainer);

}());
//# sourceMappingURL=bundle.js.map
