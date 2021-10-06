/*
开始跳舞后的界面路由组件
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, NavBar, WhiteSpace, Button, Grid} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

const num1 = Math.floor(Math.random() * (8-1) + 1)

const num2 = Math.floor(Math.random() * (3-1) + 1)

class Dance extends Component {

  render() {
    return (
      <div id='start-dance'> 
        <NavBar>Session_name</NavBar> 
        <List renderHeader={() => 'user 1'}>
          <Item multipleLine>
            <Brief>dance moves: {num1}</Brief>
            <Brief>relative position: {num2}</Brief>
          </Item>
        </List>

        <WhiteSpace/>
        <List renderHeader={() => 'user 2'}>
          <Item multipleLine>
            <Brief>dance moves: {num1}</Brief>
            <Brief>relative position: {num2}</Brief>
          </Item>
        </List>

        <WhiteSpace/>
        <List renderHeader={() => 'user 3'}>
          <Item multipleLine>
            <Brief>dance moves: {num1}</Brief>
            <Brief>relative position: {num2}</Brief>
          </Item>
        </List>

        <WhiteSpace/>
        <List renderHeader={() => 'fatigue'}>
          <Item multipleLine>
            <Brief>You need a break</Brief>
          </Item>
        </List>

        <WhiteSpace/>
        <Button>START</Button>
        <Button>END</Button>
        
      </div>   
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Dance)