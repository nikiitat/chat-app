import Filter from 'bad-words'
import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import { generateMessage } from './utils/messages'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', (socket) => {
  console.log('New Websocket connection')

  socket.on('join', ({ username, room }) => {
    socket.join(room)

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
      const errorMsg = 'Profanity is not allowed!'
      return callback(errorMsg)
    }

    io.emit('message', generateMessage(message))
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('User has left!'))
  })
})

httpServer.listen(3000)
