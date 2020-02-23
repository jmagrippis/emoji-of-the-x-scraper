import express from 'express'

import { dayHandler } from './routes/day'

const app = express().get('/day', dayHandler)

const PORT = process.env.PORT || 3400
console.log('will listen on port', PORT)
app.listen()
