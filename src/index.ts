import express from 'express'

import { EmojiType } from './constants'
import { pool } from './pool'

const app = express().get('/day', async (_, res) => {
  const client = await pool.connect()

  try {
    const { rows: [emoji] = [] } = await client.query(
      `SELECT character, name FROM emojis WHERE emojis.type = '${EmojiType.day}' ORDER BY created_at DESC LIMIT 1`
    )

    res.json(emoji)
  } catch (err) {
    console.error(err)

    res.status(500)
    res.end('Error ' + err)
  } finally {
    client.release()
  }
})

app.listen(process.env.PORT || 3400)
