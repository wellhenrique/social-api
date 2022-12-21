import { app } from '@/infra/express/setup'

import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import { Context } from './dto'

let hub: Sentry.Hub | null = null

function initSentry({ user, mode }: any) {
  Sentry.init({
    dsn: 'https://8aa0fc66632f411d8ae44d8086c6e72c@o4504362918936576.ingest.sentry.io/4504368262479872',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  })

  Sentry.setTags({
    environment: 'development',
    username: user.username,
    email: user.email,
  })

  Sentry.setUser({
    email: user.email,
    company: user.company,
    username: user.username,
  })

  hub = new Sentry.Hub(Sentry.getCurrentHub().getClient())
}

function reportErrorToSentry(context: Context) {
  const { mode, screen, phoneModel, batteryPercentage, company, delivery } =
    context
  if (!hub) {
    initSentry({ user: context.user, mode: context.mode })
  }

  if (hub) {
    hub.configureScope((scope: any) => {
      if (mode === 'mobile') {
        if (screen) scope.setExtra('screen', screen)
        if (phoneModel) scope.setExtra('phoneModel', phoneModel)
        if (batteryPercentage) scope.setExtra('battery', batteryPercentage)
      }

      if (company) {
        scope.setExtra('company', {
          name: company.name,
          owner: company.owner,
          token: company,
        })
      }

      if (delivery) {
        scope.setExtra('delivery', {
          id: delivery.id,
          key: delivery.key,
        })
      }

      if (mode === 'coletor') {
        const { nfe, cte, lastSendFileDate } = context
        if (nfe) scope.setExtra('nfeKey', nfe.nfeInfo.key)
        if (cte) scope.setExtra('cteKey', cte.nfeInfo.key)
        if (lastSendFileDate)
          scope.setExtra('lastSendFileDate', lastSendFileDate)
      }

      scope.setExtra(
        'original error message',
        context.error.originalErrorMessage
      )
      scope.setExtra('error message', context.error.message)
      scope.setExtra('status-code', context.error.statusCode)
    })
    hub.captureException(context.error)
  }
}

export { reportErrorToSentry, initSentry, hub }
