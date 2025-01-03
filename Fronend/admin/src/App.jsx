import React from "react";
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMainPage from "./pages/AdminMainPage.jsx";
import Login from "./pages/Login.jsx";
function App({ client }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<AdminMainPage />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
