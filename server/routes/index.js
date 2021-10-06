var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel, SessionModel} = require('../db/models')
const filter = {password: 0, __v: 0} // 指定过滤的属性

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 注册的路由
router.post('/register', function (req, res) {
  // 读取请求参数数据
  const {username, password} = req.body
  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
    // 查询(根据username)
  UserModel.findOne({username}, function (err, user) {
    // 如果user有值(已存在)
    if(user) {
      // 返回提示错误的信息
      res.send({code: 1, msg: 'User already exists!'})
    } else { // 没值(不存在)
      // 保存
      new UserModel({username, password:md5(password)}).save(function (error, user) {

        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
        // 返回包含user的json数据
        const data = {username, _id: user._id} // 响应数据中不要携带password
        res.send({code: 0, data})
      })
    }
  })
  // 返回响应数据
})

// 登陆的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
    if(user) { // 登陆成功
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
      // 返回登陆成功信息(包含user)
      res.send({code: 0, data: user})
    } else {// 登陆失败
      res.send({code: 1, msg: 'Incorrect username or password!'})
    }
  })
})

// 创建session的路由
router.post('/home', function (req, res) {
  // 读取请求参数数据
  const {session_name, user1, user2, user3, end, create_time} = req.body
  var today = new Date();
  var current_time =  today.getSeconds() 
                    + (today.getMinutes())*100
                    + (today.getHours())*10000
                    + (today.getDate())*1000000
                    + (today.getMonth()+1)*100000000
                    + (today.getFullYear())*10000000000; 

  UserModel.findOne({session_name}, function (err, session) {
    if(!session) {
      new SessionModel({session_name, user1, user2, user3, end:'true', create_time:current_time}).save(function (error, session) {
      
      res.cookie('session_id', session._id, {maxAge: 1000*60*60*24*365})
    
      const data = {session_name, user1, user2, user3, end, create_time, _id: session._id}
      res.send({code: 0, data})
      })
    } else {
      res.send({code: 1, msg: 'This session name already exists, try another one'})
    }
  })
})

// 更新用户信息的路由
router.post('/update', function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  // 如果不存在, 直接返回一个提示信息
  if(!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  // 存在, 根据userid更新对应的user文档数据
  // 得到提交的用户数据
  const user = req.body // 没有_id
  UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {

    if(!oldUser) {
      // 通知浏览器删除userid cookie
      res.clearCookie('userid')
      // 返回返回一个提示信息
      res.send({code: 1, msg: '请先登陆'})
    } else {
      // 准备一个返回的user数据对象
      const {_id, username, type} = oldUser
      const data = Object.assign({_id, username, type}, user)
      // 返回
      res.send({code: 0, data})
    }
  })
})

// 获取用户信息的路由(根据cookie中的userid)
router.get('/user', function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  // 如果不存在, 直接返回一个提示信息
  if(!userid) {
    return res.send({code: 1, msg: 'Please login first'})
  }
  // 根据userid查询对应的user
  UserModel.findOne({_id: userid}, filter, function (error, user) {
    if(user) {
      res.send({code: 0, data: user})
    } else {
      // 通知浏览器删除userid cookie
      res.clearCookie('userid')
      res.send({code: 1, msg: 'Please login first'})
    }

  })
})

// 获取session列表（根据end属性）
router.get('/sessionlist', function (req, res) {
  const {end} = req.query
  SessionModel.find({end}, filter, function (error, sessions) {
    res.send({code: 0, data: sessions})
  })
})


/*
获取当前用户所有相关session列表
 */
router.get('/historylist', function (req, res) {
  // 获取cookie中的userid
  const userid = req.cookies.userid
  // 查询得到所有user文档数组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有user信息: key为user的_id, val为name组成的user对象

    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username}
      return users
    } , {})
 
    SessionModel.find({'$or': [{user1: userid}, {user2: userid}, {user3: userid}], end:'true'}, filter, function (err, historySessions) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, historySessions}})
    })
  })
})

module.exports = router;
