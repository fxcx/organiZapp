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

const PORT = process.env.PORT || 3000

// router method
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

io.on('conection', socket => {
  console.log('cliente conectado')
})
serverSocket.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})
