import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler.js'
import { userRouter } from './router/userRouter.js'
import { taskRouter } from './router/taskRouter.js'
dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()
// conexión a diferentes dominios o host
app.use(cors())
app.use(express.json())

// router method
app.use('/api', userRouter(), taskRouter())
// manejo de errores
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})


//puerto