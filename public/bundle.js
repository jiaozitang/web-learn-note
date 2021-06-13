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
      return new MyPromise(function (resolve, reject) {
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
    if (promise2 === x) {
      reject(new TypeError('The promise and the return value are the same'));
    }

    if (x instanceof MyPromise || x instanceof Object) {
      try {
        x = x.then;
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(x);
    }

    resolve(x);
  }

  var mypromise = new MyPromise(function (resolve, reject) {
    resolve(123);
  });
  mypromise.then(function (data) {
    console.log(data, '1');
    return '第一个Promise';
  }).then(function (data) {
    console.log(data, '2');
  });

}());
//# sourceMappingURL=bundle.js.map
