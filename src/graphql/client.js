import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import favoriteCharactersQuery from './queries/favoriteCharacters.query.gql';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql'
});

const cache = new InMemoryCache();

const resolvers = {};

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers
});
