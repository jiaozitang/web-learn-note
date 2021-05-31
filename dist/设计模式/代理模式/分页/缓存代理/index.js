"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  _a = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
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