import { gql } from "@apollo/client";

//admin query
export const GET_ALL_ADMIN_USER = gql`
  query getAllAdminUser {
    AdminUsers {
      adminid
      username
      password
      email
    }
  }
`;
export const GET_SINGLE_ADMIN_USER = gql`
  query getSingleAdminUser($email: String!, $password: String!) {
    SingleAdminUser(email: $email, password: $password) {
      adminid
      username
      password
      email
    }
  }
`;

export const GET_ALL_BOOK = gql`
  query getAllBook {
    Books {
      bookid
      bookname
      bookauthor
      productiondate
      bookstatus
      borrowcount
      bookcategory
      bookimage
    }
  }
`;

export const GET_SINGLE_BOOK = gql`
  query getSingleBook($column: String!, $info: String!) {
    SingleBook(column: $column, info: $info) {
      bookid
      bookname
      bookauthor
      productiondate
      bookstatus
      borrowcount
      bookcategory
      bookimage
    }
  }
`;

export const GET_ALL_BORROW_RECORD = gql`
  query getAllBorrowRecord {
    BorrowRecords {
      borrowid
      userid
      bookid
      borrowdate
    }
  }
`;

export const GET_SINGLE_BORROW_RECORD = gql`
         query getSingleBorrowRecord($userid:String!,bookid:String!){
                  SingleBorrowRecord(userid:$userid,bookid:$bookid){
                           borrowid
                           userid
                           bookid
                           borrowdate
                  }
         }

`;

export const GET_ALL_FAVORITE_BOOK = gql`
  query getAllFavoriteBook {
    FavoriteBooks {
      favoriteid
      userid
      bookid
    }
  }
`;

export const GET_ALL_READING_HISTORY = gql`
  query getAllReadingHistory {
    ReadingHistorys {
      historyid
      userid
      bookid
      readdate
    }
  }
`;

//userweb query
