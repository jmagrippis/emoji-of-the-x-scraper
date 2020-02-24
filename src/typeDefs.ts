import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Emoji @cacheControl(maxAge: 2628000) {
    id: ID!
    character: String!
    name: String!
    created_at: String!
  }

  type Trio @cacheControl(maxAge: 3600) {
    current: Emoji!
    previous: Emoji
    next: Emoji
  }

  type Query {
    trio(anchor: String, type: String): Trio!
  }
`
