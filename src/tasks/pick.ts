import { sample } from 'lodash'

import { pool } from '../pool'
import { fetchEmojis } from '../fetchEmojis'
import { countEmojiOfTheX } from '../db/countEmojiOfTheX'
import { persistEmoji } from '../db/persistEmoji'
import { EmojiType } from '../generated/graphql'

fetchEmojis().then(async emojis => {
  const client = await pool.connect()

  try {
    const [
      emojiOfThisDayCount,
      emojiOfThisWeekCount,
      emojiOfThisMonthCount,
    ] = await Promise.all([
      countEmojiOfTheX(EmojiType.Day, client),
      countEmojiOfTheX(EmojiType.Week, client),
      countEmojiOfTheX(EmojiType.Month, client),
    ])

    if (!emojiOfThisDayCount) {
      const emoji = { ...sample(emojis), type: EmojiType.Day }
      await persistEmoji(emoji, client)
      console.log(`pick of the day: ${emoji.character}`)
    }
    if (!emojiOfThisWeekCount) {
      const emoji = { ...sample(emojis), type: EmojiType.Week }
      await persistEmoji(emoji, client)
      console.log(`pick of the week: ${emoji.character}`)
    }
    if (!emojiOfThisMonthCount) {
      const emoji = { ...sample(emojis), type: EmojiType.Month }
      await persistEmoji(emoji, client)
      console.log(`pick of the month: ${emoji.character}`)
    }
  } catch (err) {
    console.error(err.stack)
  } finally {
    client.release()
  }

  console.log('task completed')
})
