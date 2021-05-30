"use strict";

var Flower = function Flower() {
  return '玫瑰🌹';
};

var xiaoming = {
  sendFlower: function sendFlower(target) {
    var flower = new Flower();
    target.receiveFlower(flower);
  }
};
var xiaobai = {
  receiveFlower: function receiveFlower(flower) {
    console.log('收到花', flower);
  }
};
xiaoming.sendFlower(xiaobai);