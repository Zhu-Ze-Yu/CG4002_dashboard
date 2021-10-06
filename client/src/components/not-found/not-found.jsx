/*
提示找不到页面的UI路由组件
 */

import React from "react"
import {Button} from "antd-mobile"

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Page not found !</h2>
          <Button
            type="primary"
            onClick={() => this.props.history.replace("/")}
          >
            Back to homepage
          </Button>
        </div>
      </div>
    )
  }
}

export default NotFound