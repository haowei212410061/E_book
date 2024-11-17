const {CLOUD_POSTGRES} = require("./postgres_setting")
const express = require('express');
const {ApolloServer} = require('apollo-server');


function ConnectDatabase(){
  CLOUD_POSTGRES.connect().then(()=>{
    console.log("connect to cloud postgreSQL")
  }).catch(error=>{
    console.log("error:",error)
    console.log("fail to connect to cloud postgreSQL")
  })
}

ConnectDatabase();

async function startServer() {
  const server = new ApolloServer({
    typeDefs: [userTypeDef],
    resolvers: resolvers,
    context: ({ req }) => ({ CLOUD_POSTGRES }),
  })

  await server.start()
  const app = express()

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () => {
    console.log(`erver ready at http://localhost:4000${server.graphqlPath}`)
  })
}
startServer();