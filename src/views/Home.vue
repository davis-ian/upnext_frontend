<template>
  <div id="home">
    <div class="pa-3">
      <v-btn
        v-for="sel in collections"
        class="mr-3"
        color="primary"
        :variant="currentCollection == sel.value ? 'flat' : 'outlined'"
        @click="currentCollection = sel.value"
        >{{ sel.name }}</v-btn
      >
    </div>

    <div>
      <div class="text-center pa-5">
        <h1>{{ collections[currentCollection].name }}</h1>
      </div>

      <div
        v-if="currentCollection == 3"
        style="display: flex; justify-content: center"
      >
        <v-text-field
          @keydown.enter="startSearch"
          v-model="searchText"
          variant="outlined"
          label="Search"
        >
          <template v-slot:append-inner>
            <v-btn @click="startSearch" variant="text">search</v-btn>
          </template>
        </v-text-field>
      </div>
      <v-row class="pa-3">
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
            <!-- <p class="text-center">{{ result.name || result.title }}</p> -->
          </div>
        </v-col>
      </v-row>
      <div>
        <!-- {{ currentPage }} -->
        <!-- @prev="getResults(this.collections[this.currentCollection].endpoint)"
        @next="getResults(this.collections[this.currentCollection].endpoint)" -->
        <v-pagination
          v-if="totalPages > 0"
          v-model="currentPage"
          :total-visible="6"
          :length="totalPages"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import MoviesAPI from "@/api/movies";
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
      this.loading = true;
      MoviesAPI.index(collection, {
        with_origin_country: "US",
        page: this.currentPage,
      })
        .then((resp) => {
          this.results = resp.data.results;
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
  },
  async mounted() {
    const token = await this.$auth0.getAccessTokenSilently();
    const claim = this.$auth0.idTokenClaims.value["https://nextup.com/roles"];
    console.log(claim, "claim");
    this.axios
      .create({ headers: { Authorization: "Bearer " + token } })
      .get(import.meta.env.VITE_APP_API + "/api/private-scoped")
      .then((response) => {
        console.log(response.data, "success");
      })
      .catch((error) => {
        console.log(error, "error");
      });

    this.getResults(this.collections[this.currentCollection].endpoint);
  },
};
</script>

<style lang="scss">
#home {
  background-color: black;
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
