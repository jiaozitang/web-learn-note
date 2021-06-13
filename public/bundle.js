(function () {
  'use strict';

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

    _defineProperty(this, "resolve", null);

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
      var _this2 = this;

      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value;
      };
      onRejected = typeof onRejected === 'function' ? onRejected : function (error) {
        throw error;
      };
      var promise2 = new MyPromise(function (resolve, reject) {
        if (_this2.status === STATUS.PENDING) {
          _this2.onFulfilledCallback.push(function () {
            try {
              var x = onFulfilled(_this2.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });

          _this2.onRejectedCallback.push(function () {
            try {
              var x = onRejected(_this2.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        } else if (_this2.status === STATUS.FULFILLED) {
          try {
            var x = onFulfilled(_this2.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        } else if (_this2.status === STATUS.REJECTED) {
          try {
            var _x = onRejected(_this2.reason);

            resolvePromise(promise2, _x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }
      });
      return promise2;
    });

    // 执行器
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  } // 成功回调
  ;

  function resolvePromise(promise2, x, resolve, reject) {
    // 如果 promise2 === x， 执行 reject，错误原因为 TypeError
    if (promise2 === x) {
      reject(new TypeError('The promise and the return value are the same'));
    } // 如果 x 是 promise 实例


    if (_typeof(x) === 'object' || typeof x === 'function') {
      var then;

      try {
        then = x.then;
      } catch (error) {
        reject(error);
      } // 如果 x.then 是函数


      if (typeof then === 'function') {
        then.call(x, function (y) {
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, function (err) {
          reject(err); // 失败了
        });
      } // 如果 x.then 不是函数


      resolve(x);
    } // 如果 x 不是 promise 实例


    resolve(x);
  }

  var mypromise = new MyPromise(function (resolve, reject) {
    resolve('成功');
  });
  var mypromise2 = new MyPromise(function (resolve, reject) {
    resolve('成功2');
  });
  mypromise.then(function (data) {
    console.log(data, '1');
    return mypromise2;
  }).then(function (data) {
    console.log(data, '2');
  });

}());
//# sourceMappingURL=bundle.js.map
