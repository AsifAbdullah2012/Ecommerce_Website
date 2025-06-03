import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
