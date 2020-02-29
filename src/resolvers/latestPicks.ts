import { pool } from '../pool'
import { QueryResolvers, EmojiType } from '../generated/graphql'
import { getLatestEmojiOfType } from '../db/getLatestEmojiOfType'

export const latestPicks: QueryResolvers['latestPicks'] = async () => {
  const client = await pool.connect()

  try {
    return Object.values(EmojiType).map(type =>
      getLatestEmojiOfType(type, client)
    )
  } catch (err) {
    console.error(err)
  } finally {
    client.release()
  }
}
