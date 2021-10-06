/*
包含n个reducer函数: 根据老的state和指定的action返回一个新的state
 */
import {combineReducers} from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_SESSION,
  REPEAT_SESSION,
  RECEIVE_SESSION_LIST
} from './action-types'

import {getRedirectTo} from '../utils'

const initUser = {
  username: '', // 用户名
  msg: '', // 错误提示信息
  redirectTo: '' // 需要自动重定向的路由路径
}
// 产生user状态的reducer
function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data是user
      return {...action.data, redirectTo: getRedirectTo()}
    case ERROR_MSG: // data是msg
      return {...state, msg: action.data}
    case RECEIVE_USER: // data是user
      return action.data
    case RESET_USER: // data是msg
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initSession = {
  session_name: '',
  user1: '',
  user2: '',
  user3: '',
  msg: '' // error message
}

function session(state=initSession, action) {
  switch (action.type) {
    case RECEIVE_SESSION: 
      return action.data
    case REPEAT_SESSION:
      return {...state, msg: action.data}
    default:
      return state
  }
}

const initSessionList = []

function sessionList(state=initSessionList, action) {
  switch (action.type) {
    case RECEIVE_SESSION_LIST:
      return action.data
    default:
      return state
  }
}


export default combineReducers({
  user,
  sessionList
})
// 向外暴露的状态的结构: {user: {}}

