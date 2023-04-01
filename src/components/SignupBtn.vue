<template>
  <div>
    <v-btn @click="signUp">Sign Up</v-btn>
  </div>
</template>
<script>
export default {
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
  },
};
</script>
<style lang=""></style>
