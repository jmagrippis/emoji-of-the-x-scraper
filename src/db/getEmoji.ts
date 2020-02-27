import { PoolClient } from 'pg'

import { EmojiType } from '../generated/graphql'

export const getEmoji = async (
  { type, id }: { type: EmojiType; id: string },
  client: PoolClient
) => {
  const SQL = `SELECT id, character, name, created_at, TO_CHAR(created_at, 'YYYY/MM/DD') as anchor, $1 as type
    FROM ${type}_emojis
    WHERE id = $2
    LIMIT 1`
  const {
    rows: [emoji],
  } = await client.query(SQL, [type, id])

  return emoji
}
