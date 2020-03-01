import { gql } from 'apollo-server'

export const typeDefs = gql`
  enum EmojiType {
    day
    week
    month
  }

  type Emoji @cacheControl(maxAge: 2592000) {
    id: ID!
    character: String!
    name: String!
    created_at: String!
    anchor: String!
    type: EmojiType!
  }

  type Query {
    emoji(id: ID!, type: EmojiType!): Emoji
    emojis(anchor: String, type: EmojiType!): [Emoji!]!
      @cacheControl(maxAge: 3600)
    latestPicks: [Emoji!]! @cacheControl(maxAge: 3600)
    hashtags: [String!]! @cacheControl(maxAge: 3600)
  }
`
