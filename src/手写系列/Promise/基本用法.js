// Promise 的 3 种状态
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

export default class MyPromise {
  constructor (executor) {
      // 执行器
      executor(this.resolve, this.reject)
  }
  // 初始状态
  status = STATUS.PENDING
  
  // 成功返回值
  value = null
  
  // 失败返回值
  reason = null
  
  // 修改 Promise 状态，并定义成功返回值
  resolve = value => {
      if (this.status === STATUS.PENDING) {
          this.status = STATUS.FULFILLED
          this.value = value
      }
  }
  
  // 修改 Promise 状态，并定义失败返回值
  reject = () => {
      if (this.status === STATUS.PENDING) {
              this.status = STATUS.REJECTED
              this.reason = value
          }
      }

  then = function (onFulfilled, onRejected) {
    if (this.status === STATUS.FULFILLED) {
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
  console.log(data, '请求成功') // 成功打印“成功 请求成功”
}, err => {
  console.log(err, '请求失败')
})