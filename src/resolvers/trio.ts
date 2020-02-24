import { pool } from '../pool'
import { getEmojisAroundAnchor } from '../db/getEmojisAroundAnchor'
import { QueryResolvers, EmojiType } from '../generated/graphql'

export const trio: QueryResolvers['trio'] = async (_, { anchor }) => {
  const client = await pool.connect()

  try {
    const rows = await getEmojisAroundAnchor(
      { anchor, type: EmojiType.Day },
      client
    )

    const [first, second, third] = rows

    switch (rows.length) {
      case 3:
        return {
          previous: third,
          current: second,
          next: first,
        }
      case 2:
        if (
          !anchor ||
          new Date(anchor).getDay() === new Date(first.created_at).getDay()
        ) {
          return {
            previous: second,
            current: first,
          }
        }
        return {
          current: second,
          next: first,
        }
      case 1:
        return {
          current: first,
        }
      default:
        return
    }
  } catch (err) {
    console.error(err)
  } finally {
    client.release()
  }
}
