<template>
  <div id="home">
    <div style="display: flex; flex-wrap: wrap; gap: 10px" class="pa-5">
      <v-btn
        v-for="sel in collections"
        class="mr-3"
        :variant="currentCollection == sel.value ? 'tonal' : 'outlined'"
        @click="currentCollection = sel.value"
        >{{ sel.name }}</v-btn
      >
    </div>
    <div>
      <div class="text-center px-5">
        <h1>{{ collections[currentCollection].name }}</h1>
      </div>

      <div
        v-if="currentCollection == 3"
        style="display: flex; justify-content: center"
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

      <v-row class="pa-5">
        <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="(result, index) in results"
          :key="index"
        >
          <div>
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <div class="img-wrap" v-bind="props">
                  <v-img
                    class="img"
                    @click="goToDetails(result)"
                    max-height="100%"
                    :src="
                      'https://image.tmdb.org/t/p/original/' +
                      (result.poster_path || '')
                    "
                    :lazy-src="
                      'https://image.tmdb.org/t/p/original/' +
                      (result.poster_path || '')
                    "
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </div>
              </template>
            </v-hover>
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
export default {
  data() {
    return {
      results: [],
      searchResults: [],
      totalPages: 0,
      currentPage: 1,
      searchText: "",
      currentCollection: 0,
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
  components: { PageLoader },
  watch: {
    currentCollection() {
      this.currentPage = 1;
      if (this.currentCollection != 3) {
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
  },
  methods: {
    goToDetails(item) {
      if (item.hasOwnProperty("first_air_date")) {
        console.log("this is a tv show");
        this.$router.push("/tv/" + item.id);
      } else {
        this.$router.push("/movie/" + item.id);
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
.img-wrap {
  transition: 0.3s;
  // border: 2px solid red;
  border-radius: 10px;
  .img {
    border-radius: 10px;
    cursor: pointer;
  }
}

.img-wrap:hover {
  transition: 0.3s;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  transform: scale(1.02);
}
</style>
