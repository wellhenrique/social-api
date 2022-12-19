import { UseCase } from '@/shared/contracts'

import { CreateUserInput } from './dto'
import { CreateUserUseCase } from '.'

describe('CreateUserUseCase', () => {
  it('should be defined', () => {
    expect(new CreateUserUseCase()).toBeDefined()
  })

  it('should be a execute method', () => {
    const useCase = new CreateUserUseCase()

    expect(useCase.execute).toBeDefined()
  })

  it('should be a execute method with input', async () => {
    const useCase = new CreateUserUseCase()
    const input = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    }
    useCase.execute = jest.fn().mockReturnValue(Promise.resolve(true))

    await useCase.execute(input)

    expect(useCase.execute).toBeDefined()
    expect(useCase.execute).toHaveBeenCalledTimes(1)
    expect(useCase.execute).toHaveBeenCalledWith(input)
    expect(useCase.execute).toHaveReturnedWith(Promise.resolve(true))
  })
})
