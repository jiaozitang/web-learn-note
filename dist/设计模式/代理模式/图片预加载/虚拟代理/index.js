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

var loadingSrc = 'https://www.google.com.hk/url?sa=i&url=https%3A%2F%2Fwww.photophoto.cn%2Fpic%2F25781259.html&psig=AOvVaw03pqtji2QfV85ElmB0YoV3&ust=1622521840589000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCExYKL8_ACFQAAAAAdAAAAABAD';
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