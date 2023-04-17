<template>
  <div id="detail-wrap">
    <!-- <h1>Details</h1> -->
    <!-- 
    <div style="position: relative">
      <div style="z-index: -1; width: 100%" v-if="movie">
        <v-img
          :src="'https://image.tmdb.org/t/p/original/' + movie.backdrop_path"
          :lazy-src="
            'https://image.tmdb.org/t/p/original/' + movie.backdrop_path
          "
        ></v-img>
        <div class="overlay gradient"></div>
      </div>
    </div> -->
    <v-row no-gutters>
      <v-col>
        <div class="image-container">
          <div style="z-index: -1; height: 100; width: 100%" v-if="movie">
            <v-img
              class="image-overlay"
              :src="
                'https://image.tmdb.org/t/p/original/' + movie.backdrop_path
              "
              :lazy-src="
                'https://image.tmdb.org/t/p/original/' + movie.backdrop_path
              "
            >
              <div class="gradient-overlay"></div>
              <v-btn variant="tonal" @click="$router.back" class="ma-3"
                ><font-awesome-icon
                  icon="fa-solid fa-arrow-left"
                ></font-awesome-icon
              ></v-btn>
              <!-- <v-col cols="12">
        <v-btn class="ma-3" size="small" variant="tonal" @click="$router.back"
          ><font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon
        ></v-btn>
      </v-col> -->
            </v-img>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="pa-3 mt-0" v-if="movie">
      <v-col cols="8">
        <h2>{{ movie.title }}</h2>
        <div style="display: flex; flex-direction: column">
          <span v-if="movie.release_date">{{
            movie.release_date.split("-")[0]
          }}</span>
          <span>{{ movie.runtime }} min</span>
        </div>

        <div>
          <font-awesome-icon
            class="mr-2"
            icon="fa-solid fa-star"
          ></font-awesome-icon>
          <span>
            <strong>{{ Math.round(movie.vote_average * 10) / 10 }}</strong>
            /10
          </span>
        </div>
        <!-- <div v-if="crew[0]">
          <span>Directed by</span> <strong>{{ crew[0].name }}</strong>
        </div> -->
        <!-- <v-btn @click="toggleWatched">watch</v-btn> -->
      </v-col>
      <v-col cols="4">
        <v-img
          cover
          class="poster elevation-6"
          :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
          :lazy-src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
        ></v-img>
      </v-col>

      <v-col cols="12">
        <div>
          <v-chip
            class="mr-1"
            v-for="(genre, i) in movie.genres"
            color="#23d9a5"
            >{{ genre.name }}</v-chip
          >
        </div>
      </v-col>

      <v-col cols="12">
        <p>{{ movie.overview }}</p>
      </v-col>

      <v-col cols="12">
        <div style="display: flex; flex-direction: column; gap: 10px">
          <!-- <v-btn @click="addToList" variant="tonal">Add to list</v-btn> -->
          <v-btn
            :color="upcoming ? '#23d9a5' : ''"
            @click="toggleWatchlist"
            variant="tonal"
            >Watchlist</v-btn
          >
          <v-btn
            @click="toggleWatched"
            :color="watched ? '#23d9a5' : ''"
            variant="tonal"
            >{{ watched ? "Watched" : "Watch" }}</v-btn
          >
          <v-btn variant="tonal">Rate</v-btn>
        </div>
      </v-col>

      <v-col cols="12">
        <h3>Reviews</h3>
        <v-divider theme="dark"></v-divider>
      </v-col>

      <v-col cols="12" v-for="(review, i) in reviews">
        <v-row>
          <v-col cols="2">
            <v-avatar
              v-if="
                review.author_details.avatar_path &&
                !review.author_details.avatar_path.includes('https')
              "
            >
              <v-img
                :src="
                  'https://image.tmdb.org/t/p/original/' +
                  review.author_details.avatar_path
                "
                alt="avatar"
              />
            </v-avatar>
            <v-avatar color="#23d9a5" v-else>
              <span>{{ Array.from(review.author_details.name)[0] }}</span>
            </v-avatar>
          </v-col>
          <v-col>
            <div>
              <span>{{ review.author }}</span>
            </div>
          </v-col>
          <v-col>
            <span>
              <font-awesome-icon
                v-for="(rating, i) in review.author_details.rating"
                icon="fa-solid fa-star"
              ></font-awesome-icon>
            </span>
          </v-col>
        </v-row>

        <!-- <div>
          {{ new Date(review.updated_at).toLocaleDateString() }}
        </div> -->

        <div class="my-4">
          {{ review.content }}
        </div>
        <v-divider theme="dark"></v-divider>
      </v-col>
    </v-row>

    <v-row class="pa-3" v-if="false">
      <v-col cols="12">
        <!-- <div class="text-center mb-2">
          <span v-for="(item, index) in movie.genres">
            <span class="pa-1">{{ item.name }}</span>
            <span v-if="index != movie.genres.length - 1">|</span>
          </span>
        </div> -->
        <!-- <v-img
          cover
          height="500px"
          class="poster elevation-6"
          :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
          :lazy-src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
        ></v-img> -->
        <div v-if="trailer" class="video-wrap iframe-container">
          <iframe
            width="560"
            height="315"
            class="elevation-12"
            style="border-radius: 10px"
            :src="`https://www.youtube.com/embed/${trailer.key}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
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
      <v-card theme="dark">
        <v-card-title>Your Lists</v-card-title>
        <v-progress-linear v-if="listLoading" indeterminate></v-progress-linear>
        <user-lists
          :hidden-lists="[watchedList.props.tmdbId]"
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
import ListAPI from "@/api/tmdb";
import UpnextAPI from "@/api/upnext";
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
      cast: [],
      crew: [],
      similarTitles: [],
      reviews: [],
      user: this.$auth0.user,
      upcomingList: [],
      watchedList: [],
      watched: false,
      upcoming: false,
    };
  },
  components: { UserLists },
  methods: {
    ...mapActions(useSnackbarStore, ["showSnackbar"]),
    async toggleWatchlist() {
      let params = {
        list_id: this.upcomingList.props.tmdbId,
        items: [
          {
            media_type: "movie",
            media_id: this.movie.id,
          },
        ],
      };

      if (this.upcoming) {
        await ListAPI.removeItems(params.list_id, params.items).then((resp) => {
          console.log("removed from list", resp);
          this.upcoming = false;
          this.showSnackbar({ message: "Removed from watched list" });
        });
      } else {
        await ListAPI.addItems(params).then((resp) => {
          console.log("added to list", resp);
          this.upcoming = true;
          this.showSnackbar({ message: "Watched!" });
        });
      }
    },
    handleListRowClick(item) {
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
          this.listModal = false;
          this.showSnackbar({ message: "Added to list!" });
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    addToList(movie) {
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

        this.backdropPath =
          "https://image.tmdb.org/t/p/original/" + this.movie.backdrop_path;
        this.setBackground(this.backdropPath);
      });
    },
    getWatchProviders(id) {
      MoviesAPI.indexProviders(id, "movie", {}).then((resp) => {
        this.providers = resp.data.results.US;
      });
    },
    getCast(id) {
      MoviesAPI.getCast(id, "movie", {}).then((resp) => {
        this.cast = resp.data.cast;
        this.crew = resp.data.crew;
      });
    },
    getSimilar(id) {
      MoviesAPI.getSimilar(id, "movie", {}).then((resp) => {
        this.similarTitles = resp.data;
      });
    },
    getReviews(id) {
      MoviesAPI.getReviews(id, "movie", {}).then((resp) => {
        this.reviews = resp.data.results;
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
          this.trailer = trailer;
        }
      });
    },
    async toggleWatched() {
      let params = {
        list_id: this.watchedList.props.tmdbId,
        items: [
          {
            media_type: "movie",
            media_id: this.movie.id,
          },
        ],
      };

      if (this.watched) {
        await ListAPI.removeItems(params.list_id, params.items).then((resp) => {
          console.log("removed from list", resp);
          this.watched = false;
          this.showSnackbar({ message: "Removed from watched list" });
        });
      } else {
        await ListAPI.addItems(params).then((resp) => {
          console.log("added to list", resp);
          this.watched = true;
          this.showSnackbar({ message: "Watched!" });
        });

        //if in upcoming list, remove when watched
        await ListAPI.removeItems(
          this.upcomingList.props.tmdbId,
          params.items
        ).then((resp) => {
          console.log("removed from list", resp);
          this.upcoming = false;
        });
      }
    },
    async getList(id) {
      const { data } = await UpnextAPI.getList(id);
      return data;
    },
    async getListStatus(list_id, item_id, type) {
      try {
        const resp = await ListAPI.showListStatus(list_id, {
          // media_id: this.$route.params.id,
          media_id: item_id,
          media_type: type,
        });
        console.log(resp, "watched status");
        this.watched = true;
      } catch (err) {
        console.log(err, "not in list");
        this.watched = false;
      }
    },
    checkStatusAllLists(arr) {
      let promises = [];

      for (let i = 0; i < arr.length; i++) {
        promises.push(
          ListAPI.showListStatus(arr[i].props.tmdbId, {
            media_id: this.$route.params.id,
            media_type: "movie",
          })
            .then((response) => {
              console.log(response);

              arr[i] = {
                ...arr[i],
                in_list: true,
              };

              if (arr[i].props.tmdbId == this.watchedList.props.tmdbId) {
                this.watched = true;
              }
              if (arr[i].props.tmdbId == this.upcomingList.props.tmdbId) {
                this.upcoming = true;
              }
            })
            .catch((err) => {
              arr[i] = {
                ...arr[i],
                in_list: false,
              };
              if (arr[i].props.tmdbId == this.watchedList.props.tmdbId) {
                this.watched = false;
              }
              if (arr[i].props.tmdbId == this.upcomingList.props.tmdbId) {
                this.upcoming = false;
              }
            })
        );
      }
      Promise.all(promises).then(() => {
        console.log("done checking statuses", arr);
      });
    },
  },
  async mounted() {
    this.getDetails(this.$route.params.id);

    if (this.isAuthenticated) {
      this.upcomingList = await this.getList(
        this.$auth0.user.value["https://nextup.com/upcomingListId"]
      );
      this.watchedList = await this.getList(
        this.$auth0.user.value["https://nextup.com/watchedListId"]
      );

      const mainLists = [this.upcomingList, this.watchedList];
      console.log(mainLists);
      this.checkStatusAllLists(mainLists);

      // await this.getListStatus(
      //   this.watchedList.props.tmdbId,
      //   this.movie.id,
      //   "movie"
      // );
      // await this.getListStatus(
      //   this.upcomingList.props.tmdbId,
      //   this.movie.id,
      //   "movie"
      // );
    }

    this.getWatchProviders(this.$route.params.id);
    this.getVideos(this.$route.params.id);
    this.getCast(this.$route.params.id);
    this.getSimilar(this.$route.params.id);
    this.getReviews(this.$route.params.id);
  },
};
</script>
<style lang="scss" scoped>
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
  width: 100%;
  height: 100%;
  // overflow-x: hidden;
  // border: 2px solid red;
  z-index: 0;
  // background-color: transparent;
  // background-color: blue;
  color: white;
  background-color: black;

  // padding: 20px;
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

.overlay {
  // border: 1px solid blue;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  // border-radius: 0 0 10px 10px;
  // background: linear-gradient(hsl(0 0% 0% / 0), hsla(0, 0%, 0%, 0.774));
  background-image: linear-gradient(to bottom, transparent 0%, black 100%);
}
// .gradient {
//   border-radius: 0 0 10px 10px;
//   background-image: linear-gradient(to bottom, transparent 0%, black 90%);
// }

.chip-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}
.image-container {
  position: relative;
  width: 100%; /* Set the desired width for your image container */
  height: 0; /* Set the desired height for your image container */
  padding-bottom: 56.25%; /* Set the aspect ratio of your image (e.g. 16:9 = 9 / 16 = 0.5625) */
}

.image-overlay {
  width: 100%;
  height: 100%;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    transparent,
    black
  ); /* Adjust the gradient colors and direction as desired */
}
</style>
