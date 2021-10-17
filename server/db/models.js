const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin2')
const conn = mongoose.connection
conn.on('connected', () => {
  console.log('db connect success!')
})



const userSchema = mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true}, 
})
const UserModel = mongoose.model('user', userSchema) // collection: users
exports.UserModel = UserModel



const sessionSchema = mongoose.Schema({
  session_name: {type: String, required: true},
  session_id: {type: String},

  user1: {type: String},
  user1_moves: {type: Array},
  user1_pos: {type: Array}, 

  user2: {type: String},
  user2_moves: {type: Array},
  user2_pos: {type: Array},

  user3: {type: String},
  user3_moves: {type: Array},
  user3_pos: {type: Array},

  ground_truth: {type: Array}, 

  end: {type: String, required: true}, // end or not flag
  create_time: {type: Number, required: true}
})
const SessionModel = mongoose.model('session', sessionSchema) // collection: sessions
exports.SessionModel = SessionModel