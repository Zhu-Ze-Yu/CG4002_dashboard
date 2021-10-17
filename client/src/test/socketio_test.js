import io from 'socket.io-client'

const socket = io('ws://localhost:4000')
socket.on('receiveMsg', function (data) {
  console.log('client receive msg from server', data)
})

// send msg
socket.emit('sendMsg', {name: 'abc'})
console.log('client send msg to server', {name: 'abc'})
