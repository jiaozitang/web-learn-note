(function () {
    'use strict';

    // 全局对象
    var _ = {};

    window.onload = function () {
      // ul 节点
      _.oUl = document.getElementById('list'); // 按钮 节点

      _.oButton = document.getElementById('btn'); // 消耗时间 节点

      _.oTime = document.getElementById('time'); // 文章模拟 节点

      _.oHtml = document.getElementById('html');

      var btnList = _.oButton.getElementsByTagName('button');

      Array.from(btnList).forEach(function (btn, index) {
        // 为按钮添加事件
        btn.addEventListener('click', function () {
          go({
            page: index + 1
          });
        });
      }); // 默认加载第一页数据

      go({
        page: 1
      });
    }; // 跳转到某一页


    function go(_ref) {
      var page = _ref.page;
      var startTime = new Date().getTime();
      var data = getData({
        page: page
      });
      handleDom(data);
      var endTime = new Date().getTime();
      var time = endTime - startTime;
      showTimeOnPage(time);
    }

    function showTimeOnPage(time) {
      _.oTime.innerHTML = time;
    }

    function handleDom(data) {
      var ulChildren = _.oUl.getElementsByTagName('li');

      Array.from(ulChildren).forEach(function (item) {
        _.oUl.removeChild(item);
      });
      data.forEach(function (dataItem, index) {
        var li = document.createElement('li');
        li.innerHTML = "".concat(index, "-").concat(dataItem).concat(_.oHtml);

        _.oUl.appendChild(li);
      });
    } // 获取某一页的数据


    function getData(_ref2) {
      var page = _ref2.page,
          _ref2$pageSize = _ref2.pageSize,
          pageSize = _ref2$pageSize === void 0 ? 20 : _ref2$pageSize;
      var list = [];
      list.length = pageSize;
      return list.fill(page);
    }

}());
//# sourceMappingURL=bundle.js.map
