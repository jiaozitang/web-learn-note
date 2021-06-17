// 全局对象
const _ = {}

window.onload = function () {
    // ul 节点
    _.oUl = document.getElementById('list')
    // 按钮 节点
    _.oButton = document.getElementById('btn')
    // 消耗时间 节点
    _.oTime = document.getElementById('time')
    const btnList = _.oButton.getElementsByTagName('button')

    Array.from(btnList).forEach((btn, index) => {
        // 为按钮添加事件
        btn.addEventListener('click', () => {
            go({page: index + 1})
        })
    })

    // 默认加载第一页数据
    go({page: 1})
}

// 跳转到某一页
function go ({page}) {
    const startTime = new Date().getTime()
    const data = getData({page})
    const ulChildren = _.oUl.getElementsByTagName('li')
    Array.from(ulChildren).forEach(item => {
        _.oUl.removeChild(item)
    })

    data.forEach((dataItem, index) => {
        const li = document.createElement('li')
        li.innerHTML = `${index}-${dataItem}`
        _.oUl.appendChild(li)
    })

    const endTime = new Date().getTime()
    const time = endTime - startTime
    _.oTime.innerHTML = time
}

// 获取某一页的数据
function getData ({page, pageSize = 5000}) {
    const list = []
    list.length = pageSize
    return list.fill(page)
}