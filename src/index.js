// react
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// bootstrap and other css
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// redux
import { Provider } from "react-redux";
import store from "./store";
// api
import { DOMAIN } from "./store/utils";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${DOMAIN}/graphql/`,
  }),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
