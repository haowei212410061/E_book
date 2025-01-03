import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.jsx";

const client = new ApolloClient({
  uri: "http://localhost:4200/graphql", // Update this with your GraphQL server URL
  cache: new InMemoryCache(),
});
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App client={client}/>
  </React.StrictMode>
);
