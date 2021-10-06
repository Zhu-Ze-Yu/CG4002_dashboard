/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin2')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', () => {
  console.log('db connect success!')
})

/*2. 定义出对应特定集合的Model并向外暴露*/
// 2.1. 定义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合为: users
// 2.3. 向外暴露Model
exports.UserModel = UserModel


// 定义session集合的文档结构
const sessionSchema = mongoose.Schema({
  session_name: {type: String, required: true}, // session 的名称
  session_id: {type: String}, // user1 user2 user3组成的字符串

  user1: {type: String}, // dancer1 的id
  user1_moves: {type: Array}, // dancer1 的所有dancemoves
  user1_pos: {type: Array}, // dancer1 的所有positions

  user2: {type: String}, // dancer2 的id
  user2_moves: {type: Array}, // dancer2 的所有dancemoves
  user2_pos: {type: Array}, // dancer2 的所有positions

  user3: {type: String}, // dancer3 的id
  user3_moves: {type: Array}, // dancer3 的所有dancemoves
  user3_pos: {type: Array}, // dancer3 的所有positions

  ground_truth: {type: Array}, 

  end: {type: String, required: true}, // 结束与否
  create_time: {type: Number, required: true} // 创建时间
})
// 定义能操作sessions集合数据的Model
const SessionModel = mongoose.model('session', sessionSchema) // 集合为: sessions
// 向外暴露Model
exports.SessionModel = SessionModel