const { gql } = require("apollo-server-express");
const {
         User,
         Book,
         ReadingHistory,
         UserBorrowRecord,
         FavoriteBook,
} = require("./type");


const QueryTypeDefs = gql`
         ${ReadingHistory}
         ${FavoriteBook}

         type Query{
                  ReadingHistorys:[ReadingHistory]
                  FavoriteBooks:[FavoriteBook]
         }  
`

module.exports = { QueryTypeDefs }