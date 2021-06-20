'use strict';

const e = React.createElement;

let start = 0
let end = 0

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // 分页数据
      time: 0 // 耗时
    }

    this.go({page: 1})
  }

  componentWillUpdate () {
    start = new Date().getTime()
  }

  componentDidUpdate () {
    end = new Date().getTime()
    console.log(end - start)
  }

    // 跳转到某一页
  go ({page}) {
    const startTime = new Date().getTime()
    const data = this.getData({page})
    this.handleDom(data)
    const endTime = new Date().getTime()
    const time = endTime - startTime
    this.showTimeOnPage(time)
  }

  showTimeOnPage (time) {
    this.setState({
      time
    })
  }

  handleDom (data) {
    this.setState({
      data
    })
  }

  // 获取某一页的数据
  getData ({page, pageSize = 20}) {
    const list = []
    list.length = pageSize
    return list.fill(page)
  }

  // 在线babel转义
  render() {
    const { data, time } = this.state
    return (
      e("div", null, 
        e("p", null, "分页消耗时长：", 
          e("span", null, time), "ms"
        ), 
        e("div", null, 
          e("button", { onClick: () => this.go({page: 1}) }, "第一页"), 
          e("button", { onClick: () => this.go({page: 2}) }, "第二页")
        ), 
        e("ul", null, data.map((dataItem, index) => {
          const key = `${index}-${dataItem}`
          return (
            e("li", { key }, [`${index}-${dataItem}`, html])
          )
        }))
      )
    )
  }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(e(LikeButton), domContainer);