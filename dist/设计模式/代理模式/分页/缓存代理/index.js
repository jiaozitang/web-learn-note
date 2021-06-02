"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// function getArticle (currentPage, pageSize) {
//   // 模拟一个ajax请求
//   return new Promise((resolve, reject) => {
//     resolve({
//       ok: true,
//       data: {
//         list: [],
//         total: 10,
//         params: {
//           currentPage, 
//           pageSize
//         }
//       }
//     })
//   })
// }
// const proxyGetArticle = (() => {
//   const caches = []
//   return async (currentPage, pageSize) => {
//     const cache = Array.prototype.join.call([currentPage, pageSize],',')
//     console.log(cache)
//     if (cache in caches) {
//       return caches[cache]
//     }
//     const { data, ok } = await getArticle(currentPage, pageSize)
//     if (ok) {
//       caches[cache] = data
//     }
//     return caches[cache]
//   }
// })
// proxyGetArticle(1, 10)
// proxyGetArticle(2, 10)
// proxyGetArticle(1, 10)
function a() {
  return _a.apply(this, arguments);
}

function _a() {
  _a = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(123);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _a.apply(this, arguments);
}

a();