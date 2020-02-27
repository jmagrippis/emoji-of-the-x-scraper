import { PoolClient } from 'pg'

import { EmojiType } from '../generated/graphql'

const typeToAnchor = {
  [EmojiType.Day]: "TO_CHAR(created_at, 'YYYY/MM/DD')",
  [EmojiType.Week]: "TO_CHAR(created_at, 'YYYY/WW')",
  [EmojiType.Month]: "TO_CHAR(created_at, 'YYYY/MM')",
}

export const getEmojisOfType = async (
  { type }: { type: EmojiType },
  client: PoolClient
) => {
  const SQL = `SELECT id, character, name, created_at, ${typeToAnchor[type]} as anchor, $1 as type
    FROM ${type}_emojis
    ORDER BY created_at DESC`
  const { rows } = await client.query(SQL, [type])

  return rows
}
