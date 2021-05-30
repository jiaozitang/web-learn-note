"use strict";

var createLoginLayer = function createLoginLayer() {
  var div = document.createElement('div');
  div.innerHTML = '我是登录弹窗';
  div.style.display = 'none';
  console.log(123);
  document.body.appendChild(div);
  return div;
};

var createSingle = function () {
  var instance = {};
  return function (fn) {
    if (!instance[fn.name]) {
      instance[fn.name] = fn.apply(this, arguments);
    }

    return instance[fn.name];
  };
}();

function createIframe() {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  iframe.style.display = 'none';
  return iframe;
}

var createSingleLoginLayer = createSingle(createLoginLayer);
var createSingleIframe = createSingle(createIframe);

document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createSingleLoginLayer;
  var iframe = createSingleIframe;
  loginLayer.style.display = 'block';
  iframe.style.display = 'block';
};