"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

// 表单dom
var registerForm = document.getElementById('registerForm'); // 表单规则

var rules = {
  userName: [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:10',
    errorMsg: '用户名长度不能小于10位'
  }],
  password: [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6位'
  }],
  phoneNumber: [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }]
}; // 策略类

var strategies = {
  isNonEmpty: function isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function minLength(value, errorMsg, length) {
    console.log(length);

    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function isMobile(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
}; // 验证类

var Validator = function Validator() {
  this.cache = [];
}; // 添加验证方法


Validator.prototype.add = function (_ref) {
  var _this = this;

  var dom = _ref.dom,
      rules = _ref.rules;
  rules.forEach(function (rule) {
    var strategy = rule.strategy,
        errorMsg = rule.errorMsg;
    console.log(rule);

    var _strategy$split = strategy.split(':'),
        _strategy$split2 = (0, _slicedToArray2["default"])(_strategy$split, 2),
        strategyName = _strategy$split2[0],
        strategyCondition = _strategy$split2[1];

    console.log(strategyName);
    var value = dom.value;

    _this.cache.push(strategies[strategyName].bind(dom, value, errorMsg, strategyCondition));
  });
}; // 开始验证


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
}; // 验证函数


var validatorFn = function validatorFn() {
  var validator = new Validator();
  console.log(validator.add);
  Object.keys(rules).forEach(function (key) {
    console.log(2222222, rules[key]);
    validator.add({
      dom: registerForm[key],
      rules: rules[key]
    });
  });
  var errorMsg = validator.start();
  return errorMsg;
}; // 表单提交


registerForm.onsubmit = function () {
  var errorMsg = validatorFn();

  if (errorMsg) {
    alert(errorMsg);
    return false;
  }

  return false;
};