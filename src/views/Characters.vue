<template>
  <b-row class="py-3">
    <template v-if="characters">
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
    </template>
    <h2 v-else>Do some livecoding first! 😅</h2>
  </b-row>
</template>

<script>
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import charactersQuery from '../graphql/queries/characters.query.gql';
import favoriteCharactersQuery from '../graphql/queries/favoriteCharacters.query.gql';
import addToFavoritesMutation from '../graphql/queries/addToFavorites.mutation.gql';
export default {
  setup() {}
};
</script>

<style>
.colored {
  background-color: #c5f8f8;
}
</style>
