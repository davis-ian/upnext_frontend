<template>
  <div>
    <v-btn :color="color" :variant="variant" @click="login">Login</v-btn>
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
    login() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: "/profile",
        },
      });
    },
  },
};
</script>
<style lang=""></style>
