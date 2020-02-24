import { PoolClient } from 'pg'

import { EmojiType } from '../generated/graphql'

export const countEmojiOfTheX = async (
  x: EmojiType,
  client: PoolClient
): Promise<number> => {
  const {
    rows: [{ count }],
  } = await client.query(
    `SELECT count(*) from emojis WHERE type='${x}' AND extract(${x} FROM emojis.created_at) = extract(${x} from now()) AND emojis.created_at > now() - interval '2 ${x}'`
  )

  return parseInt(count)
}
