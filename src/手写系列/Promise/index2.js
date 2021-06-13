const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

export default class MyPromise {
  constructor (executor) {
      // 执行器
      try {
          executor(this.resolve, this.reject)
      } catch (reason) {
          this.reject(reason)
      }
  }

  // 成功回调
  onFulfilledCallback = []

  // 失败回调
  onRejectedCallback = []

  // 初始状态为 pending
  status = STATUS.PENDING
  
  // 请求成功时的返回值
  value = null
  
  // 请求失败的原因
  reason = null
  
  // 修改 Promise 状态，并定义成功返回值
  resolve = value => {
    if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED
        this.value = value

        while(this.onFulfilledCallback.length) {
            this.onFulfilledCallback.shift()(value)
        }
    }
  }
  
  // 修改 Promise 状态，并定义失败返回值
    reject = value => {
        if (this.status === STATUS.PENDING) {
            this.status = STATUS.REJECTED
            this.reason = value

            while(this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(value)
            }
        }
    }

    then = function (onFulfilled, onRejected) {
        // 返回 MyPromise实例
      const promise2 = new MyPromise((resolve, reject) => {
        if (this.status === STATUS.PENDING) {
            this.onFulfilledCallback.push(() => {
                const x = onFulfilled(this.value)
                resolvePromise(x, resolve, reject)
            })
            this.onRejectedCallback.push(() => {
                const x = onRejected(this.value)
                resolvePromise(x, resolve, reject)
            })
        } else if (this.status === STATUS.FULFILLED) {
            const x = onFulfilled(this.value)
            resolvePromise(x, resolve, reject)
        } else if (this.status === STATUS.REJECTED) {
            const x = onRejected(this.error)
            resolvePromise(x, resolve, reject)
        }
      }) 

      return promise2
    }
    static resolve = function (fn) {
        if (fn instanceof MyPromise) {
            return fn
        }

        return new MyPromise(resolve => {
            fn = typeof fn === 'function' ? fn : fn => fn
            resolve(fn())
        })
    }
    
    static reject = function (fn) {
        return new MyPromise((resolve, reject) => {
            fn = typeof fn === 'function' ? fn : fn => {throw fn}
            reject(fn())
        })
    }


}


  