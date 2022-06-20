import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  uri: 'http://localhost:9001/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
  headers: {
    authorization: localStorage.getItem('accessToken'),
  },
});
