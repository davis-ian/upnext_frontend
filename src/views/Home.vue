<template>
  <div id="home">
    <!-- <div style="display: flex; flex-wrap: wrap; gap: 10px" class="pa-5">
      <v-btn
        v-for="sel in collections"
        class="mr-3"
        :variant="currentCollection == sel.value ? 'tonal' : 'outlined'"
        @click="currentCollection = sel.value"
        >{{ sel.name }}</v-btn
      >
    </div> -->
    <!-- <div class="text-center px-5">
      <h1>{{ collections[currentCollection].name }}</h1>
    </div> -->

    <!-- <v-row v-if="currentCollection == 3">
      <v-col>
        <div
        style="
        display: flex;
              flex-direction: row;
              justify-content: center;
              /* border: 2px solid red; */
              "
              class="pa-5"
              >
              <v-text-field
              style="max-width: 500px"
              density="compact"
              variant="solo"
              clearable
              @keydown.enter="startSearch"
              v-model="searchText"
              label="Search"
              dense
              >
            </v-text-field>
            <v-btn style="height: 40px" class="ml-2" @click="startSearch"
            >search</v-btn
            >
          </div>
        </v-col>
        <v-col v-if="results.length == 0" class="text-center" cols="12">
          <h1>What are we looking for today?</h1>
        </v-col>
      </v-row> -->

    <div>
      <v-row no-gutters class="pa-3">
        <v-col cols="12">
          <h1 class="text-center">{{ collections[currentCollection].name }}</h1>
        </v-col>
        <v-col class="my-2" cols="12">
          <div style="display: flex; justify-content: space-between">
            <v-btn
              :color="currentCollection == 0 ? '#23d9a5' : ''"
              variant="tonal"
              @click="currentCollection = 0"
              >Trending</v-btn
            >
            <v-btn
              :color="currentCollection == 3 ? '#23d9a5' : ''"
              @click="showSearch = !showSearch"
              variant="tonal"
            >
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
              ></font-awesome-icon>
            </v-btn>
          </div>
          <v-expand-transition>
            <div class="mt-2" v-show="showSearch">
              <v-text-field
                clearable
                @keydown.enter="startSearch"
                label="Search"
                v-model="searchText"
                autofocus=""
              ></v-text-field>
            </div>
          </v-expand-transition>
        </v-col>

        <v-col
          class="pa-1"
          cols="4"
          sm="4"
          md="3"
          v-for="(result, index) in results"
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
      </v-row>
      <div>
        <div class="pa-3 text-center">
          <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
          <!-- <span style="font-size: 0.9rem" id="target"
            >{{ results.length }} of {{ totalPages * 20 }}</span
          > -->
          <span style="font-size: 0.9rem" id="target"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MoviesAPI from "@/api/movies";
import PageLoader from "@/components/UI/PageLoader.vue";
import DetailedPoster from "@/components/UI/DetailedPoster.vue";
import { debounceV2 } from "@/utils/debounce";
export default {
  data() {
    return {
      results: [],
      searchResults: [],
      totalPages: 0,
      currentPage: 1,
      searchText: "",
      currentCollection: 0,
      showSearch: false,
      loading: true,
      observer: null,

      collections: [
        {
          value: 0,
          name: "Trending Now",
          endpoint: "trending/all/day",
        },
        {
          value: 1,
          name: "Movies",
          endpoint: "movie/popular",
        },
        {
          value: 2,
          name: "Shows",
          endpoint: "tv/popular",
        },
        {
          value: 3,
          name: "Search",
          endpoint: "",
        },
      ],
    };
  },
  components: { PageLoader, DetailedPoster },
  watch: {
    currentCollection() {
      this.currentPage = 1;
      if (this.currentCollection != 3) {
        this.showSearch = false;
        console.log(this.currentCollection, "updated");
        this.getResults(this.collections[this.currentCollection].endpoint);
      } else {
        this.results = this.searchResults;
        this.totalPages = 0;
      }
    },
    currentPage() {
      console.log(this.currentPage);
      if (this.currentCollection != 3) {
        this.getResults(this.collections[this.currentCollection].endpoint);
      }
    },
    searchText: debounceV2(function () {
      if (this.searchText) {
        this.currentPage = 1;
        this.startSearch();
      }
    }, 500),
  },
  methods: {
    handleImgSrc(path) {
      if (path) {
        return (
          "https://ik.imagekit.io/upnext/tr:w-300/https://image.tmdb.org/t/p/original/" +
          path
        );
      }
      return null;
    },
    goToDetails(item) {
      if (item.hasOwnProperty("first_air_date")) {
        console.log("this is a tv show");
        this.$router.push("media/tv/" + item.id);
      } else {
        this.$router.push("media/movie/" + item.id);
      }
    },
    getResults(collection) {
      console.log("getting results", this.currentPage);
      this.loading = true;
      MoviesAPI.index(collection, {
        with_origin_country: "US",
        page: this.currentPage,
      })
        .then((resp) => {
          if (this.currentPage > 1) {
            this.results = this.results.concat(resp.data.results);
          } else {
            this.results = resp.data.results;
          }

          this.totalPages = resp.data.total_pages;
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
      this.currentCollection = 3;

      MoviesAPI.index("search/multi", {
        with_origin_country: "US",
        page: this.currentPage,
        query: this.searchText,
      })
        .then((resp) => {
          this.results = resp.data.results;
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
      if (entries[0].isIntersecting) {
        this.currentPage++;
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
      let target = document.querySelector("#target");
      if (target) {
        this.observer.observe(target);
      }
    },
  },
  async mounted() {
    console.log("mounted");
    console.log(this.$auth0);
    this.getResults(this.collections[this.currentCollection].endpoint);
    setTimeout(() => {
      this.initObserver();
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
#home {
  // background-color: black;
  min-height: 100%;
}
</style>
