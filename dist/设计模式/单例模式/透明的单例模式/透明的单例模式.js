"use strict";

var _this = void 0;

var createDiv = function createDiv() {
  var instance;

  var createDiv = function createDiv(html) {
    if (instance) {
      return instance;
    }

    _this.html = html;

    _this.init();

    return instance = _this;
  };

  createDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = _this.html;
    document.body.appendChild(div);
  };

  return createDiv;
};