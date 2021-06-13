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

    _defineProperty(this, "onFulfilledCallback", []);

    _defineProperty(this, "onRejectedCallback", []);

    _defineProperty(this, "status", STATUS.PENDING);

    _defineProperty(this, "value", null);

    _defineProperty(this, "reason", null);

    _defineProperty(this, "resolve", function (value) {
      if (_this.status === STATUS.PENDING) {
        _this.status = STATUS.FULFILLED;
        _this.value = value;

        while (_this.onFulfilledCallback.length) {
          _this.onFulfilledCallback.shift()(value);
        }
      }
    });

    _defineProperty(this, "reject", function (value) {
      if (_this.status === STATUS.PENDING) {
        _this.status = STATUS.REJECTED;
        _this.reason = value;

        while (_this.onRejectedCallback.length) {
          _this.onRejectedCallback.shift()(value);
        }
      }
    });

    _defineProperty(this, "then", function (onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value;
      };
      onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
        throw reason;
      };

      if (this.status === STATUS.PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      } else if (this.status === STATUS.FULFILLED) {
        onFulfilled(this.value);
      } else if (this.status === STATUS.REJECTED) {
        onRejected(this.reason);
      }
    });

    // 执行器
    try {
      executor(this.resolve, this.reject);
    } catch (reason) {
      this.reject(reason);
    }
  } // 成功回调
  ;

  var mypromise = new MyPromise(function (resolve, reject) {
    resolve('成功');
  });
  mypromise.then(function (data) {
    console.log(data, '1');
  });
  mypromise.then(function (data) {
    console.log(data, '2');
  });

}());
//# sourceMappingURL=bundle.js.map
