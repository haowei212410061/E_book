import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import AdminMainPage from "./pages/AdminMainPage.jsx";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4200/graphql", // Update this with your GraphQL server URL
  cache: new InMemoryCache(),
});
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<AdminMainPage />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000}/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
