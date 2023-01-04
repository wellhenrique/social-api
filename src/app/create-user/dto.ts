import { generateDocumentation } from '@/infra/utils/generateDocumentation'
import { propertiesOf } from 'ts-reflection'

export interface CreateUserInput {
  username: string
  email: string
  password: string
}

export interface CreateUserOutput {
  id: string
}

const properties = propertiesOf<CreateUserInput>()
const routerProperties = {
  routerProperties: properties,
  routeName: 'CreateUser',
  routeDescription: 'Create a new user',
  routePath: '/users',
  routeMethod: 'POST',
  routeResponse: propertiesOf<CreateUserOutput>(),
}
generateDocumentation(routerProperties)
