import { PATCH_KEY } from './const'
import listDiff from 'list-diff2'

function diff (oldTree, newTree) {
    let index = 0
    const patches = {}
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}

function dfsWalk (oldNode, newNode, index, patches) {
    const currentPatch = []

    if (newNode === null) {

    } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
        // 如果旧节点和新节点都是文本类型
        // 如果节点有更新，，将该更新同步至currentPatch
        if (newNode !== oldNode) {
            currentPatch.push({
                type: PATCH_KEY.TEXT,
                content: newNode
            })
        }
    } else if (
        // 如果新旧节点的标签名、key值相等
        oldNode.tagName === newNode.tagName &&
        oldNode.key === newNode.key
    ) {
        // 对比节点属性
        const propsPatches = diffProps(oldNode, newNode)

        // 如果有属性更新，将该更新同步至currentPatch
        if (propsPatches) {
            currentPatch.push({
                type: PATCH_KEY.PROPS,
                props: propsPatches
            })
        }

        if (!isIgnoreChildren(newNode)) {
            // 对比子节点
            diffChildren(
                oldNode.children,
                newNode.children,
                index,
                patches,
                currentPatch
            )
        }
    } else {
        // 如果新节点存在，且和旧节点标签名不同，或者key不同，则直接将新节点替换为旧节点
        currentPatch.push({
            type: PATCH_KEY.REPLACE, 
            node: newNode
        })
    }

    if (currentPatch.length) {
        patches[index] = currentPatch
    }
}

function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
    const diffs = listDiff(oldChildren, newChildren, 'key')
    const { moves, children } = diffs

    newChildren = children

    if (moves.length) {
        const reorderPatch = {
            type: PATCH_KEY.REORDER,
            moves: moves
        }
        currentPatch.push(reorderPatch)
    }

    let leftNode = null
    let currentNodeIndex = index
    oldChildren.forEach((oldChild, index) => {
        const newChild = newChildren[index]
        currentNodeIndex = (leftNode && leftNode.count) 
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1
        dfsWalk(oldChild, newChild, currentNodeIndex, patches)
        leftNode = oldChild
    })
}

function diffProps (oldNode, newNode) {
    let count = 0
    const oldProps = oldNode.props
    const newProps = newNode.props

    let key, value
    let propsPatches = {}

    for (key in oldProps) {
        value = oldProps[key]
        if (newProps[key] !== value) {
            count++
            // 得到更新、删除的属性
            propsPatches[key] = newProps[key]
        }
    }

    for (key in newProps) {
        value = newProps[key]
        if(!oldProps.hasOwnProperty(key)) {
            count++
            // 得到删除的属性
            propsPatches[key] = newProps[key]
        }
    }

    if (count === 0) {
        return null
    }

    return propsPatches
}

function isIgnoreChildren (node) {
    return (node.props && node.props.hasOwnProperty('ignore'))
}

export default diff