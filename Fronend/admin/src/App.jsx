import React from "react";
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import AdminMainPage from "./pages/AdminMainPage.jsx";
import Login from "./pages/Login.jsx";
import Sheet from "./components/UI/Sheet.jsx";
function App({ client }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<AdminMainPage />} />
          <Route path="/form" element={<Sheet/>} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
