import { sample } from 'lodash'

import { pool } from '../pool'
import { EmojiType } from '../constants'
import { fetchEmojis } from '../fetchEmojis'

const INSERT_SQL =
  'INSERT INTO emojis(character, name, type) VALUES($1, $2, $3) RETURNING *'

const SELECT_COUNT_DAY_SQL = `SELECT count(*) from emojis WHERE type='${EmojiType.day}' AND extract(day FROM emojis.created_at) = extract(day from now())`
const SELECT_COUNT_WEEK_SQL = `SELECT count(*) from emojis WHERE type='${EmojiType.week}' AND extract(week FROM emojis.created_at) = extract(week from now())`
const SELECT_COUNT_MONTH_SQL = `SELECT count(*) from emojis WHERE type='${EmojiType.month}' AND extract(month FROM emojis.created_at) = extract(month from now())`

fetchEmojis().then(async emojis => {
  const client = await pool.connect()

  const { character, name } = sample(emojis)
  console.log(`picked emoji of the ${EmojiType.day}: ${character}`)

  try {
    await client.query(INSERT_SQL, [character, name, EmojiType.day])
    console.log(`persisted pick: ${character}`)

    const {
      rows: [emojiOfThisDayCount],
    } = await client.query(SELECT_COUNT_DAY_SQL)
    console.log('for this day we have already selected', emojiOfThisDayCount)

    const {
      rows: [emojiOfThisWeekCount],
    } = await client.query(SELECT_COUNT_WEEK_SQL)
    console.log('for this week we have already selected', emojiOfThisWeekCount)

    const {
      rows: [emojiOfThisMonthCount],
    } = await client.query(SELECT_COUNT_MONTH_SQL)
    console.log(
      'for this month we have already selected',
      emojiOfThisMonthCount
    )
  } catch (err) {
    console.error(err.stack)
  } finally {
    client.release()
  }
})
