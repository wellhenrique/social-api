import { UseCase } from '@/shared/contracts'
import { MissingParamError } from '@/shared/errors'

import { CreateUserInput } from './dto'

export class CreateUserUseCase implements UseCase<CreateUserInput, true> {
  async execute(input: CreateUserInput): Promise<true> {
    this.validate(input)

    return Promise.resolve(true)
  }

  validate(input: CreateUserInput): void {
    const { name, email, password } = input
    if (!name) throw new MissingParamError('name')
  }
}
