import mongoose, { ConnectOptions } from 'mongoose'
import { MissingParamError } from '@/shared/errors'

export const setupMongoose = async (mongoURL: string) => {
  const mongoOptions: ConnectOptions = { dbName: 'customers' }
  if (process.env.NODE_ENV === 'production') mongoOptions.authSource = 'admin'

  if (mongoURL) {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURL, mongoOptions)
    }
  } else {
    throw new MissingParamError('mongoURL')
  }
}
