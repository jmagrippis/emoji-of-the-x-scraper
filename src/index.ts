import express from 'express'

import { dayHandler } from './routes/day'
import { triosRouter } from './routes/trios/router'

const app = express()
  .get('/day', dayHandler)
  .use('/trios', triosRouter)

const PORT = process.env.PORT || 3400

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
