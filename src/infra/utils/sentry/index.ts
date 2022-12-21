import { app } from '@/infra/express/setup'

import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import { Context } from './dto'

let hub: Sentry.Hub | null = null

function initSentry({ user, mode }: any) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
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
