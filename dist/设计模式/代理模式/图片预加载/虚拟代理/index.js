"use strict";

var myImage = function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function setSrc(src) {
      imgNode.src = src;
    }
  };
}();

var loadingSrc = '../../../../img/loading.gif';
var imgSrc = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa98e67c4708449eb6894c7133d93774~tplv-k3u1fbpfcp-watermark.image';

var proxyImage = function () {
  var img = new Image();

  img.onload = function () {
    myImage.setSrc(img.src);
  };

  return {
    setSrc: function setSrc(src) {
      myImage.setSrc(loadingSrc);
      img.src = src;
    }
  };
}();

proxyImage.setSrc(imgSrc);