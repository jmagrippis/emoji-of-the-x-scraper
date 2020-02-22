import fetch from 'node-fetch'
import { sample } from 'lodash'
import { parseEmojis } from './parseEmojis'

const EMOJI_LIST_URL = 'https://unicode.org/emoji/charts/full-emoji-list.html'

fetch(EMOJI_LIST_URL).then(res =>
  res.text().then(html => {
    const emojis = parseEmojis(html)

    console.log(emojis.length)
    console.log(sample(emojis))
  })
)
