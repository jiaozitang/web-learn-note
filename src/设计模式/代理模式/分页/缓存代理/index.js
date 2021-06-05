(async function () {
  function getArticle (currentPage, pageSize) {
    console.log('getArticle', currentPage, pageSize)
    // 模拟一个ajax请求
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        data: {
          list: [],
          total: 10,
          params: {
            currentPage, 
            pageSize
          }
        }
      })
    })
  }
  
  const proxyGetArticle = (() => {
    const caches = []
  
    return async (currentPage, pageSize) => {
  
      const cache = Array.prototype.join.call([currentPage, pageSize],',')
  
      if (cache in caches) {
        return caches[cache]
      }
      const { data, ok } = await getArticle(currentPage, pageSize)
  
      if (ok) {
        caches[cache] = data
      }
  
      return caches[cache]
    }
  })()

  // 搜索第一页
  await proxyGetArticle(1, 10)
  
  // 搜索第二页
  await proxyGetArticle(2, 10)

  // 再次搜索第一页
  await proxyGetArticle(1, 10)
  
})()
