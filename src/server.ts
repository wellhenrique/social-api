import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
})

import { app } from '@/infra/express/setup'
import { setupMongoose } from '@/infra/mongo/setup'

setupMongoose(process.env.DATABASE_URL)
  .then(() => {
    app.listen(3333, () => console.log('API running on http://localhost:3333'))
  })
  .catch((err) => console.log('Error connect database: ', err))
