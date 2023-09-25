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

// Salas y sus usuarios
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  // Evento 'create-room': crea una sala
  socket.on('create-room', (roomName) => {
    socket.join(roomName) // El usuario se une a la sala
    io.emit('room-list-add', `Se agregó una nueva sala: ${roomName}`)// Emitir mensaje a todos los usuarios conectados
    socket.emit('room-created', `Sala "${roomName}" creada con éxito.`)
  })

  // Evento 'send-message': cliente envía un mensaje en una sala específica
  socket.on('send-message', ({ room, message }) => {
    io.to(room).emit('message', message)
  })

  // Evento 'leave-room': cliente sale de una sala
  socket.on('leave-room', (roomName) => {
    socket.leave(roomName) // El usuario sale de la sala
    socket.emit('left-room', `Saliste de la sala: ${roomName}`)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    socket.disconnect() // Desconectar al usuario
  })
})

// router
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})

// // Salas y sus usuarios
// const rooms = []

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`)

//   // Evento 'create-room': crea una sala
//   socket.on('create-room', (roomName) => {
//       rooms.set(roomName, usersInRoom) // Asociamos el nombre de la sala con el Set de usuarios
//       socket.join(roomName) // El usuario se une a la sala
//       io.emit('room-list-add', `Se agregó una nueva sala: ${roomName}`) // Emitir mensaje a todos los usuarios conectados
//     }
//     socket.emit( 'error', message)
//   })

//   // Evento 'send-message': cliente envía un mensaje en una sala específica
//   socket.on('send-message', ({ room, message }) => {
//     const roomUsers = rooms.get(room)
//     if (!roomUsers) {
//       return socket.emit('error', `No estás en la sala "${room}".`)
//     }
//     io.to(room).emit('message', message)
//   })

//   // Evento 'leave-room': cliente sale de una sala
//   socket.on('leave-room', (roomName) => {
//     socket.leave(roomName) // El usuario sale de la sala
//     socket.emit('left-room', `Saliste de la sala: ${roomName}`)
//   })

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`)
//     socket.disconnect() // Desconectar al usuario
//   })
// })
