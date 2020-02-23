import { PoolClient } from 'pg'

import { EmojiType } from '../constants'

export const countEmojiOfTheX = async (
  x: EmojiType,
  client: PoolClient
): Promise<number> => {
  const {
    rows: [{ count }],
  } = await client.query(
    `SELECT count(*) from emojis WHERE type='${x}' AND extract(${x} FROM emojis.created_at) = extract(${x} from now())`
  )

  return parseInt(count)
}
