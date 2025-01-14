import { gql } from "@apollo/client";

//admin
export const ADMIN_USER_LOGIN = gql`
  mutation adminUserLogin($email: String!, $password: String!) {
    AdminUserLogin(email: $email, password: $password) {
      status
      message
      data {
        adminid
        username
        password
        email
      }
      jwt
    }
  }
`;
export const CREATE_ADMIN_USER = gql`
  mutation createAdminUser(
    $adminid: String!
    $username: String!
    $password: String!
    $email: String!
  ) {
    createAdminUser(
      adminid: $adminid
      username: $username
      password: $password
      email: $email
    ) {
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

export const UPDATE_ADMIN_USER_PASSWORD = gql`
  mutation updateAdminUserPassword($adminid: String!, $newPassword: String!) {
    updateAdminUserPassword(adminid: $adminid, newPassword: $newPassword) {
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

export const UPDATE_ADMIN_USER_EMAIL = gql`
  mutation updateAdminUserEmail($adminid: String!, $newEmail: String!) {
    updateAdminUserEmail(adminid: $adminid, newEmail: $newEmail) {
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

export const DELETE_ADMIN_USER = gql`
  mutation deleteAdminUser($adminid: String!) {
    deleteAdminUser(adminid: $adminid) {
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

export const GET_SINGLE_BOOK_WITH_ADMIN = gql`
  mutation getSingleBookWithAdmin($column: String!, $info: String!) {
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

export const CREATE_BOOK = gql`
  mutation createBook(
    $bookid: String!
    $bookname: String!
    $bookauthor: String!
    $productiondate: String!
    $bookstatus: String!
    $borrowcount: Int!
    $bookcategory: String!
    $bookimage: String!
  ) {
    createBook(
      bookid: $bookid
      bookname: $bookname
      bookauthor: $bookauthor
      productiondate: $productiondate
      bookstatus: $bookstatus
      borrowcount: $borrowcount
      bookcategory: $bookcategory
      bookimage: $bookimage
    ) {
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

export const UPDATE_BOOK_STATUS = gql`
  mutation updateBookStatus($bookid: String!, $bookstatus: String!) {
    updateBookStatus(bookid: $bookid, bookstatus: $bookstatus) {
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

export const UPDATE_BORROW_COUNT = gql`
  mutation updateBookBorrowCount($bookid: String!, $borrowcount: Int!) {
    updateBookBorrowCount(bookid: $bookid, borrowcount: $borrowcount) {
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
export const UPDATE_BOOK_WITH_ADMIN = gql`
  mutation updateBookWithAdmin(
    $bookid: String!
    $bookname: String!
    $bookauthor: String!
    $productiondate: String!
    $bookstatus: String!
    $borrowcount: Int!
    $bookcategory: String!
    $bookimage: String!
  ) {
    updateBook(
      bookid: $bookid
      bookname: $bookname
      bookauthor: $bookauthor
      productiondate: $productiondate
      bookstatus: $bookstatus
      borrowcount: $borrowcount
      bookcategory: $bookcategory
      bookimage: $bookimage
    ) {
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


export const DELETE_BOOK = gql`
  mutation deleteBook($bookid: String!) {
    deleteBook(bookid: $bookid) {
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

//user web
export const CREATE_READING_HISTORY = gql`
  mutation createReadingHistory(
    $historyid: String!
    $bookid: String!
    $userid: String!
    $readdate: String!
  ) {
    createReadingHistory(
      historyid: $historyid
      bookid: $bookid
      userid: $userid
      readdate: $readdate
    ) {
      historyid
      userid
      bookid
      readdate
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $userid: String!
    $username: String!
    $password: String!
    $email: String!
    $wallet: Int!
  ) {
    createUser(
      userid: $userid
      username: $username
      password: $password
      email: $email
      wallet: $wallet
    ) {
      userid
      username
      password
      email
      wallet
    }
  }
`;

export const CREATE_USER_BORROW_RECORD = gql`
  mutation createUserBorrowRecord(
    $userid: String!
    $borrowid: String!
    $bookid: String!
    $borrowdate: String!
  ) {
    createUserBorrowRecord(
      userid: $userid
      borrowid: $borrowid
      bookid: $bookid
      borrowdate: $borrowdate
    ) {
      borrowid
      userid
      bookid
      borrowdate
    }
  }
`;

export const CREATE_USER_FAVORITE_BOOK = gql`
  mutation createUserFavoriteBook(
    $favoriteid: String!
    $userid: String!
    $bookid: String!
  ) {
    createUserFavoriteBook(
      favoriteid: $favoriteid
      userid: $userid
      bookid: $bookid
    ) {
      favoriteid
      userid
      bookid
    }
  }
`;

export const DELETE_READING_HISTORY = gql`
  mutation deleteReadingHistory($historyid: String!) {
    deleteReadingHistory(historyid: $historyid) {
      historyid
      userid
      bookid
      readdate
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userid: String!) {
    deleteUser(userid: $userid) {
      userid
      username
      password
      email
      wallet
    }
  }
`;
export const DELETE_USER_FAVORITE_BOOK = gql`
  mutation deleteUserFavoriteBook($favoriteid: String!) {
    deleteUserFavoriteBook(favoriteid: $favoriteid) {
      favoriteid
      userid
      bookid
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($userid: String!, $newPassword: String!) {
    updateUserPassword(userid: $userid, newPassword: $newPassword) {
      userid
      username
      password
      email
      wallet
    }
  }
`;

export const UPDATE_USER_WALLET = gql`
  mutation updateUserWallet($userid: String!, $wallet: Int!) {
    updateUserWallet(userid: $userid, wallet: $wallet) {
      userid
      username
      password
      email
      wallet
    }
  }
`;
