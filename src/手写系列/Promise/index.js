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
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
      
        return new MyPromise((resolve, reject) => {
          if (this.status === STATUS.PENDING) {
              this.onFulfilledCallback.push(() => {
                  try {
                      const x = onFulfilled(this.value)
                      resolvePromise(x, resolve, reject)
                  } catch (error) {
                      reject(error)
                  }
              })
              this.onRejectedCallback.push(() => {
                  try {
                      const x = onRejected(this.value)
                      resolvePromise(x, resolve, reject)
                  } catch (error) {
                      reject(error)
                  }
              })
          } else if (this.status === STATUS.FULFILLED) {
              try {
                  const x = onFulfilled(this.value)
                  resolvePromise(x, resolve, reject)
              } catch (error) {
                  reject(error)
              }
          } else if (this.status === STATUS.REJECTED) {
              try {
                  const x = onRejected(this.reason)
                  resolvePromise(x, resolve, reject)
              } catch (error) {
                  reject(error)
              }
          }
        }) 
    }
}

function resolvePromise (x, resolve, reject) {
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

  