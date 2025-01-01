import { useQuery, gql } from "@apollo/client";

//admin query


export const GET_ALL_USERS_WITH_ADMIN = gql`
  query getAllUsersWithAdmin{
    Users{
      userid
      username
      password
      email
      wallet
    }
  }
`
export const GET_SINGLE_USER_WITH_ADMIN = gql`
  query getSingleUserWithAdmin($email:String!){
    SingleUser(email:$email){
      userid
      username
      password
      email
      wallet
    }
  }


`

export const GET_ALL_ADMIN_USER = gql`
  query getAllAdminUser {
    AdminUsers {
      status
      message
      data {
        adminid
        username
        password
        email
      }
    }
  }
`;
export const GET_SINGLE_ADMIN_USER = gql`
  query getSingleAdminUser($email: String!) {
    SingleAdminUser(email: $email) {
      status
      message
      data {
        adminid
        username
        password
        email
      }
    }
  }
`;

export const GET_ALL_BOOK_WITH_ADMIN = gql`
  query getAllBookfWithAdmin {
    AdminBooks {
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

export const GET_SINGLE_BOOK_WITH_ADMIN = gql`
  query getSingleBookWithAdmin($column: String!, $info: String!) {
    SingleBook(column: $column, info: $info) {
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

export const GET_ALL_BORROW_RECORD_WITH_ADMIN = gql`
  query getAllBorrowRecordWithAdmin {
    BorrowRecords {
      status
      message
      data {
        borrowid
        userid
        bookid
        borrowdate
      }
    }
  }
`;

export const GET_SINGLE_BORROW_RECORDS_WITH_ADMIN = gql`
  query getSingleBorrowRecordsWithAdmin($userid: String!, $bookid: String!) {
    SingleBorrowRecord(userid: $userid, bookid: $bookid) {
      status
      message
      data {
        borrowid
        userid
        bookid
        borrowdate
      }
    }
  }
`;


//userweb query

export const USER_LOGIN = gql`
  query userLogin($email:String!,$password:String!){
    UserLogin(email:$email,password:$password){
      status
      message
      data{
        userid
        username
        email
        password
        wallet
      }
      jwt    
    }
  }
`;

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
