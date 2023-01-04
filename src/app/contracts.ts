import { Repository } from '@/shared/contracts'
import { User } from '@/domain/user'

export type GetUserByUsernameRepository = Repository<
  string,
  Promise<User | null>
>
