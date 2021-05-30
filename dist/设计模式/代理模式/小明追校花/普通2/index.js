"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Flower = function Flower() {
  return '玫瑰🌹';
};

var xiaoming = {
  sendFlower: function sendFlower(target) {
    debugger;
    var flower = new Flower();
    target.receiveFlower(flower);
  }
};
var xiaodai = {
  receiveFlower: function () {
    var _receiveFlower = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(flower) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return xiaobai.listenGoodMood();

            case 2:
              xiaobai.receiveFlower(flower);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function receiveFlower(_x) {
      return _receiveFlower.apply(this, arguments);
    }

    return receiveFlower;
  }()
};
var xiaobai = {
  receiveFlower: function receiveFlower(flower) {
    console.log('收到花', flower);
  },
  listenGoodMood: function listenGoodMood() {
    return new Promise(function (resolve, reject) {
      // 10秒后，心情变好
      setTimeout(function () {
        resolve();
      }, 10 * 1000);
    });
  }
};
xiaoming.sendFlower(xiaodai);