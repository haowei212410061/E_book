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

export const GET_BOOK_WITH_USERWEB = gql`
  query getBookWithUserWeb($bookname: String!) {
    books(bookname: $bookname) {
      status
      message
      data {
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
  }
`;

export const GET_USER_BORROW_RECORDS = gql`
  query getUserBorrowRecords($userid: String!) {
    UserBorrowRecords(userid: $userid) {
      status
      message
      data {
        userid
        borrowid
        bookid
        borrowdate
      }
    }
  }
`;

export const GET_USER_READING_HISTORYS = gql`
  query getUserReadingHistory($userid: String!) {
    ReadingHistory(userid: $userid) {
      status
      message
      data {
        historyid
        bookid
        userid
        readdate
      }
    }
  }
`;

export const GET_USER_FAVORITE_BOOK = gql`
  query getUserFavoriteBook($userid: String!) {
    FavoriteBooks(userid: $userid) {
      status
      message
      data {
        favoriteid
        userid
        bookid
      }
    }
  }
`;
