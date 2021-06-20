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
    this.children = children;
    var _this$props$key = this.props.key,
        key = _this$props$key === void 0 ? 666 : _this$props$key;
    this.key = key;
    var count = 0;
    this.children.forEach(function (child, index) {
      if (child instanceof Element) {
        count += child.count;
      } else {
        children[index] = child.toString();
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

  var PATCH_KEY = {
    REPLACE: 0,
    REORDER: 1,
    PROPS: 2,
    TEXT: 3
  };

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

  function diff(oldTree, newTree) {
    var index = 0;
    var patches = {};
    dfsWalk$1(oldTree, newTree, index, patches);
    return patches;
  }

  function dfsWalk$1(oldNode, newNode, index, patches) {
    var currentPatch = [];

    if (newNode === null) ; else if (typeof oldNode === 'string' && typeof newNode === 'string') {
      // 如果旧节点和新节点都是文本类型
      // 如果节点有更新，，将该更新同步至currentPatch
      if (newNode !== oldNode) {
        currentPatch.push({
          type: PATCH_KEY.TEXT,
          content: newNode
        });
      }
    } else if ( // 如果新旧节点的标签名、key值相等
    oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
      // 对比节点属性
      var propsPatches = diffProps(oldNode, newNode); // 如果有属性更新，将该更新同步至currentPatch

      if (propsPatches) {
        currentPatch.push({
          type: PATCH_KEY.PROPS,
          props: propsPatches
        });
      }

      if (!isIgnoreChildren(newNode)) {
        // 对比子节点
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
      }
    } else {
      // 如果新节点存在，且和旧节点标签名不同，或者key不同，则直接将新节点替换为旧节点
      currentPatch.push({
        type: PATCH_KEY.REPLACE,
        node: newNode
      });
    }

    if (currentPatch.length) {
      patches[index] = currentPatch;
    }
  }

  function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var diffs = listDiff2(oldChildren, newChildren, 'key');
    var moves = diffs.moves,
        children = diffs.children;
    newChildren = children;

    if (moves.length) {
      var reorderPatch = {
        type: PATCH_KEY.REORDER,
        moves: moves
      };
      currentPatch.push(reorderPatch);
    }

    var leftNode = null;
    var currentNodeIndex = index;
    oldChildren.forEach(function (oldChild, index) {
      var newChild = newChildren[index];
      currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
      dfsWalk$1(oldChild, newChild, currentNodeIndex, patches);
      leftNode = oldChild;
    });
  }

  function diffProps(oldNode, newNode) {
    var count = 0;
    var oldProps = oldNode.props;
    var newProps = newNode.props;
    var key, value;
    var propsPatches = {};

    for (key in oldProps) {
      value = oldProps[key];

      if (newProps[key] !== value) {
        count++; // 得到更新、删除的属性

        propsPatches[key] = newProps[key];
      }
    }

    for (key in newProps) {
      value = newProps[key];

      if (!oldProps.hasOwnProperty(key)) {
        count++; // 得到删除的属性

        propsPatches[key] = newProps[key];
      }
    }

    if (count === 0) {
      return null;
    }

    return propsPatches;
  }

  function isIgnoreChildren(node) {
    return node.props && node.props.hasOwnProperty('ignore');
  }

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

  var REPLACE = PATCH_KEY.REPLACE,
      REORDER = PATCH_KEY.REORDER,
      PROPS = PATCH_KEY.PROPS,
      TEXT = PATCH_KEY.TEXT;

  function patch(node, patches) {
    var walker = {
      index: 0
    };
    dfsWalk(node, walker, patches);
  }

  function dfsWalk(node, walker, patches) {
    var index = walker.index;
    var childNodes = node.childNodes;
    var currentPatches = patches[index];
    childNodes.forEach(function (child) {
      walker.index++;
      dfsWalk(child, walker, patches);
    });

    if (currentPatches) {
      applyPatches(node, currentPatches);
    }
  }

  function applyPatches(node, currentPatches) {
    currentPatches.forEach(function (currentPatch) {
      switch (currentPatch.type) {
        case REPLACE:
          var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
          node.parentNode.replaceChild(newNode, node);
          break;

        case REORDER:
          reorderChildren(node, currentPatch.moves);
          break;

        case PROPS:
          setProps(node, currentPatch.props);
          break;

        case TEXT:
          node.textContent = currentPatch.content;
          break;

        default:
          throw new Error('Unknown patch type' + currentPatch.type);
      }
    });
  }

  function setProps(node, props) {
    for (var key in props) {
      if (props[key] === 666) {
        node.removeAttribute(key);
      } else {
        var value = props[key];

        _.setAttr(node, key, value);
      }
    }
  }

  function reorderChildren(node, moves) {
    var childNodes = node.childNodes;
    var staticNodeList = Array.from(childNodes);
    var maps = {};
    staticNodeList.forEach(function (node) {
      if (node.nodeType === 1) {
        var key = node.getAttribute('key');

        if (key) {
          maps[key] = node;
        }
      }
    });
    moves.forEach(function (move) {
      var index = move.index,
          type = move.type;

      if (type === 0) {
        if (staticNodeList[index] === node.childNodes[index]) {
          node.removeChild(node.childNodes[index]);
        }

        staticNodeList.splice(index, 1);
      } else if (type === 1) {
        var insertNode = maps[move.item.key] ? maps[move.item.key].cloneNode(true) // reuse old item
        : _typeof(move.item) === 'object' ? move.item.render() : document.createTextNode(move.item);
        staticNodeList.splice(index, 0, insertNode);
        node.insertBefore(insertNode, node.childNodes[index] || null);
      }
    });
  }

  var el = Element;
  var count = 0;

  function renderTree() {
    count++;
    var items = [];
    var color = count % 2 === 0 ? 'blue' : 'red';

    for (var i = 0; i < count; i++) {
      items.push(el('li', ['Item #' + i]));
    }

    return el('div', {
      'id': 'container'
    }, [el('h1', {
      style: 'color: ' + color
    }, ['simple virtal dom']), el('p', ['the count is :' + count]), el('ul', items)]);
  }

  var tree = renderTree();
  var root = tree.render();
  document.body.appendChild(root);
  setInterval(function () {
    var newTree = renderTree();
    var patches = diff(tree, newTree);
    console.log(patches);
    patch(root, patches);
    tree = newTree;
  }, 1000);

}());
//# sourceMappingURL=bundle.js.map
