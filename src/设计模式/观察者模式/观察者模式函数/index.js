(function () {
    const Event = function () {
        this.clientList = []
        this.listen = function (key, fn) {
            if (!this.clientList[key]) {
                this.clientList[key] = []
            }
    
            this.clientList[key].push(fn)
        }
        this.trigger = function (key, params) {
            const fns = this.clientList[key]
            if (!fns || fns.length === 0) {
                return false
            }

            fns.forEach(fn => {
                fn(params)
            })
        }
        this.remove = function (key, fn) {
            const fns = this.clientList[key]

            if (!fns) {
                return false
            }

            const index = fns.findIndex(i => i === fn)
            fns.splice(index, 1)
        }
    }

    const salesOffices = new Event()

    console.log(salesOffices)

    const fn1 = ({price, squareMeter}) => {
        console.log(`价格`, price)
        console.log(`平方米=`, squareMeter)
    }

    // 订阅消息
    salesOffices.listen('square88', fn1)

    // 订阅消息
    salesOffices.listen('square110', fn1)

    // 发布消息
    salesOffices.trigger('square88', { price: 2000, squareMeter: 88 })

    salesOffices.remove('square88', fn1)

    salesOffices.trigger('square88', { price: 3000, squareMeter: 88 })

    salesOffices.trigger('square110', { price: 5000, squareMeter: 110 })

})()