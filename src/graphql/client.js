import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import axios from 'axios';
import gql from 'graphql-tag';
import favoriteCharactersQuery from './queries/favoriteCharacters.query.gql';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache();

const resolvers = {};

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
});
