import mongoose, { ConnectOptions } from 'mongoose'
import { MissingParamError } from '@/shared/errors'

export const setupMongoose = async (mongoURL: string) => {
  const mongoOptions: ConnectOptions = { dbName: 'social' }

  if (mongoURL) {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURL, mongoOptions)
    }
  } else {
    throw new MissingParamError('mongoURL')
  }
}

