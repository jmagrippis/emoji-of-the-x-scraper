import fetch from 'node-fetch'
import { sample } from 'lodash'

import { parseEmojis } from '../parseEmojis'
import { pool } from '../pool'
import { EmojiType } from '../constants'

const EMOJI_LIST_URL = 'https://unicode.org/emoji/charts/full-emoji-list.html'

const sql =
  'INSERT INTO emojis(character, name, type) VALUES($1, $2, $3) RETURNING *'
fetch(EMOJI_LIST_URL).then(res =>
  res.text().then(async html => {
    const emojis = parseEmojis(html)
    const { character, name } = sample(emojis)
    console.log(`picked emoji of the ${EmojiType.day}: ${character}`)

    try {
      await pool.query(sql, [character, name, EmojiType.day])
      console.log(`persisted pick: ${character}`)
    } catch (err) {
      console.error(err.stack)
    }
  })
)
