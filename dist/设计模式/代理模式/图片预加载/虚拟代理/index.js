"use strict";

var _this = void 0;

var myImage = function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function setSrc(src) {
      imgNode.src = src;
    }
  };
}();

var loadingSrc = '';
var imgSrc = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa98e67c4708449eb6894c7133d93774~tplv-k3u1fbpfcp-watermark.image';

var proxyImage = function proxyImage() {
  var img = new Image();

  img.onload = function () {
    myImage.setSrc(_this.src);
  };

  return {
    setSrc: function setSrc(src) {
      myImage.setSrc(loadingSrc);
      img.src = src;
    }
  };
};

proxyImage.setSrc(imgSrc);