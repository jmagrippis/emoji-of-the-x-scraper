import { PoolClient } from 'pg'
import { Emoji } from '../generated/graphql'

export const persistEmoji = (
  { character, name, type }: Pick<Emoji, 'character' | 'name' | 'type'>,
  client: PoolClient
) =>
  client.query(`INSERT INTO ${type}_emojis(character, name) VALUES($1, $2)`, [
    character,
    name,
  ])
