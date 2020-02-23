import { sample } from 'lodash'

import { pool } from '../pool'
import { EmojiType } from '../constants'
import { fetchEmojis } from '../fetchEmojis'
import { countEmojiOfTheX } from '../db/countEmojiOfTheX'
import { persistEmoji } from '../db/persistEmoji'

fetchEmojis().then(async emojis => {
  const client = await pool.connect()

  try {
    const [
      emojiOfThisDayCount,
      emojiOfThisWeekCount,
      emojiOfThisMonthCount,
    ] = await Promise.all([
      countEmojiOfTheX(EmojiType.day, client),
      countEmojiOfTheX(EmojiType.week, client),
      countEmojiOfTheX(EmojiType.month, client),
    ])

    if (!emojiOfThisDayCount) {
      const emoji = { ...sample(emojis), type: EmojiType.day }
      await persistEmoji(emoji, client)
      console.log(`pick of the day: ${emoji.character}`)
    }
    if (!emojiOfThisWeekCount) {
      const emoji = { ...sample(emojis), type: EmojiType.week }
      await persistEmoji(emoji, client)
      console.log(`pick of the week: ${emoji.character}`)
    }
    if (!emojiOfThisMonthCount) {
      const emoji = { ...sample(emojis), type: EmojiType.month }
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
