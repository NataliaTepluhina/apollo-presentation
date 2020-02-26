<template>
  <b-row class="py-3">
    <h1 v-if="!favoriteCharacters.length">
      You don't have favorite characters
    </h1>
    <template v-else>
      <b-col
        cols="3"
        v-for="character in favoriteCharacters"
        :key="character.id"
      >
        <b-card
          :title="character.name"
          :img-src="character.image"
          :img-alt="character.name"
          img-top
          class="mb-2"
        >
          <b-card-text>
            {{ character.location.name }}
          </b-card-text>
          <b-button
            variant="info"
            @click="removeFromFavorites({ id: character.id })"
            >Remove from favorites</b-button
          >
        </b-card>
      </b-col>
    </template>
  </b-row>
</template>

<script>
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import favoriteCharactersQuery from '../graphql/queries/favoriteCharacters.query.gql';
import removeFromFavoritesMutation from '../graphql/queries/removeFromFavorites.mutation.gql';
export default {
  setup() {
    const { result: favoritesResult } = useQuery(favoriteCharactersQuery);
    const favoriteCharacters = useResult(favoritesResult);

    const { mutate: removeFromFavorites } = useMutation(
      removeFromFavoritesMutation
    );

    return { favoriteCharacters, removeFromFavorites };
  }
};
</script>

<style>
.colored {
  background-color: #c5f8f8;
}
</style>
