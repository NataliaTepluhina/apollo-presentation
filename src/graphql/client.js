import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import axios from 'axios';
import gql from 'graphql-tag';
import favoriteCharactersQuery from './queries/favoriteCharacters.query.gql';
import mock from './mock';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache();
cache.writeData({
  data: {
    favoriteCharacters: [
      {
        __typename: 'Character',
        id: '15',
        name: 'Alien Rick',
        image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
        location: {
          __typename: 'Location',
          name: 'Citadel of Ricks',
        },
      },
    ],
  },
});

const resolvers = {
  Query: {
    characters() {
      return mock;
    },
  },
  Mutation: {
    addToFavorites(_, { character }, { cache }) {
      const data = cache.readQuery({ query: favoriteCharactersQuery });
      data.favoriteCharacters.push(character);
      cache.writeQuery({ query: favoriteCharactersQuery, data });
    },
    removeFromFavorites(_, { id }, { cache }) {
      const data = cache.readQuery({ query: favoriteCharactersQuery });
      data.favoriteCharacters = data.favoriteCharacters.filter(
        (char) => char.id !== id
      );
      cache.writeQuery({ query: favoriteCharactersQuery, data });
    },
  },
};

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
});
