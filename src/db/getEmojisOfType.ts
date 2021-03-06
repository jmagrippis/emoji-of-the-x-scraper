import { PoolClient } from 'pg'

import { EmojiType } from '../generated/graphql'
import { typeToAnchor } from './typeToAnchor'

export const getEmojisOfType = async (type: EmojiType, client: PoolClient) => {
  const SQL = `SELECT id, character, name, created_at, ${typeToAnchor[type]} as anchor, $1 as type
    FROM ${type}_emojis
    ORDER BY created_at DESC`
  const { rows } = await client.query(SQL, [type])

  return rows
}
