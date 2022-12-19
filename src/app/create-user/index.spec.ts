import { faker } from '@faker-js/faker'
import { CreateUserUseCase } from '.'

const input = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

const makeSut = () => {
  const useCase = new CreateUserUseCase()

  return {
    useCase,
  }
}

describe('CreateUserUseCase', () => {
  it('should be defined', () => {
    const { useCase } = makeSut()

    expect(useCase).toBeDefined()
  })

  it('should be a execute method', () => {
    const { useCase } = makeSut()

    expect(useCase.execute).toBeDefined()
  })

  it('should be a execute method with input', async () => {
    const { useCase } = makeSut()

    useCase.execute = jest.fn().mockReturnValue(Promise.resolve(true))

    await useCase.execute(input)

    expect(useCase.execute).toBeDefined()
    expect(useCase.execute).toHaveBeenCalledTimes(1)
    expect(useCase.execute).toHaveBeenCalledWith(input)
    expect(useCase.execute).toHaveReturnedWith(Promise.resolve(true))
  })
})
