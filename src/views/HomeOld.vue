<template>
  <div>
    <!-- <TestComp /> -->
    <HelloWorld />
    {{ isAuthenticated }}
    <div v-if="isAuthenticated">
      <pre>
            <code>
                {{ user }}
            </code>
        </pre>
    </div>
    <LoginBtn />
    <LogoutBtn />
    <v-btn href="/profile">Profile</v-btn>

    <div>
      <h3>Trending Now</h3>
      <v-row>
        <v-col cols="4" v-for="(movie, index) in movies" :key="index">
          <div>
            <v-img
              height="200px"
              width="200px"
              :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
              :lazy-src="
                'https://image.tmdb.org/t/p/original/' + movie.poster_path
              "
            ></v-img>
            <span>{{ index + 1 + " | " + (movie.name || movie.title) }}</span>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
// import TestComp from "@/components/TestComponent.vue";
// import HelloWorld from "@/components/HelloWorld.vue";
import LoginBtn from "@/components/LoginBtn.vue";
import LogoutBtn from "@/components/LogoutBtn.vue";
export default {
  data() {
    return {
      message: "hi",
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      movies: [],
    };
  },
  methods: {
    getMovies() {
      console.log("getting movies");
      this.axios(
        "https://api.themoviedb.org/3/trending/all/day?api_key=21b9eafbccb33dc24e86dc8ae42e6d7d"
      )
        .then((response) => {
          console.log(response, "success");
          this.movies = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    // TestComp,
    // HelloWorld,
    LoginBtn,
    LogoutBtn,
  },
  mounted() {
    this.getMovies();
  },
};
</script>
<style lang=""></style>
