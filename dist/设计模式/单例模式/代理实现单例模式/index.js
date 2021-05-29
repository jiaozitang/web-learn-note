"use strict";

var CreateDiv = function CreateDiv(html) {
  this.html = html;
  this.init();
  console.log(html);
};

CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxySingleTonCreateDiv = function ProxySingleTonCreateDiv(html) {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
      console.log(instance.html);
    }

    return instance;
  };
};

var a = new ProxySingleTonCreateDiv('a')();
var b = new ProxySingleTonCreateDiv('b')();
console.log(a === b, a, b);