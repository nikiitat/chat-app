import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', (socket) => {
  console.log('New Websocket connection')

  socket.emit('message', 'Welcome!')
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', (message, callback) => {
    io.emit('message', message)
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', 'User has left!')
  })
})

httpServer.listen(3000)
