import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import { generateMessage } from './utils/messages'
import { translateMessage } from './utils/translator'
import { addUser, getUser, removeUser } from './utils/users'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', (socket) => {
  // console.log('New Websocket connection')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user!.room)

    socket.emit('message', generateMessage('Admin', 'Welcome!'))
    socket.broadcast.to(user!.room).emit('message', generateMessage(user!.username, `${user!.username} has joined!`))
    callback()
  })

  socket.on('sendMessage', async (message, callback) => {
    const user = getUser(socket.id)

    const translatedMsg = await translateMessage(message, user!.locale)

    io.to(user!.room).emit('message', generateMessage(user!.username, translatedMsg))
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.emit('message', generateMessage('Admin', `${user.username} has left!`))
    }
  })
})

httpServer.listen(3000)
