<template>
  <div class="pa-3">
    <h1>Details</h1>
    <v-btn href="/">Back</v-btn>
    <v-row v-if="movie">
      <v-col cols="12">
        <v-img
          height="500px"
          :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
          :lazy-src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
        ></v-img>
      </v-col>
      <v-col
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
        cols="12"
      >
        <h1>{{ movie.name || movie.title }}</h1>
        <p>{{ movie.overview }}</p>
        <div>
          <span v-for="(item, index) in movie.genres">
            <strong class="pa-1">{{ item.name }}</strong>
            <span v-if="index != movie.genres.length - 1">|</span>
          </span>
        </div>
      </v-col>
      <!-- {{ providers }} -->
      <v-row class="pa-3" v-if="providers?.flatrate">
        <v-col cols="12">
          <h4>Stream</h4>
        </v-col>
        <v-col class="text-center" v-for="provider in providers?.flatrate">
          <v-img
            height="100px"
            :src="'https://image.tmdb.org/t/p/original/' + provider.logo_path"
            :lazy-src="
              'https://image.tmdb.org/t/p/original/' + provider.logo_path
            "
          ></v-img>
          <span>{{ provider.provider_name }}</span>
        </v-col>
      </v-row>
      <v-row class="pa-3" v-if="providers?.buy">
        <v-col cols="12">
          <h4>Buy</h4>
        </v-col>
        <v-col class="text-center" v-for="provider in providers?.buy">
          <v-img
            height="100px"
            :src="'https://image.tmdb.org/t/p/original/' + provider.logo_path"
            :lazy-src="
              'https://image.tmdb.org/t/p/original/' + provider.logo_path
            "
          ></v-img>
          <span>{{ provider.provider_name }}</span>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>
<script>
import MoviesAPI from "@/api/movies";
export default {
  data() {
    return {
      movie: null,
      loading: true,
      providers: [],
    };
  },
  methods: {
    getDetails(id) {
      MoviesAPI.show(id, "/movie/", {
        api_key: import.meta.env.VITE_APP_MOVIE_API_KEY,
      }).then((resp) => {
        this.movie = resp.data;
      });
    },
    getWatchProviders(id) {
      MoviesAPI.indexProviders(id, "movie", {
        api_key: import.meta.env.VITE_APP_MOVIE_API_KEY,
      }).then((resp) => {
        this.providers = resp.data.results.US;
      });
    },
  },
  mounted() {
    this.getDetails(this.$route.params.id);
    this.getWatchProviders(this.$route.params.id);
  },
};
</script>
<style></style>
