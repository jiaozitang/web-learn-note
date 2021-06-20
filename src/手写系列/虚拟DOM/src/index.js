import Element from './lib/element'
import diff from './lib/diff'
import patch from './lib/patch'

const el = Element

let count = 0

// function renderTree () {
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

function renderTree () {
  return el('div', {'id': 'container'}, [
          el('h1', {style: 'color: red'}, ['simple virtal dom']),
          el('p', ['the count is :' + Math.random()])
        ])
}

let tree = renderTree()
const root = tree.render()
document.body.appendChild(root)

setTimeout(() => {
  const newTree = renderTree()
  const patches = diff(tree, newTree)
  patch(root, patches)
  tree = newTree
}, 2000)
