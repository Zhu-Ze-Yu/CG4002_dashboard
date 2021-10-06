/*
包含n个action creator
异步action
同步action
 */
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

/*
单例对象
1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
2. 创建对象之后: 保存对象
 */

// function initIO(dispatch, userid) {
//   // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
//   if(!io.socket) {
//     // 连接服务器, 得到与服务器的连接对象
//     io.socket = io('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
//     // 绑定监听, 接收服务器发送的消息
//     io.socket.on('receiveMsg', function (chatMsg) {
//       console.log('客户端接收服务器发送的消息', chatMsg)
//       // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
//       // debugger
//       if(userid===chatMsg.from || userid===chatMsg.to) {
//         dispatch(receiveMsg(chatMsg, userid))
//       }
//     })

//   }
// }

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 创建session同步action
const receiveSession = (session) => ({type: RECEIVE_SESSION, data:session})
// 
const repeatSession = (msg) => ({type: REPEAT_SESSION, data: msg})
// 接收session列表的同步action
export const receiveSessionList = (sessionList) => ({type: RECEIVE_SESSION_LIST, data: sessionList})



// 注册异步action
export const register = (user) => {
  const {username, password, password2} = user
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if(!username) {
    return errorMsg('Username must be specified!')
  } else if(password!==password2) {
    return errorMsg('Two passwords don\'t match!')
  }
  // 表单数据合法, 返回一个发ajax请求的异步action函数
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqRegister({username, password})
    const result = response.data //  {code: 0/1, data: user, msg: ''}
    if(result.code===0) {// 成功
      //getMsgList(dispatch, result.data._id)
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data))
    } else { // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 登陆异步action
export const login = (user) => {

  const {username, password} = user
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if(!username) {
    return errorMsg('Username must be specified!')
  } else if(!password) {
    return errorMsg('Password must be specified!')
  }

  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqLogin(user)
    const result = response.data
    if(result.code===0) {// 成功
      //getMsgList(dispatch, result.data._id)
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data))
    } else { // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 更新用户异步action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) { // 更新成功: data
      dispatch(receiveUser(result.data))
    } else { // 更新失败: msg
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户异步action
export const getUser = () => {
  return async dispatch => {
    // 执行异步ajax请求
    const response = await reqUser()
    const result = response.data
    if(result.code===0) { // 成功
      //getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else { // 失败
      dispatch(resetUser(result.msg))
    }
  }
}

// 创建session异步action
export const create = (session) => {
  const {session_name, user1, user2, user3, end, create_time} = session
  
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqCreate({session_name, user1, user2, user3, end, create_time})
    const result = response.data //  {code: 0/1, data: user, msg: ''}
   
    if(result.code===0) {
      dispatch(receiveSession(result.data))
    } else {
      dispatch(repeatSession(result.msg))
    }
  }
}

// 获取session 列表的异步action
export const getSessionList = (end) => {
  // 表单数据合法, 返回一个发ajax请求的异步action函数
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqSessionList(end)
    const result = response.data //  {code: 0/1, data: user, msg: ''}
   
    if(result.code===0) {
      dispatch(receiveSessionList(result.data))
    }
  }
}