import { PATCH_KEY } from './const'

const {
    REPLACE,
    REORDER,
    PROPS,
    TEXT
} = PATCH_KEY

function patch (node, patches) {
    const walker = {
        index: 0
    }
    dfsWalk(node, walker, patches)
}

function dfsWalk (node, walker, patches) {
    const { index } = walker
    const { childNodes } = node
    const currentPatches = patches[index]

    childNodes.forEach(child => {
        walker.index++
        dfsWalk(child, walker, patches)
    })

    if (currentPatches) {
        applyPatches(node, currentPatches)
    }
}

function applyPatches (node, currentPatches) {
    currentPatches.forEach(currentPatch => {
        switch (currentPatch.type) {
            case REPLACE:
                const newNode = (typeof currentPatch.node === 'string')
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break

            case REORDER:
                reorderChildren(node, currentPatch.moves)
                break
            
            case PROPS:
                setProps(node, currentPatch.props)
                break

            case TEXT:
                node.textContent = currentPatch.content
                break

            default:
                throw new Error('Unknown patch type' + currentPatch.type)
        }
    }) 
}

function setProps (node, props) {
    for(let key in props) {
        if(props[key] === 666) {
            node.removeAttribute(key)
        } else {
            const value = props[key]
            _.setAttr(node, key, value)
        }
    }
}

function reorderChildren (node, moves) {
    const { childNodes } = node
    const staticNodeList = Array.from(childNodes)
    const maps = {}

    staticNodeList.forEach(node => {
        if (node.nodeType === 1) {
            const key = node.getAttribute('key')
            if (key) {
                maps[key] = node
            }
        }
    })

    moves.forEach(move => {
        const { index, type } = move

        if (type === 0) {
            if (staticNodeList[index] === node.childNodes[index]) {
                node.removeChild(node.childNodes[index])
            }
            staticNodeList.splice(index, 1)
        } else if (type === 1) {
            var insertNode = maps[move.item.key]
            ? maps[move.item.key].cloneNode(true) // reuse old item
            : (typeof move.item === 'object')
                ? move.item.render()
                : document.createTextNode(move.item)
          staticNodeList.splice(index, 0, insertNode)
          node.insertBefore(insertNode, node.childNodes[index] || null)
        }
    })
    
}

export default patch