(function () {
  'use strict';

  var util = {};

  (function (exports) {
    var _ = exports;

    _.type = function (obj) {
      return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    };

    _.isArray = function isArray(list) {
      return _.type(list) === 'Array';
    };

    _.slice = function slice(arrayLike, index) {
      return Array.prototype.slice.call(arrayLike, index);
    };

    _.truthy = function truthy(value) {
      return !!value;
    };

    _.isString = function isString(list) {
      return _.type(list) === 'String';
    };

    _.each = function each(array, fn) {
      for (var i = 0, len = array.length; i < len; i++) {
        fn(array[i], i);
      }
    };

    _.toArray = function toArray(listLike) {
      if (!listLike) {
        return [];
      }

      var list = [];

      for (var i = 0, len = listLike.length; i < len; i++) {
        list.push(listLike[i]);
      }

      return list;
    };

    _.setAttr = function setAttr(node, key, value) {
      switch (key) {
        case 'style':
          node.style.cssText = value;
          break;

        case 'value':
          var tagName = node.tagName || '';
          tagName = tagName.toLowerCase();

          if (tagName === 'input' || tagName === 'textarea') {
            node.value = value;
          } else {
            // if it is not a input or textarea, use `setAttribute` to set
            node.setAttribute(key, value);
          }

          break;

        default:
          node.setAttribute(key, value);
          break;
      }
    };
  })(util);

  function Element(tagName) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (!(this instanceof Element)) {
      if (!(children instanceof Array) && children !== null) {
        children = children.slice(2).filter(function (i) {
          return i;
        });
      }

      return new Element(tagName, props, children);
    }

    if (props instanceof Array) {
      children = props;
      props = {};
    }

    this.tagName = tagName;
    this.props = props;
    this.children = [];
    var _this$props$key = this.props.key,
        key = _this$props$key === void 0 ? 666 : _this$props$key;
    this.key = key;
    var count = 0;
    this.children.forEach(function (child, index) {
      if (child instanceof Element) {
        count += child.count;
      } else {
        children[i] = child.toString();
      }

      count++;
    });
    this.count = count;
  }

  Element.prototype.render = function () {
    var el = document.createElement(this.tagName);
    var props = this.props;

    for (var propName in props) {
      var propValue = props[propName];

      util.setAttr(el, propName, propValue);
    }

    this.children.forEach(function (child) {
      var childEl;

      if (child instanceof Element) {
        childEl = child.render();
      } else {
        childEl = document.createTextNode(child);
      }

      el.appendChild(childEl);
    });
    return el;
  };

  var el = Element;
  var element = el('div', {
    'id': 'container'
  }, [el('p', {
    'id': 'p1'
  }, ['pppppppp'])]);
  console.log(element);

}());
//# sourceMappingURL=bundle.js.map
