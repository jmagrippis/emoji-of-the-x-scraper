import { trio } from './trio'
import { Resolvers } from '../generated/graphql'

export const resolvers: Resolvers = {
  Query: {
    trio,
  },
}
