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

  var MyPromise = /*#__PURE__*/function () {
    function MyPromise(executor) {
      var _this = this;

      _classCallCheck(this, MyPromise);

      _defineProperty(this, "onFulfilledCallbacks", []);

      _defineProperty(this, "onRejectedCallbacks", []);

      _defineProperty(this, "status", STATUS.PENDING);

      _defineProperty(this, "value", null);

      _defineProperty(this, "resolve", null);

      _defineProperty(this, "resolve", function (value) {
        if (_this.status === STATUS.PENDING) {
          _this.status = STATUS.FULFILLED;
          _this.value = value;

          while (_this.onFulfilledCallbacks.length) {
            _this.onFulfilledCallbacks.shift()(value);
          }
        }
      });

      _defineProperty(this, "reject", function (value) {
        if (_this.status === STATUS.PENDING) {
          _this.status = STATUS.REJECTED;
          _this.reason = value;

          while (_this.onRejectedCallbacks.length) {
            _this.onRejectedCallbacks.shift()(value);
          }
        }
      });

      // ?????????
      try {
        executor(this.resolve, this.reject);
      } catch (error) {
        this.reject(error);
      }
    } // ????????????


    _createClass(MyPromise, [{
      key: "then",
      value: function then(onFulfilled, onRejected) {
        var _this2 = this;

        var realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
          return value;
        };
        var realOnRejected = typeof onRejected === 'function' ? onRejected : function (error) {
          throw error;
        };
        var promise2 = new MyPromise(function (resolve, reject) {
          var fulfilledMicrotask = function fulfilledMicrotask() {
            // ??????????????????????????? promise2 ???????????????
            queueMicrotask(function () {
              try {
                // ???????????????????????????????????????
                var x = realOnFulfilled(_this2.value); // ?????? resolvePromise ????????????

                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            });
          };

          var rejectedMicrotask = function rejectedMicrotask() {
            // ??????????????????????????? promise2 ???????????????
            queueMicrotask(function () {
              try {
                // ??????????????????????????????????????????
                var x = realOnRejected(_this2.reason); // ?????? resolvePromise ????????????

                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            });
          };

          if (_this2.status === STATUS.PENDING) {
            _this2.onFulfilledCallbacks.push(fulfilledMicrotask);

            _this2.onRejectedCallbacks.push(rejectedMicrotask);
          } else if (_this2.status === STATUS.FULFILLED) {
            fulfilledMicrotask();
          } else if (_this2.status === STATUS.REJECTED) {
            rejectedMicrotask();
          }
        });
        return promise2;
      }
    }]);

    return MyPromise;
  }();

  function resolvePromise(promise, x, resolve, reject) {
    // ?????? promise === x??? ?????? reject?????????????????? TypeError
    if (promise === x) {
      return reject(new TypeError('The promise and the return value are the same'));
    } // ?????? x ??????????????????


    if (_typeof(x) === 'object' || typeof x === 'function') {
      if (x === null) {
        return resolve(x);
      }

      var then;

      try {
        then = x.then;
      } catch (error) {
        return reject(error);
      } // ?????? x.then ?????????


      if (typeof then === 'function') {
        var called = false;

        try {
          then.call(x, function (y) {
            // resolve??????????????????promise ??????????????????
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          }, function (err) {
            if (called) return;
            called = true;
            reject(err); // ?????????
          });
        } catch (error) {
          if (called) return;
          reject(error);
        }
      } else {
        // ?????? x.then ????????????
        resolve(x);
      }
    } else {
      // ?????? x ?????? promise ??????
      resolve(x);
    }
  }

  var mypromise = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      return resolve('??????');
    }, 1000);
  });
  var mypromise2 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      return resolve('??????2');
    }, 1000);
  });
  mypromise.then(function (data) {
    console.log(data, '1');
    return mypromise2;
  }).then(function (data) {
    console.log(data, '2');
  });

}());
//# sourceMappingURL=bundle.js.map
