import { reportErrorToSentry } from '@/infra/utils/sentry'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/', (request, response) => {
  // reportErrorToSentry({
  //   user: {
  //     email: 'email',
  //     company: 'company',
  //     username: 'username',
  //     id: 'id',
  //   },
  //   mode: 'api',
  //   error: {
  //     originalErrorMessage: 'originalErrorMessage',
  //     message: 'message',
  //     statusCode: 500,
  //   },
  // })
  throw new Error('My Sentry error!')
  // return response.json({ message: 'Hello World' })
})

export { userRouter }
