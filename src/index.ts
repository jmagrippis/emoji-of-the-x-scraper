import express from 'express'

import { EmojiType } from './constants'
import { pool } from './pool'
import { countEmojiOfTheX } from './db/countEmojiOfTheX'
import { dayHandler } from './routes/day'

const app = express()
  .get('/day', dayHandler)
  .get('/counts', async (_, res) => {
    const client = await pool.connect()

    try {
      const emojiOfTheDayCount = await countEmojiOfTheX(EmojiType.day, client)
      const emojiOfTheWeekCount = await countEmojiOfTheX(EmojiType.week, client)
      const emojiOfTheMonthCount = await countEmojiOfTheX(
        EmojiType.month,
        client
      )

      res.json({
        emojiOfTheDayCount,
        emojiOfTheWeekCount,
        emojiOfTheMonthCount,
      })
    } catch (err) {
      console.error(err)

      res.status(500)
      res.end('Error ' + err)
    } finally {
      client.release()
    }
  })

app.listen(process.env.PORT || 3400)
