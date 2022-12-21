import express, { RequestHandler } from 'express'
import { initSentry } from '../utils/sentry'
import { userRouter } from './routers/user.routes'
import * as Sentry from '@sentry/node'

const app = express()

app.use(express.json() as RequestHandler)

initSentry({
  user: {
    email: 'pedrosilva@gmail.com',
    company: 'company silva',
    username: 'pedro silva',
    id: 'id',
  },
  mode: 'api',
})
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use('/users', userRouter)

app.use(Sentry.Handlers.errorHandler())
export { app }
