import express from 'express'
// import { readFileSync } from 'fs'
// import https from 'https'
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

// const server = https.createServer(app, {
//   key: readFileSync('./certificates/key.pem', 'utf-8'),
//   cert: readFileSync('./certificates/cert.pem', 'utf-8')
// })

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const users = {}

io.on('connection', client => {
  client.on('username', username => {
    const user = {
      name: username,
      id: client.id
    }
    users[client.id] = user
    io.emit('connected', user)
    io.emit('users', Object.values(users))
  })

  client.on('send', message => {
    io.emit('message', {
      text: message,
      date: new Date().toISOString(),
      user: users[client.id]
    })
  })

  client.on('disconnect', () => {
    const username = users[client.id]
    delete users[client.id]
    io.emit('disconnected', client.id)
  })
})
// router
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})
