"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/***********************策略对象**************************/
var strategies = {
  isNonEmpty: function isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function isMobile(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
};
/***********************Validator类**************************/

var Validator = function Validator() {
  this.cache = [];
};

Validator.prototype.add = function (dom, rules) {
  var _this = this;

  rules.forEach(function (rule) {
    var strategy = rule.strategy,
        errorMsg = rule.errorMsg;

    var _strategy$split = strategy.split(':'),
        _strategy$split2 = _slicedToArray(_strategy$split, 2),
        strategyName = _strategy$split2[0],
        strategyCondition = _strategy$split2[1];

    var value = dom.value;

    _this.cache.push(strategies[strategyName].bind(dom, value, errorMsg));
  });
};

Validator.prototype.start = function () {
  var errorMsg;
  this.cache.some(function (cacheItem) {
    var _errorMsg = cacheItem();

    if (_errorMsg) {
      errorMsg = _errorMsg;
      return true;
    } else {
      return false;
    }
  });
  return errorMsg;
};

var validataFunc = function validataFunc() {
  var validator = new Validator();
  validator.add(registerForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:10',
    errorMsg: '用户名长度不能小于10位'
  }]);
  validator.add(registerForm.password, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6位'
  }]);
  validator.add(registerForm.phoneNumber, [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }]);
  var errorMsg = validator.start();
  return errorMsg;
};
/***********************客户调用代码**************************/


var registerForm = document.getElementById('registerForm');

registerForm.onsubmit = function () {
  var errorMsg = validataFunc();

  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
};