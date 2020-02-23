import { Response } from 'express'

import { EmojiType } from '../../constants'
import { pool } from '../../pool'

export const dayHandler = async (_, res: Response) => {
  const client = await pool.connect()

  try {
    const { rows } = await client.query(
      `SELECT character, name FROM emojis
      WHERE emojis.type = '${EmojiType.day}'
      AND emojis.created_at BETWEEN date_trunc('day', now()) - interval '1 day' AND date_trunc('day', now()) + interval '2 days' - interval '1 second'
      ORDER BY emojis.created_at DESC LIMIT 3`
    )
    const [first, second, third] = rows
    switch (rows.length) {
      case 3:
        res.json({
          previous: third,
          current: second,
          next: first,
        })
        return
      case 2:
        if (new Date().getDay() === new Date(first).getDay()) {
          res.json({
            previous: second,
            current: first,
          })
          return
        }
        res.json({
          current: second,
          next: first,
        })
        return
      case 1:
        res.json({
          current: first,
        })
        return
      default:
        res.status(400)
        res.end('no emoji found for the requested date')
        return
    }
  } catch (err) {
    console.error(err)
    res.status(500)
    res.end('Error ' + err)
  } finally {
    client.release()
  }
}
