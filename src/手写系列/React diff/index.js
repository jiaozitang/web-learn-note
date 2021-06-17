var svd = require('simple-virtual-dom')

var el = svd.el
var diff = svd.diff
var patch = svd.patch

// 1. use `el(tagName, [propeties], children)` to create a virtual dom tree
var tree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: blue'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li')])
])

// 2. generate a real dom from virtual dom. `root` is a `div` element
var root = tree.render()

// 3. generate another different virtual dom tree
var newTree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: red'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li'), el('li')])
])

// 4. diff two virtual dom trees and get patches
var patches = diff(tree, newTree)

// 5. apply patches to real dom
patch(root, patches)

// now the `root` dom is updated
