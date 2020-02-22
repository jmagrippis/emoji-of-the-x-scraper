import fetch from 'node-fetch'

import { parseEmojis } from './parseEmojis'

const EMOJI_LIST_URL = 'https://unicode.org/emoji/charts/full-emoji-list.html'

export const fetchEmojis = () =>
  fetch(EMOJI_LIST_URL).then(res => res.text().then(html => parseEmojis(html)))
