import express from 'express'

import { pool } from './pool'

const app = express().get('/day', async (_, res) => {
  const client = await pool.connect()

  try {
    const { rows: [emoji] = [] } = await client.query(
      `SELECT character, name, type FROM emojis WHERE type = 'day' LIMIT 1`
    )

    res.end(JSON.stringify(emoji))
  } catch (err) {
    console.error(err)

    res.status(500)
    res.end('Error ' + err)
  } finally {
    client.release()
  }
})

app.listen(process.env.PORT || 3400)
