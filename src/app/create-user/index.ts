import { UseCase } from '@/shared/contracts'
import { CreateUserInput } from './dto'

export class CreateUserUseCase implements UseCase<CreateUserInput, true> {
  async execute(input: CreateUserInput): Promise<true> {
    return Promise.resolve(true)
  }
}
