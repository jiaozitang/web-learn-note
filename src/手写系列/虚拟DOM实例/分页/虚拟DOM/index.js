'use strict';

const e = React.createElement;

let start = 0
let end = 0

const html = e("div", {
  "data-v-791421da": "",
  class: "content-box"
}, e("div", {
  "data-v-791421da": "",
  class: "meta-container"
}, e("div", {
  "data-v-791421da": "",
  class: "user-message"
}, e("a", {
  "data-v-791421da": "",
  href: "/user/4300945218607197",
  target: "_blank",
  rel: "",
  name: "user",
  state: "4300945218607197",
  class: "userbox"
}, e("div", {
  "data-v-1d25c2a8": "",
  "data-v-791421da": "",
  block: "userPopover",
  state: "4300945218607197",
  class: "user-popover-box"
}, "\u6E05\u6C64\u997A\u5B50"))), e("div", {
  "data-v-791421da": "",
  class: "dividing"
}), e("div", {
  "data-v-791421da": "",
  class: "date"
}, "4\u5929\u524D"), e("div", {
  "data-v-791421da": "",
  class: "dividing"
}), e("div", {
  "data-v-791421da": "",
  class: "tag_list"
}, e("div", {
  "data-v-791421da": "",
  class: "tag"
}, e("a", {
  "data-v-791421da": "",
  href: "/tag/JavaScript",
  target: "_blank",
  rel: "",
  name: "tag",
  state: "6809640398105870343",
  class: "tag"
}, " JavaScript "), e("i", {
  "data-v-791421da": "",
  class: "point"
})), e("div", {
  "data-v-791421da": "",
  class: "tag"
}, e("a", {
  "data-v-791421da": "",
  href: "/tag/%E5%89%8D%E7%AB%AF",
  target: "_blank",
  rel: "",
  name: "tag",
  state: "6809640407484334093",
  class: "tag"
}, " \u524D\u7AEF "), e("i", {
  "data-v-791421da": "",
  class: "point"
})))), e("div", {
  "data-v-791421da": "",
  class: "content-wrapper"
}, e("div", {
  "data-v-791421da": "",
  class: "content-main"
}, e("div", {
  "data-v-791421da": "",
  class: "title-row"
}, e("a", {
  "data-v-791421da": "",
  href: "/post/6973155726302642206",
  target: "_blank",
  rel: "",
  name: "title",
  title: "\u624B\u5199\u7CFB\u5217-\u8FD9\u4E00\u6B21\uFF0C\u5F7B\u5E95\u641E\u61C2 Promise",
  class: "title"
}, " \u624B\u5199\u7CFB\u5217-\u8FD9\u4E00\u6B21\uFF0C\u5F7B\u5E95\u641E\u61C2 Promise ")), e("div", {
  "data-v-791421da": "",
  class: "abstract"
}, e("a", {
  "data-v-791421da": "",
  href: "/post/6973155726302642206",
  target: "_blank",
  rel: ""
}, " \u672C\u6587\u5B9E\u73B0\u4E86\u4E00\u4E2A\u7B26\u5408Promises/A+ \u89C4\u8303\u7684 Promise\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7EE7\u7EED\u81EA\u5DF1\u52A8\u624B\uFF0C\u53C2\u8003 ES6 \u7684 Promise \u65B9\u6CD5\u5BF9 MyPromise \u8FDB\u884C\u62D3\u5C55\u7EC3\u4E60\u3002 ")), e("ul", {
  "data-v-791421da": "",
  class: "action-list jh-timeline-action-area"
}, e("li", {
  "data-v-791421da": "",
  name: "commentBtn",
  class: "item view"
}, e("i", {
  "data-v-791421da": ""
}), " ", e("span", {
  "data-v-791421da": ""
}, "2393")), e("li", {
  "data-v-791421da": "",
  name: "likeBtn",
  class: "item like active"
}, e("i", {
  "data-v-791421da": ""
}), " ", e("span", {
  "data-v-791421da": ""
}, " 18 ")), e("li", {
  "data-v-791421da": "",
  name: "commentBtn",
  class: "item comment"
}, e("i", {
  "data-v-791421da": ""
}), " ", e("span", {
  "data-v-791421da": ""
}, " 5 ")), e("li", {
  "data-v-791421da": "",
  name: "moreBtn",
  class: "item more"
}, e("i", {
  "data-v-791421da": ""
}), e("ul", {
  "data-v-791421da": "",
  silent: "silent",
  class: "more-list"
}, e("li", {
  "data-v-791421da": "",
  class: "item"
}, " \u7F16\u8F91 "), e("li", {
  "data-v-791421da": "",
  class: "item"
}, "\u5220\u9664"))))), e("img", {
  "data-v-fd37d0ac": "",
  "data-v-791421da": "",
  src: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/596c26911f3342ea86adcc94c441332d~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp",
  alt: "\u624B\u5199\u7CFB\u5217-\u8FD9\u4E00\u6B21\uFF0C\u5F7B\u5E95\u641E\u61C2 Promise",
  class: "lazy thumb",
  "data-src": "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/596c26911f3342ea86adcc94c441332d~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
})))

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