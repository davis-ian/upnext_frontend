<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <h2>User Profile</h2>
      <v-btn v-if="!isAuthenticated" @click="login">Log in</v-btn>
      <v-btn v-if="isAuthenticated" @click="logout">Log out</v-btn>
      <pre v-if="isAuthenticated">
                <code>{{ user }}</code>
            </pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  methods: {
    login() {
      console.log("logging in");
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
<style lang=""></style>
