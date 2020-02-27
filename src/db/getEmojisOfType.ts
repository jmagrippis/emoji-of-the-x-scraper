import { PoolClient } from 'pg'

import { EmojiType } from '../generated/graphql'

export const getEmojisOfType = async (
  { type }: { type: EmojiType },
  client: PoolClient
) => {
  const SQL = `SELECT id, character, name, created_at, TO_CHAR(created_at, 'YYYY/MM/DD') as anchor, $1 as type FROM ${type}_emojis
    ORDER BY created_at DESC`
  const { rows } = await client.query(SQL, [type])

  return rows
}
