/*
硬件状态路由组件
 */

import React from 'react'
import {connect} from 'react-redux'

class Device extends React.Component {
  render() {
    return (
      <div> device status </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Device)