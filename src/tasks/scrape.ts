import { pool } from '../pool'
import { fetchEmojis } from '../fetchEmojis'
import { getEmojisList } from '../db/getEmojisList'
import { backupEmoji } from '../db/backupEmoji'

type EmojisMap = {
  [key: string]: boolean
}

console.log('fetching emojis...')

fetchEmojis().then(async emojis => {
  console.log(emojis.length, 'emojis fetched')

  const client = await pool.connect()

  try {
    const persistedEmojisMap = (await getEmojisList(client)).reduce<EmojisMap>(
      (acc, { character }) => {
        acc[character] = true
        return acc
      },
      {}
    )

    const newEmojis = emojis.filter(
      ({ character }) => !persistedEmojisMap[character]
    )

    if (!newEmojis.length) {
      console.log('no new emojis to backup')
      return
    }

    console.log(`there are ${newEmojis.length} new emojis`)

    await Promise.all(newEmojis.map(emoji => backupEmoji(emoji, client)))

    console.log(newEmojis.length, 'new emojis backed up')
  } catch (err) {
    console.error(err.stack)
  } finally {
    client.release()
  }

  console.log('task completed')
})
