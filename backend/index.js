import express from 'express'
import http from 'http'
// import fs from 'fs'
import { Server } from 'socket.io'
import errorHandler from './middleware/errorHandler.js'
import { userRouter } from './router/userRouter.js'
import { taskRouter } from './router/taskRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000

// const options = {
//   key: fs.readFileSync('./certificates/key.pem'), // Ruta a tu clave privada
//   cert: fs.readFileSync('./certificates/cert.pem')// Ruta a tu certificado SSL/TLS
// }
const corsOptions = {
  origin: 'http://localhost:3000', // Permitir solicitudes desde tu aplicación Next.js
  methods: ['GET', 'POS'], // Métodos HTTP permitidos
  credentials: true
}

app.use(cors(corsOptions))

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('cliente conectado', socket.id)

  socket.on('message', (body) => {
    // emitir msj a todos
    socket.broadcast.emit('message', {
      body,
      from: socket.id
    })
  })
})

// router
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})
