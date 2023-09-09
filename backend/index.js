import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import errorHandler from './middleware/errorHandler.js'
import { userRouter } from './router/userRouter.js'
import { taskRouter } from './router/taskRouter.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())

const serverSocket = http.createServer(app)
const io = new Server(serverSocket)

io.on('conection', socket => {
  console.log('cliente conectado')

  socket.on('message', (body) => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id
    })
  })
})

const PORT = process.env.PORT || 4000

// router method
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

serverSocket.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})
