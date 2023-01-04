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
  routeName: 'User',
  routeDescription: 'Cria um novo usuário',
  routePath: '/users',
  routeMethod: 'POST',
  routeResponse: propertiesOf<CreateUserOutput>(),
}
generateDocumentation(routerProperties)

const userProperties = propertiesOf<CreateUserInput>()
const createUserProperties = {
  routerProperties: userProperties,
  routeName: 'User',
  routeDescription: 'Cria um novo usuário',
  routePath: '/users',
  routeMethod: 'POST',
  routeResponse: propertiesOf<CreateUserOutput>(),
}
generateDocumentation(createUserProperties)
