
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_SESSION,
  REPEAT_SESSION,
  RECEIVE_SESSION_LIST
} from './action-types'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqCreate,
  reqSessionList
} from '../api'


// synchronous actions
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiveSession = (session) => ({type: RECEIVE_SESSION, data:session})
const repeatSession = (msg) => ({type: REPEAT_SESSION, data: msg})
export const receiveSessionList = (sessionList) => ({type: RECEIVE_SESSION_LIST, data: sessionList})



// register asynchronous action
export const register = (user) => {
  const {username, password, password2} = user
  if(!username) {
    return errorMsg('Username must be specified!')
  } else if(password!==password2) {
    return errorMsg('Two passwords don\'t match!')
  }
  return async dispatch => {
    // send register asynchronous ajax request
    const response = await reqRegister({username, password})
    const result = response.data //  {code: 0/1, data: user, msg: ''}
    if(result.code===0) {// success
      dispatch(authSuccess(result.data))
    } else { // fail
      dispatch(errorMsg(result.msg))
    }
  }
}

// login asynchronous action
export const login = (user) => {

  const {username, password} = user
  if(!username) {
    return errorMsg('Username must be specified!')
  } else if(!password) {
    return errorMsg('Password must be specified!')
  }

  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if(result.code===0) {// success
      dispatch(authSuccess(result.data))
    } else { // fail
      dispatch(errorMsg(result.msg))
    }
  }
}

// update user asynchronous action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) { // update success: data
      dispatch(receiveUser(result.data))
    } else { // update fail: msg
      dispatch(resetUser(result.msg))
    }
  }
}

// get user asynchronous action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if(result.code===0) { // success
      dispatch(receiveUser(result.data))
    } else { // fail
      dispatch(resetUser(result.msg))
    }
  }
}

// create session asynchronous action
export const create = (session) => {
  const {session_name, user1, user2, user3, end, create_time} = session
  
  return async dispatch => {
    const response = await reqCreate({session_name, user1, user2, user3, end, create_time})
    const result = response.data //  {code: 0/1, data: user, msg: ''}
   
    if(result.code===0) {
      dispatch(receiveSession(result.data))
    } else {
      dispatch(repeatSession(result.msg))
    }
  }
}

// get session list asynchronous action
export const getSessionList = (end) => {
  return async dispatch => {
    const response = await reqSessionList(end)
    const result = response.data //  {code: 0/1, data: user, msg: ''}
   
    if(result.code===0) {
      dispatch(receiveSessionList(result.data))
    }
  }
}