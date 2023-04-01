<template>
  <v-app>
    <v-main>
      <Layout>
        <router-view />
        <page-loader v-if="isLoading" />
      </Layout>
    </v-main>
  </v-app>
</template>

<script>
import Layout from "@/components/layout/Layout.vue";
import Snackbar from "@/components/UI/Snackbar.vue";
import { useSnackbarStore } from "@/stores/snackbar";
import PageLoader from "@/components/UI/PageLoader.vue";

export default {
  setup() {
    const snackbarStore = useSnackbarStore();
    return { snackbarStore };
  },
  data() {
    return {
      isLoading: this.$auth0.isLoading,
    };
  },
  components: { Snackbar, Layout, PageLoader },
  mounted() {
    console.log("APP MOUNTED");
  },
};
</script>

<style lang="scss"></style>
