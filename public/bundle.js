(function () {
    'use strict';

    var before = function before(fn, beforeFn) {
      return function () {
        beforeFn.apply(this, arguments);
        return fn.apply(this, arguments);
      };
    };

    var ajax = function ajax(type, url, param) {
      console.log(arguments); // ...ajax请求...省略
    };

    ajax = before(ajax, function (type, url, param) {
      console.log(param);
      param.token = 'xxx';
    });
    ajax('type', 'url', {
      name: 'tj'
    });

}());
//# sourceMappingURL=bundle.js.map
