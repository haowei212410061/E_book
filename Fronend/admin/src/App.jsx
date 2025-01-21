import React from "react";
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookManagement from "./pages/BookManagement.jsx";
import BorrowRecordManagement from "./pages/BorrowRecordManagement.jsx";
import Login from "./pages/Login.jsx";
import AdminUserManagement from "./pages/AdminUserManagement.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import BookReport from "./pages/BookReport.jsx";
import BorrowRecordReport from "./pages/BorrowRecordReport.jsx";
function App({ client }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<BookManagement />} />
          <Route path="/borrow" element={<BorrowRecordManagement />} />
          <Route path="/admin" element={<AdminUserManagement />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/bookReport" element={<BookReport />} />
          <Route path="/borrowReport" element={<BorrowRecordReport />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={1000} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
