// 可发布可订阅的对象
const Pubsub = {
    subscrib: function (ev, callback) {
        this._callbacks || (this._callbacks = {});
        (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
    },

    publish: function () {
        const args = [...arguments]
        const ev = args.shift()

        if (!this._callbacks) return
        if (!this._callbacks[ev]) return

        this._callbacks[ev].forEach(callback => {
            callback(...args)
        })
    }
}

// 订阅model更新消息，更新后所有符合条件的dom节点都会收到通知，进行更新
Pubsub.subscrib('model-update-event', function ({propNameWhole, propValue}) {
    const elements = document.querySelectorAll(`[data-bind="${propNameWhole}"]`)

    elements.forEach(element => {
        const elementTagName = element.tagName.toLowerCase()
        const formTypeTagNames = ['input', 'select', 'textarea']
        if (formTypeTagNames.includes(elementTagName)) {
            element.value = propValue
        } else {
            element.innerHTML = propValue
        }
    })
})

// 添加onchange/onkeyup事件，触发时，发布ui更新消息 start
function eventHander (e) {
    const { target } = e
    const { value: propValue } = target

    const propNameWhole = target.getAttribute('data-bind')
    if (propNameWhole) {
        console.log(propNameWhole, 123)
        // 发布ui更新消息
        Pubsub.publish('ui-update-event', { propNameWhole, propValue })
    }
}

document.addEventListener('change', eventHander, false)
document.addEventListener('keyup', eventHander, false)

// end

class Bind {
    constructor () {
        this.modelName = ''
    }

    initModal ({ modelName }) {
        this.modelName = modelName

        // 订阅ui更新消息
        Pubsub.subscrib('ui-update-event', ({propNameWhole, propValue}) => {
            const [ , _propName] = propNameWhole.split('.')
            this.updateModalData(_propName, propValue)
        })
    }

    loadModalData (modelData) {
        for (let propName in modelData) {
            this.updateModalData(propName, modelData[propName])
        }
    }

    updateModalData (propName, propValue) {
        const propNameWhole = `${this.modelName}.${propName}`
        // 发布model更新消息
        Pubsub.publish('model-update-event', { propNameWhole, propValue });
    }

}

const user = new Bind()

user.initModal({
    modelName: 'user'
})

user.loadModalData({
    name: 'tj',
    age: '18'
})