const after = function (fn, afterFn) {
    return function () {
        const __ = fn.apply(this, arguments)
        afterFn.apply(this, arguments)
        return __
    }
}

const showLogin = function () {
    console.log('去登录')
}

const log = function () {
    console.log('去上报')
}

const loginBtnClick = after(showLogin, log)

loginBtnClick()