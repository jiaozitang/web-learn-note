"use strict";

var createLoginLayer = function createLoginLayer() {
  var div = document.createElement('div');
  div.innerHTML = '我是登录弹窗';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};

document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
};