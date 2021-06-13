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
  onFulfilledCallbacks = []

  // 失败回调
  onRejectedCallbacks = []

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

        while(this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(value)
        }
    }
  }
  
  // 修改 Promise 状态，并定义失败返回值
    reject = value => {
        if (this.status === STATUS.PENDING) {
            this.status = STATUS.REJECTED
            this.reason = value

            while(this.onRejectedCallbacks.length) {
                this.onRejectedCallbacks.shift()(value)
            }
        }
    }

    then (onFulfilled, onRejected) {
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

          /* if (this.status === STATUS.PENDING) {
              this.onFulfilledCallbacks.push(fulfilledMicrotask)
              this.onRejectedCallbacks.push(rejectedMicrotask)
          } else if (this.status === STATUS.FULFILLED) {
            fulfilledMicrotask()
          } else if (this.status === STATUS.REJECTED) {
            rejectedMicrotask()
          } */
          // 判断状态
          if (this.status === STATUS.FULFILLED) {
            fulfilledMicrotask() 
          } else if (this.status === STATUS.REJECTED) { 
            rejectedMicrotask()
          } else if (this.status === STATUS.PENDING) {
            // 等待
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功失败函数的时候再传递
            this.onFulfilledCallbacks.push(fulfilledMicrotask);
            this.onRejectedCallbacks.push(rejectedMicrotask);
          }
        }) 

        return promise2
    }
}

function resolvePromise (promise, x, resolve, reject) {
  // 如果 promise === x， 执行 reject，错误原因为 TypeError
    if (promise === x) {
      return reject(new TypeError('The promise and the return value are the same'))
    }

    // 如果 x 是 promise 实例
    if (typeof x === 'object' || typeof x === 'function') {

      if (x === null) {
        return resolve(x);
      }

      let then
      try {
        then = x.then
      } catch (error) {
        return reject(error)
      }

      // 如果 x.then 是函数
      if (typeof then === 'function') {
        let called = false;
        then.call(x, y => {
          // resolve的结果依旧是promise 那就继续解析
          if (called) return;
              called = true;
          resolvePromise(promise, y, resolve, reject);
        }, err => {
          if (called) return;
              called = true;
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
  resolve('成功')
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