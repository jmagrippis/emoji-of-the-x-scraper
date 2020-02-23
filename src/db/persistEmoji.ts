import { PoolClient } from 'pg'

import { Emoji } from '../constants'

const SQL = 'INSERT INTO emojis(character, name, type) VALUES($1, $2, $3)'

export const persistEmoji = (
  { character, name, type }: Pick<Emoji, 'character' | 'name' | 'type'>,
  client: PoolClient
) => client.query(SQL, [character, name, type])
