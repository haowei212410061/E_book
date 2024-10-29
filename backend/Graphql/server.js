const db = require('./postgres_setting')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')

async function startServer() {
  const server = new ApolloServer({
    typeDefs: [userTypeDef],
    resolvers: resolvers,
    context: ({ req }) => ({ db }),
  })

  await server.start()
  const app = express()

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () => {
    console.log(`erver ready at http://localhost:4000${server.graphqlPath}`)
  })
}
