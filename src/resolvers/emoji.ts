import { pool } from '../pool'
import { QueryResolvers } from '../generated/graphql'
import { getEmoji } from '../db/getEmoji'

export const emoji: QueryResolvers['emoji'] = async (_, { id, type }) => {
  const client = await pool.connect()

  try {
    return getEmoji({ id, type }, client)
  } catch (err) {
    console.error(err)
  } finally {
    client.release()
  }
}
