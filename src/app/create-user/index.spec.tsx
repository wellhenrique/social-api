import { UseCase } from '@/shared/contracts'
import { CreateUserInput } from './dto'

class CreateUserUseCase implements UseCase<CreateUserInput, void> {
  execute(input: CreateUserInput): Promise<void> {
    console.log(input)
    return Promise.resolve()
  }
}

describe('CreateUserUseCase', () => {
  it('should be defined', () => {
    expect(new CreateUserUseCase()).toBeDefined()
  })

  it('should be a execute method', () => {
    const useCase = new CreateUserUseCase()

    expect(useCase.execute).toBeDefined()
  })
})
