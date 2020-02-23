import { Response, Request } from 'express'

import { EmojiType } from '../../constants'
import { pool } from '../../pool'
import { getEmojisAroundAnchor } from '../../db/getEmojisAroundAnchor'

export const dayHandler = async (
  { query: { anchor } }: Request,
  res: Response
) => {
  const client = await pool.connect()

  try {
    const rows = await getEmojisAroundAnchor(
      { anchor, type: EmojiType.day },
      client
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
