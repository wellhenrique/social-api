import { CreateUserInput, CreateUserOutput } from '@/app/create-user/dto'
import { Response, Router } from 'express'

const userRouter = Router()

userRouter.post('/', (request, response: Response<CreateUserOutput>) => {
  const user: CreateUserInput = request.body
  return response.status(201).json({ id: 'User Id' })
})

export { userRouter }
