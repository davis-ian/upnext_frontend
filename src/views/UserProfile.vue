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

      <v-btn color="red" @click="toggleListPrivacy">Toggle</v-btn>
    </div>
  </div>
</template>
<script>
import ListAPI from "@/api/lists";
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      list: {},
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
    toggleListPrivacy() {
      console.log(this.list.public);
      ListAPI.update(8245289, {
        public: !this.list.public,
      })
        .then((resp) => {
          console.log(resp, "list update success");
        })
        .catch((err) => {
          console.log(err, "list update error");
        });
    },
  },
  mounted() {
    console.log("profile mounted");
    ListAPI.show(8245289)
      .then((resp) => {
        console.log("list success", resp);
        this.list = resp.data;
      })
      .catch((error) => {
        console.log(error, "error");
      });
  },
};
</script>
<style lang=""></style>
