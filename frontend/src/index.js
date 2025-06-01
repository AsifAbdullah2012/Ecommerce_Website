import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot directly
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
