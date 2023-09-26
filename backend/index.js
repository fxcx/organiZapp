import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { expressjwt as jwt } from 'express-jwt'
import errorHandler from './middleware/errorHandler.js'
import { userRouter } from './router/userRouter.js'
import { taskRouter } from './router/taskRouter.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use(jwt({
  secret: process.env.SECRET_KEY,
  algorithms: ['HS256']
}).unless({ path: ['/api/auth/login', 'api/auth/refresh'] })
)

app.use(cors())
const PORT = process.env.PORT || 4000

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  const username = `User${socket.id}`

  // Envía el nombre de usuario al cliente
  socket.emit('user-connected', username)

  // Evento 'create-room': crea una sala
  socket.on('create-room', (roomName) => {
    console.log(`Usuario ${username} creó la sala: ${roomName}`)
    // El usuario se une a la sala
    socket.join(roomName)

    io.emit('room-list-add', (roomName))
    socket.emit('room-created', `Sala "${roomName}" creada con éxito.`)
  })

  socket.on('leave-room', (roomName) => {
    // El usuario sale de la sala
    socket.leave(roomName)
    socket.emit('left-room', `Saliste de la sala: ${roomName}`)
  })

  // Escucha el evento 'send-message'
  socket.on('send-message', ({ message }) => {
    console.log(`Mensaje recibido en sala ${username}: ${message}`)
    io.local.emit('message', message
    )
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    socket.disconnect()
  })
})

// router
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})
