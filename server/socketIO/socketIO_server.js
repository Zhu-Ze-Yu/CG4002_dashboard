const {ChatModel} = require('../db/models')
module.exports = function (server) {
  const io = require('socket.io')(server)

  io.on('connection', function (socket) {
    console.log('one client connect to server')

    socket.on('sendMsg', function ({from, to, content}) {
      console.log('server recieve msg from client', {from, to, content})

      const chat_id = [from, to].sort().join('_')// from_to or to_from
      const create_time = Date.now()
      new ChatModel({from, to, content, chat_id, create_time}).save(function (error, chatMsg) {
        io.emit('receiveMsg', chatMsg)
      })
    })
  })
}