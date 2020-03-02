import { PoolClient } from 'pg'

import { Emoji } from '../generated/graphql'

export const backupEmoji = (
  { character, name }: Pick<Emoji, 'character' | 'name'>,
  client: PoolClient
) =>
  client.query(`INSERT INTO emojis_list(character, name) VALUES($1, $2)`, [
    character,
    name,
  ])
