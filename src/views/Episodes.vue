<template>
  <b-row>
    <div v-if="$apollo.queries.episodes.loading" class="spinner w-100">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <b-table
      v-else
      striped
      hover
      :items="episodes.results"
      :fields="fields"
    ></b-table>
  </b-row>
</template>

<script>
import episodesQuery from '../graphql/queries/episodes.query.gql';
export default {
  data() {
    return {
      episodes: [],
      fields: ['id', 'name', 'air_date', 'episode']
    };
  },
  apollo: {
    episodes: {
      query: episodesQuery
    }
  }
};
</script>
