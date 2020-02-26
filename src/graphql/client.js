import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import axios from 'axios';
import favoriteCharactersQuery from './queries/favoriteCharacters.query.gql';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api/';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql'
});

const cache = new InMemoryCache();

const resolvers = {
  Query: {
    characters() {
      return axios.get('/character').then(res => ({
        results: res.data.results.map(char => ({
          __typename: 'Character',
          id: char.id,
          name: char.name,
          location: char.location,
          image: char.image
        }))
      }));
    }
  },
  Mutation: {
    addToFavorites(_, { character }, { cache }) {
      const data = cache.readQuery({ query: favoriteCharactersQuery });
      data.favoriteCharacters = [...data.favoriteCharacters, character];
      cache.writeQuery({ query: favoriteCharactersQuery, data });
    },
    removeFromFavorites(_, { id }, { cache }) {
      const data = cache.readQuery({ query: favoriteCharactersQuery });
      data.favoriteCharacters = data.favoriteCharacters.filter(
        character => character.id !== id
      );
      cache.writeQuery({ query: favoriteCharactersQuery, data });
    }
  }
};

cache.writeData({ data: { favoriteCharacters: [] } });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers
});
