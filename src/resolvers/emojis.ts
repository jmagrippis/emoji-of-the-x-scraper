import { pool } from '../pool'
import { QueryResolvers } from '../generated/graphql'
import { getEmojisOfType } from '../db/getEmojisOfType'

export const emojis: QueryResolvers['emojis'] = async (_, { type }) => {
  const client = await pool.connect()

  try {
    return getEmojisOfType({ type }, client)
  } catch (err) {
    console.error(err)
  } finally {
    client.release()
  }
}
