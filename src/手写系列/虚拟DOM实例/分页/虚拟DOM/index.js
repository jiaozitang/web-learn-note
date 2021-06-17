'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
  }

  // 在线babel转义
  render() {
    return (
      e("div", null, 
        e("p", null, "分页消耗时长：", 
          e("span", {
            id: "time"
          }), "ms"
        ), 
        e("div", {
            id: "btn"
          }, 
          e("button", null, "第一页"), 
          e("button", null, "第二页")
        ), 
        e("ul", {
          id: "list"
        })
      )
    )

    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );

    // return e(
    //   'div',
    //   [
    //     e(
    //       'p',
    //       [
    //         '分页消耗时长：',
    //         e('span'),
    //         'ms'
    //       ]
    //     )
    //   ]
    // )
    
  }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(e(LikeButton), domContainer);