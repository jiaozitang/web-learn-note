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

myImage.setSrc('https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa98e67c4708449eb6894c7133d93774~tplv-k3u1fbpfcp-watermark.image');