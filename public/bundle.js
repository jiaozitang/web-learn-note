(function () {
  'use strict';

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

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

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  // 可发布可订阅的对象
  var Pubsub = {
    subscrib: function subscrib(ev, callback) {
      this._callbacks || (this._callbacks = {});
      (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
    },
    publish: function publish() {
      var args = Array.prototype.slice.call(arguments);
      var ev = args.shift();
      if (!this._callbacks) return;
      if (!this._callbacks[ev]) return;

      this._callbacks[ev].forEach(function (callback) {
        callback.apply(void 0, _toConsumableArray(args));
      });
    }
  }; // 订阅model更新消息，更新后所有符合条件的dom节点都会收到通知，进行更新

  Pubsub.subscrib('model-update-event', function (_ref) {
    var propNameWhole = _ref.propNameWhole,
        propValue = _ref.propValue;
    var elements = document.querySelectorAll("[data-bind=\"".concat(propNameWhole, "\"]"));
    elements.forEach(function (element) {
      var elementTagName = element.tagName.toLowerCase();
      var formTypeTagNames = ['input', 'select', 'textarea'];

      if (formTypeTagNames.includes(elementTagName)) {
        element.value = propValue;
      } else {
        element.innerHTML = propValue;
      }
    });
  }); // 添加onchange/onkeyup事件，触发时，发布ui更新消息 start

  function eventHander(e) {
    var target = e.target;
    var propValue = target.value;
    var propNameWhole = target.getAttribute('data-bind');

    if (propNameWhole) {
      console.log(propNameWhole, 123); // 发布ui更新消息

      Pubsub.publish('ui-update-event', {
        propNameWhole: propNameWhole,
        propValue: propValue
      });
    }
  }

  document.addEventListener('change', eventHander, false);
  document.addEventListener('keyup', eventHander, false); // end

  var Bind = /*#__PURE__*/function () {
    function Bind() {
      _classCallCheck(this, Bind);

      this.modelName = '';
    }

    _createClass(Bind, [{
      key: "initModal",
      value: function initModal(_ref2) {
        var _this = this;

        var modelName = _ref2.modelName;
        this.modelName = modelName; // 订阅ui更新消息

        Pubsub.subscrib('ui-update-event', function (_ref3) {
          var propNameWhole = _ref3.propNameWhole,
              propValue = _ref3.propValue;

          var _propNameWhole$split = propNameWhole.split('.'),
              _propNameWhole$split2 = _slicedToArray(_propNameWhole$split, 2),
              _propName = _propNameWhole$split2[1];

          _this.updateModalData(_propName, propValue);
        });
      }
    }, {
      key: "loadModalData",
      value: function loadModalData(modelData) {
        for (var propName in modelData) {
          this.updateModalData(propName, modelData[propName]);
        }
      }
    }, {
      key: "updateModalData",
      value: function updateModalData(propName, propValue) {
        var propNameWhole = "".concat(this.modelName, ".").concat(propName); // 发布model更新消息

        Pubsub.publish('model-update-event', {
          propNameWhole: propNameWhole,
          propValue: propValue
        });
      }
    }]);

    return Bind;
  }();

  var user = new Bind();
  user.initModal({
    modelName: 'user'
  });
  user.loadModalData({
    name: 'tj',
    age: '18'
  });

}());
//# sourceMappingURL=bundle.js.map
