import express from 'express'
import cors from 'cors'

import { dayHandler } from './routes/day'
import { triosRouter } from './routes/trios/router'

const app = express()
  .use(cors())
  .get('/day', dayHandler)
  .use('/trios', triosRouter)

const PORT = process.env.PORT || 3400

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
