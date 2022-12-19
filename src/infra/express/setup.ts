import express, { RequestHandler } from 'express'

const app = express()

app.use(express.json() as RequestHandler)

export { app }
