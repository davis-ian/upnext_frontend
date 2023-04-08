<template>
  <div>
    <v-btn :color="color" :variant="variant" @click="logout">Logout</v-btn>
  </div>
</template>
<script>
export default {
  props: {
    variant: {
      type: String,
      default: "outlined",
    },
    color: {
      type: String,
      default: "",
    },
  },
  methods: {
    logout() {
      this.$auth0.logout({
        // returnTo: window.location.origin,
        returnTo: "/",
      });
    },
  },
};
</script>
<style lang=""></style>
