/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs'

interface IGenerateDocumentation {
  routerProperties: any
  routeName: string
  routeDescription: string
  routePath: string
  routeMethod: string
  routeResponse: any
}
export function generateDocumentation(props: IGenerateDocumentation) {
  const {
    routeDescription,
    routeMethod,
    routeName,
    routePath,
    routeResponse,
    routerProperties,
  } = props
  let documentation = `/**
  * @api {${routeMethod}} /${routePath} Create User
  * @apiGroup ${routeName}
  * @apiDescription ${routeDescription}
  `

  for (const property of routerProperties) {
    documentation += `\n* @apiBody {${property}} ${property} ${property}`
  }

  documentation += `\n* @apiSuccess {String} ${routeResponse[0]} User's id
  */`

  fs.appendFileSync('../../app/doc-type.js', `${documentation}\n`, {
    encoding: 'utf-8',
  })
}
