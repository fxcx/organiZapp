import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './routers/userRouter.js'
dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()
// conexión a diferentes dominios o host
app.use(cors())
app.use(express.json())

// router method
app.use('/api', userRouter())

app.listen(PORT, () => {
  console.log(`el server se levanto ${PORT}`)
})
