import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import favoriteCharactersQuery from './queries/favoriteCharacters.query.gql';
import charactersMock from './mock';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql'
});

const cache = new InMemoryCache();

const resolvers = {
  Query: {
    characters() {
      return charactersMock;
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
