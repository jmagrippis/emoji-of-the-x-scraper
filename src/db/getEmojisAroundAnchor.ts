import { PoolClient } from 'pg'

import { getStartAndEnd } from './getStartAndEnd'
import { EmojiType } from '../constants'

const SQL = `SELECT character, name FROM emojis
WHERE emojis.type = $1
AND emojis.created_at BETWEEN $2 AND $3
ORDER BY emojis.created_at DESC LIMIT 3`

export const getEmojisAroundAnchor = async (
  { anchor, type }: { anchor: string; type: EmojiType },
  client: PoolClient
) => {
  const { start, end } = await getStartAndEnd(anchor, client)

  const { rows } = await client.query(SQL, [type, start, end])

  return rows
}