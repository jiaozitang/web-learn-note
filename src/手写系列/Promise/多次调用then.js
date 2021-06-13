// Promise 的 3 种状态
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class MyPromise {
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
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        if (this.status === STATUS.PENDING) {
          this.onFulfilledCallback.push(onFulfilled)
          this.onRejectedCallback.push(onRejected)
        } else if (this.status === STATUS.FULFILLED) {
            onFulfilled(this.value)
        } else if (this.status === STATUS.REJECTED) {
            onRejected(this.reason)
        }
    }
}

const mypromise = new MyPromise((resolve, reject) => {
  resolve('成功')
})

mypromise.then(data => {
  console.log(data, '1')
})

mypromise.then(data => {
  console.log(data, '2')
})
