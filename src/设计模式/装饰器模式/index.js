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

// let a = before(
//     function() {
//         alert(1)
//     },
//     function() {
//         alert(2)
//     }
// )

// a = before(a, function() {
//     alert(3)
// })

// a()

let b = after(
    function() {
        alert(1)
    },
    function() {
        alert(2)
    }
)

b = after(b, function() {
    alert(3)
})

b()