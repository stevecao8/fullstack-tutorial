import {
    ApolloClient, ApolloProvider, NormalizedCacheObject
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { cache } from "./cache";
import Pages from "./pages";
import injectStyles from "./styles";

// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
});

injectStyles();

// Pass the ApolloClient instance to the ApolloProvider component
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);
