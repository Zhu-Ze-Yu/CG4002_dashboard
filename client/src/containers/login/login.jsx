/*
login
 */

import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  login = () => {
    this.props.login(this.state)
  }

  // handle input changing: update corresponding state
  handleChange = (name, val) => {
    // update state
    this.setState({
      [name]: val  // attribute is not "name", but the value of "name"
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {

    const {msg, redirectTo} = this.props.user
    // if redirectTo got value, then redirect to that path
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
        <NavBar>D&nbsp;A&nbsp;N&nbsp;C&nbsp;E&nbsp;!</NavBar>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace/>
            <InputItem placeholder='Enter your username...' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Enter your password...' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
            <WhiteSpace/>

            <Button type='primary' onClick={this.login}>Log&nbsp;in</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>No&nbsp;account?&nbsp;Create&nbsp;one</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)