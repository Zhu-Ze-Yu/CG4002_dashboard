/*
register page
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

import {register} from '../../redux/actions'

class Register extends Component {
  state = {
    username: '', 
    password: '',  
    password2: '',  
  }

  register = () => {
    this.props.register(this.state)
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val 
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {msg, redirectTo} = this.props.user
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
            <InputItem placeholder='Enter your password again...' type="password" onChange={val => {this.handleChange('password2', val)}}>Confirm:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>Sign&nbsp;up</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>Already&nbsp;have&nbsp;an&nbsp;account</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)