"use strict";

var Flower = function Flower() {
  return '玫瑰🌹';
};

var xiaoming = {
  sendFlower: function sendFlower(target) {
    debugger;
    var flower = new Flower();
    target.receiveFlower(flower);
  }
};
var xiaodai = {
  receiveFlower: function receiveFlower(flower) {
    xiaobai.listenGoodMood();
    xiaobai.receiveFlower(flower);
  }
};
var xiaobai = {
  receiveFlower: function receiveFlower(flower) {
    console.log('收到花', flower);
  },
  listenGoodMood: function listenGoodMood() {
    return new Promise(function (resolve, reject) {
      // 10秒后，心情变好
      setTimeout(function () {
        resolve();
      }, 10 * 1000);
    });
  }
};
xiaoming.sendFlower(xiaodai);