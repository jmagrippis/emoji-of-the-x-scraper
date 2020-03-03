import { PoolClient } from 'pg'

export const getEmojisList = async (client: PoolClient) => {
  const SQL = `SELECT id, character, name FROM emojis_list`
  const { rows } = await client.query(SQL)

  return rows
}
