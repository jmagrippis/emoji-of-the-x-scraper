import { emoji } from './emoji'
import { emojis } from './emojis'
import { latestPicks } from './latestPicks'
import { hashtags } from './hashtags'
import { Resolvers } from '../generated/graphql'

export const resolvers: Resolvers = {
  Query: {
    emoji,
    emojis,
    latestPicks,
    hashtags,
  },
}
