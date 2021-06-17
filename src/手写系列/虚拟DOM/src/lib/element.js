import _ from './util'

function Element (tagName, props = {}, children = []) {
  if (!(this instanceof Element)) {
    if (!(children instanceof Array) && children !== null) {
      children = children.slice(2).filter(i => i)
    }

    return new Element(tagName, props, children)
  }

  if (props instanceof Array) {
    children = props
    props = {}
  }

  
  this.tagName = tagName
  this.props = props
  this.children = children
  const { key = 666 } = this.props
  this.key = key

  let count = 0

  this.children.forEach((child, index) => {
    if (child instanceof Element) {
      count += child.count
    } else {
      children[index] = child.toString()
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
