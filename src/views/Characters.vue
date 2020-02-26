<template>
  <b-row class="py-3">
    <div v-if="loading" class="spinner w-100">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <template v-else>
      <b-col cols="3" v-for="character in characters" :key="character.id">
        <b-card
          :title="character.name"
          :img-src="character.image"
          :img-alt="character.name"
          img-top
          class="mb-2"
          :class="{ colored: isInFavorites(character) }"
        >
          <b-card-text>
            {{ character.location.name }}
          </b-card-text>
          <b-button
            variant="info"
            :disabled="isInFavorites(character)"
            @click="addToFavorites({ character })"
            >Add to favorites</b-button
          >
        </b-card>
      </b-col>
    </template>
  </b-row>
</template>

<script>
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import charactersQuery from '../graphql/queries/characters.query.gql';
import favoriteCharactersQuery from '../graphql/queries/favoriteCharacters.query.gql';
import addToFavoritesMutation from '../graphql/queries/addToFavorites.mutation.gql';
export default {
  setup() {
    const { result: charactersResult, loading } = useQuery(charactersQuery);

    const characters = useResult(
      charactersResult,
      null,
      data => data.characters.results
    );

    // Where are favorite characters? (╯°□°)╯︵ ┻━┻
    const { result: favResult } = useQuery(favoriteCharactersQuery);

    const isInFavorites = character =>
      favResult.value.favoriteCharacters.includes(character); // Yes, this is placeholder

    const { mutate: addToFavorites } = useMutation(addToFavoritesMutation);

    return {
      characters,
      loading,
      addToFavorites,
      isInFavorites
    };
  }
};
</script>

<style>
.colored {
  background-color: #c5f8f8;
}
</style>
