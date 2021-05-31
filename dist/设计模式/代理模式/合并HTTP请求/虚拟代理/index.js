"use strict";

var synchronousFile = function synchronousFile(cache) {
  console.log('开始同步文件，id为：' + cache.join('/'));
};

var proxySynchronousFile = function () {
  var cache = [];
  var timer;
  return function (id) {
    console.log(id);
    cache.push(id);

    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      synchronousFile(cache);
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000);
  };
}();

var checkbox = document.getElementsByTagName('input');
Array.from(checkbox).forEach(function (i) {
  console.log(i);

  i.onclick = function () {
    if (i.checked) {
      proxySynchronousFile(i.value);
    }
  };
});