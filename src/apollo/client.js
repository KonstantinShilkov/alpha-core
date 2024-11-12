import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://80.90.190.26:8081/graphql",
  cache: new InMemoryCache(),
});

export default client;
