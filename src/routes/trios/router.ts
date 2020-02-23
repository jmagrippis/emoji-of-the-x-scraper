import { Router } from 'express'

import { dayHandler } from './day'

export const triosRouter = Router().get('/day', dayHandler)
