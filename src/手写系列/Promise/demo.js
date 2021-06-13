import MyPromise from './index2'

const mypromise = new MyPromise((resolve, reject) => {
  // setInterval(() => resolve('1'), 1000)
  resolve('成功')
  // throw new Error('执行器错误')
})

mypromise.then(data => {
  console.log(data, '1')
})

mypromise.then(data => {
  console.log(data, '2')
})
