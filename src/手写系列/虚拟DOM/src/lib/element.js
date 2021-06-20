import _ from '../lib-test/util'

function Element (tagName, props = {}, children = []) {
  if (!(this instanceof Element)) {
    return new Element(tagName, props, children)
  }

  if (props instanceof Array) {
    children = props
    props = {}
  }

  // 标签名
  this.tagName = tagName
  // 属性对象
  this.props = props
  // 子节点
  this.children = children
  // key标志
  const { key = void 666 } = this.props
  this.key = key

  // 子节点数量
  let count = 0
  this.children.forEach((child, index) => {
    if (child instanceof Element) {
      count += child.count
    }
    count++
  })
  this.count = count
}

Element.prototype.render = function () {
  const el = document.createElement(this.tagName)
  const props = this.props

  for (const propName in props) {
    const propValue = props[propName]
    _.setAttr(el, propName, propValue)
  }

  this.children.forEach((child) => {
    let childEl

    if (child instanceof Element) {
      childEl = child.render()
    } else {
      childEl = document.createTextNode(child)
    }
    el.appendChild(childEl)
  })

  return el
}

export default Element
