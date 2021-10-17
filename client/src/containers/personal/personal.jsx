/*
personal info page
 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item

class Personal extends React.Component {

  logout = () => {
    Modal.alert('Log Out?', 'Are you sure you would like to log out?', [
      {text: 'Cancel'},
      {
        text: 'Log Out',
        onPress: ()=> {

          // remove the userid in cookie
          Cookies.remove('userid')
          // remove user in redux
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