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
      } catch (error) {
          this.reject(error)
      }
  }

  // 成功回调
  onFulfilledCallback = []

  // 失败回调
  onRejectedCallback = []

  // 初始状态
  status = STATUS.PENDING
  
  // 成功返回值
  value = null
  
  // 失败返回值
  resolve = null
  
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
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        const realOnRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
      
        const promise2 = new MyPromise((resolve, reject) => {
          
          const fulfilledMicrotask = () =>  {
          // 创建一个微任务等待 promise2 完成初始化
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = realOnFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          })  
        }
  
        const rejectedMicrotask = () => { 
          // 创建一个微任务等待 promise2 完成初始化
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = realOnRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          }) 
        }

          if (this.status === STATUS.PENDING) {
              this.onFulfilledCallback.push(fulfilledMicrotask)
              this.onRejectedCallback.push(rejectedMicrotask)
          } else if (this.status === STATUS.FULFILLED) {
            fulfilledMicrotask()
          } else if (this.status === STATUS.REJECTED) {
            rejectedMicrotask()
          }
        }) 

        return promise2
    }
}

function resolvePromise (promise2, x, resolve, reject) {
  // 如果 promise2 === x， 执行 reject，错误原因为 TypeError
    if (promise2 === x) {
      reject(new TypeError('The promise and the return value are the same'))
    }

    // 如果 x 是 promise 实例
    if (typeof x === 'object' || typeof x === 'function') {
      let then
      try {
        then = x.then
      } catch (error) {
        reject(error)
      }

      // 如果 x.then 是函数
      if (typeof then === 'function') {
        then.call(x, y => {
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          reject(err);// 失败了
        })
      }

      // 如果 x.then 不是函数
      resolve(x)
    }

    // 如果 x 不是 promise 实例
    resolve(x)
}

const mypromise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('成功'), 2000)
})

const mypromise2 = new MyPromise((resolve, reject) => {
  resolve('成功2')
})

mypromise.then(data => {
  console.log(data, '1')
  return mypromise2 
}).then(data => {
  console.log(data, '2')
})