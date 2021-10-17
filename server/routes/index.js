var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel, SessionModel} = require('../db/models')
const filter = {password: 0, __v: 0} // filter attributes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// register router
router.post('/register', function (req, res) {
  const {username, password} = req.body

  UserModel.findOne({username}, function (err, user) {
    if(user) {
      res.send({code: 1, msg: 'User already exists!'})
    } else { 
      new UserModel({username, password:md5(password)}).save(function (error, user) {

        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
        const data = {username, _id: user._id}
        res.send({code: 0, data})
      })
    }
  })
})

// login router
router.post('/login', function (req, res) {
  const {username, password} = req.body
  UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
    if(user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
      res.send({code: 0, data: user})
    } else {
      res.send({code: 1, msg: 'Incorrect username or password!'})
    }
  })
})

// create session router
router.post('/home', function (req, res) {
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
      new SessionModel({session_name, user1, user2, user3, end:'false', create_time:current_time}).save(function (error, session) {
      
      res.cookie('session_id', session._id, {maxAge: 1000*60*60*24*365})
    
      const data = {session_name, user1, user2, user3, end, create_time, _id: session._id}
      res.send({code: 0, data})
      })
    } else {
      res.send({code: 1, msg: 'This session name already exists, try another one'})
    }
  })
})

// update user router
router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if(!userid) {
    return res.send({code: 1, msg: 'please login first'})
  }
  const user = req.body 
  UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {

    if(!oldUser) {
      res.clearCookie('userid')
      res.send({code: 1, msg: 'please login first'})
    } else {
      const {_id, username, type} = oldUser
      const data = Object.assign({_id, username, type}, user)
      res.send({code: 0, data})
    }
  })
})

// get user info router (based on userid in cookie)
router.get('/user', function (req, res) {
  const userid = req.cookies.userid
  if(!userid) {
    return res.send({code: 1, msg: 'Please login first'})
  }
  UserModel.findOne({_id: userid}, filter, function (error, user) {
    if(user) {
      res.send({code: 0, data: user})
    } else {
      res.clearCookie('userid')
      res.send({code: 1, msg: 'Please login first'})
    }

  })
})

// get session list (based on end flag)
router.get('/sessionlist', function (req, res) {
  const {end} = req.query
  SessionModel.find({end}, filter, function (error, sessions) {
    res.send({code: 0, data: sessions})
  })
})

module.exports = router;
