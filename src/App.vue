<template>
  <v-app id="app">
    <v-main id="main">
      <Layout>
        <router-view />
        <page-loader v-if="isLoading" />
        <snackbar />
      </Layout>
    </v-main>
  </v-app>
</template>

<script>
import Layout from "@/components/layout/Layout.vue";
import Snackbar from "@/components/UI/Snackbar.vue";
// import { useSnackbarStore } from "@/stores/snackbar";
import PageLoader from "@/components/UI/PageLoader.vue";
import { RouterView } from "vue-router";

export default {
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      user: this.$auth0.user,
    };
  },
  methods: {},
  components: { Snackbar, Layout, PageLoader, RouterView },
  mounted() {
    console.log("APP MOUNTED");
  },
};
</script>

<style lang="scss">
#main {
  // overflow-x: hidden;
  // border: 2px solid orange;
  height: 100vh;
}
// #app {
//   border: 2px solid blue;
// }

@media only screen and (max-width: 700px) {
  #main {
    overflow-x: hidden;
    // border: 2px solid red;
  }
}
</style>
