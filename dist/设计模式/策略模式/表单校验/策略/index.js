"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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
        _strategy$split2 = (0, _slicedToArray2["default"])(_strategy$split, 2),
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