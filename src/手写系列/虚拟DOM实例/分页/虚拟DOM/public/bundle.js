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
  var html = e("div", {
    "data-v-791421da": "",
    "class": "content-box"
  }, e("div", {
    "data-v-791421da": "",
    "class": "meta-container"
  }, e("div", {
    "data-v-791421da": "",
    "class": "user-message"
  }, e("a", {
    "data-v-791421da": "",
    href: "/user/4300945218607197",
    target: "_blank",
    rel: "",
    name: "user",
    state: "4300945218607197",
    "class": "userbox"
  }, e("div", {
    "data-v-1d25c2a8": "",
    "data-v-791421da": "",
    block: "userPopover",
    state: "4300945218607197",
    "class": "user-popover-box"
  }, "\u6E05\u6C64\u997A\u5B50"))), e("div", {
    "data-v-791421da": "",
    "class": "dividing"
  }), e("div", {
    "data-v-791421da": "",
    "class": "date"
  }, "4\u5929\u524D"), e("div", {
    "data-v-791421da": "",
    "class": "dividing"
  }), e("div", {
    "data-v-791421da": "",
    "class": "tag_list"
  }, e("div", {
    "data-v-791421da": "",
    "class": "tag"
  }, e("a", {
    "data-v-791421da": "",
    href: "/tag/JavaScript",
    target: "_blank",
    rel: "",
    name: "tag",
    state: "6809640398105870343",
    "class": "tag"
  }, " JavaScript "), e("i", {
    "data-v-791421da": "",
    "class": "point"
  })), e("div", {
    "data-v-791421da": "",
    "class": "tag"
  }, e("a", {
    "data-v-791421da": "",
    href: "/tag/%E5%89%8D%E7%AB%AF",
    target: "_blank",
    rel: "",
    name: "tag",
    state: "6809640407484334093",
    "class": "tag"
  }, " \u524D\u7AEF "), e("i", {
    "data-v-791421da": "",
    "class": "point"
  })))), e("div", {
    "data-v-791421da": "",
    "class": "content-wrapper"
  }, e("div", {
    "data-v-791421da": "",
    "class": "content-main"
  }, e("div", {
    "data-v-791421da": "",
    "class": "title-row"
  }, e("a", {
    "data-v-791421da": "",
    href: "/post/6973155726302642206",
    target: "_blank",
    rel: "",
    name: "title",
    title: "\u624B\u5199\u7CFB\u5217-\u8FD9\u4E00\u6B21\uFF0C\u5F7B\u5E95\u641E\u61C2 Promise",
    "class": "title"
  }, " \u624B\u5199\u7CFB\u5217-\u8FD9\u4E00\u6B21\uFF0C\u5F7B\u5E95\u641E\u61C2 Promise ")), e("div", {
    "data-v-791421da": "",
    "class": "abstract"
  }, e("a", {
    "data-v-791421da": "",
    href: "/post/6973155726302642206",
    target: "_blank",
    rel: ""
  }, " \u672C\u6587\u5B9E\u73B0\u4E86\u4E00\u4E2A\u7B26\u5408Promises/A+ \u89C4\u8303\u7684 Promise\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7EE7\u7EED\u81EA\u5DF1\u52A8\u624B\uFF0C\u53C2\u8003 ES6 \u7684 Promise \u65B9\u6CD5\u5BF9 MyPromise \u8FDB\u884C\u62D3\u5C55\u7EC3\u4E60\u3002 ")), e("ul", {
    "data-v-791421da": "",
    "class": "action-list jh-timeline-action-area"
  }, e("li", {
    "data-v-791421da": "",
    name: "commentBtn",
    "class": "item view"
  }, e("i", {
    "data-v-791421da": ""
  }), " ", e("span", {
    "data-v-791421da": ""
  }, "2393")), e("li", {
    "data-v-791421da": "",
    name: "likeBtn",
    "class": "item like active"
  }, e("i", {
    "data-v-791421da": ""
  }), " ", e("span", {
    "data-v-791421da": ""
  }, " 18 ")), e("li", {
    "data-v-791421da": "",
    name: "commentBtn",
    "class": "item comment"
  }, e("i", {
    "data-v-791421da": ""
  }), " ", e("span", {
    "data-v-791421da": ""
  }, " 5 ")), e("li", {
    "data-v-791421da": "",
    name: "moreBtn",
    "class": "item more"
  }, e("i", {
    "data-v-791421da": ""
  }), e("ul", {
    "data-v-791421da": "",
    silent: "silent",
    "class": "more-list"
  }, e("li", {
    "data-v-791421da": "",
    "class": "item"
  }, " \u7F16\u8F91 "), e("li", {
    "data-v-791421da": "",
    "class": "item"
  }, "\u5220\u9664"))))), e("img", {
    "data-v-fd37d0ac": "",
    "data-v-791421da": "",
    src: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/596c26911f3342ea86adcc94c441332d~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp",
    alt: "\u624B\u5199\u7CFB\u5217-\u8FD9\u4E00\u6B21\uFF0C\u5F7B\u5E95\u641E\u61C2 Promise",
    "class": "lazy thumb",
    "data-src": "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/596c26911f3342ea86adcc94c441332d~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
  })));

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
