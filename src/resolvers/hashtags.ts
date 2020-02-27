import { pool } from '../pool'
import { QueryResolvers, EmojiType } from '../generated/graphql'
import { getLatestEmojiOfType } from '../db/getLatestEmojiOfType'

export const hashtags: QueryResolvers['hashtags'] = async () => {
  const client = await pool.connect()

  try {
    let queries = []
    for (const type of Object.values(EmojiType)) {
      queries.push(
        getLatestEmojiOfType(type, client).then(
          ({ character }) => `#emoji_ot${type[0]}_${character}`
        )
      )
    }
    return queries
  } catch (err) {
    console.error(err)
  } finally {
    client.release()
  }
}
