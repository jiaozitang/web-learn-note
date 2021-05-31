const synchronousFile = cache => {
  console.log('开始同步文件，id为：'+ cache.join('/'))
}

const proxySynchronousFile = (() => {
  const cache = []

  let timer

  return id => {
    console.log(id)
    cache.push(id)

    if (timer) {
      return
    }

    timer = setTimeout(() => {
      synchronousFile(cache)
      clearTimeout(timer)
      timer = null
      cache.length = 0
    }, 2000)
  }
})()

const checkbox = document.getElementsByTagName('input')

Array.from(checkbox).forEach(i => {
  console.log(i)
  i.onclick = () => {
    if (i.checked) {
      proxySynchronousFile(i.value)
    }
  }
})

