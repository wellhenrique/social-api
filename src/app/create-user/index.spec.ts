/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker'

import { MissingParamError } from '@/shared/errors'

import { CreateUserUseCase } from '.'
import { CreateUserInput } from './dto'
import { User } from '@/domain/user'

const input = {
  username: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

class GetUserByUsernameRepositoryStub {
  async perform(username: string): Promise<User> {
    return Promise.resolve(input)
  }
}

const makeSut = () => {
  const getUserByUsernameRepository = new GetUserByUsernameRepositoryStub()
  const useCase = new CreateUserUseCase(getUserByUsernameRepository)

  return {
    useCase,
    getUserByUsernameRepository,
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
  })

  it("should return MissingParamError if no 'username' is provided", async () => {
    const { useCase } = makeSut()
    const { username, ...rest } = input

    const promise = useCase.execute(rest as CreateUserInput)

    await expect(promise).rejects.toThrow(new MissingParamError('username'))
  })

  it('should return Error if username already exists', async () => {
    const { useCase, getUserByUsernameRepository } = makeSut()
    jest
      .spyOn(getUserByUsernameRepository, 'perform')
      .mockReturnValueOnce(Promise.resolve(input))

    const promise = useCase.execute(input)

    await expect(promise).rejects.toThrow(new Error('User already exists'))
  })

  it("should return MissingParamError if no 'email' is provided", async () => {
    const { useCase } = makeSut()
    const { email, ...rest } = input

    const promise = useCase.execute(rest as CreateUserInput)

    await expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  it("should return MissingParamError if no 'password' is provided", async () => {
    const { useCase } = makeSut()
    const { password, ...rest } = input

    const promise = useCase.execute(rest as CreateUserInput)

    await expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
