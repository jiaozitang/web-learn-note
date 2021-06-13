(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  // Promise 的 3 种状态
  var STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
  };

  var MyPromise = function MyPromise(executor) {
    var _this = this;

    _classCallCheck(this, MyPromise);

    _defineProperty(this, "status", STATUS.PENDING);

    _defineProperty(this, "value", null);

    _defineProperty(this, "reason", null);

    _defineProperty(this, "resolve", function (value) {
      if (_this.status === STATUS.PENDING) {
        _this.status = STATUS.FULFILLED;
        _this.value = value;
      }
    });

    _defineProperty(this, "reject", function () {
      if (_this.status === STATUS.PENDING) {
        _this.status = STATUS.REJECTED;
        _this.reason = value;
      }
    });

    _defineProperty(this, "then", function (onFulfilled, onRejected) {
      if (this.status === STATUS.FULFILLED) {
        onFulfilled(this.value);
      } else if (this.status === STATUS.REJECTED) {
        onRejected(this.error);
      }
    });

    // 执行器
    executor(this.resolve, this.reject);
  } // 初始状态
  ;
  var mypromise = new MyPromise(function (resolve, reject) {
    resolve('成功');
  });
  mypromise.then(function (data) {
    console.log(data, '请求成功'); // 成功打印“成功 请求成功”
  }, function (err) {
    console.log(err, '请求失败');
  });

}());
//# sourceMappingURL=bundle.js.map
