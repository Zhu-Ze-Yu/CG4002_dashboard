/*
main page
 */

import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie' 
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

  navList = [ 
    {
      path: '/device_status', 
      component: Device,
      title: 'Device Status',
      icon: 'device',
      text: 'device',
    },
    {
      path: '/home',
      component: Home,
      title: 'Home',
      icon: 'home',
      text: 'home',
    },
    {
      path: '/history',
      component: History,
      title: 'History',
      icon: 'history',
      text: 'history',
    },
    {
      path: '/personal', 
      component: Personal,
      title: 'Personal Info',
      icon: 'personal',
      text: 'personal',
    }
  ]

  componentDidMount () {
    //login before (there is userid in cookie), but haven't login (the user in redux don't have _id) then send request to get user
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id) {
      // send asynchronous request, get user
      this.props.getUser()
    }
  }

  render() {

    // get the userid in cookie
    const userid = Cookies.get('userid')
    // if don't have then redirect to login page
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // if have, get the state of user in redux
    const {user} = this.props

    // if user don't have _id, return null (display nothing)
    if(!user._id) {
      return null
    } else {
      // if have _id, then show the page
      let path = this.props.location.pathname
      if(path==='/') {
        path = getRedirectTo()
        return <Redirect to= {path}/>
      }
    }

    const {navList} = this
    const path = this.props.location.pathname // request path
    const currentNav = navList.find(nav=> nav.path===path) // get nav bar

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