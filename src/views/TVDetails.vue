<template>
  <div class="pa-3">
    <div class="pa-3" style="display: flex; justify-content: space-between">
      <v-btn variant="tonal" href="/"
        ><font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon
      ></v-btn>
      <v-btn variant="tonal" v-if="isAuthenticated" @click="addToList(movie)"
        >add to list</v-btn
      >
    </div>
    <v-row class="pa-3" v-if="movie">
      <v-col cols="12">
        <div class="text-center mb-2">
          <span v-for="(item, index) in movie.genres">
            <span class="pa-1">{{ item.name }}</span>
            <span v-if="index != movie.genres.length - 1">|</span>
          </span>
        </div>
        <v-img
          cover
          height="500px"
          class="poster elevation-6"
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
      </v-col>
      <!-- {{ providers }} -->
      <v-row class="pa-3">
        <v-col v-if="providers?.flatrate" cols="12">
          <h4>Stream</h4>
          <div v-for="(provider, index) in providers?.flatrate">
            <span>{{ provider.provider_name }}</span>
            <v-divider
              v-if="index != providers?.flatrate.length - 1"
            ></v-divider>
          </div>
        </v-col>
        <v-col v-if="providers?.buy" cols="12">
          <h4>Buy</h4>
          <div v-for="(provider, index) in providers?.buy">
            <span>{{ provider.provider_name }}</span>
            <v-divider
              v-if="index != providers?.flatrate.length - 1"
            ></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-row>
    <v-dialog v-model="listModal">
      <v-card>
        <v-card-title>Your Lists</v-card-title>
        <user-lists
          :canDelete="false"
          :customRowClick="true"
          @row-click="(item) => handleListRowClick(item)"
          ref="lists"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import MoviesAPI from "@/api/movies";
import UserLists from "@/components/UserLists.vue";
import ListAPI from "@/api/tmdb";
export default {
  data() {
    return {
      movie: null,
      loading: true,
      providers: [],
      listModal: false,
      isAuthenticated: this.$auth0.isAuthenticated,
    };
  },
  components: { UserLists },
  methods: {
    handleListRowClick(item) {
      console.log("row clicked", item);
      let params = {
        list_id: item.props.tmdbId,
        items: [
          {
            media_type: "movie",
            media_id: this.movie.id,
          },
        ],
      };

      ListAPI.addItems(params)
        .then((resp) => {
          console.log(resp, "resp");
        })
        .catch((error) => {
          console.log(error, "error");
        });

      console.log(params);
    },
    addToList(movie) {
      console.log(movie, "movie deets");
      this.listModal = true;
    },
    getDetails(id) {
      MoviesAPI.show(id, "/tv/", {}).then((resp) => {
        console.log(resp, "success");
        this.movie = resp.data;
      });
    },
    getWatchProviders(id) {
      MoviesAPI.indexProviders(id, "tv", {}).then((resp) => {
        this.providers = resp.data.results.US;
        console.log(this.providers, "prov");
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
