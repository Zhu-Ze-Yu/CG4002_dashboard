/*
dance page
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import ClassMqtt from '../../mqtt/'


class Dance extends Component {

  render() {
    return (
      <div id='start-dance'> 
        <NavBar>Session_name</NavBar> 
        <ClassMqtt />
      </div>   
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Dance)