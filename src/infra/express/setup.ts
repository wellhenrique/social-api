import { userRouter } from './routers/user.routes'
import express from 'express'

const app = express()

app.use(express.json())

app.use('/users', userRouter)

export { app }
