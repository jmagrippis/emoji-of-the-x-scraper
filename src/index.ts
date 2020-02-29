import { ApolloServer } from 'apollo-server'
import responseCachePlugin from 'apollo-server-plugin-response-cache'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [responseCachePlugin()],
  introspection: true,
})

server.listen(process.env.PORT || 3400).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
