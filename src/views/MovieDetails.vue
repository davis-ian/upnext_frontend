<template>
  <div id="detail-wrap" class="pa-3">
    <!-- <h1>Details</h1> -->

    <div style="display: flex; justify-content: space-between" class="pa-3">
      <v-btn variant="tonal" @click="$router.back"
        ><font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon
      ></v-btn>
      <v-btn variant="tonal" v-if="isAuthenticated" @click="addToList(movie)"
        >add to list</v-btn
      >
    </div>
    <v-row class="pa-3" v-if="movie">
      <v-col>
        <h1>{{ movie.title }}</h1>
      </v-col>
      <!-- <v-col cols="12">
        <v-img
          :src="'https://image.tmdb.org/t/p/original/' + movie.backdrop_path"
          :lazy-src="
            'https://image.tmdb.org/t/p/original/' + movie.backdrop_path
          "
        ></v-img
      ></v-col> -->
      <v-col cols="12">
        <!-- <div class="text-center mb-2">
          <span v-for="(item, index) in movie.genres">
            <span class="pa-1">{{ item.name }}</span>
            <span v-if="index != movie.genres.length - 1">|</span>
          </span>
        </div> -->
        <v-img
          cover
          height="500px"
          class="poster elevation-6"
          :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
          :lazy-src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
        ></v-img>
      </v-col>
      <!-- <v-col cols="12">
        <v-img
          h
          :src="'https://image.tmdb.org/t/p/original/' + movie.backdrop_path"
          :lazy-src="
            'https://image.tmdb.org/t/p/original/' + movie.backdrop_path
          "
        ></v-img
      ></v-col> -->

      <v-col
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
        cols="12"
      >
        <div style="width: 100%" class="mb-4 text-left" v-if="this.trailer">
          <v-btn @click="trailerModal = true" variant="outlined">
            <font-awesome-icon
              icon="fa-solid fa-play"
              class="mr-2"
            ></font-awesome-icon>
            trailer</v-btn
          >
        </div>
        <p>{{ movie.overview }}</p>
      </v-col>
      <!-- <v-col cols="12">
        <div class="video-wrap iframe-container">

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/9YffrCViTVk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </v-col> -->
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
            <v-divider></v-divider>
            <!-- v-if="index != providers?.flatrate.length - 1" -->
          </div>
        </v-col>
      </v-row>
    </v-row>

    <v-dialog v-model="trailerModal">
      <v-card>
        <div class="video-wrap iframe-container">
          <!-- <iframe
                height="480"
                width="100%"
                src="https://www.youtube.com/embed/il_t1WVLNxk"
              >
              </iframe> -->
          <iframe
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${trailer.key}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="listModal">
      <v-card>
        <v-card-title>Your Lists</v-card-title>
        <v-progress-linear v-if="listLoading" indeterminate></v-progress-linear>
        <user-lists
          @loadstart="listLoading = true"
          @loadend="listLoading = false"
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
import ListAPI from "@/api/tmdb-lists";
import { useSnackbarStore } from "@/stores/snackbar";
import { mapActions } from "pinia";
export default {
  data() {
    return {
      movie: null,
      loading: true,
      providers: [],
      videos: [],
      listModal: false,
      isAuthenticated: this.$auth0.isAuthenticated,
      backdropPath: null,
      listLoading: false,
      videoWindow: 0,
      trailerModal: false,
      trailer: null,
    };
  },
  components: { UserLists },
  methods: {
    ...mapActions(useSnackbarStore, ["showSnackbar"]),
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
          this.listModal = false;
          this.showSnackbar({ message: "Added to list!" });
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
    setBackground(url) {
      let root = document.documentElement;
      // let target = document.getElementById("detail-wrap");
      root.style.setProperty("--custom-bkg", `url(${url})`);
      // target.style.backgroundImage = `url(${url})`;

      // console.log(target);
    },
    getDetails(id) {
      MoviesAPI.show(id, "/movie/", {}).then((resp) => {
        this.movie = resp.data;
        console.log(resp.data, "movie data");
        this.backdropPath =
          "https://image.tmdb.org/t/p/original/" + this.movie.backdrop_path;
        this.setBackground(this.backdropPath);
        console.log(this.backdropPath, "path");
      });
    },
    getWatchProviders(id) {
      MoviesAPI.indexProviders(id, "movie", {}).then((resp) => {
        this.providers = resp.data.results.US;
      });
    },
    getVideos(id) {
      MoviesAPI.indexVideos(id, "movie", {}).then((resp) => {
        this.videos = resp.data.results;
        const trailer = this.videos.find(
          (x) =>
            x.name.includes("Official") &&
            x.site == "YouTube" &&
            x.type == "Trailer"
        );
        if (trailer) {
          console.log(trailer, "found");
          this.trailer = trailer;
        }
        console.log(resp.data.results, "videos");
      });
    },
  },
  mounted() {
    this.getDetails(this.$route.params.id);
    this.getWatchProviders(this.$route.params.id);
    this.getVideos(this.$route.params.id);
  },
};
</script>
<style lang="scss">
:root {
  // --my-color: "https://image.tmdb.org/t/p/original//eSVu1FvGPy86TDo4hQbpuHx55DJ.jpg";
  --my-color: black;
  --custom-bkg: "";
}

.backdrop {
  // background: var(--my-color);
  // background: var(--custom-bkg);
  background-size: cover;
}
.poster {
  // border: 2px solid red;
  border-radius: 10px;
}

#detail-wrap {
  max-width: 100%;
  // border: 2px solid red;
  // background-color: blue;
  // color: white;

  padding: 20px;
  position: relative;
  // background-size: cover;
  // background: var(--custom-bkg);
  // background: var(--dark-1);
  // background-size: contain;
  // background-position: center center;
  // background-attachment: fixed;
  // background-image: url("https://image.tmdb.org/t/p/original//eSVu1FvGPy86TDo4hQbpuHx55DJ.jpg");
}

.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
