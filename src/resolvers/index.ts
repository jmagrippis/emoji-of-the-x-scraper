import { emoji } from './emoji'
import { emojis } from './emojis'
import { trio } from './trio'
import { hashtags } from './hashtags'
import { Resolvers } from '../generated/graphql'

export const resolvers: Resolvers = {
  Query: {
    emoji,
    emojis,
    trio,
    hashtags,
  },
}
