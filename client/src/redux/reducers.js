
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
  username: '', 
  msg: '', // error msg
  redirectTo: '' // redirection path
}

// create user state reducer
function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data is user
      return {...action.data, redirectTo: getRedirectTo()}
    case ERROR_MSG: // data is msg
      return {...state, msg: action.data}
    case RECEIVE_USER: // data is user
      return action.data
    case RESET_USER: // data is msg
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
