import express from 'express'
import https from 'https'
import fs from 'fs'
import { Server } from 'socket.io'
import errorHandler from './middleware/errorHandler.js'
import { userRouter } from './router/userRouter.js'
import { taskRouter } from './router/taskRouter.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const options = {
  key: fs.readFileSync('./certificates/key.pem'), // Ruta a tu clave privada
  cert: fs.readFileSync('./certificates/cert.pem')// Ruta a tu certificado SSL/TLS
}

const server = https.createServer(options, app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('cliente conectado')

  socket.on('message', (body) => {
    // emitir msj a todos
    socket.broadcast.emit('message', {
      body,
      from: socket.id
    })
  })
})

// router method
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})
