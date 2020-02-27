import { PoolClient } from 'pg'

import { EmojiType } from '../generated/graphql'

export const countEmojiOfTheX = async (
  x: EmojiType,
  client: PoolClient
): Promise<number> => {
  const {
    rows: [{ count }],
  } = await client.query(
    `SELECT count(*) FROM ${x}_emojis WHERE extract(${x} FROM created_at) = extract(${x} from now()) AND created_at > now() - interval '2 ${x}'`
  )

  return parseInt(count)
}
