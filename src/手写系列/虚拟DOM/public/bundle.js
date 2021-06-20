(function () {
  'use strict';

  var util$1 = {};

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
  })(util$1);

  function Element(tagName) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (!(this instanceof Element)) {
      return new Element(tagName, props, children);
    }

    if (props instanceof Array) {
      children = props;
      props = {};
    } // 标签名


    this.tagName = tagName; // 属性对象

    this.props = props; // 子节点

    this.children = children; // key标志

    var _this$props$key = this.props.key,
        key = _this$props$key === void 0 ? void 666 : _this$props$key;
    this.key = key; // 子节点数量

    var count = 0;
    this.children.forEach(function (child, index) {
      if (child instanceof Element) {
        count += child.count;
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

      util$1.setAttr(el, propName, propValue);
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var _$1 = util;
  var REPLACE = 0;
  var REORDER = 1;
  var PROPS = 2;
  var TEXT = 3;

  function patch$1(node, patches) {
    var walker = {
      index: 0
    };
    dfsWalk$1(node, walker, patches);
  }

  function dfsWalk$1(node, walker, patches) {
    var currentPatches = patches[walker.index];
    var len = node.childNodes ? node.childNodes.length : 0;

    for (var i = 0; i < len; i++) {
      var child = node.childNodes[i];
      walker.index++;
      dfsWalk$1(child, walker, patches);
    }

    if (currentPatches) {
      applyPatches(node, currentPatches);
    }
  }

  function applyPatches(node, currentPatches) {
    _$1.each(currentPatches, function (currentPatch) {
      switch (currentPatch.type) {
        // 替换 diff
        case REPLACE:
          var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
          node.parentNode.replaceChild(newNode, node);
          break;
        // 子节点重新排序 diff

        case REORDER:
          reorderChildren(node, currentPatch.moves);
          break;
        // 属性 diff

        case PROPS:
          setProps(node, currentPatch.props);
          break;
        // 文本节点 diff

        case TEXT:
          node.textContent = currentPatch.content;
          break;

        default:
          throw new Error('Unknown patch type ' + currentPatch.type);
      }
    });
  }

  function setProps(node, props) {
    for (var key in props) {
      if (props[key] === void 666) {
        node.removeAttribute(key);
      } else {
        var value = props[key];

        _$1.setAttr(node, key, value);
      }
    }
  }

  function reorderChildren(node, moves) {
    var staticNodeList = _$1.toArray(node.childNodes);

    var maps = {};

    _$1.each(staticNodeList, function (node) {
      if (node.nodeType === 1) {
        var key = node.getAttribute('key');

        if (key) {
          maps[key] = node;
        }
      }
    });

    _$1.each(moves, function (move) {
      var index = move.index;

      if (move.type === 0) {
        // remove item
        if (staticNodeList[index] === node.childNodes[index]) {
          // maybe have been removed for inserting
          node.removeChild(node.childNodes[index]);
        }

        staticNodeList.splice(index, 1);
      } else if (move.type === 1) {
        // insert item
        var insertNode = maps[move.item.key] ? maps[move.item.key].cloneNode(true) // reuse old item
        : _typeof(move.item) === 'object' ? move.item.render() : document.createTextNode(move.item);
        staticNodeList.splice(index, 0, insertNode);
        node.insertBefore(insertNode, node.childNodes[index] || null);
      }
    });
  }

  patch$1.REPLACE = REPLACE;
  patch$1.REORDER = REORDER;
  patch$1.PROPS = PROPS;
  patch$1.TEXT = TEXT;
  var patch_1 = patch$1;

  var diff$2 = {};

  /**
   * Diff two list in O(N).
   * @param {Array} oldList - Original List
   * @param {Array} newList - List After certain insertions, removes, or moves
   * @return {Object} - {moves: <Array>}
   *                  - moves is a list of actions that telling how to remove and insert
   */

  function diff$1(oldList, newList, key) {
    var oldMap = makeKeyIndexAndFree(oldList, key);
    var newMap = makeKeyIndexAndFree(newList, key);
    var newFree = newMap.free;
    var oldKeyIndex = oldMap.keyIndex;
    var newKeyIndex = newMap.keyIndex;
    var moves = []; // a simulate list to manipulate

    var children = [];
    var i = 0;
    var item;
    var itemKey;
    var freeIndex = 0; // fist pass to check item in old list: if it's removed or not

    while (i < oldList.length) {
      item = oldList[i];
      itemKey = getItemKey(item, key);

      if (itemKey) {
        if (!newKeyIndex.hasOwnProperty(itemKey)) {
          children.push(null);
        } else {
          var newItemIndex = newKeyIndex[itemKey];
          children.push(newList[newItemIndex]);
        }
      } else {
        var freeItem = newFree[freeIndex++];
        children.push(freeItem || null);
      }

      i++;
    }

    var simulateList = children.slice(0); // remove items no longer exist

    i = 0;

    while (i < simulateList.length) {
      if (simulateList[i] === null) {
        remove(i);
        removeSimulate(i);
      } else {
        i++;
      }
    } // i is cursor pointing to a item in new list
    // j is cursor pointing to a item in simulateList


    var j = i = 0;

    while (i < newList.length) {
      item = newList[i];
      itemKey = getItemKey(item, key);
      var simulateItem = simulateList[j];
      var simulateItemKey = getItemKey(simulateItem, key);

      if (simulateItem) {
        if (itemKey === simulateItemKey) {
          j++;
        } else {
          // new item, just inesrt it
          if (!oldKeyIndex.hasOwnProperty(itemKey)) {
            insert(i, item);
          } else {
            // if remove current simulateItem make item in right place
            // then just remove it
            var nextItemKey = getItemKey(simulateList[j + 1], key);

            if (nextItemKey === itemKey) {
              remove(i);
              removeSimulate(j);
              j++; // after removing, current j is right, just jump to next one
            } else {
              // else insert item
              insert(i, item);
            }
          }
        }
      } else {
        insert(i, item);
      }

      i++;
    }

    function remove(index) {
      var move = {
        index: index,
        type: 0
      };
      moves.push(move);
    }

    function insert(index, item) {
      var move = {
        index: index,
        item: item,
        type: 1
      };
      moves.push(move);
    }

    function removeSimulate(index) {
      simulateList.splice(index, 1);
    }

    return {
      moves: moves,
      children: children
    };
  }
  /**
   * Convert list to key-item keyIndex object.
   * @param {Array} list
   * @param {String|Function} key
   */


  function makeKeyIndexAndFree(list, key) {
    var keyIndex = {};
    var free = [];

    for (var i = 0, len = list.length; i < len; i++) {
      var item = list[i];
      var itemKey = getItemKey(item, key);

      if (itemKey) {
        keyIndex[itemKey] = i;
      } else {
        free.push(item);
      }
    }

    return {
      keyIndex: keyIndex,
      free: free
    };
  }

  function getItemKey(item, key) {
    if (!item || !key) return void 666;
    return typeof key === 'string' ? item[key] : key(item);
  }

  diff$2.makeKeyIndexAndFree = makeKeyIndexAndFree; // exports for test

  diff$2.diff = diff$1;

  var listDiff2 = diff$2.diff;

  var _ = util;
  var patch = patch_1;
  var listDiff = listDiff2;

  function diff(oldTree, newTree) {
    var index = 0;
    var patches = {};
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
  }

  function dfsWalk(oldNode, newNode, index, patches) {
    var currentPatch = []; // Node is removed.

    if (newNode === null) ; else if (_.isString(oldNode) && _.isString(newNode)) {
      if (newNode !== oldNode) {
        currentPatch.push({
          type: patch.TEXT,
          content: newNode
        });
      } // Nodes are the same, diff old node's props and children

    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
      // Diff props
      var propsPatches = diffProps(oldNode, newNode);

      if (propsPatches) {
        currentPatch.push({
          type: patch.PROPS,
          props: propsPatches
        });
      } // Diff children. If the node has a `ignore` property, do not diff children


      if (!isIgnoreChildren(newNode)) {
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
      } // Nodes are not the same, replace the old node with new node

    } else {
      currentPatch.push({
        type: patch.REPLACE,
        node: newNode
      });
    }

    if (currentPatch.length) {
      patches[index] = currentPatch;
    }
  }

  function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var diffs = listDiff(oldChildren, newChildren, 'key');
    newChildren = diffs.children;

    if (diffs.moves.length) {
      var reorderPatch = {
        type: patch.REORDER,
        moves: diffs.moves
      };
      currentPatch.push(reorderPatch);
    }

    var leftNode = null;
    var currentNodeIndex = index;

    _.each(oldChildren, function (child, i) {
      var newChild = newChildren[i];
      currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
      dfsWalk(child, newChild, currentNodeIndex, patches);
      leftNode = child;
    });
  }

  function diffProps(oldNode, newNode) {
    var count = 0;
    var oldProps = oldNode.props;
    var newProps = newNode.props;
    var key, value;
    var propsPatches = {}; // Find out different properties

    for (key in oldProps) {
      value = oldProps[key];

      if (newProps[key] !== value) {
        count++;
        propsPatches[key] = newProps[key];
      }
    } // Find out new property


    for (key in newProps) {
      value = newProps[key];

      if (!oldProps.hasOwnProperty(key)) {
        count++;
        propsPatches[key] = newProps[key];
      }
    } // If properties all are identical


    if (count === 0) {
      return null;
    }

    return propsPatches;
  }

  function isIgnoreChildren(node) {
    return node.props && node.props.hasOwnProperty('ignore');
  }

  var diff_1 = diff;

  var el = Element;
  //     count++
  //     var items = []
  //     var color = (count % 2 === 0)
  //       ? 'blue'
  //       : 'red'
  //     for (var i = 0; i < count; i++) {
  //       items.push(el('li', ['Item #' + i]))
  //     }
  //     return el('div', {'id': 'container'}, [
  //       el('h1', {style: 'color: ' + color}, ['simple virtal dom']),
  //       el('p', ['the count is :' + count]),
  //       el('ul', items)
  //     ])
  //   }

  function renderTree() {
    return el('div', {
      'id': 'container'
    }, [el('h1', {
      style: 'color: red'
    }, ['simple virtal dom']), el('p', ['the count is :' + Math.random()])]);
  }

  var tree = renderTree();
  var root = tree.render();
  document.body.appendChild(root);
  setTimeout(function () {
    var newTree = renderTree();
    var patches = diff_1(tree, newTree);
    patch_1(root, patches);
    tree = newTree;
  }, 2000);

}());
//# sourceMappingURL=bundle.js.map
