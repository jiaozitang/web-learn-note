"use strict";

var getSingle = function getSingle(fn) {
  var result;
  return function () {
    result || (result = fn.apply(this, arguments));
  };
};

var createSingleIframe = getSingle(function () {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  console.log(iframe);
  return iframe;
});
var iDiv = document.getElementsByTagName('div')[0];

iDiv.onclick = function () {
  var a = createSingleIframe('a');
  var b = createSingleIframe('b');
  console.log(a, b, a === b);
};

console.log(iDiv, 1111);