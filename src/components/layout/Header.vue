<template>
  <div>
    <v-app-bar color="#23D9A5">
      <v-app-bar-title> Header </v-app-bar-title>
      <v-spacer></v-spacer>
      <span class="mr-2" v-if="user">Welcome, {{ user.nickname }}!</span>
      <v-btn @click="test" variant="outlined">User</v-btn>
      <!-- <v-btn @click="searchModal = true" variant="outlined">Search</v-btn>
      <v-btn @click="navModal = true" variant="outlined">More</v-btn> -->
      <v-btn class="ml-2" href="/" variant="outlined">Home</v-btn>
      <v-btn class="ml-2" href="/profile" variant="outlined">Profile</v-btn>
      <LoginBtn class="ml-2" v-if="!isAuthenticated" />
      <LogoutBtn class="ml-2" v-if="isAuthenticated" />
    </v-app-bar>

    <!-- Start Nav modal -->
    <v-dialog v-model="navModal">
      <v-card class="pa-3">
        <div style="display: flex; flex-direction: column">
          <v-btn href="/" variant="text">Home</v-btn>
          <v-btn href="/profile" variant="text">Profile</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- End Nav modal -->

    <!-- Start Search Modal -->
    <v-dialog v-model="searchModal">
      <v-card class="pa-3">
        <v-card-title>Search</v-card-title>
        <v-text-field
          variant="outlined"
          label="Search"
          @keydown.enter="startSearch"
          :autofocus="true"
          v-model="searchText"
        ></v-text-field>
        <v-btn @click="startSearch">Go</v-btn>
      </v-card>
    </v-dialog>
    <!-- End Search Modal -->
  </div>
</template>
<script>
import LoginBtn from "@/components/LoginBtn.vue";
import LogoutBtn from "@/components/LogoutBtn.vue";
export default {
  data() {
    return {
      navModal: false,
      searchModal: false,
      searchText: "",
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  components: { LoginBtn, LogoutBtn },
  methods: {
    test() {
      console.log(this.isAuthenticated);
      if (this.isAuthenticated) {
        console.log(this.user, "user");
      }
    },
    startSearch() {
      this.searchModal = false;
      console.log(this.searchText, "searching...");

      this.axios
        .get(
          import.meta.env.VITE_APP_MOVIE_API +
            `/search/multi?api_key=${
              import.meta.env.VITE_APP_MOVIE_API_KEY
            }&query=${this.searchText}`
        )
        .then((resp) => {
          console.log(resp, "SEARCHED");
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
  },
};
</script>
<style lang=""></style>
