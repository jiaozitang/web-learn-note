// function getArticle (currentPage, pageSize) {
//   // 模拟一个ajax请求
//   return new Promise((resolve, reject) => {
//     resolve({
//       ok: true,
//       data: {
//         list: [],
//         total: 10,
//         params: {
//           currentPage, 
//           pageSize
//         }
//       }
//     })
//   })
// }

// const proxyGetArticle = (() => {
//   const caches = []

//   return async (currentPage, pageSize) => {

//     const cache = Array.prototype.join.call([currentPage, pageSize],',')

//     console.log(cache)

//     if (cache in caches) {
//       return caches[cache]
//     }
//     const { data, ok } = await getArticle(currentPage, pageSize)

//     if (ok) {
//       caches[cache] = data
//     }

//     return caches[cache]
//   }
// })

// proxyGetArticle(1, 10)

// proxyGetArticle(2, 10)

// proxyGetArticle(1, 10)
(async function a () {
  console.log(123)
})()
