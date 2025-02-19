<template>
  <div id="detail-wrap">
    <v-row no-gutters>
      <v-col>
        <div class="image-container">
          <div style="z-index: -1; height: 100; width: 100%" v-if="media">
            <v-img
              class="image-overlay"
              :src="handleImgSrc(media.backdrop_path, 800)"
              :lazy-src="handleImgSrc(media.backdrop_path, 800)"
            >
              <div class="gradient-overlay"></div>
              <v-btn variant="tonal" @click="$router.back" class="ma-3"
                ><font-awesome-icon
                  icon="fa-solid fa-arrow-left"
                ></font-awesome-icon
              ></v-btn>
            </v-img>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="pa-3 mt-0" v-if="media">
      <v-col cols="8">
        <div class="mb-2" v-if="contentRating">
          <v-chip size="small" color="#23d9a5" variant="outlined" label>{{
            contentRating
          }}</v-chip>
          <v-btn
            v-if="trailer"
            class="ml-2"
            size="small"
            @click="toggleTrailerVisible"
            variant="tonal"
          >
            <span>Trailer</span>
            <font-awesome-icon
              class="ml-2"
              icon="fa-solid fa-play"
            ></font-awesome-icon>
          </v-btn>
        </div>
        <h2 v-if="mediaType == 'movie'">{{ media.title }}</h2>
        <h2 v-if="mediaType == 'tv'">{{ media.name }}</h2>

        <div>
          <font-awesome-icon
            class="mr-2"
            icon="fa-solid fa-star"
          ></font-awesome-icon>
          <span>
            <strong>{{ Math.round(media.vote_average * 10) / 10 }}</strong>
            /10
          </span>
        </div>

        <div
          v-if="mediaType == 'movie'"
          style="display: flex; flex-direction: column"
        >
          <span v-if="media.release_date">{{
            media.release_date.split("-")[0]
          }}</span>
          <span>{{ media.runtime }} min</span>
        </div>

        <div v-if="mediaType == 'tv'">
          <div>
            {{ media.number_of_seasons }} Season{{
              media.number_of_seasons > 1 ? "s" : ""
            }}
          </div>
          <div>
            <span>
              {{ media.first_air_date.split("-")[0] }}
            </span>
            -
            <span>
              {{ media.in_production ? "" : media.last_air_date.split("-")[0] }}
            </span>
          </div>
        </div>

        <div>
          <font-awesome-icon
            :icon="mediaType == 'tv' ? 'fa-solid fa-tv' : 'fa-solid fa-film'"
          />
          {{ mediaType == "tv" ? "TV" : "Movie" }}
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
          :src="handleImgSrc(media.poster_path, 500)"
          :lazy-src="handleImgSrc(media.poster_path, 500)"
        ></v-img>
      </v-col>

      <v-col cols="12">
        <v-expand-transition>
          <div v-show="trailerVisible">
            <div v-if="trailer" class="video-wrap iframe-container">
              <iframe
                id="youtube-player"
                width="560"
                height="315"
                class="elevation-12"
                style="border-radius: 10px"
                :src="`https://www.youtube.com/embed/${trailer.key}?enablejsapi=1`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </v-expand-transition>
      </v-col>

      <v-col cols="12">
        <div style="display: flex; flex-wrap: wrap; gap: 7px">
          <v-chip v-for="(genre, i) in media.genres" color="#23d9a5">{{
            genre.name
          }}</v-chip>
        </div>
      </v-col>

      <v-col cols="12">
        <h3>{{ media.tagline }}</h3>
        <p>{{ media.overview }}</p>
      </v-col>

      <v-col cols="12">
        <div style="display: flex; flex-direction: column; gap: 10px">
          <v-alert
            v-if="!isAuthenticated"
            color="#23d9a5"
            title="Account Required"
            variant="tonal"
          >
            Please <span @click="login" class="link">log in</span> or
            <span @click="signUp" class="link">create an accout</span> to access
            these features.</v-alert
          >
          <v-btn
            :color="upcoming ? '#23d9a5' : ''"
            @click="toggleWatchlist"
            variant="tonal"
            :disabled="!isAuthenticated"
          >
            <span> Watchlist </span>
            <font-awesome-icon
              class="ml-2"
              :icon="upcoming ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"
            ></font-awesome-icon>
          </v-btn>
          <v-btn
            @click="toggleWatched"
            :color="watched ? '#23d9a5' : ''"
            variant="tonal"
            :disabled="!isAuthenticated"
          >
            <span>Watched</span>
            <font-awesome-icon
              class="ml-2"
              :icon="watched ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
            ></font-awesome-icon>
          </v-btn>
          <!-- <font-awesome-icon
              class="ml-2"
              :icon="
                watched ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'
              "
            ></font-awesome-icon> -->
          <!-- <v-btn variant="tonal">Rate</v-btn> -->
        </div>
      </v-col>

      <!-- <v-col cols="12">
        <h3>Other Reccomendations</h3>
        <coverflow :items="recommendations" />
      </v-col>

      <v-col cols="12">
        <h3>Where To Watch</h3>
        <div v-if="providers.length == 0">
          <v-divider theme="dark"></v-divider>
          <p>No provider data available.</p>
        </div>
        <v-expansion-panels eager theme="dark">
          <v-expansion-panel v-if="providers.flatrate">
            <v-expansion-panel-title>Streaming</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="pa-2" v-for="item in providers.flatrate">
                <div style="display: flex; align-items: center">
                  <div style="width: 50px">
                    <v-img
                      style="max-width: 100%; border-radius: 5px"
                      :src="handleImgSrc(item.logo_path)"
                    ></v-img>
                  </div>

                  <div class="ml-2">
                    <p>{{ item.provider_name }}</p>
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel v-if="providers.free">
            <v-expansion-panel-title>Network</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="pa-2" v-for="item in providers.free">
                <div style="display: flex; align-items: center">
                  <div style="width: 50px">
                    <v-img
                      style="max-width: 100%; border-radius: 5px"
                      :src="handleImgSrc(item.logo_path, 50)"
                    ></v-img>
                  </div>

                  <div class="ml-2">
                    <p>{{ item.provider_name }}</p>
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel v-if="providers.buy">
            <v-expansion-panel-title>Buy</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="pa-2" v-for="item in providers.buy">
                <div style="display: flex; align-items: center">
                  <div style="width: 50px">
                    <v-img
                      style="max-width: 100%; border-radius: 5px"
                      :src="handleImgSrc(item.logo_path)"
                    ></v-img>
                  </div>

                  <div class="ml-2">
                    <p>{{ item.provider_name }}</p>
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col> -->

      <v-col cols="12">
        <h3>Reviews</h3>
        <v-divider theme="dark"></v-divider>
        <div v-if="reviews.length == 0">
          <p>No reviews found.</p>
        </div>
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

        <div class="my-4">
          {{ review.content }}
        </div>
        <v-divider theme="dark"></v-divider>
      </v-col>
    </v-row>

    <v-row class="pa-3" v-if="false">
      <!-- <v-col cols="12">
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
      </v-col> -->

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
        <p>{{ media.overview }}</p>
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
import Coverflow from "@/components/UI/Coverflow.vue";
import MoviesAPI from "@/api/movies";
import UserLists from "@/components/UserLists.vue";
import ListAPI from "@/api/tmdb";
import UpnextAPI from "@/api/upnext";
import { useSnackbarStore } from "@/stores/snackbar";
import { mapActions } from "pinia";
import { useAuth0 } from "@auth0/auth0-vue";
export default {
  data() {
    return {
      media: null,
      loading: this.$auth0.isLoading,
      providers: [],
      videos: [],
      listModal: false,
      isAuthenticated: this.$auth0.isAuthenticated,
      backdropPath: null,
      listLoading: false,
      videoWindow: 0,
      trailerModal: false,
      trailer: null,
      trailerVisible: false,
      cast: [],
      crew: [],
      recommendations: [],
      reviews: [],
      user: this.$auth0.user,
      upcomingList: null,
      watchedList: null,
      watched: false,
      upcoming: false,
      mediaType: "",
      providerPanels: [],
      contentRating: null,
      sliderItems: [],
    };
  },
  components: { UserLists, Coverflow },
  watch: {
    isAuthenticated() {
      console.log("auth change");
    },
    "$route.params.id": function (newId) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.initDetails(newId);
    },
  },
  methods: {
    ...mapActions(useSnackbarStore, ["showSnackbar"]),
    signUp() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: "/profile",
        },
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    },
    login() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: "/profile",
        },
      });
    },
    pauseEmbedVideo() {
      const player = document.getElementById("youtube-player").contentWindow;
      if (player) {
        player.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    },
    playEmbedVideo() {
      const player = document.getElementById("youtube-player").contentWindow;

      if (player) {
        player.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      }
    },
    toggleTrailerVisible() {
      this.trailerVisible = !this.trailerVisible;

      // pause player if closed
      if (!this.trailerVisible) {
        this.pauseEmbedVideo();
      } else {
        this.playEmbedVideo();
      }
    },
    handleImgSrc(ext, width = null) {
      if (ext) {
        if (width) {
          return (
            `https://ik.imagekit.io/upnext/tr:w-${width}/https://image.tmdb.org/t/p/original/` +
            (ext || "")
          );
        } else
          return (
            `https://ik.imagekit.io/upnext/https://image.tmdb.org/t/p/original/` +
            (ext || "")
          );
      }
      return null;
    },
    async toggleWatchlist() {
      let params = {
        list_id: this.upcomingList.props.tmdbId,
        items: [
          {
            media_type: this.$route.params.mediaType,
            media_id: this.media.id,
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
            media_type: this.$route.params.mediaType,
            media_id: this.media.id,
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
    addToList(media) {
      this.listModal = true;
    },
    setBackground(url) {
      let root = document.documentElement;
      // let target = document.getElementById("detail-wrap");
      root.style.setProperty("--custom-bkg", `url(${url})`);
      // target.style.backgroundImage = `url(${url})`;

      // console.log(target);
    },
    async getDetails(id) {
      return MoviesAPI.show(id, `${this.$route.params.mediaType}`, {}).then(
        (resp) => {
          this.media = resp.data;
          if (this.media.hasOwnProperty("first_air_date")) {
            this.mediaType = "tv";
          } else {
            this.mediaType = "movie";
          }
          console.log(this.media, "MEDIA details");

          // this.backdropPath =
          //   "https://image.tmdb.org/t/p/original/" + this.media.backdrop_path;
          // this.setBackground(this.backdropPath);
        }
      );
    },
    getWatchProviders(id) {
      MoviesAPI.indexProviders(id, `${this.$route.params.mediaType}`, {}).then(
        (resp) => {
          this.providers = resp.data.results.US || [];
          console.log(this.providers, "PROVIDERS");
        }
      );
    },
    getCast(id) {
      MoviesAPI.getCast(id, `${this.$route.params.mediaType}`, {}).then(
        (resp) => {
          this.cast = resp.data.cast;
          this.crew = resp.data.crew;
        }
      );
    },
    mapToLabelImageArray(data) {
      return data.map((item) => {
        return {
          label: item.title,
          image: item.poster_path,
        };
      });
    },
    getRecommendations(id) {
      MoviesAPI.getRecommendations(
        id,
        `${this.$route.params.mediaType}`,
        {}
      ).then((resp) => {
        this.recommendations = resp.data.results;
        console.log(resp.data, "similar");
        this.sliderItems = this.mapToLabelImageArray(resp.data.results);
      });
    },
    getReviews(id) {
      MoviesAPI.getReviews(id, `${this.$route.params.mediaType}`, {}).then(
        (resp) => {
          this.reviews = resp.data.results;
        }
      );
    },
    getVideos(id) {
      MoviesAPI.indexVideos(id, `${this.$route.params.mediaType}`, {}).then(
        (resp) => {
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
        }
      );
    },
    getExternalIds(id, collection) {
      MoviesAPI.getExternalIds(id, `${this.$route.params.mediaType}`, {}).then(
        (resp) => {
          console.log(resp, "external Ids");
        }
      );
    },
    async toggleWatched() {
      let params = {
        list_id: this.watchedList.props.tmdbId,
        items: [
          {
            media_type: `${this.$route.params.mediaType}`,
            media_id: this.media.id,
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

        // //if in upcoming list, remove when watched
        // await ListAPI.removeItems(
        //   this.upcomingList.props.tmdbId,
        //   params.items
        // ).then((resp) => {
        //   console.log("removed from list", resp);
        //   this.upcoming = false;
        // });
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
    getContentRating(id) {
      MoviesAPI.getContentRatings(id).then((resp) => {
        console.log(resp.data.results, "content ratings");
        let usRating = resp.data.results.find((x) => x.iso_3166_1 == "US");
        if (usRating) {
          console.log(usRating, "FOUND");
          this.contentRating = usRating.rating;
        }
      });
    },
    getReleaseDates(id) {
      MoviesAPI.getReleaseDates(id).then((resp) => {
        console.log(resp.data.results, "release dates");
        let usRating = resp.data.results.find((x) => x.iso_3166_1 == "US");
        if (usRating) {
          // this.contentRating = usRating.release_dates[0].certification;
          for (let i = 0; i < usRating.release_dates.length; i++) {
            if (usRating.release_dates[i].certification) {
              this.contentRating = usRating.release_dates[i].certification;
              break; // Exit the loop after the first item with certification is found
            }
          }
        }
      });
    },
    checkStatusAllLists(arr) {
      let promises = [];

      for (let i = 0; i < arr.length; i++) {
        promises.push(
          ListAPI.showListStatus(arr[i].props.tmdbId, {
            media_id: this.$route.params.id,
            media_type: this.$route.params.mediaType,
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
    async initDetails(id) {
      await this.getDetails(id);

      useAuth0.isAuthenticated;
      console.log(this.isAuthenticated, "auth on mount");
      if (this.isAuthenticated) {
        this.upcomingList = await this.getList(
          this.$auth0.user.value["https://nextup.com/upcomingListId"]
        );
        this.watchedList = await this.getList(
          this.$auth0.user.value["https://nextup.com/watchedListId"]
        );

        const mainLists = [this.upcomingList, this.watchedList];
        console.log(mainLists, "got main lists");
        this.checkStatusAllLists(mainLists);
      }

      this.getWatchProviders(id);
      this.getVideos(id);
      this.getCast(id);
      this.getRecommendations(id);
      this.getReviews(id);

      if (this.mediaType == "tv") {
        this.getContentRating(id);
      } else {
        this.getReleaseDates(id);
      }

      // this.getExternalIds(this.$route.params.id);
    },
  },

  async mounted() {
    this.initDetails(this.$route.params.id);
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
  border-radius: 5px;
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
