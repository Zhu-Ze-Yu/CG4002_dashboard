/*
用户个人中心路由组件
 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item

class Personal extends React.Component {

  logout = () => {
    // alert('-----')
    Modal.alert('Log Out?', 'Are you sure you would like to log out?', [
      {text: 'Cancel'},
      {
        text: 'Log Out',
        onPress: ()=> {

          // 干掉cookie中userid
          Cookies.remove('userid')
          // 干掉redux管理user
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {username} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:50}}>
        <Result
          img={<img src={require(`../../assets/images/header1.png`)} style={{width: 50}} alt="header"/>}
          title={username}
        />

        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>Log&nbsp;Out</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)