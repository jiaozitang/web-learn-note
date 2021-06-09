const before = function (fn, beforeFn) {
    return function () {
        beforeFn.apply(this, arguments)
        return fn.apply(this, arguments)
    }
}

const after = function (fn, afterFn) {
    return function () {
        const __ = fn.apply(this, arguments)
        afterFn.apply(this, arguments)
        return __
    }
}

const duck =  {
    makeVoice: function () {
        console.log('我会嘎嘎嘎啦')
    },
    sleep: function () {
        console.log('谁又不会睡觉呢')
    },
    walk: function () {
        console.log('哈哈哈，我会走路啦')
    },
    init: function () {
        this.makeVoice()
        this.sleep()
        this.walk()
    }
}

after(duck.init, function egg () {
    console.log('生蛋快乐～')
}).apply(duck)