/*
主界面的路由组件
 */

import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()
import {NavBar} from 'antd-mobile'

import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Device from '../device_status/device_status'
import Home from '../home/home'
import Evaluation from '../evaluation/evaluation'
import Personal from '../personal/personal'
import Dance from '../start_dance/start_dance'
import History from '../history/history'


import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {

  // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/device_status', // 路由路径
      component: Device,
      title: 'Device Status',
      icon: 'device',
      text: 'device',
    },
    {
      path: '/home', // 路由路径
      component: Home,
      title: 'Home',
      icon: 'home',
      text: 'home',
    },
    {
      path: '/history', // 路由路径
      component: History,
      title: 'History',
      icon: 'history',
      text: 'history',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: 'Personal Info',
      icon: 'personal',
      text: 'personal',
    }
  ]

  componentDidMount () {
    //登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id) {
      // 发送异步请求, 获取user
      // console.log('发送ajax请求获取user')
      this.props.getUser()
    }
  }

  render() {

    // 读取cookie中的userid
    const userid = Cookies.get('userid')
    // 如果没有, 自动重定向到登陆界面
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // 如果有,读取redux中的user状态
    const {user} = this.props
    // 如果user有没有_id, 返回null(不做任何显示)
    // debugger
    if(!user._id) {
      return null
    } else {
      // 如果有_id, 显示对应的界面
      // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
      let path = this.props.location.pathname
      if(path==='/') {
        // 得到一个重定向的路由路径
        path = getRedirectTo()
        return <Redirect to= {path}/>
      }
    }

    const {navList} = this
    const path = this.props.location.pathname // 请求的路径
    const currentNav = navList.find(nav=> nav.path===path) // 得到当前的nav, 可能没有

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
          }
          
          <Route path='/start_dance/:sessionid' component={Dance}/>
          <Route path='/evaluation/:userid' component={Evaluation}/>

          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)