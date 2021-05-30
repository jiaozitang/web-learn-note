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
var xiaodai = {
  receiveFlower: function receiveFlower(flower) {
    xiaobai.listenGoodMood().then(function () {
      xiaobai.receiveFlower(flower);
    });
  }
};
var xiaobai = {
  receiveFlower: function receiveFlower(flower) {
    console.log('收到花', flower);
  },
  listenGoodMood: function listenGoodMood(fn) {
    return new Promise(function (reslove, reject) {
      // 10秒后，心情变好
      reslove();
    });
  }
};
xiaoming.sendFlower(xiaodai);