"use strict";

var createLoginLayer = function createLoginLayer() {
  var div = document.createElement('div');
  div.innerHTML = '我是登录弹窗';
  div.style.display = 'none';
  console.log(123);
  document.body.appendChild(div);
  return div;
};

var createSingle = function createSingle(fn) {
  var instance;
  return function () {
    return instance || (instance = fn.apply(this, arguments));
  };
};

var createSingleLoginLayer = createSingle(createLoginLayer);
var createSingleIframe = createSingle(function () {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  return iframe;
});

document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createSingleLoginLayer();
  var iframe = createSingleIframe();
  loginLayer.style.display = 'block';
  iframe.style.display = 'block';
};