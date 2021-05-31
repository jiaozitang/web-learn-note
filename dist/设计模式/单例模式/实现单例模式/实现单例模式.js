"use strict";

var _this = void 0;

var Singleton = function Singleton(name) {
  this.name = name;
  this.instance = null;
};

Singleton.prototype.getName = function () {
  console.log(_this.name);
};

Singleton.getInstance = function (name) {
  if (!_this.instance) {
    _this.instance = new Singleton(name);
  }

  return _this.instance;
}; // Singleton.getInstance = (() => {
// 	let instance = null
// 	return name => {
// 		if (!instance) {
// 			instance = new Singleton(name)
// 		}
// 		return instance
// 	}
// })()


var a = Singleton.getInstance('b');
var b = Singleton.getInstance('c');
console.log(a === b, a, b);