<template>
  <div id="home">
    <div>
      <v-row no-gutters class="pa-2">
        <v-col cols="12">
          <v-tabs v-model="currentCollection" color="#23d9a5">
            <v-tab
              v-for="(item, index) in homeTabs"
              :key="index"
              :value="item.value"
              >{{ item.label }}</v-tab
            >
          </v-tabs>
        </v-col>
        <v-col class="pa-1" v-if="currentCollection < 2" cols="12">
          <div class="text-right">
            <v-btn
              class="mb-2"
              :variant="showProviders ? 'outlined' : 'plain'"
              color="#23d9a5"
              size="small"
              @click="toggleProviders"
              >Filter</v-btn
            >
          </div>
          <v-expand-transition>
            <div v-show="showProviders">
              <p>Providers</p>
              <v-divider theme="dark" class="mb-2"></v-divider>
              <popular-providers
                @selection-changed="handleSelectionChange"
                :popular-providers="popularProviders"
              />
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>

      <v-row no-gutters class="pa-2 pt-0">
        <v-col cols="12">
          <v-window v-model="currentCollection">
            <v-window-item :value="0">
              <v-row no-gutters>
                <v-col
                  class="pa-1"
                  cols="4"
                  sm="4"
                  md="3"
                  v-for="(result, index) in collections[currentCollection]
                    .results"
                  :key="index"
                >
                  <div>
                    <detailed-poster
                      @click="goToDetails(result)"
                      :score="result.vote_average"
                      :src="handleImgSrc(result.poster_path)"
                      :lazy-src="handleImgSrc(result.poster_path)"
                    />
                  </div>
                </v-col>
                <v-col cols="12">
                  <div>
                    <div class="pa-3 text-center">
                      <v-progress-linear
                        v-if="loading"
                        indeterminate
                      ></v-progress-linear>

                      <span style="font-size: 0.9rem" class="target"></span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item eager :value="1">
              <v-row no-gutters>
                <v-col
                  class="pa-1"
                  cols="4"
                  sm="4"
                  md="3"
                  v-for="(result, index) in collections[currentCollection]
                    .results"
                  :key="index"
                >
                  <div>
                    <detailed-poster
                      @click="goToDetails(result)"
                      :score="result.vote_average"
                      :src="handleImgSrc(result.poster_path)"
                      :lazy-src="handleImgSrc(result.poster_path)"
                    />
                  </div>
                </v-col>
                <v-col cols="12">
                  <div>
                    <div class="pa-3 text-center">
                      <v-progress-linear
                        v-if="loading"
                        indeterminate
                      ></v-progress-linear>

                      <span style="font-size: 0.9rem" class="target"></span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item eager :value="2">
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="mt-2">
                    <v-text-field
                      clearable
                      @keydown.enter="startSearch"
                      label="Search"
                      v-model="searchText"
                      autofocus=""
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col
                  class="pa-1"
                  cols="4"
                  sm="4"
                  md="3"
                  v-for="(result, index) in collections[currentCollection]
                    .results"
                  :key="index"
                >
                  <div>
                    <detailed-poster
                      @click="goToDetails(result)"
                      :score="result.vote_average"
                      :src="handleImgSrc(result.poster_path)"
                      :lazy-src="handleImgSrc(result.poster_path)"
                    />
                  </div>
                </v-col>
                <!-- <v-col cols="12">
                  <div>
                    <div class="pa-3 text-center">
                      <v-progress-linear
                        v-if="loading"
                        indeterminate
                      ></v-progress-linear>

                      <span style="font-size: 0.9rem" class="target"></span>
                    </div>
                  </div>
                </v-col> -->
              </v-row>
            </v-window-item>
            <v-window-item :value="3">
              <v-alert
                v-if="!isAuthenticated"
                color="#23d9a5"
                title="Account Required"
                variant="tonal"
              >
                Please <span @click="login" class="link">log in</span> or
                <span @click="signUp" class="link">create an accout</span> to
                access these features.</v-alert
              >

              <div v-if="isAuthenticated">
                <user-lists :canDelete="true" ref="lists" />
              </div>
            </v-window-item>
          </v-window>
        </v-col>
        <!-- <v-col cols="12">
          <div>
            <div class="pa-3 text-center">
              <v-progress-linear
                v-if="loading"
                indeterminate
              ></v-progress-linear>

              <span style="font-size: 0.9rem" id="target"></span>
            </div>
          </div>
        </v-col> -->
      </v-row>
    </div>
  </div>

  <v-dialog
    v-model="showMenu"
    position-fixed
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card class="menu-card" :style="{ height: menuHeight }">
      <v-toolbar>
        <v-toolbar-title>Menu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="showMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import UserLists from "@/components/UserLists.vue";
import PopularProviders from "@/components/PopularProviders.vue";
import MoviesAPI from "@/api/movies";
import PageLoader from "@/components/UI/PageLoader.vue";
import DetailedPoster from "@/components/UI/DetailedPoster.vue";
import { debounceV2 } from "@/utils/debounce";
export default {
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
      popularProviders: [
        { name: "Netflix", id: 8 },
        { name: "Amazon Prime", id: 9 },
        { name: "Disney +", id: 337 },
        { name: "Apple TV", id: 350 },
        { name: "Hulu", id: 15 },
        { name: "HBO Max", id: 384 },
        { name: "Peacock", id: 386 },
        // { name: "Youtube", id: 192 },
      ],
      showMenu: false,
      menuHeight: 0,
      menuItems: [
        { title: "Home", to: "/" },
        { title: "About", to: "/about" },
        { title: "Contact", to: "/contact" },
      ],
      selectedProviders: [],
      homeTabs: [
        { label: "Movies", value: 0 },
        { label: "TV", value: 1 },
        { label: "Search", value: 2 },
        { label: "Lists", value: 3 },
      ],
      results: [],
      searchResults: [],
      totalPages: 0,
      currentPage: 1,
      searchText: "",
      currentCollection: 0,
      showSearch: false,
      loading: true,
      observer: null,
      tab: 0,
      showProviders: false,
      updatingCollection: false,
      monTypes: ["flatrate", "free", "ads", "rent", "buy"],
      collections: [
        {
          value: 0,
          name: "Movies",
          endpoint: "discover/movie",
          collection: "movie",
          results: [],
          totalPages: 0,
          pageTarget: "movieTarget",
        },
        {
          value: 1,
          name: "TV Series",
          endpoint: "discover/tv",
          collection: "tv",
          results: [],
          totalPages: 0,
          pageTarget: "tvTarget",
        },
        {
          value: 2,
          name: "Search",
          endpoint: "search/multi",
          results: [],
          totalPages: 0,
          pageTarget: "searchTarget",
        },
        {
          value: 3,
          name: "Lists",
          endpoint: "",
          results: [],
          totalPages: 0,
        },
      ],
    };
  },
  components: { PageLoader, DetailedPoster, PopularProviders, UserLists },
  watch: {
    currentCollection() {
      this.currentPage = 1;
      this.updatingCollection = true;
      this.getResults(this.collections[this.currentCollection].endpoint);
    },
    currentPage() {
      console.log("current page change", this.currentPage);
      //   if (this.currentCollection != 3) {
      this.getResults(this.collections[this.currentCollection].endpoint);
      //   }
    },
    searchText: debounceV2(function () {
      this.currentPage = 1;
      this.startSearch();
    }, 500),
  },
  methods: {
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
    toggleProviders() {
      this.showProviders = !this.showProviders;
      if (this.showProviders) {
        this.showSearch = false;
      }
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.showProviders = false;
      }
    },
    toggleMenu() {
      console.log(this.showMenu, "toggleing");
      this.showMenu = !this.showMenu;
      if (this.showMenu) {
        this.menuHeight = "75vh";
      } else {
        this.menuHeight = "0";
      }
    },
    handleSelectionChange(newValue) {
      this.selectedProviders = newValue;
      console.log("Selected providers changed:", this.selectedProviders);
      this.currentPage = 1;
      this.getResults(this.collections[this.currentCollection].endpoint);
    },
    handleImgSrc(path) {
      if (path) {
        return (
          "https://ik.imagekit.io/upnext/tr:w-300/https://image.tmdb.org/t/p/original/" +
          path
        );
      }
      return null;
    },
    getWatchProviders() {
      MoviesAPI.getWatchProviders("movie").then((resp) =>
        console.log(resp, "available providers")
      );
    },
    goToDetails(item) {
      if (item.hasOwnProperty("first_air_date")) {
        console.log("this is a tv show");
        this.$router.push("media/tv/" + item.id);
      } else {
        this.$router.push("media/movie/" + item.id);
      }
    },
    getIds(arr) {
      return arr.map((obj) => obj.id);
    },
    getResults(endpoint, params) {
      console.log("getting results", this.currentPage, endpoint);

      // must be used to use watch region w/o including providers
      const monTypeQuery = this.monTypes.join("|");

      const providerQuery = this.getIds(this.selectedProviders).join("|");

      this.loading = true;
      MoviesAPI.index(endpoint, {
        watch_region: "US",
        with_watch_providers: providerQuery,
        with_watch_monetization_types: monTypeQuery,
        language: "en-US",
        page: this.currentPage,
      })

        // const selectedProviderIds = this.getIds(this.selectedProviders).join("|");

        // MoviesAPI.discoverTitles(collection, {
        //   ...params,
        //   watch_region: "US",
        //   // page: this.currentPage,
        //   page: 1,
        //   with_watch_providers: selectedProviderIds,
        // })
        .then((resp) => {
          console.log(resp, "results");

          if (this.currentPage > 1) {
            this.collections[this.currentCollection].results = this.collections[
              this.currentCollection
            ].results.concat(resp.data.results);
            // this.results = this.results.concat(resp.data.results);
          } else {
            // this.results = resp.data.results;
            this.collections[this.currentCollection].results =
              resp.data.results;
          }

          this.collections[this.currentCollection].totalPages =
            resp.data.totalPages;
          // this.totalPages = resp.data.total_pages;
        })
        .catch((error) => {
          console.log(error, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    startSearch() {
      this.searchModal = false;
      this.loading = true;
      this.currentCollection = 2;

      MoviesAPI.index(`search/multi`, {
        // TODO: fix region param
        region: "US",
        page: this.currentPage,
        query: this.searchText,
      })
        .then((resp) => {
          this.collections[2].results = resp.data.results;
          console.log(this.collections[2]);
          console.log(this.collections[2].results, "search results");
        })
        .catch((error) => {
          console.log(error, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleIntersect(entries, observer) {
      console.log("intersected", entries);

      if (this.collections[this.currentCollection].results.length >= 20) {
        if (entries[0].isIntersecting) {
          this.currentPage++;
        }
      }

      // this.getResults(this.collections[this.currentCollection].endpoint);
    },
    initObserver() {
      let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      this.observer = new IntersectionObserver(this.handleIntersect, options);

      let targets = document.querySelectorAll(".target");
      console.log(targets, "targets");
      targets.forEach((target) => {
        if (target) {
          this.observer.observe(target);
        }
      });
      // if (target) {
      //   this.observer.observe(target);
      // }
    },
    getDiscover(collection, params) {
      MoviesAPI.discoverTitles(collection, params).then((resp) => {
        console.log(resp, "dicover results");
      });
    },
  },
  async mounted() {
    console.log("mounted");
    console.log(this.$auth0);
    this.getResults(this.collections[this.currentCollection].endpoint);
    this.getWatchProviders();
    setTimeout(() => {
      this.initObserver();
    }, 2000);
  },
};
</script>

<style lang="scss">
#home {
  // background-color: black;
  min-height: 100%;
}

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
.menu-card {
  // transition: height 0.5s;
  // overflow-y: auto;
  // width: 100%;
  // max-width: none;
  // margin-top: auto;
  border-radius: 40px 40px 0 0 !important;
}

.v-dialog .v-overlay__content {
  margin: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  bottom: 0 !important;
}
</style>
