import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import favoriteCharactersQuery from './queries/favoriteCharacters.query.gql';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache();

const typeDefs = gql`
  input CharacterInput {
    id: ID!
    name: String
    image: String
    location: Location
  }

  extend type Query {
    favoriteCharacters: [Character]!
  }

  type Mutation {
    addToFavorites(character: CharacterInput!): [Character!]!
    removeFromFavorites(id: ID!): Boolean
  }
`;

const resolvers = {
  Mutation: {
    addToFavorites(_, { character }, { cache }) {
      const data = cache.readQuery({ query: favoriteCharactersQuery });
      data.favoriteCharacters.push(character);
      cache.writeQuery({ query: favoriteCharactersQuery, data });
    },
    removeFromFavorites(_, { id }, { cache }) {
      const data = cache.readQuery({ query: favoriteCharactersQuery });
      data.favoriteCharacters = data.favoriteCharacters.filter(
        (character) => character.id !== id
      );
      cache.writeQuery({ query: favoriteCharactersQuery, data });
    },
  },
};

cache.writeData({ data: { favoriteCharacters: [] } });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs,
});
