const { CLOUD_POSTGRES } = require("./postgres_setting")
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { merge } = require('lodash')
const { UserTypeDefs } = require("./schema/User/mergeTypeDefs");
const { AdminTypeDefs } = require("./schema/Admin/mergeTypeDefs");
const AdminMutationResolvers = require('./resolvers/Admin/AdminMutationResolvers')
const AdminQueryResolvers = require('./resolvers/Admin/AdminQueryResolvers')
const UserMutationResolvers = require('./resolvers/User/UserMutationResolvers');
const UserQueryResolvers = require('./resolvers/User/UserQueryResolvers');
const app = express()
const typeDefs = mergeTypeDefs([UserTypeDefs, AdminTypeDefs])
const resolvers = merge(
  AdminMutationResolvers,
  AdminQueryResolvers,
  UserMutationResolvers,
  UserQueryResolvers
)


function ConnectDatabase() {

  CLOUD_POSTGRES.connect().then(() => {
    console.log('Connection to postgreSQL successfully')
  }).catch((err) => {
    console.log('Connection to postgreSQL fail please check db', err)
  })

}
ConnectDatabase();

async function startServer() {

  const server = new ApolloServer({
    typeDefs: [typeDefs],
    resolvers: resolvers,
    context: () => ({
      db: CLOUD_POSTGRES
    }),
  })

  await server.start()


  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () => {
    console.log(`erver ready at http://localhost:4000${server.graphqlPath}`)
  })
}
startServer();