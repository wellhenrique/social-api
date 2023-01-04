import { UseCase } from '@/shared/contracts'
import { MissingParamError } from '@/shared/errors'
import { GetUserByUsernameRepository } from '../contracts'

import { CreateUserInput } from './dto'

export class CreateUserUseCase implements UseCase<CreateUserInput, true> {
  constructor(
    private readonly getUserByUsername: GetUserByUsernameRepository
  ) {}

  async execute(input: CreateUserInput): Promise<true> {
    this.validate(input)

    const usernameAlreadyExists = await this.getUserByUsername.perform(
      input.username
    )
    if (usernameAlreadyExists) throw new Error('User already exists')

    return Promise.resolve(true)
  }

  validate(input: CreateUserInput): void {
    const { username, email, password } = input
    if (!username) throw new MissingParamError('username')
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')
  }
}
